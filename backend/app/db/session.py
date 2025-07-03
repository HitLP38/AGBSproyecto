"""Configuración de la sesión de SQLAlchemy y conexión a la base de datos"""

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base, Session
from dotenv import load_dotenv
from typing import Generator
import os

# Cargar variables del archivo .env
load_dotenv()

# Leer la URL de conexión a la base de datos desde .env
DATABASE_URL = os.getenv("DATABASE_URL")

# Crear el engine (conexión principal)
engine = create_engine(DATABASE_URL, echo=True)

# Crear la clase SessionLocal para instanciar sesiones en cada petición
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Base para modelos
Base = declarative_base()

# Generador para dependencias en FastAPI
def get_db() -> Generator[Session, None, None]:
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
