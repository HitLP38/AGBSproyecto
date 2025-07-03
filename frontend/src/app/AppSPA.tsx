import { CssBaseline, ThemeProvider } from "@mui/material";
import { theme } from "@/shared/styles/theme";
import { MainLayout } from "@/shared/layout/MainLayout";
import { useEffect } from "react";
import { useUser } from "@clerk/clerk-react";
import { useUserStore } from "@/store/useUserStore";

export const AppSPA = () => {
  const { user } = useUser();
  const setUserId = useUserStore((s) => s.setUserId);

  useEffect(() => {
    if (user?.id) {
      setUserId(user.id);
    } else {
      setUserId(null);
    }
  }, [user]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <MainLayout />
    </ThemeProvider>
  );
};
