# 📄 backend/app/api/api_v1/endpoints/score.py
from fastapi import APIRouter, Depends, Query
from pydantic import BaseModel, Field
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.services.score_calculator import get_score_by_marca

router = APIRouter()

class PuntajeRequest(BaseModel):
    exercise_id: str = Field(..., description="ID del ejercicio")
    marca: str = Field(..., description="Marca registrada (en segundos, cm, repeticiones, etc.)")
    sexo: str = Field(..., pattern="^(M|F|H)$", description="Sexo del usuario: M, F o H")
    grado: int = Field(..., ge=1, le=3, description="Grado académico: 1, 2 o 3")

@router.get("/", summary="Calcula puntaje oficial para una marca")
def calcular_puntaje(
    exercise_id: str = Query(..., description="ID del ejercicio"),
    marca: str = Query(..., description="Marca registrada"),
    sexo: str = Query(..., regex="^(M|F|H)$", description="Sexo del usuario: M, F o H"),
    grado: int = Query(..., ge=1, le=3, description="Grado académico: 1, 2 o 3"),
    db: Session = Depends(get_db)
):
    """
    Calcula el puntaje oficial según las tablas o funciones definidas
    dadas una marca, sexo, grado y ejercicio.
    """
    return get_score_by_marca(
        db=db,
        exercise_id=exercise_id,
        sexo=sexo,
        grado=grado,
        marca=marca
    )

# Mantener también el POST para compatibilidad si lo necesitas
@router.post("/", summary="Calcula puntaje oficial para una marca (POST)")
def calcular_puntaje_post(payload: PuntajeRequest, db: Session = Depends(get_db)):
    """
    Calcula el puntaje oficial según las tablas o funciones definidas
    dadas una marca, sexo, grado y ejercicio.
    """
    return get_score_by_marca(
        db=db,
        exercise_id=payload.exercise_id,
        sexo=payload.sexo,
        grado=payload.grado,
        marca=payload.marca
    )
