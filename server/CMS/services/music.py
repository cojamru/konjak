from fastapi import Depends
from sqlalchemy.orm import Session

from ..tables import Album as AlbumORM
from ..tables import Artist as ArtistORM
from ..tables import Track as TrackORM
from ..tables import Link as LinkORM

from ..database import get_session
from ..models import AlbumCreate, TrackCreate


class MusicService:
    def __init__(self, session: Session = Depends(get_session)):
        self.session = session

    def get_list(self) -> list[AlbumORM]:
        albums = (
            self.session
            .query(AlbumORM)
            .all()
        )

        return albums

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

    def create_album(self, album_data: AlbumCreate) -> AlbumORM:
        album_data.artists = [self._get_or_create(ArtistORM, **artist.dict()) for artist in album_data.artists]
        album_data.links = [LinkORM(**link.dict()) for link in album_data.links]

        for track in album_data.tracks:
            track.featured = [
                self._get_or_create(ArtistORM, **featured_artist.dict())
                for featured_artist in track.featured
            ]

        album_data.tracks = [TrackORM(artists=album_data.artists, **track.dict()) for track in album_data.tracks]

        album = AlbumORM(**album_data.dict())
        self.session.add_all(album.tracks)
        self.session.add(album)
        self.session.commit()

        return album

    def create_track(self, track_data: TrackCreate) -> TrackORM:
        track = TrackORM(**track_data.dict())
        self.session.add(track)
        self.session.commit()

        return track
