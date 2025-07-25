# app/services/note_service.py

from typing import List
from sqlalchemy.orm import Session
from app.db.crud.note_results import create_note_result
from app.models.note_result import NoteResult


def get_final_grade(puntaje: int) -> float:
    if puntaje < 6:
        return 0.0
    elif puntaje >= 240:
        return 10.0
    elif puntaje == 239:
        return 9.9992
    elif puntaje == 238:
        return 9.977
    else:
        return round(5 + (puntaje - 6) * 0.0215, 4)


def procesar_y_guardar_nota(
    db: Session,
    user_id: str,
    grado: int,
    sexo: str,
    puntajes: List[int],
) -> NoteResult:
    if len(puntajes) != 6:
        raise ValueError("Se requieren exactamente 6 puntajes para calcular la nota.")

    puntaje_total = sum(puntajes)
    nota_final = get_final_grade(puntaje_total)

    return create_note_result(
        db=db,
        user_id=user_id,
        grado=grado,
        sexo=sexo,
        puntajes=puntajes,
        puntaje_total=puntaje_total,
        nota_final=nota_final
    )
