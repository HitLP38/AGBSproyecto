import { Typography } from "@mui/material";
import { ResultResponse } from "@/infra/api/resultsApi";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { groupBy, orderBy } from "lodash";
import { format, parseISO } from "date-fns";
import { exercises } from "@/domain/exercise/data/exercises";
import { ResponsiveChartContainer } from "@/shared/ui/ResponsiveChartContainer";

interface Props {
  results: ResultResponse[];
}

export const ProgressChart = ({ results }: Props) => {
  const grouped = groupBy(results, "exercise_id");
  const colors = ["#1976d2", "#e91e63", "#9c27b0", "#ff9800", "#4caf50"];

  // Obtener todas las fechas únicas y ordenarlas
  const allDates = new Set<string>();
  Object.values(grouped).forEach((records) => {
    records.forEach((r) => allDates.add(r.timestamp));
  });

  const sortedDates = Array.from(allDates).sort();

  // Definir las funciones de tick dentro del componente
  const CustomTickMonth = ({ x, y, payload }: any) => {
    if (!payload || payload.value === undefined) return null;

    const dataIndex = payload.value;
    if (dataIndex < 0 || dataIndex >= sortedDates.length) return null;

    const date = new Date(parseISO(sortedDates[dataIndex]));
    return (
      <text x={x} y={y + 15} textAnchor="middle" fontSize={12} fill="#666">
        {format(date, "dd MMM")}
      </text>
    );
  };

  const CustomTickYear = ({ x, y, payload, visibleTicksCount, index }: any) => {
    if (!payload || payload.value === undefined) return null;

    const dataIndex = payload.value;
    if (dataIndex < 0 || dataIndex >= sortedDates.length) return null;

    const date = new Date(parseISO(sortedDates[dataIndex]));
    const year = format(date, "yyyy");

    // Mostrar año solo en el primer tick
    if (index === 0) {
      return (
        <text
          x={x}
          y={y - 10}
          textAnchor="middle"
          fontWeight="bold"
          fontSize={14}
          fill="#333"
        >
          {year}
        </text>
      );
    }
    return null;
  };

  // Crear dataset combinado con todas las fechas
  const combinedData = sortedDates.map((timestamp, index) => {
    const dateObj = parseISO(timestamp);
    const dataPoint: any = {
      timestamp: dateObj.getTime(),
      date: format(dateObj, "dd MMM yyyy"),
      index: index, // Usar índice para el eje X
    };

    // Agregar datos de cada ejercicio para esta fecha
    Object.entries(grouped).forEach(([exerciseId, records]) => {
      const record = records.find((r) => r.timestamp === timestamp);
      dataPoint[exerciseId] = record ? record.score : null;
    });

    return dataPoint;
  });

  // Preparar información de las series
  const dataSeries = Object.entries(grouped).map(([id, records], index) => {
    const exercise = exercises.find((e) => e.id === id);
    return {
      id,
      name: exercise?.name || id,
      color: colors[index % colors.length],
    };
  });

  // Calcular ancho dinámico para scroll horizontal
  const chartWidth = Math.max(800, combinedData.length * 80);

  return (
    <div style={{ width: "100%", height: "fit-content" }}>
      <Typography variant="h6" fontWeight={600} mb={2}>
        Evolución del puntaje en el tiempo
      </Typography>

      {/* Contenedor con altura fija y scroll horizontal */}
      <div
        style={{
          width: "100%",
          height: "450px", // Altura fija más controlada
          border: "1px solid #e0e0e0",
          borderRadius: "8px",
          backgroundColor: "#fff",
          overflow: "hidden", // Evitar scroll vertical del contenedor
        }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            overflowX: "auto",
            overflowY: "hidden", // Solo scroll horizontal
          }}
        >
          <LineChart
            width={chartWidth}
            height={420} // Altura ligeramente menor para que quepa bien
            data={combinedData}
            margin={{ top: 60, right: 30, left: 20, bottom: 40 }}
          >
            {/* Eje X superior: años */}
            <XAxis
              xAxisId="years"
              dataKey="index"
              axisLine={false}
              tickLine={false}
              height={30}
              orientation="top"
              tick={<CustomTickYear />}
              type="number"
              domain={[0, combinedData.length - 1]}
              tickCount={3}
            />

            {/* Eje X inferior: meses */}
            <XAxis
              xAxisId="months"
              dataKey="index"
              axisLine={true}
              tickLine={true}
              height={40}
              tick={<CustomTickMonth />}
              type="number"
              domain={[0, combinedData.length - 1]}
            />

            <YAxis />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip
              labelFormatter={(value) => {
                const dataIndex = Math.round(value);
                if (dataIndex >= 0 && dataIndex < combinedData.length) {
                  return format(
                    new Date(combinedData[dataIndex].timestamp),
                    "dd MMM yyyy"
                  );
                }
                return "";
              }}
            />
            <Legend verticalAlign="top" height={36} />

            {dataSeries.map((serie) => (
              <Line
                key={serie.id}
                xAxisId="months"
                dataKey={serie.id}
                name={serie.name}
                stroke={serie.color}
                strokeWidth={3}
                dot={{ r: 5, fill: serie.color }}
                activeDot={{ r: 7 }}
                type="monotone"
                connectNulls={true}
                isAnimationActive={false}
              />
            ))}
          </LineChart>
        </div>
      </div>
    </div>
  );
};
