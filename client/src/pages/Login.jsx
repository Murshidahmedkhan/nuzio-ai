import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Logo from "../components/Logo";
import { useAuth } from "../context/AuthContext";

function GoogleMark() {
  return (
    <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden="true">
      <path
        fill="#FFC107"
        d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 8 3.1l5.7-5.7C34.2 6.1 29.4 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.2-.1-2.3-.4-3.5z"
      />
      <path
        fill="#FF3D00"
        d="M6.3 14.7l6.6 4.8C14.7 16 19 12 24 12c3.1 0 5.8 1.2 8 3.1l5.7-5.7C34.2 6.1 29.4 4 24 4 16.3 4 9.6 8.3 6.3 14.7z"
      />
      <path
        fill="#4CAF50"
        d="M24 44c5.2 0 10-2 13.6-5.2l-6.3-5.3C29.2 35.1 26.7 36 24 36c-5.3 0-9.7-3.3-11.3-7.9l-6.5 5C9.5 39.6 16.2 44 24 44z"
      />
      <path
        fill="#1976D2"
        d="M43.6 20.5H42V20H24v8h11.3c-1.1 3.2-3.5 5.8-6.6 7.5l6.3 5.3C37.9 38.3 44 33 44 24c0-1.2-.1-2.3-.4-3.5z"
      />
    </svg>
  );
}

export default function Login() {
  const { login, register } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState("login");
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const onChange = (event) => {
    setForm((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const submit = async (event) => {
    event.preventDefault();
    setBusy(true);
    setError("");
    try {
      const session =
        mode === "register" ? await register(form) : await login({ email: form.email, password: form.password });
      if (session?.preference?.onboardingComplete) navigate("/news");
      else navigate("/onboarding/profession");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="relative flex-1 flex flex-col min-h-0 overflow-y-auto hide-scrollbar bg-[#07060c]">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[280px] bg-[radial-gradient(ellipse_at_50%_8%,rgba(92,48,190,0.55),transparent_62%)]" />

      <div className="relative z-10 flex justify-center pt-10">
        <Logo />
      </div>

      <div className="relative z-10 px-7 mt-[92px]">
        <h1 className="text-[42px] leading-[1.05] font-semibold tracking-[-0.03em] text-white">Good morning.</h1>
        <p className="serif-italic text-[38px] leading-none text-[#9d8cff] mt-1.5">News on go.</p>
        <p className="mt-5 text-[15px] text-[#8c8798] leading-[1.55] max-w-[270px]">
          Personalised audio news for Indian professionals — curated every morning.
        </p>
      </div>

      <div className="relative z-10 mt-auto px-6 pb-7">
        {open ? (
          <form onSubmit={submit} className="space-y-3 mb-4">
            {mode === "register" ? (
              <input
                name="name"
                value={form.name}
                onChange={onChange}
                placeholder="Full name"
                className="w-full h-12 rounded-2xl bg-white/6 border border-white/10 px-4 outline-none"
                required
              />
            ) : null}
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={onChange}
              placeholder="Email"
              className="w-full h-12 rounded-2xl bg-white/6 border border-white/10 px-4 outline-none"
              required
            />
            <input
              name="password"
              type="password"
              value={form.password}
              onChange={onChange}
              placeholder="Password"
              className="w-full h-12 rounded-2xl bg-white/6 border border-white/10 px-4 outline-none"
              required
            />
            {error ? <p className="text-sm text-rose-300">{error}</p> : null}
            <Button type="submit" disabled={busy}>
              {busy ? "Please wait..." : mode === "register" ? "Create account" : "Continue →"}
            </Button>
            <button
              type="button"
              className="w-full text-sm text-white/50"
              onClick={() => setMode(mode === "login" ? "register" : "login")}
            >
              {mode === "login" ? "Need an account? Register" : "Already have an account? Login"}
            </button>
          </form>
        ) : null}

        <button
          type="button"
          onClick={() => setOpen(true)}
          className="w-full h-[56px] rounded-[15px] bg-[#1c1a22] border border-white/[0.08] flex items-center justify-center gap-2.5 text-[16px] font-medium text-white transition-all duration-200 hover:brightness-105 active:scale-[0.985]"
        >
          <GoogleMark />
          Continue with Google
        </button>
        <p className="mt-4 text-center text-[11px] text-white/30 leading-relaxed">
          By continuing you agree to our{" "}
          <span className="underline decoration-white/40 underline-offset-2 text-white/55">Terms</span> &{" "}
          <span className="underline decoration-white/40 underline-offset-2 text-white/55">Privacy Policy</span>
        </p>
      </div>
    </div>
  );
}
