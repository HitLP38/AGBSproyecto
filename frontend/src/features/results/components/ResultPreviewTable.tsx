import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { PreviewItem } from "@/store/resultPreviewStore";

interface Props {
  data: PreviewItem[];
}

export const ResultPreviewTable = ({ data }: Props) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Box sx={{ width: "100%" }}>
      <Typography 
        variant="h5" 
        gutterBottom 
        fontWeight={600}
        sx={{
          color: "#2E3E50",
          mb: 3,
          textAlign: "center",
        }}
      >
        Previsualización de Resultados
      </Typography>

      <TableContainer 
        component={Paper} 
        elevation={0}
        sx={{ 
          borderRadius: 3,
          border: "1px solid #E9EEED",
          backgroundColor: "#F9FAFA",
          overflow: "hidden",
          width: "100%",
          minWidth: isMobile ? "100%" : 600,
        }}
      >
        <Table 
          size={isMobile ? "small" : "medium"}
          sx={{
            width: "100%",
          }}
        >
          <TableHead>
            <TableRow sx={{ backgroundColor: "#2E3E50" }}>
              <TableCell 
                sx={{
                  color: "#FFFFFF",
                  fontWeight: 600,
                  fontSize: isMobile ? "0.875rem" : "1rem",
                  borderBottom: "2px solid #1F2937",
                  textAlign: "left",
                  py: 2,
                }}
              >
                Ejercicio
              </TableCell>
              <TableCell 
                sx={{
                  color: "#FFFFFF",
                  fontWeight: 600,
                  fontSize: isMobile ? "0.875rem" : "1rem",
                  borderBottom: "2px solid #1F2937",
                  textAlign: "center",
                  py: 2,
                }}
              >
                Valor
              </TableCell>
              <TableCell 
                sx={{
                  color: "#FFFFFF",
                  fontWeight: 600,
                  fontSize: isMobile ? "0.875rem" : "1rem",
                  borderBottom: "2px solid #1F2937",
                  textAlign: "center",
                  py: 2,
                }}
              >
                Puntaje
              </TableCell>
              <TableCell 
                sx={{
                  color: "#FFFFFF",
                  fontWeight: 600,
                  fontSize: isMobile ? "0.875rem" : "1rem",
                  borderBottom: "2px solid #1F2937",
                  textAlign: "center",
                  py: 2,
                }}
              >
                Puntaje Máximo
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item, index) => (
              <TableRow 
                key={item.exercise_id}
                sx={{
                  backgroundColor: index % 2 === 0 ? "#FFFFFF" : "#F9FAFA",
                  "&:hover": {
                    backgroundColor: "#E9EEED",
                    transition: "background-color 0.2s ease",
                  },
                }}
              >
                <TableCell 
                  sx={{
                    color: "#2E3E50",
                    fontWeight: 500,
                    fontSize: isMobile ? "0.875rem" : "1rem",
                    borderBottom: "1px solid #E9EEED",
                    py: 2,
                    textAlign: "left",
                  }}
                >
                  {item.exercise_name}
                </TableCell>
                <TableCell 
                  sx={{
                    color: "#2E3E50",
                    fontWeight: 600,
                    fontSize: isMobile ? "0.875rem" : "1rem",
                    borderBottom: "1px solid #E9EEED",
                    py: 2,
                    textAlign: "center",
                  }}
                >
                  {item.value}
                </TableCell>
                <TableCell 
                  sx={{
                    color: "#2E3E50",
                    fontWeight: 600,
                    fontSize: isMobile ? "0.875rem" : "1rem",
                    borderBottom: "1px solid #E9EEED",
                    py: 2,
                    textAlign: "center",
                  }}
                >
                  {item.score}
                </TableCell>
                <TableCell 
                  sx={{
                    color: "#6B7280",
                    fontWeight: 500,
                    fontSize: isMobile ? "0.875rem" : "1rem",
                    borderBottom: "1px solid #E9EEED",
                    py: 2,
                    textAlign: "center",
                  }}
                >
                  {item.maxScore}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};
