import { useState, useEffect, useRef } from "react";
import {
  shifts,
  machines,
  getShiftAvailability,
  getCalendarAvailability,
  generateConfirmationNumber,
  preparationInstructions,
  hospital,
} from "../config/data";
import type { User, Shift } from "../config/data";

interface PatientBookingProps {
  user: User | null;
  onDone: (page: string) => void;
}

type Step = "date" | "slot" | "patient" | "review" | "confirmed";

interface BookingState {
  date: string;
  shift: Shift | null;
  confirmationNumber: string;
  patientName: string;
  phone: string;
  email: string;
  notes: string;
}

// ── Calendar ────────────────────────────────────────────────────────────────

const MONTH_NAMES = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const DAY_LABELS = ["Su","Mo","Tu","We","Th","Fr","Sa"];

function Calendar({ onSelect, selected }: { onSelect: (date: string) => void; selected: string }) {
  const today = new Date("2026-09-08T00:00:00");
  const [viewing, setViewing] = useState({ year: 2026, month: 8 }); // Sep = 8

  const availability = getCalendarAvailability(viewing.year, viewing.month);
  const firstDay = new Date(viewing.year, viewing.month, 1).getDay();
  const daysInMonth = new Date(viewing.year, viewing.month + 1, 0).getDate();

  function prevMonth() {
    setViewing((v) => {
      const m = v.month - 1;
      return m < 0 ? { year: v.year - 1, month: 11 } : { year: v.year, month: m };
    });
  }
  function nextMonth() {
    setViewing((v) => {
      const m = v.month + 1;
      return m > 11 ? { year: v.year + 1, month: 0 } : { year: v.year, month: m };
    });
  }

  const cells: (number | null)[] = [...Array(firstDay).fill(null), ...Array.from({ length: daysInMonth }, (_, i) => i + 1)];
  while (cells.length % 7 !== 0) cells.push(null);

  return (
    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
        <button
          onClick={prevMonth}
          className="p-1.5 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-lbh-700"
          aria-label="Previous month"
        >
          <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"/></svg>
        </button>
        <p className="font-display font-bold text-slate-900 text-sm">
          {MONTH_NAMES[viewing.month]} {viewing.year}
        </p>
        <button
          onClick={nextMonth}
          className="p-1.5 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-lbh-700"
          aria-label="Next month"
        >
          <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/></svg>
        </button>
      </div>

      {/* Day labels */}
      <div className="grid grid-cols-7 border-b border-slate-100">
        {DAY_LABELS.map((d) => (
          <div key={d} className="text-center text-xs font-semibold font-display text-slate-400 py-2">
            {d}
          </div>
        ))}
      </div>

      {/* Days grid */}
      <div className="grid grid-cols-7 p-3 gap-1">
        {cells.map((day, idx) => {
          if (!day) return <div key={idx} aria-hidden="true" />;
          const dateStr = `${viewing.year}-${String(viewing.month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
          const avail = availability[dateStr];
          const isSelected = selected === dateStr;
          const isToday = dateStr === "2026-09-08";
          const isPast = avail === "past";
          const isFull = avail === "full";
          const disabled = isPast || isFull;

          return (
            <button
              key={idx}
              onClick={() => !disabled && onSelect(dateStr)}
              disabled={disabled}
              aria-label={`${MONTH_NAMES[viewing.month]} ${day}${isPast ? " — past" : isFull ? " — fully booked" : avail === "limited" ? " — limited availability" : " — available"}`}
              aria-pressed={isSelected}
              className={`relative h-9 w-full rounded-lg text-sm font-medium transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-lbh-700 ${
                isSelected
                  ? "bg-lbh-800 text-white font-bold"
                  : disabled
                  ? "text-slate-300 cursor-not-allowed"
                  : "text-slate-700 hover:bg-lbh-50 hover:text-lbh-900"
              } ${isToday && !isSelected ? "ring-2 ring-lbh-400 ring-offset-0" : ""}`}
            >
              {day}
              {!disabled && !isSelected && (
                <span
                  className={`absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full ${
                    avail === "limited" ? "bg-amber-400" : "bg-emerald-500"
                  }`}
                  aria-hidden="true"
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center gap-5 px-4 py-3 border-t border-slate-100 bg-slate-50 text-xs text-slate-500">
        <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-emerald-500" aria-hidden="true"/>Available</span>
        <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-amber-400" aria-hidden="true"/>Limited</span>
        <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-slate-300" aria-hidden="true"/>Unavailable</span>
      </div>
    </div>
  );
}

// ── Slot timer ──────────────────────────────────────────────────────────────

function SlotTimer({ seconds, onExpire }: { seconds: number; onExpire: () => void }) {
  const [remaining, setRemaining] = useState(seconds);
  const ref = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    ref.current = setInterval(() => {
      setRemaining((r) => {
        if (r <= 1) { clearInterval(ref.current!); onExpire(); return 0; }
        return r - 1;
      });
    }, 1000);
    return () => clearInterval(ref.current!);
  }, [onExpire]);

  const mins = Math.floor(remaining / 60);
  const secs = remaining % 60;
  const urgent = remaining < 120;

  return (
    <span className={`font-mono text-xs font-bold ${urgent ? "text-red-600" : "text-amber-700"}`}>
      {String(mins).padStart(2, "0")}:{String(secs).padStart(2, "0")}
    </span>
  );
}

// ── Step indicator ──────────────────────────────────────────────────────────

function StepIndicator({ step }: { step: Step }) {
  const steps: { id: Step; label: string; num: number }[] = [
    { id: "date",   label: "Date",    num: 1 },
    { id: "slot",   label: "Slot",    num: 2 },
    { id: "patient",label: "Details", num: 3 },
    { id: "review", label: "Review",  num: 4 },
  ];
  const cur = steps.find((s) => s.id === step)?.num ?? (step === "confirmed" ? 5 : 1);

  return (
    <nav aria-label="Booking steps" className="flex items-center">
      {steps.map((s, i) => {
        const done = cur > s.num;
        const active = cur === s.num;
        return (
          <div key={s.id} className="flex items-center">
            <div className="flex items-center gap-1.5">
              <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold font-display transition-all ${
                done ? "bg-lbh-800 text-white" : active ? "bg-lbh-800 text-white ring-4 ring-lbh-100" : "bg-slate-100 text-slate-400"
              }`} aria-current={active ? "step" : undefined}>
                {done ? (
                  <svg width="10" height="10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3} aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
                ) : s.num}
              </span>
              <span className={`text-xs font-semibold font-display hidden sm:block ${active ? "text-slate-900" : done ? "text-lbh-700" : "text-slate-400"}`}>
                {s.label}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div className={`mx-2 h-px w-6 sm:w-10 ${done ? "bg-lbh-800" : "bg-slate-200"}`} aria-hidden="true"/>
            )}
          </div>
        );
      })}
    </nav>
  );
}

// ── Main component ──────────────────────────────────────────────────────────

export default function PatientBooking({ user, onDone }: PatientBookingProps) {
  const [step, setStep] = useState<Step>("date");
  const [booking, setBooking] = useState<BookingState>({
    date: "",
    shift: null,
    confirmationNumber: "",
    patientName: user?.name ?? "",
    phone: "09171234567",
    email: user?.email ?? "",
    notes: "",
  });
  const [slotTimerActive, setSlotTimerActive] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof BookingState, string>>>({});

  function goBack() {
    const order: Step[] = ["date", "slot", "patient", "review", "confirmed"];
    const idx = order.indexOf(step);
    if (idx > 0) setStep(order[idx - 1] as Step);
    else onDone("portal");
  }

  function handleDateSelect(date: string) {
    setBooking((b) => ({ ...b, date, shift: null }));
    setStep("slot");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleSlotSelect(shift: Shift) {
    setBooking((b) => ({ ...b, shift }));
    setSlotTimerActive(true);
    setStep("patient");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleSlotExpire() {
    setSlotTimerActive(false);
    setBooking((b) => ({ ...b, shift: null }));
    setStep("slot");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function validatePatient() {
    const e: Partial<Record<keyof BookingState, string>> = {};
    if (!booking.patientName.trim()) e.patientName = "Name is required.";
    if (!booking.phone.trim()) e.phone = "Contact number is required.";
    if (!booking.email.trim()) e.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(booking.email)) e.email = "Enter a valid email.";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handlePatientNext(e: React.FormEvent) {
    e.preventDefault();
    if (validatePatient()) { setStep("review"); window.scrollTo({ top: 0, behavior: "smooth" }); }
  }

  function handleConfirm() {
    const num = generateConfirmationNumber();
    setBooking((b) => ({ ...b, confirmationNumber: num }));
    setSlotTimerActive(false);
    setStep("confirmed");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function formatDateDisplay(dateStr: string) {
    if (!dateStr) return "";
    const d = new Date(dateStr + "T00:00:00");
    return d.toLocaleDateString("en-PH", { weekday: "long", year: "numeric", month: "long", day: "numeric" });
  }

  // ── Confirmed ────────────────────────────────────────────────────────────

  if (step === "confirmed") {
    return (
      <main className="max-w-2xl mx-auto px-4 sm:px-6 py-10 animate-scale-in">
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-4" aria-hidden="true">
            <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="#059669" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
          </div>
          <h1 className="font-display font-bold text-slate-900 text-2xl sm:text-3xl">Appointment Confirmed</h1>
          <p className="text-slate-500 mt-1.5 text-sm">Your hemodialysis session has been scheduled.</p>
        </div>

        <div className="border border-slate-200 rounded-xl overflow-hidden mb-5">
          <div className="bg-lbh-900 px-6 py-4">
            <p className="text-lbh-300 text-xs font-semibold font-display uppercase tracking-wide">Appointment ID</p>
            <p className="text-white font-display font-bold text-xl mt-1 tracking-wide">{booking.confirmationNumber}</p>
          </div>
          <div className="bg-white px-6 py-5 grid grid-cols-2 gap-x-6 gap-y-4">
            <div><p className="text-xs text-slate-400 font-medium">Date</p><p className="text-sm font-semibold text-slate-900 mt-0.5">{booking.date ? formatDateDisplay(booking.date) : "—"}</p></div>
            <div><p className="text-xs text-slate-400 font-medium">Time</p><p className="text-sm font-semibold text-slate-900 mt-0.5">{booking.shift?.start} – {booking.shift?.end}</p></div>
            <div className="col-span-2"><p className="text-xs text-slate-400 font-medium">Location</p><p className="text-sm font-semibold text-slate-900 mt-0.5">{hospital.name}</p><p className="text-xs text-slate-500">{hospital.unit} · {hospital.address}</p></div>
            <div className="col-span-2"><p className="text-xs text-slate-400 font-medium">Patient</p><p className="text-sm font-semibold text-slate-900 mt-0.5">{booking.patientName}</p></div>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-3 mb-4">
          <button className="py-3 border-2 border-lbh-800 text-lbh-800 font-bold font-display rounded-lg text-sm hover:bg-lbh-50 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-lbh-700">Add to Calendar</button>
          <button onClick={() => onDone("portal-appointments")} className="py-3 border border-slate-200 text-slate-700 font-semibold font-display rounded-lg text-sm hover:bg-slate-50 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-lbh-700">View My Appointments</button>
        </div>
        <a href={`tel:${hospital.phone}`} className="block text-center py-2.5 border border-slate-200 text-slate-600 font-medium rounded-lg text-sm hover:bg-slate-50 transition-colors mb-6">Contact the Unit: {hospital.phone}</a>

        <div className="border border-slate-200 rounded-xl p-5">
          <h2 className="font-display font-semibold text-slate-900 text-sm mb-3">Preparation Instructions</h2>
          <ul className="space-y-2">
            {preparationInstructions.map((item, i) => (
              <li key={i} className="flex gap-2.5 text-sm text-slate-600">
                <span className="shrink-0 w-5 h-5 rounded-full bg-lbh-50 text-lbh-800 text-xs font-bold font-display flex items-center justify-center mt-0.5" aria-hidden="true">{i + 1}</span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-6 text-center">
          <button onClick={() => onDone("portal")} className="text-sm text-slate-400 hover:text-slate-600 transition-colors focus:outline-none focus-visible:underline">← Back to portal</button>
        </div>
      </main>
    );
  }

  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      {/* Header */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <button
            onClick={goBack}
            className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-700 transition-colors mb-2.5 focus:outline-none focus-visible:underline"
          >
            <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"/></svg>
            {step === "date" ? "Back to portal" : "Back"}
          </button>
          <h1 className="font-display font-bold text-slate-900 text-2xl">
            {step === "date" && "Choose a Date"}
            {step === "slot" && "Select a Slot"}
            {step === "patient" && "Your Details"}
            {step === "review" && "Review Booking"}
          </h1>
        </div>
        <StepIndicator step={step} />
      </div>

      {/* ── Step: Date ─────────────────────────────────────────────────── */}
      {step === "date" && (
        <div className="max-w-sm animate-fade-in">
          <p className="text-slate-500 text-sm mb-5">
            Select a date for your hemodialysis session. Available dates are shown with a colored indicator.
          </p>
          <Calendar onSelect={handleDateSelect} selected={booking.date} />
        </div>
      )}

      {/* ── Step: Slot ─────────────────────────────────────────────────── */}
      {step === "slot" && (
        <div className="animate-fade-in">
          <div className="flex items-center gap-2 mb-5">
            <div className="w-5 h-5 rounded bg-lbh-50 border border-lbh-200 flex items-center justify-center" aria-hidden="true">
              <svg width="10" height="10" fill="none" viewBox="0 0 24 24" stroke="#1f30ab" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
            </div>
            <p className="font-display font-semibold text-slate-900 text-sm">{booking.date ? formatDateDisplay(booking.date) : ""}</p>
          </div>

          <div className="space-y-3 max-w-2xl">
            {shifts.map((shift) => {
              const { total, booked, available } = getShiftAvailability(booking.date, shift.id);
              const full = available === 0;
              const limited = available <= 3 && available > 0;

              return (
                <div
                  key={shift.id}
                  className={`border rounded-xl p-4 transition-all ${
                    full ? "border-slate-100 bg-slate-50 opacity-60" : "border-slate-200 bg-white hover:border-lbh-300 hover:shadow-sm"
                  }`}
                >
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2 mb-0.5">
                        <p className="font-display font-bold text-slate-900 text-base">{shift.period}</p>
                        <span className="text-slate-300 text-xs" aria-hidden="true">·</span>
                        <p className="text-slate-500 text-xs font-mono">{shift.start} – {shift.end}</p>
                      </div>
                      <p className="text-xs text-slate-400">{shift.name} · 4-hour hemodialysis session</p>
                      <div className="mt-2">
                        {full ? (
                          <span className="inline-flex items-center gap-1.5 text-xs font-medium bg-slate-100 text-slate-500 px-2.5 py-1 rounded-full">
                            <span className="w-1.5 h-1.5 rounded-full bg-slate-400 inline-block" aria-hidden="true"/>Fully booked
                          </span>
                        ) : limited ? (
                          <span className="inline-flex items-center gap-1.5 text-xs font-medium bg-amber-50 text-amber-700 border border-amber-200 px-2.5 py-1 rounded-full">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 inline-block" aria-hidden="true"/>{available} slot{available !== 1 ? "s" : ""} remaining
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200 px-2.5 py-1 rounded-full">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" aria-hidden="true"/>Available · {available} of {total} open
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="shrink-0">
                      {full ? (
                        <span className="px-4 py-2 text-sm font-medium text-slate-400 bg-slate-100 rounded-lg cursor-not-allowed select-none">Unavailable</span>
                      ) : (
                        <button
                          onClick={() => handleSlotSelect(shift)}
                          className="px-4 py-2 bg-lbh-800 hover:bg-lbh-900 text-white text-sm font-bold font-display rounded-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-lbh-700 focus-visible:ring-offset-2"
                        >
                          Select
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ── Step: Patient ──────────────────────────────────────────────── */}
      {step === "patient" && (
        <form onSubmit={handlePatientNext} noValidate className="animate-fade-in max-w-2xl">
          {/* Slot reservation timer */}
          {slotTimerActive && booking.shift && (
            <div className="mb-5 flex items-center gap-3 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3">
              <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="#d97706" strokeWidth={2} aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
              <p className="text-xs text-amber-800">
                Slot held for you ·{" "}
                <SlotTimer seconds={600} onExpire={handleSlotExpire} />
                {" "}remaining
              </p>
            </div>
          )}

          <div className="border border-slate-200 rounded-xl p-5 sm:p-6 mb-4">
            <h2 className="font-display font-semibold text-slate-900 text-base mb-4">Patient Details</h2>
            {user && (
              <div className="mb-4 flex items-start gap-2 bg-lbh-50 border border-lbh-100 rounded-lg px-3 py-2.5 text-xs text-lbh-800">
                <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className="shrink-0 mt-0.5" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                Your details have been pre-filled. Please verify they are correct.
              </div>
            )}
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2 flex flex-col gap-1.5">
                <label htmlFor="pb-name" className="text-xs font-semibold text-slate-700">Full name <span className="text-lbh-700" aria-label="required">*</span></label>
                <input id="pb-name" type="text" autoComplete="name" value={booking.patientName} onChange={(e) => setBooking({ ...booking, patientName: e.target.value })} className={`border rounded-lg px-3 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-lbh-700 focus:border-transparent ${errors.patientName ? "border-red-400" : "border-slate-200"}`} aria-invalid={!!errors.patientName} />
                {errors.patientName && <p role="alert" className="text-xs text-red-600">{errors.patientName}</p>}
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="pb-phone" className="text-xs font-semibold text-slate-700">Contact number <span className="text-lbh-700" aria-label="required">*</span></label>
                <input id="pb-phone" type="tel" autoComplete="tel" value={booking.phone} onChange={(e) => setBooking({ ...booking, phone: e.target.value })} className={`border rounded-lg px-3 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-lbh-700 focus:border-transparent ${errors.phone ? "border-red-400" : "border-slate-200"}`} aria-invalid={!!errors.phone} />
                {errors.phone && <p role="alert" className="text-xs text-red-600">{errors.phone}</p>}
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="pb-email" className="text-xs font-semibold text-slate-700">Email address <span className="text-lbh-700" aria-label="required">*</span></label>
                <input id="pb-email" type="email" autoComplete="email" value={booking.email} onChange={(e) => setBooking({ ...booking, email: e.target.value })} className={`border rounded-lg px-3 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-lbh-700 focus:border-transparent ${errors.email ? "border-red-400" : "border-slate-200"}`} aria-invalid={!!errors.email} />
                {errors.email && <p role="alert" className="text-xs text-red-600">{errors.email}</p>}
              </div>
              <div className="sm:col-span-2 flex flex-col gap-1.5">
                <label htmlFor="pb-notes" className="text-xs font-semibold text-slate-700">Notes <span className="text-slate-400 font-normal">(optional)</span></label>
                <textarea id="pb-notes" rows={2} value={booking.notes} onChange={(e) => setBooking({ ...booking, notes: e.target.value })} placeholder="Any notes for the unit" className="border border-slate-200 rounded-lg px-3 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-lbh-700 focus:border-transparent resize-none" />
              </div>
            </div>
          </div>

          <button type="submit" className="w-full py-3 bg-lbh-800 hover:bg-lbh-900 text-white font-bold font-display rounded-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-lbh-700 focus-visible:ring-offset-2">
            Continue to Review
          </button>
        </form>
      )}

      {/* ── Step: Review ───────────────────────────────────────────────── */}
      {step === "review" && (
        <div className="animate-fade-in max-w-2xl">
          <p className="text-slate-500 text-sm mb-5">Please review your booking details before confirming.</p>

          <div className="border border-slate-200 rounded-xl overflow-hidden mb-4">
            <div className="bg-slate-50 px-5 py-3 border-b border-slate-200">
              <p className="font-display font-semibold text-slate-800 text-sm">Your Dialysis Appointment</p>
            </div>
            <div className="px-5 py-4 space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-slate-500 font-medium">Date</span>
                <span className="text-slate-900 font-semibold">{booking.date ? formatDateDisplay(booking.date) : "—"}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500 font-medium">Time</span>
                <span className="text-slate-900 font-semibold">{booking.shift?.start} – {booking.shift?.end}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500 font-medium">Service</span>
                <span className="text-slate-900">Hemodialysis · 4 hours</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500 font-medium">Location</span>
                <span className="text-slate-900 text-right max-w-[60%]">{hospital.name}, {hospital.unit}</span>
              </div>
            </div>
          </div>

          <div className="border border-slate-200 rounded-xl overflow-hidden mb-5">
            <div className="bg-slate-50 px-5 py-3 border-b border-slate-200">
              <p className="font-display font-semibold text-slate-800 text-sm">Patient</p>
            </div>
            <div className="px-5 py-4 space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-slate-500 font-medium">Name</span><span className="text-slate-900">{booking.patientName}</span></div>
              <div className="flex justify-between"><span className="text-slate-500 font-medium">Contact</span><span className="text-slate-900">{booking.phone}</span></div>
              <div className="flex justify-between"><span className="text-slate-500 font-medium">Email</span><span className="text-slate-900">{booking.email}</span></div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <button onClick={handleConfirm} className="flex-1 py-3 bg-lbh-800 hover:bg-lbh-900 text-white font-bold font-display rounded-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-lbh-700 focus-visible:ring-offset-2">
              Confirm Appointment
            </button>
            <button onClick={() => setStep("slot")} className="sm:w-40 py-3 border border-slate-200 text-slate-600 font-semibold font-display rounded-lg hover:bg-slate-50 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-lbh-700">
              Change Schedule
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
