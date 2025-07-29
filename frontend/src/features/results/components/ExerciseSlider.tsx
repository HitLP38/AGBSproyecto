import {
  Box,
  IconButton,
  useMediaQuery,
  useTheme,
  Typography,
  Paper,
} from "@mui/material";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import { ExerciseDisplay } from "./ExerciseDisplay";

interface ExerciseSliderProps {
  selected: string[];
  formData: Record<string, string>;
  handleChange: (id: string, value: string) => void;
}

export const ExerciseSlider = ({ 
  selected, 
  formData, 
  handleChange 
}: ExerciseSliderProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [currentIndex, setCurrentIndex] = useState(0);

  if (selected.length === 0) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: 300,
          backgroundColor: "#F9FAFA",
          borderRadius: 3,
          border: "1px solid #E9EEED",
        }}
      >
        <Typography variant="h6" color="text.secondary">
          Selecciona ejercicios para comenzar
        </Typography>
      </Box>
    );
  }

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % selected.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + selected.length) % selected.length);
  };

  const currentExerciseId = selected[currentIndex];

  return (
    <Box sx={{ mt: 4 }}>
      {/* Indicador de progreso */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 2,
          mb: 3,
        }}
      >
        <IconButton
          onClick={handlePrev}
          disabled={selected.length <= 1}
          sx={{
            color: "#2E3E50",
            backgroundColor: "#F9FAFA",
            border: "1px solid #E9EEED",
            "&:hover": {
              backgroundColor: "#E9EEED",
            },
            "&:disabled": {
              color: "#D1D5DB",
              backgroundColor: "#F3F4F6",
            },
          }}
        >
          <ChevronLeft />
        </IconButton>

        <Paper
          elevation={0}
          sx={{
            px: 3,
            py: 1.5,
            backgroundColor: "#F9FAFA",
            border: "1px solid #E9EEED",
            borderRadius: 2,
          }}
        >
          <Typography variant="body2" fontWeight={600} color="#2E3E50">
            {currentIndex + 1} de {selected.length}
          </Typography>
        </Paper>

        <IconButton
          onClick={handleNext}
          disabled={selected.length <= 1}
          sx={{
            color: "#2E3E50",
            backgroundColor: "#F9FAFA",
            border: "1px solid #E9EEED",
            "&:hover": {
              backgroundColor: "#E9EEED",
            },
            "&:disabled": {
              color: "#D1D5DB",
              backgroundColor: "#F3F4F6",
            },
          }}
        >
          <ChevronRight />
        </IconButton>
      </Box>

      {/* Contenedor del ejercicio actual */}
      <Box
        sx={{
          position: "relative",
          minHeight: isMobile ? 400 : 300,
        }}
      >
        <ExerciseDisplay
          key={currentExerciseId}
          selectedId={currentExerciseId}
          value={formData[currentExerciseId] ?? ""}
          onChange={(val) => handleChange(currentExerciseId, val)}
        />
      </Box>

      {/* Indicadores de puntos (dots) */}
      {selected.length > 1 && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: 1,
            mt: 3,
          }}
        >
          {selected.map((_, index) => (
            <Box
              key={index}
              onClick={() => setCurrentIndex(index)}
              sx={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                backgroundColor: index === currentIndex ? "#2E3E50" : "#D1D5DB",
                cursor: "pointer",
                transition: "all 0.3s ease",
                "&:hover": {
                  backgroundColor: index === currentIndex ? "#1F2937" : "#9CA3AF",
                },
              }}
            />
          ))}
        </Box>
      )}
    </Box>
  );
}; 