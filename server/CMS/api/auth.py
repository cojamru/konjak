from fastapi import APIRouter, Depends
from fastapi.security import OAuth2PasswordRequestForm

from ..models.auth import Token, UserCreate, User
from ..services.auth import AuthService, get_current_user

auth_router = APIRouter(
    prefix='/auth',
    tags=['authentication']
)


@auth_router.post('/sign-up', response_model=Token)
def sing_up(
        user_data: UserCreate,
        service: AuthService = Depends(),
):
    return service.register_user(user_data)


@auth_router.post('/sign-in', response_model=Token)
def sign_in(
        form_data: OAuth2PasswordRequestForm = Depends(),
        service: AuthService = Depends(),
):
    return service.authenticate_user(
        form_data.username.lower(),
        form_data.password,
    )


@auth_router.get('/user', response_model=User)
def get_user(user: User = Depends(get_current_user)):
    return user
