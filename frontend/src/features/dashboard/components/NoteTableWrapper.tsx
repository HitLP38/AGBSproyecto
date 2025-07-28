import {
  Box,
  Button,
  Snackbar,
  Alert,
  Typography,
  CircularProgress,
} from "@mui/material";
import { useState } from "react";
import { ResultResponse } from "@/infra/api/resultsApi";
import { NoteTable } from "./NoteTable";
import { deleteNoteResult } from "@/infra/api/noteResultsApi";
import { getFinalGrade } from "@/infra/api/gradeApi";
import { validarSeleccionParaNota } from "@/utils/noteUtils";
import { NoteCalculationModal } from "./NoteCalculationModal";

interface Props {
  results: ResultResponse[];
  refetchResults: () => void;
}

export const NoteTableWrapper = ({ results, refetchResults }: Props) => {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedRows, setSelectedRows] = useState<ResultResponse[]>([]);
  const [loading, setLoading] = useState(false);

  const handleDelete = async (id: string) => {
    try {
      await deleteNoteResult(id);
      refetchResults();
    } catch {
      setError("Error al eliminar la nota.");
    }
  };

  const handleSelectionChange = (ids: string[]) => {
    setSelectedIds(ids);
  };

  const handleCalcularNota = () => {
    const seleccionadas = results.filter((r) => selectedIds.includes(r.id));

    const validacion = validarSeleccionParaNota(seleccionadas);

    if (!validacion.esValido) {
      setError(validacion.mensaje);
      return;
    }

    setSelectedRows(seleccionadas);
    setModalOpen(true);
  };

  return (
    <Box>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Typography variant="h5" fontWeight={600}>
          Notas Finales
        </Typography>

        <Button
          variant="contained"
          color="primary"
          onClick={handleCalcularNota}
          disabled={loading || selectedIds.length === 0}
        >
          {loading ? <CircularProgress size={20} /> : "Calcular Nota"}
        </Button>
      </Box>

      <NoteTable
        results={results}
        onDelete={handleDelete}
        onSelectionChange={handleSelectionChange}
      />

      <NoteCalculationModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        rows={selectedRows}
      />

      <Snackbar
        open={Boolean(error)}
        autoHideDuration={4000}
        onClose={() => setError(null)}
      >
        <Alert onClose={() => setError(null)} severity="error" variant="filled">
          {error}
        </Alert>
      </Snackbar>
    </Box>
  );
};
