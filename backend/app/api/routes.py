"""Rutas principales de la API para resultados"""

from typing import List  # 🔹 Import estándar primero

from fastapi import APIRouter, Depends  # 🔸 Luego third-party
from sqlalchemy.orm import Session

from app.schemas.result import ResultCreate, ResultResponse  # 🔹 Después locales
from app.services import result_service
from app.db.session import get_db


router = APIRouter()

@router.get("/ping")
async def ping():
    return {"message": "pong"}

@router.post("/results", response_model=ResultResponse)
def create_result(result: ResultCreate, db: Session = Depends(get_db)):
    return result_service.create_result(db, result)

@router.get("/results/{user_id}", response_model=List[ResultResponse])
def get_results(user_id: str, db: Session = Depends(get_db)):
    return result_service.get_by_user(db, user_id=user_id)
