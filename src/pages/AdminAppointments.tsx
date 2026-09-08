import { useState } from "react";
import { appointments, shifts } from "../config/data";
import type { Appointment } from "../config/data";

const statusConfig: Record<Appointment["status"], { label: string; cls: string }> = {
  pending:      { label: "Pending",     cls: "bg-amber-100 text-amber-700" },
  confirmed:    { label: "Confirmed",   cls: "bg-lbh-100 text-lbh-800" },
  "checked-in": { label: "Checked In",  cls: "bg-emerald-100 text-emerald-800" },
  completed:    { label: "Completed",   cls: "bg-slate-100 text-slate-600" },
  cancelled:    { label: "Cancelled",   cls: "bg-red-100 text-red-500" },
  "no-show":    { label: "No Show",     cls: "bg-red-100 text-red-600" },
  rescheduled:  { label: "Rescheduled", cls: "bg-purple-100 text-purple-600" },
};

export default function AdminAppointments() {
  const [filter, setFilter] = useState<Appointment["status"] | "all">("all");
  const [search, setSearch] = useState("");

  const filtered = appointments
    .filter((a) => filter === "all" || a.status === filter)
    .filter((a) => !search || a.patientName.toLowerCase().includes(search.toLowerCase()) || a.confirmationNumber.includes(search))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="p-5 sm:p-7">
      <div className="mb-5">
        <h1 className="font-display font-bold text-slate-900 text-2xl">Appointments</h1>
        <p className="text-slate-500 text-sm mt-0.5">{appointments.length} total appointments</p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-5">
        <div className="relative flex-1 max-w-xs">
          <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="#94a3b8" strokeWidth={2} className="absolute left-3 top-1/2 -translate-y-1/2" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
          <input type="search" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search patient or ref no." className="w-full pl-9 pr-4 py-2.5 border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-lbh-700 focus:border-transparent" />
        </div>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value as typeof filter)}
          className="border border-slate-200 rounded-lg px-3 py-2.5 text-sm text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-lbh-700"
          aria-label="Filter by status"
        >
          <option value="all">All statuses</option>
          <option value="pending">Pending</option>
          <option value="confirmed">Confirmed</option>
          <option value="checked-in">Checked In</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
        <table className="w-full text-sm" role="table">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200">
              <th scope="col" className="text-left px-4 py-3 text-xs font-semibold font-display text-slate-400 uppercase tracking-wide">Ref No.</th>
              <th scope="col" className="text-left px-4 py-3 text-xs font-semibold font-display text-slate-400 uppercase tracking-wide">Patient</th>
              <th scope="col" className="text-left px-4 py-3 text-xs font-semibold font-display text-slate-400 uppercase tracking-wide hidden sm:table-cell">Date</th>
              <th scope="col" className="text-left px-4 py-3 text-xs font-semibold font-display text-slate-400 uppercase tracking-wide hidden md:table-cell">Shift</th>
              <th scope="col" className="text-left px-4 py-3 text-xs font-semibold font-display text-slate-400 uppercase tracking-wide hidden lg:table-cell">Machine</th>
              <th scope="col" className="text-left px-4 py-3 text-xs font-semibold font-display text-slate-400 uppercase tracking-wide">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filtered.length === 0 ? (
              <tr><td colSpan={6} className="text-center py-10 text-sm text-slate-400">No appointments found</td></tr>
            ) : filtered.map((appt) => {
              const shift = shifts.find((s) => s.id === appt.shiftId);
              const sc = statusConfig[appt.status];
              return (
                <tr key={appt.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-3 font-mono text-xs text-slate-500">{appt.confirmationNumber}</td>
                  <td className="px-4 py-3 font-medium text-slate-900">{appt.patientName}</td>
                  <td className="px-4 py-3 text-xs text-slate-600 hidden sm:table-cell">{appt.date}</td>
                  <td className="px-4 py-3 text-xs text-slate-500 hidden md:table-cell">{shift?.start} – {shift?.end}</td>
                  <td className="px-4 py-3 font-mono text-xs text-slate-500 hidden lg:table-cell">{appt.machineId}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${sc.cls}`}>{sc.label}</span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
