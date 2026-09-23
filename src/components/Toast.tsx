import { useEffect, useRef, useState, useCallback } from 'react';
import { CheckCircle, XCircle, X } from 'lucide-react';

interface ToastProps {
  message: string;
  type: 'success' | 'error';
  onClose: () => void;
  duration?: number; // ms, default 4000
}

export default function Toast({ message, type, onClose, duration = 4000 }: ToastProps) {
  const [leaving, setLeaving] = useState(false);
  const [paused, setPaused] = useState(false);
  const [progress, setProgress] = useState(1);
  const startRef = useRef(Date.now());
  const remainingRef = useRef(duration);
  const rafRef = useRef(0);

  const dismiss = useCallback(() => {
    setLeaving(true);
    // unmount after exit animation completes
    setTimeout(onClose, 250);
  }, [onClose]);

  // Countdown driven by rAF — smooth progress bar + supports pause
  useEffect(() => {
    if (paused) return;

    startRef.current = Date.now();
    const tick = () => {
      const elapsed = Date.now() - startRef.current;
      const remaining = remainingRef.current - elapsed;
      if (remaining <= 0) {
        setProgress(0);
        dismiss();
        return;
      }
      setProgress(remaining / duration);
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafRef.current);
      // stash what's left so pause resumes correctly
      remainingRef.current = Math.max(
        0,
        remainingRef.current - (Date.now() - startRef.current)
      );
    };
  }, [paused, dismiss, duration]);

  // ---------- Swipe to dismiss (touch) ----------
  const touchStartX = useRef<number | null>(null);
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(dx) > 60) dismiss();
    touchStartX.current = null;
  };

  const accent = type === 'success' ? '#D0FF71' : '#ef4444';

  return (
    <div
      role={type === 'error' ? 'alert' : 'status'}
      aria-live={type === 'error' ? 'assertive' : 'polite'}
      className={`fixed bottom-6 right-6 z-[9999] transition-all duration-250 ease-out ${
        leaving ? 'translate-y-3 opacity-0' : 'translate-y-0 opacity-100 animate-[toastIn_0.3s_ease]'
      }`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      style={{ touchAction: 'pan-y' }}
    >
      <div
        className="glass-card relative overflow-hidden px-5 py-4 flex items-center gap-3 min-w-[320px] max-w-[90vw]"
        style={{ borderLeft: `3px solid ${accent}` }}
      >
        {type === 'success' ? (
          <CheckCircle className="shrink-0" size={20} style={{ color: accent }} />
        ) : (
          <XCircle className="shrink-0" size={20} style={{ color: accent }} />
        )}

        <p className="text-white text-sm font-['Geist'] flex-1 leading-snug">{message}</p>

        <button
          onClick={dismiss}
          aria-label="Dismiss notification"
          className="text-[rgba(255,255,255,0.5)] hover:text-white transition-colors p-1 -m-1"
        >
          <X size={16} />
        </button>

        {/* Countdown bar */}
        <div
          className="absolute bottom-0 left-0 h-[2px] w-full origin-left"
          style={{
            background: accent,
            opacity: 0.6,
            transform: `scaleX(${progress})`,
          }}
        />
      </div>

      <style>{`
        @keyframes toastIn {
          from { opacity: 0; transform: translateY(16px) scale(0.97); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </div>
  );
}
