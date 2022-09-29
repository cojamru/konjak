from fastapi import Depends
from sqlalchemy.orm import Session

from .. import tables
from ..database import get_session
from ..models.music import AlbumCreate


class MusicService:
    def __init__(self, session: Session = Depends(get_session)):
        self.session = session

    def get_list(self) -> list[tables.Album]:
        albums = (
            self.session
            .query(tables.Album)
            .all()
        )

        return albums

    def create(self, album_data: AlbumCreate) -> tables.Album:
        pass

