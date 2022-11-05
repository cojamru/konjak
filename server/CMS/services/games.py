from fastapi import Depends, HTTPException, status
from sqlalchemy.orm import Session

from ..tables import Game as GameORM
from ..tables import Link as LinkORM

from ..database import get_session
from ..models import GameCreate, GameUpdate

from .files import ImageService


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

        self._update_links(game, game_data.links)

        for field, value in game_data:
            if field == 'links':
                continue
            setattr(game, field, value)

        self.session.commit()
        return game

    def _update_links(self, game: GameORM, new_links: list):
        """
        Update GameORM object without committing to DB

        :param game: game object to update
        :param new_links: list[LinkCreate]
        :return: None
        """

        current_links = game.links
        number_of_links_diff = len(new_links) - len(current_links)

        # update number of links
        for _ in range(abs(number_of_links_diff)):
            if number_of_links_diff < 0:
                current_links.remove(current_links[-1])
            elif number_of_links_diff > 0:
                current_links.append(LinkORM())

        # update current_links values
        for i in range(len(current_links)):
            for field, value in new_links[i]:
                setattr(current_links[i], field, value)

    def update_image(self, game_slug: str, image_url: str):
        game = self._get(slug=game_slug)
        game.image_url = image_url
        self.session.commit()
