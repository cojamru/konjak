from fastapi import APIRouter, Depends

from ..models import Album, AlbumCreate, Track, TrackCreate
from ..services import MusicService

music_router = APIRouter(
    prefix='/music',
    tags=['music']
)


@music_router.get('/', response_model=Album)
def get_albums(music_service: MusicService = Depends()):
    return music_service.get_list()


@music_router.post('/', response_model=Album)
def add_album(
        album_data: AlbumCreate,
        music_service: MusicService = Depends(),
):
    return music_service.create_album(album_data)


@music_router.post('/track', response_model=Track)
def add_track(
        track_data: TrackCreate,
        music_service: MusicService = Depends(),
):
    return music_service.create_track(track_data)
