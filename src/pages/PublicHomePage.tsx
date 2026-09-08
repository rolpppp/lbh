import { useState } from "react";
import { hospital, faqs, preparationInstructions } from "../config/data";

interface PublicHomePageProps {
  onBook: () => void;
  onLogin: () => void;
  activePage: string;
}

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-slate-200 rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left hover:bg-slate-50 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-lbh-700"
        aria-expanded={open}
      >
        <p className="font-display font-semibold text-slate-900 text-sm">{q}</p>
        <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className={`shrink-0 text-slate-400 transition-transform ${open ? "rotate-180" : ""}`} aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"/>
        </svg>
      </button>
      {open && (
        <div className="border-t border-slate-100 bg-slate-50 px-5 py-4 animate-fade-in">
          <p className="text-sm text-slate-600 leading-relaxed">{a}</p>
        </div>
      )}
    </div>
  );
}

export default function PublicHomePage({ onBook, onLogin, activePage }: PublicHomePageProps) {
  const showFaq = activePage === "faq";
  const showUnit = activePage === "unit";
  const showContact = activePage === "contact";

  return (
    <main>
      {/* Hero */}
      <section className="bg-lbh-900 text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14 sm:py-20">
          <div className="max-w-2xl">
            <p className="text-lbh-300 text-sm font-semibold font-display uppercase tracking-wider mb-3">
              {hospital.unit}
            </p>
            <h1 className="font-display font-bold text-white text-4xl sm:text-5xl leading-tight mb-4">
              Hemodialysis Care<br className="hidden sm:block"/>
              at {hospital.name}
            </h1>
            <p className="text-lbh-200 text-lg leading-relaxed mb-8 max-w-lg">
              Manage your dialysis appointments, view available schedules, and stay informed about your care.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={onBook}
                className="px-6 py-3 bg-white text-lbh-900 font-bold font-display rounded-lg text-base hover:bg-lbh-50 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                Book a Dialysis Session
              </button>
              <button
                onClick={onLogin}
                className="px-6 py-3 border-2 border-white/30 hover:border-white/60 text-white font-semibold font-display rounded-lg text-base transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                Patient Portal
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Trust bar */}
      <section className="bg-lbh-950 text-lbh-300">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex flex-wrap gap-x-8 gap-y-1 items-center text-xs font-medium">
            <span>{hospital.accreditations.join(" · ")}</span>
            <span>{hospital.machines} dialysis machines</span>
            <span>{hospital.hours}</span>
          </div>
        </div>
      </section>

      {/* Unit Info */}
      {(activePage === "home" || showUnit) && (
        <section className="bg-white py-12 border-b border-slate-200" id="unit">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="grid lg:grid-cols-2 gap-10">
              <div>
                <h2 className="font-display font-bold text-slate-900 text-2xl mb-4">
                  The Hemodialysis Unit
                </h2>
                <p className="text-slate-600 leading-relaxed mb-4">
                  The Hemodialysis Unit at Leyte Baptist Hospital provides kidney replacement therapy to patients with chronic kidney disease. Our unit is equipped with {hospital.machines} dialysis machines operated by trained medical professionals.
                </p>
                <p className="text-slate-600 leading-relaxed mb-6">
                  We offer multiple daily shifts to accommodate our patients' schedules. Sessions are 4 hours in duration and are conducted under the supervision of our nephrology team.
                </p>
                <div className="space-y-3">
                  {[
                    { label: "Operating days", value: "Monday to Saturday" },
                    { label: "Sessions per day", value: "4 shifts × 12 machines" },
                    { label: "Session duration", value: "4 hours per session" },
                    { label: "Accreditations", value: hospital.accreditations.join(", ") },
                  ].map((item) => (
                    <div key={item.label} className="flex gap-3 items-start">
                      <span className="shrink-0 w-5 h-5 rounded-full bg-lbh-100 flex items-center justify-center mt-0.5" aria-hidden="true">
                        <svg width="10" height="10" fill="none" viewBox="0 0 24 24" stroke="#1f30ab" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
                      </span>
                      <div>
                        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide font-display">{item.label}: </span>
                        <span className="text-sm text-slate-700">{item.value}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-4">
                <div className="bg-lbh-50 border border-lbh-200 rounded-xl p-5">
                  <h3 className="font-display font-semibold text-lbh-900 text-base mb-2">Daily Session Schedule</h3>
                  <div className="space-y-2">
                    {[
                      { name: "First Shift", time: "6:00 AM – 10:00 AM" },
                      { name: "Second Shift", time: "10:00 AM – 2:00 PM" },
                      { name: "Third Shift", time: "2:00 PM – 6:00 PM" },
                      { name: "Fourth Shift", time: "6:00 PM – 10:00 PM" },
                    ].map((s) => (
                      <div key={s.name} className="flex items-center justify-between text-sm">
                        <span className="text-slate-700 font-medium">{s.name}</span>
                        <span className="text-slate-500 font-mono text-xs">{s.time}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="border border-slate-200 rounded-xl p-5">
                  <h3 className="font-display font-semibold text-slate-900 text-base mb-2">Contact the Unit</h3>
                  <div className="space-y-1.5 text-sm">
                    <a href={`tel:${hospital.phone}`} className="flex items-center gap-2 text-lbh-800 hover:text-lbh-900 transition-colors font-medium">
                      <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
                      {hospital.phone}
                    </a>
                    <a href={`mailto:${hospital.email}`} className="flex items-center gap-2 text-lbh-800 hover:text-lbh-900 transition-colors">
                      <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                      {hospital.email}
                    </a>
                    <p className="text-slate-500">{hospital.address}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* How it works */}
      {activePage === "home" && (
        <section className="bg-slate-50 border-b border-slate-200 py-12">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <h2 className="font-display font-bold text-slate-900 text-xl mb-8">How it works</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { step: "1", title: "Choose a date", desc: "Select the date you need your dialysis session from the available calendar." },
                { step: "2", title: "Select a slot", desc: "See available time slots for your chosen date and select one." },
                { step: "3", title: "Confirm your details", desc: "Verify your patient information and review the booking." },
                { step: "4", title: "Arrive for your session", desc: "Bring your PhilHealth ID and arrive 15 minutes before your scheduled time." },
              ].map((item) => (
                <div key={item.step} className="flex gap-3">
                  <span className="shrink-0 w-7 h-7 rounded-full bg-lbh-800 text-white text-xs font-bold font-display flex items-center justify-center mt-0.5" aria-hidden="true">{item.step}</span>
                  <div>
                    <h3 className="font-display font-semibold text-slate-900 text-sm">{item.title}</h3>
                    <p className="text-slate-500 text-xs mt-1 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Patient prep info */}
      {activePage === "home" && (
        <section className="bg-white py-12 border-b border-slate-200">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="max-w-2xl">
              <h2 className="font-display font-bold text-slate-900 text-xl mb-2">Before your session</h2>
              <p className="text-slate-500 text-sm mb-6">Follow these instructions to prepare for your dialysis appointment.</p>
              <ul className="space-y-3">
                {preparationInstructions.map((item, i) => (
                  <li key={i} className="flex gap-3 text-sm text-slate-700">
                    <span className="shrink-0 w-6 h-6 rounded-full bg-lbh-50 border border-lbh-200 text-lbh-800 text-xs font-bold font-display flex items-center justify-center" aria-hidden="true">{i + 1}</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      )}

      {/* FAQ */}
      {(activePage === "home" || showFaq) && (
        <section className="bg-slate-50 border-b border-slate-200 py-12">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display font-bold text-slate-900 text-xl">Frequently Asked Questions</h2>
            </div>
            <div className="space-y-2">
              {(activePage === "home" ? faqs.slice(0, 4) : faqs).map((faq, i) => (
                <FaqItem key={i} q={faq.q} a={faq.a} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Contact section */}
      {(activePage === "home" || showContact) && (
        <section className="bg-white py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <h2 className="font-display font-bold text-slate-900 text-xl mb-6">
              {showContact ? "Contact the Hemodialysis Unit" : "Get in touch"}
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <a href={`tel:${hospital.phone}`} className="flex items-center gap-4 border border-slate-200 rounded-xl p-5 hover:border-lbh-300 hover:shadow-sm transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-lbh-700">
                <span className="w-10 h-10 rounded-xl bg-lbh-100 flex items-center justify-center shrink-0" aria-hidden="true">
                  <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="#1f30ab" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
                </span>
                <div>
                  <p className="text-xs text-slate-400 font-medium">Phone</p>
                  <p className="text-sm font-bold font-display text-slate-900">{hospital.phone}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{hospital.hours}</p>
                </div>
              </a>
              <a href={`mailto:${hospital.email}`} className="flex items-center gap-4 border border-slate-200 rounded-xl p-5 hover:border-lbh-300 hover:shadow-sm transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-lbh-700">
                <span className="w-10 h-10 rounded-xl bg-lbh-100 flex items-center justify-center shrink-0" aria-hidden="true">
                  <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="#1f30ab" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                </span>
                <div>
                  <p className="text-xs text-slate-400 font-medium">Email</p>
                  <p className="text-sm font-bold font-display text-slate-900">{hospital.email}</p>
                </div>
              </a>
            </div>
            <div className="mt-4 border border-slate-200 rounded-xl p-5 flex gap-4 items-start">
              <span className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center shrink-0" aria-hidden="true">
                <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="#64748b" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
              </span>
              <div>
                <p className="text-xs text-slate-400 font-medium">Address</p>
                <p className="text-sm font-semibold font-display text-slate-900">{hospital.name}</p>
                <p className="text-sm text-slate-600">{hospital.unit}</p>
                <p className="text-sm text-slate-500 mt-0.5">{hospital.address}</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* CTA footer band */}
      {activePage === "home" && (
        <section className="bg-lbh-900 py-10 text-center text-white">
          <p className="font-display font-bold text-xl mb-2">Ready to schedule your session?</p>
          <p className="text-lbh-200 text-sm mb-5">Log in to the Patient Portal to book and manage your appointments.</p>
          <div className="flex justify-center gap-3 flex-wrap">
            <button onClick={onBook} className="px-6 py-3 bg-white text-lbh-900 font-bold font-display rounded-lg hover:bg-lbh-50 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white">
              Book a Session
            </button>
            <button onClick={onLogin} className="px-6 py-3 border-2 border-white/30 hover:border-white/60 text-white font-semibold font-display rounded-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white">
              Patient Portal
            </button>
          </div>
        </section>
      )}
    </main>
  );
}
