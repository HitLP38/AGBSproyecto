// ✅ src/utils/noteUtils.ts

import { ResultResponse } from "@/infra/api/resultsApi";

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
  grado: number | null;
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

  return {
    esValido: true,
    mensaje: "",
  };
};
