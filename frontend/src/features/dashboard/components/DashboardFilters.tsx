// ✅ src/features/dashboard/components/DashboardFilters.tsx
import {
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
  InputLabel,
  FormControl,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { useDashboardFilterStore } from "@/store/dashboardFilterStore";
import { useExerciseStore } from "@/store/useExerciseStore";
import { exercises } from "@/domain/exercise/data/exercises";

export const DashboardFilters = () => {
  const {
    dateRange,
    selectedExercises,
    onlyFavorites,
    selectedSexo,
    selectedGrado,
    setDateRange,
    setSelectedExercises,
    setOnlyFavorites,
    setSelectedSexo,
    setSelectedGrado,
  } = useDashboardFilterStore();

  const { favorites } = useExerciseStore();
  // Usar los ejercicios reales definidos en exercises.ts
  const allExercises = exercises.map(exercise => ({
    id: exercise.id,
    name: exercise.name
  }));
  
  console.log("🔍 Ejercicios disponibles en filtros:", allExercises);

  const [open, setOpen] = useState(false);

  const handleSelectAll = () => {
    setSelectedExercises(allExercises.map((e) => e.id));
  };

  const handleClearAll = () => {
    setSelectedExercises([]);
  };

  return (
    <>
      <Box mb={2} textAlign="right">
        <Button variant="outlined" onClick={() => setOpen(true)}>
          Filtros
        </Button>
      </Box>

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          Filtros del Dashboard
          <IconButton
            onClick={() => setOpen(false)}
            sx={{
              color: "grey.500",
              "&:hover": {
                backgroundColor: "grey.100",
              },
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Stack spacing={3} mt={1}>
              <Box display="flex" gap={2}>
                <DatePicker
                  label="Desde"
                  value={dateRange[0]}
                  onChange={(newValue) =>
                    setDateRange([newValue, dateRange[1]])
                  }
                  sx={{ flex: 1 }}
                />
                <DatePicker
                  label="Hasta"
                  value={dateRange[1]}
                  onChange={(newValue) =>
                    setDateRange([dateRange[0], newValue])
                  }
                  sx={{ flex: 1 }}
                />
              </Box>

              {/* ✅ Select de ejercicios mejorado */}
              <Box>
                <Box display="flex" gap={1} mb={1}>
                  <Button size="small" onClick={handleSelectAll}>
                    Seleccionar todos
                  </Button>
                  <Button size="small" onClick={handleClearAll}>
                    Limpiar selección
                  </Button>
                </Box>
                <FormControl fullWidth>
                  <InputLabel>Ejercicios</InputLabel>
                  <Select
                    multiple
                    label="Ejercicios"
                    value={selectedExercises}
                    onChange={(e) =>
                      setSelectedExercises(
                        typeof e.target.value === "string"
                          ? e.target.value.split(",")
                          : e.target.value
                      )
                    }
                  >
                    {allExercises.map((ex) => (
                      <MenuItem key={ex.id} value={ex.id}>
                        {ex.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>

              {/* ✅ Select de sexo mejorado */}
              <FormControl fullWidth>
                <InputLabel>Sexo</InputLabel>
                <Select
                  label="Sexo"
                  value={selectedSexo}
                  onChange={(e) => setSelectedSexo(e.target.value)}
                >
                  <MenuItem value="">Todos los sexos</MenuItem>
                  <MenuItem value="H">HOMBRE</MenuItem>
                  <MenuItem value="M">MUJER</MenuItem>
                </Select>
              </FormControl>

              {/* ✅ Select de grado - ya estaba bien, pero mejoramos consistencia */}
              <FormControl fullWidth>
                <InputLabel>Grado</InputLabel>
                <Select
                  label="Grado"
                  value={selectedGrado}
                  onChange={(e) => setSelectedGrado(e.target.value)}
                >
                  <MenuItem value="">Todos los grados</MenuItem>
                  <MenuItem value="1">Grado 1</MenuItem>
                  <MenuItem value="2">Grado 2</MenuItem>
                  <MenuItem value="3">Grado 3</MenuItem>
                </Select>
              </FormControl>

              {/*<FormControlLabel
                control={
                  <Checkbox
                    checked={onlyFavorites}
                    onChange={(e) => setOnlyFavorites(e.target.checked)}
                  />
                }
                label="Solo ejercicios favoritos"
              />*/}
            </Stack>
          </LocalizationProvider>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} variant="contained">
            Aplicar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
