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

export const useResultStore = create<ResultStore>((set) => ({
  records: [],

  saveResult: async (input, token) => {
    const result = await saveResultApi(input, token);
    set((state) => ({
      records: [...state.records, result],
    }));
  },

  fetchAll: async (userId, token) => {
    const results = await getResultsByUser(userId, token);
    set({ records: results });
  },

  reset: () => set({ records: [] }),
}));
