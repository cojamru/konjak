from datetime import date

from pydantic import BaseModel, Extra

from .links import LinkCreate, Link


class ArtistBase(BaseModel):
    nickname: str


class ArtistCreate(ArtistBase):
    pass


class Artist(ArtistBase):
    id: int
    link: str | None

    class Config:
        orm_mode = True


class TrackBase(BaseModel):
    title: str
    description: str | None


class TrackCreate(TrackBase):
    featured: list[ArtistCreate] | None

    class Config:
        extra = Extra.allow


class Track(TrackBase):
    id: int

    album_id: int
    artists: list[Artist]
    featured: list[Artist]

    class Config:
        orm_mode = True


class AlbumBase(BaseModel):
    title: str
    description: str | None
    release_date: date


class AlbumCreate(AlbumBase):
    slug: str

    tracks: list[TrackCreate]
    artists: list[ArtistCreate]
    links: list[LinkCreate]

    class Config:
        extra = Extra.allow


class AlbumUpdate(AlbumBase):
    tracks: list[TrackCreate] | None
    artists: list[ArtistCreate] | None
    links: list[LinkCreate] | None

    class Config:
        extra = Extra.allow


class Album(AlbumBase):
    id: int
    slug: str

    tracks: list[Track]
    artists: list[Artist]
    featured: list[Artist] | None
    links: list[Link]

    class Config:
        orm_mode = True
