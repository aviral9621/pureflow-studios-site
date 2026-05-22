import React, { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';

// ─── Word reveal (same wordUp pattern as Hero / Services / Work) ─────────────

const wordUp = {
  hidden: { y: '110%', opacity: 0 },
  visible: (delay: number) => ({
    y: '0%',
    opacity: 1,
    transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1], delay },
  }),
};

interface WordProps {
  text: string;
  delay: number;
  className?: string;
  reduced: boolean | null;
}

function Word({ text, delay: _delay, className = '', reduced: _reduced }: WordProps) {
  return (
    <span className="inline-block overflow-hidden leading-[0.95]">
      <span className={`inline-block ${className}`}>{text}</span>
    </span>
  );
}

// ─── Step data ────────────────────────────────────────────────────────────────

interface StepData {
  number: string;
  label: string;
  title: string;
  description: string;
  deliverables: string[];
}

const STEPS: StepData[] = [
  {
    number: '01',
    label: 'Week 0',
    title: 'We talk. You decide.',
    description: 'A 45-min call. Scope locked. Fixed price. Zero sales theatre.',
    deliverables: [
      'Scope document in 48 hours',
      'Fixed-price proposal',
      'Recommended stack',
    ],
  },
  {
    number: '02',
    label: 'Week 1',
    title: 'Architecture before code.',
    description: 'Clickable Figma + full spec before a single line of code.',
    deliverables: [
      'Figma prototype (mobile + desktop)',
      'Database schema with RLS',
      '6-phase roadmap',
    ],
  },
  {
    number: '03',
    label: 'Weeks 2–4',
    title: 'Daily progress, weekly demos.',
    description: 'Live staging from day one. Friday demos. No black boxes.',
    deliverables: [
      'Daily commits to GitHub',
      'Recorded Friday demos',
      'Staging URL from day 1',
    ],
  },
  {
    number: '04',
    label: 'Week 4+',
    title: "We don't ghost. We hand over.",
    description: 'Production deploy, repo handover, 30-day fix-it-free support.',
    deliverables: [
      'Deploy on your Vercel/Supabase',
      '30-day post-launch support',
      'Loom training for your team',
    ],
  },
];

// ─── ProcessStep ──────────────────────────────────────────────────────────────

interface StepProps {
  step: StepData;
  reduced: boolean | null;
}

function ProcessStep({ step, reduced }: StepProps) {
  return (
    <motion.div
      className="relative grid grid-cols-1 gap-5 border-t border-white/5 py-9 md:py-11 lg:grid-cols-12 lg:gap-10"
      initial={reduced ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      viewport={{ once: true, margin: '-80px' }}
    >
      {/* LEFT — week label only */}
      <div className="lg:col-span-3 flex flex-col">
        <p className="gradient-flow-text text-[11px] font-extrabold uppercase tracking-[0.28em] sm:text-[12px]">
          {step.label}
        </p>
      </div>

      {/* RIGHT — content */}
      <div className="flex flex-col justify-center lg:col-span-9">
        <h3 className="font-display text-[1.85rem] font-bold leading-[1.1] tracking-tight text-white sm:text-3xl lg:text-4xl">
          {step.title}
        </h3>
        <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-white/65 sm:text-base">
          {step.description}
        </p>
        <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2">
          {step.deliverables.map((d) => (
            <li key={d} className="flex items-start gap-2 text-[12px] text-white/60 sm:text-[13px]">
              <span className="mt-1 flex-shrink-0 text-[10px] text-pink-400">◆</span>
              {d}
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}

// ─── Main section ─────────────────────────────────────────────────────────────

export function Process() {
  const reduced = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  // Scroll-driven vertical spine line
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 85%', 'end 15%'],
  });
  const lineScaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section
      id="process"
      ref={sectionRef}
      className="relative py-12 md:py-14 px-4 sm:px-6 lg:px-10 bg-black overflow-hidden"
    >
      {/* Ambient glow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 -translate-y-1/2 right-0 w-[600px] h-[800px] bg-purple-600/5 rounded-full blur-[120px]" />
      </div>

      {/* Decorative vertical spine (desktop only) */}
      {!reduced && (
        <div className="hidden lg:block absolute left-12 top-32 bottom-32 w-px overflow-hidden">
          {/* Background track */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent" />
          {/* Animated fill */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-b from-transparent via-pink-500/30 to-transparent"
            style={{ scaleY: lineScaleY, transformOrigin: 'top' }}
          />
        </div>
      )}

      <div className="relative max-w-7xl mx-auto">
        {/* ── Section header ── */}
        <motion.div
          className="mb-8 flex flex-col items-center text-center md:mb-12"
          initial={reduced ? false : { opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="flex flex-col items-center">
            <span className="font-serif italic text-white/95 text-[clamp(1.75rem,3.4vw,3rem)] leading-[1.1] tracking-normal">
              Chat to code in
            </span>
            <span
              className="hero-automation-text mt-1 inline-block leading-none text-[clamp(2.5rem,5.6vw,5rem)]"
              data-text="4 WEEKS."
            >
              4 WEEKS.
            </span>
          </div>
          <p className="mt-5 max-w-md text-[14px] leading-relaxed text-white/55 sm:text-base">
            Small team. Direct line to the founder. No agency theatre.
          </p>
        </motion.div>

        {/* ── Steps ── */}
        {STEPS.map((step) => (
          <React.Fragment key={step.number}>
            <ProcessStep step={step} reduced={reduced} />
          </React.Fragment>
        ))}
      </div>
    </section>
  );
}
