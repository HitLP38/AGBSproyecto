//features/results/ResultsView.tsx
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

function normalizarMarca(exercise_id: string, valor: number | string): string {
  const ejerciciosTiempo = ["6Km", "1000m", "natacion-50m"];

  if (ejerciciosTiempo.includes(exercise_id)) {
    const num =
      typeof valor === "string" ? convertirTiempoANumero(valor) : valor;
    const minutos = Math.floor(num);
    const segundos = Math.round((num - minutos) * 60);
    return `${minutos}:${segundos.toString().padStart(2, "0")}`;
  }

  return Number(valor).toString(); // devuelve como string limpio
}

// Función para convertir tiempo "mm:ss" a número decimal
function convertirTiempoANumero(tiempo: string): number {
  if (tiempo.includes(":")) {
    const [min, seg] = tiempo.split(":").map(Number);
    return min + seg / 60;
  }
  return Number(tiempo);
}

export const ResultsView = () => {
  const { selected } = useExerciseStore();
  const { setView } = useNavigationStore();
  const { saveResult } = useResultStore();
  const { setData, data, clear } = useResultPreviewStore();
  const { getToken } = useAuth();
  const { user } = useUser();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  // Cambiar el tipo para que solo maneje strings
  const [formData, setFormData] = useState<Record<string, string>>({});

  const [sexo, setSexo] = useState("");
  const [grado, setGrado] = useState("");
  const [error, setError] = useState(false);
  const [readyToPreview, setReadyToPreview] = useState(false);
  const [successDialog, setSuccessDialog] = useState(false);

  // Cambiar el tipo del parámetro value a string
  const handleChange = (id: string, value: string) => {
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleCalculate = async () => {
    // Validar que todos los campos estén llenos y tengan valores válidos
    const allFilled = selected.every((id) => {
      const value = formData[id];
      if (!value || value.trim() === "") return false;

      // Para ejercicios de tiempo con formato mm:ss
      const ejerciciosTiempo = ["6Km", "1000m", "natacion-50m"];
      if (ejerciciosTiempo.includes(id)) {
        // Validar formato mm:ss o que sea un número válido
        if (value.includes(":")) {
          const [min, seg] = value.split(":");
          return !isNaN(Number(min)) && !isNaN(Number(seg)) && Number(seg) < 60;
        }
        return !isNaN(Number(value)) && Number(value) > 0;
      }

      // Para otros ejercicios, validar que sea un número positivo
      return !isNaN(Number(value)) && Number(value) > 0;
    });

    if (!allFilled || !sexo || !grado) {
      setError(true);
      return;
    }

    const tokenTimestamp = new Date().toISOString();
    const userId = user?.id ?? "anon";
    const token = await getToken();

    const previewPromises = selected.map(async (id) => {
      const ex = exercises.find((e) => e.id === id)!;
      const rawStringValue = formData[id];

      // Convertimos a número decimal si es necesario
      const ejerciciosTiempo = ["6Km", "1000m", "natacion-50m"];
      const rawValue = ejerciciosTiempo.includes(id)
        ? convertirTiempoANumero(rawStringValue)
        : Number(rawStringValue);

      const value = normalizarMarca(id, rawValue);
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
          <MenuItem value="H">Masculino</MenuItem>
          <MenuItem value="M">Femenino</MenuItem>
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
                  type={
                    ["6Km", "1000m", "natacion-50m"].includes(ex.id)
                      ? "text"
                      : "number"
                  }
                  label={
                    ex.type === "reps"
                      ? "Cantidad de repeticiones"
                      : ["6Km", "1000m", "natacion-50m"].includes(ex.id)
                      ? "Tiempo en formato mm:ss"
                      : "Tiempo en segundos"
                  }
                  value={formData[id] ?? ""}
                  onChange={(e) => handleChange(id, e.target.value)}
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
