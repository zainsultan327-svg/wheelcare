import React, { useState } from 'react';
import { Wrench, Eye, EyeOff, Lock, Mail, UserCheck, Car, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { useWorkshop } from '../context/WorkshopContext';
import { UserRole } from '../types';

export const LoginPage: React.FC = () => {
  const { login, navigateTo, currentUser } = useWorkshop();
  const [role, setRole] = useState<UserRole>('customer');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleRoleChange = (newRole: UserRole) => {
    setRole(newRole);
    setErrorMessage('');
    // Auto-fill convenience if email is empty
    if (!email) {
      if (newRole === 'customer') {
        setEmail('customer@wheelscare.com');
      } else {
        setEmail('staff@wheelscare.com');
      }
      setPassword('password123');
    }
  };

  const handleDemoFill = (selectedRole: UserRole) => {
    setRole(selectedRole);
    if (selectedRole === 'customer') {
      setEmail('customer@wheelscare.com');
      setPassword('customer123');
    } else {
      setEmail('staff@wheelscare.com');
      setPassword('staff123');
    }
    setErrorMessage('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!email.trim()) {
      setErrorMessage('Please enter your email address.');
      return;
    }
    if (!password) {
      setErrorMessage('Please enter your password.');
      return;
    }

    const result = login(email, role);
    if (result.success) {
      setSuccessMessage(`Signed in successfully as ${role === 'staff' ? 'Workshop Staff' : 'Customer'}! Redirecting...`);
      setTimeout(() => {
        navigateTo('home');
      }, 1000);
    } else {
      setErrorMessage(result.error || 'Invalid credentials.');
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
      <div className="w-full max-w-md space-y-6">
        {/* Header Branding */}
        <div className="text-center space-y-2">
          <div className="inline-flex w-12 h-12 rounded-xl bg-red-600 items-center justify-center text-white shadow-lg shadow-red-950/60 mb-2">
            <Wrench className="w-6 h-6" />
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            Sign In to Wheels<span className="text-red-500">Care</span>
          </h1>
          <p className="text-sm text-slate-400">
            Access your vehicle service history, live job cards, or workshop bay tools.
          </p>
        </div>

        {/* Login Card */}
        <div className="rounded-2xl bg-slate-900 border border-slate-800 p-8 shadow-2xl shadow-black/80 space-y-6">
          {/* Role Selector: Customer vs Workshop Staff */}
          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase font-mono tracking-wider mb-2">
              Select Your Role *
            </label>
            <div className="grid grid-cols-2 gap-2 p-1 bg-slate-950 rounded-xl border border-slate-800">
              <button
                type="button"
                onClick={() => handleRoleChange('customer')}
                className={`py-2.5 px-3 rounded-lg text-xs font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                  role === 'customer'
                    ? 'bg-red-600 text-white shadow-md shadow-red-950'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Car className="w-3.5 h-3.5" />
                <span>Customer</span>
              </button>

              <button
                type="button"
                onClick={() => handleRoleChange('staff')}
                className={`py-2.5 px-3 rounded-lg text-xs font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                  role === 'staff'
                    ? 'bg-red-600 text-white shadow-md shadow-red-950'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <UserCheck className="w-3.5 h-3.5" />
                <span>Workshop Staff</span>
              </button>
            </div>
          </div>

          {/* Error / Success Feedback */}
          {errorMessage && (
            <div className="p-3 rounded-lg bg-red-950/40 border border-red-800 text-red-300 text-xs">
              {errorMessage}
            </div>
          )}
          {successMessage && (
            <div className="p-3 rounded-lg bg-emerald-950/40 border border-emerald-800 text-emerald-300 text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>{successMessage}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase font-mono tracking-wider mb-1.5">
                Email Address *
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3.5 top-3 text-slate-500" />
                <input
                  type="email"
                  required
                  placeholder={role === 'customer' ? 'name@example.com' : 'staff@wheelscare.com'}
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 focus:border-red-500 focus:ring-1 focus:ring-red-500 rounded-lg pl-10 pr-3.5 py-2.5 text-sm text-white placeholder-slate-600 outline-none transition-colors"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-semibold text-slate-300 uppercase font-mono tracking-wider">
                  Password *
                </label>
                <span className="text-xs text-slate-500 hover:text-slate-400 cursor-pointer">
                  Forgot password?
                </span>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3.5 top-3 text-slate-500" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 focus:border-red-500 focus:ring-1 focus:ring-red-500 rounded-lg pl-10 pr-10 py-2.5 text-sm text-white placeholder-slate-600 outline-none transition-colors"
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

            <button
              type="submit"
              className="w-full py-3 px-4 rounded-xl bg-red-600 hover:bg-red-500 active:bg-red-700 text-white font-bold text-sm shadow-lg shadow-red-950/60 transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
            >
              <span>Sign In as {role === 'staff' ? 'Staff' : 'Customer'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Quick Demo Credentials Assistant */}
          <div className="pt-4 border-t border-slate-800/80 space-y-2">
            <div className="text-[11px] uppercase font-mono text-slate-500 text-center font-semibold">
              Instant Demo Access:
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                type="button"
                onClick={() => handleDemoFill('customer')}
                className="py-1.5 px-2 rounded bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-300 font-mono transition-colors text-center"
              >
                Fill Customer
              </button>
              <button
                type="button"
                onClick={() => handleDemoFill('staff')}
                className="py-1.5 px-2 rounded bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-300 font-mono transition-colors text-center"
              >
                Fill Workshop Staff
              </button>
            </div>
          </div>

          {/* Navigation to Register */}
          <div className="text-center pt-2 text-xs text-slate-400">
            Don't have an account yet?{' '}
            <button
              onClick={() => navigateTo('register')}
              className="font-semibold text-red-400 hover:text-red-300 transition-colors ml-1 cursor-pointer"
            >
              Create Account (Register Car)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
