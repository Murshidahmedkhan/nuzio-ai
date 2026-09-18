import { useEffect, useMemo, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import OnboardingHeader, { ScreenTitle } from "../components/OnboardingHeader";
import { useOnboarding } from "../context/OnboardingContext";

const ITEM_H = 56;

function slotsFor(period) {
  const start = period === "AM" ? 0 : 12;
  const times = [];
  for (let hour = start; hour < start + 12; hour += 1) {
    times.push(`${String(hour).padStart(2, "0")}:00`);
    times.push(`${String(hour).padStart(2, "0")}:30`);
  }
  return times;
}

function displayHour(value) {
  const [h, m] = value.split(":").map(Number);
  return `${h % 12 || 12}:${String(m).padStart(2, "0")}`;
}

export default function BriefingTime() {
  const navigate = useNavigate();
  const { draft, update } = useOnboarding();
  const listRef = useRef(null);
  const hour = Number(draft.briefingTime.split(":")[0]);
  const period = hour >= 12 ? "PM" : "AM";
  const times = useMemo(() => slotsFor(period), [period]);
  const selectedIndex = Math.max(0, times.indexOf(draft.briefingTime));

  const setPeriod = (next) => {
    const [h, m] = draft.briefingTime.split(":").map(Number);
    if (next === "AM" && h >= 12) {
      update({ briefingTime: `${String(h - 12).padStart(2, "0")}:${String(m).padStart(2, "0")}` });
    }
    if (next === "PM" && h < 12) {
      update({ briefingTime: `${String(h + 12).padStart(2, "0")}:${String(m).padStart(2, "0")}` });
    }
  };

  useEffect(() => {
    const node = listRef.current;
    if (!node) return;
    node.scrollTo({ top: selectedIndex * ITEM_H, behavior: "auto" });
  }, [period, selectedIndex]);

  const onScroll = () => {
    const node = listRef.current;
    if (!node) return;
    const index = Math.round(node.scrollTop / ITEM_H);
    const next = times[Math.max(0, Math.min(times.length - 1, index))];
    if (next && next !== draft.briefingTime) update({ briefingTime: next });
  };

  return (
    <div className="flex-1 flex flex-col min-h-0 pb-5">
      <OnboardingHeader step={4} />
      <ScreenTitle
        lead="When do you"
        accent="want your brief?"
        subtitle="Nuzio will have your brief ready and waiting each morning."
      />

      <div className="px-5 mt-7 grid grid-cols-2 gap-3">
        {["AM", "PM"].map((item) => {
          const active = period === item;
          return (
            <button
              key={item}
              type="button"
              onClick={() => setPeriod(item)}
              className={`h-[50px] rounded-[14px] text-[14px] font-semibold tracking-[0.04em] transition-all duration-200 ${
                active
                  ? "time-period-active text-white"
                  : "bg-[#16141e] text-white/40 border border-white/[0.07]"
              }`}
            >
              {item}
            </button>
          );
        })}
      </div>

      <div className="relative flex-1 min-h-[320px] mt-2">
        <div className="pointer-events-none absolute inset-x-5 top-1/2 z-10 h-[72px] -translate-y-1/2 rounded-[22px] time-slot-selected" />
        <div
          ref={listRef}
          onScroll={onScroll}
          className="time-wheel hide-scrollbar absolute inset-0 overflow-y-auto"
        >
          <div style={{ height: `calc(50% - ${ITEM_H / 2}px)` }} />
          {times.map((time, index) => {
            const selected = draft.briefingTime === time;
            const dist = Math.abs(index - selectedIndex);
            const tone =
              selected ? "text-white" : dist === 1 ? "text-white/45" : dist === 2 ? "text-white/22" : "text-white/10";
            return (
              <button
                key={time}
                type="button"
                onClick={() => {
                  update({ briefingTime: time });
                  listRef.current?.scrollTo({ top: index * ITEM_H, behavior: "smooth" });
                }}
                style={{ height: ITEM_H }}
                className={`relative z-20 w-full flex items-center justify-center snap-center ${tone}`}
              >
                <span
                  className={`font-semibold tracking-[-0.04em] tabular-nums leading-none ${
                    selected ? "text-[36px]" : dist === 1 ? "text-[24px]" : "text-[20px]"
                  }`}
                >
                  {displayHour(time)}
                </span>
                {selected ? (
                  <span className="ml-1.5 mt-1.5 text-[11px] font-semibold tracking-[0.06em] text-[#b9a8ff]">
                    {period}
                  </span>
                ) : null}
              </button>
            );
          })}
          <div style={{ height: `calc(50% - ${ITEM_H / 2}px)` }} />
        </div>
      </div>

      <div className="px-5 pt-4 pb-1">
        <Button onClick={() => navigate("/onboarding/notifications")}>Continue →</Button>
      </div>
    </div>
  );
}
