export default function PreferenceOption({ label, selected, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full text-left rounded-2xl px-4 py-4 border transition ${
        selected
          ? "border-violet-400 bg-violet-500/15 text-white"
          : "border-white/8 bg-white/4 text-violet-100"
      }`}
    >
      <div className="flex items-center justify-between">
        <span className="font-medium">{label}</span>
        <span
          className={`h-5 w-5 rounded-full border ${
            selected ? "border-violet-300 bg-violet-400" : "border-white/20"
          }`}
        />
      </div>
    </button>
  );
}
