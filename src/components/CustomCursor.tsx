import { useEffect, useRef } from 'react';

type Particle = { el: HTMLDivElement; life: number };

export default function MagneticCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const trailRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<Particle[]>([]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) return;

    const cursor = cursorRef.current;
    const label = labelRef.current;
    const trail = trailRef.current;
    if (!cursor || !label || !trail) return;

    const target = { x: -100, y: -100 };
    const pos = { x: -100, y: -100 };
    let hoverEl: HTMLElement | null = null;
    let labelText = '';
    let rafId: number;
    let lastSpawn = 0;

    const onMove = (e: MouseEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
    };

    const onOver = (e: MouseEvent) => {
      const el = (e.target as HTMLElement).closest<HTMLElement>(
        'a, button, [role="button"], [data-cursor="pointer"]'
      );
      hoverEl = el;
      if (el) {
        labelText = el.dataset.cursorLabel || '';
        const r = el.getBoundingClientRect();
        const cx = r.left + r.width / 2;
        const cy = r.top + r.height / 2;
        // Magnetic pull toward the element's center (max 8px)
        const pull = 0.25;
        target.x = e.clientX + (cx - e.clientX) * pull;
        target.y = e.clientY + (cy - e.clientY) * pull;
      } else {
        labelText = '';
      }
      label.textContent = labelText;
      label.style.opacity = labelText ? '1' : '0';
    };

    const spawnParticle = (x: number, y: number) => {
      if (particlesRef.current.length > 30) return;
      const el = document.createElement('div');
      el.style.cssText = `position:fixed;top:0;left:0;width:5px;height:5px;border-radius:50%;
        background:rgba(99,102,241,0.7);pointer-events:none;z-index:9997;will-change:transform,opacity;`;
      trail.appendChild(el);
      particlesRef.current.push({ el, life: 1 });
      el.style.transform = `translate(${x - 2.5}px, ${y - 2.5}px)`;
    };

    const animate = () => {
      // Fast catch-up with magnetic easing
      const speed = hoverEl ? 0.28 : 0.5;
      pos.x += (target.x - pos.x) * speed;
      pos.y += (target.y - pos.y) * speed;

      const size = labelText ? 72 : hoverEl ? 48 : 20;
      cursor.style.width = `${size}px`;
      cursor.style.height = `${size}px`;
      cursor.style.transform = `translate(${pos.x - size / 2}px, ${pos.y - size / 2}px)`;
      cursor.style.background = labelText
        ? 'rgba(99,102,241,0.95)'
        : hoverEl
          ? 'rgba(99,102,241,0.18)'
          : 'rgba(99,102,241,0.35)';
      cursor.style.backdropFilter = labelText ? 'none' : 'blur(2px)';

      // Particle trail
      const now = performance.now();
      if (now - lastSpawn > 40) {
        lastSpawn = now;
        spawnParticle(pos.x, pos.y);
      }
      particlesRef.current = particlesRef.current.filter((p) => {
        p.life -= 0.045;
        if (p.life <= 0) {
          p.el.remove();
          return false;
        }
        p.el.style.opacity = String(p.life);
        const s = 0.4 + p.life * 0.8;
        p.el.style.transform = p.el.style.transform.replace(/scale\([^)]*\)/, '') + ` scale(${s})`;
        return true;
      });

      rafId = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mouseover', onOver, { passive: true });
    rafId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onOver);
      cancelAnimationFrame(rafId);
      particlesRef.current.forEach((p) => p.el.remove());
      particlesRef.current = [];
    };
  }, []);

  if (typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0)) {
    return null;
  }

  return (
    <>
      <div ref={trailRef} className="pointer-events-none" />
      {/* Main cursor blob */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 z-[9999] pointer-events-none flex items-center justify-center"
        style={{
          width: '20px',
          height: '20px',
          borderRadius: '50%',
          background: 'rgba(99,102,241,0.35)',
          border: '1px solid rgba(99,102,241,0.6)',
          transition: 'width 0.25s ease, height 0.25s ease, background 0.25s ease',
          willChange: 'transform',
        }}
      >
        <span
          ref={labelRef}
          style={{
            fontSize: '11px',
            fontWeight: 600,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: '#fff',
            opacity: 0,
            transition: 'opacity 0.2s ease',
            whiteSpace: 'nowrap',
          }}
        />
      </div>
      <style>{`
        * { cursor: none; }
        input, textarea { cursor: text; }
      `}</style>
    </>
  );
}
