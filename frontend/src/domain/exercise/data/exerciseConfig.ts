// src/domain/exercise/data/exerciseConfig.ts

export interface ExerciseInputConfig {
  id: string;
  inputType: "scroll-time" | "scroll-integer";
  label: string;
  min?: number;
  max?: number;
  step?: number;
  default?: number;
  showSeconds?: boolean;
}

export const exerciseConfig: ExerciseInputConfig[] = [
  {
    id: "salto-vertical",
    inputType: "scroll-integer",
    label: "Altura del salto (cm)",
    min: 30,
    max: 80,
    step: 1,
    default: 50,
  },
  {
    id: "extensiones-brazo",
    inputType: "scroll-integer",
    label: "N.º de repeticiones",
    min: 30,
    max: 80,
    step: 1,
    default: 50,
  },
  {
    id: "50m-lisos",
    inputType: "scroll-time",
    label: "Tiempo en segundos",
    min: 0,
    max: 59,
    step: 1,
    default: 10,
    showSeconds: true,
  },
  {
    id: "1000m",
    inputType: "scroll-time",
    label: "Tiempo (minutos y segundos)",
    min: 0,
    max: 15,
    step: 1,
    default: 4,
    showSeconds: true,
  },
  {
    id: "natacion-50m",
    inputType: "scroll-time",
    label: "Tiempo (segundos o min:seg)",
    min: 0,
    max: 59,
    step: 1,
    default: 30,
    showSeconds: true,
  },
  {
    id: "6Km",
    inputType: "scroll-time",
    label: "Tiempo en minutos",
    min: 15,
    max: 40,
    step: 1,
    default: 22,
    showSeconds: false,
  },
];
