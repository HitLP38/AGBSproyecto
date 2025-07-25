# app/db/crud/note_results.py

from sqlalchemy.orm import Session
from app.models.note_result import NoteResult
from typing import List, Optional


def create_note_result(
    db: Session,
    user_id: str,
    grado: int,
    sexo: str,
    puntajes: List[int],
    puntaje_total: int,
    nota_final: float,
) -> NoteResult:
    """
    Guarda un nuevo registro de nota final calculada para un usuario.
    """
    nota = NoteResult(
        user_id=user_id,
        grado=grado,
        sexo=sexo,
        puntajes=puntajes,
        puntaje_total=puntaje_total,
        nota_final=nota_final,
    )
    db.add(nota)
    db.commit()
    db.refresh(nota)
    return nota


def get_note_results_by_user(db: Session, user_id: str) -> List[NoteResult]:
    """
    Retorna todas las notas finales registradas por un usuario.
    """
    return db.query(NoteResult).filter(NoteResult.user_id == user_id).all()


def get_last_note_result(db: Session, user_id: str) -> Optional[NoteResult]:
    """
    Retorna la última nota final registrada por un usuario.
    """
    return (
        db.query(NoteResult)
        .filter(NoteResult.user_id == user_id)
        .order_by(NoteResult.created_at.desc())
        .first()
    )
