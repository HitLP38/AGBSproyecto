import { Box, useMediaQuery, useTheme } from "@mui/material";
import { PropsWithChildren } from "react";

export const ResponsiveChartContainer = ({ children }: PropsWithChildren) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box
      sx={{
        height: isMobile ? 300 : 400,
        width: "100%",
        p: 2,
        borderRadius: 2,
        backgroundColor: "background.paper",
        boxShadow: 3,
      }}
    >
      {children}
    </Box>
  );
};
