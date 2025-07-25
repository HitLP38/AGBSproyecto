from typing import Dict, Tuple
from dataclasses import dataclass


@dataclass
class ParametrosEjercicio:
    """Parámetros para el cálculo de puntajes por ejercicio con fórmula"""
    b_hombre: float
    dif_hombre: float
    max_hombre: float
    b_mujer: float
    dif_mujer: float
    max_mujer: float
    avance: float
    puntaje_min: int
    mayor_mejor: bool

    def get_parametros(self, sexo: str) -> Tuple[float, float, float]:
        if sexo == "H":
            return self.b_hombre, self.dif_hombre, self.max_hombre
        elif sexo == "M":
            return self.b_mujer, self.dif_mujer, self.max_mujer
        else:
            raise ValueError("Sexo no válido. Use 'H' o 'M'.")


# === Parámetros definidos por fórmula para 3 ejercicios ===
PARAMETROS_EJERCICIOS: Dict[Tuple[str, int], ParametrosEjercicio] = {
    # SALTO VERTICAL
    ("salto-vertical", 1): ParametrosEjercicio(42, 59, 70, 36, 53, 64, 1, 18, True),
    ("salto-vertical", 2): ParametrosEjercicio(46, 59, 72, 40, 53, 66, 1, 14, True),
    ("salto-vertical", 3): ParametrosEjercicio(48, 61, 74, 42, 55, 68, 1, 14, True),

    # EXTENSIONES DE BRAZO
    ("extensiones-brazo", 1): ParametrosEjercicio(20, 47, 57, 14, 41, 51, 1, 20, True),
    ("extensiones-brazo", 2): ParametrosEjercicio(22, 51, 60, 16, 45, 54, 1, 22, True),
    ("extensiones-brazo", 3): ParametrosEjercicio(24, 57, 64, 18, 51, 58, 1, 26, True),
}


# === Tabla oficial para 50m lisos ===
TABLA_50M_LISOS = {
    1: {
        "H": {
            6.6: 40, 6.7: 36, 6.8: 32, 6.9: 28, 7.0: 24, 7.1: 21, 7.2: 18,
            7.3: 15, 7.4: 12, 7.5: 9, 7.6: 6, 7.7: 4, 7.8: 2, 7.9: 1
        },
        "M": {
            7.4: 40, 7.5: 36, 7.6: 32, 7.7: 28, 7.8: 24, 7.9: 21, 8.0: 18,
            8.1: 15, 8.2: 12, 8.3: 9, 8.4: 6, 8.5: 4, 8.6: 2, 8.7: 1
        }
    },
    2: {
        "H": {
            6.5: 40, 6.6: 36, 6.7: 32, 6.8: 27, 6.9: 24, 7.0: 21, 7.1: 18,
            7.2: 15, 7.3: 12, 7.4: 9, 7.5: 6, 7.6: 4, 7.7: 2, 7.8: 1
        },
        "M": {
            7.3: 40, 7.4: 36, 7.5: 32, 7.6: 28, 7.7: 24, 7.8: 21, 7.9: 18,
            8.0: 15, 8.1: 12, 8.2: 9, 8.3: 6, 8.4: 4, 8.5: 2, 8.6: 1
        }
    },
    3: {
        "H": {
            6.4: 40, 6.5: 36, 6.6: 32, 6.7: 27, 6.8: 24, 6.9: 21, 7.0: 18,
            7.1: 15, 7.2: 12, 7.3: 9, 7.4: 6, 7.5: 4, 7.6: 2, 7.7: 1
        },
        "M": {
            7.2: 40, 7.3: 36, 7.4: 32, 7.5: 28, 7.6: 24, 7.7: 21, 7.8: 18,
            7.9: 15, 8.0: 12, 8.1: 9, 8.2: 6, 8.3: 4, 8.4: 2, 8.5: 1
        }
    }
}


def calcular_50m_lisos(sexo: str, grado: int, marca: float) -> int:
    """
    Devuelve el puntaje correspondiente para 50m lisos según tablas oficiales.
    """
    if grado not in TABLA_50M_LISOS:
        return 0

    if sexo not in TABLA_50M_LISOS[grado]:
        return 0

    tabla = TABLA_50M_LISOS[grado][sexo]

    # Exact match
    if marca in tabla:
        return tabla[marca]

    # Buscar interpolación inferior
    marcas_ordenadas = sorted(tabla.keys())
    if marca < marcas_ordenadas[0]:
        return max(tabla.values())  # Mejor que mejor marca
    if marca > marcas_ordenadas[-1]:
        return 0  # Peor que peor marca

    for i in range(len(marcas_ordenadas) - 1):
        low = marcas_ordenadas[i]
        high = marcas_ordenadas[i + 1]
        if low < marca < high:
            p_low = tabla[low]
            p_high = tabla[high]
            frac = (marca - low) / (high - low)
            return int(round(p_low - frac * (p_low - p_high)))

    return 0


def calcular_puntaje_generico(sexo: str, marca: float, parametros: ParametrosEjercicio) -> int:
    """
    Calcula el puntaje para ejercicios definidos por fórmula.
    """
    b, dif, max_val = parametros.get_parametros(sexo)
    avance = parametros.avance
    puntaje_min = parametros.puntaje_min
    mayor_mejor = parametros.mayor_mejor

    if mayor_mejor:
        if marca < b:
            return 0
        if marca >= max_val:
            return 40
        if marca <= dif:
            return int(1 + avance * (marca - b))
        else:
            if marca == int(marca):
                return int(puntaje_min + 2 * avance * (marca - dif))
            else:
                return int(puntaje_min + 1 + 2 * avance * (int(marca) - dif))
    else:
        if marca > b:
            return 0
        if marca <= max_val:
            return 40
        if marca >= dif:
            return int(1 + avance * (b - marca))
        else:
            if marca == int(marca):
                return int(puntaje_min + 2 * avance * (dif - marca))
            else:
                return int(puntaje_min + 1 + 2 * avance * (int(dif) - marca))


def convertir_a_segundos(marca: str) -> float:
    """
    Convierte una marca de texto tipo 'min:seg' o 'seg' a segundos float.
    """
    if ":" in marca:
        partes = marca.strip().split(":")
        if len(partes) == 2:
            minutos, segundos = partes
            return int(minutos) * 60 + float(segundos)
        elif len(partes) == 3:
            horas, minutos, segundos = partes
            return int(horas) * 3600 + int(minutos) * 60 + float(segundos)
        else:
            raise ValueError("Formato de marca inválido")
    else:
        return float(marca)

def calcular_extensiones_brazo(sexo: str, marca: float, parametros: ParametrosEjercicio) -> int:
    """
    Calcula el puntaje para 'extensiones-brazo', considerando:
    - Escala especial si marca < (puntaje_min + 14)
    - Tramo superior si marca ≥ max_val (puntaje 40)
    - Tramo inferior si marca < dif
    - Tramo de fórmula si marca ≥ dif
    """
    b, dif, max_val = parametros.get_parametros(sexo)
    avance = parametros.avance
    puntaje_min = parametros.puntaje_min

    # Tramo superior
    if marca >= max_val:
        return 40
    if marca < puntaje_min:
        return 0

    # Escala especial inferior (valores discretos por debajo del umbral)
    umbral_escala_especial = puntaje_min + 14
    if marca < umbral_escala_especial:
        diferencia = marca - puntaje_min
        return next((p for l, p in 
                     [(2, 1), (5, 2), (7, 3), (9, 4), (11, 5), (13, 6)] 
                     if diferencia <= l), 0)

    # Tramo inferior (antes de dif)
    if marca < dif:
        return int(puntaje_min + avance * (marca - dif))

    # Tramo con fórmula general (marca >= dif)
    factor = 2 * avance * ((int(marca) if marca != int(marca) else marca) - dif)
    ajuste = 1 if marca != int(marca) else 0
    return int(puntaje_min + ajuste + factor)
