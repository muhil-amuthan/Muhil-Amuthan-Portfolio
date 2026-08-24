import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lock, ArrowLeft, Eye, EyeOff } from 'lucide-react';

export default function AdminLogin() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === (import.meta.env.VITE_ADMIN_PASSWORD || 'Muhil@2026')) {
      localStorage.setItem('adminAuth', 'authenticated');
      navigate('/admin/dashboard');
    } else {
      setError('Invalid password');
      setTimeout(() => setError(''), 3000);
    }
  };

  return (
    <div className="min-h-[100dvh] flex items-center justify-center bg-[#030305] relative overflow-hidden">
      {/* Background effects */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 90% 70% at 50% 0%, rgba(2, 19, 33, 0.9), transparent)',
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.15]"
        style={{
          backgroundImage: 'radial-gradient(rgba(255,255,255,0.08) 1px, transparent 0)',
          backgroundSize: '40px 40px',
        }}
      />

      <div className="relative z-10 w-full max-w-[400px] px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Back button */}
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-[rgba(255,255,255,0.5)] hover:text-white text-sm font-['Geist'] mb-8 transition-colors"
          >
            <ArrowLeft size={16} />
            Back to Portfolio
          </button>

          {/* Login Card */}
          <div className="glass-outer">
            <div className="glass-mid">
              <div className="glass-inner text-center">
                <div className="w-14 h-14 rounded-xl bg-[rgba(34,82,255,0.15)] flex items-center justify-center mx-auto mb-5">
                  <Lock size={24} className="text-[#2252FF]" />
                </div>
                <h1 className="text-2xl font-bold text-white font-['Geist'] mb-2">
                  Admin Access
                </h1>
                <p className="text-[rgba(255,255,255,0.5)] text-sm font-['Geist'] mb-6">
                  Enter password to manage portfolio content
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter password"
                      className="w-full bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.08)] rounded-lg px-4 py-3 text-sm text-white placeholder-[rgba(255,255,255,0.3)] font-['Geist'] focus:outline-none focus:border-[#2252FF] transition-colors pr-10"
                      autoFocus
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[rgba(255,255,255,0.3)] hover:text-white transition-colors"
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>

                  {error && (
                    <p className="text-red-400 text-xs font-['Geist']">{error}</p>
                  )}

                  <button
                    type="submit"
                    className="w-full bg-[#2252FF] text-white py-3 rounded-lg font-['Geist'] text-sm font-medium hover:bg-[#3952FF] transition-colors"
                  >
                    Enter Dashboard
                  </button>
                </form>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
