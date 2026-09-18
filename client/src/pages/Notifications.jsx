import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import OnboardingHeader, { ScreenTitle } from "../components/OnboardingHeader";
import { BRIEF_LENGTHS, INTERESTS, NARRATORS, formatTimeLabel } from "../constants";
import { useOnboarding } from "../context/OnboardingContext";

export default function Notifications() {
  const navigate = useNavigate();
  const { draft, update } = useOnboarding();
  const narrator = NARRATORS.find((item) => item.id === draft.narrator);
  const length = BRIEF_LENGTHS.find((item) => item.id === draft.briefLength);
  const niches =
    (draft.interests?.length
      ? draft.interests
      : ["AI & Technology", "Financial Markets", "Startups"]
    )
      .slice(0, 3)
      .map((id) => INTERESTS.find((item) => item.id === id)?.short || id)
      .join(", ");
  const stories = length?.stories || 6;
  const voice = narrator?.name || "Aria";
  const briefTime = draft.briefingTime || "07:00";
  const [hh, mm] = String(briefTime).split(":");

  const allow = async () => {
    update({ notificationsEnabled: true });
    if ("Notification" in window && Notification.permission === "default") {
      await Notification.requestPermission();
    }
    navigate("/onboarding/ready");
  };

  return (
    <div className="flex-1 flex flex-col min-h-0 pb-5">
      <OnboardingHeader step={5} />
      <ScreenTitle
        lead="Stay in"
        accent="the loop."
        subtitle="Turn on notifications so you never miss your brief."
      />

      <div className="mx-5 mt-6 notify-preview rounded-[22px] px-[14px] py-[13px]">
        <div className="flex items-start gap-[10px]">
          <div className="h-[36px] w-[36px] rounded-[11px] notify-app-icon grid place-items-center shrink-0 mt-[1px]">
            <NuzioMark />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between gap-2">
              <p className="text-[13px] font-semibold text-white/90 leading-none">Nuzio</p>
              <span className="text-[10px] tracking-[0.16em] text-white/28 font-semibold">NOW</span>
            </div>
            <p className="mt-[10px] text-[14px] font-semibold tracking-[-0.02em] text-[#f3f0ff] leading-none whitespace-nowrap">
              🌤 Your morning brief is ready
            </p>
            <p className="mt-[7px] text-[10px] text-white/36 leading-snug whitespace-nowrap">
              {stories} stories · {niches} · Voice: {voice} · {hh}:{mm}
            </p>
          </div>
        </div>
      </div>

      <p className="px-5 mt-[22px] text-[10px] tracking-[0.2em] text-white/32 font-semibold">
        WHAT YOU&apos;LL RECEIVE
      </p>
      <div className="px-5 mt-3 space-y-[10px] flex-1">
        <Notice
          tone="green"
          icon={<SunIcon />}
          title="Morning brief ready"
          body="Your daily audio briefing is waiting"
          meta={`Daily · ${formatTimeLabel(briefTime)}`}
          metaClass="text-[#3DDC97]"
        />
        <Notice
          tone="violet"
          icon={<BoltIcon />}
          title="Breaking story"
          body="A major story just broke in your niches"
          meta="When it happens"
          metaClass="text-[#5BA8FF]"
        />
        <Notice
          tone="navy"
          icon={<PinIcon />}
          title="Weekly digest"
          body="The most-saved stories from this week"
          meta="Sundays · 9:00 AM"
          metaClass="text-[#5BA8FF]"
        />
      </div>

      <div className="px-5 pt-4 space-y-[10px]">
        <Button className="notify-allow" onClick={allow}>
          Allow notifications
        </Button>
        <Button
          variant="ghost"
          className="notify-skip"
          onClick={() => {
            update({ notificationsEnabled: false });
            navigate("/onboarding/ready");
          }}
        >
          Not now
        </Button>
      </div>
    </div>
  );
}

function Notice({ tone, icon, title, body, meta, metaClass }) {
  return (
    <div className="notify-row rounded-[20px] pl-[11px] pr-[12px] py-[11px] flex items-center gap-[10px]">
      <div className={`h-[40px] w-[40px] rounded-[13px] grid place-items-center shrink-0 notify-icon-${tone}`}>
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-3">
          <p className="font-semibold text-[13.5px] tracking-[-0.02em] text-[#f3f0ff] leading-tight">{title}</p>
          <p className={`text-[10.5px] font-medium whitespace-nowrap shrink-0 pt-[2px] ${metaClass}`}>{meta}</p>
        </div>
        <p className="mt-[3px] text-[11px] text-white/38 leading-snug pr-1">{body}</p>
      </div>
    </div>
  );
}

function NuzioMark() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="2" y="8" width="3" height="8" rx="1.4" fill="#ece8ff" />
      <rect x="7.5" y="4" width="3" height="16" rx="1.4" fill="#ffffff" />
      <rect x="13" y="7" width="3" height="10" rx="1.4" fill="#ddd6fe" />
      <rect x="18.5" y="5" width="3" height="14" rx="1.4" fill="#f5f3ff" />
    </svg>
  );
}

function SunIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="4.2" fill="#C8F06A" />
      <g stroke="#C8F06A" strokeWidth="1.8" strokeLinecap="round">
        <path d="M12 3.4v2.1" />
        <path d="M12 18.5v2.1" />
        <path d="M3.4 12h2.1" />
        <path d="M18.5 12h2.1" />
        <path d="M5.9 5.9l1.5 1.5" />
        <path d="M16.6 16.6l1.5 1.5" />
        <path d="M18.1 5.9l-1.5 1.5" />
        <path d="M7.4 16.6l-1.5 1.5" />
      </g>
    </svg>
  );
}

function BoltIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M13.2 2.8 5.6 13.4h5.2L9.6 21.2l8.8-12.2h-5.4L13.2 2.8Z"
        fill="#9B7CFF"
      />
    </svg>
  );
}

function PinIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 21.4s6.4-6.1 6.4-11.1A6.4 6.4 0 0 0 12 3.9a6.4 6.4 0 0 0-6.4 6.4c0 5 6.4 11.1 6.4 11.1Z"
        fill="#C084FC"
      />
      <circle cx="12" cy="10.2" r="2.15" fill="#1a1430" />
    </svg>
  );
}
