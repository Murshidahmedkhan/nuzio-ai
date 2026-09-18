import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../components/Logo";
import TabBar from "../components/TabBar";
import { formatDuration, INTERESTS } from "../constants";
import { useAuth } from "../context/AuthContext";
import { usePlayer } from "../context/PlayerContext";
import { getPersonalizedNews } from "../services/news";

const DEFAULT_CHIPS = ["All", "AI & Tech", "Markets", "Startups", "Science"];

const WAVE = [
  18, 28, 22, 36, 48, 32, 58, 72, 44, 62, 38, 80, 54, 34, 68, 90, 46, 30, 52, 74, 40, 26, 48, 66, 36, 58, 82, 50, 28,
  44, 70, 38, 24, 56, 78, 42, 30, 64, 48, 22, 40, 60, 34, 20,
];

export default function NewsFeed() {
  const navigate = useNavigate();
  const { user, preference } = useAuth();
  const player = usePlayer();
  const [items, setItems] = useState([]);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    getPersonalizedNews()
      .then(({ data }) => {
        const list = data.items || [];
        setItems(list);
        if (list[0] && !player.item) player.playItem(list[0], list);
      })
      .catch(() => setError("Could not load your briefing."));
  }, []);

  const chips = useMemo(() => {
    const extras = (preference?.interests || [])
      .map((id) => INTERESTS.find((i) => i.id === id)?.short || id)
      .filter((chip) => !DEFAULT_CHIPS.includes(chip));
    return [...DEFAULT_CHIPS, ...extras];
  }, [preference?.interests]);

  const visible = useMemo(() => {
    if (filter === "All") return items;
    return items.filter((item) => {
      const short = INTERESTS.find((i) => i.id === item.category)?.short;
      return item.category === filter || short === filter;
    });
  }, [items, filter]);

  const current = player.item || visible[0];
  const index = Math.max(0, visible.findIndex((item) => item._id === current?._id));
  const nextItem = visible[index + 1];
  const firstName = user?.name?.split(" ")[0] || "Aarav";
  const storyCount = items.length || 6;
  const briefTime = preference?.briefingTime || "18:30";
  const categoryLabel = (
    INTERESTS.find((i) => i.id === current?.category || i.short === current?.category)?.short ||
    (current?.category === "AI" ? "AI & Tech" : current?.category) ||
    "AI & Tech"
  ).toUpperCase();
  const isSaved = player.saved.some((entry) => entry._id === current?._id);

  const dateLabel = new Date().toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
  }).toUpperCase();

  return (
    <div className="flex-1 flex flex-col min-h-0 h-full overflow-hidden bg-[#0a090f]">
      <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain hide-scrollbar">
        <div className="px-5 pt-3 flex items-center justify-between">
          <Logo compact />
          <div className="flex gap-2.5">
            <IconBtn onClick={() => navigate("/discover")} label="Search" badge="mint">
              <span className="text-[15px] leading-none">🔍</span>
            </IconBtn>
            <IconBtn label="Notifications" badge="violet">
              <span className="text-[15px] leading-none">🔔</span>
            </IconBtn>
          </div>
        </div>

        <div className="mt-4 px-5 flex gap-2 overflow-x-auto hide-scrollbar pb-1">
          {chips.map((chip) => (
            <button
              key={chip}
              type="button"
              onClick={() => setFilter(chip)}
              className={`whitespace-nowrap rounded-full px-3.5 py-[7px] text-[12px] font-medium ${
                filter === chip
                  ? "bg-[#7dffb3] text-[#062016]"
                  : "bg-[#1a1824] text-white/55 border border-white/[0.06]"
              }`}
            >
              {chip}
            </button>
          ))}
        </div>

        <div className="px-5 mt-5">
          <p className="text-[10px] tracking-[0.18em] text-white/35 font-semibold">
            {dateLabel} · MORNING BRIEF
          </p>
          <h1 className="mt-2 text-[32px] leading-[1.12] font-semibold tracking-[-0.03em] text-[#f3f0ff]">
            Good morning, {firstName} —
            <br />
            <span className="serif-italic text-[#9d8cff]">{storyCount} things.</span>
          </h1>
          <p className="mt-2.5 flex items-center gap-1.5 text-[12px] text-[#7dffb3]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#7dffb3] shadow-[0_0_8px_#7dffb3]" />
            Audio live · Voice: <span className="text-white font-medium">{preference?.narrator || "Aria"}</span>
            <span className="text-white/35">·</span>
            <span className="text-white/55">{storyCount} stories</span>
            <span className="text-white/35">·</span>
            <span className="text-white/55">{briefTime}</span>
          </p>
        </div>

        {error ? <p className="px-5 mt-4 text-rose-300">{error}</p> : null}

        <div className="px-5 mt-4 pb-2">
          {current ? (
            <div className="player-card rounded-[28px] p-4">
              <div className="flex items-center justify-between text-[10px] tracking-[0.14em] text-white/40 font-semibold">
                <span className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#8b5cf6]" />
                  NOW PLAYING · {categoryLabel}
                </span>
                <span>
                  {String(index + 1).padStart(2, "0")} / {String(visible.length || storyCount).padStart(2, "0")}
                </span>
              </div>

              <h2 className="mt-3 text-[26px] leading-[1.15] serif text-[#f6f3ff]">
                {current.title}
              </h2>

              <div className="mt-3.5 flex items-center justify-between text-[10px] tracking-[0.14em] font-semibold">
                <span className="flex items-center gap-1.5 text-white/38">
                  {(current.source || "THE VERGE").toUpperCase()}
                  <span>·</span>
                  {Math.max(1, Math.round((current.duration || 180) / 60))} MIN
                  <span>·</span>
                  <a
                    href={current.url || current.sourceUrl || "#"}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-[#6dffb8]"
                    onClick={(event) => {
                      if (!current.url && !current.sourceUrl) event.preventDefault();
                    }}
                  >
                    SOURCE
                    <svg width="9" height="9" viewBox="0 0 12 12" fill="none">
                      <path d="M3.5 8.5L8.5 3.5M8.5 3.5H4.5M8.5 3.5V7.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                    </svg>
                  </a>
                </span>
                <button
                  type="button"
                  onClick={() => player.toggleSaved(current)}
                  className={`tracking-[0.16em] ${isSaved ? "text-[#6dffb8]" : "text-white/38"}`}
                >
                  SAVE
                </button>
              </div>

              {nextItem ? (
                <p className="mt-3 text-[13px] text-white/28 truncate leading-snug">{nextItem.title}</p>
              ) : null}

              <button
                type="button"
                className="relative mt-4 flex items-end gap-[3px] h-[52px] w-full"
                onClick={(event) => {
                  const rect = event.currentTarget.getBoundingClientRect();
                  player.seek(Math.min(1, Math.max(0, (event.clientX - rect.left) / rect.width)));
                }}
              >
                <span className="absolute left-0 right-0 bottom-[4px] h-[2px] rounded-full bg-white/[0.08] overflow-hidden">
                  <span
                    className="block h-full rounded-full bg-[#8b6cff]"
                    style={{ width: `${Math.max(2, player.progress * 100)}%` }}
                  />
                </span>
                {WAVE.map((h, i) => (
                  <span
                    key={i}
                    className="flex-1 rounded-full relative z-[1]"
                    style={{
                      height: `${h}%`,
                      background: i / WAVE.length <= player.progress ? "#8b6cff" : "rgba(139,108,255,0.22)",
                    }}
                  />
                ))}
              </button>

              <div className="mt-2 flex justify-between text-[11px] text-white/35 tabular-nums">
                <span>{formatDuration(player.current)}</span>
                <span>-{formatDuration(Math.max(0, (player.duration || current.duration || 0) - player.current))}</span>
              </div>

              <div className="mt-5 flex items-center justify-between px-1">
                <div className="flex flex-1 items-center justify-center gap-5 pr-2">
                  <button
                    type="button"
                    onClick={player.prev}
                    className="h-[52px] w-[52px] rounded-full grid place-items-center bg-[#2a2833] text-white/80 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]"
                    aria-label="Previous"
                  >
                    <SkipIcon dir="prev" />
                  </button>
                  <button
                    type="button"
                    onClick={player.toggle}
                    className="player-play h-[76px] w-[76px] rounded-full grid place-items-center"
                    aria-label={player.playing ? "Pause" : "Play"}
                  >
                    {player.playing ? <PauseGlyph /> : <PlayGlyph />}
                  </button>
                  <button
                    type="button"
                    onClick={player.next}
                    className="h-[52px] w-[52px] rounded-full grid place-items-center bg-[#2a2833] text-white/80 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]"
                    aria-label="Next"
                  >
                    <SkipIcon dir="next" />
                  </button>
                </div>
                <button
                  type="button"
                  onClick={player.cycleRate}
                  className="h-[42px] min-w-[46px] shrink-0 rounded-full bg-[#2a2833] px-3 text-[13px] font-medium text-white/70"
                >
                  {player.rate === 1 ? "1×" : `${player.rate}×`}
                </button>
              </div>
            </div>
          ) : (
            <p className="mt-8 text-white/40">No stories yet. Seed the database and refresh.</p>
          )}
        </div>

        {current ? (
          <div className="mx-5 mt-2 mb-3 rounded-[22px] bg-[#123322] px-4 py-3.5 flex items-center gap-3 text-[12.5px] text-[#7dffb3]">
            <span className="opacity-80">♪</span>
            <span className="truncate flex-1">Now narrating — {current.title}</span>
          </div>
        ) : null}
      </div>

      <TabBar />
    </div>
  );
}

function IconBtn({ children, onClick, label, badge }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="relative h-10 w-10 rounded-full bg-white/[0.06] border border-white/[0.05] grid place-items-center"
    >
      {children}
      <span
        className={`absolute top-1 right-1 h-[7px] w-[7px] rounded-full ring-2 ring-[#0a090f] ${
          badge === "violet" ? "bg-[#a78bfa]" : "bg-[#5eead4]"
        }`}
      />
    </button>
  );
}

function SkipIcon({ dir }) {
  if (dir === "prev") {
    return (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M5 6.2h1.7v11.6H5V6.2Z" />
        <path d="M19.2 6.15 8.6 12l10.6 5.85V6.15Z" />
      </svg>
    );
  }
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.3 6.2H19v11.6h-1.7V6.2Z" />
      <path d="M4.8 17.85 15.4 12 4.8 6.15v11.7Z" />
    </svg>
  );
}

function PauseGlyph() {
  return (
    <span className="flex gap-[6px]">
      <span className="h-[22px] w-[5px] rounded-[2px] bg-white" />
      <span className="h-[22px] w-[5px] rounded-[2px] bg-white" />
    </span>
  );
}

function PlayGlyph() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="white" className="ml-0.5">
      <path d="M8 5.2v13.6l11.4-6.8L8 5.2Z" />
    </svg>
  );
}
