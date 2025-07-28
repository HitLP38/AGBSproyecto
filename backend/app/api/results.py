from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from app.schemas.result import ResultCreate, ResultResponse
from app.services import result_service
from app.db.session import get_db

# ✅ Este es el router que necesitas exportar
router = APIRouter()

@router.post("/", response_model=ResultResponse)
def create_result(result: ResultCreate, db: Session = Depends(get_db)):
    return result_service.create_result(db, result)

@router.get("/{user_id}", response_model=List[ResultResponse])
def get_results(user_id: str, db: Session = Depends(get_db)):
    return result_service.get_by_user(db, user_id=user_id)

@router.delete("/{result_id}")
def delete_result(result_id: str, db: Session = Depends(get_db)):
    """
    Elimina un resultado por ID
    """
    try:
        result_service.delete_result(db, result_id)
        return {"message": "Resultado eliminado exitosamente"}
    except Exception as e:
        raise HTTPException(status_code=404, detail=f"No se pudo eliminar el resultado: {str(e)}")
