import { useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import AdminSidebar from "./components/AdminSidebar";
import PublicHomePage from "./pages/PublicHomePage";
import LoginPage from "./pages/LoginPage";
import PatientDashboard from "./pages/PatientDashboard";
import PatientBooking from "./pages/PatientBooking";
import PatientAppointments from "./pages/PatientAppointments";
import AdminDashboard from "./pages/AdminDashboard";
import AdminSchedule from "./pages/AdminSchedule";
import AdminCheckIn from "./pages/AdminCheckIn";
import AdminPatients from "./pages/AdminPatients";
import AdminAppointments from "./pages/AdminAppointments";
import AdminReports from "./pages/AdminReports";
import type { User } from "./config/data";

// ─── Page types ───────────────────────────────────────────────────────────────

type PublicPage = "home" | "unit" | "faq" | "contact" | "login";
type PatientPage = "portal" | "portal-book" | "portal-appointments";
type AdminPage =
  | "admin-dashboard"
  | "admin-schedule"
  | "admin-appointments"
  | "admin-checkin"
  | "admin-patients"
  | "admin-reports";

type AppState =
  | { mode: "public"; page: PublicPage }
  | { mode: "patient"; page: PatientPage; user: User }
  | { mode: "admin"; page: AdminPage; user: User };

// ─── Mobile admin bottom nav ──────────────────────────────────────────────────

function AdminMobileNav({
  current,
  onNavigate,
}: {
  current: string;
  onNavigate: (p: string) => void;
}) {
  const items = [
    { id: "admin-dashboard", label: "Home",     icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" },
    { id: "admin-schedule",  label: "Schedule", icon: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" },
    { id: "admin-checkin",   label: "Check-In", icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" },
    { id: "admin-patients",  label: "Patients", icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" },
    { id: "admin-reports",   label: "Reports",  icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" },
  ];
  return (
    <nav className="lg:hidden fixed bottom-0 inset-x-0 bg-slate-900 border-t border-slate-800 flex z-40" aria-label="Admin mobile navigation">
      {items.map((item) => (
        <button
          key={item.id}
          onClick={() => onNavigate(item.id)}
          className={`flex-1 flex flex-col items-center justify-center py-2.5 gap-1 text-xs font-medium font-display transition-colors focus:outline-none ${current === item.id ? "text-white bg-lbh-900" : "text-slate-400 hover:text-white"}`}
          aria-current={current === item.id ? "page" : undefined}
        >
          <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d={item.icon}/>
          </svg>
          {item.label}
        </button>
      ))}
    </nav>
  );
}

// ─── Patient nav ──────────────────────────────────────────────────────────────

function PatientNav({
  current,
  onNavigate,
  user,
  onLogout,
}: {
  current: string;
  onNavigate: (p: string) => void;
  user: User;
  onLogout: () => void;
}) {
  return (
    <div className="bg-white border-b border-slate-200 sticky top-0 z-40">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-12">
          <div className="flex items-center gap-0.5">
            {[
              { id: "portal",              label: "Dashboard" },
              { id: "portal-appointments", label: "My Appointments" },
              { id: "portal-book",         label: "Book" },
            ].map((link) => (
              <button
                key={link.id}
                onClick={() => onNavigate(link.id)}
                className={`px-3 py-2 text-sm font-medium font-display transition-colors rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-lbh-700 ${
                  current === link.id
                    ? "text-lbh-800 bg-lbh-50"
                    : "text-slate-500 hover:text-slate-900 hover:bg-slate-50"
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400 hidden sm:block">{user.name}</span>
            <button
              onClick={onLogout}
              className="text-xs text-slate-400 hover:text-slate-700 transition-colors focus:outline-none focus-visible:underline"
            >
              Log out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── App ─────────────────────────────────────────────────────────────────────

export default function App() {
  const [state, setState] = useState<AppState>({ mode: "public", page: "home" });

  function navigate(page: string) {
    window.scrollTo({ top: 0, behavior: "smooth" });

    if (state.mode === "patient") {
      if (["portal", "portal-book", "portal-appointments"].includes(page)) {
        setState({ ...state, page: page as PatientPage });
        return;
      }
    }
    if (state.mode === "admin") {
      if (page.startsWith("admin-")) {
        setState({ ...state, page: page as AdminPage });
        return;
      }
    }
    // Public navigation
    if (page === "login") {
      setState({ mode: "public", page: "login" });
    } else if (page === "book") {
      if (state.mode === "patient") {
        setState({ ...state, page: "portal-book" });
      } else {
        setState({ mode: "public", page: "login" });
      }
    } else if (page === "portal") {
      setState(state.mode === "patient" ? { ...state, page: "portal" } : { mode: "public", page: "login" });
    } else if (page === "admin") {
      setState(state.mode === "admin" ? { ...state, page: "admin-dashboard" } : { mode: "public", page: "login" });
    } else {
      setState({ mode: "public", page: (page as PublicPage) || "home" });
    }
  }

  function handleLogin(user: User) {
    if (user.role === "patient") {
      setState({ mode: "patient", page: "portal", user });
    } else {
      setState({ mode: "admin", page: "admin-dashboard", user });
    }
  }

  function handleLogout() {
    setState({ mode: "public", page: "home" });
  }

  const currentUser = state.mode !== "public" ? state.user : null;
  const currentPage = state.page;

  // ── Admin layout ────────────────────────────────────────────────────────────
  if (state.mode === "admin") {
    return (
      <div className="flex h-full bg-slate-50">
        <AdminSidebar
          currentPage={state.page}
          onNavigate={navigate}
          user={state.user}
          onLogout={handleLogout}
        />
        <div className="flex-1 overflow-y-auto pb-16 lg:pb-0">
          <div className="animate-fade-in" key={state.page}>
            {state.page === "admin-dashboard"    && <AdminDashboard user={state.user} onNavigate={navigate} />}
            {state.page === "admin-schedule"     && <AdminSchedule />}
            {state.page === "admin-appointments" && <AdminAppointments />}
            {state.page === "admin-checkin"      && <AdminCheckIn />}
            {state.page === "admin-patients"     && <AdminPatients />}
            {state.page === "admin-reports"      && <AdminReports />}
          </div>
        </div>
        <AdminMobileNav current={state.page} onNavigate={navigate} />
      </div>
    );
  }

  // ── Patient portal layout ───────────────────────────────────────────────────
  if (state.mode === "patient") {
    return (
      <div className="min-h-full flex flex-col bg-slate-50">
        <Header user={state.user} onNavigate={navigate} onLogin={() => navigate("login")} onLogout={handleLogout} currentPage={state.page} />
        <PatientNav current={state.page} onNavigate={navigate} user={state.user} onLogout={handleLogout} />
        <div className="flex-1 animate-fade-in" key={state.page}>
          {state.page === "portal" && (
            <PatientDashboard user={state.user} onBook={() => navigate("portal-book")} onViewAppointments={() => navigate("portal-appointments")} />
          )}
          {state.page === "portal-book" && (
            <PatientBooking user={state.user} onDone={(dest) => navigate(dest)} />
          )}
          {state.page === "portal-appointments" && (
            <PatientAppointments user={state.user} onBook={() => navigate("portal-book")} />
          )}
        </div>
        <Footer onNavigate={navigate} />
      </div>
    );
  }

  // ── Public layout ───────────────────────────────────────────────────────────
  return (
    <div className="min-h-full flex flex-col bg-white">
      <Header
        user={currentUser}
        onNavigate={navigate}
        onLogin={() => navigate("login")}
        onLogout={handleLogout}
        currentPage={currentPage}
      />
      <div className="flex-1 animate-fade-in" key={currentPage}>
        {state.page === "login" ? (
          <LoginPage onLogin={handleLogin} onBack={() => navigate("home")} />
        ) : (
          <PublicHomePage
            onBook={() => navigate("login")}
            onLogin={() => navigate("login")}
            activePage={state.page}
          />
        )}
      </div>
      {state.page !== "login" && <Footer onNavigate={navigate} />}
    </div>
  );
}
