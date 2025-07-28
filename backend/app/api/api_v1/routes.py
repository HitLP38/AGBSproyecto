# ✅ backend/app/api/api_v1/routes.py
from fastapi import APIRouter

from app.api.api_v1.endpoints.score import router as score_router
from app.api.api_v1.endpoints.grades import router as grades_router

router = APIRouter()
router.include_router(score_router, prefix="/score", tags=["score"])
router.include_router(grades_router, prefix="/grades", tags=["grades"])
