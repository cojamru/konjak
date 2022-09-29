from fastapi import APIRouter, Depends

from ..models.music import Album
from ..services.music import MusicService

music_router = APIRouter(
    prefix='/music',
    tags=['music']
)


@music_router.get('/', response_model=Album)
def get_albums(music_service: MusicService = Depends()):
    return music_service.get_list()
