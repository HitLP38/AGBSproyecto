import {
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  Button,
  useMediaQuery,
  useTheme,
  Typography,
  Box,
  Stack,
  MenuItem,
  Select,
} from "@mui/material";
import { useState, useEffect } from "react";

interface ScrollPickerProps {
  open: boolean;
  onClose: () => void;
  onConfirm: (value: string) => void;
  mode: "time" | "reps"; // time = mm:ss, reps = número entero
  initialValue?: string;
  label?: string;
}

export const ScrollPicker = ({
  open,
  onClose,
  onConfirm,
  mode,
  initialValue,
  label,
}: ScrollPickerProps) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  // Estado local para tiempo y repeticiones
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [rep, setRep] = useState(50); // Valor inicial centrado

  useEffect(() => {
    if (initialValue) {
      if (mode === "time") {
        const [min, sec] = initialValue.split(":").map(Number);
        setMinutes(min);
        setSeconds(sec);
      } else if (mode === "reps") {
        setRep(Number(initialValue));
      }
    }
  }, [initialValue, mode]);

  const handleConfirm = () => {
    const value =
      mode === "time"
        ? `${minutes}:${seconds.toString().padStart(2, "0")}`
        : rep.toString();
    onConfirm(value);
  };

  return (
    <Dialog open={open} onClose={onClose} fullScreen={fullScreen} fullWidth>
      <DialogTitle sx={{ fontWeight: 600 }}>
        {label || "Selecciona un valor"}
      </DialogTitle>
      <DialogContent>
        <Box display="flex" justifyContent="center" py={3}>
          {mode === "time" ? (
            <Stack direction="row" spacing={4}>
              <Box>
                <Typography align="center" fontWeight={600}>
                  Minutos
                </Typography>
                <Select
                  value={minutes}
                  onChange={(e) => setMinutes(Number(e.target.value))}
                  MenuProps={{ PaperProps: { sx: { maxHeight: 300 } } }}
                >
                  {Array.from({ length: 60 }, (_, i) => (
                    <MenuItem key={i} value={i}>
                      {i.toString().padStart(2, "0")}
                    </MenuItem>
                  ))}
                </Select>
              </Box>
              <Box>
                <Typography align="center" fontWeight={600}>
                  Segundos
                </Typography>
                <Select
                  value={seconds}
                  onChange={(e) => setSeconds(Number(e.target.value))}
                  MenuProps={{ PaperProps: { sx: { maxHeight: 300 } } }}
                >
                  {Array.from({ length: 60 }, (_, i) => (
                    <MenuItem key={i} value={i}>
                      {i.toString().padStart(2, "0")}
                    </MenuItem>
                  ))}
                </Select>
              </Box>
            </Stack>
          ) : (
            <Box>
              <Typography align="center" fontWeight={600}>
                {label || "Valor"}
              </Typography>
              <Select
                value={rep}
                onChange={(e) => setRep(Number(e.target.value))}
                MenuProps={{ PaperProps: { sx: { maxHeight: 300 } } }}
              >
                {Array.from({ length: 51 }, (_, i) => i + 30).map((num) => (
                  <MenuItem key={num} value={num}>
                    {num}
                  </MenuItem>
                ))}
              </Select>
            </Box>
          )}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="error">
          Cancelar
        </Button>
        <Button onClick={handleConfirm} variant="contained" color="primary">
          Confirmar
        </Button>
      </DialogActions>
    </Dialog>
  );
};
