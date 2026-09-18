import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../components/Logo";
import { useAuth } from "../context/AuthContext";

export default function Splash() {
  const navigate = useNavigate();
  const { user, preference, loading } = useAuth();

  useEffect(() => {
    if (loading) return;
    const timer = setTimeout(() => {
      if (user && preference?.onboardingComplete) navigate("/news", { replace: true });
      else if (user) navigate("/onboarding/profession", { replace: true });
      else navigate("/onboarding/language", { replace: true });
    }, 1800);
    return () => clearTimeout(timer);
  }, [loading, user, preference, navigate]);

  return (
    <div className="relative flex-1 flex flex-col items-center justify-center px-8 text-center overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_38%,rgba(92,48,180,0.42),transparent_58%)]" />
      <div className="relative z-10 flex flex-col items-center">
        <Logo />
        <p className="serif-italic mt-[72px] text-[42px] leading-none text-white">News on go</p>
        <p className="mt-4 text-[11px] tracking-[0.32em] text-white/35 font-medium">
          YOUR AUDIO BRIEF, EVERY MORNING
        </p>
        <p className="mt-[120px] text-[11px] tracking-[0.22em] text-[#7dffb3]/85 font-medium">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#7dffb3] mr-2.5 align-middle" />
          CURATING YOUR BRIEF_
        </p>
      </div>
    </div>
  );
}
