import React, { useCallback, useEffect, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// Accepts both the DB `ProjectImage` shape AND plain `{url, alt, caption}` (used by
// body-block image sliders). Normalised internally to one shape.
export interface CarouselImage {
  id?: string;
  url?: string;
  image_url?: string;
  alt?: string | null;
  alt_text?: string | null;
  caption?: string | null;
}

interface Props {
  images: CarouselImage[];
  /** Auto-advance interval, ms. 0 disables auto-advance. */
  intervalMs?: number;
  className?: string;
  /** object-fit. 'cover' (default) for card thumbs that need to fill;
   *  'contain' for detail-page screenshots that must never crop. */
  fit?: 'cover' | 'contain';
  /** When true, renders a caption strip overlay at the bottom that updates
   *  per-slide (used by body image-slider blocks). */
  showCaptions?: boolean;
}

const getUrl = (i: CarouselImage) => i.url ?? i.image_url ?? '';
const getAlt = (i: CarouselImage) => i.alt ?? i.alt_text ?? i.caption ?? '';
const keyFor = (i: CarouselImage, idx: number) => i.id ?? getUrl(i) ?? String(idx);

// Auto-scrolling image carousel — works for hero cards and body image-sliders.
export function ProjectImageCarousel({
  images,
  intervalMs = 4000,
  className,
  fit = 'cover',
  showCaptions = false,
}: Props) {
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
    setTimeout(() => setPaused(false), 600);
  };

  if (len === 0) return null;
  const img = images[index];
  const activeCaption = img.caption ?? '';

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
          key={keyFor(img, index)}
          src={getUrl(img)}
          alt={getAlt(img)}
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

      {/* Caption overlay (image-slider mode) */}
      {showCaptions && activeCaption && (
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 z-10 flex items-end pb-9 pt-12 px-4 sm:pb-11 sm:px-6"
          style={{
            background:
              'linear-gradient(to top, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.45) 55%, rgba(0,0,0,0) 100%)',
          }}
        >
          <AnimatePresence mode="wait">
            <motion.p
              key={`cap-${index}`}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="text-[12.5px] font-medium leading-snug text-white sm:text-[14px]"
            >
              {activeCaption}
            </motion.p>
          </AnimatePresence>
        </div>
      )}

      {/* Chevrons */}
      {len > 1 && (
        <>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              goTo(index - 1, -1);
            }}
            aria-label="Previous image"
            className="absolute left-2 top-1/2 z-20 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-white/85 backdrop-blur transition hover:bg-black/60 sm:left-3 sm:h-10 sm:w-10"
          >
            <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              goTo(index + 1, 1);
            }}
            aria-label="Next image"
            className="absolute right-2 top-1/2 z-20 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-white/85 backdrop-blur transition hover:bg-black/60 sm:right-3 sm:h-10 sm:w-10"
          >
            <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
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
