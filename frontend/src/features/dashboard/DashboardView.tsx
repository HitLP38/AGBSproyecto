import { Box, Container, Typography } from "@mui/material";
import { SummaryCards } from "./components/SummaryCards";
import { ScoreChart } from "./components/ScoreChart";
import { ProgressChart } from "./components/ProgressChart";
import { NoteTable } from "./components/NoteTable";

export const DashboardView = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" fontWeight={600} gutterBottom>
        Tu progreso general
      </Typography>
      <DashboardFilters />
      {/* 1. Cards resumen */}
      <Box display="flex" flexWrap="wrap" gap={2} mb={4}>
        <SummaryCards />
      </Box>

      {/* 2. Gráficos en fila */}
      <Box
        display="flex"
        flexDirection={{ xs: "column", md: "row" }}
        gap={2}
        mb={4}
      >
        <Box flex={1}>
          <ScoreChart />
        </Box>
        <Box flex={1}>
          <ProgressChart />
        </Box>
      </Box>

      {/* 3. Tabla de notas */}
      <Box>
        <Typography variant="h6" fontWeight={600} mb={2}>
          Tabla de Notas
        </Typography>
        <NoteTable />
      </Box>
    </Container>
  );
};
