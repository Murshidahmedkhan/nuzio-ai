export default function Button({
  children,
  disabled = false,
  onClick,
  type = "button",
  variant = "primary",
  className = "",
}) {
  const styles =
    variant === "primary"
      ? `
        bg-[linear-gradient(90deg,#A99BFF_0%,#8064F5_100%)]
        text-[#0E0A18]
        shadow-[0_10px_30px_rgba(117,92,245,0.38)]
        border-0
        disabled:opacity-40
      `
      : variant === "ready"
        ? `
          ready-cta
          text-[#062016]
        `
        : variant === "ghost"
          ? `
            bg-transparent
            text-white/50
          `
          : `
            bg-white/5
            text-white
            border border-white/10
          `;

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`
        w-full
        h-[56px]

        rounded-[16px]

        box-border

        flex
        items-center
        justify-center

        font-semibold
        text-[15px]

        leading-none
        tracking-[-0.01em]

        transition-all
        duration-200
        ease-out

        hover:brightness-105
        active:scale-[0.985]

        disabled:cursor-not-allowed

        ${styles}
        ${className}
      `}
    >
      {children}
    </button>
  );
}