import React, { useState, useEffect } from 'react';
import { X, Calendar, Clock, CheckCircle2, Car, Wrench, Shield, ArrowRight } from 'lucide-react';
import { useWorkshop } from '../context/WorkshopContext';

export const BookServiceModal: React.FC = () => {
  const { isBookModalOpen, closeBookingModal, preselectedService, currentUser, addBooking, openJobTracker } = useWorkshop();

  const [serviceType, setServiceType] = useState('Engine Tuning');
  const [carModel, setCarModel] = useState('');
  const [regNumber, setRegNumber] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [preferredDate, setPreferredDate] = useState('Today (Express)');
  const [preferredTime, setPreferredTime] = useState('10:00 AM');
  const [notes, setNotes] = useState('');
  const [bookedJobId, setBookedJobId] = useState<string | null>(null);

  useEffect(() => {
    if (preselectedService) {
      setServiceType(preselectedService);
    }
  }, [preselectedService]);

  useEffect(() => {
    if (currentUser) {
      setCustomerName(currentUser.name);
      setCustomerPhone(currentUser.phone);
      if (currentUser.vehicle) {
        setCarModel(currentUser.vehicle.model);
        setRegNumber(currentUser.vehicle.regNumber);
      }
    }
  }, [currentUser, isBookModalOpen]);

  if (!isBookModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!carModel.trim() || !regNumber.trim() || !customerName.trim() || !customerPhone.trim()) {
      return;
    }

    const job = addBooking({
      serviceType,
      carModel: carModel.trim(),
      regNumber: regNumber.trim().toUpperCase(),
      customerName: customerName.trim(),
      customerPhone: customerPhone.trim(),
      notes: `${notes ? notes + ' | ' : ''}Slot: ${preferredDate} at ${preferredTime}`
    });

    setBookedJobId(job.id);
  };

  const handleClose = () => {
    setBookedJobId(null);
    closeBookingModal();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-slate-900 border border-slate-800 rounded-xl shadow-2xl overflow-hidden max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-red-600/20 border border-red-500/40 flex items-center justify-center text-red-500">
              <Wrench className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white leading-tight">Book Workshop Service</h2>
              <p className="text-xs text-slate-400">WheelsCare Priority Bay Reservation</p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="overflow-y-auto p-6 space-y-6">
          {bookedJobId ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Service Reserved Successfully!</h3>
                <p className="text-sm text-slate-300 mt-1">
                  Your vehicle has been queued for intake. A digital job card has been initialized.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-left space-y-2 text-sm font-mono">
                <div className="flex justify-between">
                  <span className="text-slate-400">Job Card ID:</span>
                  <span className="text-red-400 font-bold">{bookedJobId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Vehicle:</span>
                  <span className="text-white">{carModel} ({regNumber.toUpperCase()})</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Service:</span>
                  <span className="text-white">{serviceType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Time Slot:</span>
                  <span className="text-white">{preferredDate} · {preferredTime}</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  onClick={() => {
                    handleClose();
                    openJobTracker(regNumber);
                  }}
                  className="flex-1 py-2.5 px-4 rounded-lg bg-red-600 hover:bg-red-500 text-white font-semibold text-sm transition-colors flex items-center justify-center gap-2"
                >
                  <span>Track Digital Job Card Now</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={handleClose}
                  className="py-2.5 px-4 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium text-sm transition-colors"
                >
                  Done
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Service Selection */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase font-mono tracking-wider mb-1.5">
                  Select Workshop Service *
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: 'Engine Tuning', title: 'Engine Tuning', subtitle: 'ECU & Dyno' },
                    { id: 'Oil Change', title: 'Oil Change', subtitle: '100% Synthetic' },
                    { id: 'Digital Job Cards', title: 'Diagnostics & Job Card', subtitle: '21-Point Inspection' },
                    { id: 'Spare Parts', title: 'Brakes & Spare Parts', subtitle: 'OEM Replacement' }
                  ].map(item => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setServiceType(item.id)}
                      className={`p-3 rounded-lg text-left border transition-all text-sm ${
                        serviceType === item.id
                          ? 'border-red-500 bg-red-950/30 text-white shadow-sm'
                          : 'border-slate-800 bg-slate-950 text-slate-300 hover:border-slate-700'
                      }`}
                    >
                      <div className="font-semibold text-white">{item.title}</div>
                      <div className="text-xs text-slate-400 mt-0.5">{item.subtitle}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Vehicle Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase font-mono tracking-wider mb-1.5">
                    Car Model *
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      placeholder="e.g. BMW 330i M-Sport"
                      value={carModel}
                      onChange={e => setCarModel(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 focus:border-red-500 focus:ring-1 focus:ring-red-500 rounded-lg px-3.5 py-2.5 text-sm text-white placeholder-slate-500 outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase font-mono tracking-wider mb-1.5">
                    Registration No. *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. ABC-4821"
                    value={regNumber}
                    onChange={e => setRegNumber(e.target.value.toUpperCase())}
                    className="w-full bg-slate-950 border border-slate-800 focus:border-red-500 focus:ring-1 focus:ring-red-500 rounded-lg px-3.5 py-2.5 text-sm text-white placeholder-slate-500 outline-none uppercase font-mono"
                  />
                </div>
              </div>

              {/* Customer Contact */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase font-mono tracking-wider mb-1.5">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Alex Henderson"
                    value={customerName}
                    onChange={e => setCustomerName(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 focus:border-red-500 focus:ring-1 focus:ring-red-500 rounded-lg px-3.5 py-2.5 text-sm text-white placeholder-slate-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase font-mono tracking-wider mb-1.5">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. +1 (555) 019-8234"
                    value={customerPhone}
                    onChange={e => setCustomerPhone(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 focus:border-red-500 focus:ring-1 focus:ring-red-500 rounded-lg px-3.5 py-2.5 text-sm text-white placeholder-slate-500 outline-none font-mono"
                  />
                </div>
              </div>

              {/* Date & Time Slot */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase font-mono tracking-wider mb-1.5">
                    Preferred Date
                  </label>
                  <select
                    value={preferredDate}
                    onChange={e => setPreferredDate(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 focus:border-red-500 focus:ring-1 focus:ring-red-500 rounded-lg px-3.5 py-2.5 text-sm text-white outline-none cursor-pointer"
                  >
                    <option value="Today (Express Bay)">Today (Express Bay)</option>
                    <option value="Tomorrow (Morning)">Tomorrow (Morning)</option>
                    <option value="Tomorrow (Afternoon)">Tomorrow (Afternoon)</option>
                    <option value="This Saturday">This Saturday</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase font-mono tracking-wider mb-1.5">
                    Preferred Time
                  </label>
                  <select
                    value={preferredTime}
                    onChange={e => setPreferredTime(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 focus:border-red-500 focus:ring-1 focus:ring-red-500 rounded-lg px-3.5 py-2.5 text-sm text-white outline-none cursor-pointer"
                  >
                    <option value="09:00 AM">09:00 AM (Early Intake)</option>
                    <option value="11:00 AM">11:00 AM</option>
                    <option value="01:30 PM">01:30 PM</option>
                    <option value="04:00 PM">04:00 PM</option>
                    <option value="06:00 PM">06:00 PM (Late Shift)</option>
                  </select>
                </div>
              </div>

              {/* Symptoms / Notes */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase font-mono tracking-wider mb-1.5">
                  Vehicle Symptoms or Notes (Optional)
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. Engine feels sluggish on throttle, squeaking from front left brake when stopping..."
                  value={notes}
                  onChange={e => setNotes(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 focus:border-red-500 focus:ring-1 focus:ring-red-500 rounded-lg px-3.5 py-2 text-sm text-white placeholder-slate-500 outline-none resize-none"
                />
              </div>

              <div className="pt-2 flex items-center justify-between border-t border-slate-800 text-xs text-slate-400">
                <span className="flex items-center gap-1.5">
                  <Shield className="w-3.5 h-3.5 text-red-400" />
                  Free 21-point safety inspection included
                </span>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-lg bg-red-600 hover:bg-red-500 active:bg-red-700 text-white font-semibold text-sm transition-all shadow-lg shadow-red-900/40 cursor-pointer"
                >
                  Confirm Reservation
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
