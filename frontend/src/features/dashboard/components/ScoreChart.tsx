import { Typography } from "@mui/material";
import {
  BarChart,
  XAxis,
  YAxis,
  Tooltip,
  Bar,
  ResponsiveContainer,
  LabelList,
} from "recharts";
import { ResultResponse } from "@/infra/api/resultsApi";
import { groupBy } from "lodash";
import { exercises } from "@/domain/exercise/data/exercises";
import { ResponsiveChartContainer } from "@/shared/ui/ResponsiveChartContainer";

interface Props {
  results: ResultResponse[];
}

export const ScoreChart = ({ results }: Props) => {
  const grouped = groupBy(results, "exercise_id");

  const data = Object.entries(grouped).map(([id, values]) => {
    const avg =
      values.reduce((sum, r) => sum + (r.score ?? 0), 0) / values.length;
    const name = exercises.find((e) => e.id === id)?.name || id;
    return { name, avg: parseFloat(avg.toFixed(1)) };
  });

  return (
    <div>
      <Typography variant="h6" fontWeight={600} mb={2}>
        Puntaje promedio por ejercicio
      </Typography>
      <ResponsiveChartContainer>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="avg" fill="#8884d8">
              <LabelList dataKey="avg" position="top" />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </ResponsiveChartContainer>
    </div>
  );
};
