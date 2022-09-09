from pydantic import BaseModel, HttpUrl


class Link(BaseModel):
    id: int
    title: str
    url: HttpUrl

    class Config:
        orm_mode = True
