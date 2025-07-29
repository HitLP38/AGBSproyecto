// ✅ src/features/dashboard/components/SummaryCards.tsx
import { Box, Paper, Typography } from "@mui/material";
import { ResultResponse } from "@/infra/api/resultsApi";
import { format, parseISO } from "date-fns";

interface Props {
  results: ResultResponse[];
}

export const SummaryCards = ({ results }: Props) => {
  const total = results.length;
  const avg =
    total > 0
      ? Number((results.reduce((a, b) => a + b.score, 0) / total).toFixed(2))
      : 0;

  const last = results
    .slice()
    .sort(
      (a, b) =>
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    )[0];

  const best = results.reduce(
    (max, r) => (r.score > max.score ? r : max),
    results[0] || { score: 0 }
  );

  const cards = [
    {
      label: "Puntaje Promedio",
      value: `${avg} / 40`,
    },
    {
      label: "Registros Totales",
      value: total,
    },
    {
      label: "Último Resultado",
      value: last
        ? `${last.exercise_id} (${format(
            parseISO(last.timestamp),
            "dd/MM/yyyy"
          )})`
        : "-",
    },
    {
      label: "Mejor Puntaje",
      value: best ? `${best.score} / 40` : "-",
    },
  ];

  return (
    <Box
      display="flex"
      flexWrap="wrap"
      gap={2}
      justifyContent="space-between"
      mt={2}
      mb={4}
    >
      {cards.map((card, index) => (
        <Paper
          key={index}
          sx={{
            flex: "1 1 calc(25% - 16px)",
            minWidth: 180,
            p: 3,
            backgroundColor: "secondary.main",
          }}
        >
          <Typography variant="body2" color="text.secondary" gutterBottom>
            {card.label}
          </Typography>
          <Typography variant="h6" fontWeight={700}>
            {card.value}
          </Typography>
        </Paper>
      ))}
    </Box>
  );
};
