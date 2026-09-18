import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import OnboardingHeader, { ScreenTitle } from "../components/OnboardingHeader";
import { PROFESSIONS } from "../constants";
import { useAuth } from "../context/AuthContext";
import { useOnboarding } from "../context/OnboardingContext";

const iconClass = "shrink-0 text-[#c5c0d4]";

function ProfessionIcon({ id }) {
  const props = {
    width: 16,
    height: 16,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.85,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    className: iconClass,
    "aria-hidden": true,
  };

  switch (id) {
    case "Finance & Trading":
      return (
        <svg {...props}>
          <path d="M4 19h16" />
          <path d="M5 14l4-4 3 2.5 7-8" />
          <path d="M15 4.5h4v4" />
        </svg>
      );
    case "Legal":
      return (
        <svg {...props}>
          <path d="M12 3.5v13" />
          <path d="M8 21h8" />
          <path d="M12 6.5H6.2L8.4 11a2.6 2.6 0 1 1-5.2 0" />
          <path d="M12 6.5h5.8L15.6 11a2.6 2.6 0 1 0 5.2 0" />
        </svg>
      );
    case "Technology":
      return (
        <svg {...props}>
          <rect x="3.5" y="5" width="17" height="11.5" rx="1.8" />
          <path d="M8 20.5h8" />
          <path d="M12 16.5v4" />
        </svg>
      );
    case "Healthcare":
      return (
        <svg {...props}>
          <path d="M7 4.5v6.2a3.6 3.6 0 0 0 7.2 0V8" />
          <path d="M14.2 8.2a3.4 3.4 0 1 1 3.3 5.3" />
          <circle cx="17.6" cy="17.4" r="2.3" />
        </svg>
      );
    case "Consulting":
      return (
        <svg {...props}>
          <rect x="4" y="8" width="16" height="12" rx="2" />
          <path d="M9 8V6.8a3 3 0 0 1 6 0V8" />
          <path d="M4 13h16" />
        </svg>
      );
    case "Marketing & Media":
      return (
        <svg {...props}>
          <path d="M4 9.5v5h3.5L14 19V5L7.5 9.5H4Z" />
          <path d="M17 9a3.4 3.4 0 0 1 0 6" />
        </svg>
      );
    case "Government & Policy":
      return (
        <svg {...props}>
          <path d="M4 9.5h16" />
          <path d="M12 4 3.8 9.5h16.4L12 4Z" />
          <path d="M6 9.5v8.5M10 9.5v8.5M14 9.5v8.5M18 9.5v8.5" />
          <path d="M4 18h16" />
          <path d="M3 21h18" />
        </svg>
      );
    case "Real Estate":
      return (
        <svg {...props}>
          <path d="M4 20V9.5l8-5.5 8 5.5V20" />
          <path d="M10 20v-5.5h4V20" />
          <path d="M8 12h2M14 12h2M8 15.5h2" />
        </svg>
      );
    case "Education":
      return (
        <svg {...props}>
          <path d="M3 10.5 12 6l9 4.5-9 4.5L3 10.5Z" />
          <path d="M7 13v4c2.4 1.6 7.6 1.6 10 0v-4" />
          <path d="M21 10.5v6" />
        </svg>
      );
    case "Founder / Builder":
      return (
        <svg {...props}>
          <path d="M12 3.2c2.8 2.8 3.8 6.6 3 10.2L12 16.5 9 13.4c-.8-3.6.2-7.4 3-10.2Z" />
          <path d="M9.2 14.2 6 20.2l5.2-1.7" />
          <path d="M14.8 14.2 18 20.2l-5.2-1.7" />
          <circle cx="12" cy="9.2" r="1.3" />
        </svg>
      );
    default:
      return null;
  }
}

function CheckMark() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M5 12.5 10 17.5 19 7"
        stroke="currentColor"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function Profession() {
  const navigate = useNavigate();
  const { preference } = useAuth();
  const { draft, update, hydrate } = useOnboarding();

  useEffect(() => {
    hydrate(preference);
  }, [preference, hydrate]);

  return (
    <div className="flex-1 flex flex-col min-h-0 pb-5">
      <OnboardingHeader step={1} />
      <ScreenTitle
        lead="What's your"
        accent="profession?"
        subtitle="We'll tune every brief to what actually moves your day."
      />
      <div className="mt-7 px-5 flex flex-wrap gap-x-2.5 gap-y-3 flex-1 overflow-y-auto hide-scrollbar content-start">
        {PROFESSIONS.map((profession) => {
          const selected = draft.profession === profession.id;
          return (
            <button
              key={profession.id}
              type="button"
              onClick={() => update({ profession: profession.id })}
              className={`inline-flex items-center gap-2 rounded-full h-11 px-[15px] text-[13.5px] font-medium tracking-[-0.01em] ${
                selected ? "profession-chip-selected text-white" : "profession-chip text-white/82"
              }`}
            >
              <ProfessionIcon id={profession.id} />
              {profession.id}
              {selected ? <CheckMark /> : null}
            </button>
          );
        })}
      </div>
      <div className="px-5 pt-5 pb-1">
        <Button disabled={!draft.profession} onClick={() => navigate("/onboarding/interests")}>
          Continue →
        </Button>
      </div>
    </div>
  );
}
