import {
  BottomNavigation,
  BottomNavigationAction,
  Paper,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import {
  Home,
  FitnessCenter,
  BarChart,
  History,
  AccountCircle,
} from "@mui/icons-material";
import { useNavigationStore } from "@/store/navigationStore";

export const BottomNav = () => {
  const { currentView, setView } = useNavigationStore();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  if (!isMobile) return null;

  return (
    <Paper
      sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
      elevation={6}
    >
      <BottomNavigation
        showLabels
        value={currentView}
        onChange={(_, newValue) => setView(newValue)}
      >
        <BottomNavigationAction label="Inicio" value="home" icon={<Home />} />
        <BottomNavigationAction
          label="Ejercicios"
          value="exercises"
          icon={<FitnessCenter />}
        />
        <BottomNavigationAction
          label="Dashboard"
          value="dashboard"
          icon={<BarChart />}
        />
        <BottomNavigationAction
          label="Historial"
          value="history"
          icon={<History />}
        />
        <BottomNavigationAction
          label="Perfil"
          value="profile"
          icon={<AccountCircle />}
        />
      </BottomNavigation>
    </Paper>
  );
};
