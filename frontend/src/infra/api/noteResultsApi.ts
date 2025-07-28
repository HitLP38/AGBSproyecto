// ✅ src/infra/api/noteResultsApi.ts

import axios from "@/lib/axios"; // Asegúrate que tienes este helper configurado

const BASE_URL = "/results"; // Corregido: sin /api/ prefix

/**
 * Elimina un resultado por ID.
 * @param id ID del resultado
 */
export const deleteNoteResult = async (id: string): Promise<void> => {
  try {
    await axios.delete(`${BASE_URL}/${id}`);
  } catch (error) {
    console.error("Error al eliminar resultado:", error);
    throw error;
  }
};
