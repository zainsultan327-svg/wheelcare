import React from 'react';
import { 
  Wrench, 
  Car, 
  Gauge, 
  Fuel, 
  FileText, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight, 
  PhoneCall, 
  Clock, 
  Calendar,
  Sparkles,
  ChevronRight
} from 'lucide-react';
import { useWorkshop } from '../context/WorkshopContext';
import { WORKSHOP_SERVICES, WORKSHOP_STATS, WORKSHOP_DETAILS } from '../data/mockData';

export const HomePage: React.FC = () => {
  const { openBookingModal, openJobTracker, navigateTo } = useWorkshop();

  return (
    <div className="space-y-20 pb-16">
      {/* 1. HERO BANNER */}
      <section className="relative overflow-hidden bg-slate-950 border-b border-slate-800/80">
        {/* Ambient workshop backdrop lighting */}
        <div className="absolute inset-0 bg-radial from-red-950/20 via-transparent to-transparent opacity-70 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Proposition & CTA */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-950/50 border border-red-800/50 text-red-400 text-xs font-mono font-medium">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                <span>CERTIFIED MOTORSPORT & PASSENGER VEHICLE WORKSHOP</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.1] text-balance">
                Precision Auto Care &{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-red-400 to-rose-300">
                  Master Diagnostics
                </span>
              </h1>

              <p className="text-lg sm:text-xl text-slate-300 leading-relaxed max-w-2xl">
                We keep your engine purring and your wheels rolling. From high-precision ECU dyno tuning and synthetic lubrication to transparent live digital job cards.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={() => openBookingModal()}
                  className="px-7 py-3.5 rounded-xl bg-red-600 hover:bg-red-500 active:bg-red-700 text-white font-bold text-base shadow-xl shadow-red-950/60 transition-all flex items-center gap-2 group cursor-pointer"
                >
                  <span>Book Service Now</span>
                  <ArrowRight className="w-4 h-4 text-red-200 group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  onClick={() => openJobTracker()}
                  className="px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 hover:text-white font-semibold text-base border border-slate-700/80 transition-colors flex items-center gap-2 cursor-pointer"
                >
                  <FileText className="w-4 h-4 text-red-400" />
                  <span>Track Vehicle Job Card</span>
                </button>
              </div>

              {/* Quick Trust Highlights */}
              <div className="pt-4 grid grid-cols-3 gap-4 border-t border-slate-800/80 text-xs">
                <div className="space-y-1">
                  <div className="font-semibold text-white flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-red-400" />
                    OEM Parts Only
                  </div>
                  <div className="text-slate-400">100% Genuine manufacturer warranty</div>
                </div>

                <div className="space-y-1">
                  <div className="font-semibold text-white flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-red-400" />
                    Express Turnaround
                  </div>
                  <div className="text-slate-400">Same-day service on 98% of repairs</div>
                </div>

                <div className="space-y-1">
                  <div className="font-semibold text-white flex items-center gap-1.5">
                    <Car className="w-4 h-4 text-red-400" />
                    Digital Telemetry
                  </div>
                  <div className="text-slate-400">Live technician inspection notes</div>
                </div>
              </div>
            </div>

            {/* Right Column: Hero Repair Workshop Picture */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl overflow-hidden border border-slate-700/80 shadow-2xl shadow-black/80 group">
                <img
                  src="/src/assets/images/hero_car_workshop_bay_1791814382317.jpg"
                  alt="WheelsCare modern automotive workshop service bay with sports vehicle on lift and master technician"
                  referrerPolicy="no-referrer"
                  className="w-full h-80 sm:h-96 lg:h-[440px] object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />

                {/* Floating Live Workshop Overlay */}
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-slate-950/90 backdrop-blur-md border border-slate-800 flex items-center justify-between">
                  <div>
                    <div className="text-xs uppercase font-mono text-red-400 font-semibold flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                      Service Bay #4 Active
                    </div>
                    <div className="text-sm font-bold text-white mt-0.5">High-Tech Diagnostic Computer Check</div>
                  </div>
                  <button
                    onClick={() => openJobTracker('ABC-4821')}
                    className="px-3 py-1.5 rounded-lg bg-red-600 hover:bg-red-500 text-white text-xs font-semibold transition-colors flex items-center gap-1"
                  >
                    <span>View Bay</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. STATS COUNTER STRIP */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900 to-slate-950 border border-slate-800/80 p-8 shadow-xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center divide-y md:divide-y-0 md:divide-x divide-slate-800">
            {WORKSHOP_STATS.map((stat, i) => (
              <div key={i} className={`pt-4 md:pt-0 ${i !== 0 ? 'md:pl-6' : ''}`}>
                <div className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight font-mono tabular-nums text-transparent bg-clip-text bg-gradient-to-br from-white via-slate-100 to-slate-400">
                  {stat.value}
                </div>
                <div className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-red-400 font-mono mt-1">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. FOUR SERVICE CARDS SECTION */}
      <section id="services-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="text-xs uppercase font-mono font-bold tracking-widest text-red-500">
            OUR SPECIALIZED CRAFT
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Comprehensive Auto-Workshop Services
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Every vehicle receives dedicated diagnostic analysis, OEM manufacturer parts, and transparent digital documentation.
          </p>
        </div>

        {/* 4 Service Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {WORKSHOP_SERVICES.map((service, index) => {
            const isDigitalJobCard = service.id === 'digital-job-cards';

            return (
              <div
                key={service.id}
                className="group rounded-2xl bg-slate-900 border border-slate-800/90 overflow-hidden shadow-xl hover:border-slate-700 transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Card Image Banner */}
                  <div className="relative h-56 sm:h-64 overflow-hidden bg-slate-950">
                    <img
                      src={service.image}
                      alt={service.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />

                    <div className="absolute top-4 left-4 flex items-center gap-2">
                      <span className="px-2.5 py-1 rounded-md bg-slate-950/80 backdrop-blur-sm border border-slate-800 text-xs font-mono font-semibold text-white">
                        0{index + 1}. SERVICE
                      </span>
                      {service.popular && (
                        <span className="px-2.5 py-1 rounded-md bg-red-600 text-xs font-bold text-white shadow-sm">
                          POPULAR
                        </span>
                      )}
                    </div>

                    <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                      <div>
                        <div className="text-xs font-mono text-red-400 font-semibold">{service.tagline}</div>
                        <h3 className="text-2xl font-bold text-white leading-tight mt-0.5">{service.title}</h3>
                      </div>
                      <div className="text-right">
                        <div className="text-[10px] uppercase font-mono text-slate-400">Starting From</div>
                        <div className="text-lg font-bold font-mono text-white">
                          {service.priceStartingAt > 0 ? `$${service.priceStartingAt}` : 'Complimentary'}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Card Content & Features */}
                  <div className="p-6 space-y-4">
                    <p className="text-slate-300 text-sm leading-relaxed">
                      {service.description}
                    </p>

                    <div className="space-y-2 pt-2 border-t border-slate-800/60">
                      <div className="text-xs font-mono font-semibold uppercase text-slate-400">
                        Includes:
                      </div>
                      <ul className="grid grid-cols-1 gap-2 text-xs text-slate-300">
                        {service.features.map((feat, fIdx) => (
                          <li key={fIdx} className="flex items-start gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-red-400 shrink-0 mt-0.5" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Card Action Footer */}
                <div className="p-6 pt-0 border-t border-slate-800/60 mt-4 flex items-center justify-between gap-4">
                  <div className="text-xs font-mono text-slate-400 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>Est: {service.turnaroundTime}</span>
                  </div>

                  {isDigitalJobCard ? (
                    <button
                      onClick={() => openJobTracker()}
                      className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-500 text-white font-semibold text-xs transition-colors flex items-center gap-1.5 cursor-pointer shadow-md shadow-red-950"
                    >
                      <span>Track Job Card</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  ) : (
                    <button
                      onClick={() => openBookingModal(service.title)}
                      className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-500 text-white font-semibold text-xs transition-colors flex items-center gap-1.5 cursor-pointer shadow-md shadow-red-950"
                    >
                      <span>Book Service</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. DIGITAL JOB CARDS HIGHLIGHT & LIVE DEMO BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-2xl bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 border border-slate-800 p-8 sm:p-12 overflow-hidden shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <span className="text-xs font-mono font-bold text-red-500 uppercase tracking-wider">
                TRANSPARENCY GUARANTEE
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Never Wonder What Happened in the Workshop Bay
              </h3>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                When you bring your vehicle to WheelsCare, our mechanics don’t scribble on greasy notepads. Every task, torque specification, inspection photo, and replaced part is documented inside your interactive Digital Job Card.
              </p>

              <div className="flex flex-wrap gap-3 pt-2">
                <button
                  onClick={() => openJobTracker('ABC-4821')}
                  className="px-5 py-2.5 rounded-lg bg-red-600 hover:bg-red-500 text-white font-semibold text-sm transition-colors flex items-center gap-2 cursor-pointer shadow-md shadow-red-950"
                >
                  <FileText className="w-4 h-4" />
                  <span>View Sample Digital Job Card</span>
                </button>
                <button
                  onClick={() => navigateTo('contact')}
                  className="px-5 py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-sm transition-colors border border-slate-700 cursor-pointer"
                >
                  Speak With Master Tech
                </button>
              </div>
            </div>

            <div className="lg:col-span-5 bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-3 font-mono text-xs">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <span className="text-white font-bold">DIGITAL JOB CARD #WC-JOB-8421</span>
                <span className="text-emerald-400 font-semibold">STAGE 3: IN PROGRESS</span>
              </div>
              <div className="text-slate-400">
                <div>VEHICLE: <span className="text-white">Toyota Camry 2.5L SE (2022)</span></div>
                <div>REG: <span className="text-red-400 font-bold">ABC-4821</span></div>
                <div>BAY: <span className="text-white">Bay #2 · Master Tech Dave</span></div>
              </div>
              <div className="p-2.5 rounded bg-slate-900 border border-slate-800 text-slate-300 text-[11px] leading-relaxed">
                "Throttle body ultrasonic cleansing completed. Commencing high-rpm dyno calibration run."
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. CALL TO ACTION STRIP */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl bg-red-600 p-8 sm:p-12 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl shadow-red-950/60">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Ready to Give Your Car the Care It Deserves?
            </h3>
            <p className="text-red-100 text-sm sm:text-base max-w-xl">
              Book a bay slot in 60 seconds or drop by our workshop facility at Motorway Industrial Hub.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <button
              onClick={() => openBookingModal()}
              className="px-6 py-3 rounded-xl bg-slate-950 hover:bg-black text-white font-bold text-sm transition-colors shadow-lg cursor-pointer"
            >
              Book Service Bay
            </button>
            <button
              onClick={() => navigateTo('contact')}
              className="px-6 py-3 rounded-xl bg-red-700 hover:bg-red-800 text-white font-bold text-sm transition-colors border border-red-500 cursor-pointer"
            >
              Contact Workshop
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
