import uvicorn

from CMS.settings import settings


if __name__ == '__main__':
    uvicorn.run(
        'CMS.app:app',
        port=settings.server_port,
        host=settings.server_host,
        reload=settings.debug,
    )
