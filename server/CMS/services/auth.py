from datetime import datetime, timedelta

from fastapi import HTTPException, Depends, Request
from fastapi.security import OAuth2PasswordBearer
from fastapi.security.utils import get_authorization_scheme_param
from starlette import status

from jose import jwt, JWTError
from passlib.hash import bcrypt

from pydantic import ValidationError
from sqlalchemy.orm import Session

from ..tables import User as UserORM
from ..constants import AUTH_COOKIE_NAME
from ..models import User, Token, UserCreate
from ..database import get_session
from ..settings import settings


class OAuth2PasswordBearerWithCookie(OAuth2PasswordBearer):
    def __call__(self, request: Request) -> str | None:
        authorization: str = request.headers.get("Authorization")
        scheme, param = get_authorization_scheme_param(authorization)
        if not authorization or scheme.lower() != "bearer":
            auth_cookie = request.cookies.get(AUTH_COOKIE_NAME)
            if auth_cookie:
                return auth_cookie

            if self.auto_error:
                raise HTTPException(
                    status_code=401,
                    detail="Not authenticated",
                    headers={"WWW-Authenticate": "Bearer"},
                )

        return param


oauth_scheme = OAuth2PasswordBearerWithCookie(tokenUrl='/auth/sign-in')


def get_current_user(token: str = Depends(oauth_scheme)) -> User:
    return AuthService.validate_token(token)


class AuthService:
    @classmethod
    def verify_password(cls, plain_password: str, hashed_password: str) -> bool:
        return bcrypt.verify(plain_password, hashed_password)

    @classmethod
    def hash_password(cls, plain_password: str) -> str:
        return bcrypt.hash(plain_password)

    @classmethod
    def validate_token(cls, token: str) -> User:
        exception = HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Couldn't validate credentials",
            headers={
                'WWW-Authenticate': 'Bearer'
            },
        )

        try:
            payload = jwt.decode(
                token,
                settings.jwt_secret,
                algorithms=[settings.jwt_algorithm],
            )
        except JWTError:
            raise exception

        user_data = payload.get('user')

        try:
            user = User.parse_obj(user_data)
        except ValidationError:
            raise exception from None

        return user

    @classmethod
    def create_token(cls, user: UserORM) -> Token:
        user_data = User.from_orm(user)

        now = datetime.utcnow()
        expiration_time = now + timedelta(seconds=settings.jwt_expiration)

        payload = {
            'iat': now,
            'nbf': now,
            'exp': expiration_time,
            'sub': str(user_data.id),
            'user': user_data.dict(),
        }
        token = jwt.encode(
            payload,
            settings.jwt_secret,
            settings.jwt_algorithm,
        )
        return Token(access_token=token, expires=expiration_time)

    def __init__(self, session: Session = Depends(get_session)):
        self.session = session

    def register_user(self, user_data: UserCreate) -> Token:
        user = UserORM(
            email=user_data.email.lower(),
            username=user_data.username.lower(),
            password_hash=self.hash_password(user_data.password),
        )

        self.session.add(user)
        self.session.commit()

        return self.create_token(user)

    def authenticate_user(self, username: str, password: str) -> Token:
        username_exception = HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail='Username not found',
            headers={
                'WWW-Authenticate': 'Bearer'
            },
        )

        password_exception = HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail='Username not found',
            headers={
                'WWW-Authenticate': 'Bearer'
            },
        )

        user = (
            self.session
            .query(UserORM)
            .filter_by(username=username.lower())
            .first()
        )

        if not user:
            raise username_exception

        if not self.verify_password(password, user.password_hash):
            raise password_exception

        return self.create_token(user)
