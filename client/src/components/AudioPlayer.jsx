import { useEffect, useRef, useState } from "react";
import { formatDuration } from "../constants";

export default function AudioPlayer({
  item,
  playlist = [],
  narrator,
  onClose,
  onChangeTrack,
  onPlayStart,
}) {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [current, setCurrent] = useState(0);
  const [duration, setDuration] = useState(item?.duration || 0);
  const [error, setError] = useState("");

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !item) return;
    audio.src = item.audioUrl;
    audio.load();
    setProgress(0);
    setCurrent(0);
    setError("");
    audio
      .play()
      .then(() => {
        setPlaying(true);
        onPlayStart?.(item);
      })
      .catch(() => {
        setPlaying(false);
        setError("Audio could not start. Tap play to retry.");
      });
  }, [item?._id]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onTime = () => {
      setCurrent(audio.currentTime);
      setDuration(audio.duration || item.duration || 0);
      if (audio.duration) setProgress(audio.currentTime / audio.duration);
    };
    const onEnded = () => next();
    audio.addEventListener("timeupdate", onTime);
    audio.addEventListener("ended", onEnded);
    return () => {
      audio.removeEventListener("timeupdate", onTime);
      audio.removeEventListener("ended", onEnded);
    };
  }, [item, playlist]);

  const toggle = async () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
      return;
    }
    try {
      await audio.play();
      setPlaying(true);
      setError("");
      onPlayStart?.(item);
    } catch {
      setError("Could not play this briefing.");
    }
  };

  const seek = (event) => {
    const audio = audioRef.current;
    if (!audio?.duration) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const ratio = Math.min(1, Math.max(0, (event.clientX - rect.left) / rect.width));
    audio.currentTime = ratio * audio.duration;
  };

  const index = playlist.findIndex((entry) => entry._id === item?._id);

  const prev = () => {
    if (index > 0) onChangeTrack(playlist[index - 1]);
  };

  const next = () => {
    if (index >= 0 && index < playlist.length - 1) onChangeTrack(playlist[index + 1]);
  };

  if (!item) return null;

  return (
    <div className="flex flex-col min-h-full px-5 pb-8 pt-4">
      <audio ref={audioRef} preload="auto" />
      <div className="flex items-center justify-between">
        <button type="button" onClick={onClose} className="text-violet-200 text-sm">
          Close
        </button>
        <p className="text-xs uppercase tracking-[0.2em] text-violet-300">Now playing</p>
        <span className="w-10" />
      </div>

      <div className="mt-6 overflow-hidden rounded-[28px]">
        <img src={item.imageUrl} alt="" className="h-72 w-full object-cover" />
      </div>

      <p className="mt-6 text-xs uppercase tracking-[0.18em] text-violet-300">{item.category}</p>
      <h1 className="mt-2 text-[26px] font-semibold leading-tight">{item.title}</h1>
      <p className="mt-3 text-sm text-violet-100/70 leading-relaxed">{item.description}</p>
      <p className="mt-3 text-sm text-violet-200">Narrated by {narrator || "Aria"}</p>

      {error ? <p className="mt-3 text-sm text-rose-300">{error}</p> : null}

      <button type="button" className="mt-8 w-full" onClick={seek} aria-label="Seek">
        <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
          <div className="h-full bg-violet-400" style={{ width: `${progress * 100}%` }} />
        </div>
      </button>
      <div className="mt-2 flex justify-between text-xs text-violet-200/70">
        <span>{formatDuration(current)}</span>
        <span>{formatDuration(duration)}</span>
      </div>

      <div className="mt-8 flex items-center justify-center gap-8">
        <button type="button" onClick={prev} className="text-2xl text-violet-200" aria-label="Previous">
          ⏮
        </button>
        <button
          type="button"
          onClick={toggle}
          className="h-16 w-16 rounded-full cta-gradient text-2xl grid place-items-center"
          aria-label={playing ? "Pause" : "Play"}
        >
          {playing ? "❚❚" : "▶"}
        </button>
        <button type="button" onClick={next} className="text-2xl text-violet-200" aria-label="Next">
          ⏭
        </button>
      </div>
    </div>
  );
}
