"""Esquemas de Pydantic para resultados"""

from pydantic import BaseModel
from datetime import datetime

class ResultCreate(BaseModel):
    exercise_id: str
    value: float
    score: float
    timestamp: datetime
    user_id: str

class ResultResponse(ResultCreate):
    id: str
