import { create } from "zustand";

interface DashboardFilterStore {
  dateRange: [Date | null, Date | null];
  selectedExercises: string[];
  onlyFavorites: boolean;
  setDateRange: (range: [Date | null, Date | null]) => void;
  setSelectedExercises: (ids: string[]) => void;
  setOnlyFavorites: (value: boolean) => void;
}

export const useDashboardFilterStore = create<DashboardFilterStore>((set) => ({
  dateRange: [null, null],
  selectedExercises: [],
  onlyFavorites: false,
  setDateRange: (range) => set({ dateRange: range }),
  setSelectedExercises: (ids) => set({ selectedExercises: ids }),
  setOnlyFavorites: (value) => set({ onlyFavorites: value }),
}));
