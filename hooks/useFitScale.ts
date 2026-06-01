import { useCallback, useEffect, useRef, useState } from 'react';

// ─────────────────────────────────────────────────────────────────────────────
// useFitScale — measures a device "screen" element and returns the transform
// scale needed to fit an iframe rendered at a fixed *logical* width (e.g. 1440px
// desktop / 390px mobile) into that screen. The iframe always renders at the
// logical width (so the embedded site uses its real desktop/mobile breakpoint)
// and is visually scaled down with `transform: scale(...)`.
//
// A ResizeObserver recomputes the scale whenever the screen's rendered size
// changes (responsive breakpoints, orientation, font-zoom) — no breakpoint table
// to maintain. `scale` is 0 until first measured so callers can avoid a flash.
// ─────────────────────────────────────────────────────────────────────────────

interface FitScale {
  ref: React.RefObject<HTMLDivElement | null>;
  scale: number;
  logicalWidth: number;
  /** Logical height the iframe must render at so its scaled height fills the screen. */
  logicalHeight: number;
}

export function useFitScale(logicalWidth: number): FitScale {
  const ref = useRef<HTMLDivElement | null>(null);
  const [{ scale, logicalHeight }, setDims] = useState({ scale: 0, logicalHeight: 0 });

  const measure = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    const w = el.clientWidth;
    const h = el.clientHeight;
    if (w === 0) return;
    const nextScale = w / logicalWidth;
    setDims({ scale: nextScale, logicalHeight: nextScale > 0 ? h / nextScale : 0 });
  }, [logicalWidth]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    measure();

    // ResizeObserver is the primary signal; a window-resize listener is kept as
    // a fallback because some embedded webviews throttle RO callbacks.
    let ro: ResizeObserver | null = null;
    if ('ResizeObserver' in window) {
      ro = new ResizeObserver(measure);
      ro.observe(el);
    }
    window.addEventListener('resize', measure);
    return () => {
      ro?.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, [measure]);

  return { ref, scale, logicalWidth, logicalHeight };
}
