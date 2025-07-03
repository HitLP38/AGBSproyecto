// ✅ src/features/exercises/ExerciseView.tsx
import {
  Box,
  Button,
  Container,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { exercises } from "@/domain/exercise/data/exercises";
import { useExerciseStore } from "@/store/useExerciseStore";
import { useNavigationStore } from "@/store/navigationStore";
import { ExerciseCard } from "@/shared/components/ExerciseCard";

export const ExerciseView = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const { selected, favorites, onlyFavorites } = useExerciseStore();
  const { setView } = useNavigationStore();

  // Filtro dinámico
  const visibleExercises = onlyFavorites
    ? exercises.filter((ex) => favorites.includes(ex.id))
    : exercises;

  const canContinue = selected.length > 0;

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" fontWeight={600} mb={2}>
        {onlyFavorites
          ? "Tus Ejercicios Favoritos"
          : "Selecciona tus ejercicios"}
      </Typography>

      {onlyFavorites && visibleExercises.length === 0 && (
        <Typography color="text.secondary" mb={2}>
          No tienes ejercicios marcados como favoritos ❤️
        </Typography>
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
        {visibleExercises.map((ex) => (
          <ExerciseCard key={ex.id} {...ex} />
        ))}
      </Box>

      {canContinue && (
        <Box mt={4} textAlign="center">
          <Button
            variant="contained"
            size="large"
            onClick={() => setView("results")}
            sx={{
              px: 4,
              py: 2,
              fontWeight: 600,
              borderRadius: 3,
              textTransform: "none",
            }}
          >
            ¡Comenzar Evaluación!
          </Button>
        </Box>
      )}
    </Container>
  );
};
