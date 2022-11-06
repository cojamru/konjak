from fastapi import Depends, HTTPException, status
from sqlalchemy.orm import Session

from ..tables import Game as GameORM
from ..tables import Link as LinkORM

from ..database import get_session
from ..models import GameCreate, GameUpdate

from .files import ImageService
from .utility import UtilityService


class GamesService:
    def __init__(self, session: Session = Depends(get_session)):
        self.session = session

    def create(self, game_data: GameCreate) -> GameORM:
        game_data.links = [LinkORM(**link.dict()) for link in game_data.links]
        game = GameORM(**game_data.dict())

        self.session.add(game)
        self.session.commit()
        return game

    def add_image(self, game_slug: str, image: any) -> str:
        image_service = ImageService()
        image_url: str = image_service.upload(image)

        game = self._get(slug=game_slug)

        if game.image_url:
            image_service.delete(game.image_url)

        game.image_url = image_url

        self.session.commit()
        return image_url

    def get_list(self) -> list[GameORM]:
        games = (
            self.session
            .query(GameORM)
            .all()
        )
        return games

    def _get(self, **game_data) -> GameORM:
        game = (
            self.session
            .query(GameORM)
            .filter_by(**game_data)
            .first()
        )
        if not game:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Game not found"
            )
        return game

    def get(self, game_slug: str):
        return self._get(slug=game_slug)

    def delete(self, game_slug: str):
        game = self._get(slug=game_slug)

        image_service = ImageService()
        image_service.delete(game.image_url)

        self.session.delete(game)
        self.session.commit()

    def update(self, game_slug: str, game_data: GameUpdate):
        game = self._get(slug=game_slug)

        UtilityService.update_many_to_many(LinkORM, game.links, game_data.links)

        for field, value in game_data:
            if field == 'links':
                continue
            setattr(game, field, value)

        self.session.commit()
        return game

    def update_image(self, game_slug: str, image_url: str):
        game = self._get(slug=game_slug)
        game.image_url = image_url
        self.session.commit()
