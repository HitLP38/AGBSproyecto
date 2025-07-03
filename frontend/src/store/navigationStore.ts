import { create } from "zustand";

export type ViewName =
  | "home"
  | "welcome"
  | "exercises"
  | "dashboard"
  | "history"
  | "results"
  | "profile";

interface NavigationState {
  currentView: ViewName;
  setView: (view: ViewName) => void;
}

export const useNavigationStore = create<NavigationState>()((set) => ({
  currentView: "welcome",
  setView: (view) => set({ currentView: view }),
}));
