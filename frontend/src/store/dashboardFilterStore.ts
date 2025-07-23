// ✅ src/store/dashboardFilterStore.ts
import { create } from "zustand";

interface DashboardFilterState {
  dateRange: [Date | null, Date | null];
  selectedExercises: string[];
  onlyFavorites: boolean;
  selectedSexo: string;
  selectedGrado: string;
  setDateRange: (range: [Date | null, Date | null]) => void;
  setSelectedExercises: (ids: string[]) => void;
  setOnlyFavorites: (flag: boolean) => void;
  setSelectedSexo: (sexo: string) => void;
  setSelectedGrado: (grado: string) => void;
}

export const useDashboardFilterStore = create<DashboardFilterState>((set) => ({
  dateRange: [null, null],
  selectedExercises: [],
  onlyFavorites: false,
  selectedSexo: "",
  selectedGrado: "",
  setDateRange: (r) => set({ dateRange: r }),
  setSelectedExercises: (v) => set({ selectedExercises: v }),
  setOnlyFavorites: (v) => set({ onlyFavorites: v }),
  setSelectedSexo: (s) => set({ selectedSexo: s }),
  setSelectedGrado: (g) => set({ selectedGrado: g }),
}));
