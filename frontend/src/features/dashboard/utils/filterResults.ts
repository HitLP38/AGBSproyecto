import { ResultResponse } from "@/infra/api/resultsApi";

export function filterResults(
  results: ResultResponse[],
  filters: {
    dateRange: [Date | null, Date | null];
    selectedExercises: string[];
    onlyFavorites: boolean;
    favorites: string[];
  }
): ResultResponse[] {
  return results.filter((r) => {
    const date = new Date(r.timestamp);

    const inRange =
      (!filters.dateRange[0] || date >= filters.dateRange[0]) &&
      (!filters.dateRange[1] || date <= filters.dateRange[1]);

    const matchesExercise =
      filters.selectedExercises.length === 0 ||
      filters.selectedExercises.includes(r.exercise_id);

    const isFav =
      !filters.onlyFavorites || filters.favorites.includes(r.exercise_id);

    return inRange && matchesExercise && isFav;
  });
}
