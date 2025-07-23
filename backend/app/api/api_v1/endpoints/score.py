# 📄 backend/app/api/api_v1/endpoints/score.py

from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from app.db.session import get_db  # ✅ Corregido: app.db, no backend.app
from app.services.score_service import get_score_by_marca  # ✅ Corregido

router = APIRouter()

@router.get("/", response_model=int)
def calcular_puntaje(
    exercise_id: str = Query(..., description="ID del ejercicio"),
    marca: float = Query(..., description="Marca registrada (en segundos, cm, repeticiones, etc.)"),
    sexo: str = Query(..., pattern="^(M|F)$", description="Sexo del usuario: M o F"),  # ⚠️ regex -> pattern
    grado: int = Query(..., ge=1, le=3, description="Grado: 1, 2 o 3"),
    db: Session = Depends(get_db)
):
    """
    Calcula el puntaje oficial según las tablas EMIEOF/EMIES CGET
    dadas una marca, sexo, grado y ejercicio.
    """
    return get_score_by_marca(db, exercise_id, sexo, grado, marca)
