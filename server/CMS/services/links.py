from fastapi import Depends
from sqlalchemy.orm import Session

from CMS.database import get_session
from CMS.models.links import LinkCreate


class LinksService:
    session: Session

    def __init__(self, session: Session = Depends(get_session)):
        self.session = session

    def create(self, link_data: LinkCreate, game_id: int):
        pass
