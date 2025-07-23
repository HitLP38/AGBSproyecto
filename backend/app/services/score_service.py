from sqlalchemy.orm import Session
from sqlalchemy import and_, desc
from app.models.score_table import ScoreReference


def get_score_by_marca(
    db: Session,
    exercise_id: str,
    sexo: str,
    grado: int,
    marca: float
) -> int:
    """
    Retorna el puntaje correspondiente a la marca alcanzada por el usuario,
    buscando en la tabla oficial el puntaje más alto cuya marca sea menor o igual.

    Si no encuentra ninguna marca válida, retorna 0.
    """
    result = (
        db.query(ScoreReference)
        .filter(
            and_(
                ScoreReference.exercise_id == exercise_id,
                ScoreReference.sexo == sexo,
                ScoreReference.grado == grado,
                ScoreReference.marca <= marca  # buscamos la marca más cercana por debajo
            )
        )
        .order_by(desc(ScoreReference.marca))  # tomar la marca más cercana inferior
        .first()
    )

    return result.puntaje if result else 0
