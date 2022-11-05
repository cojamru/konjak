from datetime import date

from pydantic import BaseModel

from .links import LinkCreate, Link


class ArtistBase(BaseModel):
    nickname: str


class ArtistCreate(ArtistBase):
    pass


class Artist(ArtistBase):
    id: int
    link: str | None
    # tracks: list[Track]

    class Config:
        orm_mode = True


class TrackBase(BaseModel):
    title: str
    description: str | None


class TrackCreate(TrackBase):
    featured: list[ArtistCreate] | None


class Track(TrackBase):
    id: int
    artist_id: int
    album_id: int
    artists: list[Artist]

    class Config:
        orm_mode = True


class AlbumBase(BaseModel):
    title: str
    description: str | None
    release_date: date

    featured: list[ArtistBase] | None


class AlbumCreate(AlbumBase):
    slug: str

    artists: list[ArtistCreate]
    tracks: list[TrackCreate]
    links: list[LinkCreate]


class Album(AlbumBase):
    id: int
    slug: str

    artist_id: int

    class Config:
        orm_mode = True
