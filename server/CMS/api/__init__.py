from fastapi import APIRouter

from .auth import auth_router
from .games import games_router
from .files import files_router

api_router = APIRouter()

api_router.include_router(games_router)
api_router.include_router(auth_router)
api_router.include_router(files_router)
