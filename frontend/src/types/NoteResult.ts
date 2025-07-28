// ✅ src/types/NoteResult.ts

export interface NoteResult {
  id: string; // ID único del resultado
  exercise: string; // Clave del ejercicio (ej: "salto-vertical", "1000m")
  exercise_name: string; // Nombre legible (ej: "Salto Vertical")
  puntaje: number; // Puntaje asignado por ese ejercicio
  sexo: "H" | "M"; // Sexo del aspirante (H = hombre, M = mujer)
  grado: 1 | 2 | 3; // Grado del aspirante
  fecha?: string; // (opcional) Fecha de realización
}
