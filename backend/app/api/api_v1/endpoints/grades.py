# ✅ backend/app/api/api_v1/endpoints/grades.py

from fastapi import APIRouter, Query
from app.services.note_service import get_final_grade

router = APIRouter()

@router.get("/final")
def calcular_nota_final(puntaje: int = Query(..., ge=0, le=240)):
    """
    Retorna la nota final correspondiente al puntaje total (0–240).
    """
    nota = get_final_grade(puntaje)
    return {"nota": nota}
