from fastapi import APIRouter, Depends

from models import AlbumUpdate
from ..models import Album, AlbumCreate, User
from ..services import MusicService, get_current_user

music_router = APIRouter(
    prefix='/music',
    tags=['music']
)


@music_router.get('/', response_model=list[Album])
def get_albums(music_service: MusicService = Depends()):
    return music_service.get_albums_list()


@music_router.get('/{slug}', response_model=Album)
def get_album(
        slug: str,
        music_service: MusicService = Depends(),
):
    return music_service.get_album(slug=slug)


@music_router.post('/', response_model=Album)
def add_album(
        album_data: AlbumCreate,
        user: User = Depends(get_current_user),
        music_service: MusicService = Depends(),
):
    return music_service.create_album(album_data)


@music_router.put('/', response_model=Album)
def update_album(
        slug: str,
        album_data: AlbumUpdate,
        user: User = Depends(get_current_user),
        music_service: MusicService = Depends(),
):
    return music_service.update_album(slug=slug, album_data=album_data)


@music_router.delete('/')
def delete_album(
        slug: str,
        user: User = Depends(get_current_user),
        music_service: MusicService = Depends(),
):
    return music_service.delete_album(slug=slug)
