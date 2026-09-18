export default function LoadingSpinner({ label = "Loading" }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-16 text-violet-200">
      <span className="h-10 w-10 rounded-full border-2 border-violet-400/30 border-t-violet-300 animate-spin" />
      <p className="text-sm">{label}</p>
    </div>
  );
}
