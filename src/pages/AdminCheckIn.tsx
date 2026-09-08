import { useState } from "react";
import { appointments, shifts } from "../config/data";
import type { Appointment } from "../config/data";

const TODAY = "2026-09-08";

type ApptStatus = Appointment["status"];

const statusConfig: Record<ApptStatus, { label: string; cls: string }> = {
  pending:      { label: "Pending",     cls: "bg-amber-100 text-amber-700" },
  confirmed:    { label: "Confirmed",   cls: "bg-lbh-100 text-lbh-800" },
  "checked-in": { label: "Checked In",  cls: "bg-emerald-100 text-emerald-800" },
  completed:    { label: "Completed",   cls: "bg-slate-100 text-slate-600" },
  cancelled:    { label: "Cancelled",   cls: "bg-red-100 text-red-600" },
  "no-show":    { label: "No Show",     cls: "bg-red-100 text-red-600" },
  rescheduled:  { label: "Rescheduled", cls: "bg-purple-100 text-purple-600" },
};

export default function AdminCheckIn() {
  const [statuses, setStatuses] = useState<Record<string, ApptStatus>>(() => {
    const map: Record<string, ApptStatus> = {};
    appointments.forEach((a) => { map[a.id] = a.status; });
    return map;
  });
  const [checkedInTimes, setCheckedInTimes] = useState<Record<string, string>>({});
  const [search, setSearch] = useState("");

  const todaysAppts = appointments
    .filter((a) => a.date === TODAY)
    .filter((a) => !search || a.patientName.toLowerCase().includes(search.toLowerCase()) || a.confirmationNumber.includes(search))
    .sort((a, b) => {
      const order: ApptStatus[] = ["confirmed", "pending", "checked-in", "completed", "cancelled", "no-show"];
      return order.indexOf(a.status) - order.indexOf(b.status);
    });

  function handleCheckIn(id: string) {
    const now = new Date();
    const timeStr = now.toLocaleTimeString("en-PH", { hour: "2-digit", minute: "2-digit" });
    setStatuses((prev) => ({ ...prev, [id]: "checked-in" }));
    setCheckedInTimes((prev) => ({ ...prev, [id]: timeStr }));
  }

  function handleMarkNoShow(id: string) {
    setStatuses((prev) => ({ ...prev, [id]: "no-show" }));
  }

  function handleMarkComplete(id: string) {
    setStatuses((prev) => ({ ...prev, [id]: "completed" }));
  }

  const checkedInCount = Object.values(statuses).filter((s) => s === "checked-in").length;
  const confirmedCount = Object.values(statuses).filter((s) => s === "confirmed" || s === "pending").length;

  return (
    <div className="p-5 sm:p-7 max-w-3xl mx-auto">
      <div className="mb-6">
        <h1 className="font-display font-bold text-slate-900 text-2xl">Check-In</h1>
        <p className="text-slate-500 text-sm mt-1">Process today's patient arrivals</p>
      </div>

      {/* Stats bar */}
      <div className="flex gap-4 mb-5">
        <div className="bg-white border border-slate-200 rounded-xl px-4 py-3">
          <p className="font-display font-bold text-2xl text-emerald-700">{checkedInCount}</p>
          <p className="text-xs text-slate-400">Checked In</p>
        </div>
        <div className="bg-white border border-slate-200 rounded-xl px-4 py-3">
          <p className="font-display font-bold text-2xl text-lbh-800">{confirmedCount}</p>
          <p className="text-xs text-slate-400">Awaiting</p>
        </div>
        <div className="bg-white border border-slate-200 rounded-xl px-4 py-3">
          <p className="font-display font-bold text-2xl text-slate-700">{todaysAppts.length}</p>
          <p className="text-xs text-slate-400">Total Today</p>
        </div>
      </div>

      {/* Search */}
      <div className="relative mb-5">
        <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="#94a3b8" strokeWidth={2} className="absolute left-3 top-1/2 -translate-y-1/2" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
        <input
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by patient name or confirmation number…"
          className="w-full pl-9 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-lbh-700 focus:border-transparent"
          aria-label="Search patients"
        />
      </div>

      {/* Patient cards */}
      {todaysAppts.length === 0 ? (
        <div className="text-center py-12 border border-dashed border-slate-200 rounded-xl">
          <p className="font-display font-semibold text-slate-600">No results found</p>
          {search && <button onClick={() => setSearch("")} className="mt-2 text-sm text-lbh-700 font-semibold hover:text-lbh-900 focus:outline-none">Clear search</button>}
        </div>
      ) : (
        <div className="space-y-3" role="list">
          {todaysAppts.map((appt) => {
            const shift = shifts.find((s) => s.id === appt.shiftId);
            const currentStatus = statuses[appt.id] ?? appt.status;
            const sc = statusConfig[currentStatus];
            const checkedInAt = checkedInTimes[appt.id];
            const isDone = currentStatus === "checked-in" || currentStatus === "completed" || currentStatus === "cancelled" || currentStatus === "no-show";

            return (
              <div
                key={appt.id}
                role="listitem"
                className={`border rounded-xl p-4 transition-all ${isDone ? "border-slate-100 bg-slate-50 opacity-80" : "border-slate-200 bg-white"}`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-0.5">
                      <p className="font-display font-bold text-slate-900 text-base">{appt.patientName}</p>
                      <span className={`px-2 py-0.5 rounded text-xs font-medium ${sc.cls}`}>{sc.label}</span>
                    </div>
                    <p className="text-xs text-slate-500 font-mono">{appt.confirmationNumber}</p>
                    <p className="text-xs text-slate-400 mt-1">
                      {shift?.start} – {shift?.end} · {appt.machineId}
                    </p>
                    {checkedInAt && (
                      <p className="text-xs text-emerald-600 font-medium mt-1">
                        Checked in at {checkedInAt}
                      </p>
                    )}
                  </div>

                  <div className="shrink-0 flex flex-col gap-1.5 items-end">
                    {(currentStatus === "confirmed" || currentStatus === "pending") && (
                      <>
                        <button
                          onClick={() => handleCheckIn(appt.id)}
                          className="px-4 py-2 bg-lbh-800 hover:bg-lbh-900 text-white font-bold font-display text-sm rounded-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-lbh-700"
                        >
                          Check In
                        </button>
                        <button
                          onClick={() => handleMarkNoShow(appt.id)}
                          className="px-3 py-1.5 text-xs text-slate-400 hover:text-red-600 border border-slate-200 hover:border-red-200 rounded-lg transition-colors focus:outline-none"
                        >
                          No Show
                        </button>
                      </>
                    )}
                    {currentStatus === "checked-in" && (
                      <button
                        onClick={() => handleMarkComplete(appt.id)}
                        className="px-3 py-1.5 text-xs font-semibold text-emerald-700 border border-emerald-200 bg-emerald-50 hover:bg-emerald-100 rounded-lg transition-colors focus:outline-none"
                      >
                        Mark Complete
                      </button>
                    )}
                    {isDone && currentStatus !== "checked-in" && (
                      <span className="text-xs text-slate-400">Done</span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
