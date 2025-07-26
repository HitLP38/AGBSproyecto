import { useState } from "react";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import { exercises } from "@/domain/exercise/data/exercises";
import { useExerciseStore } from "@/store/useExerciseStore";

interface ExerciseSelectorProps {
  selectedId: string | null;
  onChange: (id: string) => void;
}

export const ExerciseSelector = ({
  selectedId,
  onChange,
}: ExerciseSelectorProps) => {
  const { selectAll } = useExerciseStore();
  const [localSelected, setLocalSelected] = useState(selectedId || "");

  const handleChange = (event: SelectChangeEvent) => {
    const newValue = event.target.value;

    if (newValue === "ALL") {
      // Seleccionar todos los ejercicios
      selectAll();
      setLocalSelected("ALL");
    } else {
      // Selección individual
      setLocalSelected(newValue);
      onChange(newValue);
    }
  };

  return (
    <Box>
      <Typography variant="h6" fontWeight={600} gutterBottom>
        Selecciona un ejercicio
      </Typography>
      <FormControl fullWidth>
        <InputLabel id="exercise-select-label">Ejercicio</InputLabel>
        <Select
          labelId="exercise-select-label"
          value={localSelected}
          label="Ejercicio"
          onChange={handleChange}
        >
          {/*<MenuItem value="">Seleccionar uno...</MenuItem>*/}
          <MenuItem value="ALL">Seleccionar todos</MenuItem>
          {exercises.map((ex) => (
            <MenuItem key={ex.id} value={ex.id}>
              {ex.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};
