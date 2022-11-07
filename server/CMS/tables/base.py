from sqlalchemy import Column, Integer

from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import declared_attr


class BaseMixin:
    """Base mixin"""

    id = Column(Integer, primary_key=True)

    @declared_attr
    def __tablename__(cls):
        return cls.__name__.lower()


Base = declarative_base(cls=BaseMixin)
