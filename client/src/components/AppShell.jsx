import { Link, Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import LoadingSpinner from "./LoadingSpinner";

export function AppShell() {
  return (
    <div className="h-dvh min-h-0 bg-[#020109] flex justify-center items-stretch md:items-center md:p-3 overflow-hidden">
      <div className="phone-shell">
        <div className="phone-shell-inner relative flex flex-col min-h-0">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export function ProtectedRoute() {
  const { user, loading } = useAuth();
  if (loading) return <LoadingSpinner label="Restoring session" />;
  if (!user) return <Navigate to="/login" replace />;
  return <Outlet />;
}

export function GuestRoute() {
  const { user, preference, loading } = useAuth();
  if (loading) return <LoadingSpinner />;
  if (user && preference?.onboardingComplete) return <Navigate to="/news" replace />;
  if (user) return <Navigate to="/onboarding/profession" replace />;
  return <Outlet />;
}

export function BrandMark() {
  return (
    <Link to="/" className="text-center">
      <p className="text-2xl font-semibold tracking-tight">Nuzio AI</p>
    </Link>
  );
}
