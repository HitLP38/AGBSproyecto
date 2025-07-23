import { getScoreFromBackend } from "@/infra/api/resultsApi";

/**
 * Calcula el puntaje de un ejercicio consultando al backend.
 * Ya no se hace cálculo local, se usa el servicio oficial.
 */
export const calculateScore = async (
  exerciseId: string,
  value: number,
  sexo: string,
  grado: string
): Promise<number> => {
  try {
    const score = await getScoreFromBackend(exerciseId, value, sexo, grado);
    return score;
  } catch (error) {
    console.error("Error al calcular el puntaje:", error);
    return 0;
  }
};
