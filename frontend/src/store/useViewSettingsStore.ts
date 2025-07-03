import { create } from "zustand";

interface ViewSettingsStore {
  showOnlyFavorites: boolean;
  toggleFavoritesView: () => void;
  setFavoritesView: (val: boolean) => void;
}

export const useViewSettingsStore = create<ViewSettingsStore>((set) => ({
  showOnlyFavorites: false,
  toggleFavoritesView: () =>
    set((state) => ({ showOnlyFavorites: !state.showOnlyFavorites })),
  setFavoritesView: (val) => set({ showOnlyFavorites: val }),
}));
