// ✅ src/infra/api/noteResultsApi.ts

import axios from "@/lib/axios"; // Asegúrate que tienes este helper configurado

const BASE_URL = "/api/notes"; // Ajusta si tu endpoint es diferente

/**
 * Elimina un resultado de nota por ID.
 * @param id ID del resultado de nota
 */
export const deleteNoteResult = async (id: string): Promise<void> => {
  try {
    await axios.delete(`${BASE_URL}/${id}`);
  } catch (error) {
    console.error("Error al eliminar nota:", error);
    throw error;
  }
};
