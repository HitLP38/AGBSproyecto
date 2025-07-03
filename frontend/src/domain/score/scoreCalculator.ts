export const calculateScore = (exerciseId: string, value: number): number => {
  // Simulación temporal — reemplazar con tablas reales más adelante
  if (value <= 0) return 0;
  if (value >= 100) return 20;
  return Math.round((value / 100) * 20);
};
