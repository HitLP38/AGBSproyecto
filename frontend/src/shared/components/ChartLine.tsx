import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface ChartLineProps {
  data: { date: string; score: number }[];
  color?: string;
}

export const ChartLine = ({ data, color = "#2E3E50" }: ChartLineProps) => (
  <ResponsiveContainer width="100%" height={300}>
    <LineChart data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="date" />
      <YAxis domain={[0, 40]} />
      <Tooltip />
      <Line type="monotone" dataKey="score" stroke={color} strokeWidth={3} />
    </LineChart>
  </ResponsiveContainer>
);
