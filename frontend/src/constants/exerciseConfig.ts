export type ExerciseInputType = "time" | "integer" | "seconds" | "swim-time"; // ✅ añadido "swim-time"

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
    inputType: "seconds", // ✅ segundos con decimales
    displayFormat: "Tiempo en segundos",
    min: 5,
    max: 15,
    defaultValue: 10,
  },
  {
    id: "1000m",
    name: "1000 m",
    inputType: "time",
    displayFormat: "Tiempo (minutos y segundos)",
    min: 2 * 60,
    max: 10 * 60,
    defaultValue: 4 * 60 + 30,
  },
  {
    id: "natacion-50m",
    name: "Natación 50 m",
    inputType: "swim-time", // ✅ personalizado: minutos, segundos, décimas
    displayFormat: "Tiempo (minutos, segundos y décimas)",
    min: 20,
    max: 120,
    defaultValue: 45,
  },
  {
    id: "6Km",
    name: "6 KM",
    inputType: "time",
    displayFormat: "Tiempo (minutos)",
    min: 15 * 60,
    max: 35 * 60,
    defaultValue: 25 * 60,
  },
];
