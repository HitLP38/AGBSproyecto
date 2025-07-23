import os
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    DATABASE_URL: str = os.getenv("DATABASE_URL", "postgresql://usuario:password@localhost:5432/tu_basededatos")

    class Config:
        env_file = ".env"

settings = Settings()
