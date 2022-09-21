from fastapi import APIRouter
from fastapi import Depends
from fastapi.responses import HTMLResponse

from ..models.auth import User
from ..models.games import Game, GameCreate, GameUpdate
from ..services.auth import get_current_user
from ..services.games import GamesService

games_router = APIRouter(
    prefix='/games',
    tags=['games']
)


@games_router.get('/', response_model=list[Game])
def get_games(game_service: GamesService = Depends()):
    return game_service.get_list()


@games_router.get('/{slug}', response_model=Game)
def get_game(
        slug: str,
        game_service: GamesService = Depends()
):
    return game_service.get(game_slug=slug)


@games_router.post('/', response_model=Game)
def add_game(
        game_data: GameCreate,
        user: User = Depends(get_current_user),
        game_service: GamesService = Depends(),
):
    return game_service.create(game_data)


@games_router.put('/', response_model=Game)
def update_game(
        slug: str,
        game_data: GameUpdate,
        user: User = Depends(get_current_user),
        game_service: GamesService = Depends(),
):
    return game_service.update(game_slug=slug, game_data=game_data)


@games_router.delete('/')
def delete_game(
        slug: str,
        user: User = Depends(get_current_user),
        game_service: GamesService = Depends(),
):
    game_service.delete(game_slug=slug)
    return HTMLResponse(status_code=204)
