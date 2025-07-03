import { Box, Container, Typography, Paper, useTheme } from "@mui/material";
import { useResultStore } from "@/store/resultStore";
import { useEffect } from "react";

export const HistoryView = () => {
  const theme = useTheme();
  const { records } = useResultStore();

  // Ordenar por fecha descendente
  const sorted = [...records].sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" fontWeight={600} gutterBottom>
        Historial de resultados
      </Typography>

      {sorted.length === 0 ? (
        <Typography color="text.secondary">
          Aún no has registrado resultados.
        </Typography>
      ) : (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {sorted.map((res, idx) => (
            <Paper key={idx} elevation={2} sx={{ p: 2 }}>
              <Typography variant="subtitle1" fontWeight={600}>
                {res.exercise_id}
              </Typography>
              <Typography variant="body2">
                Valor: <strong>{res.value}</strong> | Puntaje:{" "}
                <strong>{res.score}</strong>
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {new Date(res.timestamp).toLocaleString()}
              </Typography>
            </Paper>
          ))}
        </Box>
      )}
    </Container>
  );
};
