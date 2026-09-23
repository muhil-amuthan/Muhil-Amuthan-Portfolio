import { useEffect, useRef } from 'react';

export default function GlowCursor() {
  const glowRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: -100, y: -100 });
  const glowPosRef = useRef({ x: -100, y: -100 });
  const glowVelRef = useRef({ x: 0, y: 0 });
  const hoveringRef = useRef(false);
  const pressedRef = useRef(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) return;

    const glow = glowRef.current;
    const dot = dotRef.current;
    if (!glow || !dot) return;

    const onMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const isInteractive = (el: HTMLElement) =>
      !!el.closest('a, button, [role="button"], input, textarea, select, [data-cursor="pointer"]');

    const onOver = (e: MouseEvent) => {
      hoveringRef.current = isInteractive(e.target as HTMLElement);
      document.body.style.cursor = hoveringRef.current ? 'pointer' : 'auto';
    };

    const onDown = () => { pressedRef.current = true; };
    const onUp = () => { pressedRef.current = false; };

    let rafId: number;
    const animate = () => {
      // Spring physics — glow "catches up" with a slight bounce feel
      const stiffness = 0.08;
      const damping = 0.75;

      glowVelRef.current.x =
        (glowVelRef.current.x + (mouseRef.current.x - glowPosRef.current.x) * stiffness) * damping;
      glowVelRef.current.y =
        (glowVelRef.current.y + (mouseRef.current.y - glowPosRef.current.y) * stiffness) * damping;

      glowPosRef.current.x += glowVelRef.current.x;
      glowPosRef.current.y += glowVelRef.current.y;

      const scale = pressedRef.current ? 0.7 : hoveringRef.current ? 1.6 : 1;
      const glowSize = 80;

      glow.style.transform = `translate(${glowPosRef.current.x - glowSize / 2}px, ${
        glowPosRef.current.y - glowSize / 2}px) scale(${scale})`;
      dot.style.transform = `translate(${mouseRef.current.x - 3}px, ${mouseRef.current.y - 3}px)`;

      rafId = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mouseover', onOver, { passive: true });
    window.addEventListener('mousedown', onDown);
    window.addEventListener('mouseup', onUp);
    rafId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onOver);
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup', onUp);
      cancelAnimationFrame(rafId);
      document.body.style.cursor = 'auto';
    };
  }, []);

  if (typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0)) {
    return null;
  }

  return (
    <>
      {/* Soft trailing glow */}
      <div
        ref={glowRef}
        className="fixed top-0 left-0 z-[9998] pointer-events-none"
        style={{
          width: '80px',
          height: '80px',
          borderRadius: '50%',
          background:
            'radial-gradient(circle, rgba(34,82,255,0.35) 0%, rgba(140,90,255,0.15) 45%, transparent 70%)',
          filter: 'blur(4px)',
          transition: 'transform 0.1s linear',
          willChange: 'transform',
        }}
      />
      {/* Precise center dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 z-[9999] pointer-events-none mix-blend-difference"
        style={{
          width: '6px',
          height: '6px',
          borderRadius: '50%',
          background: '#fff',
          willChange: 'transform',
        }}
      />
      <style>{`
        * { cursor: none; }
        input, textarea, select { cursor: text; }
      `}</style>
    </>
  );
}
