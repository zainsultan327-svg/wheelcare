import React, { useState } from 'react';
import { X, Car, CheckCircle2, Clock, Wrench, ShieldCheck, UserCheck, AlertCircle, FileText, Search } from 'lucide-react';
import { useWorkshop } from '../context/WorkshopContext';
import { JobCardStatus } from '../types';

export const JobCardModal: React.FC = () => {
  const { activeJobTrackerReg, closeJobTracker, jobCards, trackJobCard, currentUser, updateJobStatus } = useWorkshop();
  const [searchReg, setSearchReg] = useState(activeJobTrackerReg || '');

  if (!activeJobTrackerReg) return null;

  const currentJob = trackJobCard(searchReg) || trackJobCard(activeJobTrackerReg) || jobCards[0];

  const stages: { key: JobCardStatus; label: string; desc: string }[] = [
    { key: 'inspection', label: '1. Intake Diagnostics', desc: 'OBD-II multi-system fault scan & initial inspection' },
    { key: 'parts_allocated', label: '2. Parts Allocation', desc: 'Genuine OEM parts verified & assigned to bay' },
    { key: 'in_progress', label: '3. Bay Work In-Progress', desc: 'Mechanic active execution on vehicle lift' },
    { key: 'quality_check', label: '4. Quality Assurance', desc: 'Road test, torque check & supervisor sign-off' },
    { key: 'ready', label: '5. Ready for Pick-Up', desc: 'Vehicle washed, final invoice prepped' }
  ];

  const getStageIndex = (status: JobCardStatus) => {
    switch (status) {
      case 'inspection': return 0;
      case 'parts_allocated': return 1;
      case 'in_progress': return 2;
      case 'quality_check': return 3;
      case 'ready':
      case 'completed': return 4;
      default: return 0;
    }
  };

  const currentStageIndex = currentJob ? getStageIndex(currentJob.status) : 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-xl shadow-2xl overflow-hidden max-h-[92vh] flex flex-col">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-red-600 flex items-center justify-center text-white shadow-md shadow-red-950">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-white">Live Digital Job Card</h2>
                <span className="px-2 py-0.5 rounded text-[11px] font-mono font-medium bg-red-950/70 border border-red-800/60 text-red-400">
                  {currentJob ? currentJob.id : 'SEARCH'}
                </span>
              </div>
              <p className="text-xs text-slate-400">Real-time workshop telemetry & service checklist</p>
            </div>
          </div>
          <button
            onClick={closeJobTracker}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="overflow-y-auto p-6 space-y-6">
          {/* Quick Reg Search / Selector */}
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
              <input
                type="text"
                placeholder="Enter Registration No. (e.g. ABC-4821, WC-789-GT)"
                value={searchReg}
                onChange={e => setSearchReg(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 focus:border-red-500 rounded-lg pl-9 pr-3.5 py-2 text-sm text-white placeholder-slate-500 uppercase font-mono outline-none"
              />
            </div>
            <div className="flex gap-1.5 overflow-x-auto pb-1 sm:pb-0">
              {jobCards.slice(0, 3).map(j => (
                <button
                  key={j.id}
                  onClick={() => setSearchReg(j.vehicleReg)}
                  className={`px-2.5 py-1.5 rounded text-xs font-mono transition-colors whitespace-nowrap ${
                    currentJob?.id === j.id
                      ? 'bg-red-600 text-white font-semibold'
                      : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
                  }`}
                >
                  {j.vehicleReg}
                </button>
              ))}
            </div>
          </div>

          {currentJob ? (
            <>
              {/* Vehicle & Bay Banner */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <Car className="w-4 h-4 text-red-500" />
                    <span className="text-lg font-bold text-white">{currentJob.carModel}</span>
                  </div>
                  <div className="text-xs font-mono text-slate-400 mt-1 flex items-center gap-2">
                    <span className="text-white font-bold tracking-wider">{currentJob.vehicleReg}</span>
                    <span>·</span>
                    <span>Owner: {currentJob.customerName}</span>
                    <span>·</span>
                    <span className="text-slate-400">{currentJob.customerPhone}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-center">
                    <div className="text-[10px] uppercase font-mono text-slate-400">Bay Location</div>
                    <div className="text-sm font-bold text-red-400">Bay #{currentJob.bayNumber}</div>
                  </div>
                  <div className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-center">
                    <div className="text-[10px] uppercase font-mono text-slate-400">Est. Ready</div>
                    <div className="text-sm font-bold text-emerald-400 font-mono">{currentJob.estimatedReady}</div>
                  </div>
                </div>
              </div>

              {/* Progress Stepper */}
              <div>
                <div className="text-xs font-semibold text-slate-400 uppercase font-mono tracking-wider mb-3">
                  Repair Progression Timeline
                </div>
                <div className="space-y-3">
                  {stages.map((stg, idx) => {
                    const isDone = idx < currentStageIndex;
                    const isCurrent = idx === currentStageIndex;

                    return (
                      <div
                        key={stg.key}
                        className={`flex items-start gap-3 p-3 rounded-lg border transition-all ${
                          isCurrent
                            ? 'bg-red-950/20 border-red-500/60 shadow-sm'
                            : isDone
                            ? 'bg-slate-950/60 border-slate-800/80 opacity-80'
                            : 'bg-slate-950/30 border-slate-800/40 opacity-40'
                        }`}
                      >
                        <div className="mt-0.5 shrink-0">
                          {isDone ? (
                            <div className="w-6 h-6 rounded-full bg-emerald-500/20 border border-emerald-500/50 flex items-center justify-center text-emerald-400">
                              <CheckCircle2 className="w-4 h-4" />
                            </div>
                          ) : isCurrent ? (
                            <div className="w-6 h-6 rounded-full bg-red-600 border border-red-400 flex items-center justify-center text-white animate-pulse">
                              <Clock className="w-3.5 h-3.5" />
                            </div>
                          ) : (
                            <div className="w-6 h-6 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-500 text-xs font-mono">
                              {idx + 1}
                            </div>
                          )}
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <span className={`text-sm font-semibold ${isCurrent ? 'text-red-400' : 'text-white'}`}>
                              {stg.label}
                            </span>
                            {isCurrent && (
                              <span className="text-[11px] font-mono text-red-400 bg-red-950/80 px-2 py-0.5 rounded border border-red-800/50">
                                ACTIVE STAGE
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-slate-400 mt-0.5">{stg.desc}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Checklist & Technician Notes */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 space-y-2.5">
                  <div className="text-xs font-semibold text-slate-300 uppercase font-mono flex items-center gap-1.5">
                    <Wrench className="w-3.5 h-3.5 text-red-400" />
                    Inspection Checklist
                  </div>
                  <ul className="space-y-2 text-xs">
                    {currentJob.checklist.map((item, i) => (
                      <li key={i} className="flex items-center gap-2">
                        {item.completed ? (
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        ) : (
                          <div className="w-3.5 h-3.5 rounded-full border border-slate-600 shrink-0" />
                        )}
                        <span className={item.completed ? 'text-slate-300' : 'text-slate-400'}>
                          {item.item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 space-y-2.5">
                  <div className="text-xs font-semibold text-slate-300 uppercase font-mono flex items-center gap-1.5">
                    <UserCheck className="w-3.5 h-3.5 text-red-400" />
                    Technician Notes & Parts
                  </div>
                  <p className="text-xs text-slate-300 bg-slate-900 p-2.5 rounded-lg border border-slate-800 leading-relaxed italic">
                    "{currentJob.technicianNotes}"
                  </p>
                  <div className="text-[11px] text-slate-400 font-mono">
                    <span className="text-slate-300 font-semibold">Assigned Tech:</span> {currentJob.technician}
                  </div>
                  {currentJob.partsReplaced.length > 0 && (
                    <div className="text-[11px] text-slate-400">
                      <span className="text-slate-300 font-semibold">Allocated Parts:</span> {currentJob.partsReplaced.join(', ')}
                    </div>
                  )}
                </div>
              </div>

              {/* Staff controls if logged in as staff */}
              {currentUser?.role === 'staff' && (
                <div className="p-4 rounded-xl bg-red-950/20 border border-red-800/50 space-y-2">
                  <div className="text-xs font-semibold text-red-400 uppercase font-mono">
                    Staff Workshop Controls (Bay Manager)
                  </div>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {stages.map(stg => (
                      <button
                        key={stg.key}
                        onClick={() => updateJobStatus(currentJob.id, stg.key)}
                        className={`px-3 py-1.5 rounded text-xs font-medium border transition-colors ${
                          currentJob.status === stg.key
                            ? 'bg-red-600 text-white border-red-500 font-semibold'
                            : 'bg-slate-900 text-slate-300 border-slate-700 hover:bg-slate-800'
                        }`}
                      >
                        Set: {stg.label.split('. ')[1]}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-10 space-y-3">
              <AlertCircle className="w-10 h-10 text-slate-500 mx-auto" />
              <div className="text-white font-semibold">No active job card found for "{searchReg}"</div>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                Check the registration number or pick one of the active demo workshop vehicles above to inspect live tracking.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
