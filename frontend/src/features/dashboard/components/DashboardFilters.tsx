import {
  Box,
  Checkbox,
  FormControlLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import { useDashboardFilterStore } from "@/store/dashboardFilterStore";
import { useExerciseStore } from "@/store/useExerciseStore";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

export const DashboardFilters = () => {
  const {
    dateRange,
    selectedExercises,
    onlyFavorites,
    setDateRange,
    setSelectedExercises,
    setOnlyFavorites,
  } = useDashboardFilterStore();
  const { exercises, favorites } = useExerciseStore();

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Stack spacing={2} mb={4}>
        <Typography variant="h6" fontWeight={600}>
          Filtros
        </Typography>

        <Box display="flex" gap={2}>
          <DatePicker
            label="Desde"
            value={dateRange[0]}
            onChange={(newValue) => setDateRange([newValue, dateRange[1]])}
            sx={{ flex: 1 }}
          />
          <DatePicker
            label="Hasta"
            value={dateRange[1]}
            onChange={(newValue) => setDateRange([dateRange[0], newValue])}
            sx={{ flex: 1 }}
          />
        </Box>

        <Select
          multiple
          fullWidth
          value={selectedExercises}
          onChange={(e) =>
            setSelectedExercises(
              typeof e.target.value === "string"
                ? e.target.value.split(",")
                : e.target.value
            )
          }
          displayEmpty
        >
          <MenuItem value="" disabled>
            Selecciona ejercicios
          </MenuItem>
          {exercises.map((ex) => (
            <MenuItem key={ex.id} value={ex.id}>
              {ex.name}
            </MenuItem>
          ))}
        </Select>

        <FormControlLabel
          control={
            <Checkbox
              checked={onlyFavorites}
              onChange={(e) => setOnlyFavorites(e.target.checked)}
            />
          }
          label="Solo ejercicios favoritos"
        />
      </Stack>
    </LocalizationProvider>
  );
};
