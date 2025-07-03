// src/shared/components/FavoritesButton.tsx
import { IconButton, Tooltip } from "@mui/material";
import { Favorite } from "@mui/icons-material";
import { useViewSettingsStore } from "@/store/useViewSettingsStore";

export const FavoritesButton = () => {
  const { toggleFavoritesView, showOnlyFavorites } = useViewSettingsStore();

  return (
    <Tooltip
      title={showOnlyFavorites ? "Ver todos los ejercicios" : "Solo favoritos"}
    >
      <IconButton onClick={toggleFavoritesView} color="primary">
        <Favorite
          sx={{ color: showOnlyFavorites ? "error.main" : "inherit" }}
        />
      </IconButton>
    </Tooltip>
  );
};
