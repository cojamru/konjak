from sqlalchemy import Column, String

from ..tables.base import Base


class User(Base):
    email = Column(String, unique=True)
    username = Column(String, unique=True)
    password_hash = Column(String)
