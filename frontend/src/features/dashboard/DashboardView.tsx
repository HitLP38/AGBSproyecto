import {
  Box,
  Container,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { useUser, useAuth } from "@clerk/clerk-react";
import { useEffect } from "react";

import { DashboardFilters } from "./components/DashboardFilters";
import { SummaryCards } from "./components/SummaryCards";
import { NoteTable } from "./components/NoteTable";
import { ScoreChart } from "./components/ScoreChart";
// import { ProgressChart } from "./components/ProgressChart";
import { PerformanceRadar } from "./components/PerformanceRadar";
import { useFilteredResults } from "./hooks/useFilteredResults";
import { useResultStore } from "@/store/resultStore";

export const DashboardView = () => {
  const { user } = useUser();
  const { getToken } = useAuth();
  const { filteredResults } = useFilteredResults();
  const { fetchAll } = useResultStore();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  // ✅ Cargar resultados si se accede directo al dashboard
  useEffect(() => {
    const loadResults = async () => {
      const token = await getToken();
      const userId = user?.id;
      if (token && userId) {
        await fetchAll(userId, token);
      }
    };

    loadResults();
  }, [user, getToken, fetchAll]);

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
          <PerformanceRadar results={filteredResults} />
        </Box>
      </Box>

      {/* Tabla de registros */}
      <NoteTable results={filteredResults} />
    </Container>
  );
};
