"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { LoadingSpinner, HomeIcon } from '@/components/ui';

export default function LoginPage() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [checkingSession, setCheckingSession] = useState(true);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    unit: '',
    password: ''
  });

  // Check if already logged in
  useEffect(() => {
    fetch('/api/tenant/data')
      .then(res => {
        if (res.ok) router.push('/dashboard');
        else setCheckingSession(false);
      })
      .catch(() => setCheckingSession(false));
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';
    
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.error || 'Something went wrong');
      }

      router.push('/dashboard');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (checkingSession) return <div className="min-h-screen bg-[#0f131a] flex items-center justify-center"><LoadingSpinner /></div>;

  return (
    <div className="min-h-screen bg-[#0f131a] flex items-center justify-center p-4">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="w-[500px] h-[500px] bg-[rgba(0,153,173,0.08)] rounded-full blur-[120px] absolute top-[-250px] left-[-250px]" />
        <div className="w-[400px] h-[400px] bg-[rgba(0,153,173,0.05)] rounded-full blur-[100px] absolute bottom-[-200px] right-[-200px]" />
      </div>

      <div className="glass w-full max-w-md p-8 rounded-2xl relative z-10 slide-up">
        <div className="flex justify-center mb-6">
          <div className="bg-white/95 p-3 rounded-xl shadow-lg">
            <img src="/adeer-logo.png" alt="Adeer" className="h-10 w-auto object-contain" />
          </div>
        </div>
        
        <h1 className="text-2xl font-bold text-center text-white mb-1">
          {isLogin ? 'Tenant Portal' : 'Create Your Account'}
        </h1>
        <p className="text-center text-[var(--neutral-400)] text-sm mb-8">
          {isLogin ? 'Sign in to track your maintenance requests' : 'Register to submit and follow up on requests'}
        </p>

        {error && (
          <div className="bg-[rgba(248,113,113,0.1)] border border-[rgba(248,113,113,0.2)] text-[#f87171] px-4 py-3 rounded-xl text-sm mb-6">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <>
              <div>
                <label className="block text-xs font-semibold text-[var(--neutral-400)] mb-1.5 uppercase tracking-wide">Full Name</label>
                <input 
                  type="text" 
                  required 
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                  className="w-full bg-[var(--neutral-900)] border border-[var(--neutral-800)] text-white px-4 py-3 rounded-xl focus:border-[var(--primary-500)] focus:ring-1 focus:ring-[var(--primary-500)] outline-none transition-all"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[var(--neutral-400)] mb-1.5 uppercase tracking-wide">Unit / Apartment</label>
                <input 
                  type="text" 
                  required 
                  value={formData.unit}
                  onChange={e => setFormData({...formData, unit: e.target.value})}
                  className="w-full bg-[var(--neutral-900)] border border-[var(--neutral-800)] text-white px-4 py-3 rounded-xl focus:border-[var(--primary-500)] focus:ring-1 focus:ring-[var(--primary-500)] outline-none transition-all"
                  placeholder="e.g. 4B"
                />
              </div>
            </>
          )}

          <div>
            <label className="block text-xs font-semibold text-[var(--neutral-400)] mb-1.5 uppercase tracking-wide">Email Address</label>
            <input 
              type="email" 
              required 
              value={formData.email}
              onChange={e => setFormData({...formData, email: e.target.value})}
              className="w-full bg-[var(--neutral-900)] border border-[var(--neutral-800)] text-white px-4 py-3 rounded-xl focus:border-[var(--primary-500)] focus:ring-1 focus:ring-[var(--primary-500)] outline-none transition-all"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[var(--neutral-400)] mb-1.5 uppercase tracking-wide">Password</label>
            <input 
              type="password" 
              required 
              value={formData.password}
              onChange={e => setFormData({...formData, password: e.target.value})}
              className="w-full bg-[var(--neutral-900)] border border-[var(--neutral-800)] text-white px-4 py-3 rounded-xl focus:border-[var(--primary-500)] focus:ring-1 focus:ring-[var(--primary-500)] outline-none transition-all"
              placeholder="Minimum 6 characters"
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-[var(--primary-500)] hover:bg-[var(--primary-600)] text-white font-semibold py-3 px-4 rounded-xl transition-all disabled:opacity-70 flex justify-center items-center gap-2 mt-2"
          >
            {loading && <LoadingSpinner className="h-5 w-auto" />}
            {isLogin ? 'Sign In' : 'Create Account'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button 
            onClick={() => { setIsLogin(!isLogin); setError(''); }}
            className="text-sm text-[var(--primary-400)] hover:text-[var(--primary-300)] transition-colors"
          >
            {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
          </button>
        </div>
      </div>
    </div>
  );
}
