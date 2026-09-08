import { useState } from "react";
import { patients, appointments, shifts } from "../config/data";
import type { Patient } from "../config/data";

const TODAY = "2026-09-08";

function PatientRow({ patient, onClick }: { patient: Patient; onClick: () => void }) {
  const upcoming = appointments.filter((a) => a.patientId === patient.id && new Date(a.date + "T00:00:00") >= new Date(TODAY + "T00:00:00") && a.status !== "cancelled");
  const last = appointments.filter((a) => a.patientId === patient.id && a.status === "completed").slice(-1)[0];

  return (
    <tr className="hover:bg-slate-50 transition-colors cursor-pointer" onClick={onClick}>
      <td className="px-4 py-3">
        <div className="flex items-center gap-3">
          <span className="w-7 h-7 rounded-full bg-lbh-100 text-lbh-800 text-xs font-bold font-display flex items-center justify-center shrink-0" aria-hidden="true">
            {patient.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
          </span>
          <div>
            <p className="font-medium text-slate-900 text-sm">{patient.name}</p>
            <p className="font-mono text-xs text-slate-400">{patient.id}</p>
          </div>
        </div>
      </td>
      <td className="px-4 py-3 text-xs text-slate-600 hidden md:table-cell">{patient.phone}</td>
      <td className="px-4 py-3 hidden lg:table-cell">
        <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${patient.status === "active" ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-500"}`}>
          {patient.status === "active" ? "Active" : "Inactive"}
        </span>
      </td>
      <td className="px-4 py-3 text-xs text-slate-500 hidden sm:table-cell">{upcoming.length > 0 ? <span className="text-lbh-700 font-semibold">{upcoming.length} upcoming</span> : "—"}</td>
      <td className="px-4 py-3 text-xs text-slate-400 hidden lg:table-cell">{last ? last.date : "—"}</td>
      <td className="px-4 py-3 text-right">
        <button className="text-xs text-lbh-700 font-semibold hover:text-lbh-900 focus:outline-none focus-visible:underline" onClick={(e) => { e.stopPropagation(); onClick(); }}>
          View
        </button>
      </td>
    </tr>
  );
}

function PatientDetail({ patient, onClose }: { patient: Patient; onClose: () => void }) {
  const patientAppts = appointments
    .filter((a) => a.patientId === patient.id)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  const upcoming = patientAppts.filter((a) => new Date(a.date + "T00:00:00") >= new Date(TODAY + "T00:00:00") && a.status !== "cancelled");

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/40 p-4 animate-fade-in" role="dialog" aria-modal="true" aria-label={`Patient details — ${patient.name}`}>
      <div className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto animate-scale-in">
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200 sticky top-0 bg-white rounded-t-2xl">
          <h2 className="font-display font-bold text-slate-900 text-base">{patient.name}</h2>
          <button onClick={onClose} className="p-1.5 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-lbh-700" aria-label="Close">
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
          </button>
        </div>

        <div className="px-5 py-4 space-y-4">
          {/* Info grid */}
          <div className="grid grid-cols-2 gap-x-6 gap-y-3">
            <div><p className="text-xs text-slate-400 font-medium">Patient ID</p><p className="text-sm font-mono font-semibold text-slate-800 mt-0.5">{patient.id}</p></div>
            <div><p className="text-xs text-slate-400 font-medium">Status</p><span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium mt-0.5 ${patient.status === "active" ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-500"}`}>{patient.status}</span></div>
            <div><p className="text-xs text-slate-400 font-medium">Date of Birth</p><p className="text-sm text-slate-700 mt-0.5">{patient.dob}</p></div>
            <div><p className="text-xs text-slate-400 font-medium">Age</p><p className="text-sm text-slate-700 mt-0.5">{patient.age}</p></div>
            <div><p className="text-xs text-slate-400 font-medium">Contact</p><p className="text-sm text-slate-700 mt-0.5">{patient.phone}</p></div>
            <div><p className="text-xs text-slate-400 font-medium">Email</p><p className="text-sm text-slate-700 mt-0.5 break-all">{patient.email}</p></div>
            <div className="col-span-2"><p className="text-xs text-slate-400 font-medium">Address</p><p className="text-sm text-slate-700 mt-0.5">{patient.address}</p></div>
            <div><p className="text-xs text-slate-400 font-medium">Emergency Contact</p><p className="text-sm text-slate-700 mt-0.5">{patient.emergencyContact}</p></div>
            <div><p className="text-xs text-slate-400 font-medium">Emergency Phone</p><p className="text-sm text-slate-700 mt-0.5">{patient.emergencyPhone}</p></div>
          </div>

          <div className="border-t border-slate-100 pt-3">
            <p className="text-xs font-semibold font-display text-slate-500 uppercase tracking-wide mb-2">Scheduling</p>
            <div className="grid grid-cols-2 gap-3">
              <div><p className="text-xs text-slate-400">Frequency</p><p className="text-sm text-slate-800 font-medium">{patient.frequency}</p></div>
              <div><p className="text-xs text-slate-400">Regular shift</p><p className="text-sm text-slate-800 font-medium">{patient.shift}</p></div>
              <div><p className="text-xs text-slate-400">Regular machine</p><p className="text-sm font-mono text-slate-800 font-medium">{patient.machine}</p></div>
              <div><p className="text-xs text-slate-400">Patient since</p><p className="text-sm text-slate-800">{patient.since}</p></div>
            </div>
          </div>

          {patientAppts.length > 0 && (
            <div className="border-t border-slate-100 pt-3">
              <p className="text-xs font-semibold font-display text-slate-500 uppercase tracking-wide mb-2">Recent Appointments ({patientAppts.length})</p>
              <div className="space-y-2">
                {patientAppts.slice(0, 4).map((a) => {
                  const s = shifts.find((sh) => sh.id === a.shiftId);
                  return (
                    <div key={a.id} className="flex items-center justify-between text-xs">
                      <span className="text-slate-700">{a.date} · {s?.start}</span>
                      <span className={`px-2 py-0.5 rounded text-xs font-medium ${a.status === "completed" ? "bg-slate-100 text-slate-600" : a.status === "confirmed" ? "bg-lbh-100 text-lbh-700" : a.status === "checked-in" ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-600"}`}>
                        {a.status}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function AdminPatients() {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Patient | null>(null);

  const filtered = patients.filter((p) =>
    !search ||
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.id.toLowerCase().includes(search.toLowerCase()) ||
    p.phone.includes(search)
  );

  return (
    <div className="p-5 sm:p-7">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="font-display font-bold text-slate-900 text-2xl">Patients</h1>
          <p className="text-slate-500 text-sm mt-0.5">{patients.length} registered patients</p>
        </div>
      </div>

      {/* Search */}
      <div className="relative mb-5 max-w-sm">
        <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="#94a3b8" strokeWidth={2} className="absolute left-3 top-1/2 -translate-y-1/2" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
        <input
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name, ID, or phone…"
          className="w-full pl-9 pr-4 py-2.5 border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-lbh-700 focus:border-transparent"
          aria-label="Search patients"
        />
      </div>

      {/* Table */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
        <table className="w-full text-sm" role="table">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200">
              <th scope="col" className="text-left px-4 py-3 text-xs font-semibold font-display text-slate-400 uppercase tracking-wide">Patient</th>
              <th scope="col" className="text-left px-4 py-3 text-xs font-semibold font-display text-slate-400 uppercase tracking-wide hidden md:table-cell">Contact</th>
              <th scope="col" className="text-left px-4 py-3 text-xs font-semibold font-display text-slate-400 uppercase tracking-wide hidden lg:table-cell">Status</th>
              <th scope="col" className="text-left px-4 py-3 text-xs font-semibold font-display text-slate-400 uppercase tracking-wide hidden sm:table-cell">Appointments</th>
              <th scope="col" className="text-left px-4 py-3 text-xs font-semibold font-display text-slate-400 uppercase tracking-wide hidden lg:table-cell">Last Session</th>
              <th scope="col" className="text-right px-4 py-3 text-xs font-semibold font-display text-slate-400 uppercase tracking-wide">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filtered.length === 0 ? (
              <tr><td colSpan={6} className="text-center py-10 text-sm text-slate-400">No patients found</td></tr>
            ) : (
              filtered.map((p) => (
                <PatientRow key={p.id} patient={p} onClick={() => setSelected(p)} />
              ))
            )}
          </tbody>
        </table>
      </div>

      {selected && <PatientDetail patient={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}
