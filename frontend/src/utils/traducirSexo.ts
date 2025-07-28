// src/utils/traducirSexo.ts

/**
 * Traduce un código de sexo ("H" o "M") a su forma legible.
 * - "H" → "HOMBRE"
 * - "M" → "MUJER"
 * - "Masculino" → "HOMBRE"
 * - "Femenino" → "MUJER"
 * - undefined/null → "No especificado"
 * - Otro → se devuelve tal cual
 */
export const traducirSexo = (sexo: string | undefined): string => {
  if (!sexo) return "No especificado";
  if (sexo === "H" || sexo === "Masculino") return "HOMBRE";
  if (sexo === "M" || sexo === "Femenino") return "MUJER";
  return sexo;
};
