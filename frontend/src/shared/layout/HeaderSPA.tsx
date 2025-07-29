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
  {
    /*const { onlyFavorites, toggleOnlyFavorites } = useExerciseStore();*/
  }
  return (
    <AppBar
      position="static"
      elevation={0}
      className="inverted-header"
      sx={{
        zIndex: 10, // Mayor que cualquier contenido
        position: "relative",
      }}
    >
      <Toolbar
        sx={{
          justifyContent: "space-between",
          backgroundColor: isMobile ? "#2E3E50" : "#F9FAFA",
          color: isMobile ? "#F9FAFA" : "#2E3E50",
        }}
      >
        <Stack direction="row" alignItems="center" spacing={1}>
          <Box
            onClick={() => setView("home")}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              cursor: "pointer",
              transition: "all 0.3s ease",
              "&:hover": {
                transform: "scale(1.05)",
                opacity: 0.8,
              },
            }}
          >
            <img 
              src={isMobile ? "/logos/logo.avif" : logo} 
              alt="logo" 
              style={{ height: 32 }} 
            />
            <Typography 
              variant="h6" 
              fontWeight={600}
              sx={{
                color: isMobile ? "#F9FAFA" : "#2E3E50",
              }}
            >
              RetoAGBS
            </Typography>
          </Box>
        </Stack>

        <Stack direction="row" alignItems="center" spacing={1}>
          {/* ❤️ Favoritos 
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
          )} */}

          {!user ? (
            <SignInButton mode="modal">
              <AnimatedIconButton
                tooltip="Iniciar sesión"
                icon={<AccountCircle />}
                sx={{
                  color: isMobile ? "#F9FAFA" : "#2E3E50",
                }}
              />
            </SignInButton>
          ) : (
            <UserButton afterSignOutUrl="/" />
          )}
          {/*{user && (
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
          )}*/}
        </Stack>
      </Toolbar>

      {!isMobile && (
        <Box
          sx={{
            px: 2,
            py: 1,
            pb: 1,
            display: "flex",
            gap: 2,
            alignItems: "center",
          }}
        >
          <Button
            startIcon={<Home />}
            variant={currentView === "home" ? "contained" : "text"}
            onClick={() => setView("home")}
          >
            Home
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
            startIcon={<BarChart />}
            variant={currentView === "dashboard" ? "contained" : "text"}
            onClick={() => setView("dashboard")}
          >
            Dashboard
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
