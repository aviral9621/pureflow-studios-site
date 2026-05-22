import { useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Calendar, Check } from 'lucide-react';
import { MagneticButton } from '../shared/MagneticButton';

interface FinalCTAProps {
  onOpenContact: (title: string, rect: DOMRect) => void;
}

const wordUp = {
  hidden: { y: '110%', opacity: 0 },
  visible: (delay: number) => ({
    y: '0%',
    opacity: 1,
    transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1], delay },
  }),
};

const fadeSlide = {
  hidden: { opacity: 0, y: 16 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1], delay },
  }),
};

interface WordProps {
  text: string;
  delay: number;
  className?: string;
  prefersReducedMotion: boolean | null;
}

function Word({ text, delay: _delay, className = '', prefersReducedMotion: _prefersReducedMotion }: WordProps) {
  return (
    <span className="inline-block overflow-visible leading-[1.08]">
      <span className={`inline-block ${className}`}>{text}</span>
    </span>
  );
}

const trustItems = [
  'Fixed-price proposals',
  '30-day post-launch support',
  'GST invoices included',
];

export function FinalCTA({ onOpenContact }: FinalCTAProps) {
  const ctaWrapRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  function handleStartProject() {
    const rect = ctaWrapRef.current?.getBoundingClientRect() ?? new DOMRect();
    onOpenContact('Start a Project', rect);
  }

  return (
    <section className="relative py-16 md:py-20 px-5 sm:px-6 lg:px-10 bg-black overflow-hidden grain">

      {/* Pulsing radial glow */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(217,70,239,0.15) 0%, transparent 70%)',
        }}
        animate={prefersReducedMotion ? {} : { opacity: [0.8, 1, 0.8] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
          maskImage: 'radial-gradient(ellipse at center, black 30%, transparent 70%)',
          WebkitMaskImage: 'radial-gradient(ellipse at center, black 30%, transparent 70%)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto text-center">

        {/* Headline */}
        <h2
          className="font-display font-bold uppercase tracking-normal text-white"
          style={{ fontSize: 'clamp(3.25rem, 8vw, 7rem)' }}
        >
          <span className="flex flex-wrap justify-center gap-x-[0.22em] leading-[0.9]">
            <Word text="Ready" delay={0.05} prefersReducedMotion={prefersReducedMotion} />
            <Word text="to" delay={0.12} prefersReducedMotion={prefersReducedMotion} />
          </span>
          <span className="mt-2 flex flex-col items-center justify-center gap-y-2 leading-none md:mt-4 md:flex-row md:gap-x-[0.26em]">
            <Word
              text="automate"
              delay={0.2}
              prefersReducedMotion={prefersReducedMotion}
              className="font-serif italic font-normal lowercase gradient-text text-[0.78em] leading-[1.12] py-[0.08em]"
            />
            <span className="flex flex-wrap justify-center gap-x-[0.18em] leading-[0.9]">
              <Word text="the" delay={0.28} prefersReducedMotion={prefersReducedMotion} />
              <Word text="chaos?" delay={0.35} prefersReducedMotion={prefersReducedMotion} />
            </span>
          </span>
        </h2>

        {/* Subhead */}
        <motion.p
          custom={0.45}
          variants={fadeSlide}
          initial={prefersReducedMotion ? false : 'hidden'}
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="mt-5 md:mt-6 text-white/60 text-lg max-w-xl mx-auto leading-relaxed"
        >
          Tell us about your project. We'll respond within 24 hours with thoughts,
          a rough scope, and a real timeline. No sales calls until you want one.
        </motion.p>

        {/* CTA stack */}
        <motion.div
          custom={0.55}
          variants={fadeSlide}
          initial={prefersReducedMotion ? false : 'hidden'}
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="mt-8 flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <div ref={ctaWrapRef} className="inline-flex">
          <MagneticButton
            variant="primary"
            onClick={handleStartProject}
            className="h-16 text-base px-10 text-white [&_*]:text-white"
          >
            Start a project <ArrowRight className="inline-block ml-2 w-4 h-4" />
          </MagneticButton>
          </div>

          <a
            href="https://calendly.com/pureflowstudios"
            target="_blank"
            rel="noopener noreferrer"
            className="h-16 px-8 rounded-full border border-white/20 text-white/70 hover:text-white hover:border-white/40 flex items-center gap-2 text-sm font-medium tracking-wide uppercase transition-all duration-300"
          >
            <Calendar className="w-4 h-4" />
            Book a 15-min call
          </a>
        </motion.div>

        {/* Trust micro-row */}
        <motion.div
          custom={0.65}
          variants={fadeSlide}
          initial={prefersReducedMotion ? false : 'hidden'}
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="mt-7 flex flex-wrap items-center justify-center gap-8"
        >
          {trustItems.map((item) => (
            <span key={item} className="flex items-center gap-2 text-xs text-white/40 uppercase tracking-wide">
              <Check className="w-3.5 h-3.5 text-fuchsia-500/70 flex-shrink-0" />
              {item}
            </span>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
