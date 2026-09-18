import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../components/Logo";
import TabBar from "../components/TabBar";
import { INTERESTS, readMinutes } from "../constants";
import { useAuth } from "../context/AuthContext";
import { usePlayer } from "../context/PlayerContext";
import { getPersonalizedNews } from "../services/news";

const DEFAULT_CHIPS = ["All", "AI & Tech", "Markets", "Startups", "Science"];

export default function Discover() {
  const navigate = useNavigate();
  const { preference } = useAuth();
  const player = usePlayer();
  const [items, setItems] = useState([]);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    getPersonalizedNews()
      .then(({ data }) => setItems(data.items || []))
      .catch(() => {});
  }, []);

  const chips = useMemo(() => {
    const extras = (preference?.interests || [])
      .map((id) => INTERESTS.find((i) => i.id === id)?.short || id)
      .filter((label) => !DEFAULT_CHIPS.includes(label));
    return [...DEFAULT_CHIPS, ...extras];
  }, [preference]);

  const visible = items.filter((item) => {
    const matchesQuery =
      !query ||
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.source?.toLowerCase().includes(query.toLowerCase());
    const short = INTERESTS.find((i) => i.id === item.category)?.short;
    const matchesFilter = filter === "All" || item.category === filter || short === filter;
    return matchesQuery && matchesFilter;
  });

  const playStory = (item) => {
    player.playItem(item, items);
    navigate("/news");
  };

  return (
    <div className="flex-1 flex flex-col min-h-0 h-full overflow-hidden bg-[#0a090f]">
      <header className="px-5 pt-3 pb-1 shrink-0 flex items-center justify-between">
        <Logo compact />
        <div className="flex items-center gap-2.5">
          <HeaderIcon label="Search">
            <span className="text-[15px] leading-none">🔍</span>
          </HeaderIcon>
          <HeaderIcon to="/onboarding/notifications" badge="amber" label="Notifications">
            <span className="text-[15px] leading-none">🔔</span>
          </HeaderIcon>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto hide-scrollbar px-5 pb-2">
        <h1 className="serif-italic text-[42px] leading-none text-white mt-4">Discover</h1>
        <p className="mt-2 text-[14px] text-white/38">Inshorts style — swipe the world.</p>

        <label className="mt-4 h-12 rounded-full bg-white/[0.045] border border-white/[0.07] px-4 flex items-center gap-2.5">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path
              d="M12 3.2 13.7 8.3 19 10 13.7 11.7 12 16.8 10.3 11.7 5 10 10.3 8.3 12 3.2Z"
              fill="#7dd3fc"
            />
            <path d="M18.2 15.4 19 17.6 21.2 18.4 19 19.2 18.2 21.4 17.4 19.2 15.2 18.4 17.4 17.6 18.2 15.4Z" fill="#c4b5fd" />
          </svg>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search stories, sources, topics..."
            className="bg-transparent outline-none flex-1 text-[13.5px] text-white placeholder:text-white/32"
          />
        </label>

        <div className="mt-4 flex gap-2 overflow-x-auto hide-scrollbar pb-1">
          {chips.map((chip) => (
            <button
              key={chip}
              type="button"
              onClick={() => setFilter(chip)}
              className={`whitespace-nowrap rounded-full px-[14px] py-[8px] text-[13px] font-medium ${
                filter === chip
                  ? "bg-[#6dffb8] text-[#062016]"
                  : "bg-white/[0.06] text-white/55"
              }`}
            >
              {chip}
            </button>
          ))}
        </div>

        <div className="mt-4 space-y-3 pb-6">
          {visible.map((item) => {
            const short = INTERESTS.find((i) => i.id === item.category)?.short;
            const saved = player.saved.some((entry) => entry._id === item._id);
            return (
              <article key={item._id} className="discover-card rounded-[26px] p-[18px]">
                <div className="flex gap-2">
                  <span className="rounded-full bg-white/[0.06] px-2.5 py-[5px] text-[10px] tracking-[0.14em] font-semibold text-[#7ee7c0]">
                    {(short || item.category || "GLOBAL").toUpperCase()}
                  </span>
                  <span className="rounded-full bg-white/[0.06] px-2.5 py-[5px] text-[10px] tracking-[0.14em] font-semibold text-white/40 inline-flex items-center gap-1">
                    {(item.source || "SOURCE").toUpperCase()}
                    <svg width="9" height="9" viewBox="0 0 12 12" fill="none">
                      <path d="M3.5 8.5 8.5 3.5M4.2 3.5h4.3v4.3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
                    </svg>
                  </span>
                </div>
                <h2 className="mt-3 text-[22px] font-semibold leading-[1.22] tracking-[-0.02em]">{item.title}</h2>
                <p className="mt-2 text-[13.5px] text-white/42 leading-relaxed line-clamp-2">{item.description}</p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-[11px] tracking-[0.16em] text-white/32 font-medium">
                    {readMinutes(item.duration)} READ
                  </span>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => playStory(item)}
                      className="h-10 w-10 rounded-full bg-[#6dffb8] text-[#062016] grid place-items-center"
                      aria-label="Play story"
                    >
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor" className="ml-0.5">
                        <path d="M2.4 1.2v9.6L11 6 2.4 1.2Z" />
                      </svg>
                    </button>
                    <button
                      type="button"
                      onClick={() => player.toggleSaved(item)}
                      className="h-10 w-10 rounded-full bg-white/[0.06] grid place-items-center text-white/45"
                      aria-label="Save story"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill={saved ? "#6dffb8" : "none"} stroke={saved ? "#6dffb8" : "currentColor"} strokeWidth="1.7">
                        <path d="M12 4.8 14.3 9.4l5.1.5-3.8 3.4 1.1 5-4.7-2.7-4.7 2.7 1.1-5-3.8-3.4 5.1-.5L12 4.8Z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      <TabBar
        onFabClick={() => {
          const next = player.item || visible[0] || items[0];
          if (next) playStory(next);
        }}
      />
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
      <span
        className={`absolute top-1 right-1 h-[7px] w-[7px] rounded-full ring-2 ring-[#0b0a10] ${
          badge === "amber" ? "bg-[#f59e0b]" : "bg-[#5eead4]"
        }`}
      />
    </button>
  );
}
