import {
  Box,
  Button,
  Snackbar,
  Alert,
  Typography,
  CircularProgress,
  Chip,
} from "@mui/material";
import { useState } from "react";
import { ResultResponse } from "@/infra/api/resultsApi";
import { NoteTable } from "./NoteTable";
import { deleteNoteResult } from "@/infra/api/noteResultsApi";
import { getFinalGrade } from "@/infra/api/gradeApi";
import { validarSeleccionParaNota } from "@/utils/noteUtils";
import { NoteCalculationModal } from "./NoteCalculationModal";
import DeleteIcon from "@mui/icons-material/Delete";

interface Props {
  results: ResultResponse[];
  refetchResults: () => void;
}

export const NoteTableWrapper = ({ results, refetchResults }: Props) => {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedRows, setSelectedRows] = useState<ResultResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const [deletingSelected, setDeletingSelected] = useState(false);

  const handleDelete = async (id: string) => {
    try {
      setLoading(true);
      await deleteNoteResult(id);
      setSuccess("Resultado eliminado exitosamente");
      refetchResults();
    } catch (error) {
      setError("Error al eliminar el resultado. Inténtalo de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteSelected = async () => {
    if (selectedIds.length === 0) {
      setError("No hay elementos seleccionados para eliminar.");
      return;
    }

    try {
      setDeletingSelected(true);
      
      // Eliminar todos los elementos seleccionados
      const deletePromises = selectedIds.map(id => deleteNoteResult(id));
      await Promise.all(deletePromises);
      
      setSuccess(`${selectedIds.length} resultado${selectedIds.length !== 1 ? 's' : ''} eliminado${selectedIds.length !== 1 ? 's' : ''} exitosamente`);
      setSelectedIds([]); // Limpiar selección
      refetchResults();
    } catch (error) {
      setError("Error al eliminar los resultados seleccionados. Inténtalo de nuevo.");
    } finally {
      setDeletingSelected(false);
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

  const selectedCount = selectedIds.length;
  const canCalculate = selectedCount === 6;

  return (
    <Box>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
        flexWrap="wrap"
        gap={2}
      >
        <Typography variant="h5" fontWeight={600}>
          Notas Finales
        </Typography>

        <Box display="flex" alignItems="center" gap={2}>
          {selectedCount > 0 && (
            <Chip
              label={`${selectedCount} seleccionado${selectedCount !== 1 ? 's' : ''}`}
              color="primary"
              variant="outlined"
            />
          )}
          
          <Button
            variant="outlined"
            color="error"
            onClick={handleDeleteSelected}
            disabled={deletingSelected || selectedCount === 0}
            startIcon={deletingSelected ? <CircularProgress size={16} /> : <DeleteIcon />}
            size="small"
            title={selectedCount === 0 ? "Selecciona filas para eliminar" : `Eliminar ${selectedCount} elemento${selectedCount !== 1 ? 's' : ''} seleccionado${selectedCount !== 1 ? 's' : ''}`}
          >
            {deletingSelected ? "Eliminando..." : "Eliminar Seleccionados"}
          </Button>
          
          <Button
            variant="contained"
            color="primary"
            onClick={handleCalcularNota}
            disabled={loading || !canCalculate}
            startIcon={loading ? <CircularProgress size={16} /> : null}
            title={!canCalculate ? "Selecciona exactamente 6 ejercicios diferentes del mismo grado y sexo" : "Calcular nota con los ejercicios seleccionados"}
          >
            {loading ? "Procesando..." : "Calcular Nota"}
          </Button>
        </Box>
      </Box>

      {selectedCount === 0 && (
        <Alert severity="info" sx={{ mb: 2 }}>
          Selecciona filas de la tabla para habilitar las acciones de eliminar y calcular nota.
        </Alert>
      )}

      {selectedCount > 0 && !canCalculate && (
        <Alert severity="warning" sx={{ mb: 2 }}>
          Para calcular la nota, selecciona exactamente 6 ejercicios diferentes del mismo grado y sexo.
        </Alert>
      )}

      {canCalculate && (
        <Alert severity="success" sx={{ mb: 2 }}>
          ✅ Selección válida para calcular nota: {selectedCount} ejercicios seleccionados.
        </Alert>
      )}

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

      <Snackbar
        open={Boolean(success)}
        autoHideDuration={3000}
        onClose={() => setSuccess(null)}
      >
        <Alert onClose={() => setSuccess(null)} severity="success" variant="filled">
          {success}
        </Alert>
      </Snackbar>
    </Box>
  );
};
