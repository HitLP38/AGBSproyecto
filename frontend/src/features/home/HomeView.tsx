import {
  Box,
  Typography,
  Button,
  Container,
  Card,
  CardContent,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  EmojiEvents as EmojiEventsIcon,
  FitnessCenter as FitnessCenterIcon,
  RocketLaunch as RocketLaunchIcon,
  ArrowForward,
  Male as MaleIcon,
  SportsGymnastics as SportsIcon,
  Star as StarIcon,
} from "@mui/icons-material";
import { useNavigationStore } from "@/store/navigationStore";

export const HomeView = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("xl"));
  const { setView } = useNavigationStore();

  const handleStartEvaluation = () => setView("exercises");

  const benefits = [
    {
      icon: <EmojiEventsIcon sx={{ fontSize: 32, color: "primary.main" }} />,
      title: "Evalúa tu rendimiento",
      description: "Conoce tus resultados de forma precisa y confiable.",
    },
    {
      icon: <FitnessCenterIcon sx={{ fontSize: 32, color: "primary.main" }} />,
      title: "Entrena inteligente",
      description:
        "Elige ejercicios que se adapten a tu nivel y mejora progresivamente.",
    },
    {
      icon: <RocketLaunchIcon sx={{ fontSize: 32, color: "primary.main" }} />,
      title: "Cumple tus metas",
      description: "Supera tus marcas y alcanza tu máximo potencial.",
    },
  ];

  return (
    <Box
      sx={{
        minHeight: "calc(100vh - 120px)",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        overflow: "hidden",
        zIndex: 1,
        marginTop: { xs: "0px", md: "-40px", lg: "-60px" },
      }}
    >
      <Container
        maxWidth={false}
        sx={{
          display: "flex",
          flexDirection: "column",
          maxWidth: isLargeScreen ? "1800px" : "1400px",
          width: "100%",
          mx: "auto",
          px: { xs: 2, sm: 3, md: 4, lg: 6, xl: 8 },
          py: 0,
          height: "100%",
          "& *": {
            boxSizing: "border-box",
          },
        }}
      >
        {/* Hero Section - Centrado verticalmente */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: { xs: 4, md: 6, lg: 8, xl: 10 },
            flexDirection: { xs: "column", md: "row" },
            flex: 1,
            minHeight: "calc(100vh - 120px)",
            py: { xs: 2, md: 3, lg: 4, xl: 5 },
          }}
        >
          {/* Contenido de texto */}
          <Box
            sx={{
              flex: { xs: "none", md: "0 0 50%" },
              textAlign: { xs: "center", md: "left" },
              maxWidth: { xs: "100%", md: "600px", lg: "700px", xl: "800px" },
            }}
          >
            <Typography
              variant="h2"
              sx={{
                fontWeight: 700,
                color: "primary.main",
                mb: { xs: 2, md: 2.5, lg: 3 },
                fontSize: {
                  xs: "1.8rem",
                  sm: "2.2rem",
                  md: "2.8rem",
                  lg: "3.2rem",
                  xl: "3.8rem",
                },
                lineHeight: 1.1,
              }}
            >
              Evalúa tu progreso con el{" "}
              <Box
                component="span"
                sx={{
                  background:
                    "linear-gradient(135deg, #2E3E50 0%, #4A5D75 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                RetoAGBS
              </Box>
            </Typography>

            <Typography
              variant="h6"
              sx={{
                color: "text.secondary",
                mb: { xs: 2.5, md: 3, lg: 3.5 },
                lineHeight: 1.6,
                fontSize: {
                  xs: "0.9rem",
                  sm: "1rem",
                  md: "1.1rem",
                  lg: "1.2rem",
                  xl: "1.4rem",
                },
                maxWidth: { xs: "100%", md: "500px", lg: "600px", xl: "700px" },
                mx: { xs: "auto", md: 0 },
              }}
            >
              Pon a prueba tus habilidades en los 6 ejercicios oficiales de la
              academia. Descubre tu puntuación, sigue tu avance y supera tus
              propios límites.
            </Typography>

            <Button
              variant="contained"
              size="large"
              endIcon={<ArrowForward />}
              onClick={handleStartEvaluation}
              sx={{
                py: { xs: 1.5, md: 2, lg: 2.5 },
                px: { xs: 3, md: 4, lg: 5 },
                fontSize: { xs: "0.9rem", md: "1rem", lg: "1.1rem" },
                fontWeight: 600,
                borderRadius: 3,
                textTransform: "none",
                minWidth: { xs: "200px", md: "250px", lg: "280px" },
                maxWidth: { xs: "300px", md: "350px", lg: "400px" },
                background: "linear-gradient(135deg, #2E3E50 0%, #4A5D75 100%)",
                "&:hover": {
                  background:
                    "linear-gradient(135deg, #1E2B3A 0%, #2E3E50 100%)",
                  transform: "translateY(-2px)",
                  boxShadow: theme.shadows[8],
                },
                transition: "all 0.3s ease",
              }}
            >
              ¡Comienza tu evaluación ahora!
            </Button>
          </Box>

          {/* Imagen - Aprovecha toda la altura disponible */}
          <Box
            sx={{
              flex: { xs: "none", md: "0 0 50%" },
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: { xs: "300px", md: "100%" },
              minHeight: { xs: "300px", md: "400px", lg: "500px", xl: "600px" },
            }}
          >
            <Box
              sx={{
                width: {
                  xs: "280px",
                  sm: "350px",
                  md: "450px",
                  lg: "550px",
                  xl: "700px",
                },
                height: {
                  xs: "240px",
                  sm: "300px",
                  md: "400px",
                  lg: "480px",
                  xl: "600px",
                },
                backgroundImage: "url('/Home portada 1.png')",
                backgroundSize: "contain",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: "scale(1.02)",
                },
              }}
            />
          </Box>
        </Box>
      </Container>
    </Box>
  );
};
