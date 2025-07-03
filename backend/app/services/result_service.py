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
    )
    db.add(db_result)
    db.commit()
    db.refresh(db_result)
    return db_result

def get_by_user(db: Session, user_id: str) -> list[Result]:
    return db.query(Result).filter(Result.user_id == user_id).all()
