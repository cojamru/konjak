from datetime import date

from pydantic import BaseModel

from .links import LinkCreate, Link


class TrackBase(BaseModel):
    title: str
    description: str | None

    artist_id: int
    album_id: int


class TrackCreate(TrackBase):
    pass


class Track(TrackBase):
    id: int

    class Config:
        orm_mode = True


class ArtistBase(BaseModel):
    nickname: str
    link: str


class ArtistCreate(ArtistBase):
    tracks: list[TrackCreate]


class Artist(ArtistBase):
    id: int
    tracks: list[Track]

    class Config:
        orm_mode = True


class AlbumBase(BaseModel):
    title: str
    description: str | None
    release_date: date

    artist_id: int
    featured: list[ArtistBase] | None


class AlbumCreate(AlbumBase):
    slug: str

    tracks: list[TrackCreate] | None
    links: list[LinkCreate]


class Album(AlbumBase):
    id: int

    class Config:
        orm_mode = True
