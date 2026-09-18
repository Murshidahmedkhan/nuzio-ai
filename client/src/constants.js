export const PROFESSIONS = [
  { id: "Finance & Trading", icon: "📈" },
  { id: "Legal", icon: "⚖️" },
  { id: "Technology", icon: "💻" },
  { id: "Healthcare", icon: "🩺" },
  { id: "Consulting", icon: "💼" },
  { id: "Marketing & Media", icon: "📣" },
  { id: "Government & Policy", icon: "🏛" },
  { id: "Real Estate", icon: "🏢" },
  { id: "Education", icon: "🎓" },
  { id: "Founder / Builder", icon: "🚀" },
];

export const INTERESTS = [
  { id: "AI & Technology", icon: "🤖", short: "AI & Tech" },
  { id: "Financial Markets", icon: "💹", short: "Markets" },
  { id: "Indian Business", icon: "🇮🇳", short: "Indian Business" },
  { id: "Global Politics", icon: "🌍", short: "Global" },
  { id: "Startups", icon: "🚀", short: "Startups" },
  { id: "Science", icon: "🔬", short: "Science" },
  { id: "Geopolitics", icon: "🗺", short: "Geopolitics" },
  { id: "Health & Medicine", icon: "💊", short: "Health" },
  { id: "Climate & Energy", icon: "🌱", short: "Climate" },
  { id: "Sports", icon: "⚽", short: "Sports" },
  { id: "Culture & Arts", icon: "🎭", short: "Culture" },
  { id: "Legal & Policy", icon: "⚖", short: "Legal" },
];

export const NARRATORS = [
  {
    id: "Aria",
    name: "Aria",
    lang: "EN",
    language: "English",
    gender: "♀",
    description: "Warm · Unhurried · British",
    preview: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
  },
  {
    id: "Kai",
    name: "Kai",
    lang: "EN",
    language: "English",
    gender: "♂",
    description: "Crisp · Focused · American",
    preview: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
  },
  {
    id: "Meera",
    name: "Meera",
    lang: "HI",
    language: "Hindi",
    gender: "♀",
    description: "Bright · Curious · Indian",
    preview: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
  },
];

export const BRIEF_LENGTHS = [
  { id: "5", label: "5 min", stories: 5, minutes: 5 },
  { id: "10", label: "10 min", stories: 8, minutes: 10 },
  { id: "15", label: "15 min", stories: 10, minutes: 15 },
  { id: "custom", label: "Custom", stories: 6, minutes: 8 },
];

export const BRIEFING_TIMES = [
  "05:30",
  "06:00",
  "06:30",
  "07:00",
  "07:30",
  "08:00",
  "08:30",
  "09:00",
  "18:00",
  "18:30",
  "19:00",
  "20:00",
];

export const formatDuration = (seconds = 0) => {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60)
    .toString()
    .padStart(2, "0");
  return `${String(m).padStart(2, "0")}:${s}`;
};

export const formatTimeLabel = (value = "07:00") => {
  const [h, m] = String(value).split(":").map(Number);
  const suffix = h >= 12 ? "PM" : "AM";
  const hour = h % 12 || 12;
  return `${hour}:${String(m).padStart(2, "0")} ${suffix}`;
};

export const relativeTime = (iso) => {
  const diff = Date.now() - new Date(iso).getTime();
  const hours = Math.round(diff / (1000 * 60 * 60));
  if (hours < 1) return "Just now";
  if (hours < 24) return `${hours}h ago`;
  const days = Math.round(hours / 24);
  return `${days}d ago`;
};

export const readMinutes = (seconds = 180) => `${Math.max(1, Math.round(seconds / 60))} MIN`;
