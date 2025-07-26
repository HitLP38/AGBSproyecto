export type ExerciseInputType = "time" | "integer";

export interface ExerciseVisualConfig {
  id: string;
  name: string;
  inputType: ExerciseInputType;
  displayFormat: string; // Cómo debe percibirlo el usuario
  min?: number;
  max?: number;
  defaultValue?: number;
}

export const exerciseConfig: ExerciseVisualConfig[] = [
  {
    id: "salto-vertical",
    name: "Salto Vertical",
    inputType: "integer",
    displayFormat: "cm (diferencia)",
    min: 30,
    max: 80,
    defaultValue: 50,
  },
  {
    id: "extensiones-brazo",
    name: "Extensiones de Brazos",
    inputType: "integer",
    displayFormat: "N° de repeticiones",
    min: 30,
    max: 80,
    defaultValue: 50,
  },
  {
    id: "50m-lisos",
    name: "50 m Lisos",
    inputType: "time",
    displayFormat: "Tiempo en segundos",
    min: 5,
    max: 30,
    defaultValue: 10,
  },
  {
    id: "1000m",
    name: "1000 m",
    inputType: "time",
    displayFormat: "Tiempo (minutos y segundos)",
    min: 2 * 60, // 2 minutos
    max: 10 * 60, // 10 minutos
    defaultValue: 4 * 60 + 30, // 4:30
  },
  {
    id: "natacion-50m",
    name: "Natación 50 m",
    inputType: "time",
    displayFormat: "Tiempo (segundos / min y seg)",
    min: 20,
    max: 120,
    defaultValue: 45,
  },
  {
    id: "6Km",
    name: "6 KM",
    inputType: "time",
    displayFormat: "Tiempo (minutos)",
    min: 15 * 60, // 15 minutos
    max: 35 * 60, // 35 minutos
    defaultValue: 25 * 60, // 25:00
  },
];
