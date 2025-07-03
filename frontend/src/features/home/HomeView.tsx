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
} from "@mui/icons-material";
import { useNavigationStore } from "@/store/navigationStore";

export const HomeView = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
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
    <Box sx={{ minHeight: "80vh" }}>
      <Container maxWidth="lg">
        {/* Hero */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            minHeight: "70vh",
            gap: { xs: 4, md: 8 },
            flexDirection: { xs: "column", md: "row" },
            py: { xs: 4, md: 0 },
          }}
        >
          <Box sx={{ flex: 1, textAlign: { xs: "center", md: "left" } }}>
            <Typography
              variant="h2"
              sx={{
                fontWeight: 700,
                color: "primary.main",
                mb: 2,
                fontSize: { xs: "2.5rem", md: "3.5rem" },
                lineHeight: 1.2,
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
                mb: 4,
                lineHeight: 1.6,
                fontSize: { xs: "1rem", md: "1.25rem" },
                maxWidth: "600px",
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
                py: 2,
                px: 4,
                fontSize: "1.1rem",
                fontWeight: 600,
                borderRadius: 3,
                textTransform: "none",
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

          {/* Imagen */}
          <Box
            sx={{
              flex: 1,
              display: "flex",
              justifyContent: "center",
              maxWidth: { xs: "100%", md: "500px" },
            }}
          >
            <Box
              sx={{
                width: "100%",
                height: { xs: "300px", md: "400px" },
                borderRadius: 4,
                background: `url('/hero-retopreparacion.png') center/cover no-repeat`,
                boxShadow: theme.shadows[12],
              }}
            />
          </Box>
        </Box>

        {/* Beneficios */}
        <Box sx={{ py: { xs: 4, md: 8 } }}>
          <Typography
            variant="h4"
            align="center"
            fontWeight={600}
            color="primary.main"
            mb={2}
          >
            ¡Prepárate para rendir al máximo!
          </Typography>

          <Box
            sx={{
              display: "flex",
              gap: 3,
              justifyContent: "center",
              flexDirection: { xs: "column", md: "row" },
              maxWidth: "900px",
              mx: "auto",
            }}
          >
            {benefits.map((step, index) => (
              <Card
                key={index}
                sx={{
                  flex: 1,
                  transition: "all 0.3s ease",
                  cursor: "pointer",
                  border: "2px solid transparent",
                  "&:hover": {
                    transform: "translateY(-8px)",
                    boxShadow: theme.shadows[12],
                    borderColor: "primary.light",
                  },
                }}
              >
                <CardContent
                  sx={{
                    textAlign: "center",
                    p: 4,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Box
                    sx={{
                      width: 40,
                      height: 40,
                      borderRadius: "50%",
                      background:
                        "linear-gradient(135deg, #2E3E50 0%, #4A5D75 100%)",
                      color: "white",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: 700,
                      fontSize: "1.2rem",
                      mb: 2,
                    }}
                  >
                    {index + 1}
                  </Box>
                  <Box sx={{ mb: 2 }}>{step.icon}</Box>
                  <Typography
                    variant="h6"
                    fontWeight={600}
                    color="primary.main"
                    mb={1}
                  >
                    {step.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {step.description}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );
};
