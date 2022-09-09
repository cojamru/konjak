from datetime import date
from typing import Optional, List

from pydantic import BaseModel, HttpUrl

from .links import Link


class Contest(BaseModel):
    name: str
    link: HttpUrl


class Game(BaseModel):
    id: int
    slug: str
    title: str
    release_date: date
    platform: str
    description: Optional[str]
    links: Optional[List[Link]]

    class Config:
        orm_mode = True
