export default function ProgressBar({ step, total = 7 }) {
  return (
    <div className="flex gap-1.5">
      {Array.from({ length: total }).map((_, index) => (
        <span
          key={index}
          className={`h-1 flex-1 rounded-full ${
            index < step ? "bg-violet-400" : "bg-white/10"
          }`}
        />
      ))}
    </div>
  );
}
