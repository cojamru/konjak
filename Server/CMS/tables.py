from sqlalchemy import Column, String, Date, Integer, Table, ForeignKey

from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship, declared_attr

Base = declarative_base()


class Link(Base):
    __tablename__ = 'links'

    id = Column(Integer, primary_key=True)
    title = Column(String)
    url = Column(String)


class HasLinks(object):
    """HasLink mixin, creates a new link_association
    table for each parent.

    """

    @declared_attr
    def addresses(cls):
        link_association = Table(
            "%s_addresses" % cls.__tablename__,
            cls.metadata,
            Column("link_id", ForeignKey("links.id"), primary_key=True),
            Column(
                "%s_id" % cls.__tablename__,
                ForeignKey("%s.id" % cls.__tablename__),
                primary_key=True,
            ),
        )
        return relationship(Link, secondary=link_association)


class Game(HasLinks, Base):
    __tablename__ = 'games'

    id = Column(Integer, primary_key=True)
    slug = Column(String, unique=True)
    title = Column(String)
    release_date = Column(Date)
    platform = Column(String)
    description = Column(String, nullable=True)




