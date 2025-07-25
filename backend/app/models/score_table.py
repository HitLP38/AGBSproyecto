from sqlalchemy import Column, Integer, String, Float
from app.db.base_class import Base


class ScoreReference(Base):
    """
    Tabla que representa los puntajes oficiales por marca para cada ejercicio
    según sexo y grado, como en EMIEOF y EMIES CGET.
    """
    __tablename__ = "score_reference"

    id = Column(Integer, primary_key=True, index=True)
    
    exercise_id = Column(String, index=True)  # Ej: "extensiones-brazos", "6km", etc.
    grado = Column(Integer, index=True)       # 1, 2, o 3
    sexo = Column(String, index=True)         # "M" o "F"
    
    # Marca registrada (en segundos, cm o repeticiones según el ejercicio)
    # Puede representarse como float (e.g. 6.8 seg), entero (50 rep) o segundos (para 6km o 1000m)
    marca = Column(String(15), index=True)

    
    # Puntaje oficial asociado a esa marca (de 0 a 40)
    puntaje = Column(Integer)

    def __repr__(self):
        return f"<ScoreReference(exercise_id='{self.exercise_id}', grado={self.grado}, sexo='{self.sexo}', marca={self.marca}, puntaje={self.puntaje})>"