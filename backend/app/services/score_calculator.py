from typing import Optional
from sqlalchemy.orm import Session
from app.models.score_table import ScoreReference
from app.core.score_logic import (
    calcular_50m_lisos,
    calcular_puntaje_generico,
    calcular_extensiones_brazo,
    convertir_a_segundos,
    PARAMETROS_EJERCICIOS
)


def get_score_by_marca(
    db: Session,
    exercise_id: str,
    sexo: str,
    grado,
    marca: str
) -> dict:
    """
    Retorna el puntaje correspondiente y puntaje máximo (maxScore).

    - Si el ejercicio tiene función definida (50m-lisos, salto-vertical, extensiones-brazo):
        → Se calcula directamente en código.
    - Si es un ejercicio con tabla (1000m, natacion-50m, etc.):
        → Se compara contra la tabla score_reference por marca más cercana sin superar.
    """

    # === 1. Normalizar sexo si viene como texto completo ===
    sexo = sexo.upper().strip()
    if sexo == "HOMBRE":
        sexo = "H"
    elif sexo == "MUJER":
        sexo = "M"

    # ✅ 2. Asegurar que grado sea un número entero
    if isinstance(grado, str):
        try:
            grado = int(grado)
        except ValueError:
            return {"puntaje": 0, "maxScore": 40}

    ejercicio_key = (exercise_id, grado)

    # === 3. Función especial para 50m-lisos ===
    if exercise_id == "50m-lisos":
        try:
            marca_float = float(marca)
            puntaje = calcular_50m_lisos(sexo, grado, marca_float)
            return {"puntaje": puntaje, "maxScore": 40}
        except ValueError:
            return {"puntaje": 0, "maxScore": 40}

    # === 4. Funciones definidas por fórmula ===
    if ejercicio_key in PARAMETROS_EJERCICIOS:
        try:
            marca_float = float(marca)
            parametros = PARAMETROS_EJERCICIOS[ejercicio_key]
            if exercise_id == "extensiones-brazo":
                puntaje = calcular_extensiones_brazo(sexo, marca_float, parametros)
            else:
                puntaje = calcular_puntaje_generico(sexo, marca_float, parametros)

            return {"puntaje": puntaje, "maxScore": 40}
        except ValueError:
            return {"puntaje": 0, "maxScore": 40}

    # === 5. Buscar marca más cercana (para ejercicios con tabla) ===
    try:
        marca_en_segundos = convertir_a_segundos(marca)
    except ValueError:
        return {"puntaje": 0, "maxScore": 40}

    resultados: list[ScoreReference] = db.query(ScoreReference).filter(
        ScoreReference.exercise_id == exercise_id,
        ScoreReference.sexo == sexo,
        ScoreReference.grado == grado
    ).all()

    if not resultados:
        return {"puntaje": 0, "maxScore": 40}

    marcas_ordenadas = sorted(
        [r for r in resultados if es_marca_valida(r.marca)],
        key=lambda r: convertir_a_segundos(r.marca)
    )

    mejor_puntaje = 0

    for r in marcas_ordenadas:
        try:
            segundos_ref = convertir_a_segundos(r.marca)
            if marca_en_segundos >= segundos_ref:
                mejor_puntaje = r.puntaje
            else:
                break
        except ValueError:
            continue

    return {"puntaje": mejor_puntaje, "maxScore": 40}


# ==========================
# Funciones auxiliares
# ==========================

def es_marca_valida(marca: str) -> bool:
    """
    Verifica si una marca se puede convertir a segundos.
    """
    try:
        convertir_a_segundos(marca)
        return True
    except Exception:
        return False
