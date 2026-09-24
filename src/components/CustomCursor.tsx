```tsx
import { useEffect, useRef } from 'react';

type CursorMode =
  | 'default'
  | 'link'
  | 'project'
  | 'external'
  | 'download'
  | 'contact'
  | 'preview'
  | 'magnetic';

interface CursorState {
  mode: CursorMode;
  label: string;
  icon: string;
}

const CURSOR_STATES: Record<CursorMode, CursorState> = {
  default: {
    mode: 'default',
    label: '',
    icon: '',
  },

  link: {
    mode: 'link',
    label: 'OPEN',
    icon: '↗',
  },

  project: {
    mode: 'project',
    label: 'VIEW PROJECT',
    icon: '↗',
  },

  external: {
    mode: 'external',
    label: 'OPEN',
    icon: '↗',
  },

  download: {
    mode: 'download',
    label: 'DOWNLOAD',
    icon: '↓',
  },

  contact: {
    mode: 'contact',
    label: 'CONTACT',
    icon: '✦',
  },

  preview: {
    mode: 'preview',
    label: 'PREVIEW',
    icon: '◉',
  },

  magnetic: {
    mode: 'magnetic',
    label: '',
    icon: '',
  },
};

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  const labelRef = useRef<HTMLSpanElement>(null);
  const iconRef = useRef<HTMLSpanElement>(null);

  const positionRef = useRef({
    x: -100,
    y: -100,
  });

  const ringPositionRef = useRef({
    x: -100,
    y: -100,
  });

  const velocityRef = useRef({
    x: 0,
    y: 0,
  });

  const targetScaleRef = useRef(1);
  const currentScaleRef = useRef(1);

  const visibleRef = useRef(false);
  const clickedRef = useRef(false);

  const currentModeRef = useRef<CursorMode>('default');

  const magneticElementRef =
    useRef<HTMLElement | null>(null);

  useEffect(() => {
    /* --------------------------------------------------
       DEVICE CHECK
    -------------------------------------------------- */

    const isTouchDevice =
      window.matchMedia('(pointer: coarse)').matches ||
      'ontouchstart' in window ||
      navigator.maxTouchPoints > 0;

    if (isTouchDevice) {
      return;
    }

    /* --------------------------------------------------
       REDUCED MOTION
    -------------------------------------------------- */

    const reducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    const cursor = cursorRef.current;
    const dot = dotRef.current;
    const ring = ringRef.current;
    const label = labelRef.current;
    const icon = iconRef.current;

    if (!cursor || !dot || !ring || !label || !icon) {
      return;
    }

    let animationFrame = 0;

    /* --------------------------------------------------
       SHOW / HIDE
    -------------------------------------------------- */

    const showCursor = () => {
      if (visibleRef.current) return;

      visibleRef.current = true;

      cursor.style.opacity = '1';
    };

    const hideCursor = () => {
      visibleRef.current = false;

      cursor.style.opacity = '0';

      magneticElementRef.current = null;
    };

    /* --------------------------------------------------
       UPDATE CURSOR CONTENT
    -------------------------------------------------- */

    const setCursorMode = (
      mode: CursorMode
    ) => {
      if (currentModeRef.current === mode) {
        return;
      }

      currentModeRef.current = mode;

      const state = CURSOR_STATES[mode];

      label.textContent = state.label;
      icon.textContent = state.icon;

      /* Reset magnetic element */

      magneticElementRef.current = null;

      /* ------------------------------------------------
         SIZE
      ------------------------------------------------ */

      switch (mode) {
        case 'project':
          targetScaleRef.current = 1.55;
          break;

        case 'download':
          targetScaleRef.current = 1.45;
          break;

        case 'contact':
          targetScaleRef.current = 1.5;
          break;

        case 'preview':
          targetScaleRef.current = 1.45;
          break;

        case 'external':
        case 'link':
          targetScaleRef.current = 1.35;
          break;

        default:
          targetScaleRef.current = 1;
      }

      /* ------------------------------------------------
         Visual state
      ------------------------------------------------ */

      cursor.dataset.mode = mode;
    };

    /* --------------------------------------------------
       DETECT ELEMENT
    -------------------------------------------------- */

    const detectCursorMode = (
      target: HTMLElement | null
    ) => {
      if (!target) {
        setCursorMode('default');
        return;
      }

      const customElement = target.closest(
        '[data-cursor]'
      ) as HTMLElement | null;

      if (customElement) {
        const customMode =
          customElement.dataset.cursor as CursorMode;

        if (CURSOR_STATES[customMode]) {
          setCursorMode(customMode);

          if (
            customMode === 'magnetic'
          ) {
            magneticElementRef.current =
              customElement;
          }

          return;
        }
      }

      /* ------------------------------------------------
         Automatic detection
      ------------------------------------------------ */

      const element = target.closest(
        'a, button, [role="button"]'
      ) as HTMLElement | null;

      if (!element) {
        setCursorMode('default');
        return;
      }

      /* Download */

      const download =
        element.hasAttribute('download') ||
        element.textContent
          ?.toLowerCase()
          .includes('download') ||
        element.textContent
          ?.toLowerCase()
          .includes('resume');

      if (download) {
        setCursorMode('download');
        return;
      }

      /* Contact */

      const contact =
        element.textContent
          ?.toLowerCase()
          .includes('contact') ||
        element.getAttribute('href') === '#contact';

      if (contact) {
        setCursorMode('contact');
        return;
      }

      /* Project */

      const project =
        element.closest(
          '[data-project], .project-card, .project'
        ) !== null;

      if (project) {
        setCursorMode('project');
        return;
      }

      /* External link */

      if (
        element.tagName === 'A' &&
        (element as HTMLAnchorElement).target ===
          '_blank'
      ) {
        setCursorMode('external');
        return;
      }

      /* Default link */

      setCursorMode('link');
    };

    /* --------------------------------------------------
       MOUSE MOVE
    -------------------------------------------------- */

    const handleMouseMove = (
      event: MouseEvent
    ) => {
      const x = event.clientX;
      const y = event.clientY;

      /* Velocity */

      velocityRef.current.x =
        x - positionRef.current.x;

      velocityRef.current.y =
        y - positionRef.current.y;

      positionRef.current.x = x;
      positionRef.current.y = y;

      showCursor();

      /* Detect hovered element */

      detectCursorMode(
        event.target as HTMLElement
      );

      /* ------------------------------------------------
         MAGNETIC ELEMENT
      ------------------------------------------------ */

      const magnetic =
        magneticElementRef.current;

      if (magnetic) {
        const rect =
          magnetic.getBoundingClientRect();

        const centerX =
          rect.left + rect.width / 2;

        const centerY =
          rect.top + rect.height / 2;

        const distanceX =
          centerX - x;

        const distanceY =
          centerY - y;

        const maxDistance = 120;

        const distance = Math.sqrt(
          distanceX * distanceX +
            distanceY * distanceY
        );

        if (distance < maxDistance) {
          const strength =
            1 - distance / maxDistance;

          magnetic.style.transform =
            `translate(
              ${distanceX * strength * 0.12}px,
              ${distanceY * strength * 0.12}px
            )`;
        } else {
          magnetic.style.transform = '';
          magneticElementRef.current = null;
        }
      }
    };

    /* --------------------------------------------------
       MOUSE DOWN
    -------------------------------------------------- */

    const handleMouseDown = () => {
      clickedRef.current = true;

      cursor.dataset.clicked = 'true';

      targetScaleRef.current *= 0.85;

      /* Click ripple */

      if (!reducedMotion) {
        ring.animate(
          [
            {
              transform:
                'translate3d(-50%, -50%, 0) scale(1)',
              opacity: 0.9,
            },
            {
              transform:
                'translate3d(-50%, -50%, 0) scale(1.7)',
              opacity: 0.2,
            },
            {
              transform:
                'translate3d(-50%, -50%, 0) scale(1)',
              opacity: 0.9,
            },
          ],
          {
            duration: 400,
            easing:
              'cubic-bezier(0.16, 1, 0.3, 1)',
          }
        );
      }
    };

    /* --------------------------------------------------
       MOUSE UP
    -------------------------------------------------- */

    const handleMouseUp = () => {
      clickedRef.current = false;

      cursor.dataset.clicked = 'false';

      const mode =
        currentModeRef.current;

      switch (mode) {
        case 'project':
          targetScaleRef.current = 1.55;
          break;

        case 'download':
          targetScaleRef.current = 1.45;
          break;

        case 'contact':
          targetScaleRef.current = 1.5;
          break;

        case 'preview':
          targetScaleRef.current = 1.45;
          break;

        case 'external':
        case 'link':
          targetScaleRef.current = 1.35;
          break;

        default:
          targetScaleRef.current = 1;
      }
    };

    /* --------------------------------------------------
       MOUSE LEAVE
    -------------------------------------------------- */

    const handleMouseLeave = () => {
      hideCursor();
    };

    const handleMouseEnter = () => {
      showCursor();
    };

    /* --------------------------------------------------
       ANIMATION LOOP
    -------------------------------------------------- */

    const animate = () => {
      if (visibleRef.current) {
        /* ----------------------------------------------
           Dot
        ---------------------------------------------- */

        const dotX =
          positionRef.current.x;

        const dotY =
          positionRef.current.y;

        dot.style.transform =
          `translate3d(
            ${dotX}px,
            ${dotY}px,
            0
          ) translate(-50%, -50%)`;

        /* ----------------------------------------------
           Ring smoothing
        ---------------------------------------------- */

        const dx =
          positionRef.current.x -
          ringPositionRef.current.x;

        const dy =
          positionRef.current.y -
          ringPositionRef.current.y;

        const speed =
          Math.abs(velocityRef.current.x) +
          Math.abs(velocityRef.current.y);

        const lerp = reducedMotion
          ? 1
          : Math.min(
              0.14 + speed * 0.006,
              0.35
            );

        ringPositionRef.current.x +=
          dx * lerp;

        ringPositionRef.current.y +=
          dy * lerp;

        ring.style.transform =
          `translate3d(
            ${ringPositionRef.current.x}px,
            ${ringPositionRef.current.y}px,
            0
          ) translate(-50%, -50%)`;

        /* ----------------------------------------------
           Smooth scaling
        ---------------------------------------------- */

        currentScaleRef.current +=
          (
            targetScaleRef.current -
            currentScaleRef.current
          ) * 0.15;

        ring.style.setProperty(
          '--cursor-scale',
          String(currentScaleRef.current)
        );

        /* ----------------------------------------------
           Velocity decay
        ---------------------------------------------- */

        velocityRef.current.x *= 0.85;
        velocityRef.current.y *= 0.85;
      }

      animationFrame =
        requestAnimationFrame(animate);
    };

    /* --------------------------------------------------
       EVENTS
    -------------------------------------------------- */

    window.addEventListener(
      'mousemove',
      handleMouseMove,
      { passive: true }
    );

    window.addEventListener(
      'mousedown',
      handleMouseDown,
      { passive: true }
    );

    window.addEventListener(
      'mouseup',
      handleMouseUp,
      { passive: true }
    );

    document.addEventListener(
      'mouseleave',
      handleMouseLeave
    );

    document.addEventListener(
      'mouseenter',
      handleMouseEnter
    );

    /* --------------------------------------------------
       INITIAL POSITION
    -------------------------------------------------- */

    ringPositionRef.current = {
      x: -100,
      y: -100,
    };

    /* Start */

    animationFrame =
      requestAnimationFrame(animate);

    /* --------------------------------------------------
       CLEANUP
    -------------------------------------------------- */

    return () => {
      cancelAnimationFrame(
        animationFrame
      );

      window.removeEventListener(
        'mousemove',
        handleMouseMove
      );

      window.removeEventListener(
        'mousedown',
        handleMouseDown
      );

      window.removeEventListener(
        'mouseup',
        handleMouseUp
      );

      document.removeEventListener(
        'mouseleave',
        handleMouseLeave
      );

      document.removeEventListener(
        'mouseenter',
        handleMouseEnter
      );

      /* Reset magnetic element */

      if (magneticElementRef.current) {
        magneticElementRef.current.style.transform =
          '';
      }
    };
  }, []);

  /* --------------------------------------------------
     TOUCH DEVICE CHECK
  -------------------------------------------------- */

  const isTouchDevice =
    typeof window !== 'undefined' &&
    (
      window.matchMedia(
        '(pointer: coarse)'
      ).matches ||
      'ontouchstart' in window ||
      navigator.maxTouchPoints > 0
    );

  if (isTouchDevice) {
    return null;
  }

  return (
    <>
      {/* =================================================
          CUSTOM CURSOR
      ================================================= */}

      <div
        ref={cursorRef}
        className="custom-cursor"
        aria-hidden="true"
      >
        {/* -----------------------------------------------
            CORE DOT
        ----------------------------------------------- */}

        <div
          ref={dotRef}
          className="custom-cursor-dot"
        >
          <span />
        </div>

        {/* -----------------------------------------------
            OUTER RING
        ----------------------------------------------- */}

        <div
          ref={ringRef}
          className="custom-cursor-ring"
        >
          <span className="custom-cursor-ring-glow" />

          <span
            ref={iconRef}
            className="custom-cursor-icon"
          />

          <span
            ref={labelRef}
            className="custom-cursor-label"
          />
        </div>
      </div>

      {/* =================================================
          CURSOR STYLES
      ================================================= */}

      <style>{`
        /* -----------------------------------------------
           MAIN CURSOR
        ----------------------------------------------- */

        .custom-cursor {
          position: fixed;

          top: 0;
          left: 0;

          width: 0;
          height: 0;

          z-index: 999999;

          pointer-events: none;

          opacity: 0;

          transition:
            opacity 180ms ease;

          contain:
            layout
            style
            paint;
        }

        /* -----------------------------------------------
           CORE DOT
        ----------------------------------------------- */

        .custom-cursor-dot {
          position: fixed;

          top: 0;
          left: 0;

          width: 10px;
          height: 10px;

          border-radius: 999px;

          transform:
            translate3d(-100px, -100px, 0)
            translate(-50%, -50%);

          will-change: transform;

          z-index: 2;
        }

        .custom-cursor-dot span {
          display: block;

          width: 100%;
          height: 100%;

          border-radius: 999px;

          background:
            radial-gradient(
              circle,
              #ffffff 0%,
              #2252ff 55%,
              rgba(34, 82, 255, 0.2) 100%
            );

          box-shadow:
            0 0 8px
              rgba(34, 82, 255, 0.8),

            0 0 18px
              rgba(34, 82, 255, 0.35);

          transition:
            transform 180ms
              cubic-bezier(
                0.16,
                1,
                0.3,
                1
              );
        }

        /* -----------------------------------------------
           OUTER RING
        ----------------------------------------------- */

        .custom-cursor-ring {
          position: fixed;

          top: 0;
          left: 0;

          width: 42px;
          height: 42px;

          border:
            1px solid
            rgba(34, 82, 255, 0.45);

          border-radius: 999px;

          transform:
            translate3d(-100px, -100px, 0)
            translate(-50%, -50%)
            scale(var(--cursor-scale, 1));

          will-change:
            transform,
            border-color,
            background-color;

          transition:
            width 220ms
              cubic-bezier(
                0.16,
                1,
                0.3,
                1
              ),

            height 220ms
              cubic-bezier(
                0.16,
                1,
                0.3,
                1
              ),

            border-color 180ms ease,

            background-color 180ms ease,

            box-shadow 180ms ease;

          display: flex;

          align-items: center;

          justify-content: center;

          flex-direction: column;

          gap: 2px;

          overflow: hidden;

          z-index: 1;

          backdrop-filter:
            blur(2px);
        }

        /* -----------------------------------------------
           GLOW
        ----------------------------------------------- */

        .custom-cursor-ring-glow {
          position: absolute;

          inset: -10px;

          border-radius: inherit;

          background:
            radial-gradient(
              circle,
              rgba(34, 82, 255, 0.18),
              transparent 68%
            );

          opacity: 0;

          transition:
            opacity 200ms ease;
        }

        /* -----------------------------------------------
           ICON
        ----------------------------------------------- */

        .custom-cursor-icon {
          position: relative;

          z-index: 2;

          font-size: 13px;

          line-height: 1;

          font-weight: 600;

          color: #2252ff;

          opacity: 0;

          transform:
            translateY(4px)
            scale(0.8);

          transition:
            opacity 180ms ease,
            transform 180ms
              cubic-bezier(
                0.16,
                1,
                0.3,
                1
              );
        }

        /* -----------------------------------------------
           LABEL
        ----------------------------------------------- */

        .custom-cursor-label {
          position: relative;

          z-index: 2;

          max-width: 90px;

          font-size: 6px;

          line-height: 1;

          font-weight: 700;

          letter-spacing:
            0.08em;

          white-space: nowrap;

          text-align: center;

          color: #2252ff;

          opacity: 0;

          transform:
            translateY(4px)
            scale(0.8);

          transition:
            opacity 180ms ease,
            transform 180ms
              cubic-bezier(
                0.16,
                1,
                0.3,
                1
              );
        }

        /* =================================================
           DEFAULT
        ================================================= */

        .custom-cursor[data-mode="default"]
          .custom-cursor-ring {
          border-color:
            rgba(34, 82, 255, 0.4);

          background:
            transparent;

          box-shadow:
            0 0 12px
              rgba(34, 82, 255, 0.08);
        }

        /* =================================================
           INTERACTIVE STATES
        ================================================= */

        .custom-cursor[data-mode="link"]
          .custom-cursor-ring,

        .custom-cursor[data-mode="external"]
          .custom-cursor-ring,

        .custom-cursor[data-mode="project"]
          .custom-cursor-ring,

        .custom-cursor[data-mode="download"]
          .custom-cursor-ring,

        .custom-cursor[data-mode="contact"]
          .custom-cursor-ring,

        .custom-cursor[data-mode="preview"]
          .custom-cursor-ring {
          border-color:
            rgba(34, 82, 255, 0.9);

          background:
            rgba(34, 82, 255, 0.07);

          box-shadow:
            0 0 20px
              rgba(34, 82, 255, 0.18);
        }

        /* -----------------------------------------------
           SHOW CONTENT
        ----------------------------------------------- */

        .custom-cursor[data-mode="link"]
          .custom-cursor-icon,

        .custom-cursor[data-mode="external"]
          .custom-cursor-icon,

        .custom-cursor[data-mode="project"]
          .custom-cursor-icon,

        .custom-cursor[data-mode="download"]
          .custom-cursor-icon,

        .custom-cursor[data-mode="contact"]
          .custom-cursor-icon,

        .custom-cursor[data-mode="preview"]
          .custom-cursor-icon,

        .custom-cursor[data-mode="project"]
          .custom-cursor-label,

        .custom-cursor[data-mode="download"]
          .custom-cursor-label,

        .custom-cursor[data-mode="contact"]
          .custom-cursor-label,

        .custom-cursor[data-mode="preview"]
          .custom-cursor-label,

        .custom-cursor[data-mode="link"]
          .custom-cursor-label,

        .custom-cursor[data-mode="external"]
          .custom-cursor-label {
          opacity: 1;

          transform:
            translateY(0)
            scale(1);
        }

        /* -----------------------------------------------
           GLOW ACTIVE
        ----------------------------------------------- */

        .custom-cursor[data-mode="project"]
          .custom-cursor-ring-glow,

        .custom-cursor[data-mode="contact"]
          .custom-cursor-ring-glow,

        .custom-cursor[data-mode="preview"]
          .custom-cursor-ring-glow {
          opacity: 1;
        }

        /* -----------------------------------------------
           CLICK
        ----------------------------------------------- */

        .custom-cursor[data-clicked="true"]
          .custom-cursor-dot span {
          transform: scale(0.7);
        }

        .custom-cursor[data-clicked="true"]
          .custom-cursor-ring {
          background:
            rgba(34, 82, 255, 0.16);
        }

        /* =================================================
           MOBILE / TOUCH
        ================================================= */

        @media (pointer: coarse) {
          .custom-cursor {
            display: none !important;
          }
        }

        /* =================================================
           REDUCED MOTION
        ================================================= */

        @media (prefers-reduced-motion: reduce) {
          .custom-cursor-ring,
          .custom-cursor-dot span,
          .custom-cursor-icon,
          .custom-cursor-label {
            transition: none !important;
          }
        }
      `}</style>
    </>
  );
}
```

## Add these attributes to your portfolio

You don't need to modify every element. The cursor automatically detects normal links and buttons.

For **project cards**, use:

```tsx
<div
  className="project-card"
  data-cursor="project"
>
  ...
</div>
```

For **resume**:

```tsx
<a
  href="/resume.pdf"
  download
  data-cursor="download"
>
  Download Resume
</a>
```

For **contact**:

```tsx
<a
  href="#contact"
  data-cursor="contact"
>
  Contact Me
</a>
```

For **images that open a preview**:

```tsx
<div data-cursor="preview">
  <img src="/project.png" alt="Project" />
</div>
```

For **external links**:

```tsx
<a
  href="https://github.com/..."
  target="_blank"
  rel="noopener noreferrer"
  data-cursor="external"
>
  GitHub
</a>
```

### Optional magnetic button

```tsx
<button data-cursor="magnetic">
  View My Work
</button>
```

And finally, add this to your global CSS so the browser's default cursor doesn't appear alongside it:

```css
@media (pointer: fine) {
  html,
  body,
  a,
  button,
  [role="button"],
  input,
  textarea,
  select {
    cursor: none !important;
  }
}
```

**One important note:** for your portfolio, I would *not* add the custom `data-cursor` attribute to every element. Let the component handle normal links/buttons automatically, and explicitly mark only **projects, resume, contact, previews, and other important interactive elements**. That keeps the UI clean and prevents the cursor from becoming distracting.
