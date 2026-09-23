import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const posRef = useRef({ x: 0, y: 0 });
  const smoothPosRef = useRef({ x: 0, y: 0 });
  const isHoveringRef = useRef(false);
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    const cursor = cursorRef.current;
    if (!cursor) return;

    const handleMouseMove = (e: MouseEvent) => {
      posRef.current = { x: e.clientX, y: e.clientY };
    };

    const getInteractive = (target: HTMLElement) =>
      target.tagName === 'A' ||
      target.tagName === 'BUTTON' ||
      target.closest('a') ||
      target.closest('button') ||
      target.dataset.cursor === 'pointer';

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (getInteractive(target)) {
        isHoveringRef.current = true;
        const label = target.dataset.cursorText || target.closest('[data-cursor-text]')?.getAttribute('data-cursor-text');
        if (labelRef.current) labelRef.current.textContent = label || '';
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (getInteractive(target)) {
        isHoveringRef.current = false;
        if (labelRef.current) labelRef.current.textContent = '';
      }
    };

    let rafId: number;
    const animate = () => {
      smoothPosRef.current.x += (posRef.current.x - smoothPosRef.current.x) * 0.2;
      smoothPosRef.current.y += (posRef.current.y - smoothPosRef.current.y) * 0.2;

      const size = isHoveringRef.current ? 64 : 24;

      cursor.style.transform = `translate(${smoothPosRef.current.x - size / 2}px, ${smoothPosRef.current.y - size / 2}px)`;
      cursor.style.width = `${size}px`;
      cursor.style.height = `${size}px`;
      cursor.style.borderRadius = isHoveringRef.current ? '50%' : '2px';
      cursor.style.transform += ` rotate(${isHoveringRef.current ? 0 : 45}deg)`;

      rafId = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);
    rafId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
      cancelAnimationFrame(rafId);
    };
  }, []);

  const isTouchDevice = typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0);
  if (isTouchDevice) return null;

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 z-[9999] pointer-events-none flex items-center justify-center"
      style={{
        width: '24px',
        height: '24px',
        border: '1.5px solid #2252FF',
        background: 'rgba(34, 82, 255, 0.08)',
        backdropFilter: 'blur(1px)',
        transition: 'width 0.25s ease, height 0.25s ease, border-radius 0.25s ease',
      }}
    >
      <span
        ref={labelRef}
        className="text-[10px] font-medium tracking-wide uppercase select-none"
        style={{ color: '#2252FF' }}
      />
    </div>
  );
}
