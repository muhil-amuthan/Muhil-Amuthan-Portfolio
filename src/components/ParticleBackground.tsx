import { useEffect, useRef } from 'react';

// Keep these in sync with CustomCursor — same values, same vibe
const THEMES = {
  aurora: { hueStart: 160, hueEnd: 280, saturation: 90, lightness: 60 }, // teal → violet
  sunset: { hueStart: 10, hueEnd: 320, saturation: 95, lightness: 60 },  // orange → pink
  ocean: { hueStart: 190, hueEnd: 220, saturation: 90, lightness: 55 },  // cyan → blue
  neon: { hueStart: 300, hueEnd: 180, saturation: 100, lightness: 60 },  // magenta → cyan
};

const ACTIVE_THEME: keyof typeof THEMES = 'aurora'; // <- change this (match your cursor)

interface BgParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  baseAlpha: number;
  hue: number;
  pulsePhase: number;
}

const LINK_DIST = 120;
const MOUSE_DIST = 140;
const MOUSE_FORCE = 0.5;

export default function AuroraBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const theme = THEMES[ACTIVE_THEME];
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    let width = 0;
    let height = 0;
    let rafId = 0;
    let particles: BgParticle[] = [];
    const mouse = { x: -9999, y: -9999 };
    let hueTime = 0;
    let frame = 0;

    const cycleHue = () =>
      theme.hueStart + (Math.sin(hueTime) + 1) * 0.5 * (theme.hueEnd - theme.hueStart);

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.min(80, Math.floor((width * height) / 18000));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 2 + 0.8,
        baseAlpha: Math.random() * 0.25 + 0.1,
        hue: theme.hueStart + Math.random() * (theme.hueEnd - theme.hueStart),
        pulsePhase: Math.random() * Math.PI * 2,
      }));
    };

    const onMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    const onLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };

    const animate = () => {
      frame++;
      hueTime += 0.008; // same speed as the cursor
      ctx.clearRect(0, 0, width, height);

      for (const p of particles) {
        // Mouse repulsion
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.hypot(dx, dy);
        if (dist < MOUSE_DIST && dist > 0.01) {
          const f = ((MOUSE_DIST - dist) / MOUSE_DIST) * MOUSE_FORCE;
          p.vx += (dx / dist) * f;
          p.vy += (dy / dist) * f;
        }

        // Velocity clamp — mirrors the cursor's "calm" energy
        const sp = Math.hypot(p.vx, p.vy);
        const maxSp = 0.6;
        if (sp > maxSp) {
          p.vx = (p.vx / sp) * maxSp;
          p.vy = (p.vy / sp) * maxSp;
        }

        p.x += p.vx;
        p.y += p.vy;

        // Wrap
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;
        if (p.y < -10) p.y = height + 10;
        if (p.y > height + 10) p.y = -10;

        // Gentle pulse
        const pulse = Math.sin(frame * 0.02 + p.pulsePhase) * 0.08;
        const alpha = p.baseAlpha + pulse;
        const hue = p.hue + (cycleHue() - (theme.hueStart + theme.hueEnd) / 2) * 0.4;

        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 3);
        grad.addColorStop(0, `hsla(${hue}, ${theme.saturation}%, ${theme.lightness}%, ${alpha})`);
        grad.addColorStop(1, `hsla(${hue}, ${theme.saturation}%, ${theme.lightness}%, 0)`);
        ctx.beginPath();
        ctx.fillStyle = grad;
        ctx.arc(p.x, p.y, p.size * 3, 0, Math.PI * 2);
        ctx.fill();
      }

      // Constellation links, colored with the current cycling hue
      const linkHue = cycleHue();
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i];
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < LINK_DIST * LINK_DIST) {
            const d = Math.sqrt(d2);
            const alpha = (1 - d / LINK_DIST) * 0.12;
            ctx.beginPath();
            ctx.strokeStyle = `hsla(${linkHue}, ${theme.saturation}%, ${theme.lightness}%, ${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      rafId = requestAnimationFrame(animate);
    };

    const onVisibility = () => {
      if (document.hidden) cancelAnimationFrame(rafId);
      else rafId = requestAnimationFrame(animate);
    };

    resize();
    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('mouseout', onLeave);
    document.addEventListener('visibilitychange', onVisibility);
    rafId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseout', onLeave);
      document.removeEventListener('visibilitychange', onVisibility);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none"
        style={{ zIndex: 0 }}
      />
      {/* Base backdrop so particles sit on a dark gradient, not raw body color */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          zIndex: -1,
          background: `radial-gradient(ellipse at 30% 20%, hsla(${THEMES[ACTIVE_THEME].hueStart}, 40%, 8%, 1) 0%, #050510 60%)`,
        }}
      />
    </>
  );
}
