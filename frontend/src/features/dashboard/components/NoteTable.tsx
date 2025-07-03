// ✅ src/features/dashboard/components/NoteTable.tsx
import { Box, Paper, Typography } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { parseISO, isValid, format } from "date-fns";
import { exercises } from "@/domain/exercise/data/exercises";
import { ResultResponse } from "@/infra/api/resultsApi";

interface Props {
  results: ResultResponse[];
}

export const NoteTable = ({ results }: Props) => {
  const columns: GridColDef[] = [
    {
      field: "exercise_id",
      headerName: "Ejercicio",
      flex: 1,
      sortable: true,
      valueGetter: (value, row) => {
        if (!row || !row.exercise_id) return "-";
        const ex = exercises.find((e) => e.id === row.exercise_id);
        return ex?.name || row.exercise_id;
      },
    },
    {
      field: "value",
      headerName: "Valor",
      type: "number",
      flex: 0.7,
      sortable: true,
    },
    {
      field: "score",
      headerName: "Puntaje",
      type: "number",
      flex: 0.7,
      sortable: true,
    },
    {
      field: "timestamp",
      headerName: "Fecha",
      flex: 1,
      sortable: true,
      valueFormatter: (value) => {
        if (!value) return "Sin fecha";
        try {
          const date = parseISO(value as string);
          return isValid(date)
            ? format(date, "dd/MM/yyyy HH:mm")
            : "Fecha inválida";
        } catch {
          return "Fecha inválida";
        }
      },
    },
  ];

  const validResults = results.filter((r) => r && typeof r === "object");

  return (
    <Box mt={4}>
      <Typography variant="h6" fontWeight={600} mb={2}>
        Tabla de Notas
      </Typography>

      <Paper elevation={3} sx={{ height: 400, p: 2 }}>
        <DataGrid
          rows={validResults}
          columns={columns}
          getRowId={(row) => row.id}
          initialState={{
            pagination: {
              paginationModel: { pageSize: 5, page: 0 },
            },
            sorting: {
              sortModel: [{ field: "timestamp", sort: "desc" }],
            },
          }}
          pageSizeOptions={[5, 10, 25]}
          disableRowSelectionOnClick
          disableColumnMenu={false}
          localeText={{
            noRowsLabel: "No hay datos disponibles para mostrar.",
          }}
        />
      </Paper>
    </Box>
  );
};
