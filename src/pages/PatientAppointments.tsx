import { useState } from "react";
import { getPatientAppointments, shifts, hospital } from "../config/data";
import type { User, Appointment } from "../config/data";

function getShift(id: string) { return shifts.find((s) => s.id === id); }

function formatDate(dateStr: string) {
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString("en-PH", { weekday: "short", year: "numeric", month: "short", day: "numeric" });
}

const statusConfig: Record<Appointment["status"], { label: string; cls: string; dot: string }> = {
  pending:      { label: "Pending",     cls: "bg-amber-50 text-amber-700 border-amber-200",  dot: "bg-amber-400" },
  confirmed:    { label: "Confirmed",   cls: "bg-lbh-50 text-lbh-800 border-lbh-200",        dot: "bg-lbh-600" },
  "checked-in": { label: "Checked In",  cls: "bg-emerald-50 text-emerald-700 border-emerald-200", dot: "bg-emerald-500" },
  completed:    { label: "Completed",   cls: "bg-slate-100 text-slate-600 border-slate-200", dot: "bg-slate-400" },
  cancelled:    { label: "Cancelled",   cls: "bg-red-50 text-red-600 border-red-200",        dot: "bg-red-400" },
  "no-show":    { label: "No Show",     cls: "bg-red-50 text-red-600 border-red-200",        dot: "bg-red-400" },
  rescheduled:  { label: "Rescheduled", cls: "bg-purple-50 text-purple-600 border-purple-200", dot: "bg-purple-400" },
};

function ApptCard({ appt, onBook }: { appt: Appointment; onBook: () => void }) {
  const [expanded, setExpanded] = useState(false);
  const shift = getShift(appt.shiftId);
  const sc = statusConfig[appt.status];

  return (
    <article className="border border-slate-200 rounded-xl overflow-hidden hover:border-slate-300 transition-colors">
      <div className="bg-white px-4 py-4">
        <div className="flex gap-3 items-start">
          {/* Date block */}
          <div className="shrink-0 w-11 bg-lbh-50 rounded-lg py-2 text-center">
            <p className="font-display font-bold text-lbh-800 text-base leading-none">{appt.date.split("-")[2]}</p>
            <p className="font-display font-bold text-lbh-600 text-xs uppercase mt-0.5">
              {new Date(appt.date + "T00:00:00").toLocaleDateString("en-PH", { month: "short" })}
            </p>
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap mb-0.5">
              <p className="font-display font-bold text-slate-900 text-sm">{shift?.start} – {shift?.end}</p>
              <span className={`inline-flex items-center gap-1 text-xs font-medium border px-2 py-0.5 rounded-full ${sc.cls}`}>
                <span className={`w-1.5 h-1.5 rounded-full inline-block ${sc.dot}`} aria-hidden="true"/>
                {sc.label}
              </span>
            </div>
            <p className="text-xs text-slate-500">Hemodialysis · {hospital.unit}</p>
            <p className="text-xs font-mono text-slate-400 mt-1">{appt.confirmationNumber}</p>
          </div>

          <button onClick={() => setExpanded(!expanded)} className="shrink-0 p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-lbh-700" aria-expanded={expanded} aria-label={expanded ? "Collapse" : "Expand"}>
            <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className={`transition-transform ${expanded ? "rotate-180" : ""}`}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"/></svg>
          </button>
        </div>

        {appt.status === "confirmed" && (
          <div className="mt-3 flex gap-2">
            <button className="text-xs font-semibold font-display text-lbh-700 hover:text-lbh-900 border border-lbh-200 hover:border-lbh-400 bg-white px-3 py-1.5 rounded-md transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-lbh-700">
              Reschedule
            </button>
            <button className="text-xs font-semibold font-display text-slate-500 hover:text-red-600 border border-slate-200 hover:border-red-200 bg-white px-3 py-1.5 rounded-md transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-lbh-700">
              Cancel
            </button>
          </div>
        )}
      </div>

      {expanded && (
        <div className="border-t border-slate-100 bg-slate-50 px-5 py-3 animate-fade-in space-y-1.5">
          <div className="flex justify-between text-xs"><span className="text-slate-400 font-medium">Date</span><span className="text-slate-700">{formatDate(appt.date)}</span></div>
          <div className="flex justify-between text-xs"><span className="text-slate-400 font-medium">Shift</span><span className="text-slate-700">{shift?.name}</span></div>
          <div className="flex justify-between text-xs"><span className="text-slate-400 font-medium">Machine</span><span className="text-slate-700 font-mono">{appt.machineId}</span></div>
          <div className="flex justify-between text-xs"><span className="text-slate-400 font-medium">Location</span><span className="text-slate-700">{hospital.name}</span></div>
          {appt.checkedInAt && <div className="flex justify-between text-xs"><span className="text-slate-400 font-medium">Checked in</span><span className="text-emerald-600 font-medium">{appt.checkedInAt}</span></div>}
        </div>
      )}
    </article>
  );
}

interface PatientAppointmentsProps {
  user: User;
  onBook: () => void;
}

export default function PatientAppointments({ user, onBook }: PatientAppointmentsProps) {
  const [tab, setTab] = useState<"upcoming" | "past">("upcoming");
  const { upcoming, past } = user.patientId
    ? getPatientAppointments(user.patientId)
    : { upcoming: [], past: [] };

  const shown = tab === "upcoming" ? upcoming : past;

  return (
    <main className="max-w-2xl mx-auto px-4 sm:px-6 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display font-bold text-slate-900 text-2xl">My Appointments</h1>
        <button
          onClick={onBook}
          className="px-4 py-2 bg-lbh-800 hover:bg-lbh-900 text-white font-bold font-display text-sm rounded-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-lbh-700"
        >
          + Book
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-slate-100 p-1 rounded-lg w-fit mb-5" role="tablist">
        {(["upcoming", "past"] as const).map((t) => (
          <button
            key={t}
            role="tab"
            aria-selected={tab === t}
            onClick={() => setTab(t)}
            className={`px-4 py-2 rounded-md text-sm font-semibold font-display transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-lbh-700 ${tab === t ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}
          >
            {t === "upcoming" ? "Upcoming" : "Past"}
            {t === "upcoming" && upcoming.length > 0 && (
              <span className="ml-1.5 w-4 h-4 inline-flex items-center justify-center rounded-full bg-lbh-800 text-white text-xs font-bold">{upcoming.length}</span>
            )}
          </button>
        ))}
      </div>

      {shown.length === 0 ? (
        <div className="text-center py-14 border border-dashed border-slate-200 rounded-xl">
          <div className="w-11 h-11 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-3" aria-hidden="true">
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="#94a3b8" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
          </div>
          <p className="font-display font-semibold text-slate-700">{tab === "upcoming" ? "No upcoming appointments" : "No past appointments"}</p>
          <p className="text-slate-400 text-sm mt-1">{tab === "upcoming" ? "You don't have any scheduled sessions." : "Completed sessions will appear here."}</p>
          {tab === "upcoming" && (
            <button onClick={onBook} className="mt-4 px-5 py-2.5 bg-lbh-800 hover:bg-lbh-900 text-white font-bold font-display text-sm rounded-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-lbh-700">
              Book a Session
            </button>
          )}
        </div>
      ) : (
        <div className="space-y-3" role="list">
          {shown.map((appt) => (
            <div key={appt.id} role="listitem">
              <ApptCard appt={appt} onBook={onBook} />
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
