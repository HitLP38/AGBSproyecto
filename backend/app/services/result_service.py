"""Lógica de negocio para manejo de resultados"""

from sqlalchemy.orm import Session
from app.models.result import Result
from app.schemas.result import ResultCreate
from uuid import uuid4

def create_result(db: Session, result_data: ResultCreate) -> Result:
    db_result = Result(
        id=str(uuid4()),
        exercise_id=result_data.exercise_id,
        value=result_data.value,
        score=result_data.score,
        timestamp=result_data.timestamp,
        user_id=result_data.user_id,
        sexo=result_data.sexo,    # ✅ Añadido
        grado=result_data.grado   # ✅ Añadido
    )
    
    db.add(db_result)
    db.commit()
    db.refresh(db_result)
    
    return db_result


def get_by_user(db: Session, user_id: str) -> list[Result]:
    return db.query(Result).filter(Result.user_id == user_id).all()

def delete_result(db: Session, result_id: str) -> bool:
    """
    Elimina un resultado por ID
    """
    result = db.query(Result).filter(Result.id == result_id).first()
    if not result:
        raise ValueError(f"No se encontró el resultado con ID: {result_id}")
    
    db.delete(result)
    db.commit()
    return True
