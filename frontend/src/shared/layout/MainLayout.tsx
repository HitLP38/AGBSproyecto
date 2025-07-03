import { Box } from "@mui/material";
import { BottomNav } from "./BottomNav";
import { HeaderSPA } from "./HeaderSPA";
import { ViewRenderer } from "@/app/ViewRenderer";

export const MainLayout = () => (
  <Box sx={{ pb: 7 }}>
    <HeaderSPA />
    <Box p={2}>
      <ViewRenderer />
    </Box>
    <BottomNav />
  </Box>
);
