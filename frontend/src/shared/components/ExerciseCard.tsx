import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  Box,
} from "@mui/material";
import { motion } from "framer-motion";
import { useExerciseStore } from "@/store/useExerciseStore";
import { FavoriteToggle } from "./FavoriteToggle";

interface Props {
  id: string;
  name: string;
  image: string;
}

export const ExerciseCard = ({ id, name, image }: Props) => {
  const { selected, toggleSelect } = useExerciseStore();
  const isSelected = selected.includes(id);

  return (
    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
      <Card
        variant="outlined"
        sx={{
          position: "relative",
          backgroundColor: isSelected ? "secondary.main" : "background.paper",
          borderColor: isSelected ? "primary.main" : "grey.300",
          transition: "0.3s",
        }}
      >
        <CardActionArea onClick={() => toggleSelect(id)}>
          <CardMedia
            component="img"
            height="140"
            image={image}
            alt={name}
            sx={{ objectFit: "cover" }}
          />

          <CardContent sx={{ textAlign: "center" }}>
            <Typography fontWeight={600}>{name}</Typography>
          </CardContent>
        </CardActionArea>

        {/* ❤️ Botón de favorito externo y reutilizable */}
        <Box sx={{ position: "absolute", top: 4, right: 4 }}>
          <FavoriteToggle exerciseId={id} />
        </Box>
      </Card>
    </motion.div>
  );
};
