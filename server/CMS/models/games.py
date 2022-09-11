from datetime import date
from typing import Optional, List

from pydantic import BaseModel, HttpUrl

from .links import LinkCreate, Link


class GameBase(BaseModel):
    title: str
    release_date: date
    platform: str
    description: Optional[str]


class GameCreate(GameBase):
    slug: str
    links: List[LinkCreate]


class GameUpdate(GameBase):
    links: List[LinkCreate]


class Game(GameBase):
    id: int
    slug: str
    links: List[Link]

    class Config:
        orm_mode = True
