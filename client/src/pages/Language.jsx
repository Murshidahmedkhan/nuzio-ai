import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Logo from "../components/Logo";
import { useOnboarding } from "../context/OnboardingContext";

export default function Language() {
  const navigate = useNavigate();
  const { draft, update } = useOnboarding();

  const toggleLocation = () => {
    if (draft.locationEnabled) {
      update({ locationEnabled: false });
      return;
    }
    if (!navigator.geolocation) {
      update({ locationEnabled: true });
      return;
    }
    navigator.geolocation.getCurrentPosition(
      () => update({ locationEnabled: true }),
      () => update({ locationEnabled: true })
    );
  };

  return (
    <div className="flex-1 flex flex-col min-h-0 overflow-y-auto hide-scrollbar px-6 pt-12 pb-5">
      <div className="flex justify-center">
        <Logo />
      </div>

      <h1 className="mt-16 text-[40px] leading-[1.05] font-semibold tracking-tight">
        Choose your
        <br />
        <span className="serif-italic text-[#c4b5fd]">language</span>
      </h1>
      <p className="mt-3 text-[14px] text-white/40">Select the language for your daily brief.</p>

      <div className="mt-8 space-y-3">
        <LangCard
          code="GB"
          title="English"
          subtitle="Briefings delivered in English"
          selected={draft.language === "English"}
          onClick={() => update({ language: "English" })}
        />
        <LangCard
          code="IN"
          title="हिन्दी"
          subtitle="हिन्दी में समाचार सुनें"
          selected={draft.language === "हिन्दी"}
          onClick={() => update({ language: "हिन्दी" })}
        />
      </div>

      <div className="lang-card mt-3 rounded-[24px] pl-3.5 pr-3.5 py-3.5 flex items-center gap-2.5">
        <div className="h-10 w-10 rounded-[14px] bg-[#2b1744] grid place-items-center shrink-0">
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M12 22s7.5-6.4 7.5-12A7.5 7.5 0 1 0 4.5 10c0 5.6 7.5 12 7.5 12Z"
              fill="#f472b6"
            />
            <circle cx="12" cy="10" r="2.4" fill="#2b1744" />
          </svg>
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-[15px] leading-tight">Enable Location</p>
          <p className="text-[11px] text-white/40 mt-1 leading-snug">
            Get hyperlocal news tailored to your city.
          </p>
          <p className="mt-2 flex items-center gap-1.5 text-[10px] tracking-[0.18em] text-white/30">
            <span className="h-1.5 w-1.5 rounded-full bg-[#7dffb3] inline-block" />
            {draft.locationEnabled ? "ALLOWED" : "NOT ALLOWED"}
          </p>
        </div>
        <button
          type="button"
          aria-label="Toggle location"
          onClick={toggleLocation}
          className={`h-[28px] w-[48px] rounded-full p-[3px] shrink-0 transition ${
            draft.locationEnabled ? "bg-[#7dffb3]" : "bg-[#3a3644]"
          }`}
        >
          <span
            className={`block h-[22px] w-[22px] rounded-full bg-white shadow transition ${
              draft.locationEnabled ? "translate-x-5" : ""
            }`}
          />
        </button>
      </div>

      <div className="mt-auto pt-6 pb-2">
        <Button onClick={() => navigate("/login")}>Continue →</Button>
      </div>
    </div>
  );
}

function LangCard({ code, title, subtitle, selected, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full rounded-[24px] pl-5 pr-4 py-[18px] flex items-center gap-4 text-left ${
        selected ? "lang-selected" : "lang-card"
      }`}
    >
      <span className="w-7 text-[12px] font-semibold tracking-wide text-white/50">{code}</span>
      <span className="flex-1">
        <span className="block font-semibold text-[16px] leading-tight">{title}</span>
        <span className="block text-[12px] text-white/40 mt-1">{subtitle}</span>
      </span>
      <span
        className={`h-[22px] w-[22px] rounded-full grid place-items-center shrink-0 ${
          selected ? "bg-[#7c6cf0]" : "border-[1.5px] border-white/25"
        }`}
      >
        {selected ? <span className="h-[7px] w-[7px] rounded-full bg-white" /> : null}
      </span>
    </button>
  );
}
