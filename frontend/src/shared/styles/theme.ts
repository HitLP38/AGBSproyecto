// ✅ src/shared/styles/theme.ts
import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#2E3E50", // texto fuerte o fondo oscuro
    },
    secondary: {
      main: "#E9EEED", // color claro para contraste o fondo
    },
    background: {
      default: "#F9FAFA", // fondo general claro
      paper: "#FFFFFF",
    },
    text: {
      primary: "#2E3E50",
    },
  },
  shape: {
    borderRadius: 12,
  },
  typography: {
    fontFamily: `'Montserrat', 'Roboto', 'Arial', sans-serif`,
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          "&.inverted-header": {
            backgroundColor: "#2E3E50",
            color: "#F9FAFA",
            "& .MuiButton-text": {
              color: "#F9FAFA",
              fontWeight: 400,
              "&:hover": {
                fontWeight: 600,
              },
            },
            "& .MuiButton-contained": {
              backgroundColor: "rgba(249, 250, 250, 0.1)",
              color: "#F9FAFA",
              fontWeight: 600,
              "&:hover": {
                backgroundColor: "rgba(249, 250, 250, 0.15)",
              },
            },
          },
        },
      },
    },
  },
});
