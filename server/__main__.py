import uvicorn

from CMS.settings import settings
from CMS.database import engine
from CMS.tables.base import Base


def create_tables():
    Base.metadata.bind = engine
    Base.metadata.drop_all()
    Base.metadata.create_all()
    print(f"{len(engine.table_names())} tables created:\n{engine.table_names()}")


if __name__ == '__main__':
    # create_tables()
    uvicorn.run(
        'CMS.app:app',
        port=settings.server_port,
        host=settings.server_host,
        reload=True
    )
