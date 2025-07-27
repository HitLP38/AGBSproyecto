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

  const selectionItems = [
    {
      icon: <MaleIcon sx={{ fontSize: 24, color: "primary.main" }} />,
      text: "Seleccione sexo",
    },
    {
      icon: <SportsIcon sx={{ fontSize: 24, color: "primary.main" }} />,
      text: "Seleccione Ejercicio",
    },
    {
      icon: <StarIcon sx={{ fontSize: 24, color: "primary.main" }} />,
      text: "Seleccione grado",
    },
  ];

  return (
    <Box
      sx={{
        minHeight: "calc(100vh - 120px)", // Restar altura de headers aproximada
        //height: "calc(100vh - 120px)",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        overflow: "hidden",

        zIndex: 1,
        marginTop: { xs: "0px", md: "-40px", lg: " -60px" },
        px: { xs: "1 em", md: "1.5 em", lg: " 4 em" },
      }}
    >
      <Box
        sx={{
          //flex: 1,
          display: "flex",
          flexDirection: "column",
          maxWidth: "1400px", // Límite máximo para pantallas muy grandes
          width: "100%",
          mx: "auto", // Centrar horizontalmente
          px: { xs: 1, sm: 2, md: 3, lg: 4 }, // Solo padding lateral mínimo
          py: 0, // Sin padding vertical
          // Forzar eliminación de padding con !important
          "& *": {
            boxSizing: "border-box",
          },
          // Sobrescribir cualquier padding de MUI
          paddingTop: "0 !important",
          paddingBottom: "0 !important",
        }}
      >
        {/* Hero */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: { xs: 3, md: 6, lg: 8 },
            flexDirection: { xs: "column", md: "row" },
            py: { xs: 2, md: 3, lg: 4 },
            flex: 1,
            minHeight: 0, // Permite que flex funcione correctamente
          }}
        >
          <Box
            sx={{
              flex: 1,
              textAlign: { xs: "center", md: "left" },
              maxWidth: { md: "600px", lg: "700px" },
            }}
          >
            <Typography
              variant="h2"
              sx={{
                fontWeight: 700,
                color: "primary.main",
                mb: { xs: 1.5, md: 2 },
                fontSize: {
                  xs: "1.8rem",
                  sm: "2.2rem",
                  md: "2.5rem",
                  lg: "3rem",
                  xl: "3.5rem",
                },
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
                mb: { xs: 2.5, md: 3, lg: 4 },
                lineHeight: 1.6,
                fontSize: {
                  xs: "0.85rem",
                  sm: "0.92rem",
                  md: "1.05rem",
                  lg: "1.1rem",
                  xl: "1.2rem",
                },
                maxWidth: { xs: "100%", md: "500px", lg: "600px" },
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
                py: { xs: 1.5, md: 2 },
                px: { xs: 3, md: 4 },
                fontSize: { xs: "0.85rem", md: "0.92rem", lg: "1rem" },
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
              alignItems: "center",
              maxWidth: { xs: "100%", md: "45%", lg: "40%" },
              minHeight: { xs: "250px", md: "350px", lg: "450px" },
            }}
          >
            <Box
              sx={{
                width: {
                  xs: "280px",
                  sm: "350px",
                  md: "400px",
                  lg: "500px",
                  xl: "600px",
                },
                height: {
                  xs: "240px",
                  sm: "300px",
                  md: "340px",
                  lg: "420px",
                  xl: "500px",
                },
                backgroundImage: "url('/Home portada 1.png')",
                backgroundSize: "contain",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                borderRadius: 2,
              }}
            />
          </Box>
        </Box>

        {/* Contenedor horizontal inferior con margen negativo */}
        <Box
          sx={{
            position: "relative",
            marginTop: { xs: "-40px", md: "-60px", lg: "-80px" },
            zIndex: 10,
            mb: 2,
          }}
        >
          <Card
            sx={{
              borderRadius: 4,
              boxShadow: theme.shadows[8],
              background: "rgba(255, 255, 255, 0.95)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255, 255, 255, 0.2)",
            }}
          >
            <CardContent sx={{ p: { xs: 1.5, sm: 1.8, md: 2, lg: 2 } }}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  flexDirection: { xs: "column", sm: "row" },
                  gap: { xs: 2, sm: 1.5, md: 2, lg: 4 },
                }}
              >
                {/* Items de selección */}
                {selectionItems.map((item, index) => (
                  <Box
                    key={index}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: { xs: 1, md: 1.5 },
                      flex: 1,
                      justifyContent: { xs: "center", sm: "flex-start" },
                      minWidth: { xs: "180px", sm: "auto" },
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: { xs: 35, md: 40 },
                        height: { xs: 35, md: 40 },
                        borderRadius: "50%",
                        backgroundColor: "rgba(46, 62, 80, 0.1)",
                      }}
                    >
                      {item.icon}
                    </Box>
                    <Typography
                      variant="body1"
                      sx={{
                        fontWeight: 500,
                        color: "text.primary",
                        fontSize: {
                          xs: "0.8rem",
                          sm: "0.85rem",
                          md: "0.9rem",
                          lg: "1rem",
                        },
                      }}
                    >
                      {item.text}
                    </Typography>
                  </Box>
                ))}

                {/* Botón */}
                <Button
                  variant="contained"
                  sx={{
                    py: { xs: 1.2, md: 1.5 },
                    px: { xs: 2.5, md: 3 },
                    fontSize: { xs: "0.8rem", md: "0.9rem" },
                    fontWeight: 600,
                    borderRadius: 3,
                    textTransform: "none",
                    background:
                      "linear-gradient(135deg, #2E3E50 0%, #4A5D75 100%)",
                    minWidth: { xs: "140px", sm: "120px", md: "140px" },
                    "&:hover": {
                      background:
                        "linear-gradient(135deg, #1E2B3A 0%, #2E3E50 100%)",
                      transform: "translateY(-1px)",
                      boxShadow: theme.shadows[6],
                    },
                    transition: "all 0.3s ease",
                  }}
                >
                  ¡Comenzar!
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </Box>
  );
};
