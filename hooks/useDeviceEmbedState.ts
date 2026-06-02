import { useCallback, useEffect, useRef, useState } from 'react';

// ─────────────────────────────────────────────────────────────────────────────
// useDeviceEmbedState — lazy auto-load + interaction state for a live device
// embed. Visibility is detected with IntersectionObserver only (passive — no
// per-scroll layout reads, so it never causes scroll jank). When an embed comes
// into view its load is scheduled through a small module-level stagger so
// several embeds on one page don't all fetch external sites simultaneously.
//
//   idle        → not in view; iframe has no `src` (zero network)
//   loading     → in view + its turn; `src` attached, waiting for onLoad
//   loaded      → onLoad fired; poster hidden
//   interacting → user clicked the guard; iframe pointer-events:auto
// ─────────────────────────────────────────────────────────────────────────────

// Stagger the START of a *simultaneous burst* of embeds (e.g. 3 cards on the
// Work listing) so they don't all fetch external sites at once. Uses a live
// pending counter — the first embed in view loads immediately, and the counter
// drains as loads start, so a lone embed (e.g. a detail-page hero) is never
// delayed and the stagger never accumulates across page navigations.
const GAP_MS = 400;
let pending = 0;
function scheduleGrant(grant: () => void): () => void {
  const delay = pending * GAP_MS;
  pending += 1;
  let settled = false;
  const settle = () => {
    if (!settled) {
      settled = true;
      pending = Math.max(0, pending - 1);
    }
  };
  const id = window.setTimeout(() => {
    settle();
    grant();
  }, delay);
  return () => {
    window.clearTimeout(id);
    settle();
  };
}

interface Options {
  enabled?: boolean;
  rootMargin?: string;
  stallMs?: number;
}

interface DeviceEmbedState {
  containerRef: React.RefObject<HTMLDivElement | null>;
  shouldLoad: boolean;
  loaded: boolean;
  interacting: boolean;
  stalled: boolean;
  onLoad: () => void;
  startInteract: () => void;
  endInteract: () => void;
}

export function useDeviceEmbedState(options: Options = {}): DeviceEmbedState {
  const { enabled = true, rootMargin = '300px 0px', stallMs = 8000 } = options;

  const containerRef = useRef<HTMLDivElement | null>(null);
  const [granted, setGranted] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [interacting, setInteracting] = useState(false);
  const [stalled, setStalled] = useState(false);

  // Auto-load when the device scrolls into view (IntersectionObserver only).
  useEffect(() => {
    if (!enabled) return;
    const el = containerRef.current;
    if (!el) return;

    let requested = false;
    let cancelTimer: (() => void) | null = null;
    const onInView = () => {
      if (requested) return;
      requested = true;
      cancelTimer = scheduleGrant(() => setGranted(true));
    };

    if (!('IntersectionObserver' in window)) {
      onInView();
      return () => cancelTimer?.();
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          onInView();
          io.disconnect();
        }
      },
      { rootMargin }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelTimer?.();
    };
  }, [enabled, rootMargin]);

  const shouldLoad = enabled && granted;

  // Soft stall hint if a frame takes too long (e.g. framing blocked). Never
  // gates the UI — a blocked cross-origin frame can't be detected directly.
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
