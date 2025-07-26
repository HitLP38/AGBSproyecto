// ✅ src/store/useExerciseStore.ts
import { create } from "zustand";
import { exercises } from "@/domain/exercise/data/exercises";

interface ExerciseState {
  selected: string[];
  favorites: string[];
  onlyFavorites: boolean;
  toggleSelect: (id: string) => void;
  toggleFavorite: (id: string) => void;
  toggleOnlyFavorites: () => void;
  selectAll: () => void; // ✅ NUEVA
}

export const useExerciseStore = create<ExerciseState>((set, get) => ({
  selected: [],
  favorites: [],
  onlyFavorites: false,

  toggleSelect: (id) => {
    const { selected } = get();
    set({
      selected: selected.includes(id)
        ? selected.filter((x) => x !== id)
        : [...selected, id],
    });
  },

  toggleFavorite: (id) => {
    const { favorites } = get();
    set({
      favorites: favorites.includes(id)
        ? favorites.filter((x) => x !== id)
        : [...favorites, id],
    });
  },

  toggleOnlyFavorites: () =>
    set((state) => ({ onlyFavorites: !state.onlyFavorites })),

  // ✅ IMPLEMENTACIÓN DE selectAll
  selectAll: () => {
    const allExerciseIds = exercises.map((exercise) => exercise.id);
    set({ selected: allExerciseIds });
  },
}));
