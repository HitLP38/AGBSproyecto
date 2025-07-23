import { useEffect } from "react";
import { Box, Container, Typography } from "@mui/material";
import { useUser, useAuth } from "@clerk/clerk-react";
import { useResultStore } from "@/store/resultStore";
import { useFilteredResults } from "@/features/dashboard/hooks/useFilteredResults";
import { DashboardFilters } from "@/features/dashboard/components/DashboardFilters";
import { NoteTable } from "@/features/dashboard/components/NoteTable";
import { ScoreChart } from "@/features/dashboard/components/ScoreChart";
import { ProgressChart } from "@/features/dashboard/components/ProgressChart";

export const HistoryView = () => {
  const { user } = useUser();
  const { getToken } = useAuth();
  const { fetchAll } = useResultStore();
  const { filteredResults } = useFilteredResults();

  useEffect(() => {
    const fetchUserResults = async () => {
      if (user && user.id) {
        const token = await getToken();
        await fetchAll(user.id, token || "");
      }
    };

    fetchUserResults();
  }, [user]);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" fontWeight={600} gutterBottom>
        Historial de Resultados
      </Typography>

      <DashboardFilters />

      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: 4,
          mb: 4,
        }}
      >
        <ProgressChart results={filteredResults} />
      </Box>

      <NoteTable results={filteredResults} />
    </Container>
  );
};
