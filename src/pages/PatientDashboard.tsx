import { hospital, getPatientAppointments, shifts } from "../config/data";
import type { User, Appointment } from "../config/data";

interface PatientDashboardProps {
  user: User;
  onBook: () => void;
  onViewAppointments: () => void;
}

function getShift(shiftId: string) {
  return shifts.find((s) => s.id === shiftId);
}

function formatDate(dateStr: string): string {
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString("en-PH", { weekday: "long", year: "numeric", month: "long", day: "numeric" });
}

function statusBadge(status: Appointment["status"]) {
  const map: Record<Appointment["status"], { label: string; cls: string }> = {
    pending:     { label: "Pending",    cls: "bg-amber-50 text-amber-700 border-amber-200" },
    confirmed:   { label: "Confirmed",  cls: "bg-lbh-50 text-lbh-800 border-lbh-200" },
    "checked-in":{ label: "Checked In", cls: "bg-emerald-50 text-emerald-700 border-emerald-200" },
    completed:   { label: "Completed",  cls: "bg-slate-100 text-slate-600 border-slate-200" },
    cancelled:   { label: "Cancelled",  cls: "bg-red-50 text-red-600 border-red-200" },
    "no-show":   { label: "No Show",    cls: "bg-red-50 text-red-600 border-red-200" },
    rescheduled: { label: "Rescheduled",cls: "bg-purple-50 text-purple-600 border-purple-200" },
  };
  const b = map[status];
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${b.cls}`}>
      {b.label}
    </span>
  );
}

export default function PatientDashboard({ user, onBook, onViewAppointments }: PatientDashboardProps) {
  const { upcoming, past } = user.patientId
    ? getPatientAppointments(user.patientId)
    : { upcoming: [], past: [] };

  const nextAppt = upcoming[0] ?? null;
  const nextShift = nextAppt ? getShift(nextAppt.shiftId) : null;

  const greetingHour = new Date().getHours();
  const greeting = greetingHour < 12 ? "Good morning" : greetingHour < 17 ? "Good afternoon" : "Good evening";

  return (
    <main className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
      {/* Greeting */}
      <div className="mb-7">
        <h1 className="font-display font-bold text-slate-900 text-2xl sm:text-3xl">
          {greeting}, {user.name.split(" ")[0]}
        </h1>
        <p className="text-slate-500 mt-1 text-sm">{hospital.name} — Patient Portal</p>
      </div>

      {/* Next appointment */}
      {nextAppt ? (
        <div className="bg-lbh-900 text-white rounded-2xl p-6 mb-5 animate-fade-in">
          <p className="text-lbh-300 text-xs font-semibold font-display uppercase tracking-wide mb-3">
            Next Dialysis Session
          </p>
          <p className="font-display font-bold text-2xl mb-0.5">
            {nextShift?.start} – {nextShift?.end}
          </p>
          <p className="text-lbh-200 text-sm">{formatDate(nextAppt.date)}</p>
          <div className="mt-3 flex items-center gap-2">
            <p className="text-lbh-300 text-xs">{hospital.name} · {hospital.unit}</p>
            <span className="text-lbh-700">·</span>
            <span className="text-xs text-lbh-300 font-mono">{nextAppt.confirmationNumber}</span>
          </div>
          <div className="mt-4 flex items-center gap-2">
            {statusBadge(nextAppt.status)}
          </div>
          <div className="mt-5 flex gap-2 flex-wrap">
            <button
              onClick={onViewAppointments}
              className="px-4 py-2 bg-white text-lbh-900 font-bold font-display text-sm rounded-lg hover:bg-lbh-50 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              View Appointment
            </button>
            <button className="px-4 py-2 border-2 border-white/30 hover:border-white/60 text-white font-semibold font-display text-sm rounded-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white">
              Reschedule
            </button>
          </div>
        </div>
      ) : (
        <div className="border-2 border-dashed border-slate-200 rounded-2xl p-8 text-center mb-5 animate-fade-in">
          <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-3" aria-hidden="true">
            <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="#94a3b8" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
          </div>
          <p className="font-display font-semibold text-slate-700 text-base">No upcoming sessions</p>
          <p className="text-slate-500 text-sm mt-1">Book your next dialysis session below.</p>
          <button
            onClick={onBook}
            className="mt-4 px-5 py-2.5 bg-lbh-800 hover:bg-lbh-900 text-white font-bold font-display text-sm rounded-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-lbh-700"
          >
            Book a Session
          </button>
        </div>
      )}

      {/* Quick actions */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <button
          onClick={onBook}
          className="flex items-center gap-3 border border-slate-200 rounded-xl p-4 hover:border-lbh-300 hover:shadow-sm transition-all text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-lbh-700"
        >
          <span className="w-9 h-9 rounded-lg bg-lbh-100 flex items-center justify-center shrink-0" aria-hidden="true">
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="#1f30ab" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4"/></svg>
          </span>
          <div>
            <p className="font-display font-semibold text-slate-900 text-sm">Book a Session</p>
            <p className="text-slate-400 text-xs mt-0.5">Schedule a new appointment</p>
          </div>
        </button>
        <button
          onClick={onViewAppointments}
          className="flex items-center gap-3 border border-slate-200 rounded-xl p-4 hover:border-lbh-300 hover:shadow-sm transition-all text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-lbh-700"
        >
          <span className="w-9 h-9 rounded-lg bg-slate-100 flex items-center justify-center shrink-0" aria-hidden="true">
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="#64748b" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
          </span>
          <div>
            <p className="font-display font-semibold text-slate-900 text-sm">My Appointments</p>
            <p className="text-slate-400 text-xs mt-0.5">{upcoming.length} upcoming</p>
          </div>
        </button>
      </div>

      {/* Reminders */}
      <div className="border border-lbh-200 bg-lbh-50 rounded-xl px-5 py-4 mb-6">
        <h2 className="font-display font-semibold text-lbh-900 text-sm mb-2">Reminders</h2>
        <ul className="space-y-1.5">
          {["Arrive 15 minutes before your session.", "Bring your PhilHealth ID or MDR.", "Follow your prescribed fluid restriction."].map((r, i) => (
            <li key={i} className="flex gap-2 text-xs text-lbh-800">
              <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className="shrink-0 mt-0.5 text-lbh-500" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
              {r}
            </li>
          ))}
        </ul>
      </div>

      {/* Recent past appointments */}
      {past.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-display font-semibold text-slate-800 text-sm">Recent sessions</h2>
            <button onClick={onViewAppointments} className="text-xs text-lbh-700 font-semibold hover:text-lbh-900 focus:outline-none focus-visible:underline">View all</button>
          </div>
          <div className="space-y-2">
            {past.slice(0, 2).map((appt) => {
              const s = getShift(appt.shiftId);
              return (
                <div key={appt.id} className="border border-slate-200 rounded-xl px-4 py-3 flex items-center justify-between gap-4">
                  <div>
                    <p className="font-display font-semibold text-slate-800 text-sm">{appt.date}</p>
                    <p className="text-xs text-slate-500 mt-0.5">{s?.start} – {s?.end} · Hemodialysis</p>
                  </div>
                  {statusBadge(appt.status)}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </main>
  );
}
