import { useNavigate } from "react-router-dom";
import ProgressBar from "./ProgressBar";
import Button from "./Button";

export default function OnboardingLayout({
  step,
  title,
  subtitle,
  children,
  onContinue,
  disabled,
  cta = "Continue",
}) {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col flex-1 min-h-0 px-5 pt-6 pb-8">
      <button
        type="button"
        onClick={() => navigate(-1)}
        className="self-start text-violet-200 text-sm mb-4"
      >
        Back
      </button>
      <ProgressBar step={step} />
      <h1 className="mt-8 text-[28px] font-semibold leading-tight">{title}</h1>
      {subtitle ? <p className="mt-2 text-sm text-violet-200/70">{subtitle}</p> : null}
      <div className="mt-6 flex-1 overflow-y-auto pb-4">{children}</div>
      <Button onClick={onContinue} disabled={disabled}>
        {cta}
      </Button>
    </div>
  );
}
