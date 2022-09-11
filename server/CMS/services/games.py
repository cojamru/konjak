from fastapi import Depends, HTTPException, status
from sqlalchemy.orm import Session

from CMS import tables
from CMS.database import get_session
from CMS.models.games import GameCreate, GameUpdate


class GamesService:
    session: Session

    def __init__(self, session: Session = Depends(get_session)):
        self.session = session

    def create(self, game_data: GameCreate) -> tables.Game:
        game_data.links = [tables.Link(**link.dict()) for link in game_data.links]
        game = tables.Game(**game_data.dict())

        self.session.add(game)
        self.session.commit()
        return game

    def get_list(self) -> list[tables.Game]:
        games = (
            self.session
            .query(tables.Game)
            .all()
        )
        return games

    def _get(self, **game_data) -> tables.Game:
        game = (
            self.session
            .query(tables.Game)
            .filter_by(**game_data)
            .first()
        )
        if not game:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Game({', '.join([str(key + '=' + value) for key, value in game_data.items()])}) not found"
            )
        return game

    def get(self, game_slug: str):
        return self._get(slug=game_slug)

    def delete(self, game_slug: str):
        game = self._get(slug=game_slug)
        self.session.delete(game)
        self.session.commit()

    def update(self, game_slug: str, game_data: GameUpdate):
        game = self._get(slug=game_slug)
        for field, value in game_data:
            if field == 'links':
                continue
            setattr(game, field, value)

        links = game.links
        number_of_links_diff = len(game_data.links) - len(links)
        if number_of_links_diff < 0:        # updated Game has fewer links
            [links.remove(links[-1]) for _ in range(-number_of_links_diff)]
        elif number_of_links_diff > 0:      # updated Game has more links
            [links.append(tables.Link()) for _ in range(number_of_links_diff)]

        for i in range(len(links)):         # update Game.links
            for field, value in game_data.links[i]:
                setattr(links[i], field, value)

        self.session.commit()
        return game
