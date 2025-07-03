import { Box, Paper, Typography, useTheme, useMediaQuery } from "@mui/material";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LabelList,
  Cell, // <- Agregar esta importación
} from "recharts";
import { ResultResponse } from "@/infra/api/resultsApi";
import { exercises } from "@/domain/exercise/data/exercises";

interface Props {
  results: ResultResponse[];
}

const exerciseColors: Record<string, string> = {
  pushups: "#FFB3BA",
  pullups: "#FFDFBA",
  squats: "#FFFFBA",
  running: "#BAE1FF",
  plank: "#BAFFC9",
};

export const ScoreChart = ({ results }: Props) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));

  // Agrupar puntajes por ejercicio
  const grouped: Record<string, number[]> = {};
  results.forEach((r) => {
    if (!r.exercise_id || r.score == null) return;
    if (!grouped[r.exercise_id]) grouped[r.exercise_id] = [];
    grouped[r.exercise_id].push(r.score);
  });

  const chartData = Object.entries(grouped).map(([exerciseId, scores]) => {
    const avg =
      scores.reduce((acc, val) => acc + val, 0) / Math.max(scores.length, 1);
    return {
      exercise: exercises.find((e) => e.id === exerciseId)?.name ?? exerciseId,
      avgScore: parseFloat(avg.toFixed(2)),
      color: exerciseColors[exerciseId] || "#8884d8",
    };
  });

  return (
    <Box width="100%">
      <Typography variant="h6" fontWeight={600} mb={2}>
        Puntaje promedio por ejercicio
      </Typography>
      <Paper
        elevation={3}
        sx={{
          p: 2,
          height: isMobile ? 300 : isTablet ? 350 : 400,
          minHeight: 300,
        }}
      >
        {chartData.length === 0 ? (
          <Typography color="text.secondary">
            No hay datos suficientes para mostrar el promedio.
          </Typography>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="exercise" />
              <YAxis domain={[0, 20]} />
              <Tooltip />
              <Bar dataKey="avgScore">
                <LabelList
                  dataKey="avgScore"
                  position="top"
                  formatter={(value: any) => value?.toFixed(1)}
                />
                {chartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.color}
                    stroke="#555"
                    strokeWidth={0.5}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        )}
      </Paper>
    </Box>
  );
};
