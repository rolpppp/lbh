import { useState } from "react";
import { hospital } from "../config/data";
import type { User } from "../config/data";
import hospitalLogo from "../../assets/logo.jpeg";

interface HeaderProps {
  user: User | null;
  onNavigate: (page: string) => void;
  onLogin: () => void;
  onLogout: () => void;
  currentPage: string;
}

export default function Header({ user, onNavigate, onLogin, onLogout, currentPage }: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { id: "unit", label: "Hemodialysis Unit" },
    { id: "faq", label: "FAQ" },
    { id: "contact", label: "Contact" },
  ];

  return (
    <header className="bg-lbh-900 text-white sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button
            onClick={() => { onNavigate("home"); setMobileOpen(false); }}
            className="flex items-center gap-2.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50 rounded"
            aria-label={`${hospital.name} — Home`}
          >
            <img
              src={hospitalLogo}
              alt=""
              className="w-9 h-9 rounded-full bg-white object-contain p-0.5 select-none"
              aria-hidden="true"
            />
            <div className="hidden sm:block">
              <p className="font-display font-bold text-white text-sm leading-tight">{hospital.name}</p>
              <p className="text-lbh-300 text-xs leading-tight">{hospital.unit}</p>
            </div>
            <div className="sm:hidden">
              <p className="font-display font-bold text-white text-sm">{hospital.shortName}</p>
            </div>
          </button>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-0.5" aria-label="Main navigation">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => onNavigate(link.id)}
                className={`px-3 py-2 rounded text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50 ${
                  currentPage === link.id
                    ? "bg-white/10 text-white"
                    : "text-lbh-200 hover:text-white hover:bg-white/10"
                }`}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Desktop actions */}
          <div className="hidden md:flex items-center gap-2">
            {user ? (
              <>
                <button
                  onClick={() => onNavigate(user.role === "patient" ? "portal" : "admin")}
                  className="text-sm text-lbh-200 hover:text-white font-medium transition-colors"
                >
                  {user.name}
                </button>
                <button
                  onClick={onLogout}
                  className="px-3 py-1.5 text-sm text-lbh-300 hover:text-white border border-white/20 hover:border-white/40 rounded transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
                >
                  Log out
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={onLogin}
                  className="px-3 py-1.5 text-sm text-lbh-200 hover:text-white font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50 rounded"
                >
                  Patient Portal
                </button>
                <button
                  onClick={() => onNavigate("book")}
                  className="px-4 py-2 bg-white text-lbh-900 text-sm font-bold font-display rounded hover:bg-lbh-50 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  Book a Session
                </button>
              </>
            )}
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden p-2 rounded text-lbh-200 hover:text-white hover:bg-white/10 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            {mobileOpen ? (
              <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
            ) : (
              <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16"/></svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-white/10 bg-lbh-950 animate-fade-in">
          <nav className="px-4 py-3 flex flex-col gap-1">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => { onNavigate(link.id); setMobileOpen(false); }}
                className="w-full text-left px-3 py-2.5 rounded text-sm font-medium text-lbh-200 hover:text-white hover:bg-white/10 transition-colors focus:outline-none"
              >
                {link.label}
              </button>
            ))}
            <div className="pt-2 pb-1 border-t border-white/10 mt-1 flex flex-col gap-2">
              {user ? (
                <>
                  <button
                    onClick={() => { onNavigate(user.role === "patient" ? "portal" : "admin"); setMobileOpen(false); }}
                    className="w-full text-left px-3 py-2.5 text-sm font-medium text-white bg-white/10 rounded"
                  >
                    {user.name} — Portal
                  </button>
                  <button
                    onClick={() => { onLogout(); setMobileOpen(false); }}
                    className="w-full text-center px-4 py-2.5 border border-white/20 text-lbh-200 text-sm font-semibold rounded"
                  >
                    Log out
                  </button>
                </>
              ) : (
                <>
                  <button onClick={() => { onLogin(); setMobileOpen(false); }} className="w-full text-center px-4 py-2.5 border border-white/20 text-lbh-100 text-sm font-semibold rounded">
                    Patient Portal
                  </button>
                  <button onClick={() => { onNavigate("book"); setMobileOpen(false); }} className="w-full text-center px-4 py-2.5 bg-white text-lbh-900 text-sm font-bold font-display rounded">
                    Book a Session
                  </button>
                </>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
