from sqlalchemy import Column, Table, String, ForeignKey, Integer
from sqlalchemy.orm import relationship, declared_attr

from ..tables.base import Base


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
