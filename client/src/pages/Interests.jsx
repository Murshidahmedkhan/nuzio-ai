import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import OnboardingHeader, { ScreenTitle } from "../components/OnboardingHeader";
import { INTERESTS } from "../constants";
import { useOnboarding } from "../context/OnboardingContext";

function InterestIcon({ id }) {
  const props = {
    width: 16,
    height: 16,
    viewBox: "0 0 24 24",
    fill: "none",
    "aria-hidden": true,
    className: "shrink-0",
  };

  switch (id) {
    case "AI & Technology":
      return (
        <svg {...props}>
          <path
            d="M12 3.2 13.2 8.4 18.5 9.5 13.2 10.6 12 15.8 10.8 10.6 5.5 9.5 10.8 8.4Z"
            fill="#c4b5fd"
          />
          <path d="M18.2 14.2 18.8 16.6 21.2 17.2 18.8 17.8 18.2 20.2 17.6 17.8 15.2 17.2 17.6 16.6Z" fill="#a78bfa" />
          <path d="M6.2 14.6 6.7 16.4 8.5 16.9 6.7 17.4 6.2 19.2 5.7 17.4 3.9 16.9 5.7 16.4Z" fill="#8b7cff" />
        </svg>
      );
    case "Financial Markets":
      return (
        <svg {...props} stroke="#7ee0a8" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 18.5V12.2" />
          <path d="M9 18.5V8.5" />
          <path d="M14 18.5v-6.8" />
          <path d="M19 18.5V5.8" />
        </svg>
      );
    case "Indian Business":
      return (
        <svg {...props} viewBox="0 0 24 16">
          <rect width="24" height="16" rx="2.2" fill="#fff" />
          <rect width="24" height="5.3" fill="#FF9933" />
          <rect y="10.7" width="24" height="5.3" fill="#138808" />
          <circle cx="12" cy="8" r="2.15" fill="none" stroke="#000080" strokeWidth="0.9" />
        </svg>
      );
    case "Global Politics":
      return (
        <svg {...props} stroke="#6ec8ff" strokeWidth="1.7" strokeLinecap="round">
          <circle cx="12" cy="12" r="8.2" />
          <path d="M4 12h16" />
          <path d="M12 3.8c2.4 2.4 3.6 5.2 3.6 8.2s-1.2 5.8-3.6 8.2c-2.4-2.4-3.6-5.2-3.6-8.2s1.2-5.8 3.6-8.2Z" />
        </svg>
      );
    case "Startups":
      return (
        <svg {...props} stroke="#c4b5fd" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14.6 3.4 20.6 9.4c-3.2.4-6.2-.8-8.4-3S3.8 2.2 3.4 9.4L9.4 3.4" />
          <path d="M9.8 9.8 5.2 20.2l6-2.4" />
          <path d="M14.2 9.8 18.8 20.2l-6-2.4" />
        </svg>
      );
    case "Science":
      return (
        <svg {...props} stroke="#9ad4ff" strokeWidth="1.7">
          <ellipse cx="12" cy="12" rx="8" ry="3.2" />
          <ellipse cx="12" cy="12" rx="8" ry="3.2" transform="rotate(60 12 12)" />
          <ellipse cx="12" cy="12" rx="8" ry="3.2" transform="rotate(120 12 12)" />
          <circle cx="12" cy="12" r="1.5" fill="#9ad4ff" />
        </svg>
      );
    case "Geopolitics":
      return (
        <svg {...props} stroke="#7ec8ff" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 6.2h10.5a1.4 1.4 0 0 1 1.4 1.4V19H6.4A1.4 1.4 0 0 1 5 17.6V6.2Z" />
          <path d="M8.2 6.2V4.8A1.6 1.6 0 0 1 9.8 3.2h8.4A1.6 1.6 0 0 1 19.8 4.8V16.5H16.9" />
        </svg>
      );
    case "Health & Medicine":
      return (
        <svg {...props}>
          <rect x="3.2" y="9.4" width="9.2" height="5.4" rx="2.7" fill="#f2a3b8" />
          <rect x="11.6" y="9.4" width="9.2" height="5.4" rx="2.7" fill="#8fd4c4" />
        </svg>
      );
    case "Climate & Energy":
      return (
        <svg {...props} stroke="#7ee0a8" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 20.2v-7.4" />
          <path d="M12 12.8c-3.2-1.2-4.8-3.8-5.2-7.2 2.8.4 5 2 6.2 4.4 1.4-2.6 3.8-4.2 6.8-4.6-.6 3.6-2.4 6.2-5.6 7.4" />
        </svg>
      );
    case "Sports":
      return (
        <svg {...props} stroke="#f0c36a" strokeWidth="1.7" strokeLinejoin="round" fill="none">
          <circle cx="12" cy="8.6" r="3.6" />
          <path d="M8.8 11.8 7.2 20l4.8-2.6L16.8 20l-1.6-8.2" />
        </svg>
      );
    case "Culture & Arts":
      return (
        <svg {...props} stroke="#e8b4c8" strokeWidth="1.6" fill="none">
          <path d="M4.6 8.2c0-2.2 1.6-4 4-4 .6 2.2.6 4.4 0 6.6-2.4 0-4-1.8-4-2.6Z" />
          <path d="M19.4 8.2c0-2.2-1.6-4-4-4-.6 2.2-.6 4.4 0 6.6 2.4 0 4-1.8 4-2.6Z" />
          <path d="M8.8 14.6c1 .8 2.1 1.2 3.2 1.2s2.2-.4 3.2-1.2" strokeLinecap="round" />
        </svg>
      );
    case "Legal & Policy":
      return (
        <svg {...props} stroke="#c5c0d4" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 4.2v12.2" />
          <path d="M8.2 20.2h7.6" />
          <path d="M12 6.4H6.4L8.4 10.6a2.4 2.4 0 1 1-4.8 0" />
          <path d="M12 6.4h5.6l-2 4.2a2.4 2.4 0 1 0 4.8 0" />
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

export default function Interests() {
  const navigate = useNavigate();
  const { draft, update } = useOnboarding();

  const toggle = (interest) => {
    const exists = draft.interests.includes(interest);
    if (!exists && draft.interests.length >= 7) return;
    update({
      interests: exists
        ? draft.interests.filter((item) => item !== interest)
        : [...draft.interests, interest],
    });
  };

  return (
    <div className="flex-1 flex flex-col min-h-0 pb-5">
      <OnboardingHeader step={2} />
      <ScreenTitle lead="What moves" accent="your world?" />
      <div className="px-5 mt-2.5 flex items-center gap-2.5">
        <p className="text-[13.5px] text-white/38 leading-snug">Pick up to 7 niches.</p>
        <span className="rounded-full bg-[#163024] text-[#6ef0a8] text-[11px] font-semibold px-2.5 py-[3px]">
          {draft.interests.length}/7
        </span>
      </div>
      <div className="mt-7 px-5 flex flex-wrap gap-x-2 gap-y-2.5 flex-1 overflow-y-auto hide-scrollbar content-start">
        {INTERESTS.map((interest) => {
          const selected = draft.interests.includes(interest.id);
          return (
            <button
              key={interest.id}
              type="button"
              onClick={() => toggle(interest.id)}
              className={`inline-flex items-center gap-1.5 rounded-full h-[42px] px-3.5 text-[13px] font-medium tracking-[-0.01em] ${
                selected ? "profession-chip-selected text-white" : "profession-chip text-white/82"
              }`}
            >
              <InterestIcon id={interest.id} />
              {interest.id}
              {selected ? <CheckMark /> : null}
            </button>
          );
        })}
      </div>
      <div className="px-5 pt-5 pb-1">
        <Button disabled={draft.interests.length === 0} onClick={() => navigate("/onboarding/narrator")}>
          Continue →
        </Button>
      </div>
    </div>
  );
}
