import { useRef, useEffect, useState } from 'react';

/**
 * Robust useInView hook optimized for mobile web and touch devices.
 * - Generous rootMargin (200px) to trigger well before entering screen.
 * - Low threshold (0.01) to prevent tall mobile sections from failing to trigger.
 * - Fallback timer (300ms) ensures content is NEVER left blank/invisible on mobile battery-saver.
 */
export function useInView(threshold = 0.01, rootMargin = '200px 0px') {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    // If SSR or IntersectionObserver is not supported, reveal content immediately
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      setInView(true);
      return;
    }

    const el = ref.current;
    if (!el) {
      setInView(true);
      return;
    }

    // Fallback timer ensures that mobile browsers / slow renders never get stuck at opacity 0
    const fallbackTimer = setTimeout(() => {
      setInView(true);
    }, 350);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          clearTimeout(fallbackTimer);
          observer.disconnect();
        }
      },
      {
        threshold: Math.min(threshold, 0.05),
        rootMargin,
      }
    );

    observer.observe(el);

    return () => {
      clearTimeout(fallbackTimer);
      observer.disconnect();
    };
  }, [threshold, rootMargin]);

  return { ref, inView };
}

export default useInView;

