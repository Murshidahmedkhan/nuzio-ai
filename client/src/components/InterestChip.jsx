export default function InterestChip({ label, selected, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full px-4 py-2.5 text-sm font-medium border transition ${
        selected
          ? "bg-violet-500 text-white border-violet-300"
          : "bg-white/5 text-violet-100 border-white/10"
      }`}
    >
      {label}
    </button>
  );
}
