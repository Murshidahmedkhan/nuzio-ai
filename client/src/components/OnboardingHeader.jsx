import { useNavigate } from "react-router-dom";
import Logo from "./Logo";

export default function OnboardingHeader({ step, total = 6, onSkip }) {
  const navigate = useNavigate();
  return (
    <div className="px-5 pt-2">
      <div className="flex items-center justify-between">
        <Logo compact />
        <button
          type="button"
          onClick={onSkip || (() => navigate("/onboarding/ready"))}
          className="text-[11px] tracking-[0.22em] text-white/40 font-semibold"
        >
          SKIP →
        </button>
      </div>
      <div className="mt-[18px] flex gap-[6px]">
        {Array.from({ length: total }).map((_, index) => (
          <span key={index} className="h-[3px] flex-1 rounded-full bg-white/[0.08] overflow-hidden">
            <span
              className={`block h-full rounded-full ${index < step ? "progress-fill w-full" : "w-0"}`}
            />
          </span>
        ))}
      </div>
      <p className="mt-4 text-[10px] tracking-[0.18em] text-[#2000c7] font-medium">
        STEP {step} OF {total}
      </p>
    </div>
  );
}

export function ScreenTitle({ lead, accent, after, subtitle }) {
  return (
    <div className="px-5 mt-3">
      <h1 className="text-[36px] leading-[1.08] font-semibold tracking-[-0.03em] text-[#f3f0ff]">
        {lead}
        {accent ? (
          <>
            <br />
            <span className="serif-italic text-[#9d8cff]">{accent}</span>
          </>
        ) : null}
        {after ? ` ${after}` : ""}
      </h1>
      {subtitle ? (
        <p className="mt-2.5 text-[13.5px] text-white/38 leading-snug pr-1">{subtitle}</p>
      ) : null}
    </div>
  );
}
