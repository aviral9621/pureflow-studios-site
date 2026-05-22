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
    description:
      'A 45-minute discovery call to understand your business, the problem, and what "done" looks like. No slide deck. No salesy "next steps" theater. By the end, you\'ll know exactly what we\'d build and what it\'d cost.',
    deliverables: [
      'Written scope document within 48 hours',
      'Fixed-price proposal (no hourly games)',
      'Recommended tech stack with reasoning',
    ],
  },
  {
    number: '02',
    label: 'Week 1',
    title: 'Architecture before code.',
    description:
      'We map every screen, every database table, every user flow before writing a single line of code. You get a clickable Figma prototype + a CLAUDE.md spec document that any developer (or AI) could pick up and build from.',
    deliverables: [
      'Figma prototype (mobile + desktop)',
      'Full database schema with RLS policies',
      '6-phase implementation roadmap',
    ],
  },
  {
    number: '03',
    label: 'Weeks 2–4',
    title: 'Daily progress, weekly demos.',
    description:
      'We ship every business day to a staging URL you can open. Friday calls to review what\'s done, what\'s next, what changed. You\'re never wondering "what are they working on?" — you\'re watching it happen.',
    deliverables: [
      'Daily commits to GitHub',
      'Weekly Friday demos (recorded)',
      'Staging environment from day 1',
    ],
  },
  {
    number: '04',
    label: 'Week 4+',
    title: "We don't ghost. We hand over.",
    description:
      'Production deployment, GitHub repo transferred to your org, documentation handed over, training video recorded. We stay on retainer for 30 days post-launch — anything breaks, we fix it free.',
    deliverables: [
      'Production deploy on your Vercel/Supabase',
      '30-day post-launch support included',
      'Loom training videos for your team',
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
      className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 py-10 md:py-12 border-t border-white/5"
      initial={reduced ? false : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      viewport={{ once: true, margin: '-80px' }}
    >
      {/* LEFT — giant number + label */}
      <div className="lg:col-span-4 flex flex-col">
        <motion.div
          className="font-display text-[7rem] lg:text-[10rem] font-bold leading-none gradient-text select-none"
          initial={{ opacity: 0.15 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: false, margin: '-20% 0px' }}
        >
          {step.number}
        </motion.div>
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-white/40 mt-2">
          {step.label}
        </p>
      </div>

      {/* RIGHT — content */}
      <div className="lg:col-span-8 lg:pl-12 flex flex-col justify-center">
        <h3 className="font-display text-4xl lg:text-5xl font-bold tracking-normal leading-[1.08] text-white">
          {step.title}
        </h3>
        <p className="mt-4 text-white/60 text-lg leading-relaxed max-w-2xl">
          {step.description}
        </p>
        <ul className="mt-6 space-y-2">
          {step.deliverables.map((d) => (
            <li key={d} className="flex items-start gap-3 text-sm text-white/65">
              <span className="text-pink-400 mt-0.5 flex-shrink-0 text-xs">◆</span>
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
        <div className="mb-8 md:mb-10">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-pink-400/80">
            / 03 — Process
          </p>
          <h2 className="font-display text-[44px] font-bold tracking-normal text-white mt-3 leading-[1.02] sm:text-[clamp(3.25rem,7vw,6.75rem)] sm:leading-[1]">
            <Word text="From" delay={0} reduced={reduced} />{' '}
            <Word text="conversation" delay={0.08} reduced={reduced} />{' '}
            <Word text="to" delay={0.16} reduced={reduced} />{' '}
            <span className="inline-flex flex-wrap items-baseline gap-x-[0.18em] gap-y-1 sm:gap-x-[0.22em]">
              <Word
                text="code,"
                delay={0.24}
                className="gradient-text font-serif italic font-normal leading-[1.12] py-[0.05em]"
                reduced={reduced}
              />
              <Word text="in" delay={0.32} reduced={reduced} />
              <Word text="4" delay={0.4} reduced={reduced} />
              <Word text="weeks." delay={0.48} reduced={reduced} />
            </span>
          </h2>
          <motion.p
            className="mt-4 text-white/60 text-base leading-relaxed max-w-xl"
            initial={reduced ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.55 }}
            viewport={{ once: true }}
          >
            We move fast because we work small. One direct line to the founder. No middle
            management. No agency theater.
          </motion.p>
        </div>

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
