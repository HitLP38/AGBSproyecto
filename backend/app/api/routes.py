"""Rutas principales de la API"""

# 📄 backend/app/api/routes.py

from fastapi import APIRouter

# ✅ Corrección: importamos el router correcto
from app.api.results import router as results_router
from app.api.api_v1.endpoints.score import router as score_router

router = APIRouter()

# ✅ Agregamos los routers con prefijo
router.include_router(results_router, prefix="/results", tags=["results"])
router.include_router(score_router, prefix="/score", tags=["score"])

