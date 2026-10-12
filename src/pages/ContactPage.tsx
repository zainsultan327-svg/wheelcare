import React, { useState } from 'react';
import { 
  Phone, 
  MapPin, 
  Clock, 
  MessageSquare, 
  Send, 
  CheckCircle2, 
  Car, 
  ShieldCheck, 
  Calendar,
  AlertCircle
} from 'lucide-react';
import { useWorkshop } from '../context/WorkshopContext';
import { WORKSHOP_DETAILS } from '../data/mockData';

export const ContactPage: React.FC = () => {
  const { currentUser, submitContactInquiry, openBookingModal } = useWorkshop();

  const [name, setName] = useState(currentUser?.name || '');
  const [phone, setPhone] = useState(currentUser?.phone || '');
  const [carModel, setCarModel] = useState(currentUser?.vehicle?.model || '');
  const [problemDescription, setProblemDescription] = useState('');
  const [preferredContact, setPreferredContact] = useState<'phone' | 'whatsapp' | 'email'>('whatsapp');
  const [submittedTicket, setSubmittedTicket] = useState<{ id: string; time: string } | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !problemDescription.trim()) {
      return;
    }

    const created = submitContactInquiry({
      name: name.trim(),
      phone: phone.trim(),
      carModel: carModel.trim() || undefined,
      problemDescription: problemDescription.trim(),
      preferredContact
    });

    setSubmittedTicket({
      id: created.id,
      time: created.createdAt
    });
  };

  const handleReset = () => {
    setSubmittedTicket(null);
    setProblemDescription('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-950/50 border border-red-800/50 text-red-400 text-xs font-mono font-medium">
          DIRECT WORKSHOP DISPATCH
        </div>
        <h1 className="text-4xl font-extrabold text-white tracking-tight sm:text-5xl">
          Contact Wheels<span className="text-red-500">Care</span>
        </h1>
        <p className="text-base text-slate-400 leading-relaxed">
          Need a quick quote, diagnostic consultation, or emergency breakdown advice? Reach our master technicians directly by phone, WhatsApp, or the inquiry form below.
        </p>
      </div>

      {/* Main Grid: Contact Cards & Message Form */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Column (5 cols): Workshop Info, Phone, WhatsApp, Timings */}
        <div className="lg:col-span-5 space-y-6">
          {/* Phone & WhatsApp Card */}
          <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 space-y-6 shadow-xl">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Phone className="w-5 h-5 text-red-500" />
              Direct Workshop Contacts
            </h2>

            <div className="space-y-4 text-sm">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 flex items-center justify-between">
                <div>
                  <div className="text-xs uppercase font-mono text-slate-400">Toll-Free Workshop Phone</div>
                  <a
                    href={`tel:${WORKSHOP_DETAILS.phone.replace(/[^0-9]/g, '')}`}
                    className="text-base font-bold font-mono text-white hover:text-red-400 transition-colors"
                  >
                    {WORKSHOP_DETAILS.phone}
                  </a>
                </div>
                <a
                  href={`tel:${WORKSHOP_DETAILS.phone.replace(/[^0-9]/g, '')}`}
                  className="px-3 py-1.5 rounded-lg bg-red-600 hover:bg-red-500 text-white text-xs font-semibold"
                >
                  Call Now
                </a>
              </div>

              <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-800/40 flex items-center justify-between">
                <div>
                  <div className="text-xs uppercase font-mono text-emerald-400 font-semibold flex items-center gap-1.5">
                    <MessageSquare className="w-3.5 h-3.5" />
                    WhatsApp Service Chat
                  </div>
                  <div className="text-base font-bold font-mono text-white mt-0.5">
                    {WORKSHOP_DETAILS.whatsappNumber}
                  </div>
                  <div className="text-[11px] text-slate-400">Average reply: &lt; 5 minutes</div>
                </div>
                <a
                  href={WORKSHOP_DETAILS.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-sm transition-colors"
                >
                  Open Chat
                </a>
              </div>
            </div>
          </div>

          {/* Location & Map Preview Card */}
          <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 space-y-4 shadow-xl">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <MapPin className="w-5 h-5 text-red-500" />
              Workshop Facility Location
            </h2>

            <div className="text-sm text-slate-300 leading-relaxed">
              <span className="font-semibold text-white">{WORKSHOP_DETAILS.name}</span>
              <p className="mt-1 text-slate-400">{WORKSHOP_DETAILS.address}</p>
            </div>

            {/* Simulated Clean Stylized Workshop Map Card */}
            <div className="relative h-44 rounded-xl overflow-hidden bg-slate-950 border border-slate-800 flex flex-col justify-between p-4">
              <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(#ef4444_1px,transparent_1px)] [background-size:16px_16px]" />
              
              <div className="relative z-10 flex items-center justify-between">
                <span className="px-2 py-0.5 rounded bg-slate-900/90 border border-slate-700 text-[11px] font-mono text-red-400">
                  SECTOR 7 HUB
                </span>
                <span className="text-xs text-emerald-400 font-mono">● Gate Open</span>
              </div>

              <div className="relative z-10 flex items-center gap-3 bg-slate-900/95 p-3 rounded-lg border border-slate-800">
                <div className="w-8 h-8 rounded-full bg-red-600 text-white flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div className="text-xs">
                  <div className="font-bold text-white">WheelsCare Service Center</div>
                  <div className="text-slate-400">Take Exit 14 off Motorway Expressway</div>
                </div>
              </div>
            </div>
          </div>

          {/* Working Hours Card (Prompt requirement: Mon-Sat 9 AM to 8 PM) */}
          <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 space-y-4 shadow-xl">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Clock className="w-5 h-5 text-red-500" />
              Working Hours
            </h2>

            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <span className="text-slate-300 font-medium">Monday – Saturday</span>
                <span className="font-mono text-white font-bold bg-slate-950 px-2.5 py-1 rounded border border-slate-800">
                  9:00 AM – 8:00 PM
                </span>
              </div>

              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <span className="text-slate-400">Sunday</span>
                <span className="text-red-400 text-xs font-mono font-medium">
                  Emergency Breakdown Only (24/7)
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              Customers can drop vehicles off before 9:00 AM using our secure early-bird key drop lockbox.
            </p>
          </div>
        </div>

        {/* Right Column (7 cols): Message Form */}
        <div className="lg:col-span-7">
          <div className="rounded-2xl bg-slate-900 border border-slate-800 p-8 shadow-2xl shadow-black/80 space-y-6">
            <div className="space-y-1">
              <h2 className="text-2xl font-bold text-white">Send Workshop Inquiry</h2>
              <p className="text-sm text-slate-400">
                Describe the issue your car is experiencing and our service advisor will review and contact you promptly.
              </p>
            </div>

            {submittedTicket ? (
              <div className="py-8 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">Message Received!</h3>
                  <p className="text-sm text-slate-300 mt-1 max-w-md mx-auto">
                    Thank you <span className="text-white font-semibold">{name}</span>. Your problem report has been logged with workshop dispatch.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-left space-y-2 text-sm font-mono max-w-md mx-auto">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Ticket Ref:</span>
                    <span className="text-red-400 font-bold">{submittedTicket.id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Logged At:</span>
                    <span className="text-white">{submittedTicket.time}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Preferred Method:</span>
                    <span className="text-white uppercase">{preferredContact}</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
                  <button
                    onClick={() => openBookingModal()}
                    className="py-2.5 px-5 rounded-lg bg-red-600 hover:bg-red-500 text-white font-semibold text-sm transition-colors cursor-pointer"
                  >
                    Directly Book Service Bay
                  </button>
                  <button
                    onClick={handleReset}
                    className="py-2.5 px-5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium text-sm transition-colors cursor-pointer"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name field */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase font-mono tracking-wider mb-1.5">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Michael Campbell"
                      value={name}
                      onChange={e => setName(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 focus:border-red-500 focus:ring-1 focus:ring-red-500 rounded-lg px-3.5 py-2.5 text-sm text-white placeholder-slate-600 outline-none"
                    />
                  </div>

                  {/* Phone field */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase font-mono tracking-wider mb-1.5">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. +1 (555) 019-8234"
                      value={phone}
                      onChange={e => setPhone(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 focus:border-red-500 focus:ring-1 focus:ring-red-500 rounded-lg px-3.5 py-2.5 text-sm text-white placeholder-slate-600 outline-none font-mono"
                    />
                  </div>
                </div>

                {/* Car Model (Optional assistance) */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase font-mono tracking-wider mb-1.5">
                    Vehicle Make / Model (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Audi A4 2.0T / Honda Accord 2020"
                    value={carModel}
                    onChange={e => setCarModel(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 focus:border-red-500 focus:ring-1 focus:ring-red-500 rounded-lg px-3.5 py-2.5 text-sm text-white placeholder-slate-600 outline-none"
                  />
                </div>

                {/* Problem Description Box (Prompt requirement) */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase font-mono tracking-wider mb-1.5">
                    Problem Description *
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Describe symptoms: strange noises, warning dash lights, braking vibration, engine misfire, fluid leaks, or routine maintenance required..."
                    value={problemDescription}
                    onChange={e => setProblemDescription(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 focus:border-red-500 focus:ring-1 focus:ring-red-500 rounded-lg p-3.5 text-sm text-white placeholder-slate-600 outline-none resize-none leading-relaxed"
                  />
                </div>

                {/* Preferred Contact Method */}
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase font-mono tracking-wider mb-1.5">
                    Preferred Response Method
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'whatsapp', label: 'WhatsApp' },
                      { id: 'phone', label: 'Phone Call' },
                      { id: 'email', label: 'Email' }
                    ].map(item => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setPreferredContact(item.id as any)}
                        className={`py-2 px-3 rounded-lg text-xs font-semibold border transition-all text-center cursor-pointer ${
                          preferredContact === item.id
                            ? 'bg-red-600 text-white border-red-500 shadow-sm'
                            : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
                        }`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3.5 px-6 rounded-xl bg-red-600 hover:bg-red-500 active:bg-red-700 text-white font-bold text-sm shadow-xl shadow-red-950/60 transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Problem Report to Workshop</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
