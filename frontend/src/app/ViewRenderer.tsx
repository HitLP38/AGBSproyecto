import { useNavigationStore } from "@/store/navigationStore";
import { HomeView } from "@/features/home/HomeView";
import { ExercisesView } from "@/features/exercises/ExercisesView";
import { ResultsView } from "@/features/results/ResultsView";
import { DashboardView } from "@/features/dashboard/DashboardView";
import { HistoryView } from "@/features/history/HistoryView";
import { WelcomeView } from "@/features/welcome/WelcomeView";

export const ViewRenderer = () => {
  const { currentView } = useNavigationStore();

  switch (currentView) {
    case "home":
      return <HomeView />;
    case "exercises":
      return <ExercisesView />;
    case "results":
      return <ResultsView />;
    case "dashboard":
      return <DashboardView />;
    case "history":
      return <HistoryView />;
    case "welcome":
    default:
      return <WelcomeView />;
  }
};
