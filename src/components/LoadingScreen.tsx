import { useEffect, useState } from 'react';

export default function LoadingScreen() {
  const [visible, setVisible] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeOut(true);
      setTimeout(() => setVisible(false), 500);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div
      className={`fixed inset-0 z-[10000] bg-[#030305] flex items-center justify-center transition-opacity duration-500 ${
        fadeOut ? 'opacity-0' : 'opacity-100'
      }`}
    >
      <div className="relative">
        <div
          className="text-6xl font-bold text-white font-['Geist'] animate-pulse"
          style={{
            textShadow: '0 0 40px rgba(34, 82, 255, 0.6), 0 0 80px rgba(34, 82, 255, 0.3)',
          }}
        >
          MA
        </div>
        <div
          className="absolute inset-0 text-6xl font-bold text-transparent font-['Geist']"
          style={{
            background: 'radial-gradient(circle, #2252FF 0%, transparent 70%)',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            filter: 'blur(20px)',
            opacity: 0.5,
            animation: 'pulse 1.5s ease-in-out infinite',
          }}
        >
          MA
        </div>
      </div>
    </div>
  );
}
