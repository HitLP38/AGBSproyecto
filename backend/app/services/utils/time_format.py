def convertir_a_segundos(marca_str: str) -> float:
    """
    Convierte una marca tipo 'min:seg' o 'min:seg:miliseg' a segundos.
    
    Ejemplos:
    - "2:48" → 168.0
    - "0:37" → 37.0
    - "1:30.5" → 90.5
    - "1:30:20" → 90.333... (1 min, 30 seg, 20 centésimas)

    Si no contiene ':', intenta convertir directamente a float.

    Retorna:
        float: marca en segundos
    """
    try:
        if ":" in marca_str:
            partes = marca_str.split(":")
            if len(partes) == 2:
                minutos, segundos = partes
                return int(minutos) * 60 + float(segundos)
            elif len(partes) == 3:
                minutos, segundos, centesimas = partes
                return int(minutos) * 60 + int(segundos) + float(f"0.{centesimas}")
        else:
            return float(marca_str)
    except Exception:
        return 0.0
