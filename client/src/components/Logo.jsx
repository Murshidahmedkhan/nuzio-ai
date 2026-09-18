export default function Logo({ compact = false }) {
  return (
    <div className="inline-flex items-center gap-2">
      <svg width={compact ? 18 : 22} height={compact ? 18 : 22} viewBox="0 0 24 24" fill="none">
        <rect x="2" y="8" width="3" height="8" rx="1.4" fill="#c4b5fd" />
        <rect x="7.5" y="4" width="3" height="16" rx="1.4" fill="#a78bfa" />
        <rect x="13" y="7" width="3" height="10" rx="1.4" fill="#8b5cf6" />
        <rect x="18.5" y="5" width="3" height="14" rx="1.4" fill="#ddd6fe" />
      </svg>
      <span className={`${compact ? "text-[13px]" : "text-[17px]"} font-semibold tracking-tight`}>
        Nuzio <span className="text-[#c4b5fd]">AI</span>
      </span>
    </div>
  );
}
