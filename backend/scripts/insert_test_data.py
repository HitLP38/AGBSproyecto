#!/usr/bin/env python3
"""
Script para insertar datos de prueba con campos sexo y grado
"""

import sys
import os
from datetime import datetime, timezone
from uuid import uuid4

# Agregar el directorio del proyecto al path
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from app.db.session import SessionLocal
from app.models.result import Result

def insert_test_data():
    db = SessionLocal()
    
    try:
        # Datos de prueba con diferentes ejercicios, sexos y grados
        test_data = [
            {
                "id": str(uuid4()),
                "user_id": "test-user-1",
                "exercise_id": "salto-vertical",
                "value": 45.5,
                "score": 85,
                "timestamp": datetime.now(timezone.utc),
                "sexo": "H",
                "grado": "2"
            },
            {
                "id": str(uuid4()),
                "user_id": "test-user-1",
                "exercise_id": "extensiones-brazo",
                "value": 25,
                "score": 78,
                "timestamp": datetime.now(timezone.utc),
                "sexo": "H",
                "grado": "2"
            },
            {
                "id": str(uuid4()),
                "user_id": "test-user-1",
                "exercise_id": "50m-lisos",
                "value": 7.2,
                "score": 92,
                "timestamp": datetime.now(timezone.utc),
                "sexo": "H",
                "grado": "2"
            },
            {
                "id": str(uuid4()),
                "user_id": "test-user-1",
                "exercise_id": "1000m",
                "value": 240,
                "score": 88,
                "timestamp": datetime.now(timezone.utc),
                "sexo": "H",
                "grado": "2"
            },
            {
                "id": str(uuid4()),
                "user_id": "test-user-1",
                "exercise_id": "natacion-50m",
                "value": 35.8,
                "score": 76,
                "timestamp": datetime.now(timezone.utc),
                "sexo": "H",
                "grado": "2"
            },
            {
                "id": str(uuid4()),
                "user_id": "test-user-1",
                "exercise_id": "6km",
                "value": 1800,
                "score": 82,
                "timestamp": datetime.now(timezone.utc),
                "sexo": "H",
                "grado": "2"
            },
            # Datos adicionales para probar diferentes combinaciones
            {
                "id": str(uuid4()),
                "user_id": "test-user-2",
                "exercise_id": "salto-vertical",
                "value": 42.0,
                "score": 80,
                "timestamp": datetime.now(timezone.utc),
                "sexo": "M",
                "grado": "1"
            },
            {
                "id": str(uuid4()),
                "user_id": "test-user-2",
                "exercise_id": "extensiones-brazo",
                "value": 20,
                "score": 75,
                "timestamp": datetime.now(timezone.utc),
                "sexo": "M",
                "grado": "1"
            }
        ]
        
        # Insertar los datos
        for data in test_data:
            result = Result(**data)
            db.add(result)
        
        db.commit()
        print(f"✅ Se insertaron {len(test_data)} registros de prueba exitosamente")
        
    except Exception as e:
        print(f"❌ Error al insertar datos: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    insert_test_data() 