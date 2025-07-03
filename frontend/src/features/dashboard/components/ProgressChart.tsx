import { Box, Paper, Typography, useTheme, useMediaQuery } from "@mui/material";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { parseISO, isValid, format } from "date-fns";
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

export const ProgressChart = ({ results }: Props) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));

  const grouped: Record<
    string,
    Array<{ timestamp: string; score: number }>
  > = {};

  results.forEach((r) => {
    if (!r.exercise_id || r.score == null || !r.timestamp) return;

    if (!grouped[r.exercise_id]) grouped[r.exercise_id] = [];

    grouped[r.exercise_id].push({
      timestamp: r.timestamp,
      score: r.score,
    });
  });

  Object.keys(grouped).forEach((key) => {
    grouped[key] = grouped[key]
      .map((item) => ({
        ...item,
        timestamp: format(parseISO(item.timestamp), "MM/yyyy"), // solo mes/año
      }))
      .sort(
        (a, b) =>
          parseISO(a.timestamp).getTime() - parseISO(b.timestamp).getTime()
      );
  });

  const hasData = Object.keys(grouped).length > 0;

  return (
    <Box width="100%">
      <Typography variant="h6" fontWeight={600} mb={2}>
        Evolución del puntaje en el tiempo
      </Typography>
      <Paper
        elevation={3}
        sx={{
          p: 2,
          height: isMobile ? 300 : isTablet ? 350 : 400,
          minHeight: 300,
        }}
      >
        {hasData ? (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="timestamp" />
              <YAxis domain={[0, 20]} />
              <Tooltip />
              <Legend />
              {Object.entries(grouped).map(([exerciseId, data]) => (
                <Line
                  key={exerciseId}
                  type="monotone"
                  dataKey="score"
                  data={data}
                  name={
                    exercises.find((e) => e.id === exerciseId)?.name ??
                    exerciseId
                  }
                  stroke={exerciseColors[exerciseId] || "#8884d8"}
                  dot={{ r: 3 }}
                  strokeWidth={2}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <Typography color="text.secondary">
            No hay datos suficientes para mostrar la evolución.
          </Typography>
        )}
      </Paper>
    </Box>
  );
};
