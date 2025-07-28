// ✅ src/utils/noteUtils.ts

import { ResultResponse } from "@/infra/api/resultsApi";

// Lista de ejercicios oficiales requeridos para calcular la nota
const EJERCICIOS_OFICIALES = [
  "salto-vertical",
  "extensiones-brazo", 
  "50m-lisos",
  "1000m",
  "natacion-50m",
  "6Km"
];

/**
 * Verifica si hay exactamente 6 ejercicios oficiales distintos.
 */
export const esSeleccionValida = (items: ResultResponse[]): boolean => {
  if (items.length !== 6) return false;

  const ejercicios = new Set(items.map((item) => item.exercise_id));
  return ejercicios.size === 6;
};

/**
 * Verifica si todos los elementos tienen el mismo sexo y grado.
 * Retorna también si la combinación es válida.
 */
export const obtenerSexoYGrado = (
  items: ResultResponse[]
): {
  sexo: string | null;
  grado: string | null;
  valido: boolean;
} => {
  const sexos = new Set(items.map((item) => item.sexo).filter(Boolean));
  const grados = new Set(items.map((item) => item.grado).filter(Boolean));

  const valido = sexos.size === 1 && grados.size === 1;

  return {
    sexo: valido ? items[0].sexo || null : null,
    grado: valido ? items[0].grado || null : null,
    valido,
  };
};

/**
 * Suma todos los puntajes individuales de los ejercicios seleccionados.
 */
export const calcularPuntajeTotal = (items: ResultResponse[]): number => {
  return items.reduce((total, item) => total + item.score, 0);
};

/**
 * Formatea los datos seleccionados para mostrarlos en la tabla resumen del modal.
 */
export const agruparPorEjercicio = (items: ResultResponse[]) => {
  return items.map((item) => ({
    ejercicio: item.exercise_id
      .replaceAll("-", " ")
      .replace(/\b\w/g, (l) => l.toUpperCase()),
    puntaje: item.score,
    sexo: item.sexo,
    grado: item.grado,
  }));
};

/**
 * Verifica si todos los ejercicios seleccionados son oficiales.
 */
export const verificarEjerciciosOficiales = (items: ResultResponse[]): {
  esValido: boolean;
  ejerciciosFaltantes: string[];
  ejerciciosInvalidos: string[];
} => {
  const ejerciciosSeleccionados = items.map((item) => item.exercise_id);
  const ejerciciosFaltantes = EJERCICIOS_OFICIALES.filter(
    (ejercicio) => !ejerciciosSeleccionados.includes(ejercicio)
  );
  const ejerciciosInvalidos = ejerciciosSeleccionados.filter(
    (ejercicio) => !EJERCICIOS_OFICIALES.includes(ejercicio)
  );

  return {
    esValido: ejerciciosFaltantes.length === 0 && ejerciciosInvalidos.length === 0,
    ejerciciosFaltantes,
    ejerciciosInvalidos,
  };
};

/**
 * Obtiene el nombre legible de un ejercicio.
 */
export const getExerciseDisplayName = (exerciseId: string): string => {
  const exerciseNames: Record<string, string> = {
    "salto-vertical": "Salto Vertical",
    "extensiones-brazo": "Extensiones de Brazo",
    "50m-lisos": "50m Lisos",
    "1000m": "1000m",
    "natacion-50m": "Natación 50m",
    "6Km": "6 KM"
  };

  return exerciseNames[exerciseId] || exerciseId.replaceAll("-", " ").replace(/\b\w/g, (l) => l.toUpperCase());
};

/**
 * Valida la selección de ejercicios para calcular la nota final.
 * Retorna un objeto con la validación y mensaje de error si aplica.
 */
export const validarSeleccionParaNota = (
  items: ResultResponse[]
): {
  esValido: boolean;
  mensaje: string;
} => {
  // Verificar que hay exactamente 6 ejercicios
  if (items.length !== 6) {
    return {
      esValido: false,
      mensaje: `Debes seleccionar exactamente 6 ejercicios. Actualmente tienes ${items.length} seleccionados.`,
    };
  }

  // Verificar que son ejercicios distintos
  const ejerciciosUnicos = new Set(items.map((item) => item.exercise_id));
  if (ejerciciosUnicos.size !== 6) {
    return {
      esValido: false,
      mensaje:
        "Debes seleccionar 6 ejercicios diferentes. Hay ejercicios duplicados en tu selección.",
    };
  }

  // Verificar que todos tienen el mismo sexo y grado
  const { valido: sexoYGradoValido } = obtenerSexoYGrado(items);
  if (!sexoYGradoValido) {
    return {
      esValido: false,
      mensaje:
        "Todos los ejercicios seleccionados deben tener el mismo sexo y grado.",
    };
  }

  // Verificar que son ejercicios oficiales
  const { esValido: ejerciciosOficialesValidos, ejerciciosFaltantes, ejerciciosInvalidos } = 
    verificarEjerciciosOficiales(items);
  
  if (!ejerciciosOficialesValidos) {
    if (ejerciciosFaltantes.length > 0) {
      const faltantes = ejerciciosFaltantes.map(getExerciseDisplayName).join(", ");
      return {
        esValido: false,
        mensaje: `Faltan los siguientes ejercicios oficiales: ${faltantes}`,
      };
    }
    
    if (ejerciciosInvalidos.length > 0) {
      const invalidos = ejerciciosInvalidos.map(getExerciseDisplayName).join(", ");
      return {
        esValido: false,
        mensaje: `Los siguientes ejercicios no son oficiales para el cálculo de nota: ${invalidos}`,
      };
    }
  }

  return {
    esValido: true,
    mensaje: "",
  };
};
