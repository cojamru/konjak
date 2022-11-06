from fastapi import APIRouter, UploadFile, File, Depends, HTTPException

from ..models import User
from ..services import get_current_user, GamesService, MusicService

files_router = APIRouter(
    prefix='/files',
    tags=['files']
)


@files_router.post('/game/image', response_model=str)
def add_image_to_game(
        game_slug: str,
        image: UploadFile = File(...),
        user: User = Depends(get_current_user),
        game_service: GamesService = Depends(),
):
    if image.content_type.split('/')[0] != "image":
        raise HTTPException(400, detail="Image type required")

    return game_service.add_image(game_slug, image.file)


@files_router.post('/music/image', response_model=str)
def add_image_to_album(
        album_slug: str,
        image: UploadFile = File(...),
        user: User = Depends(get_current_user),
        music_service: MusicService = Depends(),
):
    if image.content_type.split('/')[0] != "image":
        raise HTTPException(400, detail="Image type required")

    return music_service.add_album_cover(slug=album_slug, image=image.file)
