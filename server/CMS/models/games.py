from datetime import date

from pydantic import BaseModel, HttpUrl

from .links import LinkCreate, Link


class GameBase(BaseModel):
    title: str
    release_date: date
    platform: str
    description: str | None = None


class GameCreate(GameBase):
    slug: str
    links: list[LinkCreate]


class GameUpdate(GameBase):
    links: list[LinkCreate] | None


class Game(GameBase):
    id: int
    slug: str

    links: list[Link]
    image_url: HttpUrl | None

    class Config:
        orm_mode = True
