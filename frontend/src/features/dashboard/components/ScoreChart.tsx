// src/features/dashboard/components/ScoreChart.tsx
import { Box, Paper, Typography } from "@mui/material";
import { ResultResponse } from "@/infra/api/resultsApi";

interface Props {
  results: ResultResponse[];
}

export const ScoreChart = ({ results }: Props) => {
  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="body1" color="text.secondary">
        (Aquí irá un gráfico de barras con los últimos puntajes por ejercicio)
      </Typography>
      <Typography variant="body2" mt={2}>
        Último resultado cargado: {results.at(-1)?.score ?? "N/A"}
      </Typography>
    </Paper>
  );
};
