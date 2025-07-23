// ✅ src/store/userProfileStore.ts
import { create } from "zustand";

interface ProfileState {
  edad: number;
  sexo: string;
  grado: string;
  setEdad: (val: number) => void;
  setSexo: (val: string) => void;
  setGrado: (val: string) => void;
}

export const useProfileStore = create<ProfileState>((set) => ({
  edad: 18,
  sexo: "",
  grado: "",
  setEdad: (edad) => set({ edad }),
  setSexo: (sexo) => set({ sexo }),
  setGrado: (grado) => set({ grado }),
}));
