// ✅ src/shared/components/FavoriteToggle.tsx
import { IconButton } from "@mui/material";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { useExerciseStore } from "@/store/useExerciseStore";

interface Props {
  exerciseId: string;
}

export const FavoriteToggle = ({ exerciseId }: Props) => {
  const { favorites, toggleFavorite } = useExerciseStore();
  const isFavorite = favorites.includes(exerciseId);

  return (
    <IconButton
      onClick={(e) => {
        e.stopPropagation();
        toggleFavorite(exerciseId);
      }}
      color={isFavorite ? "error" : "default"}
      aria-label={isFavorite ? "Quitar de favoritos" : "Agregar a favoritos"}
    >
      {isFavorite ? <Favorite /> : <FavoriteBorder />}
    </IconButton>
  );
};
