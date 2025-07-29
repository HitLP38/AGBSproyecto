//src/domain/exercise/data/exercises.ts

export interface Exercise {
  id: string;
  name: string;
  type: "reps" | "time" | "distance";
  maxValue: number; // valor real máximo permitido (según tablas oficiales)
  maxScore: number; // puntaje máximo posible (normalmente 20)
}

export const exercises: Exercise[] = [
  {
    id: "salto-vertical",
    name: "Salto Vertical",
    type: "reps",
    maxValue: 75, // cm para 20 pts (referencia masculina)
    maxScore: 40,
  },
  {
    // ✅ CORREGIDO: Cambié de "extensiones-brazos" a "extensiones-brazo"
    id: "extensiones-brazo",
    name: "Extensiones de Brazos",
    type: "reps",
    maxValue: 60, // repeticiones para 20 pts (ejemplo)
    maxScore: 40,
  },
  {
    id: "50m-lisos",
    name: "50 m Lisos",
    type: "time",
    maxValue: 7, // segundos para 20 pts (ejemplo)
    maxScore: 40,
  },
  {
    id: "1000m",
    name: "1000 m",
    type: "time",
    maxValue: 210, // 3 min 30 s para 20 pts
    maxScore: 40,
  },
  {
    id: "natacion-50m",
    name: "Natación 50 m",
    type: "time",
    maxValue: 35, // segundos para 20 pts
    maxScore: 40,
  },
  {
    // ✅ CORREGIDO: Cambié de "6km" a "6Km"
    id: "6Km",
    name: "6 KM",
    type: "time",
    maxValue: 1320, // 22 minutos para 20 pts
    maxScore: 40,
  },
];
