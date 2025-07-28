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
  mode: "time" | "reps" | "seconds" | "swim-time"; // ✅ nuevo modo
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

  // Estados comunes
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [rep, setRep] = useState(50);

  // Para 50m lisos (segundos.decimales)
  const [mainSecond, setMainSecond] = useState("7.0");
  const [decimal, setDecimal] = useState("00");

  // Para natación (min, seg, décima)
  const [swimMinute, setSwimMinute] = useState(0);
  const [swimSecond, setSwimSecond] = useState(0);
  const [swimTenth, setSwimTenth] = useState(0);

  useEffect(() => {
    if (!initialValue) return;

    if (mode === "time") {
      const [min, sec] = initialValue.split(":").map(Number);
      setMinutes(min);
      setSeconds(sec);
    } else if (mode === "reps") {
      setRep(Number(initialValue));
    } else if (mode === "seconds") {
      const num = parseFloat(initialValue);
      const base = Math.floor(num * 10) / 10;
      const cent = Math.round((num - base) * 100);
      setMainSecond(base.toFixed(1));
      setDecimal(cent.toString().padStart(2, "0"));
    } else if (mode === "swim-time") {
      // Ejemplo: 0.753 = 0 min, 45 sec, 3 décimas
      const num = parseFloat(initialValue);
      const min = Math.floor(num);
      const rem = (num - min) * 60;
      const sec = Math.floor(rem);
      const dec = Math.round((rem - sec) * 10);
      setSwimMinute(min);
      setSwimSecond(sec);
      setSwimTenth(dec);
    }
  }, [initialValue, mode]);

  const handleConfirm = () => {
    let value = "";

    if (mode === "time") {
      value = `${minutes}:${seconds.toString().padStart(2, "0")}`;
    } else if (mode === "reps") {
      value = rep.toString();
    } else if (mode === "seconds") {
      const combined = parseFloat(mainSecond) + parseInt(decimal, 10) * 0.01;
      value = combined.toFixed(2);
    } else if (mode === "swim-time") {
      const total = swimMinute + (swimSecond + swimTenth * 0.1) / 60;
      value = total.toFixed(3); // más precisión para natación
    }

    onConfirm(value);
  };

  return (
    <Dialog open={open} onClose={onClose} fullScreen={fullScreen} fullWidth>
      <DialogTitle sx={{ fontWeight: 600 }}>
        {label || "Selecciona un valor"}
      </DialogTitle>
      <DialogContent>
        <Box display="flex" justifyContent="center" py={3}>
          {/* TIME */}
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
          ) : mode === "reps" ? (
            <Box>
              <Typography align="center" fontWeight={600}>
                {label || "Repeticiones"}
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
          ) : mode === "seconds" ? (
            <Stack direction="row" spacing={4}>
              <Box>
                <Typography align="center" fontWeight={600}>
                  Segundos
                </Typography>
                <Select
                  value={mainSecond}
                  onChange={(e) => setMainSecond(e.target.value)}
                  MenuProps={{ PaperProps: { sx: { maxHeight: 300 } } }}
                >
                  {Array.from({ length: 31 }, (_, i) =>
                    (6 + i * 0.1).toFixed(1)
                  ).map((val) => (
                    <MenuItem key={val} value={val}>
                      {val}
                    </MenuItem>
                  ))}
                </Select>
              </Box>
              <Box>
                <Typography align="center" fontWeight={600}>
                  Centésimas
                </Typography>
                <Select
                  value={decimal}
                  onChange={(e) => setDecimal(e.target.value)}
                  MenuProps={{ PaperProps: { sx: { maxHeight: 300 } } }}
                >
                  {Array.from({ length: 10 }, (_, i) =>
                    i.toString().padStart(2, "0")
                  ).map((val) => (
                    <MenuItem key={val} value={val}>
                      {val}
                    </MenuItem>
                  ))}
                </Select>
              </Box>
            </Stack>
          ) : (
            // swim-time
            <Stack direction="row" spacing={4}>
              <Box>
                <Typography align="center" fontWeight={600}>
                  Minutos
                </Typography>
                <Select
                  value={swimMinute}
                  onChange={(e) => setSwimMinute(Number(e.target.value))}
                  MenuProps={{ PaperProps: { sx: { maxHeight: 300 } } }}
                >
                  {[0, 1].map((m) => (
                    <MenuItem key={m} value={m}>
                      {m}
                    </MenuItem>
                  ))}
                </Select>
              </Box>
              <Box>
                <Typography align="center" fontWeight={600}>
                  Segundos
                </Typography>
                <Select
                  value={swimSecond}
                  onChange={(e) => setSwimSecond(Number(e.target.value))}
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
                  Décimas
                </Typography>
                <Select
                  value={swimTenth}
                  onChange={(e) => setSwimTenth(Number(e.target.value))}
                  MenuProps={{ PaperProps: { sx: { maxHeight: 300 } } }}
                >
                  {Array.from({ length: 10 }, (_, i) => (
                    <MenuItem key={i} value={i}>
                      {i}
                    </MenuItem>
                  ))}
                </Select>
              </Box>
            </Stack>
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
