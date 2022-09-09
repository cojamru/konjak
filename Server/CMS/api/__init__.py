from fastapi import APIRouter

from .games import games_router

api_router = APIRouter()

api_router.include_router(games_router)
