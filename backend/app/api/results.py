from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from app.schemas.result import ResultCreate, ResultOut
from app.services.result_service import create_result, get_results_by_user
from app.db.session import SessionLocal

router = APIRouter(prefix="/results", tags=["results"])

# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/", response_model=ResultOut)
def save_result(result: ResultCreate, db: Session = Depends(get_db)):
    return create_result(db, result)

@router.get("/", response_model=list[ResultOut])
def fetch_results(user_id: str = Query(...), db: Session = Depends(get_db)):
    return get_results_by_user(db, user_id)
