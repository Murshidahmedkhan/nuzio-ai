import { formatDuration, relativeTime } from "../constants";

export default function NewsCard({ item, onPlay, onOpen }) {
  return (
    <article className="glass-card rounded-3xl p-3 flex gap-3">
      <button type="button" onClick={onOpen} className="shrink-0">
        <img
          src={item.imageUrl}
          alt=""
          className="h-[88px] w-[88px] rounded-2xl object-cover"
        />
      </button>
      <div className="min-w-0 flex-1">
        <p className="text-[11px] uppercase tracking-[0.16em] text-violet-300">
          {item.category}
        </p>
        <button
          type="button"
          onClick={onOpen}
          className="mt-1 text-left text-[15px] font-semibold leading-snug line-clamp-2"
        >
          {item.title}
        </button>
        <div className="mt-2 flex items-center justify-between text-xs text-violet-200/70">
          <span>
            {item.source} · {relativeTime(item.publishedAt)} · {formatDuration(item.duration)}
          </span>
          <button
            type="button"
            onClick={onPlay}
            className="h-8 w-8 rounded-full cta-gradient text-white grid place-items-center"
            aria-label="Play"
          >
            ▶
          </button>
        </div>
      </div>
    </article>
  );
}
