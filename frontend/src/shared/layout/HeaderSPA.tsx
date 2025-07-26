// ✅ src/shared/layout/HeaderSPA.tsx
import {
  AppBar,
  Box,
  Button,
  Stack,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import {
  HelpOutline,
  Settings,
  AccountCircle,
  Home,
  FitnessCenter,
  BarChart,
  History,
  Favorite,
} from "@mui/icons-material";
import { AnimatedIconButton } from "@/shared/ui/AnimatedIconButton";
import { useNavigationStore } from "@/store/navigationStore";
import logo from "@/assets/logo.avif";
import { UserButton, SignInButton, useUser } from "@clerk/clerk-react";
import { useExerciseStore } from "@/store/useExerciseStore";
import { Person } from "@mui/icons-material";

export const HeaderSPA = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const { setView, currentView } = useNavigationStore();
  const { user } = useUser();
  const { onlyFavorites, toggleOnlyFavorites } = useExerciseStore();
  return (
    <AppBar position="static" elevation={0} className="inverted-header">
      <Toolbar
        sx={{
          justifyContent: "space-between",
          backgroundColor: "#F9FAFA",
          color: "#2E3E50",
        }}
      >
        <Stack direction="row" alignItems="center" spacing={1}>
          <img src={logo} alt="logo" style={{ height: 32 }} />
          <Typography variant="h6" fontWeight={600}>
            RetoAGBS
          </Typography>
        </Stack>

        <Stack direction="row" alignItems="center" spacing={1}>
          {/* ❤️ Favoritos */}
          <AnimatedIconButton
            tooltip="Favoritos"
            icon={<Favorite color={onlyFavorites ? "error" : "inherit"} />}
            onClick={toggleOnlyFavorites}
          />

          {!isMobile && (
            <>
              <AnimatedIconButton tooltip="Ayuda" icon={<HelpOutline />} />
              <AnimatedIconButton
                tooltip="Configuración"
                icon={<Settings />}
                onClick={() => setView("profile")}
              />
            </>
          )}

          {!user ? (
            <SignInButton mode="modal">
              <AnimatedIconButton
                tooltip="Iniciar sesión"
                icon={<AccountCircle />}
              />
            </SignInButton>
          ) : (
            <UserButton afterSignOutUrl="/" />
          )}
          {user && (
            <>
              <Button
                onClick={() => setView("profile")}
                startIcon={<AccountCircle />}
              >
                Perfil
              </Button>

              <Button onClick={() => setView("profile")} size="small">
                Perfil
              </Button>
            </>
          )}
        </Stack>
      </Toolbar>

      {!isMobile && (
        <Box
          sx={{ px: 2, pb: 1, display: "flex", gap: 2, alignItems: "center" }}
        >
          <Button
            startIcon={<Home />}
            variant={currentView === "home" ? "contained" : "text"}
            onClick={() => setView("home")}
          >
            Home
          </Button>
          <Button
            startIcon={<BarChart />}
            variant={currentView === "dashboard" ? "contained" : "text"}
            onClick={() => setView("dashboard")}
          >
            Dashboard
          </Button>
          <Button
            startIcon={<FitnessCenter />}
            variant={
              currentView === (isMobile ? "results" : "exercises")
                ? "contained"
                : "text"
            }
            onClick={() => setView(isMobile ? "results" : "exercises")}
          >
            Ejercicios
          </Button>

          <Button
            startIcon={<History />}
            variant={currentView === "history" ? "contained" : "text"}
            onClick={() => setView("history")}
          >
            Historial
          </Button>
        </Box>
      )}
    </AppBar>
  );
};
