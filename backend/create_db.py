#temporal
from app.db.session import Base, engine
from app.models.result import Result

print("Creando tablas...")
Base.metadata.create_all(bind=engine)
print("¡Listo!")
