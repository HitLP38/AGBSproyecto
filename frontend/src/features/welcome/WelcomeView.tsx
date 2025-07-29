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
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("xl"));
  const { setView } = useNavigationStore();
  const { isSignedIn } = useUser();

  // Redirigir si ya está autenticado
  useEffect(() => {
    if (isSignedIn) {
      setView("home");
    }
  }, [isSignedIn, setView]);

  return (
    <Box 
      sx={{ 
        // Ajusta este valor para cambiar la altura: 70vh, 80vh, 90vh, etc.
        minHeight: "calc(50vh - 120px)",
        backgroundColor: "#F9FAFA", 
        display: "flex",
        alignItems: "flex-start",
        pt: { xs: 2, md: 3, lg: 4, xl: 5 },
        pb: { xs: 2, md: 2, lg: 2, xl: 3 },
      }}
    >
      <Container
        maxWidth={false}
        disableGutters // Esto quita el padding automático de 56px
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: "flex-start",
          justifyContent: "center",
          gap: { xs: 4, md: 6, lg: 8, xl: 10 },
          height: "95%",
          padding: { xs: 1, md: 2, lg: 2, xl: 4 },
          maxWidth: isLargeScreen ? "1800px" : "1200px",
          mx: "auto",
        }}
      >
        {/* Contenido principal */}
        <Box 
          sx={{ 
            flex: { xs: "none", md: "0 0 55%" },
            textAlign: { xs: "center", md: "left" },
            maxWidth: { xs: "100%", md: "600px", lg: "700px", xl: "800px" },
            padding: { xs: 1, md: 2, lg: 2, xl: 3 },
          }}
        >
          <Typography
            variant="h2"
            fontWeight={700}
            color="primary"
            sx={{
              mb: { xs: 2, md: 2.5, lg: 3 },
              fontSize: {
                xs: "2rem",
                sm: "2.5rem",
                md: "3rem",
                lg: "3.5rem",
                xl: "3.8rem",
              },
              lineHeight: 1.1,
            }}
          >
            Evalúa tu rendimiento
          </Typography>

          <Typography
            variant="h6"
            color="text.secondary"
            sx={{ 
              mb: { xs: 3, md: 4, lg: 5 },
              fontSize: {
                xs: "1rem",
                sm: "1.1rem",
                md: "1.2rem",
                lg: "1.3rem",
                xl: "1.4rem",
              },
              lineHeight: 1.6,
              maxWidth: { xs: "100%", md: "500px", lg: "600px", xl: "700px" },
            }}
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
              alignItems: { xs: "center", sm: "flex-start" },
            }}
          >
            <Button
              variant="contained"
              size="large"
              endIcon={<ArrowForward />}
              onClick={() => setView("exercises")}
              sx={{
                px: { xs: 3, md: 4, lg: 5 },
                py: { xs: 1.5, md: 2, lg: 2.5 },
                fontWeight: 600,
                fontSize: { xs: "1rem", md: "1.1rem", lg: "1.2rem" },
                borderRadius: 3,
                textTransform: "none",
                minWidth: { xs: "200px", md: "250px", lg: "280px" },
                maxWidth: { xs: "300px", md: "350px", lg: "400px" },
                background: "linear-gradient(135deg, #2E3E50 0%, #4A5D75 100%)",
                "&:hover": {
                  background: "linear-gradient(135deg, #1E2B3A 0%, #2E3E50 100%)",
                  transform: "translateY(-2px)",
                  boxShadow: theme.shadows[8],
                },
                transition: "all 0.3s ease",
              }}
            >
              🚀 Comenzar ahora
            </Button>

            <SignInButton mode="modal">
              <Button
                variant="outlined"
                size="large"
                sx={{
                  px: { xs: 3, md: 4, lg: 5 },
                  py: { xs: 1.5, md: 2, lg: 2.5 },
                  fontWeight: 600,
                  fontSize: { xs: "1rem", md: "1.1rem", lg: "1.2rem" },
                  borderRadius: 3,
                  textTransform: "none",
                  minWidth: { xs: "200px", md: "250px", lg: "280px" },
                  maxWidth: { xs: "300px", md: "350px", lg: "400px" },
                  borderColor: "primary.main",
                  color: "primary.main",
                  "&:hover": {
                    backgroundColor: "primary.light",
                    borderColor: "primary.dark",
                  },
                  transition: "all 0.3s ease",
                }}
              >
                👤 Iniciar sesión
              </Button>
            </SignInButton>
          </Box>
        </Box>

        {/* Imagen motivacional - Más grande y visible */}
        <Box
          sx={{
            flex: { xs: "none", md: "0 0 45%" },
            display: "flex",
            justifyContent: "top-center",
            alignItems: "flex-start",
            height: { xs: "350px", md: "70%" },
            minHeight: { xs: "350px", md: "420px", lg: "480px", xl: "550px" },
            padding: { xs: 1, md: 2, lg: 2, xl: 3 },
          }}
        >
          <Box
            sx={{
              width: {
                xs: "320px",
                sm: "400px",
                md: "500px",
                lg: "600px",
                xl: "720px",
              },
              height: {
                xs: "280px",
                sm: "350px",
                md: "400px",
                lg: "420px",
                xl: "480px",
              },
              backgroundImage: "url('/Home portada 1.avif')",
              backgroundSize: "cover",
              backgroundPosition: "top-center",
              backgroundRepeat: "no-repeat",
              transition: "all 0.3s ease",
              "&:hover": {
                transform: "scale(1.02)",
              },
            }}
          />
        </Box>
      </Container>
    </Box>
  );
};
