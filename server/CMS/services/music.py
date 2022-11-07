from fastapi import Depends, HTTPException
from sqlalchemy.orm import Session

from ..tables import \
    Album as AlbumORM, \
    Artist as ArtistORM, \
    Track as TrackORM, \
    Link as LinkORM

from ..database import get_session
from ..models import AlbumCreate, AlbumUpdate, TrackCreate

from .utility import UtilityService
from .files import ImageService


class MusicService:
    def __init__(self, session: Session = Depends(get_session)):
        self.session = session

    def get_albums_list(self) -> list[AlbumORM]:
        albums = (
            self.session
            .query(AlbumORM)
            .all()
        )

        return albums

    def get_album(self, slug: str) -> AlbumORM :
        album = (
            self.session
            .query(AlbumORM)
            .filter_by(slug=slug)
            .first()
        )
        if not album:
            raise HTTPException(
                status_code=404,
                detail=f"Album not found"
            )

        return album

    def _get_or_create(self, model, defaults=None, **kwargs):
        instance = self.session.query(model).filter_by(**kwargs).one_or_none()
        if instance:
            return instance
        else:
            kwargs |= defaults or {}
            instance = model(**kwargs)
            try:
                self.session.add(instance)
                self.session.commit()
            except Exception:
                self.session.rollback()
                instance = self.session.query(model).filter_by(**kwargs).one()
                return instance
            else:
                return instance

    def _set_tracks_featured(self, tracks: list[TrackCreate]) -> list[ArtistORM] | None:
        """
        Initialize tracks.featured and get list of unique featured artists

        :param tracks: object with the .featured field that needs to be initialized
        :return: list of unique featured artists across all the tracks
        """

        album_featured = []
        for track in tracks:
            if not track.featured:
                track.featured = []
                continue

            featured = [
                self._get_or_create(ArtistORM, **featured_artist.dict())
                for featured_artist in track.featured
            ]
            album_featured += featured
            track.featured = featured

        if not album_featured:
            return None

        album_featured = list(set(album_featured))
        return album_featured

    @staticmethod
    def _set_tracks_artists(tracks: list[TrackCreate], artists: list[ArtistORM]):
        for track in tracks:
            track.artists = artists

    def create_album(self, album_data: AlbumCreate) -> AlbumORM:
        album_data.artists = [self._get_or_create(ArtistORM, **artist.dict()) for artist in album_data.artists]
        album_data.links = [LinkORM(**link.dict()) for link in album_data.links]

        self._set_tracks_artists(album_data.tracks, album_data.artists)
        album_featured = self._set_tracks_featured(album_data.tracks)

        album_data.tracks = [TrackORM(**track.dict()) for track in album_data.tracks]
        if album_featured:
            album_data.featured = album_featured

        album = AlbumORM(**album_data.dict())
        self.session.add(album)
        self.session.commit()

        return album

    def delete_album(self, slug: str):
        album = self.get_album(slug=slug)
        self.session.delete(album)

        if album.image_url:
            image_service = ImageService()
            image_service.delete(album.image_url)

        self.session.commit()

    def update_album(self, slug: str, album_data: AlbumUpdate):
        album = self.get_album(slug=slug)

        album_data.artists = [self._get_or_create(ArtistORM, **artist.dict()) for artist in album_data.artists]
        self._set_tracks_artists(album_data.tracks, album_data.artists)
        album_featured = self._set_tracks_featured(album_data.tracks)

        UtilityService.update_many_to_many(TrackORM, album.tracks, album_data.tracks)
        UtilityService.update_many_to_many(LinkORM, album.links, album_data.links)

        if album_featured:
            album_data.featured = album_featured

        for field, value in album_data:
            if field in ['links', 'tracks']:
                continue
            setattr(album, field, value)

        self.session.commit()
        return album

    def add_album_cover(self, slug: str, image: any) -> str:
        image_service = ImageService()
        image_url: str = image_service.upload(image)

        album = self.get_album(slug=slug)

        if album.image_url:
            image_service.delete(album.image_url)

        album.image_url = image_url

        self.session.commit()
        return image_url
