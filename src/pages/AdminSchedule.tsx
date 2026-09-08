import { useState } from "react";
import { shifts, machines, getScheduleForDate, appointments } from "../config/data";

const TODAY = "2026-09-08";

const statusConfig = {
  available:    { label: "Available",   bg: "bg-emerald-50",  text: "text-emerald-700", border: "border-emerald-200" },
  pending:      { label: "Pending",     bg: "bg-amber-50",    text: "text-amber-700",   border: "border-amber-200" },
  confirmed:    { label: "Confirmed",   bg: "bg-lbh-50",      text: "text-lbh-800",     border: "border-lbh-200" },
  "checked-in": { label: "Checked In",  bg: "bg-emerald-100", text: "text-emerald-800", border: "border-emerald-300" },
  completed:    { label: "Completed",   bg: "bg-slate-100",   text: "text-slate-600",   border: "border-slate-200" },
  cancelled:    { label: "Cancelled",   bg: "bg-red-50",      text: "text-red-500",     border: "border-red-200" },
  "no-show":    { label: "No Show",     bg: "bg-red-50",      text: "text-red-600",     border: "border-red-200" },
  rescheduled:  { label: "Rescheduled", bg: "bg-purple-50",   text: "text-purple-600",  border: "border-purple-200" },
} as const;

function addDays(dateStr: string, n: number): string {
  const d = new Date(dateStr + "T00:00:00");
  d.setDate(d.getDate() + n);
  return d.toISOString().split("T")[0];
}

function formatDateHead(dateStr: string): string {
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString("en-PH", { weekday: "short", month: "short", day: "numeric" });
}

function formatDateFull(dateStr: string): string {
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString("en-PH", { weekday: "long", year: "numeric", month: "long", day: "numeric" });
}

export default function AdminSchedule() {
  const [selectedDate, setSelectedDate] = useState(TODAY);
  const [view, setView] = useState<"day" | "week">("day");
  const [selectedShift, setSelectedShift] = useState<string | null>(null);

  const schedule = getScheduleForDate(selectedDate);

  const weekDays = Array.from({ length: 6 }, (_, i) => addDays(TODAY, i));

  return (
    <div className="p-5 sm:p-7 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="font-display font-bold text-slate-900 text-2xl">Schedule</h1>
          <p className="text-slate-500 text-sm mt-0.5">{formatDateFull(selectedDate)}</p>
        </div>
        <div className="flex items-center gap-3">
          {/* Day nav */}
          <div className="flex items-center gap-1 border border-slate-200 rounded-lg overflow-hidden">
            <button
              onClick={() => setSelectedDate((d) => addDays(d, -1))}
              className="px-3 py-2 text-slate-500 hover:text-slate-900 hover:bg-slate-50 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-lbh-700"
              aria-label="Previous day"
            >
              <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"/></svg>
            </button>
            <button
              onClick={() => setSelectedDate(TODAY)}
              className="px-3 py-2 text-xs font-semibold font-display text-slate-600 hover:text-lbh-800 hover:bg-slate-50 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-lbh-700"
            >
              Today
            </button>
            <button
              onClick={() => setSelectedDate((d) => addDays(d, 1))}
              className="px-3 py-2 text-slate-500 hover:text-slate-900 hover:bg-slate-50 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-lbh-700"
              aria-label="Next day"
            >
              <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/></svg>
            </button>
          </div>
          {/* View toggle */}
          <div className="flex bg-slate-100 p-1 rounded-lg" role="radiogroup" aria-label="View mode">
            {(["day", "week"] as const).map((v) => (
              <button
                key={v}
                role="radio"
                aria-checked={view === v}
                onClick={() => setView(v)}
                className={`px-3 py-1.5 rounded text-xs font-semibold font-display transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-lbh-700 capitalize ${view === v ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}
              >
                {v}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Week strip (when week view or as context) */}
      {view === "week" && (
        <div className="grid grid-cols-6 gap-2 mb-6">
          {weekDays.map((d) => {
            const dayAppts = appointments.filter((a) => a.date === d).length;
            const isSelected = d === selectedDate;
            return (
              <button
                key={d}
                onClick={() => { setSelectedDate(d); setView("day"); }}
                className={`p-2.5 rounded-xl border text-center transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-lbh-700 ${isSelected ? "border-lbh-700 bg-lbh-50" : "border-slate-200 bg-white hover:border-lbh-300"}`}
              >
                <p className={`text-xs font-semibold font-display ${isSelected ? "text-lbh-800" : "text-slate-500"}`}>
                  {new Date(d + "T00:00:00").toLocaleDateString("en-PH", { weekday: "short" })}
                </p>
                <p className={`font-display font-bold text-lg mt-0.5 ${isSelected ? "text-lbh-800" : "text-slate-800"}`}>
                  {new Date(d + "T00:00:00").getDate()}
                </p>
                <p className="text-xs text-slate-400 mt-0.5">{dayAppts} appts</p>
              </button>
            );
          })}
        </div>
      )}

      {/* Shift filter tabs */}
      <div className="flex items-center gap-1 overflow-x-auto pb-1 mb-5" role="tablist">
        <button
          role="tab"
          aria-selected={selectedShift === null}
          onClick={() => setSelectedShift(null)}
          className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold font-display transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-lbh-700 ${selectedShift === null ? "bg-lbh-800 text-white" : "bg-slate-100 text-slate-500 hover:text-slate-700"}`}
        >
          All Shifts
        </button>
        {shifts.map((s) => (
          <button
            key={s.id}
            role="tab"
            aria-selected={selectedShift === s.id}
            onClick={() => setSelectedShift(s.id === selectedShift ? null : s.id)}
            className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold font-display transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-lbh-700 ${selectedShift === s.id ? "bg-lbh-800 text-white" : "bg-slate-100 text-slate-500 hover:text-slate-700"}`}
          >
            {s.period} · {s.start}
          </button>
        ))}
      </div>

      {/* Schedule table */}
      {(selectedShift ? shifts.filter((s) => s.id === selectedShift) : shifts).map((shift) => {
        const shiftEntries = schedule.filter((e) => e.shiftId === shift.id);
        const booked = shiftEntries.filter((e) => e.status !== "available").length;
        const avail = shiftEntries.filter((e) => e.status === "available").length;

        return (
          <div key={shift.id} className="mb-6">
            {/* Shift header */}
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <h2 className="font-display font-bold text-slate-800 text-sm">{shift.period}</h2>
                <span className="font-mono text-xs text-slate-400">{shift.start} – {shift.end}</span>
              </div>
              <div className="flex items-center gap-3 text-xs text-slate-400">
                <span className="text-emerald-600 font-medium">{avail} available</span>
                <span>{booked} booked</span>
              </div>
            </div>

            {/* Table */}
            <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
              <table className="w-full text-sm" role="table">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200">
                    <th scope="col" className="text-left px-4 py-2.5 text-xs font-semibold font-display text-slate-400 uppercase tracking-wide w-24">Machine</th>
                    <th scope="col" className="text-left px-4 py-2.5 text-xs font-semibold font-display text-slate-400 uppercase tracking-wide">Patient</th>
                    <th scope="col" className="text-left px-4 py-2.5 text-xs font-semibold font-display text-slate-400 uppercase tracking-wide hidden sm:table-cell">Ref No.</th>
                    <th scope="col" className="text-left px-4 py-2.5 text-xs font-semibold font-display text-slate-400 uppercase tracking-wide">Status</th>
                    <th scope="col" className="text-right px-4 py-2.5 text-xs font-semibold font-display text-slate-400 uppercase tracking-wide">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {shiftEntries.map((entry) => {
                    const sc = statusConfig[entry.status as keyof typeof statusConfig];
                    return (
                      <tr key={`${entry.machineId}-${entry.shiftId}`} className={`hover:bg-slate-50 transition-colors ${entry.status === "available" ? "opacity-60" : ""}`}>
                        <td className="px-4 py-3 font-mono text-xs font-bold text-slate-700">{entry.machineId}</td>
                        <td className="px-4 py-3">
                          {entry.appointment ? (
                            <span className="font-medium text-slate-900">{entry.appointment.patientName}</span>
                          ) : (
                            <span className="text-slate-300 italic text-xs">— open slot —</span>
                          )}
                        </td>
                        <td className="px-4 py-3 hidden sm:table-cell">
                          {entry.appointment ? (
                            <span className="font-mono text-xs text-slate-400">{entry.appointment.confirmationNumber}</span>
                          ) : null}
                        </td>
                        <td className="px-4 py-3">
                          <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${sc.bg} ${sc.text}`}>{sc.label}</span>
                        </td>
                        <td className="px-4 py-3 text-right">
                          {entry.status === "available" ? (
                            <button className="text-xs font-semibold text-lbh-700 hover:text-lbh-900 focus:outline-none focus-visible:underline">Book</button>
                          ) : (
                            <button className="text-xs font-semibold text-lbh-700 hover:text-lbh-900 focus:outline-none focus-visible:underline">
                              {entry.status === "confirmed" ? "Check In" : "View"}
                            </button>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        );
      })}
    </div>
  );
}
