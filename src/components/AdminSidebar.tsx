import { hospital, platform } from "../config/data";
import type { User } from "../config/data";

interface AdminSidebarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  user: User;
  onLogout: () => void;
}

const navItems = [
  {
    id: "admin-dashboard",
    label: "Dashboard",
    icon: (
      <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/></svg>
    ),
  },
  {
    id: "admin-schedule",
    label: "Schedule",
    icon: (
      <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
    ),
  },
  {
    id: "admin-appointments",
    label: "Appointments",
    icon: (
      <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/></svg>
    ),
  },
  {
    id: "admin-checkin",
    label: "Check-In",
    icon: (
      <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
    ),
    badge: 3,
  },
  {
    id: "admin-patients",
    label: "Patients",
    icon: (
      <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
    ),
  },
  {
    id: "admin-reports",
    label: "Reports",
    icon: (
      <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/></svg>
    ),
  },
];

export default function AdminSidebar({ currentPage, onNavigate, user, onLogout }: AdminSidebarProps) {
  return (
    <aside className="hidden lg:flex flex-col w-56 min-h-0 bg-slate-900 text-white">
      {/* Logo */}
      <div className="px-4 py-4 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <span className="w-7 h-7 rounded bg-lbh-800 text-white font-display font-bold text-xs flex items-center justify-center shrink-0" aria-hidden="true">LBH</span>
          <div>
            <p className="font-display font-bold text-white text-xs leading-tight">{hospital.shortName}</p>
            <p className="text-slate-400 text-xs leading-tight">Hemodialysis Unit</p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-2 py-3 overflow-y-auto" aria-label="Admin navigation">
        <ul className="space-y-0.5">
          {navItems.map((item) => {
            const active = currentPage === item.id;
            return (
              <li key={item.id}>
                <button
                  onClick={() => onNavigate(item.id)}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-md text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-lbh-400 ${
                    active
                      ? "bg-lbh-800 text-white"
                      : "text-slate-400 hover:text-white hover:bg-slate-800"
                  }`}
                  aria-current={active ? "page" : undefined}
                >
                  <span className={active ? "text-lbh-300" : "text-slate-500"} aria-hidden="true">{item.icon}</span>
                  <span className="flex-1 text-left">{item.label}</span>
                  {item.badge && (
                    <span className="w-5 h-5 rounded-full bg-amber-500 text-white text-xs font-bold flex items-center justify-center" aria-label={`${item.badge} items need attention`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* User / logout */}
      <div className="px-3 py-3 border-t border-slate-800">
        <div className="flex items-center gap-2 mb-2">
          <span className="w-7 h-7 rounded-full bg-lbh-800 flex items-center justify-center text-xs font-bold text-white" aria-hidden="true">
            {user.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-semibold text-white truncate">{user.name}</p>
            <p className="text-xs text-slate-500 capitalize">{user.role}</p>
          </div>
        </div>
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-2 px-3 py-1.5 text-xs text-slate-400 hover:text-white hover:bg-slate-800 rounded transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-lbh-400"
        >
          <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/></svg>
          Log out
        </button>
        <p className="text-xs text-slate-600 mt-2 pl-1">Powered by {platform.name}</p>
      </div>
    </aside>
  );
}
