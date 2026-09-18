import { NavLink } from "react-router-dom";
import { usePlayer } from "../context/PlayerContext";

export default function TabBar({ onFabClick }) {
  const { toggle, playing, item } = usePlayer();

  return (
    <div className="relative px-[14px] pb-4 pt-3 shrink-0">
      <button
        type="button"
        onClick={onFabClick || toggle}
        className="absolute -top-7 left-1/2 -translate-x-1/2 h-[72px] w-[72px] rounded-full discover-fab grid place-items-center text-white z-10"
        aria-label={playing ? "Pause" : "Play"}
      >
        {playing && item ? (
          <span className="flex gap-[5px]">
            <span className="h-[18px] w-[4px] bg-white rounded-full" />
            <span className="h-[18px] w-[4px] bg-white rounded-full" />
          </span>
        ) : (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="white" className="ml-1">
            <path d="M8 5.2v13.6L20.4 12 8 5.2Z" />
          </svg>
        )}
      </button>
      <div className="grid grid-cols-2 rounded-[28px] bg-[#0c0b12]/95 border border-white/[0.06] px-2 pt-7 pb-3.5">
        <Tab
          to="/discover"
          label="DISCOVER"
          icon={
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <circle cx="12" cy="12" r="8.2" />
              <path d="m10.2 13.8 1.1-3.5 3.5-1.1-1.1 3.5-3.5 1.1Z" fill="currentColor" stroke="none" />
            </svg>
          }
        />
        <Tab
          to="/settings"
          label="SETTINGS"
          icon={
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <circle cx="12" cy="12" r="8.2" />
              <circle cx="12" cy="12" r="4.35" />
              <circle cx="12" cy="12" r="1.55" fill="currentColor" stroke="none" />
            </svg>
          }
        />
      </div>
    </div>
  );
}

function Tab({ to, label, icon }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex flex-col items-center gap-1.5 text-[10px] tracking-[0.18em] font-semibold ${
          isActive ? "text-[#6dffb8]" : "text-white/35"
        }`
      }
    >
      {({ isActive }) => (
        <>
          <span className="leading-none">{icon}</span>
          <span className="relative">
            {label}
            {isActive ? (
              <span className="absolute left-1/2 -translate-x-1/2 -bottom-[7px] h-[2px] w-8 rounded-full bg-[#6dffb8]" />
            ) : null}
          </span>
        </>
      )}
    </NavLink>
  );
}
