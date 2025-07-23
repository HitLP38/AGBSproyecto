from sqlalchemy.orm import Session
from app.models.note_conversion import NoteConversion

def get_final_grade(total_score: int, db: Session) -> float | None:
    """
    Retorna la nota final correspondiente a la suma total del puntaje de los 6 ejercicios.

    Si no existe una nota exacta en la tabla, busca el puntaje inmediatamente inferior.

    Args:
        total_score (int): Puntaje total (de 0 a 240).
        db (Session): Sesión de base de datos.

    Returns:
        float | None: Nota final si existe una conversión, o None si no se encuentra.
    """
    # Buscar la nota exacta
    conversion = (
        db.query(NoteConversion)
        .filter(NoteConversion.total_score <= total_score)
        .order_by(NoteConversion.total_score.desc())
        .first()
    )

    if conversion:
        return conversion.final_grade

    return None
