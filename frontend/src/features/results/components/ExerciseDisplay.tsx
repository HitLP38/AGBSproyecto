import {
  Box,
  Typography,
  useMediaQuery,
  useTheme,
  Button,
} from "@mui/material";
import { useEffect, useState } from "react";
import { exercises } from "@/domain/exercise/data/exercises";
import { exerciseImages } from "@/domain/exercise/data/exerciseImages";
import { exerciseConfig } from "@/domain/exercise/data/exerciseConfig";
import { ScrollPicker } from "@/shared/components/ScrollPicker";

interface Props {
  selectedId: string;
  value: string;
  onChange: (value: string) => void;
}

export const ExerciseDisplay = ({ selectedId, value, onChange }: Props) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [pickerOpen, setPickerOpen] = useState(false);

  const exercise = exercises.find((e) => e.id === selectedId);
  const config = exerciseConfig.find((c) => c.id === selectedId);
  const imageSrc = exerciseImages[selectedId as keyof typeof exerciseImages];

  useEffect(() => {
    if (!exercise) {
      console.warn("Ejercicio no encontrado:", selectedId);
    }
    if (!config) {
      console.warn("Configuración no encontrada:", selectedId);
    }
  }, [selectedId, exercise, config]);

  if (!exercise || !config) return null;

  const handlePickerConfirm = (newValue: string) => {
    onChange(newValue);
    setPickerOpen(false);
  };

  // ✅ Determinar el modo visual para ScrollPicker
  const scrollPickerMode: "time" | "reps" | "seconds" | "swim-time" =
    selectedId === "50m-lisos"
      ? "seconds"
      : selectedId === "natacion-50m"
      ? "swim-time"
      : config.inputType === "scroll-time"
      ? "time"
      : "reps";

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
        gap: 3,
        alignItems: isMobile ? "center" : "flex-start",
        mt: 3,
        px: isMobile ? 2 : 0,
      }}
    >
      {/* Imagen */}
      <Box
        component="img"
        src={imageSrc}
        alt={exercise.name}
        sx={{
          width: isMobile ? "80%" : "40%",
          maxWidth: 300,
          borderRadius: 4,
          boxShadow: 3,
        }}
      />

      {/* Detalle y selector */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          gap: 2,
          alignItems: isMobile ? "center" : "flex-start",
        }}
      >
        <Typography variant="h5" fontWeight={700}>
          {exercise.name}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          {config.label}
        </Typography>

        {/* Mostrar valor actual */}
        {value && (
          <Typography variant="h6" color="primary">
            Valor actual: {value}
          </Typography>
        )}

        {/* Botón para abrir el picker */}
        <Button
          variant="outlined"
          onClick={() => setPickerOpen(true)}
          sx={{ mt: 2, textTransform: "none" }}
        >
          {value ? "Cambiar Marca" : "Ingresar Marca"}
        </Button>
      </Box>

      {/* Picker modal */}
      <ScrollPicker
        open={pickerOpen}
        onClose={() => setPickerOpen(false)}
        onConfirm={handlePickerConfirm}
        mode={scrollPickerMode}
        initialValue={value}
        label={config.label}
      />
    </Box>
  );
};

export default ExerciseDisplay;
