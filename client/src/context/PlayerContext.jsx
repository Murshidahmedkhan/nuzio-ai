import { createContext, useContext, useEffect, useMemo, useRef, useState } from "react";
import { recordPlay } from "../services/news";

const PlayerContext = createContext(null);

export function PlayerProvider({ children }) {
  const audioRef = useRef(null);
  const [playlist, setPlaylist] = useState([]);
  const [item, setItem] = useState(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [current, setCurrent] = useState(0);
  const [duration, setDuration] = useState(0);
  const [rate, setRate] = useState(1);
  const [saved, setSaved] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("nuzio-saved") || "[]");
    } catch {
      return [];
    }
  });

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const onTime = () => {
      setCurrent(audio.currentTime);
      setDuration(audio.duration || 0);
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

  const playItem = async (nextItem, nextPlaylist = playlist) => {
    setPlaylist(nextPlaylist);
    setItem(nextItem);
    const audio = audioRef.current;
    if (!audio || !nextItem) return;
    audio.src = nextItem.audioUrl;
    audio.playbackRate = rate;
    try {
      await audio.play();
      setPlaying(true);
      recordPlay(nextItem._id, { progress: 0, completed: false }).catch(() => {});
    } catch {
      setPlaying(false);
    }
  };

  const toggle = async () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (!item) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
      return;
    }
    try {
      await audio.play();
      setPlaying(true);
    } catch {
      setPlaying(false);
    }
  };

  const seek = (ratio) => {
    const audio = audioRef.current;
    if (!audio?.duration) return;
    audio.currentTime = ratio * audio.duration;
  };

  const index = playlist.findIndex((entry) => entry._id === item?._id);

  const next = () => {
    if (index >= 0 && index < playlist.length - 1) playItem(playlist[index + 1], playlist);
  };

  const prev = () => {
    if (index > 0) playItem(playlist[index - 1], playlist);
  };

  const cycleRate = () => {
    const nextRate = rate === 1 ? 1.5 : rate === 1.5 ? 2 : 1;
    setRate(nextRate);
    if (audioRef.current) audioRef.current.playbackRate = nextRate;
  };

  const toggleSaved = (news) => {
    setSaved((prev) => {
      const exists = prev.some((entry) => entry._id === news._id);
      const nextSaved = exists ? prev.filter((entry) => entry._id !== news._id) : [...prev, news];
      localStorage.setItem("nuzio-saved", JSON.stringify(nextSaved));
      return nextSaved;
    });
  };

  const value = useMemo(
    () => ({
      playlist,
      item,
      playing,
      progress,
      current,
      duration,
      rate,
      saved,
      playItem,
      toggle,
      next,
      prev,
      seek,
      cycleRate,
      toggleSaved,
      index,
    }),
    [playlist, item, playing, progress, current, duration, rate, saved, index]
  );

  return (
    <PlayerContext.Provider value={value}>
      <audio ref={audioRef} preload="auto" />
      {children}
    </PlayerContext.Provider>
  );
}

export const usePlayer = () => useContext(PlayerContext);
