import { appointments, adminAlerts, shifts, hospital, patients } from "../config/data";
import type { User } from "../config/data";

interface AdminDashboardProps {
  user: User;
  onNavigate: (page: string) => void;
}

const TODAY = "2026-09-08";

function formatShortDate(dateStr: string) {
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString("en-PH", { weekday: "long", month: "long", day: "numeric", year: "numeric" });
}

const statusConfig = {
  pending:      { label: "Pending",     bg: "bg-amber-100",  text: "text-amber-700" },
  confirmed:    { label: "Confirmed",   bg: "bg-lbh-100",    text: "text-lbh-800" },
  "checked-in": { label: "Checked In",  bg: "bg-emerald-100",text: "text-emerald-700" },
  completed:    { label: "Completed",   bg: "bg-slate-100",  text: "text-slate-600" },
  cancelled:    { label: "Cancelled",   bg: "bg-red-100",    text: "text-red-600" },
  "no-show":    { label: "No Show",     bg: "bg-red-100",    text: "text-red-600" },
  rescheduled:  { label: "Rescheduled", bg: "bg-purple-100", text: "text-purple-600" },
} as const;

export default function AdminDashboard({ user, onNavigate }: AdminDashboardProps) {
  const todaysAppts = appointments.filter((a) => a.date === TODAY);
  const total = todaysAppts.length;
  const confirmed = todaysAppts.filter((a) => a.status === "confirmed").length;
  const checkedIn = todaysAppts.filter((a) => a.status === "checked-in").length;
  const pending = todaysAppts.filter((a) => a.status === "pending").length;
  const cancelled = todaysAppts.filter((a) => a.status === "cancelled").length;
  const noShows = todaysAppts.filter((a) => a.status === "no-show").length;
  const totalSlots = 12 * 4; // 12 machines × 4 shifts
  const available = totalSlots - total;

  const greetingHour = new Date().getHours();
  const greeting = greetingHour < 12 ? "Good morning" : greetingHour < 17 ? "Good afternoon" : "Good evening";

  return (
    <div className="p-5 sm:p-7 max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <p className="text-slate-500 text-sm">{formatShortDate(TODAY)}</p>
        <h1 className="font-display font-bold text-slate-900 text-2xl mt-0.5">
          {greeting}, {user.name.split(" ").at(-1)}
        </h1>
        <p className="text-slate-400 text-xs mt-0.5">{hospital.unit} — Administrative Dashboard</p>
      </div>

      {/* Alerts */}
      {adminAlerts.length > 0 && (
        <div className="mb-6 space-y-2">
          {adminAlerts.map((alert) => (
            <div
              key={alert.id}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl border text-sm ${
                alert.type === "warning"
                  ? "bg-amber-50 border-amber-200 text-amber-800"
                  : alert.type === "error"
                  ? "bg-red-50 border-red-200 text-red-700"
                  : "bg-lbh-50 border-lbh-200 text-lbh-800"
              }`}
              role="alert"
            >
              <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className="shrink-0" aria-hidden="true">
                {alert.type === "warning" ? <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/> : <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>}
              </svg>
              {alert.message}
            </div>
          ))}
        </div>
      )}

      {/* Today's stats */}
      <h2 className="font-display font-semibold text-slate-700 text-xs uppercase tracking-wide mb-3">Today's Overview</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-7">
        {[
          { label: "Total Sessions", value: total, color: "text-slate-900" },
          { label: "Confirmed",      value: confirmed, color: "text-lbh-800" },
          { label: "Checked In",     value: checkedIn, color: "text-emerald-700" },
          { label: "Pending",        value: pending,   color: "text-amber-700" },
          { label: "Available Slots",value: available, color: "text-slate-600" },
          { label: "Cancelled",      value: cancelled, color: "text-red-600" },
        ].map((stat) => (
          <div key={stat.label} className="bg-white border border-slate-200 rounded-xl p-4">
            <p className={`font-display font-bold text-2xl ${stat.color}`}>{stat.value}</p>
            <p className="text-xs text-slate-400 mt-0.5">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Today's schedule preview */}
      <div className="mb-7">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-display font-semibold text-slate-800 text-sm">Today's Schedule</h2>
          <button
            onClick={() => onNavigate("admin-schedule")}
            className="text-xs text-lbh-700 font-semibold hover:text-lbh-900 focus:outline-none focus-visible:underline"
          >
            Full schedule →
          </button>
        </div>
        <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
          <table className="w-full text-sm" role="table">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="text-left px-4 py-3 text-xs font-semibold font-display text-slate-500 uppercase tracking-wide">Time</th>
                <th className="text-left px-4 py-3 text-xs font-semibold font-display text-slate-500 uppercase tracking-wide hidden sm:table-cell">Patient</th>
                <th className="text-left px-4 py-3 text-xs font-semibold font-display text-slate-500 uppercase tracking-wide">Machine</th>
                <th className="text-left px-4 py-3 text-xs font-semibold font-display text-slate-500 uppercase tracking-wide">Status</th>
                <th className="text-right px-4 py-3 text-xs font-semibold font-display text-slate-500 uppercase tracking-wide">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {todaysAppts.slice(0, 8).map((appt) => {
                const shift = shifts.find((s) => s.id === appt.shiftId);
                const sc = statusConfig[appt.status as keyof typeof statusConfig];
                return (
                  <tr key={appt.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-4 py-3 font-mono text-xs text-slate-600">{shift?.start}</td>
                    <td className="px-4 py-3 font-medium text-slate-900 hidden sm:table-cell">{appt.patientName}</td>
                    <td className="px-4 py-3 font-mono text-xs text-slate-500">{appt.machineId}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${sc.bg} ${sc.text}`}>
                        {sc.label}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button
                        onClick={() => onNavigate("admin-checkin")}
                        className="text-xs text-lbh-700 font-semibold hover:text-lbh-900 focus:outline-none focus-visible:underline"
                      >
                        {appt.status === "confirmed" ? "Check In" : "View"}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {todaysAppts.length > 8 && (
            <div className="px-4 py-2 bg-slate-50 border-t border-slate-100 text-xs text-slate-400 text-center">
              {todaysAppts.length - 8} more · <button onClick={() => onNavigate("admin-schedule")} className="text-lbh-700 font-semibold hover:text-lbh-900 focus:outline-none">View full schedule</button>
            </div>
          )}
        </div>
      </div>

      {/* Quick actions */}
      <div className="grid sm:grid-cols-3 gap-3">
        {[
          { label: "Go to Check-In", sub: "Process today's arrivals", page: "admin-checkin", icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" },
          { label: "View Schedule",  sub: "Full daily/weekly view",   page: "admin-schedule", icon: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" },
          { label: "Patient Directory", sub: `${patients.length} registered patients`, page: "admin-patients", icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" },
        ].map((item) => (
          <button
            key={item.page}
            onClick={() => onNavigate(item.page)}
            className="flex items-center gap-3 border border-slate-200 rounded-xl p-4 hover:border-lbh-300 hover:shadow-sm transition-all text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-lbh-700"
          >
            <span className="w-9 h-9 rounded-lg bg-lbh-100 flex items-center justify-center shrink-0" aria-hidden="true">
              <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="#1f30ab" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d={item.icon}/>
              </svg>
            </span>
            <div>
              <p className="font-display font-semibold text-slate-900 text-sm">{item.label}</p>
              <p className="text-slate-400 text-xs mt-0.5">{item.sub}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
