import { useNavigate } from "react-router-dom";
import Logo from "../components/Logo";

export default function Billing() {
  return (
    <div className="flex-1 flex flex-col min-h-0 h-full overflow-hidden bg-[#0a090f]">
      <header className="px-5 pt-3 pb-1 shrink-0 flex items-center justify-between">
        <Logo compact />
        <div className="flex items-center gap-2.5">
          <HeaderIcon badge="mint" label="Search">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <defs>
                <linearGradient id="billingSearchGrad" x1="4" y1="4" x2="20" y2="20">
                  <stop offset="0%" stopColor="#7dd3fc" />
                  <stop offset="100%" stopColor="#a78bfa" />
                </linearGradient>
              </defs>
              <circle cx="11" cy="11" r="6.2" stroke="url(#billingSearchGrad)" strokeWidth="1.8" />
              <path d="M16.2 16.2 20 20" stroke="url(#billingSearchGrad)" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </HeaderIcon>
          <HeaderIcon to="/onboarding/notifications" badge="amber" label="Notifications">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path
                d="M6.4 16.4h11.2M7.2 16.2V11a4.8 4.8 0 0 1 9.6 0v5.2M10 18.4a2 2 0 0 0 4 0"
                stroke="#fbbf24"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </HeaderIcon>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto hide-scrollbar px-5 pb-8">
        <h1 className="serif-italic text-[42px] leading-none text-white mt-4">Plan & billing</h1>
        <p className="mt-2 text-[14px] text-white/38">Start free. Upgrade when mornings pay for themselves.</p>

        <div className="mt-6 space-y-3.5">
          <article className="glass-card rounded-[28px] px-5 pt-5 pb-5">
            <p className="text-[15px] font-medium text-white/70">Free</p>
            <p className="mt-3 text-[42px] font-semibold leading-none tracking-tight text-[#8b7cff]">
              ₹0<span className="text-[16px] font-medium text-[#8b7cff]">/mo</span>
            </p>
            <p className="mt-3.5 text-[13.5px] leading-relaxed text-white/42">
              5 article summaries per niche daily. Ad supported. Push notifications.
            </p>
            <button
              type="button"
              className="mt-5 w-full h-[52px] rounded-[15px] bg-[#1a1822] border border-white/[0.06] text-[15px] font-medium text-white/80 transition-all duration-200"
            >
              Current plan
            </button>
          </article>

          <article className="pro-plan-card rounded-[28px] px-5 pt-5 pb-5">
            <div className="flex justify-between items-center">
              <p className="text-[15px] font-medium text-white/80">Pro</p>
              <span className="rounded-full bg-[#7dffb8] text-[#062016] text-[10px] tracking-[0.12em] px-3 py-1 font-bold">
                LAUNCH OFFER
              </span>
            </div>
            <p className="mt-3 text-[42px] font-semibold leading-none tracking-tight text-[#8b7cff]">
              ₹79<span className="text-[16px] font-medium text-[#8b7cff]">/mo</span>
            </p>
            <p className="mt-3.5 text-[13.5px] leading-relaxed text-white/48">
              Unlimited custom briefings, premium AI voices, multi-language support.
            </p>
            <button type="button" className="mt-5 w-full h-[52px] rounded-[15px] pro-cta text-[#062016] text-[15px] font-semibold transition-all duration-200 hover:brightness-105 active:scale-[0.985]">
              Upgrade to Pro
            </button>
          </article>

          <article className="glass-card rounded-[28px] px-5 pt-5 pb-5">
            <p className="text-[15px] font-medium text-white/70">Pro Annual</p>
            <p className="mt-3 text-[42px] font-semibold leading-none tracking-tight text-[#8b7cff]">
              ₹1,499<span className="text-[16px] font-medium text-[#8b7cff]">/yr</span>
            </p>
            <p className="mt-3.5 text-[13.5px] leading-relaxed text-white/42">
              All Pro benefits, offline mode, priority features. Locks in your rate.
            </p>
            <button
              type="button"
              className="mt-5 w-full h-[52px] rounded-[15px] bg-[#1a1822] border border-white/[0.06] text-[15px] font-medium text-white/80 transition-all duration-200"
            >
              Choose annual
            </button>
          </article>
        </div>
      </div>
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
