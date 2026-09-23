import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const posRef = useRef({ x: -100, y: -100 });
  const ringPosRef = useRef({ x: -100, y: -100 });
  const isHoveredRef = useRef(false);
  const isClickedRef = useRef(false);
  const isVisibleRef = useRef(false);

  useEffect(() => {
    // Avoid running on touch devices
    const isTouch =
      window.matchMedia('(pointer: coarse)').matches ||
      'ontouchstart' in window ||
      navigator.maxTouchPoints > 0;
    if (isTouch) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let rafId: number;

    const applyScale = () => {
      const isHover = isHoveredRef.current;
      const isClick = isClickedRef.current;

      const dotInner = dot.firstElementChild as HTMLElement | null;
      const ringInner = ring.firstElementChild as HTMLElement | null;

      if (dotInner) {
        const dotScale = isClick ? 0.75 : isHover ? 1.5 : 1;
        dotInner.style.transform = `scale(${dotScale})`;
      }
      if (ringInner) {
        const ringScale = isClick ? 0.85 : isHover ? 1.4 : 1;
        ringInner.style.transform = `scale(${ringScale})`;
        ringInner.style.borderColor = isHover ? 'rgba(34, 82, 255, 0.9)' : 'rgba(34, 82, 255, 0.45)';
        ringInner.style.backgroundColor = isHover ? 'rgba(34, 82, 255, 0.08)' : 'transparent';
      }
    };

    const updateHoverState = (target: HTMLElement | null) => {
      if (!target) return;
      const isInteractive = !!target.closest(
        'a, button, [role="button"], input, textarea, select, label, [data-cursor="pointer"]'
      );
      if (isInteractive !== isHoveredRef.current) {
        isHoveredRef.current = isInteractive;
        applyScale();
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      posRef.current.x = e.clientX;
      posRef.current.y = e.clientY;

      if (!isVisibleRef.current) {
        isVisibleRef.current = true;
        dot.style.opacity = '1';
        ring.style.opacity = '1';
        ringPosRef.current.x = e.clientX;
        ringPosRef.current.y = e.clientY;
      }

      // Instant hardware-accelerated update for zero input latency
      dot.style.transform = `translate3d(${e.clientX - 6}px, ${e.clientY - 6}px, 0)`;

      updateHoverState(e.target as HTMLElement);
    };

    const handleMouseDown = () => {
      isClickedRef.current = true;
      applyScale();
    };

    const handleMouseUp = () => {
      isClickedRef.current = false;
      applyScale();
    };

    const handleMouseLeave = () => {
      isVisibleRef.current = false;
      dot.style.opacity = '0';
      ring.style.opacity = '0';
    };

    const handleMouseEnter = () => {
      isVisibleRef.current = true;
      dot.style.opacity = '1';
      ring.style.opacity = '1';
    };

    // Physics spring/lerp loop for smooth trailing ring
    const animate = () => {
      if (isVisibleRef.current) {
        const lerp = 0.28;
        const dx = posRef.current.x - ringPosRef.current.x;
        const dy = posRef.current.y - ringPosRef.current.y;

        ringPosRef.current.x += dx * lerp;
        ringPosRef.current.y += dy * lerp;

        ring.style.transform = `translate3d(${ringPosRef.current.x - 20}px, ${ringPosRef.current.y - 20}px, 0)`;
      }

      rafId = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown, { passive: true });
    window.addEventListener('mouseup', handleMouseUp, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    rafId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      cancelAnimationFrame(rafId);
    };
  }, []);

  const isTouchDevice =
    typeof window !== 'undefined' &&
    (window.matchMedia('(pointer: coarse)').matches ||
      'ontouchstart' in window ||
      navigator.maxTouchPoints > 0);

  if (isTouchDevice) return null;

  return (
    <>
      {/* Precision Core Dot (Tracks 1:1 with hardware mouse) */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 z-[9999] pointer-events-none opacity-0"
        style={{
          width: '12px',
          height: '12px',
          willChange: 'transform',
          contain: 'layout style paint',
          transition: 'opacity 0.2s ease',
        }}
      >
        <div
          className="w-full h-full rounded-full mix-blend-difference"
          style={{
            background: 'radial-gradient(circle, #FFFFFF 0%, #2252FF 100%)',
            transition: 'transform 0.18s cubic-bezier(0.16, 1, 0.3, 1)',
            willChange: 'transform',
          }}
        />
      </div>

      {/* Smooth Trailing Halo Ring */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 z-[9998] pointer-events-none opacity-0"
        style={{
          width: '40px',
          height: '40px',
          willChange: 'transform',
          contain: 'layout style paint',
          transition: 'opacity 0.2s ease',
        }}
      >
        <div
          className="w-full h-full rounded-full border border-[rgba(34,82,255,0.45)]"
          style={{
            transition: 'transform 0.22s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.2s ease, background-color 0.2s ease',
            willChange: 'transform',
          }}
        />
      </div>
    </>
  );
}
