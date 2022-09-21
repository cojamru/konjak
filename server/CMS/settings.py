from pydantic import BaseSettings


class Settings(BaseSettings):
    server_host: str = '127.0.0.1'
    server_port: int = 8000
    database_url: str = f"postgresql+psycopg2://..."

    jwt_secret: str = 'secret'
    jwt_algorithm: str = 'HS256'
    jwt_expiration: int = 3600

    uploadcare_public_key: str = 'uploadcare_public_key'
    uploadcare_secret_key: str = 'uploadcare_secret_key'


settings = Settings(
    _env_file='.env',   # settings fields imports from .env file
    _env_file_encoding='utf-8',
)
