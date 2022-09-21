from sqlalchemy import Column, String, Date, Integer, Table, ForeignKey

from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship, declared_attr


class BaseMixin:
    """Base mixin"""

    id = Column(Integer, primary_key=True)

    @declared_attr
    def __tablename__(cls):
        return cls.__name__.lower()


Base = declarative_base(cls=BaseMixin)


class Link(Base):
    title = Column(String)
    url = Column(String)


class HasLinks(object):
    """HasLink mixin, creates a new link_association
    table for each parent.
    """

    @declared_attr
    def links(self):
        link_association = Table(
            "%s_links" % self.__tablename__,
            self.metadata,
            Column("link_id", ForeignKey("link.id"), primary_key=True),
            Column(
                "%s_id" % self.__tablename__,
                ForeignKey("%s.id" % self.__tablename__),
                primary_key=True,
            ),
        )
        return relationship(Link, secondary=link_association, cascade="all, delete-orphan", single_parent=True)


class Game(Base, HasLinks):
    slug = Column(String, unique=True)
    title = Column(String)
    release_date = Column(Date)
    platform = Column(String)
    description = Column(String, nullable=True)
    image_url = Column(String)


class User(Base):
    email = Column(String, unique=True)
    username = Column(String, unique=True)
    password_hash = Column(String)
