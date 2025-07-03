import {
  Box,
  Container,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { DashboardFilters } from "./components/DashboardFilters";
import { SummaryCards } from "./components/SummaryCards";
import { NoteTable } from "./components/NoteTable";
import { ScoreChart } from "./components/ScoreChart";
import { ProgressChart } from "./components/ProgressChart";
import { useFilteredResults } from "./hooks/useFilteredResults";

export const DashboardView = () => {
  const { filteredResults } = useFilteredResults();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" fontWeight={700} gutterBottom>
        Dashboard de Rendimiento
      </Typography>

      {/* Filtros */}
      <DashboardFilters />

      {/* Tarjetas resumen */}
      <SummaryCards results={filteredResults} />

      {/* Gráficos */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: 2,
          mb: 4,
        }}
      >
        <Box flex={1}>
          <ScoreChart results={filteredResults} />
        </Box>
        <Box flex={1}>
          <ProgressChart results={filteredResults} />
        </Box>
      </Box>

      {/* Tabla de registros */}
      <NoteTable results={filteredResults} />
    </Container>
  );
};
