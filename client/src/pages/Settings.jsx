import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../components/Logo";
import TabBar from "../components/TabBar";
import { NARRATORS } from "../constants";
import { useAuth } from "../context/AuthContext";
import { usePlayer } from "../context/PlayerContext";

const SPEEDS = ["1×", "1.25×", "1.5×", "2×"];
const LENGTHS = ["5 min", "10 min", "30 min"];
const VOICE_BLURB = {
  Aria: "warm, editorial",
  Kai: "crisp, focused",
  Meera: "bright, curious",
};

export default function Settings() {
  const navigate = useNavigate();
  const { user, preference, logout } = useAuth();
  const { saved } = usePlayer();
  const [dark, setDark] = useState(true);
  const [offline, setOffline] = useState(false);
  const [auto, setAuto] = useState(true);
  const [push, setPush] = useState(Boolean(preference?.notificationsEnabled));
  const [length, setLength] = useState(
    preference?.briefLength === "10" ? "10 min" : preference?.briefLength === "15" ? "30 min" : "5 min",
  );
  const [voice, setVoice] = useState(preference?.narrator || "Aria");
  const [speed, setSpeed] = useState("1×");

  const cycleVoice = () => {
    const i = NARRATORS.findIndex((n) => n.id === voice);
    setVoice(NARRATORS[(i + 1) % NARRATORS.length].id);
  };

  const cycleSpeed = () => {
    const i = SPEEDS.indexOf(speed);
    setSpeed(SPEEDS[(i + 1) % SPEEDS.length]);
  };

  return (
    <div className="flex-1 flex flex-col min-h-0 h-full overflow-hidden bg-[#0a090f]">
      <header className="px-5 pt-3 pb-1 shrink-0 flex items-center justify-between">
        <Logo compact />
        <div className="flex items-center gap-2.5">
          <HeaderIcon to="/discover" label="Search">
            <span className="text-[15px] leading-none">🔍</span>
          </HeaderIcon>
          <HeaderIcon to="/onboarding/notifications" badge="amber" label="Notifications">
            <span className="text-[15px] leading-none">🔔</span>
          </HeaderIcon>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto hide-scrollbar px-5 pb-2">
        <h1 className="serif-italic text-[42px] leading-none text-white mt-4">Settings</h1>
        <p className="mt-2 text-[14px] text-white/38">Tune your morning.</p>

        <div className="mt-5 space-y-3">
          <button type="button" className="w-full glass-card rounded-[26px] p-4 flex items-center gap-3 text-left">
            <div className="h-12 w-12 rounded-full bg-[#5b3de8] grid place-items-center text-[18px] font-semibold">
              {user?.name?.[0] || "A"}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-[16px]">{user?.name || "Aarav Sharma"}</p>
              <p className="text-[12.5px] text-white/40 truncate">
                {preference?.profession || "Technology"} · Mumbai, India
              </p>
            </div>
            <span className="text-[13px] text-[#b7a4ff] shrink-0">Edit ›</span>
          </button>

          <button type="button" className="w-full glass-card rounded-[26px] px-4 py-[18px] flex items-center gap-3 text-left">
            <span className="h-11 w-11 rounded-[16px] bg-white/[0.05] grid place-items-center">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path
                  d="M7 5.2h8.4a1.6 1.6 0 0 1 1.6 1.6v12.2l-5.8-2.6-5.8 2.6V6.8A1.6 1.6 0 0 1 7 5.2Z"
                  fill="#ef4444"
                />
              </svg>
            </span>
            <div className="flex-1">
              <p className="font-semibold text-[15px]">Saved stories</p>
              <p className="text-[12.5px] text-white/40">{saved.length} saved</p>
            </div>
            <span className="text-white/30 text-[18px]">›</span>
          </button>

          <button
            type="button"
            onClick={() => navigate("/settings/billing")}
            className="w-full glass-card rounded-[26px] px-4 py-[18px] flex items-center gap-3 text-left"
          >
            <span className="h-11 w-11 rounded-[16px] bg-white/[0.05] grid place-items-center">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <rect x="3.5" y="6.5" width="17" height="11.5" rx="2.2" fill="#60a5fa" />
                <rect x="3.5" y="9.2" width="17" height="2.2" fill="#1e3a5f" />
              </svg>
            </span>
            <div className="flex-1">
              <p className="font-semibold text-[15px]">Plan & billing</p>
              <p className="text-[12.5px] text-white/40">Free — upgrade for unlimited</p>
            </div>
            <span className="text-[13px] text-white/45 shrink-0">Free ›</span>
          </button>
        </div>

        <SectionLabel>APPEARANCE</SectionLabel>
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => setDark(true)}
            className={`h-[52px] rounded-[15px] font-medium text-[15px] transition-all duration-200 ${
              dark ? "settings-pill-on" : "settings-pill-off text-white/50"
            }`}
          >
            🌙 Dark
          </button>
          <button
            type="button"
            onClick={() => setDark(false)}
            className={`h-[52px] rounded-[15px] font-medium text-[15px] transition-all duration-200 ${
              !dark ? "settings-pill-on" : "settings-pill-off text-white/50"
            }`}
          >
            ☀️ Light
          </button>
        </div>

        <div className="mt-3 glass-card rounded-[26px] overflow-hidden">
          <Toggle
            label="Offline mode"
            hint="Download briefs for the commute"
            on={offline}
            setOn={setOffline}
            icon={
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <rect x="5" y="4" width="14" height="16" rx="2.4" fill="#818cf8" />
                <path d="M9 13.2 12 16l3-2.8V8H9v5.2Z" fill="#e0e7ff" />
              </svg>
            }
          />
          <div className="h-px bg-white/[0.05] mx-4" />
          <Toggle
            label="Auto-advance"
            hint="Play the next story automatically"
            on={auto}
            setOn={setAuto}
            icon={
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="8" fill="#334155" />
                <path d="M8.2 8.2v7.6L14.2 12 8.2 8.2Z" fill="#94a3b8" />
                <path d="M15.4 8.2v7.6" stroke="#94a3b8" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
            }
          />
          <div className="h-px bg-white/[0.05] mx-4" />
          <Toggle
            label="Push notifications"
            hint="Brief drops & breaking news"
            on={push}
            setOn={setPush}
            icon={
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path
                  d="M6.4 16.4h11.2M7.2 16.2V11a4.8 4.8 0 0 1 9.6 0v5.2M10 18.4a2 2 0 0 0 4 0"
                  stroke="#fbbf24"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              </svg>
            }
          />
        </div>

        <SectionLabel>BRIEF LENGTH</SectionLabel>
        <div className="grid grid-cols-3 gap-2.5">
          {LENGTHS.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setLength(item)}
              className={`h-[52px] rounded-[15px] text-[14.5px] font-medium transition-all duration-200 ${
                length === item ? "settings-pill-on" : "settings-pill-off text-white/45"
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        <SectionLabel>PLAYBACK</SectionLabel>
        <div className="glass-card rounded-[26px] overflow-hidden mb-4">
          <button type="button" onClick={cycleVoice} className="w-full px-4 py-[16px] flex items-center gap-3 text-left">
            <span className="h-11 w-11 rounded-[16px] bg-white/[0.05] grid place-items-center">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M4.5 9.2v5.6h3.2L12.4 19V5L7.7 9.2H4.5Z" fill="#94a3b8" />
                <path d="M15.2 9.4a4 4 0 0 1 0 5.2" stroke="#94a3b8" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
            </span>
            <div className="flex-1">
              <p className="font-semibold text-[15px]">Voice</p>
              <p className="text-[12.5px] text-white/40">
                {voice} — {VOICE_BLURB[voice] || "warm, editorial"}
              </p>
            </div>
            <span className="text-[13px] text-white/45">{voice} ›</span>
          </button>
          <div className="h-px bg-white/[0.05] mx-4" />
          <button type="button" onClick={cycleSpeed} className="w-full px-4 py-[16px] flex items-center gap-3 text-left">
            <span className="h-11 w-11 rounded-[16px] bg-white/[0.05] grid place-items-center">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="#fbbf24">
                <path d="M13.2 2 4.8 13.4h6.2L10 22l9.2-12.8h-6.4L13.2 2Z" />
              </svg>
            </span>
            <div className="flex-1">
              <p className="font-semibold text-[15px]">Default speed</p>
              <p className="text-[12.5px] text-white/40">Reading pace</p>
            </div>
            <span className="text-[13px] text-white/45">{speed} ›</span>
          </button>
        </div>

        <button
          type="button"
          className="w-full text-sm text-white/35 py-3 mb-2"
          onClick={async () => {
            await logout();
            navigate("/login");
          }}
        >
          Sign out
        </button>
      </div>

      <TabBar />
    </div>
  );
}

function SectionLabel({ children }) {
  return (
    <p className="pt-6 pb-3 text-[11px] tracking-[0.2em] text-white/32 font-medium">{children}</p>
  );
}

function Toggle({ label, hint, icon, on, setOn }) {
  return (
    <div className="px-4 py-[14px] flex items-center gap-3">
      <span className="h-11 w-11 rounded-[16px] bg-white/[0.05] grid place-items-center shrink-0">{icon}</span>
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-[15px]">{label}</p>
        <p className="text-[12.5px] text-white/40">{hint}</p>
      </div>
      <button
        type="button"
        aria-pressed={on}
        onClick={() => setOn(!on)}
        className={`h-[30px] w-[50px] rounded-full p-[3px] shrink-0 ${on ? "bg-[#34d399]" : "bg-white/18"}`}
      >
        <span className={`block h-6 w-6 rounded-full bg-white shadow-sm transition ${on ? "translate-x-[20px]" : ""}`} />
      </button>
    </div>
  );
}

function HeaderIcon({ children, badge, label, to }) {
  const navigate = useNavigate();
  return (
    <button
      type="button"
      aria-label={label}
      onClick={() => to && navigate(to)}
      className="relative h-10 w-10 rounded-full bg-white/[0.06] border border-white/[0.05] grid place-items-center"
    >
      {children}
      {badge ? (
        <span
          className={`absolute top-1 right-1 h-[7px] w-[7px] rounded-full ring-2 ring-[#0b0a10] ${
            badge === "amber" ? "bg-[#f59e0b]" : "bg-[#5eead4]"
          }`}
        />
      ) : null}
    </button>
  );
}
