import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from "@mui/material";
import { ResultResponse } from "@/infra/api/resultsApi";

interface ResultTableProps {
  results: ResultResponse[];
}

export const ResultTable = ({ results }: ResultTableProps) => {
  return (
    <Box>
      <Typography variant="h6" fontWeight={600} mb={2}>
        Historial de Resultados
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Ejercicio</TableCell>
              <TableCell>Valor</TableCell>
              <TableCell>Puntaje</TableCell>
              <TableCell>Fecha</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {results.map((r) => (
              <TableRow key={r.id}>
                <TableCell>{r.exercise_id}</TableCell>
                <TableCell>{r.value}</TableCell>
                <TableCell>{r.score}</TableCell>
                <TableCell>
                  {new Date(r.timestamp).toLocaleDateString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};
