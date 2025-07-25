# app/api/api_v1/endpoints/notes.py

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from app.db.session import get_db
from app.db.crud.note_results import create_note_result, get_note_results_by_user
from app.services.note_service import get_final_grade

router = APIRouter()

@router.post("/registrar", response_model=dict)
def registrar_nota_final(
    user_id: str,
    grado: int,
    sexo: str,
    puntajes: List[int],
    db: Session = Depends(get_db)
):
    """
    Guarda una nueva nota final para un usuario, calculada a partir de los 6 puntajes.
    """
    if len(puntajes) != 6:
        raise HTTPException(status_code=400, detail="Se requieren exactamente 6 puntajes")

    puntaje_total = sum(puntajes)
    nota_final = get_final_grade(puntaje_total)

    if nota_final is None:
        raise HTTPException(status_code=400, detail="No se pudo calcular la nota final")

    nota = create_note_result(
        db=db,
        user_id=user_id,
        grado=grado,
        sexo=sexo,
        puntajes=puntajes,
        puntaje_total=puntaje_total,
        nota_final=nota_final,
    )

    return {
        "mensaje": "✅ Nota registrada exitosamente",
        "puntaje_total": puntaje_total,
        "nota_final": nota_final,
        "nota_id": nota.id
    }


@router.get("/usuario/{user_id}", response_model=List[dict])
def obtener_notas_usuario(user_id: str, db: Session = Depends(get_db)):
    """
    Devuelve todas las notas registradas por un usuario.
    """
    notas = get_note_results_by_user(db, user_id)

    return [
        {
            "id": n.id,
            "user_id": n.user_id,
            "grado": n.grado,
            "sexo": n.sexo,
            "puntaje_total": n.puntaje_total,
            "nota_final": n.nota_final,
        }
        for n in notas
    ]
