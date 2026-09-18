import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import OnboardingHeader, { ScreenTitle } from "../components/OnboardingHeader";
import { BRIEF_LENGTHS, NARRATORS } from "../constants";
import { useOnboarding } from "../context/OnboardingContext";

const AVATARS = {
  Aria: "bg-[#4a3a8a] text-[#c4b5fd]",
  Kai: "bg-[#1e4a4e] text-[#7ee8e0]",
  Meera: "bg-[#1d3d6a] text-[#7ec8ff]",
};

const LANG_BADGE = {
  EN: "bg-[#3d2f78] text-[#c4b5fd]",
  HI: "bg-[#163a3c] text-[#6ee7d8]",
};

function PlayIcon() {
  return (
    <svg width="11" height="12" viewBox="0 0 11 12" fill="currentColor" aria-hidden="true">
      <path d="M1.2 0.7c0-.7.8-1.1 1.4-.7l7.6 4.6c.6.4.6 1.2 0 1.6L2.6 11.8c-.6.4-1.4 0-1.4-.7V.7Z" />
    </svg>
  );
}

function PauseIcon() {
  return (
    <svg width="10" height="12" viewBox="0 0 10 12" fill="currentColor" aria-hidden="true">
      <rect x="0.6" y="0.8" width="2.8" height="10.4" rx="0.8" />
      <rect x="6.6" y="0.8" width="2.8" height="10.4" rx="0.8" />
    </svg>
  );
}

function CheckMark() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="10" fill="#2a3d36" />
      <path
        d="M7.5 12.4 10.4 15.3 16.5 8.8"
        stroke="#7dffb3"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function Narrator() {
  const navigate = useNavigate();
  const { draft, update } = useOnboarding();
  const audioRef = useRef(null);
  const [playingId, setPlayingId] = useState("");
  const selected = NARRATORS.find((n) => n.id === draft.narrator) || NARRATORS[0];
  const length = BRIEF_LENGTHS.find((item) => item.id === draft.briefLength) || BRIEF_LENGTHS[0];

  const preview = (narrator) => {
    if (!audioRef.current) return;
    if (playingId === narrator.id) {
      audioRef.current.pause();
      setPlayingId("");
      return;
    }
    audioRef.current.src = narrator.preview;
    audioRef.current.play().then(() => setPlayingId(narrator.id)).catch(() => setPlayingId(""));
  };

  return (
    <div className="flex-1 flex flex-col min-h-0 pb-5">
      <audio ref={audioRef} />
      <OnboardingHeader step={3} />
      <ScreenTitle
        lead="Pick a"
        accent="narrator voice."
        subtitle={
          <span className="inline-flex items-center gap-1.5">
            Tap
            <span className="inline-flex h-4 w-4 items-center justify-center text-white/50">
              <PlayIcon />
            </span>
            to hear a 10-second sample.
          </span>
        }
      />

      <div className="mt-5 px-5 space-y-2.5 flex-1 overflow-y-auto hide-scrollbar">
        {NARRATORS.map((narrator) => {
          const isSelected = draft.narrator === narrator.id;
          const isPlaying = playingId === narrator.id;
          return (
            <div
              key={narrator.id}
              role="button"
              tabIndex={0}
              onClick={() => update({ narrator: narrator.id })}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  update({ narrator: narrator.id });
                }
              }}
              className={`w-full rounded-[22px] pl-3.5 pr-3 py-3 flex items-center gap-3 text-left cursor-pointer ${
                isSelected ? "narrator-card-selected" : "narrator-card"
              }`}
            >
              <div
                className={`h-11.5 w-11.5 rounded-full grid place-items-center text-[17px] font-semibold shrink-0 ${AVATARS[narrator.name]}`}
              >
                {narrator.name[0]}
              </div>
              <div className="flex-1 min-w-0">
                <p className="flex items-center gap-1.5 font-semibold text-[15px] leading-none tracking-[-0.02em]">
                  {narrator.name}
                  <span
                    className={`text-[8px] tracking-[0.12em] font-semibold px-1.5 py-0.5 rounded-[5px] ${LANG_BADGE[narrator.lang]}`}
                  >
                    {narrator.lang}
                  </span>
                </p>
                <p className="text-[11.5px] text-white/42 mt-1.5 leading-none">
                  {narrator.description} · {narrator.gender}
                </p>
                <p className="text-[11px] text-white/28 mt-1.25 leading-none">{narrator.language}</p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                {isSelected ? <CheckMark /> : null}
                <button
                  type="button"
                  aria-label={`Play ${narrator.name} sample`}
                  onClick={(event) => {
                    event.stopPropagation();
                    preview(narrator);
                  }}
                  className={`narrator-play ${
                    isSelected
                      ? "narrator-play-selected"
                      : "border border-white/12 text-white/45 bg-white/3"
                  }`}
                >
                  {isPlaying ? <PauseIcon /> : <PlayIcon />}
                </button>
              </div>
            </div>
          );
        })}

        <div className="pt-6 pb-2">
          <p className="text-[10px] tracking-[0.2em] text-[#5eead4] font-medium">BRIEF LENGTH</p>
          <h2 className="mt-2 text-[32px] font-semibold leading-[1.08] tracking-[-0.03em] text-[#f3f0ff]">
            How long is
            <br />
            <span className="serif-italic text-[#9d8cff]">your morning?</span>
          </h2>
          <p className="mt-2 text-[13.5px] text-white/38">Set your ideal brief length.</p>
          <div className="mt-4 grid grid-cols-4 gap-2">
            {BRIEF_LENGTHS.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => update({ briefLength: item.id })}
                className={`h-[42px] rounded-[12px] text-[13px] font-medium transition-all duration-200 ${
                  draft.briefLength === item.id ? "brief-chip-selected" : "brief-chip"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="px-5 pt-4 pb-1">
        <Button onClick={() => navigate("/onboarding/time")}>
          Continue with {selected.name} · {length.stories} stories →
        </Button>
      </div>
    </div>
  );
}
