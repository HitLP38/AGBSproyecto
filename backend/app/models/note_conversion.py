from sqlalchemy import Column, Integer, Float
from app.db.base_class import Base

class NoteConversion(Base):
    __tablename__ = "note_conversion"

    id = Column(Integer, primary_key=True, index=True)

    # Puntaje total de los 6 ejercicios (entre 0 y 240)
    total_score = Column(Integer, nullable=False, unique=True)

    # Nota final oficial (por ejemplo 08.0, 09.5, 10.0, etc.)
    final_grade = Column(Float, nullable=False)
