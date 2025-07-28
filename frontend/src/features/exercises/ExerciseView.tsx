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
import { exerciseImages } from "@/domain/exercise/data/exerciseImages";
import { useExerciseStore } from "@/store/useExerciseStore";
import { useNavigationStore } from "@/store/navigationStore";
import { ExerciseCard } from "@/shared/components/ExerciseCard";
import { useEffect } from "react";

export const ExerciseView = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const { selected, favorites, onlyFavorites, toggleSelect } =
    useExerciseStore(); // ✅ Agregamos toggleSelect
  const { setView } = useNavigationStore();

  // Redirección automática al cargar en móviles
  useEffect(() => {
    if (isMobile) {
      setView("results");
    }
  }, [isMobile, setView]);

  // Filtro dinámico
  const visibleExercises = onlyFavorites
    ? exercises.filter((ex) => favorites.includes(ex.id))
    : exercises;

  const canContinue = selected.length > 0;

  // ✅ Función para seleccionar/deseleccionar todos
  const handleSelectAll = () => {
    const allSelected = visibleExercises.every((ex) =>
      selected.includes(ex.id)
    );

    if (allSelected) {
      // Si todos están seleccionados, deseleccionar todos
      visibleExercises.forEach((ex) => {
        if (selected.includes(ex.id)) {
          toggleSelect(ex.id);
        }
      });
    } else {
      // Si no todos están seleccionados, seleccionar todos
      visibleExercises.forEach((ex) => {
        if (!selected.includes(ex.id)) {
          toggleSelect(ex.id);
        }
      });
    }
  };

  const allSelected =
    visibleExercises.length > 0 &&
    visibleExercises.every((ex) => selected.includes(ex.id));

  return (
    <Container
      maxWidth="lg"
      sx={{ py: 4, marginTop: { xs: "-40px", md: "-20px", lg: " -20px" } }}
    >
      {/* ✅ CAMBIO: Header con título y botón en la misma línea */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
          flexWrap: "wrap",
          gap: 2,
        }}
      >
        <Typography variant="h4" fontWeight={600}>
          {onlyFavorites
            ? "Tus Ejercicios Favoritos"
            : "Selecciona tus ejercicios"}
        </Typography>

        <Box
          mt={4}
          textAlign="center"
          sx={{ display: "flex", gap: 2, justifyContent: "space-between" }}
        >
          {canContinue && (
            <Button
              variant="contained"
              size="large"
              onClick={() => setView("results")}
              sx={{
                px: 2,
                py: 1,
                fontWeight: 600,
                borderRadius: 3,
                textTransform: "none",
              }}
            >
              ¡Comenzar Evaluación!
            </Button>
          )}
          {/* ✅ Botón alineado a la derecha del título */}
          {visibleExercises.length > 0 && (
            <Button
              variant="outlined"
              onClick={handleSelectAll}
              sx={{
                textTransform: "none",
                minWidth: "auto",
                px: 3,
                py: 1,
              }}
            >
              {allSelected ? "Deseleccionar todos" : "Seleccionar todos"}
            </Button>
          )}
        </Box>
      </Box>

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
          <ExerciseCard
            key={ex.id}
            id={ex.id}
            name={ex.name}
            image={exerciseImages[ex.id]}
          />
        ))}
      </Box>
    </Container>
  );
};
