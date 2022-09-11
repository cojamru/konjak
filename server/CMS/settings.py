from pydantic import BaseSettings


class Settings(BaseSettings):
    server_host: str = '127.0.0.1'
    server_port: int = 8000
    database_password: str = "qwerty"
    database_url: str = f"postgresql+psycopg2://postgres:{database_password}@localhost:5432/testdb"

    jwt_secret: str = None
    jwt_algorithm: str = 'HS256'
    jwt_expiration: int = 3600


settings = Settings(
    _env_file='.env',
    _env_file_encoding='utf-8',
)
