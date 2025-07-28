// src/utils/traducirSexo.ts

/**
 * Traduce un código de sexo ("H" o "M") a su forma legible.
 * - "H" → "Masculino"
 * - "M" → "Femenino"
 * - undefined/null → "No especificado"
 * - Otro → se devuelve tal cual
 */
export const traducirSexo = (sexo: string | undefined): string => {
  if (!sexo) return "No especificado";
  if (sexo === "H") return "HOMBRE";
  if (sexo === "M") return "MUJER";
  return sexo;
};
