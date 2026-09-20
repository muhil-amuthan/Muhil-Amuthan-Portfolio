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
      className={`fixed inset-0 z-[10000] bg-[#030305] flex flex-col items-center justify-center transition-opacity duration-500 select-none ${
        fadeOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <div className="relative flex flex-col items-center text-center px-4">
        {/* Ambient glow */}
        <div className="absolute -inset-12 bg-[radial-gradient(circle_at_center,rgba(34,82,255,0.22),transparent_70%)] blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center">
          <div
            className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-white font-['Geist'] tracking-tight"
            style={{
              textShadow: '0 0 40px rgba(34, 82, 255, 0.6), 0 0 80px rgba(34, 82, 255, 0.3)',
            }}
          >
            Muhil's
          </div>
          <div
            className="text-2xl sm:text-3xl md:text-4xl font-light text-[rgba(255,255,255,0.8)] font-['Geist'] tracking-[0.2em] uppercase mt-2 sm:mt-3"
            style={{
              textShadow: '0 0 20px rgba(255, 255, 255, 0.2)',
            }}
          >
            Portfolio
          </div>

          {/* Animated Accent Bar */}
          <div className="mt-6 w-32 sm:w-44 h-[2px] bg-[rgba(255,255,255,0.1)] rounded-full overflow-hidden relative">
            <div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-[#2252FF] to-[#D0FF71]"
              style={{
                animation: 'sweep 1.6s ease-in-out infinite',
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
