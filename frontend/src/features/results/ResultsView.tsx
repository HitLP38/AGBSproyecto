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
  MenuItem,
} from "@mui/material";
import { useExerciseStore } from "@/store/useExerciseStore";
import { useNavigationStore } from "@/store/navigationStore";
import { useResultStore } from "@/store/resultStore";
import { useResultPreviewStore } from "@/store/resultPreviewStore";
import { useEffect, useState } from "react";
import { exercises } from "@/domain/exercise/data/exercises";
import { useUser, useAuth } from "@clerk/clerk-react";
import { ResultPreviewTable } from "./components/ResultPreviewTable";
import { getScoreFromBackend } from "@/infra/api/resultsApi";

export const ResultsView = () => {
  const { selected } = useExerciseStore();
  const { setView } = useNavigationStore();
  const { saveResult } = useResultStore();
  const { setData, data, clear } = useResultPreviewStore();
  const { getToken } = useAuth();
  const { user } = useUser();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [formData, setFormData] = useState<Record<string, number>>({});
  const [sexo, setSexo] = useState("");
  const [grado, setGrado] = useState("");
  const [error, setError] = useState(false);
  const [readyToPreview, setReadyToPreview] = useState(false);
  const [successDialog, setSuccessDialog] = useState(false);

  const handleChange = (id: string, value: number) => {
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleCalculate = async () => {
    const allFilled = selected.every(
      (id) => formData[id] !== undefined && formData[id] > 0
    );
    if (!allFilled || !sexo || !grado) {
      setError(true);
      return;
    }

    const tokenTimestamp = new Date().toISOString();
    const userId = user?.id ?? "anon";
    const token = await getToken();

    const previewPromises = selected.map(async (id) => {
      const ex = exercises.find((e) => e.id === id)!;
      const value = formData[id];

      const score = await getScoreFromBackend(
        id,
        value,
        sexo,
        grado
        //token || ""
      );

      return {
        exercise_id: id,
        exercise_name: ex.name,
        value,
        score,
        maxValue: ex.maxValue,
        maxScore: ex.maxScore,
        timestamp: tokenTimestamp,
        user_id: userId,
        sexo,
        grado,
      };
    });

    const previewData = await Promise.all(previewPromises);
    setData(previewData);
    setReadyToPreview(true);
    setError(false);
  };

  const handleSave = async () => {
    const token = await getToken();
    for (const item of data) {
      await saveResult(item, token || "");
    }
    clear();
    setSuccessDialog(true);
  };

  const handleGoToDashboard = () => {
    setSuccessDialog(false);
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

      <Box display="flex" flexWrap="wrap" gap={3}>
        <TextField
          select
          label="Sexo"
          value={sexo}
          onChange={(e) => setSexo(e.target.value)}
          sx={{ minWidth: 160 }}
        >
          <MenuItem value="Masculino">Masculino</MenuItem>
          <MenuItem value="Femenino">Femenino</MenuItem>
        </TextField>

        <TextField
          select
          label="Grado"
          value={grado}
          onChange={(e) => setGrado(e.target.value)}
          sx={{ minWidth: 160 }}
        >
          <MenuItem value="1">Grado 1</MenuItem>
          <MenuItem value="2">Grado 2</MenuItem>
          <MenuItem value="3">Grado 3</MenuItem>
        </TextField>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 3,
          justifyContent: "flex-start",
          mt: 3,
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
                      : ex.type === "distance"
                      ? "Tiempo en segundos"
                      : "Cantidad de repeticiones"
                  }
                  value={formData[id] ?? ""}
                  onChange={(e) => handleChange(id, parseFloat(e.target.value))}
                />
              </Paper>
            </Box>
          );
        })}
      </Box>

      {!readyToPreview ? (
        <Box textAlign="center" mt={4}>
          <Button
            variant="contained"
            size="large"
            onClick={handleCalculate}
            sx={{ borderRadius: 3, textTransform: "none", fontWeight: 600 }}
          >
            Calcular Resultados
          </Button>
        </Box>
      ) : (
        <>
          <Box mt={4}>
            <ResultPreviewTable data={data} />
          </Box>
          <Box textAlign="center" mt={3}>
            <Button
              variant="contained"
              size="large"
              color="success"
              onClick={handleSave}
              sx={{ borderRadius: 3, textTransform: "none", fontWeight: 600 }}
            >
              Guardar Resultados
            </Button>
          </Box>
        </>
      )}

      <Dialog open={successDialog} onClose={handleGoToDashboard}>
        <DialogTitle>✅ ¡Resultados guardados!</DialogTitle>
        <DialogContent>
          <Typography>
            Tus resultados se han registrado exitosamente. Puedes revisar tu
            progreso en el Dashboard.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleGoToDashboard}
            variant="contained"
            color="primary"
          >
            Ir al Dashboard
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};
