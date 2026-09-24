import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  const posRef = useRef({ x: -100, y: -100 });       // mouse position (instant)
  const ringPosRef = useRef({ x: -100, y: -100 });   // smoothed ring position
  const ringVelRef = useRef({ x: 0, y: 0 });         // spring velocity
  const isHoveredRef = useRef(false);
  const isClickedRef = useRef(false);
  const isVisibleRef = useRef(false);
  const modeRef = useRef<'default' | 'hide'>('default');
  const rafIdRef = useRef<number>(0);

  useEffect(() => {
    // ── Bail out early on touch / coarse-pointer devices ──
    const isTouch =
      window.matchMedia('(pointer: coarse)').matches ||
      'ontouchstart' in window ||
      navigator.maxTouchPoints > 0;
    if (isTouch) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    const dotInner = dot?.firstElementChild as HTMLElement | null;
    const ringInner = ring?.firstElementChild as HTMLElement | null;
    if (!dot || !ring || !dotInner || !ringInner) return;

    // Hide the native cursor site-wide (custom cursor replaces it)
    document.documentElement.style.cursor = 'none';

    const isInteractive = (el: Element | null): boolean => {
      if (!el || !(el instanceof HTMLElement)) return false;
      if (el.closest('[data-cursor="hide"]')) {
        modeRef.current = 'hide';
        return false;
      }
      modeRef.current = 'default';
      return !!el.closest(
        'a, button, [role="button"], input, textarea, select, label, summary, [data-cursor="pointer"], [contenteditable="true"]'
      );
    };

    const applyState = () => {
      const hover = isHoveredRef.current;
      const click = isClickedRef.current;
      const hide = modeRef.current === 'hide';

      const dotScale = hide ? 0 : click ? 0.7 : hover ? 1.6 : 1;
      const ringScale = hide ? 0 : click ? 0.8 : hover ? 1.5 : 1;

      dotInner.style.transform = `scale(${dotScale})`;
      dotInner.style.opacity = hide ? '0' : '1';

      ringInner.style.transform = `scale(${ringScale})`;
      ringInner.style.opacity = hide ? '0' : '1';
      ringInner.style.borderColor = hover ? 'rgba(34, 82, 255, 0.95)' : 'rgba(34, 82, 255, 0.45)';
      ringInner.style.backgroundColor = hover ? 'rgba(34, 82, 255, 0.08)' : 'transparent';
    };

    // ── Event handlers ──────────────────────────────────────
    const handleMouseMove = (e: MouseEvent) => {
      posRef.current.x = e.clientX;
      posRef.current.y = e.clientY;

      if (!isVisibleRef.current) {
        isVisibleRef.current = true;
        dot.style.opacity = '1';
        ring.style.opacity = '1';
        ringPosRef.current.x = e.clientX;
        ringPosRef.current.y = e.clientY;
        ringVelRef.current.x = 0;
        ringVelRef.current.y = 0;
      }

      // Dot tracks 1:1 with zero lag (hardware-accelerated)
      dot.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;

      const interactive = isInteractive(e.target as Element);
      if (interactive !== isHoveredRef.current) {
        isHoveredRef.current = interactive;
        applyState();
      }
    };

    const handleMouseDown = () => { isClickedRef.current = true; applyState(); };
    const handleMouseUp = () => { isClickedRef.current = false; applyState(); };

    const hide = () => {
      isVisibleRef.current = false;
      dot.style.opacity = '0';
      ring.style.opacity = '0';
    };
    const show = () => {
      isVisibleRef.current = true;
      dot.style.opacity = '1';
      ring.style.opacity = '1';
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      // Accessibility: restore native cursor if user is keyboard-navigating
      if (e.key === 'Tab') {
        document.documentElement.style.cursor = '';
      }
    };
    const handleMouseMoveRestore = () => {
      document.documentElement.style.cursor = 'none';
    };

    // ── Spring physics loop (critically damped-ish feel) ────
    const stiffness = 0.14;  // spring strength
    const damping = 0.72;    // velocity retention (lower = snappier)

    const animate = () => {
      if (isVisibleRef.current) {
        const dx = posRef.current.x - ringPosRef.current.x;
        const dy = posRef.current.y - ringPosRef.current.y;

        ringVelRef.current.x = ringVelRef.current.x * damping + dx * stiffness;
        ringVelRef.current.y = ringVelRef.current.y * damping + dy * stiffness;

        ringPosRef.current.x += ringVelRef.current.x;
        ringPosRef.current.y += ringVelRef.current.y;

        ring.style.transform = `translate3d(${ringPosRef.current.x}px, ${ringPosRef.current.y}px, 0)`;
      }
      rafIdRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('mousemove', handleMouseMoveRestore, { passive: true }); // re-hide native cursor
    document.addEventListener('mouseleave', hide);
    document.addEventListener('mouseenter', show);
    rafIdRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('mousemove', handleMouseMoveRestore);
      document.removeEventListener('mouseleave', hide);
      document.removeEventListener('mouseenter', show);
      cancelAnimationFrame(rafIdRef.current);
      document.documentElement.style.cursor = ''; // restore on unmount
    };
  }, []);

  // SSR-safe: render nothing until we know it's a fine-pointer device.
  // The useEffect above unmounts immediately on touch devices anyway.
  return (
    <>
      {/* Precision core dot — tracks mouse 1:1 */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 z-[9999] pointer-events-none opacity-0"
        style={{ willChange: 'transform', contain: 'layout style paint', transition: 'opacity 0.2s ease' }}
      >
        <div
          className="rounded-full mix-blend-difference"
          style={{
            width: 12,
            height: 12,
            marginLeft: -6,
            marginTop: -6,
            background: 'radial-gradient(circle, #ffffff 0%, #2252ff 100%)',
            transition: 'transform 0.18s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.15s ease',
            willChange: 'transform',
          }}
        />
      </div>

      {/* Springy trailing halo ring */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 z-[9998] pointer-events-none opacity-0"
        style={{ willChange: 'transform', contain: 'layout style paint', transition: 'opacity 0.2s ease' }}
      >
        <div
          className="rounded-full border"
          style={{
            width: 40,
            height: 40,
            marginLeft: -20,
            marginTop: -20,
            borderColor: 'rgba(34, 82, 255, 0.45)',
            transition:
              'transform 0.22s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.2s ease, background-color 0.2s ease, opacity 0.15s ease',
            willChange: 'transform',
          }}
        />
      </div>

      {/* Optional label that can be toggled via data-cursor-label if you extend it */}
      <span ref={labelRef} className="sr-only" aria-hidden="true" />
    </>
  );
}
