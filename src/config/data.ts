// ─── Hospital ────────────────────────────────────────────────────────────────

export const hospital = {
  name: "Leyte Baptist Hospital",
  unit: "Hemodialysis Unit",
  shortName: "LBH",
  address: "Gov. A.D. Curato St., Tacloban City, Leyte 6500",
  phone: "+63 53 321 2000",
  fax: "+63 53 321 2002",
  email: "hdu@lbh.ph",
  website: "lbh.ph",
  hours: "Monday to Saturday, 6:00 AM – 9:00 PM",
  emergencyPhone: "+63 53 321 2001",
  machines: 12,
  accreditations: ["PhilHealth Accredited", "DOH Licensed"],
};

// Powered-by signature
export const platform = {
  name: "NephroBook",
  tagline: "Dialysis scheduling platform",
};

// ─── Shifts ──────────────────────────────────────────────────────────────────

export interface Shift {
  id: string;
  name: string;
  start: string;
  end: string;
  period: "Morning" | "Afternoon" | "Evening";
}

export const shifts: Shift[] = [
  { id: "S1", name: "First Shift", start: "6:00 AM", end: "10:00 AM", period: "Morning" },
  { id: "S2", name: "Second Shift", start: "10:00 AM", end: "2:00 PM", period: "Morning" },
  { id: "S3", name: "Third Shift", start: "2:00 PM", end: "6:00 PM", period: "Afternoon" },
  { id: "S4", name: "Fourth Shift", start: "6:00 PM", end: "10:00 PM", period: "Evening" },
];

// ─── Machines ────────────────────────────────────────────────────────────────

export interface Machine {
  id: string;
  label: string;
}

export const machines: Machine[] = Array.from({ length: 12 }, (_, i) => ({
  id: `HD-${String(i + 1).padStart(2, "0")}`,
  label: `HD-${String(i + 1).padStart(2, "0")}`,
}));

// ─── Demo Users ──────────────────────────────────────────────────────────────

export type UserRole = "patient" | "staff" | "admin";

export interface User {
  id: string;
  name: string;
  role: UserRole;
  email: string;
  patientId?: string;
}

export const demoUsers: { email: string; password: string; user: User }[] = [
  {
    email: "patient@lbh.ph",
    password: "demo123",
    user: { id: "U-001", name: "Rolf Garces", role: "patient", email: "patient@lbh.ph", patientId: "P-001" },
  },
  {
    email: "maria@lbh.ph",
    password: "demo123",
    user: { id: "U-002", name: "Maria Santos", role: "patient", email: "maria@lbh.ph", patientId: "P-002" },
  },
  {
    email: "staff@lbh.ph",
    password: "demo123",
    user: { id: "U-003", name: "Nurse Ana Reyes", role: "staff", email: "staff@lbh.ph" },
  },
  {
    email: "admin@lbh.ph",
    password: "demo123",
    user: { id: "U-004", name: "Dr. James Bautista", role: "admin", email: "admin@lbh.ph" },
  },
];

// ─── Patients ────────────────────────────────────────────────────────────────

export interface Patient {
  id: string;
  name: string;
  dob: string;
  age: number;
  phone: string;
  email: string;
  address: string;
  emergencyContact: string;
  emergencyPhone: string;
  status: "active" | "inactive";
  since: string;
  frequency: string;
  shift: string;
  machine: string;
}

export const patients: Patient[] = [
  { id: "P-001", name: "Rolf Garces", dob: "1960-03-15", age: 66, phone: "09171234567", email: "rolf.garces@email.com", address: "Magsaysay Blvd, Tacloban City", emergencyContact: "Lisa Garces", emergencyPhone: "09179876543", status: "active", since: "Jan 2024", frequency: "3x per week", shift: "S1", machine: "HD-01" },
  { id: "P-002", name: "Maria Santos", dob: "1965-07-22", age: 61, phone: "09176543210", email: "maria.santos@email.com", address: "Gomez St., Tacloban City", emergencyContact: "Pedro Santos", emergencyPhone: "09172345678", status: "active", since: "Mar 2023", frequency: "3x per week", shift: "S1", machine: "HD-02" },
  { id: "P-003", name: "Juan Dela Cruz", dob: "1958-11-08", age: 67, phone: "09181234567", email: "juan.delacruz@email.com", address: "P. Burgos St., Tacloban City", emergencyContact: "Ana Dela Cruz", emergencyPhone: "09185678901", status: "active", since: "Jun 2022", frequency: "3x per week", shift: "S1", machine: "HD-03" },
  { id: "P-004", name: "Elena Manalo", dob: "1970-05-14", age: 56, phone: "09192345678", email: "elena.manalo@email.com", address: "Real St., Tacloban City", emergencyContact: "Carlo Manalo", emergencyPhone: "09198765432", status: "active", since: "Sep 2023", frequency: "3x per week", shift: "S2", machine: "HD-04" },
  { id: "P-005", name: "Ricardo Flores", dob: "1952-09-30", age: 73, phone: "09203456789", email: "ricardo.flores@email.com", address: "Rizal Ave., Tacloban City", emergencyContact: "Carmen Flores", emergencyPhone: "09209876543", status: "active", since: "Apr 2021", frequency: "3x per week", shift: "S2", machine: "HD-05" },
  { id: "P-006", name: "Carmen Reyes", dob: "1967-12-01", age: 58, phone: "09214567890", email: "carmen.reyes@email.com", address: "Zamora St., Tacloban City", emergencyContact: "Jose Reyes", emergencyPhone: "09210987654", status: "active", since: "Nov 2023", frequency: "3x per week", shift: "S2", machine: "HD-06" },
  { id: "P-007", name: "Antonio Bernabe", dob: "1955-04-20", age: 71, phone: "09225678901", email: "antonio.bernabe@email.com", address: "Sto. Niño St., Tacloban City", emergencyContact: "Lucia Bernabe", emergencyPhone: "09221098765", status: "active", since: "Feb 2022", frequency: "2x per week", shift: "S3", machine: "HD-07" },
  { id: "P-008", name: "Lourdes Castillo", dob: "1972-08-17", age: 53, phone: "09236789012", email: "lourdes.castillo@email.com", address: "Paterno St., Tacloban City", emergencyContact: "Ernesto Castillo", emergencyPhone: "09232109876", status: "active", since: "Jul 2023", frequency: "3x per week", shift: "S3", machine: "HD-08" },
];

// ─── Appointments ────────────────────────────────────────────────────────────

export type AppointmentStatus = "pending" | "confirmed" | "checked-in" | "completed" | "cancelled" | "no-show" | "rescheduled";

export interface Appointment {
  id: string;
  confirmationNumber: string;
  patientId: string;
  patientName: string;
  date: string;
  shiftId: string;
  machineId: string;
  status: AppointmentStatus;
  createdAt: string;
  notes?: string;
  checkedInAt?: string;
}

// Today: 2026-09-08
const TODAY = "2026-09-08";

export const appointments: Appointment[] = [
  // Today - S1 (6-10 AM)
  { id: "A001", confirmationNumber: "LBH-HD-090801", patientId: "P-001", patientName: "Rolf Garces", date: TODAY, shiftId: "S1", machineId: "HD-01", status: "checked-in", createdAt: "2026-09-05", checkedInAt: "5:52 AM" },
  { id: "A002", confirmationNumber: "LBH-HD-090802", patientId: "P-002", patientName: "Maria Santos", date: TODAY, shiftId: "S1", machineId: "HD-02", status: "checked-in", createdAt: "2026-09-05", checkedInAt: "5:58 AM" },
  { id: "A003", confirmationNumber: "LBH-HD-090803", patientId: "P-003", patientName: "Juan Dela Cruz", date: TODAY, shiftId: "S1", machineId: "HD-03", status: "confirmed", createdAt: "2026-09-05" },
  // Today - S2 (10 AM - 2 PM)
  { id: "A004", confirmationNumber: "LBH-HD-090804", patientId: "P-004", patientName: "Elena Manalo", date: TODAY, shiftId: "S2", machineId: "HD-04", status: "confirmed", createdAt: "2026-09-06" },
  { id: "A005", confirmationNumber: "LBH-HD-090805", patientId: "P-005", patientName: "Ricardo Flores", date: TODAY, shiftId: "S2", machineId: "HD-05", status: "confirmed", createdAt: "2026-09-06" },
  { id: "A006", confirmationNumber: "LBH-HD-090806", patientId: "P-006", patientName: "Carmen Reyes", date: TODAY, shiftId: "S2", machineId: "HD-06", status: "pending", createdAt: "2026-09-07" },
  // Today - S3 (2-6 PM)
  { id: "A007", confirmationNumber: "LBH-HD-090807", patientId: "P-007", patientName: "Antonio Bernabe", date: TODAY, shiftId: "S3", machineId: "HD-07", status: "confirmed", createdAt: "2026-09-05" },
  { id: "A008", confirmationNumber: "LBH-HD-090808", patientId: "P-008", patientName: "Lourdes Castillo", date: TODAY, shiftId: "S3", machineId: "HD-08", status: "confirmed", createdAt: "2026-09-05" },
  // Upcoming - Sep 10
  { id: "A009", confirmationNumber: "LBH-HD-091001", patientId: "P-001", patientName: "Rolf Garces", date: "2026-09-10", shiftId: "S1", machineId: "HD-01", status: "confirmed", createdAt: "2026-09-07" },
  { id: "A010", confirmationNumber: "LBH-HD-091002", patientId: "P-002", patientName: "Maria Santos", date: "2026-09-10", shiftId: "S1", machineId: "HD-02", status: "confirmed", createdAt: "2026-09-07" },
  { id: "A011", confirmationNumber: "LBH-HD-091003", patientId: "P-003", patientName: "Juan Dela Cruz", date: "2026-09-10", shiftId: "S1", machineId: "HD-03", status: "confirmed", createdAt: "2026-09-07" },
  // Upcoming - Sep 12
  { id: "A012", confirmationNumber: "LBH-HD-091201", patientId: "P-001", patientName: "Rolf Garces", date: "2026-09-12", shiftId: "S1", machineId: "HD-01", status: "confirmed", createdAt: "2026-09-07" },
  // Past
  { id: "A013", confirmationNumber: "LBH-HD-090301", patientId: "P-001", patientName: "Rolf Garces", date: "2026-09-03", shiftId: "S1", machineId: "HD-01", status: "completed", createdAt: "2026-09-01" },
  { id: "A014", confirmationNumber: "LBH-HD-090501", patientId: "P-001", patientName: "Rolf Garces", date: "2026-09-05", shiftId: "S1", machineId: "HD-01", status: "completed", createdAt: "2026-09-02" },
  { id: "A015", confirmationNumber: "LBH-HD-090601", patientId: "P-002", patientName: "Maria Santos", date: "2026-09-06", shiftId: "S1", machineId: "HD-02", status: "cancelled", createdAt: "2026-09-03" },
];

// ─── Schedule helpers ─────────────────────────────────────────────────────────

export interface SlotEntry {
  machineId: string;
  shiftId: string;
  date: string;
  appointment: Appointment | null;
  status: AppointmentStatus | "available";
}

export function getScheduleForDate(date: string): SlotEntry[] {
  const result: SlotEntry[] = [];
  for (const shift of shifts) {
    for (const machine of machines) {
      const appt = appointments.find(
        (a) => a.date === date && a.shiftId === shift.id && a.machineId === machine.id
      );
      result.push({
        machineId: machine.id,
        shiftId: shift.id,
        date,
        appointment: appt ?? null,
        status: appt ? appt.status : "available",
      });
    }
  }
  return result;
}

export function getShiftAvailability(date: string, shiftId: string): { total: number; booked: number; available: number } {
  const total = machines.length;
  const booked = appointments.filter(
    (a) => a.date === date && a.shiftId === shiftId && a.status !== "cancelled"
  ).length;
  return { total, booked, available: total - booked };
}

export function getCalendarAvailability(year: number, month: number): Record<string, "available" | "limited" | "full" | "past"> {
  const today = new Date(TODAY);
  const result: Record<string, "available" | "limited" | "full" | "past"> = {};
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  for (let day = 1; day <= daysInMonth; day++) {
    const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    const d = new Date(dateStr);
    if (d < today) { result[dateStr] = "past"; continue; }
    const dow = d.getDay();
    if (dow === 0) { result[dateStr] = "full"; continue; } // closed Sundays
    // Mock availability based on date hash
    const hash = (day * 7 + month * 3) % 10;
    result[dateStr] = hash < 2 ? "full" : hash < 5 ? "limited" : "available";
  }
  return result;
}

export function getPatientAppointments(patientId: string): { upcoming: Appointment[]; past: Appointment[] } {
  const today = new Date(TODAY);
  const sorted = [...appointments].filter((a) => a.patientId === patientId).sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );
  return {
    upcoming: sorted.filter((a) => new Date(a.date) >= today && a.status !== "cancelled"),
    past: sorted.filter((a) => new Date(a.date) < today || a.status === "completed" || a.status === "cancelled"),
  };
}

export function generateConfirmationNumber(): string {
  const d = new Date(TODAY);
  const date = `${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, "0")}${String(d.getDate()).padStart(2, "0")}`;
  const rand = Math.floor(1000 + Math.random() * 9000);
  return `LBH-HD-${date.slice(4)}${rand}`;
}

// ─── Admin alerts ────────────────────────────────────────────────────────────

export interface Alert {
  id: string;
  type: "warning" | "info" | "error";
  message: string;
}

export const adminAlerts: Alert[] = [
  { id: "AL1", type: "warning", message: "2 appointments awaiting confirmation" },
  { id: "AL2", type: "info", message: "1 patient cancellation submitted" },
  { id: "AL3", type: "warning", message: "HD-09 scheduled maintenance tomorrow" },
];

// ─── Content ──────────────────────────────────────────────────────────────────

export const faqs = [
  {
    q: "How do I book a dialysis session?",
    a: "Log in to the Patient Portal, click 'Book a Session', choose your preferred date, select an available slot, confirm your details, and you're done. Your confirmation will be shown on screen and sent to your email.",
  },
  {
    q: "How early should I arrive?",
    a: "Please arrive at least 15 minutes before your scheduled session. This allows our staff to check you in, prepare your station, and review your information before starting.",
  },
  {
    q: "Can I reschedule my appointment?",
    a: "Yes. You can reschedule up to 24 hours before your session from the Patient Portal. Select the appointment and choose 'Reschedule' to pick a new available slot.",
  },
  {
    q: "What should I bring?",
    a: "Bring your PhilHealth ID or MDR, any prescribed medications, a valid ID, and comfortable clothing that allows easy access to your fistula or catheter. You may also bring a light snack and entertainment for the duration.",
  },
  {
    q: "How do I contact the Hemodialysis Unit?",
    a: `Call us at ${hospital.phone} or email ${hospital.email}. Our unit is open ${hospital.hours}.`,
  },
  {
    q: "What if I need to cancel?",
    a: "You can cancel from the Patient Portal up to 24 hours before your session. For urgent same-day cancellations, please call the unit directly so we can offer the slot to another patient.",
  },
];

export const preparationInstructions = [
  "Arrive at least 15 minutes before your session.",
  "Bring your PhilHealth ID or MDR for coverage processing.",
  "Follow your prescribed fluid and dietary restrictions.",
  "Wear loose, comfortable clothing — ideally with easy arm access.",
  "Bring any regularly scheduled medications.",
  "You may bring a light snack, water, reading material, or headphones.",
  "Inform the staff immediately if you feel unwell upon arrival.",
];

// ─── Reports mock data ────────────────────────────────────────────────────────

export const weeklyStats = [
  { day: "Mon", total: 22, confirmed: 20, cancelled: 2 },
  { day: "Tue", total: 24, confirmed: 23, cancelled: 1 },
  { day: "Wed", total: 21, confirmed: 19, cancelled: 2 },
  { day: "Thu", total: 24, confirmed: 24, cancelled: 0 },
  { day: "Fri", total: 23, confirmed: 21, cancelled: 2 },
  { day: "Sat", total: 18, confirmed: 17, cancelled: 1 },
];

export const monthlyStats = [
  { month: "Apr", sessions: 418 },
  { month: "May", sessions: 431 },
  { month: "Jun", sessions: 409 },
  { month: "Jul", sessions: 445 },
  { month: "Aug", sessions: 438 },
  { month: "Sep", sessions: 132 },
];
