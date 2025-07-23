#!/usr/bin/env python3
import os
import sys
from sqlalchemy import create_engine, text

# Agregar el directorio backend al Python path
backend_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.insert(0, backend_dir)

# Ahora sí podemos importar
from app.core.config import settings

def load_sql_file(file_path: str):
    """Carga y ejecuta un archivo SQL"""
    engine = create_engine(settings.DATABASE_URL)
   
    try:
        with open(file_path, 'r', encoding='utf-8') as file:
            sql_content = file.read()
       
        # Dividir por declaraciones (separadas por ;)
        statements = [stmt.strip() for stmt in sql_content.split(';') if stmt.strip()]
       
        with engine.connect() as connection:
            with connection.begin():  # Usar transacción
                for statement in statements:
                    if statement:
                        print(f"Ejecutando: {statement[:50]}...")
                        connection.execute(text(statement))
       
        print("✅ Datos cargados exitosamente")
       
    except FileNotFoundError:
        print(f"❌ Archivo no encontrado: {file_path}")
    except Exception as e:
        print(f"❌ Error al cargar datos: {e}")

if __name__ == "__main__":
    # Ruta al archivo SQL
    sql_file_path = os.path.join(
        os.path.dirname(__file__),
        "..",
        "sql",
        "score_reference.sql"
    )
   
    load_sql_file(sql_file_path)