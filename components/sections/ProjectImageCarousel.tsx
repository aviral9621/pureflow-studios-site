import React, { useCallback, useEffect, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { ProjectImage } from '../../hooks/useProjects';

interface Props {
  images: ProjectImage[];
  /** Auto-advance interval, ms. 0 disables auto-advance. */
  intervalMs?: number;
  className?: string;
  /** object-fit. 'cover' (default) for card thumbs that need to fill;
   *  'contain' for detail-page screenshots that must never crop. */
  fit?: 'cover' | 'contain';
}

// Auto-scrolling image carousel for project cards + detail hero.
// - swipe left/right (touch)
// - prev/next chevrons (md+)
// - dot indicators
// - pauses on hover and while user is touching
export function ProjectImageCarousel({ images, intervalMs = 4000, className, fit = 'cover' }: Props) {
  const reduced = useReducedMotion();
  const [[index, direction], setIdx] = useState<[number, number]>([0, 1]);
  const [paused, setPaused] = useState(false);
  const len = images.length;

  const goTo = useCallback(
    (next: number, dir: 1 | -1) => {
      if (len <= 1) return;
      const i = ((next % len) + len) % len;
      setIdx([i, dir]);
    },
    [len]
  );

  // Auto advance
  useEffect(() => {
    if (paused || reduced || len <= 1 || intervalMs <= 0) return;
    const t = setInterval(() => goTo(index + 1, 1), intervalMs);
    return () => clearInterval(t);
  }, [index, paused, reduced, len, intervalMs, goTo]);

  // Touch swipe
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const onTouchStart = (e: React.TouchEvent) => {
    setPaused(true);
    setTouchStart(e.targetTouches[0].clientX);
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    const dx = e.changedTouches[0].clientX - touchStart;
    if (Math.abs(dx) > 50) goTo(index + (dx < 0 ? 1 : -1), dx < 0 ? 1 : -1);
    setTouchStart(null);
    // resume after a moment
    setTimeout(() => setPaused(false), 600);
  };

  if (len === 0) return null;
  const img = images[index];

  const variants = {
    enter: (dir: number) => ({ x: dir > 0 ? '100%' : '-100%', opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? '-100%' : '100%', opacity: 0 }),
  };

  return (
    <div
      className={`relative h-full w-full overflow-hidden ${className ?? ''}`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <AnimatePresence custom={direction} initial={false} mode="popLayout">
        <motion.img
          key={img.id}
          src={img.image_url}
          alt={img.alt_text ?? ''}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className={`absolute inset-0 h-full w-full ${fit === 'contain' ? 'object-contain' : 'object-cover'}`}
          draggable={false}
        />
      </AnimatePresence>

      {/* Chevrons (md+) */}
      {len > 1 && (
        <>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              goTo(index - 1, -1);
            }}
            aria-label="Previous image"
            className="absolute left-2 top-1/2 z-20 hidden h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-white/85 backdrop-blur transition hover:bg-black/60 md:flex"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              goTo(index + 1, 1);
            }}
            aria-label="Next image"
            className="absolute right-2 top-1/2 z-20 hidden h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-white/85 backdrop-blur transition hover:bg-black/60 md:flex"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </>
      )}

      {/* Dots */}
      {len > 1 && (
        <div className="absolute bottom-2.5 left-1/2 z-20 flex -translate-x-1/2 items-center gap-1.5">
          {images.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                goTo(i, i > index ? 1 : -1);
              }}
              aria-label={`Go to image ${i + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === index ? 'w-5 bg-white' : 'w-1.5 bg-white/40 hover:bg-white/70'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
