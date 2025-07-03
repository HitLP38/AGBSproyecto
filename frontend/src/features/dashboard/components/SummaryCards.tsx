// src/features/dashboard/components/SummaryCards.tsx
import { Box, Paper, Typography } from "@mui/material";
import { ResultResponse } from "@/infra/api/resultsApi";

interface Props {
  results: ResultResponse[];
}

export const SummaryCards = ({ results }: Props) => {
  const total = results.length;
  const avgScore =
    total > 0
      ? (results.reduce((acc, r) => acc + r.score, 0) / total).toFixed(2)
      : 0;

  return (
    <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
      <Paper sx={{ p: 2, flex: 1, minWidth: 200 }} elevation={3}>
        <Typography variant="h6" fontWeight={600}>
          🏅 Promedio
        </Typography>
        <Typography variant="h4">{avgScore}</Typography>
      </Paper>
      <Paper sx={{ p: 2, flex: 1, minWidth: 200 }} elevation={3}>
        <Typography variant="h6" fontWeight={600}>
          📊 Registros
        </Typography>
        <Typography variant="h4">{total}</Typography>
      </Paper>
    </Box>
  );
};
