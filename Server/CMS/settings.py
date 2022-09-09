from pydantic import BaseSettings


class Settings(BaseSettings):
    server_host: str = '127.0.0.1'
    server_port: int = 8000
    database_password: str = "qwerty"
    database_url: str = f"postgresql://postgres:{database_password}@localhost:5432/testdb"


settings = Settings(
    _env_file='.env',
    _env_file_encoding='utf-8',
)
