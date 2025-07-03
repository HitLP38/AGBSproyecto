// src/features/dashboard/components/ProgressChart.tsx
import { Box, Paper, Typography } from "@mui/material";
import { ResultResponse } from "@/infra/api/resultsApi";

interface Props {
  results: ResultResponse[];
}

export const ProgressChart = ({ results }: Props) => {
  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="body1" color="text.secondary">
        (Gráfico de evolución vendrá aquí más adelante)
      </Typography>
      <Typography variant="body2" mt={2}>
        Total de datos: {results.length}
      </Typography>
    </Paper>
  );
};
