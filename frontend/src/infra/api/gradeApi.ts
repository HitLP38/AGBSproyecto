// ✅ src/infra/api/gradeApi.ts

import axios from "@/lib/axios";

/**
 * Obtiene la nota final a partir del puntaje total.
 * @param puntaje Puntaje total (0 - 240)
 * @returns Nota final (0.0 - 10.0)
 */
export const getFinalGrade = async (puntaje: number): Promise<number> => {
  try {
    const response = await axios.get("/api/grades/final", {
      params: { puntaje },
    });

    return response.data.nota;
  } catch (error) {
    console.error("Error al obtener nota final:", error);
    throw new Error("No se pudo calcular la nota final");
  }
};
