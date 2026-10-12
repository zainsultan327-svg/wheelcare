import React from 'react';
import { Wrench, Phone, Clock, MapPin, Mail, MessageSquare, ShieldCheck, ChevronRight } from 'lucide-react';
import { useWorkshop } from '../context/WorkshopContext';
import { WORKSHOP_DETAILS } from '../data/mockData';

export const Footer: React.FC = () => {
  const { navigateTo, openBookingModal, openJobTracker } = useWorkshop();

  return (
    <footer className="bg-slate-950 border-t border-slate-800/80 text-slate-400">
      {/* Upper service commitment row */}
      <div className="border-b border-slate-800/60 bg-slate-900/40 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
          <div className="flex items-start gap-3.5">
            <div className="w-9 h-9 rounded-lg bg-red-950/60 border border-red-800/40 flex items-center justify-center text-red-400 shrink-0 mt-0.5">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="text-white font-semibold">12-Month / 20,000 KM Warranty</div>
              <p className="text-slate-400 text-xs mt-1 leading-relaxed">
                Every genuine OEM spare part and diagnostic service performed at WheelsCare is covered by our certified workshop warranty.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="w-9 h-9 rounded-lg bg-slate-800 border border-slate-700/60 flex items-center justify-center text-slate-200 shrink-0 mt-0.5">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <div className="text-white font-semibold">Fast Turnaround Priority</div>
              <p className="text-slate-400 text-xs mt-1 leading-relaxed">
                Synthetic oil changes within 45 minutes; digital job cards updated live at every bay step so you never have to guess.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="w-9 h-9 rounded-lg bg-red-950/60 border border-red-800/40 flex items-center justify-center text-red-400 shrink-0 mt-0.5">
              <Phone className="w-5 h-5" />
            </div>
            <div>
              <div className="text-white font-semibold">24/7 Breakdown Hotline</div>
              <p className="text-slate-400 text-xs mt-1 leading-relaxed">
                Stranded or check engine light flashing? Call our emergency recovery line anytime at <span className="font-mono text-white">{WORKSHOP_DETAILS.emergencyHotline}</span>.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main footer contents */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Col 1: Brand & Bio */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-lg bg-red-600 flex items-center justify-center text-white shadow-md shadow-red-950">
                <Wrench className="w-5 h-5" />
              </div>
              <span className="text-xl font-extrabold text-white">
                Wheels<span className="text-red-500">Care</span>
              </span>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed mb-4">
              Modern multi-brand auto workshop specializing in precision engine diagnostics, synthetic lubrication, and transparent digital vehicle job cards.
            </p>
            <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
              <span className="text-red-400 font-semibold">FACILITY:</span> 5 Hydraulic Bays · Dyno Cell · Cleanroom Diagnostics
            </div>
          </div>

          {/* Col 2: Workshop Timings */}
          <div>
            <h3 className="text-white font-semibold text-sm tracking-wide uppercase font-mono mb-4 flex items-center gap-2">
              <Clock className="w-4 h-4 text-red-500" />
              Workshop Timings
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li className="flex justify-between pb-2 border-b border-slate-800/80">
                <span className="text-slate-300">Monday - Friday</span>
                <span className="font-mono text-white">9:00 AM - 8:00 PM</span>
              </li>
              <li className="flex justify-between pb-2 border-b border-slate-800/80">
                <span className="text-slate-300">Saturday</span>
                <span className="font-mono text-white">9:00 AM - 8:00 PM</span>
              </li>
              <li className="flex justify-between pb-2 border-b border-slate-800/80">
                <span className="text-slate-400">Sunday</span>
                <span className="text-red-400 text-xs font-medium">Emergency Towing Only</span>
              </li>
            </ul>
            <div className="mt-4 p-3 rounded-lg bg-slate-900 border border-slate-800/80 text-xs text-slate-300">
              💡 Walk-ins accepted before 5:00 PM. Book online to reserve a dedicated lift bay.
            </div>
          </div>

          {/* Col 3: Workshop Address & Contact */}
          <div>
            <h3 className="text-white font-semibold text-sm tracking-wide uppercase font-mono mb-4 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-red-500" />
              Location & Phone
            </h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                <span className="text-slate-300">{WORKSHOP_DETAILS.address}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-slate-400 shrink-0" />
                <a href={`tel:${WORKSHOP_DETAILS.phone.replace(/[^0-9]/g, '')}`} className="font-mono text-white hover:text-red-400 transition-colors">
                  {WORKSHOP_DETAILS.phone}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <MessageSquare className="w-4 h-4 text-emerald-400 shrink-0" />
                <a
                  href={WORKSHOP_DETAILS.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-400 hover:text-emerald-300 font-mono transition-colors"
                >
                  WhatsApp: {WORKSHOP_DETAILS.whatsappNumber}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-slate-400 shrink-0" />
                <a href={`mailto:${WORKSHOP_DETAILS.email}`} className="text-slate-300 hover:text-white transition-colors">
                  {WORKSHOP_DETAILS.email}
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Quick Navigation & Portals */}
          <div>
            <h3 className="text-white font-semibold text-sm tracking-wide uppercase font-mono mb-4">
              Quick Portals
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => openBookingModal()}
                  className="flex items-center gap-1.5 text-slate-300 hover:text-white transition-colors group"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-red-500 group-hover:translate-x-0.5 transition-transform" />
                  <span>Schedule Service Bay</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => openJobTracker()}
                  className="flex items-center gap-1.5 text-slate-300 hover:text-white transition-colors group"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-red-500 group-hover:translate-x-0.5 transition-transform" />
                  <span>Track Digital Job Card</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('contact')}
                  className="flex items-center gap-1.5 text-slate-300 hover:text-white transition-colors group"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-red-500 group-hover:translate-x-0.5 transition-transform" />
                  <span>Inquire / Report Problem</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('login')}
                  className="flex items-center gap-1.5 text-slate-300 hover:text-white transition-colors group"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-red-500 group-hover:translate-x-0.5 transition-transform" />
                  <span>Customer & Staff Portal Login</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('register')}
                  className="flex items-center gap-1.5 text-slate-300 hover:text-white transition-colors group"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-red-500 group-hover:translate-x-0.5 transition-transform" />
                  <span>Register Vehicle Account</span>
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Quiet copyright baseline */}
        <div className="mt-12 pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span>© 2026 WheelsCare Auto-Workshop Ltd.</span>
            <span>·</span>
            <span>All Rights Reserved</span>
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <span>Precision Diagnostics</span>
            <span>·</span>
            <span>Synthetic Lubrication</span>
            <span>·</span>
            <span>OEM Spare Parts</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
