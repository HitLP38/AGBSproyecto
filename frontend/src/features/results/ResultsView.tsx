// ✅ src/features/results/ResultsView.tsx
import {
  Box,
  Typography,
  TextField,
  Container,
  Paper,
  Alert,
  Button,
  useTheme,
  useMediaQuery,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { useExerciseStore } from "@/store/useExerciseStore";
import { useNavigationStore } from "@/store/navigationStore";
import { useResultStore } from "@/store/resultStore";
import { useEffect, useState } from "react";
import { exercises } from "@/domain/exercise/data/exercises";
import { calculateScore } from "@/domain/score/scoreCalculator";
import { useUser, useAuth } from "@clerk/clerk-react";

export const ResultsView = () => {
  const { selected } = useExerciseStore();
  const { setView } = useNavigationStore();
  const { saveResult } = useResultStore();
  const { getToken } = useAuth();
  const { user } = useUser();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [formData, setFormData] = useState<Record<string, number>>({});
  const [scores, setScores] = useState<Record<string, number>>({});
  const [error, setError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (id: string, value: number) => {
    setFormData((prev) => ({ ...prev, [id]: value }));
    const score = calculateScore(id, value);
    setScores((prev) => ({ ...prev, [id]: score }));
  };

  const handleSubmit = async () => {
    const allFilled = selected.every(
      (id) => formData[id] !== undefined && formData[id] > 0
    );
    if (!allFilled) {
      setError(true);
      return;
    }
    setError(false);

    try {
      const token = await getToken();
      const userId = user?.id ?? "anon";

      for (const id of selected) {
        const value = formData[id];
        const score = scores[id];

        await saveResult(
          {
            exercise_id: id,
            value,
            score,
            timestamp: new Date().toISOString(),
            user_id: userId,
          },
          token || ""
        );
      }

      setShowSuccess(true);
    } catch (err) {
      console.error("❌ Error al guardar resultado:", err);
    }
  };

  const handleContinue = () => {
    setShowSuccess(false);
    setView("dashboard");
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" fontWeight={600} gutterBottom>
        Ingrese sus resultados
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          Todos los campos deben completarse con valores válidos.
        </Alert>
      )}

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 3,
          justifyContent: "flex-start",
        }}
      >
        {selected.map((id) => {
          const ex = exercises.find((e) => e.id === id);
          if (!ex) return null;

          return (
            <Box
              key={id}
              sx={{ flex: `1 1 ${isMobile ? "100%" : "calc(50% - 12px)"}` }}
            >
              <Paper sx={{ p: 3 }} elevation={3}>
                <Typography variant="h6" fontWeight={600} gutterBottom>
                  {ex.name}
                </Typography>

                <TextField
                  fullWidth
                  type="number"
                  label={
                    ex.type === "time"
                      ? "Tiempo en segundos"
                      : "Cantidad de repeticiones"
                  }
                  value={formData[id] ?? ""}
                  onChange={(e) => handleChange(id, parseFloat(e.target.value))}
                />

                {scores[id] !== undefined && (
                  <Typography mt={2}>
                    🏅 Puntaje provisional: <strong>{scores[id]} / 20</strong>
                  </Typography>
                )}
              </Paper>
            </Box>
          );
        })}
      </Box>

      <Box textAlign="center" mt={4}>
        <Button
          variant="contained"
          size="large"
          onClick={handleSubmit}
          sx={{ borderRadius: 3, textTransform: "none", fontWeight: 600 }}
        >
          Guardar resultados
        </Button>
      </Box>

      <Dialog open={showSuccess} onClose={handleContinue}>
        <DialogTitle>✅ ¡Resultados guardados!</DialogTitle>
        <DialogContent>
          <Typography>
            Tus resultados se han registrado exitosamente. Puedes revisar tu
            progreso en el Dashboard.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleContinue} variant="contained" color="primary">
            Ir al Dashboard
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};
