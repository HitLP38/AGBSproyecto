"""Modelo de datos para resultados"""

from datetime import datetime
from sqlalchemy import Column, String, Float, DateTime
from app.db.session import Base

class Result(Base):
    __tablename__ = "results"

    id = Column(String, primary_key=True, index=True)
    user_id = Column(String, index=True)
    exercise_id = Column(String, index=True)
    value = Column(Float)
    score = Column(Float)
    timestamp = Column(DateTime(timezone=True), default=datetime.utcnow)
