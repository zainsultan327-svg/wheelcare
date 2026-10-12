import React, { useState } from 'react';
import { Wrench, Eye, EyeOff, Lock, Mail, User, Phone, Car, ArrowRight, CheckCircle2, ShieldCheck } from 'lucide-react';
import { useWorkshop } from '../context/WorkshopContext';

export const RegisterPage: React.FC = () => {
  const { register, navigateTo } = useWorkshop();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [carModel, setCarModel] = useState('');
  const [regNumber, setRegNumber] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!name.trim() || !email.trim() || !phone.trim() || !password || !carModel.trim() || !regNumber.trim()) {
      setErrorMessage('Please fill in all vehicle and account fields.');
      return;
    }

    if (password.length < 6) {
      setErrorMessage('Password must be at least 6 characters long.');
      return;
    }

    const result = register({
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      carModel: carModel.trim(),
      regNumber: regNumber.trim().toUpperCase(),
      password
    });

    if (result.success) {
      setIsSuccess(true);
      setTimeout(() => {
        navigateTo('home');
      }, 1500);
    } else {
      setErrorMessage(result.error || 'Failed to create account.');
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
      <div className="w-full max-w-lg space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex w-12 h-12 rounded-xl bg-red-600 items-center justify-center text-white shadow-lg shadow-red-950/60 mb-2">
            <Car className="w-6 h-6" />
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            Register Vehicle & Account
          </h1>
          <p className="text-sm text-slate-400">
            Create your WheelsCare customer profile for fast booking and live digital job cards.
          </p>
        </div>

        {/* Card */}
        <div className="rounded-2xl bg-slate-900 border border-slate-800 p-8 shadow-2xl shadow-black/80 space-y-6">
          {errorMessage && (
            <div className="p-3 rounded-lg bg-red-950/40 border border-red-800 text-red-300 text-xs">
              {errorMessage}
            </div>
          )}

          {isSuccess ? (
            <div className="text-center py-8 space-y-3">
              <div className="w-14 h-14 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h2 className="text-xl font-bold text-white">Account & Vehicle Registered!</h2>
              <p className="text-sm text-slate-300">
                Welcome to WheelsCare, <span className="text-white font-semibold">{name}</span>. Your vehicle <span className="font-mono text-red-400 font-semibold">{regNumber.toUpperCase()}</span> has been enrolled in our workshop system.
              </p>
              <div className="text-xs text-slate-500 pt-2">Redirecting to workshop dashboard...</div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Personal Details */}
              <div className="space-y-3">
                <div className="text-xs font-semibold text-slate-400 uppercase font-mono tracking-wider flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-red-500" />
                  Owner Information
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase font-mono tracking-wider mb-1.5">
                      Full Name *
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 absolute left-3.5 top-3 text-slate-500" />
                      <input
                        type="text"
                        required
                        placeholder="e.g. Jason Blake"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 focus:border-red-500 focus:ring-1 focus:ring-red-500 rounded-lg pl-10 pr-3.5 py-2.5 text-sm text-white placeholder-slate-600 outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase font-mono tracking-wider mb-1.5">
                      Phone Number *
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 absolute left-3.5 top-3 text-slate-500" />
                      <input
                        type="tel"
                        required
                        placeholder="e.g. +1 (555) 234-8899"
                        value={phone}
                        onChange={e => setPhone(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 focus:border-red-500 focus:ring-1 focus:ring-red-500 rounded-lg pl-10 pr-3.5 py-2.5 text-sm text-white placeholder-slate-600 outline-none font-mono"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase font-mono tracking-wider mb-1.5">
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 absolute left-3.5 top-3 text-slate-500" />
                    <input
                      type="email"
                      required
                      placeholder="e.g. jason@example.com"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 focus:border-red-500 focus:ring-1 focus:ring-red-500 rounded-lg pl-10 pr-3.5 py-2.5 text-sm text-white placeholder-slate-600 outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase font-mono tracking-wider mb-1.5">
                    Password *
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 absolute left-3.5 top-3 text-slate-500" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      placeholder="At least 6 characters"
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 focus:border-red-500 focus:ring-1 focus:ring-red-500 rounded-lg pl-10 pr-10 py-2.5 text-sm text-white placeholder-slate-600 outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-2.5 text-slate-500 hover:text-white transition-colors"
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              </div>

              {/* Vehicle Fields (Prompt requirement: Car Model and Registration Number) */}
              <div className="pt-3 border-t border-slate-800/80 space-y-3">
                <div className="text-xs font-semibold text-slate-400 uppercase font-mono tracking-wider flex items-center gap-1.5">
                  <Car className="w-3.5 h-3.5 text-red-500" />
                  Primary Vehicle Details
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase font-mono tracking-wider mb-1.5">
                      Car Model *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Toyota Camry 2022"
                      value={carModel}
                      onChange={e => setCarModel(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 focus:border-red-500 focus:ring-1 focus:ring-red-500 rounded-lg px-3.5 py-2.5 text-sm text-white placeholder-slate-600 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase font-mono tracking-wider mb-1.5">
                      Registration Number *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. ABC-4821"
                      value={regNumber}
                      onChange={e => setRegNumber(e.target.value.toUpperCase())}
                      className="w-full bg-slate-950 border border-slate-800 focus:border-red-500 focus:ring-1 focus:ring-red-500 rounded-lg px-3.5 py-2.5 text-sm text-white placeholder-slate-600 outline-none uppercase font-mono"
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 px-4 rounded-xl bg-red-600 hover:bg-red-500 active:bg-red-700 text-white font-bold text-sm shadow-lg shadow-red-950/60 transition-all flex items-center justify-center gap-2 cursor-pointer mt-4"
              >
                <span>Create Account</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}

          {/* Link back to login */}
          <div className="text-center pt-2 text-xs text-slate-400 border-t border-slate-800/80">
            Already have an account?{' '}
            <button
              onClick={() => navigateTo('login')}
              className="font-semibold text-red-400 hover:text-red-300 transition-colors ml-1 cursor-pointer"
            >
              Sign In
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
