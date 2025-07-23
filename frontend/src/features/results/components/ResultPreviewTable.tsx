import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper,
} from "@mui/material";
import { PreviewItem } from "@/store/resultPreviewStore";

interface Props {
  data: PreviewItem[];
}

export const ResultPreviewTable = ({ data }: Props) => {
  return (
    <Box>
      <Typography variant="h6" gutterBottom fontWeight={600}>
        Previsualización de Resultados
      </Typography>

      <TableContainer component={Paper} elevation={3} sx={{ borderRadius: 3 }}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>
                <strong>Ejercicio</strong>
              </TableCell>
              <TableCell>
                <strong>Valor</strong>
              </TableCell>
              <TableCell>
                <strong>Puntaje</strong>
              </TableCell>
              <TableCell>
                <strong>Puntaje Máximo</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item) => (
              <TableRow key={item.exercise_id}>
                <TableCell>{item.exercise_name}</TableCell>
                <TableCell>{item.value}</TableCell>
                <TableCell>{item.score}</TableCell>
                <TableCell>{item.maxScore}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};
