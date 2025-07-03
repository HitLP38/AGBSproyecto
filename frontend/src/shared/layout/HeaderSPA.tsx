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
  DarkMode,
  HelpOutline,
  Settings,
  AccountCircle,
  Home,
  FitnessCenter,
  BarChart,
  History,
} from "@mui/icons-material";
import { AnimatedIconButton } from "@/shared/ui/AnimatedIconButton";
import { FavoritesButton } from "@/shared/components/FavoritesButton";
import { useNavigationStore } from "@/store/navigationStore";
import logo from "@/assets/logo.avif";
import { UserButton, SignInButton, useUser } from "@clerk/clerk-react";

export const HeaderSPA = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const { setView, currentView } = useNavigationStore();
  const { user } = useUser();

  return (
    <AppBar position="static" elevation={0} className="inverted-header">
      {/* Fila superior */}
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
          {/* Opción 1: Si FavoritesButton debe recibir onClick */}
          <FavoritesButton />

          {/* Opción 2: Si FavoritesButton no necesita onClick, usa esto en su lugar:
          <FavoritesButton />
          */}

          {!isMobile && (
            <>
              <AnimatedIconButton tooltip="Ayuda" icon={<HelpOutline />} />
              <AnimatedIconButton tooltip="Configuración" icon={<Settings />} />
            </>
          )}
          {/* Autenticación minimalista */}
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
        </Stack>
      </Toolbar>
      {/* Menú horizontal solo en escritorio */}
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
            variant={currentView === "exercises" ? "contained" : "text"}
            onClick={() => setView("exercises")}
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
