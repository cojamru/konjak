from fastapi import APIRouter, UploadFile, File, Depends, HTTPException

from ..models.auth import User
from ..services.auth import get_current_user
from ..services.games import GamesService

files_router = APIRouter(
    prefix='/files',
    tags=['files']
)


@files_router.post('/game/image', response_model=str)
def add_image(
        game_slug: str,
        image: UploadFile = File(...),
        user: User = Depends(get_current_user),
        game_service: GamesService = Depends(),
):
    if image.content_type.split('/')[0] != "image":
        raise HTTPException(400, detail="Image type required")

    return game_service.add_image(game_slug, image.file)
