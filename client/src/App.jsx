import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AppShell, GuestRoute, ProtectedRoute } from "./components/AppShell";
import { AuthProvider } from "./context/AuthContext";
import { OnboardingProvider } from "./context/OnboardingContext";
import { PlayerProvider } from "./context/PlayerContext";
import Billing from "./pages/Billing";
import BriefingTime from "./pages/BriefingTime";
import Discover from "./pages/Discover";
import Interests from "./pages/Interests";
import Language from "./pages/Language";
import Login from "./pages/Login";
import Narrator from "./pages/Narrator";
import NewsFeed from "./pages/NewsFeed";
import Notifications from "./pages/Notifications";
import Profession from "./pages/Profession";
import Ready from "./pages/Ready";
import Settings from "./pages/Settings";
import Splash from "./pages/Splash";

export default function App() {
  return (
    <AuthProvider>
      <OnboardingProvider>
        <PlayerProvider>
          <BrowserRouter>
            <Routes>
              <Route element={<AppShell />}>
                <Route path="/" element={<Splash />} />
                <Route path="/onboarding/language" element={<Language />} />
                <Route element={<GuestRoute />}>
                  <Route path="/login" element={<Login />} />
                </Route>
                <Route element={<ProtectedRoute />}>
                  <Route path="/onboarding/profession" element={<Profession />} />
                  <Route path="/onboarding/interests" element={<Interests />} />
                  <Route path="/onboarding/narrator" element={<Narrator />} />
                  <Route path="/onboarding/time" element={<BriefingTime />} />
                  <Route path="/onboarding/notifications" element={<Notifications />} />
                  <Route path="/onboarding/ready" element={<Ready />} />
                  <Route path="/news" element={<NewsFeed />} />
                  <Route path="/news/:id" element={<NewsFeed />} />
                  <Route path="/discover" element={<Discover />} />
                  <Route path="/settings" element={<Settings />} />
                  <Route path="/settings/billing" element={<Billing />} />
                </Route>
                <Route path="*" element={<Navigate to="/" replace />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </PlayerProvider>
      </OnboardingProvider>
    </AuthProvider>
  );
}
