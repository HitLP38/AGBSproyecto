import { Box, IconButton, Paper, Typography, Tooltip } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { parseISO, isValid, format } from "date-fns";
import DeleteIcon from "@mui/icons-material/Delete";
import { exercises } from "@/domain/exercise/data/exercises";
import { ResultResponse } from "@/infra/api/resultsApi";
import { traducirSexo } from "@/utils/traducirSexo";
import { GridRowSelectionModel } from "@mui/x-data-grid";

interface Props {
  results: ResultResponse[];
  onDelete?: (id: string) => void; // función callback para borrar
  onSelectionChange?: (selectedIds: string[]) => void; // para el botón externo
}

export const NoteTable = ({ results, onDelete, onSelectionChange }: Props) => {
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
      headerAlign: "center",
      align: "center",
    },
    {
      field: "score",
      headerName: "Puntaje",
      type: "number",
      flex: 0.7,
      sortable: true,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "sexo",
      headerName: "Sexo",
      flex: 0.7,
      headerAlign: "center",
      align: "center",
      valueFormatter: (params: any) => traducirSexo(params.value),
    },
    {
      field: "grado",
      headerName: "Grado",
      flex: 0.7,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "timestamp",
      headerName: "Fecha",
      flex: 1,
      sortable: true,
      headerAlign: "center",
      align: "center",
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
    {
      field: "acciones",
      headerName: "Acciones",
      flex: 0.6,
      headerAlign: "center",
      align: "center",
      sortable: false,
      renderCell: (params) => (
        <Tooltip title="Eliminar">
          <IconButton color="error" onClick={() => onDelete?.(params.row.id)}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ),
    },
  ];

  const validResults = results.filter((r) => r && typeof r === "object");

  return (
    <Box mt={4}>
      <Typography variant="h6" fontWeight={600} mb={2}>
        Tabla de Notas
      </Typography>

      <Paper
        elevation={3}
        sx={{
          height: 420,
          p: 2,
          overflowX: "auto", // scroll horizontal en móvil
        }}
      >
        <Box minWidth={800}>
          <DataGrid
            rows={validResults}
            columns={columns}
            getRowId={(row) => row.id}
            checkboxSelection
            onRowSelectionModelChange={(
              selectionModel: GridRowSelectionModel
            ) => {
              // Convertir a array independientemente del tipo
              const selectedIds = Array.isArray(selectionModel)
                ? selectionModel.map(String)
                : Array.from(selectionModel as any).map(String);
              onSelectionChange?.(selectedIds);
            }}
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
        </Box>
      </Paper>
    </Box>
  );
};
