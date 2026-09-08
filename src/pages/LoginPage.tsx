import { useState } from "react";
import { demoUsers, hospital, platform } from "../config/data";
import type { User } from "../config/data";

interface LoginPageProps {
  onLogin: (user: User) => void;
  onBack: () => void;
}

export default function LoginPage({ onLogin, onBack }: LoginPageProps) {
  const [tab, setTab] = useState<"patient" | "staff">("patient");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    setTimeout(() => {
      const match = demoUsers.find(
        (u) =>
          u.email === email &&
          u.password === password &&
          (tab === "staff" ? u.user.role !== "patient" : u.user.role === "patient")
      );
      if (match) {
        onLogin(match.user);
      } else {
        setError("Incorrect email or password. Please try again.");
      }
      setLoading(false);
    }, 600);
  }

  const hints =
    tab === "patient"
      ? [{ email: "patient@lbh.ph", label: "Patient (Rolf Garces)" }]
      : [
          { email: "staff@lbh.ph", label: "Staff (Nurse Ana)" },
          { email: "admin@lbh.ph", label: "Admin (Dr. Bautista)" },
        ];

  return (
    <main className="min-h-[calc(100vh-64px)] bg-slate-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-sm animate-scale-in">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-lbh-900 text-white font-display font-bold text-base mb-3" aria-hidden="true">
            LBH
          </div>
          <p className="font-display font-bold text-slate-900 text-lg">{hospital.name}</p>
          <p className="text-slate-500 text-sm">{hospital.unit}</p>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
          {/* Tabs */}
          <div className="flex bg-slate-100 rounded-lg p-1 mb-5" role="tablist">
            {(["patient", "staff"] as const).map((t) => (
              <button
                key={t}
                role="tab"
                aria-selected={tab === t}
                onClick={() => { setTab(t); setEmail(""); setPassword(""); setError(""); }}
                className={`flex-1 py-2 rounded-md text-sm font-semibold font-display transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-lbh-700 ${
                  tab === t ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"
                }`}
              >
                {t === "patient" ? "Patient" : "Staff"}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} noValidate>
            <div className="space-y-4">
              <div>
                <label htmlFor="login-email" className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Email address
                </label>
                <input
                  id="login-email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={tab === "patient" ? "patient@lbh.ph" : "staff@lbh.ph"}
                  className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-lbh-700 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label htmlFor="login-password" className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Password
                </label>
                <input
                  id="login-password"
                  type="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-lbh-700 focus:border-transparent"
                  required
                />
              </div>

              {error && (
                <div role="alert" className="flex items-center gap-2 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2.5">
                  <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading || !email || !password}
                className="w-full py-3 bg-lbh-800 hover:bg-lbh-900 text-white font-bold font-display rounded-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-lbh-700 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Signing in…" : "Sign in"}
              </button>
            </div>
          </form>

          {/* Demo credentials */}
          <div className="mt-4 bg-lbh-50 border border-lbh-100 rounded-lg p-3">
            <p className="text-xs font-semibold font-display text-lbh-800 mb-1.5">Demo credentials</p>
            {hints.map((h) => (
              <button
                key={h.email}
                type="button"
                onClick={() => { setEmail(h.email); setPassword("demo123"); }}
                className="w-full text-left text-xs text-lbh-700 hover:text-lbh-900 py-0.5 focus:outline-none focus-visible:underline"
              >
                {h.label} — <span className="font-mono">{h.email}</span> / <span className="font-mono">demo123</span>
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={onBack}
          className="mt-4 w-full text-center text-sm text-slate-500 hover:text-slate-700 transition-colors focus:outline-none focus-visible:underline"
        >
          ← Back to website
        </button>

        <p className="text-xs text-slate-400 text-center mt-6">
          Powered by {platform.name}
        </p>
      </div>
    </main>
  );
}
