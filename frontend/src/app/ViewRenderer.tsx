import { useNavigationStore } from "@/store/navigationStore";
import { HomeView } from "@/features/home/HomeView";
import { ExerciseView } from "@/features/exercises/ExerciseView";
import { ResultsView } from "@/features/results/ResultsView";
import { DashboardView } from "@/features/dashboard/DashboardView";
import { HistoryView } from "@/features/history/HistoryView";
import { WelcomeView } from "@/features/welcome/WelcomeView";
import { UserProfileView } from "@/features/user/UserProfileView";
import { ProfileView } from "@/features/profile/ProfileView";
export const ViewRenderer = () => {
  const { currentView } = useNavigationStore();

  switch (currentView) {
    case "home":
      return <HomeView />;
    case "exercises":
      return <ExerciseView />;
    case "results":
      return <ResultsView />;
    case "dashboard":
      return <DashboardView />;
    case "history":
      return <HistoryView />;
    case "welcome":
      return <WelcomeView />;
    case "profile":
      return <ProfileView />;
    default:
      return <WelcomeView />;
  }
};
