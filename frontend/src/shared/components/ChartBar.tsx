import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

interface ChartBarProps {
  data: { name: string; score: number }[];
  color?: string;
}

export const ChartBar = ({ data, color = "#2E3E50" }: ChartBarProps) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis domain={[0, 40]} />
      <Tooltip />
      <Bar dataKey="score" fill={color} />
    </BarChart>
  </ResponsiveContainer>
);
