import { create } from "zustand";
import { exercises as exerciseList } from "@/domain/exercise/data/exercises";

interface ExerciseState {
  selected: string[];
  favorites: string[];
  exercises: typeof exerciseList;
  toggleSelect: (id: string) => void;
  toggleFavorite: (id: string) => void;
}

export const useExerciseStore = create<ExerciseState>((set, get) => ({
  selected: [],
  favorites: [],
  exercises: exerciseList,
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
}));
