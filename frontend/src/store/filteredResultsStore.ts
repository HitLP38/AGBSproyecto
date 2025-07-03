// ✅ src/store/filteredResultsStore.ts
import { create } from "zustand";
import { ResultResponse } from "@/infra/api/resultsApi";

interface FilteredResultsStore {
  filtered: ResultResponse[];
  setFiltered: (results: ResultResponse[]) => void;
}

export const useFilteredResultsStore = create<FilteredResultsStore>((set) => ({
  filtered: [],
  setFiltered: (results) => set({ filtered: results }),
}));
