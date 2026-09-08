import { hospital, platform } from "../config/data";
import hospitalLogo from "../../assets/logo.jpeg";

interface FooterProps {
  onNavigate: (page: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="bg-slate-900 text-slate-400 mt-auto">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid sm:grid-cols-3 gap-6 mb-6">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <img
                src={hospitalLogo}
                alt=""
                className="w-7 h-7 rounded-full bg-white object-contain p-0.5"
                aria-hidden="true"
              />
              <p className="font-display font-semibold text-white text-sm">{hospital.shortName} Hemodialysis</p>
            </div>
            <p className="text-xs leading-relaxed">{hospital.address}</p>
          </div>

          {/* Links */}
          <nav aria-label="Footer navigation" className="flex flex-col gap-1.5">
            <p className="text-xs font-semibold font-display text-slate-300 uppercase tracking-wide mb-1">Quick links</p>
            {[
              { id: "unit", label: "Hemodialysis Unit" },
              { id: "faq", label: "FAQ" },
              { id: "contact", label: "Contact" },
              { id: "login", label: "Patient Portal" },
            ].map((l) => (
              <button
                key={l.id}
                onClick={() => onNavigate(l.id)}
                className="text-xs text-slate-400 hover:text-white transition-colors text-left w-fit focus:outline-none focus-visible:underline"
              >
                {l.label}
              </button>
            ))}
          </nav>

          {/* Contact */}
          <div>
            <p className="text-xs font-semibold font-display text-slate-300 uppercase tracking-wide mb-2">Contact</p>
            <div className="space-y-1">
              <a href={`tel:${hospital.phone}`} className="block text-xs hover:text-white transition-colors">{hospital.phone}</a>
              <a href={`mailto:${hospital.email}`} className="block text-xs hover:text-white transition-colors">{hospital.email}</a>
              <p className="text-xs">{hospital.hours}</p>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <p className="text-xs">© {new Date().getFullYear()} {hospital.name}. All rights reserved.</p>
          <p className="text-xs text-slate-500">
            Powered by{" "}
            <span className="text-slate-400 font-medium">{platform.name}</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
