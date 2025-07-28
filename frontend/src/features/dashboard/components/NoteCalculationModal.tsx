//src/features/dashboard/components/NoteCalculationModal.tsx

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Box,
  Divider,
} from "@mui/material";
import { useState } from "react";
import { ResultResponse } from "@/infra/api/resultsApi";
import { getFinalGrade } from "@/infra/api/gradeApi"; // Paso 4B
import { traducirSexo } from "@/utils/traducirSexo";

interface Props {
  open: boolean;
  onClose: () => void;
  rows: ResultResponse[];
}

export const NoteCalculationModal = ({ open, onClose, rows }: Props) => {
  const [confirmed, setConfirmed] = useState(false);
  const [nota, setNota] = useState<number | null>(null);

  const handleConfirmar = async () => {
    const puntajes = rows.map((r) => r.score);
    const puntajeTotal = puntajes.reduce((sum, p) => sum + p, 0);
    try {
      const notaFinal = await getFinalGrade(puntajeTotal);
      setNota(notaFinal);
      setConfirmed(true);
    } catch (err) {
      console.error("Error al calcular nota:", err);
    }
  };

  const handleCerrar = () => {
    setConfirmed(false);
    setNota(null);
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleCerrar} fullWidth maxWidth="sm">
      <DialogTitle>
        {confirmed
          ? "🎉 ¡Nota Calculada!"
          : "Confirmar selección de ejercicios"}
      </DialogTitle>

      <DialogContent>
        {!confirmed ? (
          <Box>
            <Typography mb={2}>
              Verifica que los datos sean correctos antes de calcular tu nota
              final:
            </Typography>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>
                    <b>Ejercicio</b>
                  </TableCell>
                  <TableCell align="center">
                    <b>Puntaje</b>
                  </TableCell>
                  <TableCell align="center">
                    <b>Sexo</b>
                  </TableCell>
                  <TableCell align="center">
                    <b>Grado</b>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell>
                      {row.exercise_id
                        .replaceAll("-", " ")
                        .replace(/\b\w/g, (l) => l.toUpperCase())}
                    </TableCell>
                    <TableCell align="center">{row.score}</TableCell>
                    <TableCell align="center">
                      {traducirSexo(row.sexo)}
                    </TableCell>
                    <TableCell align="center">{row.grado}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
        ) : (
          <Box textAlign="center" py={4}>
            <Typography
              variant="h4"
              fontWeight={700}
              color="primary"
              gutterBottom
            >
              🎉 ¡Felicidades!
            </Typography>
            <Typography variant="h5" fontWeight={500}>
              Tu nota final es:
            </Typography>
            <Typography variant="h2" fontWeight={800} mt={2}>
              {nota?.toFixed(2)}
            </Typography>
            <Divider sx={{ my: 3 }} />
            <Typography variant="body1">
              ¡Sigue entrenando para mejorar aún más tus resultados!
            </Typography>
          </Box>
        )}
      </DialogContent>

      <DialogActions sx={{ justifyContent: "space-between", px: 3, pb: 2 }}>
        {!confirmed ? (
          <>
            <Button onClick={handleCerrar} variant="outlined">
              Cancelar
            </Button>
            <Button
              onClick={handleConfirmar}
              variant="contained"
              color="primary"
            >
              Confirmar y Calcular Nota
            </Button>
          </>
        ) : (
          <Button onClick={handleCerrar} variant="contained" color="primary">
            Cerrar
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};
