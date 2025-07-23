# 📄 backend/app/main.py

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.routes import router as api_router

app = FastAPI()

# CORS: permite llamadas desde el frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Cambia en producción
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(api_router)
