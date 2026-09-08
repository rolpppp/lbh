import { weeklyStats, monthlyStats, appointments } from "../config/data";

const TODAY = "2026-09-08";

// Simple inline SVG bar chart
function BarChart({
  data,
  valueKey,
  maxValue,
  color = "#1f30ab",
  height = 80,
}: {
  data: Record<string, unknown>[];
  labelKey: string;
  valueKey: string;
  maxValue: number;
  color?: string;
  height?: number;
}) {
  return (
    <div className="flex items-end gap-1" style={{ height }} aria-hidden="true">
      {data.map((item, i) => {
        const val = item[valueKey] as number;
        const barH = maxValue > 0 ? (val / maxValue) * height : 0;
        return (
          <div key={i} className="flex-1 flex flex-col items-center gap-0.5">
            <div
              className="w-full rounded-t-sm transition-all"
              style={{ height: `${barH}px`, backgroundColor: color, minHeight: 2 }}
              title={`${item[valueKey]}`}
            />
          </div>
        );
      })}
    </div>
  );
}

export default function AdminReports() {
  const todaysAppts = appointments.filter((a) => a.date === TODAY);
  const allAppts = appointments;

  const statusCounts = {
    confirmed: allAppts.filter((a) => a.status === "confirmed").length,
    completed: allAppts.filter((a) => a.status === "completed").length,
    cancelled: allAppts.filter((a) => a.status === "cancelled").length,
    pending: allAppts.filter((a) => a.status === "pending").length,
    checkedIn: allAppts.filter((a) => a.status === "checked-in").length,
  };

  const totalThisWeek = weeklyStats.reduce((s, d) => s + d.total, 0);
  const cancelledThisWeek = weeklyStats.reduce((s, d) => s + d.cancelled, 0);
  const cancelRate = totalThisWeek > 0 ? ((cancelledThisWeek / totalThisWeek) * 100).toFixed(1) : "0";
  const maxWeeklyTotal = Math.max(...weeklyStats.map((d) => d.total));
  const maxMonthly = Math.max(...monthlyStats.map((d) => d.sessions));

  return (
    <div className="p-5 sm:p-7 max-w-5xl mx-auto">
      <div className="mb-6">
        <h1 className="font-display font-bold text-slate-900 text-2xl">Reports</h1>
        <p className="text-slate-500 text-sm mt-0.5">Session and appointment statistics</p>
      </div>

      {/* Summary stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-7">
        {[
          { label: "This week", value: totalThisWeek, sub: "sessions" },
          { label: "Cancellation rate", value: `${cancelRate}%`, sub: "this week" },
          { label: "Sep to date", value: monthlyStats.at(-1)?.sessions ?? 0, sub: "sessions" },
          { label: "YTD (approx)", value: monthlyStats.reduce((s, d) => s + d.sessions, 0), sub: "sessions" },
        ].map((s) => (
          <div key={s.label} className="bg-white border border-slate-200 rounded-xl p-4">
            <p className="font-display font-bold text-2xl text-slate-900">{s.value}</p>
            <p className="text-xs text-slate-400 mt-0.5">{s.label}</p>
            <p className="text-xs text-slate-300">{s.sub}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-5 mb-7">
        {/* Weekly chart */}
        <div className="bg-white border border-slate-200 rounded-xl p-5">
          <h2 className="font-display font-semibold text-slate-800 text-sm mb-1">This Week — Daily Sessions</h2>
          <p className="text-xs text-slate-400 mb-4">Total sessions per day</p>
          <BarChart
            data={weeklyStats}
            labelKey="day"
            valueKey="total"
            maxValue={maxWeeklyTotal}
            color="#1f30ab"
            height={80}
          />
          <div className="flex gap-1 mt-2">
            {weeklyStats.map((d) => (
              <div key={d.day} className="flex-1 text-center text-xs text-slate-400">{d.day}</div>
            ))}
          </div>
          <div className="flex gap-4 mt-3 text-xs text-slate-500">
            {weeklyStats.map((d) => (
              <div key={d.day} className="flex-1 text-center font-medium">{d.total}</div>
            ))}
          </div>
        </div>

        {/* Monthly chart */}
        <div className="bg-white border border-slate-200 rounded-xl p-5">
          <h2 className="font-display font-semibold text-slate-800 text-sm mb-1">Monthly Sessions</h2>
          <p className="text-xs text-slate-400 mb-4">Apr – Sep 2026</p>
          <BarChart
            data={monthlyStats}
            labelKey="month"
            valueKey="sessions"
            maxValue={maxMonthly}
            color="#2038d3"
            height={80}
          />
          <div className="flex gap-1 mt-2">
            {monthlyStats.map((d) => (
              <div key={d.month} className="flex-1 text-center text-xs text-slate-400">{d.month}</div>
            ))}
          </div>
          <div className="flex gap-4 mt-3 text-xs text-slate-500">
            {monthlyStats.map((d) => (
              <div key={d.month} className="flex-1 text-center font-medium">{d.sessions}</div>
            ))}
          </div>
        </div>
      </div>

      {/* Appointment status breakdown */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 mb-5">
        <h2 className="font-display font-semibold text-slate-800 text-sm mb-4">Appointment Status Breakdown — All Time</h2>
        <div className="space-y-2">
          {[
            { label: "Completed",   count: statusCounts.completed,  color: "bg-slate-400", total: allAppts.length },
            { label: "Confirmed",   count: statusCounts.confirmed,  color: "bg-lbh-600",   total: allAppts.length },
            { label: "Pending",     count: statusCounts.pending,    color: "bg-amber-400", total: allAppts.length },
            { label: "Checked In",  count: statusCounts.checkedIn,  color: "bg-emerald-500", total: allAppts.length },
            { label: "Cancelled",   count: statusCounts.cancelled,  color: "bg-red-400",   total: allAppts.length },
          ].map((item) => {
            const pct = item.total > 0 ? (item.count / item.total) * 100 : 0;
            return (
              <div key={item.label} className="flex items-center gap-3">
                <span className="w-20 text-xs text-slate-500 text-right shrink-0">{item.label}</span>
                <div className="flex-1 bg-slate-100 rounded-full h-2 overflow-hidden">
                  <div className={`h-full rounded-full ${item.color}`} style={{ width: `${pct}%` }} aria-hidden="true" />
                </div>
                <span className="w-10 text-xs font-semibold text-slate-700 text-right shrink-0">{item.count}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Today detailed */}
      <div className="bg-white border border-slate-200 rounded-xl p-5">
        <h2 className="font-display font-semibold text-slate-800 text-sm mb-3">Today — {new Date(TODAY + "T00:00:00").toLocaleDateString("en-PH", { month: "long", day: "numeric", year: "numeric" })}</h2>
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: "Booked",     value: todaysAppts.length },
            { label: "Confirmed",  value: todaysAppts.filter((a) => a.status === "confirmed").length },
            { label: "Checked In", value: todaysAppts.filter((a) => a.status === "checked-in").length },
          ].map((s) => (
            <div key={s.label} className="bg-slate-50 border border-slate-100 rounded-lg p-3 text-center">
              <p className="font-display font-bold text-xl text-slate-900">{s.value}</p>
              <p className="text-xs text-slate-400">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
