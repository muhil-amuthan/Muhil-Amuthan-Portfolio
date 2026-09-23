import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
}

const LINK_DIST = 110;       // max distance to draw connecting lines
const MOUSE_DIST = 160;      // mouse repel radius
const MOUSE_FORCE = 0.6;

export default function ParticleNetwork() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let rafId = 0;
    let particles: Particle[] = [];
    const mouse = { x: -9999, y: -9999 };
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.min(90, Math.floor((width * height) / 16000));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        size: Math.random() * 1.8 + 0.8,
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

        // Clamp velocity so particles never go crazy
        const sp = Math.hypot(p.vx, p.vy);
        const maxSp = 0.8;
        if (sp > maxSp) {
          p.vx = (p.vx / sp) * maxSp;
          p.vy = (p.vy / sp) * maxSp;
        }

        p.x += p.vx;
        p.y += p.vy;

        // Wrap around edges
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;
        if (p.y < -10) p.y = height + 10;
        if (p.y > height + 10) p.y = -10;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.55)';
        ctx.fill();
      }

      // Connect nearby particles with fading lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i];
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < LINK_DIST * LINK_DIST) {
            const d = Math.sqrt(d2);
            const alpha = (1 - d / LINK_DIST) * 0.25;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }

      rafId = requestAnimationFrame(animate);
    };

    const onVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(rafId);
      } else {
        rafId = requestAnimationFrame(animate);
      }
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
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}
