// ✅ src/shared/components/ExerciseCard.tsx
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
            height="200"
            image={image}
            alt={name}
            sx={{ objectFit: "contain" }}
          />
          <CardContent sx={{ textAlign: "center" }}>
            <Typography fontWeight={600}>{name}</Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </motion.div>
  );
};
