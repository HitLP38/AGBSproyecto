# ✅ backend/app/api/routes.py
from fastapi import APIRouter
from app.api.results import router as results_router
from app.api.api_v1.routes import router as api_v1_router

router = APIRouter()
router.include_router(results_router, prefix="/results", tags=["results"])
router.include_router(api_v1_router, prefix="/api", tags=["api-v1"])
