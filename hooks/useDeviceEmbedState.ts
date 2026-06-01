import { useCallback, useEffect, useRef, useState } from 'react';

// ─────────────────────────────────────────────────────────────────────────────
// useDeviceEmbedState — lazy auto-load + interaction state machine for a live
// device embed (laptop / phone iframe of a real site).
//
//   idle        → device not yet in view; iframe has no `src` (zero network)
//   loading     → in view; `src` attached, waiting for onLoad
//   loaded      → onLoad fired; poster hidden, but a "Click to interact" guard
//                 overlay sits on top and the iframe is pointer-events:none so
//                 the embed never hijacks page scroll
//   interacting → user clicked the guard; iframe is pointer-events:auto
//
// `enabled: false` keeps it permanently idle (used for the laptop on small
// screens, where we show a poster only to save bandwidth).
// ─────────────────────────────────────────────────────────────────────────────

interface Options {
  enabled?: boolean;     // default true
  rootMargin?: string;   // IntersectionObserver margin; default '200px 0px'
  stallMs?: number;      // hint timeout; default 6000
}

interface DeviceEmbedState {
  containerRef: React.RefObject<HTMLDivElement | null>;
  shouldLoad: boolean;   // attach iframe src
  loaded: boolean;
  interacting: boolean;
  stalled: boolean;      // load took too long — surface an "open live site" hint
  onLoad: () => void;
  startInteract: () => void;
  endInteract: () => void;
}

export function useDeviceEmbedState(options: Options = {}): DeviceEmbedState {
  const { enabled = true, rootMargin = '200px 0px', stallMs = 6000 } = options;

  const containerRef = useRef<HTMLDivElement | null>(null);
  const [inView, setInView] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [interacting, setInteracting] = useState(false);
  const [stalled, setStalled] = useState(false);

  // Auto-load when the device scrolls into view. Uses IntersectionObserver as
  // the primary signal, plus a getBoundingClientRect fallback on scroll/resize —
  // some embedded webviews/headless renderers throttle IO callbacks, so the
  // rect check guarantees the embed still loads when it reaches the viewport.
  useEffect(() => {
    if (!enabled) return;
    const el = containerRef.current;
    if (!el) return;

    let done = false;
    const marginPx = parseInt(rootMargin, 10) || 200;

    let cleanup = () => {};
    const trigger = () => {
      if (done) return;
      done = true;
      setInView(true);
      cleanup();
    };

    const check = () => {
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;
      if (r.top < vh + marginPx && r.bottom > -marginPx) trigger();
    };

    let io: IntersectionObserver | null = null;
    if ('IntersectionObserver' in window) {
      io = new IntersectionObserver(([entry]) => entry.isIntersecting && trigger(), { rootMargin });
      io.observe(el);
    }

    const raf = requestAnimationFrame(check);
    window.addEventListener('scroll', check, { passive: true });
    window.addEventListener('resize', check);

    cleanup = () => {
      io?.disconnect();
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', check);
      window.removeEventListener('resize', check);
    };

    check();
    return cleanup;
  }, [enabled, rootMargin]);

  const shouldLoad = enabled && inView;

  // While loading, start a stall timer that surfaces a fallback hint. A blocked
  // cross-origin frame (X-Frame-Options) can't be detected directly, so this is
  // a soft hint only — never gates the UI.
  useEffect(() => {
    if (!shouldLoad || loaded) return;
    const t = window.setTimeout(() => setStalled(true), stallMs);
    return () => window.clearTimeout(t);
  }, [shouldLoad, loaded, stallMs]);

  const onLoad = useCallback(() => {
    setLoaded(true);
    setStalled(false);
  }, []);
  const startInteract = useCallback(() => setInteracting(true), []);
  const endInteract = useCallback(() => setInteracting(false), []);

  return {
    containerRef,
    shouldLoad,
    loaded,
    interacting,
    stalled,
    onLoad,
    startInteract,
    endInteract,
  };
}
