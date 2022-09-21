import uvicorn

from CMS.settings import settings
from CMS.database import engine
from CMS.tables import Base


def create_tables():
    Base.metadata.drop_all(engine)
    Base.metadata.create_all(engine)


if __name__ == '__main__':
    # create_tables()
    uvicorn.run(
        'CMS.app:app',
        port=settings.server_port,
        host=settings.server_host,
        reload=True
    )
