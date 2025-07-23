// ✅ src/store/resultStore.ts
import { create } from "zustand";
import {
  ResultInput,
  ResultResponse,
  saveResult as saveResultApi,
  getResultsByUser,
} from "@/infra/api/resultsApi";

interface ResultStore {
  records: ResultResponse[];
  saveResult: (input: ResultInput, token: string) => Promise<void>;
  fetchAll: (userId: string, token: string) => Promise<void>;
  reset: () => void;
}

export const useResultStore = create<ResultStore>((set, get) => ({
  records: [],

  // ✅ Guarda el resultado y sincroniza de inmediato desde backend
  saveResult: async (input, token) => {
    await saveResultApi(input, token);
    await get().fetchAll(input.user_id, token); // 🔄 Sincroniza
  },

  // ✅ Carga todos los resultados del usuario
  fetchAll: async (userId, token) => {
    const results = await getResultsByUser(userId, token);
    set({ records: results });
  },

  // 🔄 Limpia el estado
  reset: () => set({ records: [] }),
}));
