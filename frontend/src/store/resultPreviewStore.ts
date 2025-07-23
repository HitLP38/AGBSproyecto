// ✅ src/store/resultPreviewStore.ts
import { create } from "zustand";
import { ResultInput } from "@/infra/api/resultsApi";

/**
 * Interfaz extendida para mostrar en tabla de previsualización
 * Incluye datos adicionales útiles para la UI como nombre de ejercicio, puntaje máximo, etc.
 */
export interface PreviewItem extends ResultInput {
  exercise_name: string;
  maxValue: number;
  maxScore: number;
}

/**
 * Estado global para almacenar los datos de previsualización antes de guardar
 */
interface ResultPreviewStore {
  data: PreviewItem[];
  setData: (data: PreviewItem[]) => void;
  clear: () => void;
}

export const useResultPreviewStore = create<ResultPreviewStore>((set) => ({
  data: [],

  // Establece la lista de items a previsualizar
  setData: (data) => set({ data }),

  // Limpia la tabla de previsualización
  clear: () => set({ data: [] }),
}));
