import React, { useState } from 'react';
import { Wrench, PhoneCall, User as UserIcon, LogOut, Menu, X, Car, ShieldCheck } from 'lucide-react';
import { useWorkshop, PageId } from '../context/WorkshopContext';
import { WORKSHOP_DETAILS } from '../data/mockData';

export const Header: React.FC = () => {
  const { currentPage, navigateTo, currentUser, logout, openBookingModal, openJobTracker } = useWorkshop();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (page: PageId) => {
    navigateTo(page);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-slate-950/95 backdrop-blur-md border-b border-slate-800/80 shadow-lg shadow-black/20">
      {/* Top micro announcement bar */}
      <div className="bg-slate-900 border-b border-slate-800/50 py-1.5 px-4 text-xs text-slate-300">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-red-400 font-semibold tracking-wide flex items-center gap-1.5">
              <span className="inline-block w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
              LIVE WORKSHOP
            </span>
            <span className="hidden sm:inline text-slate-500">·</span>
            <span className="hidden sm:inline text-slate-300">Bays 1-5 Operational</span>
            <span className="text-slate-500">·</span>
            <span className="text-slate-300">Mon - Sat: 9 AM - 8 PM</span>
          </div>

          <div className="flex items-center gap-4">
            <a
              href={`tel:${WORKSHOP_DETAILS.phone.replace(/[^0-9]/g, '')}`}
              className="flex items-center gap-1.5 text-slate-300 hover:text-white transition-colors"
            >
              <PhoneCall className="w-3.5 h-3.5 text-red-500" />
              <span className="font-mono">{WORKSHOP_DETAILS.phone}</span>
            </a>
            {currentUser && (
              <span className="hidden md:inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700/60 text-[11px]">
                <UserIcon className="w-3 h-3 text-red-400" />
                <span className="font-medium text-white">{currentUser.name}</span>
                <span className="text-slate-400">({currentUser.role})</span>
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Main Top Bar Contract: Brand — 4-5 Nav Links — 1 Primary Action */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark */}
        <button
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-3 text-left group focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 rounded"
        >
          <div className="w-10 h-10 rounded-lg bg-red-600 flex items-center justify-center text-white shadow-md shadow-red-950/50 group-hover:bg-red-500 transition-colors">
            <Wrench className="w-5 h-5 transition-transform group-hover:rotate-12" />
          </div>
          <div>
            <div className="text-xl font-extrabold tracking-tight text-white leading-tight">
              Wheels<span className="text-red-500">Care</span>
            </div>
            <div className="text-[10px] tracking-wider uppercase text-slate-400 font-mono font-medium">
              Precision Auto Workshop
            </div>
          </div>
        </button>

        {/* Zone 2: Navigation Links (Single-Line, 1-2 words) */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2 text-sm font-medium">
          <button
            onClick={() => handleNavClick('home')}
            className={`px-3 py-2 rounded-md transition-colors whitespace-nowrap ${
              currentPage === 'home'
                ? 'text-white bg-slate-900 border border-slate-700/60 shadow-inner'
                : 'text-slate-300 hover:text-white hover:bg-slate-900/60'
            }`}
          >
            Home
          </button>

          <button
            onClick={() => {
              handleNavClick('home');
              setTimeout(() => {
                const el = document.getElementById('services-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }, 100);
            }}
            className="px-3 py-2 rounded-md text-slate-300 hover:text-white hover:bg-slate-900/60 transition-colors whitespace-nowrap"
          >
            Services
          </button>

          <button
            onClick={() => openJobTracker()}
            className="px-3 py-2 rounded-md text-slate-300 hover:text-white hover:bg-slate-900/60 transition-colors whitespace-nowrap flex items-center gap-1.5"
          >
            <Car className="w-4 h-4 text-red-400" />
            Track Job Card
          </button>

          <button
            onClick={() => handleNavClick('contact')}
            className={`px-3 py-2 rounded-md transition-colors whitespace-nowrap ${
              currentPage === 'contact'
                ? 'text-white bg-slate-900 border border-slate-700/60 shadow-inner'
                : 'text-slate-300 hover:text-white hover:bg-slate-900/60'
            }`}
          >
            Contact Us
          </button>

          {!currentUser ? (
            <button
              onClick={() => handleNavClick('login')}
              className={`px-3 py-2 rounded-md transition-colors whitespace-nowrap ${
                currentPage === 'login'
                  ? 'text-white bg-slate-900 border border-slate-700/60'
                  : 'text-slate-300 hover:text-white hover:bg-slate-900/60'
              }`}
            >
              Sign In
            </button>
          ) : (
            <button
              onClick={logout}
              className="px-3 py-2 rounded-md text-slate-400 hover:text-red-400 hover:bg-slate-900/60 transition-colors whitespace-nowrap flex items-center gap-1 text-xs"
              title="Sign Out"
            >
              <LogOut className="w-3.5 h-3.5" />
              Sign Out
            </button>
          )}
        </nav>

        {/* Zone 3: Primary Action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => openBookingModal()}
            className="relative group overflow-hidden px-5 py-2.5 rounded-lg bg-red-600 hover:bg-red-500 active:bg-red-700 text-white font-semibold text-sm shadow-lg shadow-red-900/40 hover:shadow-red-700/40 transition-all whitespace-nowrap flex items-center gap-2 cursor-pointer"
          >
            <span className="relative z-10 flex items-center gap-1.5">
              <span>Book Service</span>
              <span className="text-red-200 group-hover:translate-x-0.5 transition-transform">→</span>
            </span>
          </button>

          {/* Mobile menu hamburger toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg bg-slate-900 text-slate-300 hover:text-white border border-slate-800"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-slate-950 border-b border-slate-800 px-4 pt-3 pb-5 space-y-2 animate-in fade-in slide-in-from-top-2 duration-150">
          <button
            onClick={() => handleNavClick('home')}
            className={`w-full text-left px-3 py-2.5 rounded-md text-sm font-medium ${
              currentPage === 'home' ? 'bg-slate-900 text-red-400' : 'text-slate-300'
            }`}
          >
            Home
          </button>
          <button
            onClick={() => {
              handleNavClick('home');
              setTimeout(() => {
                const el = document.getElementById('services-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }, 100);
            }}
            className="w-full text-left px-3 py-2.5 rounded-md text-sm font-medium text-slate-300"
          >
            Services (4 Core Specialties)
          </button>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              openJobTracker();
            }}
            className="w-full text-left px-3 py-2.5 rounded-md text-sm font-medium text-slate-300 flex items-center gap-2"
          >
            <Car className="w-4 h-4 text-red-400" />
            Track Digital Job Card
          </button>
          <button
            onClick={() => handleNavClick('contact')}
            className={`w-full text-left px-3 py-2.5 rounded-md text-sm font-medium ${
              currentPage === 'contact' ? 'bg-slate-900 text-red-400' : 'text-slate-300'
            }`}
          >
            Contact Us & Workshop Hours
          </button>

          <div className="pt-2 border-t border-slate-800/80 flex flex-col gap-2">
            {!currentUser ? (
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => handleNavClick('login')}
                  className="w-full text-center py-2.5 rounded-md bg-slate-900 hover:bg-slate-800 text-white text-sm font-medium border border-slate-700"
                >
                  Sign In
                </button>
                <button
                  onClick={() => handleNavClick('register')}
                  className="w-full text-center py-2.5 rounded-md bg-slate-800 hover:bg-slate-700 text-white text-sm font-medium border border-slate-700"
                >
                  Register
                </button>
              </div>
            ) : (
              <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-between">
                <div>
                  <div className="text-sm font-semibold text-white">{currentUser.name}</div>
                  <div className="text-xs text-slate-400">{currentUser.email} ({currentUser.role})</div>
                  {currentUser.vehicle && (
                    <div className="text-xs font-mono text-red-400 mt-0.5">
                      {currentUser.vehicle.model} · {currentUser.vehicle.regNumber}
                    </div>
                  )}
                </div>
                <button
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                  className="p-2 text-slate-400 hover:text-red-400"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
