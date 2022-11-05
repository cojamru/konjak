from fastapi import APIRouter, Depends, Response
from fastapi.security import OAuth2PasswordRequestForm

from ..constants import AUTH_COOKIE_NAME
from ..models import Token, UserCreate, User
from ..services import AuthService, get_current_user

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
        response: Response,
        form_data: OAuth2PasswordRequestForm = Depends(),
        service: AuthService = Depends(),
):
    token = service.authenticate_user(
        form_data.username.lower(),
        form_data.password,
    )

    response.set_cookie(
        key=AUTH_COOKIE_NAME,
        value=token.access_token,
        httponly=True,
        path='/',
        samesite='None',
        secure=True,
        expires=int(token.expires.timestamp())
    )

    return token


@auth_router.get('/user', response_model=User)
def get_user(user: User = Depends(get_current_user)):
    return user
