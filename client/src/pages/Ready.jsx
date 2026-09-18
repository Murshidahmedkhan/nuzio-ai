import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import { BRIEF_LENGTHS, INTERESTS, NARRATORS, formatTimeLabel } from "../constants";
import { useAuth } from "../context/AuthContext";
import { useOnboarding } from "../context/OnboardingContext";
import { savePreferences } from "../services/preferences";

const iconProps = {
  width: 16,
  height: 16,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.7,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
};

function ProfessionIcon() {
  return (
    <svg {...iconProps}>
      <rect x="3.5" y="5" width="17" height="11.5" rx="1.8" />
      <path d="M8 20.5h8" />
      <path d="M12 16.5v4" />
    </svg>
  );
}

function NichesIcon() {
  return (
    <svg {...iconProps}>
      <circle cx="12" cy="12" r="8.5" />
      <circle cx="12" cy="12" r="4.5" />
      <circle cx="12" cy="12" r="1.2" fill="currentColor" stroke="none" />
    </svg>
  );
}

function VoiceIcon() {
  return (
    <svg {...iconProps}>
      <rect x="9" y="3.5" width="6" height="10" rx="3" />
      <path d="M6.5 11.5a5.5 5.5 0 0 0 11 0" />
      <path d="M12 17v3.5" />
    </svg>
  );
}

function LengthIcon() {
  return (
    <svg {...iconProps}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5v5l3.2 2" />
    </svg>
  );
}

function DeliveryIcon() {
  return (
    <svg {...iconProps}>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 3.2v1.8M12 19v1.8M3.2 12h1.8M19 12h1.8M5.6 5.6l1.3 1.3M17.1 17.1l1.3 1.3M18.4 5.6l-1.3 1.3M6.9 17.1l-1.3 1.3" />
    </svg>
  );
}

function CheckMark({ className = "text-[#5eead4]" }) {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
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

function voiceLine(narrator) {
  const name = narrator?.name || "Aria";
  const parts = (narrator?.description || "Warm · Unhurried · British").split("·").map((p) => p.trim());
  const accent = parts.find((p) => /british|american|indian/i.test(p)) || "British";
  const tone = parts.find((p) => /warm|crisp|bright/i.test(p)) || "warm";
  return `${name} — ${accent}, ${tone.toLowerCase()}`;
}

function nicheLabel(id) {
  const item = INTERESTS.find((entry) => entry.id === id);
  if (item?.short) return item.short.replace("AI & Tech", "AI");
  return id.replace("AI & Technology", "AI").replace("Financial Markets", "Markets");
}

export default function Ready() {
  const navigate = useNavigate();
  const { user, setPreference } = useAuth();
  const { draft } = useOnboarding();
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const firstName = user?.name?.split(" ")[0] || "Aarav";
  const narrator = NARRATORS.find((item) => item.id === draft.narrator);
  const length = BRIEF_LENGTHS.find((item) => item.id === draft.briefLength) || BRIEF_LENGTHS[0];
  const interests = draft.interests?.length
    ? draft.interests
    : ["AI & Technology", "Financial Markets", "Startups", "Indian Business"];
  const niches = interests.slice(0, 3).map(nicheLabel);
  const extra = interests.length - 3;
  const stories = length.stories;
  const minutes = Math.max(length.minutes, Math.round(stories * 3.6));
  const briefTime = formatTimeLabel(draft.briefingTime || "07:00");

  const start = async () => {
    setSaving(true);
    setError("");
    try {
      const { data } = await savePreferences({
        ...draft,
        language: draft.language || "English",
        onboardingComplete: true,
      });
      setPreference(data);
      navigate("/news");
    } catch (err) {
      setError(err.response?.data?.message || "Could not save preferences");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col min-h-0 pb-5">
      <div className="px-5 pt-4 flex-1 flex flex-col min-h-0">
      <p className="flex items-center gap-1.5 text-[11px] tracking-[0.22em] text-[#4ade80] font-semibold">
        <CheckMark className="text-[#4ade80]" /> ALL SET
      </p>

      <div className="mt-8 flex justify-center">
        <div className="ready-check-ring h-[108px] w-[108px] rounded-full p-[4px]">
          <div className="h-full w-full rounded-full bg-[#07060c] grid place-items-center">
            <svg width="42" height="42" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M5.5 12.4 10.1 17 18.5 7.5"
                stroke="#5eead4"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      </div>

      <h1 className="mt-7 text-center text-[34px] font-semibold leading-[1.12] tracking-[-0.03em] text-white">
        You're ready,
        <br />
        <span className="serif-italic text-[#4ade80]">{firstName}.</span>
      </h1>
      <p className="mt-3 text-center text-[13.5px] text-white/38 leading-relaxed px-1">
        Your first brief will be ready tomorrow at {briefTime}.
        <br />
        We're already curating.
      </p>

      <p className="mt-7 text-[10px] tracking-[0.2em] text-[#8b7cff] font-semibold">YOUR BRIEF PROFILE</p>
      <div className="mt-3 space-y-[8px] flex-1 overflow-y-auto hide-scrollbar">
        <Row icon={<ProfessionIcon />} label="PROFESSION" value={draft.profession || "Technology"} />
        <Row
          icon={<NichesIcon />}
          label="NICHES"
          value={`${niches.join(", ")}${extra > 0 ? ` +${extra}` : ""}`}
        />
        <Row icon={<VoiceIcon />} label="VOICE" value={voiceLine(narrator)} />
        <Row icon={<LengthIcon />} label="LENGTH" value={`${stories} stories · ~${minutes} min`} />
        <Row icon={<DeliveryIcon />} label="DELIVERY" value={`Daily at ${briefTime}`} />
      </div>
      {error ? <p className="mt-3 text-sm text-rose-300">{error}</p> : null}
      <div className="mt-auto pt-4 pb-1">
        <Button variant="ready" disabled={saving} onClick={start}>
          {saving ? "Saving..." : "Start listening →"}
        </Button>
      </div>
      </div>
    </div>
  );
}

function Row({ icon, label, value }) {
  return (
    <div className="ready-row rounded-[20px] pl-[12px] pr-4 h-[58px] flex items-center gap-3">
      <span className="h-[36px] w-[36px] rounded-full bg-white/[0.04] border border-white/[0.06] grid place-items-center text-[#c9c4d8] shrink-0">
        {icon}
      </span>
      <div className="flex-1 min-w-0">
        <p className="text-[9px] tracking-[0.18em] text-white/32 font-medium leading-none">{label}</p>
        <p className="mt-[5px] text-[14px] font-medium text-white/92 leading-none truncate">{value}</p>
      </div>
      <CheckMark className="text-[#5eead4] shrink-0" />
    </div>
  );
}
