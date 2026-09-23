import { useEffect, useRef } from 'react';

// Swap this to change the whole vibe — each is a hue range for the trail/glow
const THEMES = {
  aurora: { hueStart: 160, hueEnd: 280, saturation: 90, lightness: 60 }, // teal → violet
  sunset: { hueStart: 10, hueEnd: 320, saturation: 95, lightness: 60 },  // orange → pink
  ocean: { hueStart: 190, hueEnd: 220, saturation: 90, lightness: 55 },  // cyan → blue
  neon: { hueStart: 300, hueEnd: 180, saturation: 100, lightness: 60 },  // magenta → cyan
};

const ACTIVE_THEME: keyof typeof THEMES = 'aurora'; // <- change this

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  hue: number;
}

interface Ripple {
  x: number;
  y: number;
  life: number;
  maxLife: number;
  hue: number;
}

export default function CustomCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const coreRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: -100, y: -100 });
  const smoothRef = useRef({ x: -100, y: -100 });
  const particlesRef = useRef<Particle[]>([]);
  const ripplesRef = useRef<Ripple[]>([]);
  const isHoveringRef = useRef(false);
  const angleRef = useRef(0);
  const hueTimeRef = useRef(0);

  useEffect(() => {
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    const canvas = canvasRef.current;
    const core = coreRef.current;
    if (!canvas || !core) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const theme = THEMES[ACTIVE_THEME];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const getInteractive = (target: HTMLElement) =>
      target.tagName === 'A' ||
      target.tagName === 'BUTTON' ||
      target.closest('a') ||
      target.closest('button') ||
      target.dataset.cursor === 'pointer';

    const handleMouseOver = (e: MouseEvent) => {
      if (getInteractive(e.target as HTMLElement)) isHoveringRef.current = true;
    };
    const handleMouseOut = (e: MouseEvent) => {
      if (getInteractive(e.target as HTMLElement)) isHoveringRef.current = false;
    };

    const handleClick = (e: MouseEvent) => {
      const hue = theme.hueStart + (Math.sin(hueTimeRef.current) + 1) * 0.5 * (theme.hueEnd - theme.hueStart);
      ripplesRef.current.push({ x: e.clientX, y: e.clientY, life: 0, maxLife: 40, hue });
      // Burst of particles on click
      for (let i = 0; i < 12; i++) {
        const a = (Math.PI * 2 * i) / 12;
        particlesRef.current.push({
          x: e.clientX,
          y: e.clientY,
          vx: Math.cos(a) * (2 + Math.random() * 2),
          vy: Math.sin(a) * (2 + Math.random() * 2),
          life: 0,
          maxLife: 35 + Math.random() * 15,
          size: 2 + Math.random() * 2,
          hue,
        });
      }
    };

    let rafId: number;
    let frame = 0;

    const animate = () => {
      frame++;
      hueTimeRef.current += 0.008;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      smoothRef.current.x += (mouseRef.current.x - smoothRef.current.x) * 0.18;
      smoothRef.current.y += (mouseRef.current.y - smoothRef.current.y) * 0.18;
      const { x, y } = smoothRef.current;

      // Cycling hue based on time (slow oscillation across the theme's range)
      const cycleHue = theme.hueStart + (Math.sin(hueTimeRef.current) + 1) * 0.5 * (theme.hueEnd - theme.hueStart);

      // Spawn trail particles
      if (frame % 2 === 0) {
        particlesRef.current.push({
          x: x + (Math.random() - 0.5) * 4,
          y: y + (Math.random() - 0.5) * 4,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          life: 0,
          maxLife: 30 + Math.random() * 20,
          size: isHoveringRef.current ? 3 + Math.random() * 2 : 1.5 + Math.random() * 1.5,
          hue: cycleHue,
        });
      }

      // Draw + update particles
      particlesRef.current = particlesRef.current.filter((p) => {
        p.life++;
        p.x += p.vx;
        p.y += p.vy;
        const t = p.life / p.maxLife;
        if (t >= 1) return false;

        const alpha = 1 - t;
        const size = p.size * (1 - t * 0.5);
        const color = `hsla(${p.hue}, ${theme.saturation}%, ${theme.lightness}%, ${alpha})`;
        const transparent = `hsla(${p.hue}, ${theme.saturation}%, ${theme.lightness}%, 0)`;

        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, size * 2.5);
        gradient.addColorStop(0, color);
        gradient.addColorStop(1, transparent);

        ctx.beginPath();
        ctx.fillStyle = gradient;
        ctx.arc(p.x, p.y, size * 2.5, 0, Math.PI * 2);
        ctx.fill();
        return true;
      });

      // Click ripples
      ripplesRef.current = ripplesRef.current.filter((r) => {
        r.life++;
        const t = r.life / r.maxLife;
        if (t >= 1) return false;
        const radius = t * 50;
        const alpha = 1 - t;
        ctx.beginPath();
        ctx.strokeStyle = `hsla(${r.hue}, ${theme.saturation}%, ${theme.lightness}%, ${alpha})`;
        ctx.lineWidth = 2 * (1 - t);
        ctx.arc(r.x, r.y, radius, 0, Math.PI * 2);
        ctx.stroke();
        return true;
      });

      // Orbiting satellites, colored across the hue range
      angleRef.current += isHoveringRef.current ? 0.12 : 0.06;
      const orbitRadius = isHoveringRef.current ? 24 : 15;
      const satelliteCount = isHoveringRef.current ? 5 : 3;

      for (let i = 0; i < satelliteCount; i++) {
        const a = angleRef.current + (i * Math.PI * 2) / satelliteCount;
        const sx = x + Math.cos(a) * orbitRadius;
        const sy = y + Math.sin(a) * orbitRadius;
        const satSize = isHoveringRef.current ? 3.5 : 2.2;
        const satHue = theme.hueStart + (i / satelliteCount) * (theme.hueEnd - theme.hueStart);

        ctx.beginPath();
        ctx.fillStyle = `hsla(${satHue}, ${theme.saturation}%, 85%, 0.95)`;
        ctx.arc(sx, sy, satSize, 0, Math.PI * 2);
        ctx.fill();

        ctx.beginPath();
        ctx.fillStyle = `hsla(${satHue}, ${theme.saturation}%, ${theme.lightness}%, 0.5)`;
        ctx.arc(sx, sy, satSize + 2.5, 0, Math.PI * 2);
        ctx.fill();
      }

      // Core dot with glow that matches the cycling hue
      const coreSize = isHoveringRef.current ? 11 : 7;
      core.style.transform = `translate(${x - coreSize / 2}px, ${y - coreSize / 2}px)`;
      core.style.width = `${coreSize}px`;
      core.style.height = `${coreSize}px`;
      core.style.boxShadow = `0 0 10px 3px hsla(${cycleHue}, ${theme.saturation}%, ${theme.lightness}%, 0.85)`;

      rafId = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);
    document.addEventListener('click', handleClick);
    rafId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
      document.removeEventListener('click', handleClick);
      cancelAnimationFrame(rafId);
    };
  }, []);

  const isTouchDevice = typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0);
  if (isTouchDevice) return null;

  return (
    <>
      <canvas ref={canvasRef} className="fixed top-0 left-0 z-[9998] pointer-events-none" />
      <div
        ref={coreRef}
        className="fixed top-0 left-0 z-[9999] pointer-events-none rounded-full"
        style={{
          width: '7px',
          height: '7px',
          background: '#FFFFFF',
          transition: 'width 0.2s ease, height 0.2s ease',
        }}
      />
    </>
  );
}
