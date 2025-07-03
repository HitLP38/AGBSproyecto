import {
  Box,
  Button,
  Container,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { ArrowForward } from "@mui/icons-material";
import { SignInButton, useUser } from "@clerk/clerk-react";
import { useEffect } from "react";
import { useNavigationStore } from "@/store/navigationStore";

export const WelcomeView = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const { setView } = useNavigationStore();
  const { isSignedIn } = useUser();

  // Redirigir si ya está autenticado
  useEffect(() => {
    if (isSignedIn) {
      setView("home");
    }
  }, [isSignedIn, setView]);

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#F9FAFA", py: 6 }}>
      <Container
        maxWidth="lg"
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: "center",
          justifyContent: "space-between",
          gap: 6,
        }}
      >
        {/* Contenido principal */}
        <Box sx={{ flex: 1, textAlign: { xs: "center", md: "left" } }}>
          <Typography
            variant="h3"
            fontWeight={700}
            color="primary"
            gutterBottom
          >
            Evalúa tu rendimiento
          </Typography>

          <Typography
            variant="h6"
            color="text.secondary"
            sx={{ mb: 4, maxWidth: "600px" }}
          >
            Registra tus resultados físicos, sigue tu progreso y mejora cada día
            con el RetoAGBS.
          </Typography>

          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              gap: 2,
              justifyContent: { xs: "center", md: "flex-start" },
            }}
          >
            <Button
              variant="contained"
              size="large"
              endIcon={<ArrowForward />}
              onClick={() => setView("exercises")}
              sx={{
                px: 4,
                py: 1.5,
                fontWeight: 600,
                fontSize: "1.1rem",
                borderRadius: 3,
                textTransform: "none",
              }}
            >
              🚀 Comenzar ahora
            </Button>

            <SignInButton mode="modal">
              <Button
                variant="outlined"
                size="large"
                sx={{
                  px: 4,
                  py: 1.5,
                  fontWeight: 600,
                  fontSize: "1.1rem",
                  borderRadius: 3,
                  textTransform: "none",
                  borderColor: "primary.main",
                  color: "primary.main",
                  "&:hover": {
                    backgroundColor: "primary.light",
                  },
                }}
              >
                👤 Iniciar sesión
              </Button>
            </SignInButton>
          </Box>
        </Box>

        {/* Imagen motivacional */}
        <Box
          sx={{
            flex: 1,
            height: { xs: 300, md: 400 },
            borderRadius: 4,
            background: `linear-gradient(135deg, rgba(46, 62, 80, 0.1), rgba(74, 93, 117, 0.05)), url('https://images.unsplash.com/photo-1605296867304-46d5465a13f1?fit=crop&w=1000&q=80')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            boxShadow: theme.shadows[10],
          }}
        />
      </Container>
    </Box>
  );
};
