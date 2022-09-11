from pydantic import BaseModel, HttpUrl


class LinkBase(BaseModel):
    title: str
    url: HttpUrl


class LinkCreate(LinkBase):
    pass


class Link(LinkBase):
    id: int

    class Config:
        orm_mode = True
