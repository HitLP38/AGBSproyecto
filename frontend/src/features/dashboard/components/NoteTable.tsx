import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { format } from "date-fns";
import { ResultResponse } from "@/infra/api/resultsApi";
import { useDashboardFilterStore } from "@/store/dashboardFilterStore";
import { useExerciseStore } from "@/store/useExerciseStore";
import { filterResults } from "../utils/filterResults";

interface Props {
  results: ResultResponse[];
}

export const NoteTable = ({ results }: Props) => {
  const { dateRange, selectedExercises, onlyFavorites } =
    useDashboardFilterStore();
  const { favorites, exercises } = useExerciseStore();

  const filtered = filterResults(results, {
    dateRange,
    selectedExercises,
    onlyFavorites,
    favorites,
  });

  return (
    <TableContainer component={Paper} sx={{ mt: 4 }}>
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
          {filtered.map((r) => {
            const ex = exercises.find((e) => e.id === r.exercise_id);
            return (
              <TableRow key={r.id}>
                <TableCell>{ex?.name || r.exercise_id}</TableCell>
                <TableCell>{r.value}</TableCell>
                <TableCell>{r.score}</TableCell>
                <TableCell>
                  {format(new Date(r.timestamp), "dd/MM/yyyy")}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
