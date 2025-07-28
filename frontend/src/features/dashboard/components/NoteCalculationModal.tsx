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
  IconButton,
  Fade,
  Zoom,
  Paper,
} from "@mui/material";
import { useState } from "react";
import { ResultResponse } from "@/infra/api/resultsApi";
import { getFinalGrade } from "@/infra/api/gradeApi";
import { traducirSexo } from "@/utils/traducirSexo";
import { exercises } from "@/domain/exercise/data/exercises";
import CloseIcon from "@mui/icons-material/Close";
import CelebrationIcon from "@mui/icons-material/Celebration";

interface Props {
  open: boolean;
  onClose: () => void;
  rows: ResultResponse[];
}

export const NoteCalculationModal = ({ open, onClose, rows }: Props) => {
  const [confirmed, setConfirmed] = useState(false);
  const [nota, setNota] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const handleConfirmar = async () => {
    setLoading(true);
    try {
      const puntajes = rows.map((r) => r.score);
      const puntajeTotal = puntajes.reduce((sum, p) => sum + p, 0);
      const notaFinal = await getFinalGrade(puntajeTotal);
      setNota(notaFinal);
      setConfirmed(true);
    } catch (err) {
      console.error("Error al calcular nota:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleCerrar = () => {
    setConfirmed(false);
    setNota(null);
    onClose();
  };

  const getExerciseName = (exerciseId: string) => {
    const exercise = exercises.find((e) => e.id === exerciseId);
    return exercise?.name || exerciseId.replaceAll("-", " ").replace(/\b\w/g, (l) => l.toUpperCase());
  };

  const getNotaColor = (nota: number) => {
    if (nota >= 9.0) return "#4caf50"; // Verde para excelente
    if (nota >= 7.0) return "#ff9800"; // Naranja para bueno
    if (nota >= 5.0) return "#ffc107"; // Amarillo para aprobado
    return "#f44336"; // Rojo para reprobado
  };

  return (
    <Dialog 
      open={open} 
      onClose={handleCerrar} 
      fullWidth 
      maxWidth="md"
      PaperProps={{
        sx: {
          borderRadius: 3,
          overflow: "hidden"
        }
      }}
    >
      <DialogTitle sx={{ 
        display: "flex", 
        justifyContent: "space-between", 
        alignItems: "center",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        color: "white",
        pb: 1
      }}>
        <Box display="flex" alignItems="center" gap={1}>
          {confirmed && <CelebrationIcon />}
          <Typography variant="h6" fontWeight={600}>
            {confirmed ? "🎉 ¡Nota Calculada!" : "Confirmar selección de ejercicios"}
          </Typography>
        </Box>
        <IconButton onClick={handleCerrar} sx={{ color: "white" }}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ p: 3 }}>
        {!confirmed ? (
          <Fade in={!confirmed} timeout={300}>
            <Box>
              <Typography mb={3} variant="body1" color="text.secondary">
                Verifica que los datos sean correctos antes de calcular tu nota final.
                Debes tener exactamente 6 ejercicios diferentes del mismo grado y sexo.
              </Typography>
              
              <Paper elevation={2} sx={{ overflow: "auto" }}>
                <Table size="small">
                  <TableHead>
                    <TableRow sx={{ backgroundColor: "grey.50" }}>
                      <TableCell sx={{ fontWeight: 600 }}>
                        <b>Ejercicio</b>
                      </TableCell>
                      <TableCell align="center" sx={{ fontWeight: 600 }}>
                        <b>Puntaje</b>
                      </TableCell>
                      <TableCell align="center" sx={{ fontWeight: 600 }}>
                        <b>Sexo</b>
                      </TableCell>
                      <TableCell align="center" sx={{ fontWeight: 600 }}>
                        <b>Grado</b>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows.map((row, index) => (
                      <TableRow key={row.id} sx={{ 
                        backgroundColor: index % 2 === 0 ? "white" : "grey.50" 
                      }}>
                        <TableCell sx={{ fontWeight: 500 }}>
                          {getExerciseName(row.exercise_id)}
                        </TableCell>
                        <TableCell align="center" sx={{ fontWeight: 600, color: "primary.main" }}>
                          {row.score}
                        </TableCell>
                        <TableCell align="center">
                          {traducirSexo(row.sexo)}
                        </TableCell>
                        <TableCell align="center">
                          {row.grado}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Paper>
              
              <Box mt={3} p={2} bgcolor="primary.50" borderRadius={2}>
                <Typography variant="body2" color="primary.main" fontWeight={500}>
                  <strong>Resumen:</strong> {rows.length} ejercicios seleccionados | 
                  Puntaje total: {rows.reduce((sum, r) => sum + r.score, 0)} | 
                  Grado: {rows[0]?.grado} | 
                  Sexo: {traducirSexo(rows[0]?.sexo)}
                </Typography>
              </Box>
            </Box>
          </Fade>
        ) : (
          <Zoom in={confirmed} timeout={500}>
            <Box textAlign="center" py={4}>
              <Box
                sx={{
                  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  borderRadius: "50%",
                  width: 120,
                  height: 120,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 2rem",
                  boxShadow: "0 8px 32px rgba(102, 126, 234, 0.3)"
                }}
              >
                <CelebrationIcon sx={{ fontSize: 60, color: "white" }} />
              </Box>
              
              <Typography
                variant="h4"
                fontWeight={700}
                color="primary"
                gutterBottom
                sx={{ mb: 3 }}
              >
                ¡Felicidades!
              </Typography>
              
              <Typography variant="h6" fontWeight={500} color="text.secondary" gutterBottom>
                Tu nota final es:
              </Typography>
              
              <Box
                sx={{
                  background: `linear-gradient(135deg, ${getNotaColor(nota || 0)} 0%, ${getNotaColor(nota || 0)}dd 100%)`,
                  borderRadius: 3,
                  p: 4,
                  my: 3,
                  boxShadow: "0 8px 32px rgba(0,0,0,0.1)"
                }}
              >
                <Typography 
                  variant="h1" 
                  fontWeight={800} 
                  sx={{ 
                    color: "white",
                    textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
                    fontSize: { xs: "3rem", sm: "4rem", md: "5rem" }
                  }}
                >
                  {nota?.toFixed(2)}
                </Typography>
              </Box>
              
              <Divider sx={{ my: 3 }} />
              
              <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 400, mx: "auto" }}>
                ¡Excelente trabajo! Sigue entrenando para mejorar aún más tus resultados 
                y alcanzar tu máximo potencial.
              </Typography>
            </Box>
          </Zoom>
        )}
      </DialogContent>

      <DialogActions sx={{ justifyContent: "space-between", px: 3, pb: 3 }}>
        {!confirmed ? (
          <>
            <Button onClick={handleCerrar} variant="outlined" size="large">
              Cancelar
            </Button>
            <Button
              onClick={handleConfirmar}
              variant="contained"
              color="primary"
              size="large"
              disabled={loading}
              sx={{ 
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                "&:hover": {
                  background: "linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%)"
                }
              }}
            >
              {loading ? "Calculando..." : "Confirmar y Calcular Nota"}
            </Button>
          </>
        ) : (
          <Button 
            onClick={handleCerrar} 
            variant="contained" 
            color="primary"
            size="large"
            sx={{ 
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              "&:hover": {
                background: "linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%)"
              }
            }}
          >
            Cerrar
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};
