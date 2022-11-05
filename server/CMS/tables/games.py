from sqlalchemy import Column, String, Date

from ..tables.base import Base
from ..tables.links import HasLinks


class Game(Base, HasLinks):
    slug = Column(String, unique=True)
    title = Column(String)
    release_date = Column(Date)
    platform = Column(String)
    description = Column(String, nullable=True)
    image_url = Column(String)


