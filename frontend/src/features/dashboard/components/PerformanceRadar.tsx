// ✅ src/features/dashboard/components/PerformanceRadar.tsx
import { Typography, useTheme, useMediaQuery } from "@mui/material";
import { ResultResponse } from "@/infra/api/resultsApi";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";
import { groupBy, maxBy, minBy } from "lodash";
import { exercises } from "@/domain/exercise/data/exercises";

interface Props {
  results: ResultResponse[];
}

interface RadarData {
  exercise: string;
  fullName: string;
  max: number;
  avg: number;
  min: number;
}

export const PerformanceRadar = ({ results }: Props) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  // Agrupar resultados por ejercicio
  const grouped = groupBy(results, "exercise_id");

  // Calcular estadísticas por ejercicio
  const radarData: RadarData[] = Object.entries(grouped).map(
    ([exerciseId, records]) => {
      const exercise = exercises.find((e) => e.id === exerciseId);
      const scores = records.map((r) => r.score);

      const maxScore = Math.max(...scores);
      const minScore = Math.min(...scores);
      const avgScore =
        scores.reduce((sum, score) => sum + score, 0) / scores.length;

      return {
        exercise: exercise?.name.substring(0, 10) || exerciseId, // Nombre corto para el radar
        fullName: exercise?.name || exerciseId,
        max: maxScore,
        avg: Math.round(avgScore * 10) / 10, // Redondear a 1 decimal
        min: minScore,
      };
    }
  );

  // Tooltip personalizado
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.95)",
            padding: "12px",
            border: "1px solid #ccc",
            borderRadius: "8px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          }}
        >
          <p style={{ margin: 0, fontWeight: "bold", fontSize: "14px" }}>
            {data.fullName}
          </p>
          <p style={{ margin: "4px 0", color: "#4caf50" }}>
            Máximo: {data.max}
          </p>
          <p style={{ margin: "4px 0", color: "#2196f3" }}>
            Promedio: {data.avg}
          </p>
          <p style={{ margin: "4px 0", color: "#ff9800" }}>
            Mínimo: {data.min}
          </p>
        </div>
      );
    }
    return null;
  };

  // Si no hay datos suficientes
  if (radarData.length === 0) {
    return (
      <div style={{ width: "100%", padding: "20px", textAlign: "center" }}>
        <Typography variant="h6" fontWeight={600} mb={2}>
          Análisis de Rendimiento
        </Typography>
        <Typography color="text.secondary">
          No hay datos suficientes para mostrar el análisis
        </Typography>
      </div>
    );
  }

  return (
    <div style={{ width: "100%" }}>
      <Typography variant="h6" fontWeight={600} mb={2}>
        Análisis de Rendimiento por Ejercicio
      </Typography>

      <div
        style={{
          width: "100%",
          height: isMobile ? 350 : 400,
          border: "1px solid #e0e0e0",
          borderRadius: "8px",
          backgroundColor: "#fff",
          padding: "10px",
        }}
      >
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart
            data={radarData}
            margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
          >
            <PolarGrid stroke="#e0e0e0" />
            <PolarAngleAxis
              dataKey="exercise"
              tick={{ fontSize: isMobile ? 10 : 12, fill: "#666" }}
            />
            <PolarRadiusAxis
              domain={[0, 20]}
              tick={{ fontSize: 10, fill: "#999" }}
              tickCount={5}
            />

            {/* Radar del mínimo - área sombreada */}
            <Radar
              name="Mínimo"
              dataKey="min"
              stroke="#ff9800"
              fill="#ff9800"
              fillOpacity={0.1}
              strokeWidth={2}
              strokeDasharray="5,5"
            />

            {/* Radar del promedio - línea sólida */}
            <Radar
              name="Promedio"
              dataKey="avg"
              stroke="#2196f3"
              fill="transparent"
              strokeWidth={3}
              dot={{ r: 4, fill: "#2196f3" }}
            />

            {/* Radar del máximo - línea gruesa */}
            <Radar
              name="Máximo"
              dataKey="max"
              stroke="#4caf50"
              fill="transparent"
              strokeWidth={4}
              dot={{ r: 5, fill: "#4caf50" }}
            />

            <Tooltip content={<CustomTooltip />} />
            <Legend
              verticalAlign="bottom"
              height={36}
              iconType="line"
              wrapperStyle={{ fontSize: isMobile ? "12px" : "14px" }}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      {/* Información adicional */}
      <div style={{ marginTop: "12px", padding: "0 4px" }}>
        <Typography variant="body2" color="text.secondary" align="center">
          Compara tu rendimiento:{" "}
          <strong style={{ color: "#4caf50" }}>máximo</strong>,{" "}
          <strong style={{ color: "#2196f3" }}>promedio</strong> y{" "}
          <strong style={{ color: "#ff9800" }}>mínimo</strong> por ejercicio
        </Typography>
      </div>
    </div>
  );
};
