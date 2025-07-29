import {
  Box,
  Typography,
  useMediaQuery,
  useTheme,
  Button,
  Paper,
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

  // Vista para móvil
  if (isMobile) {
    return (
      <Paper
        elevation={0}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 3,
          p: 3,
          backgroundColor: "#F9FAFA",
          border: "1px solid #E9EEED",
          borderRadius: 3,
          transition: "all 0.3s ease",
          "&:hover": {
            backgroundColor: "#FFFFFF",
            borderColor: "#2E3E50",
          },
        }}
      >
        {/* Título */}
        <Typography 
          variant="h5" 
          fontWeight={600}
          sx={{
            color: "#2E3E50",
            fontSize: "1.5rem",
            textAlign: "center",
          }}
        >
          {exercise.name}
        </Typography>

        {/* Subtítulo/Descripción */}
        <Typography 
          variant="body1" 
          sx={{
            color: "#6B7280",
            fontSize: "1rem",
            lineHeight: 1.5,
            textAlign: "center",
            maxWidth: 300,
          }}
        >
          {config.label}
        </Typography>

        {/* Imagen */}
        <Box
          component="img"
          src={imageSrc}
          alt={exercise.name}
          sx={{
            width: "100%",
            maxWidth: 280,
            height: "auto",
            objectFit: "cover",
            borderRadius: 2,
          }}
        />

        {/* Valor actual (si existe) */}
        {value && (
          <Box
            sx={{
              backgroundColor: "#E9EEED",
              px: 3,
              py: 2,
              borderRadius: 2,
              border: "1px solid #D1D5DB",
              minWidth: 200,
            }}
          >
            <Typography 
              variant="h6" 
              sx={{
                color: "#2E3E50",
                fontWeight: 600,
                textAlign: "center",
              }}
            >
              Marca: {value}
            </Typography>
          </Box>
        )}

        {/* Botón */}
        <Button
          variant={value ? "outlined" : "contained"}
          onClick={() => setPickerOpen(true)}
          sx={{
            textTransform: "none",
            fontWeight: 600,
            px: 4,
            py: 1.5,
            borderRadius: 2,
            borderColor: value ? "#2E3E50" : "transparent",
            color: value ? "#2E3E50" : "#FFFFFF",
            backgroundColor: value ? "transparent" : "#2E3E50",
            minWidth: 200,
            "&:hover": {
              backgroundColor: value ? "#2E3E50" : "#1F2937",
              color: "#FFFFFF",
              borderColor: "#2E3E50",
            },
          }}
        >
          {value ? "Cambiar Marca" : "Ingresar Marca"}
        </Button>

        {/* Picker modal */}
        <ScrollPicker
          open={pickerOpen}
          onClose={() => setPickerOpen(false)}
          onConfirm={handlePickerConfirm}
          mode={scrollPickerMode}
          initialValue={value}
          label={config.label}
        />
      </Paper>
    );
  }

  // Vista para desktop (mantiene el layout original)
  return (
    <Paper
      elevation={0}
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 4,
        p: 4,
        backgroundColor: "#F9FAFA",
        border: "1px solid #E9EEED",
        borderRadius: 3,
        minHeight: 300,
        transition: "all 0.3s ease",
        "&:hover": {
          backgroundColor: "#FFFFFF",
          borderColor: "#2E3E50",
        },
      }}
    >
      {/* Imagen */}
      <Box
        component="img"
        src={imageSrc}
        alt={exercise.name}
        sx={{
          width: "40%",
          maxWidth: 250,
          height: "auto",
          objectFit: "cover",
          borderRadius: 2,
        }}
      />

      {/* Contenido */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 3,
          alignItems: "center",
          textAlign: "center",
          flex: 1,
          maxWidth: 400,
        }}
      >
        {/* Título */}
        <Typography 
          variant="h5" 
          fontWeight={600}
          sx={{
            color: "#2E3E50",
            fontSize: "1.75rem",
          }}
        >
          {exercise.name}
        </Typography>

        {/* Descripción */}
        <Typography 
          variant="body1" 
          sx={{
            color: "#6B7280",
            fontSize: "1rem",
            lineHeight: 1.5,
            maxWidth: 350,
          }}
        >
          {config.label}
        </Typography>

        {/* Valor actual */}
        {value && (
          <Box
            sx={{
              backgroundColor: "#E9EEED",
              px: 3,
              py: 2,
              borderRadius: 2,
              border: "1px solid #D1D5DB",
              minWidth: 200,
            }}
          >
            <Typography 
              variant="h6" 
              sx={{
                color: "#2E3E50",
                fontWeight: 600,
              }}
            >
              Marca: {value}
            </Typography>
          </Box>
        )}

        {/* Botón */}
        <Button
          variant={value ? "outlined" : "contained"}
          onClick={() => setPickerOpen(true)}
          sx={{
            mt: 1,
            textTransform: "none",
            fontWeight: 600,
            px: 4,
            py: 1.5,
            borderRadius: 2,
            borderColor: value ? "#2E3E50" : "transparent",
            color: value ? "#2E3E50" : "#FFFFFF",
            backgroundColor: value ? "transparent" : "#2E3E50",
            minWidth: 200,
            "&:hover": {
              backgroundColor: value ? "#2E3E50" : "#1F2937",
              color: "#FFFFFF",
              borderColor: "#2E3E50",
            },
          }}
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
    </Paper>
  );
};

export default ExerciseDisplay;
