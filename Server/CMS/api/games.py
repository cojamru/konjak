from typing import List

from fastapi import APIRouter
from fastapi import Depends
from sqlalchemy.orm import Session

from .. import tables
from ..database import get_session
from ..models.games import Game

games_router = APIRouter(
    prefix='/games'
)


@games_router.get('/', response_model=List[Game])
def get_games(session: Session = Depends(get_session)):
    """List of all games"""
    games = (
        session
        .query(tables.Game)
        .all()
    )
    return games
