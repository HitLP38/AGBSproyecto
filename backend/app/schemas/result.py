"""Esquemas de Pydantic para resultados"""

from pydantic import BaseModel
from datetime import datetime
from typing import Optional  # ✅ necesario para marcar campos como opcionales

class ResultCreate(BaseModel):
    exercise_id: str
    value: float
    score: float
    timestamp: datetime
    user_id: str
    sexo: str
    grado: str

class ResultResponse(ResultCreate):
    id: str
    sexo: Optional[str] = None   # ✅ ahora es opcional para evitar errores si está NULL
    grado: Optional[str] = None  # ✅ lo mismo aquí
