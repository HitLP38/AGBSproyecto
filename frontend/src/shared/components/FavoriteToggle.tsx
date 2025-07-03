import { IconButton, Tooltip } from "@mui/material";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { useFavoriteStore } from "@/store/useFavoriteStore";

interface Props {
  exerciseId: string;
}

export const FavoriteToggle = ({ exerciseId }: Props) => {
  const { toggleFavorite, isFavorite } = useFavoriteStore();

  return (
    <Tooltip
      title={
        isFavorite(exerciseId) ? "Quitar de favoritos" : "Añadir a favoritos"
      }
    >
      <IconButton onClick={() => toggleFavorite(exerciseId)} color="error">
        {isFavorite(exerciseId) ? <Favorite /> : <FavoriteBorder />}
      </IconButton>
    </Tooltip>
  );
};
