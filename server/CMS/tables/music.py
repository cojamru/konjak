from sqlalchemy import Table, Column, ForeignKey, String, Integer, Date
from sqlalchemy.orm import relationship, declared_attr

from ..tables.base import Base
from ..tables.links import HasLinks


class HasArtists(object):
    """HasArtists mixin, creates new artist_association and
    featured_association tables for each parent.
    """

    @declared_attr
    def artists(cls):
        artist_association = Table(
            "%s_artist" % cls.__tablename__,
            cls.metadata,
            Column("artist_id", ForeignKey("artist.id"), primary_key=True),
            Column(
                "%s_id" % cls.__tablename__,
                ForeignKey("%s.id" % cls.__tablename__),
                primary_key=True,
            ),
        )
        return relationship(Artist, secondary=artist_association)


class HasFeatured(object):
    """HasFeatured mixin, creates new featured_association for each parent.
    """

    @declared_attr
    def featured(cls):
        featured_association = Table(
            "%s_featured" % cls.__tablename__,
            cls.metadata,
            Column("featured_id", ForeignKey("artist.id"), primary_key=True),
            Column(
                "%s_id" % cls.__tablename__,
                ForeignKey("%s.id" % cls.__tablename__),
                primary_key=True,
            ),
        )
        return relationship(Artist, secondary=featured_association)


class Artist(Base):
    nickname = Column(String)
    link = Column(String, nullable=True)


class Track(Base, HasArtists, HasFeatured):
    title = Column(String)
    description = Column(String, nullable=True)

    album_id = Column(Integer, ForeignKey("album.id"))


class Album(Base, HasLinks, HasArtists, HasFeatured):
    title = Column(String)
    slug = Column(String, unique=True)
    description = Column(String, nullable=True)
    release_date = Column(Date)
    image_url = Column(String, nullable=True)

    tracks = relationship("Track", backref='album', cascade="all, delete-orphan", single_parent=True)
