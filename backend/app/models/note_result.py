from sqlalchemy import Column, Integer, Float, String, ForeignKey
from sqlalchemy.orm import relationship
from app.db.base_class import Base


class NoteResult(Base):
    """
    Representa la nota final obtenida por un usuario en una evaluación completa (6 ejercicios).
    """
    __tablename__ = "note_results"

    id = Column(Integer, primary_key=True, index=True)
    
    user_id = Column(String, index=True, nullable=False)  # Puede cambiarse a UUID si usas Clerk
    grado = Column(Integer, nullable=False)  # 1, 2 o 3
    sexo = Column(String(1), nullable=False)  # "M" o "F"
    
    puntaje_total = Column(Integer, nullable=False)
    nota_promedio = Column(Float, nullable=False)
    nota_final = Column(Float, nullable=False)

    def __repr__(self):
        return f"<NoteResult(user_id={self.user_id}, grado={self.grado}, nota_final={self.nota_final})>"
