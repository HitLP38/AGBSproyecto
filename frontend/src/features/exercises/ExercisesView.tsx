import { Box, Typography, Button, Container, Alert } from "@mui/material";
import { useEffect, useState } from "react";
import { exercises } from "@/domain/exercise/data/exercises";
import { ExerciseCard } from "@/shared/components/ExerciseCard";
import { useExerciseStore } from "@/store/useExerciseStore";
import { useNavigationStore } from "@/store/navigationStore";

export const ExercisesView = () => {
  const { selected } = useExerciseStore();
  const { setView } = useNavigationStore();
  const [error, setError] = useState(false);

  const handleContinue = () => {
    if (selected.length === 0) {
      setError(true);
      return;
    }
    setError(false);
    setView("results"); // Provisional: siguiente vista lógica
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" fontWeight={600} gutterBottom>
        Selecciona los ejercicios a evaluar
      </Typography>

      {error && (
        <Alert severity="warning" sx={{ mb: 2 }}>
          Debes seleccionar al menos un ejercicio para continuar.
        </Alert>
      )}

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, 1fr)",
            md: "repeat(3, 1fr)",
          },
          gap: 2,
        }}
      >
        {exercises.map((ex) => (
          <ExerciseCard key={ex.id} {...ex} />
        ))}
      </Box>

      <Box sx={{ textAlign: "center", mt: 4 }}>
        <Button
          variant="contained"
          size="large"
          onClick={handleContinue}
          disabled={selected.length === 0}
          sx={{ borderRadius: 3, textTransform: "none", fontWeight: 600 }}
        >
          Continuar con la evaluación
        </Button>
      </Box>
    </Container>
  );
};
