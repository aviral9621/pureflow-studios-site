import React, { useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { MagneticButton } from '../shared/MagneticButton';

// ─── Word reveal (same wordUp pattern as Hero + Services) ───────────────────

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

// ─── Staggered content animation ────────────────────────────────────────────

const fadeSlide = {
  hidden: { opacity: 0, y: 16 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1], delay },
  }),
};

// ─── Browser chrome mockup ──────────────────────────────────────────────────

interface MockupProps {
  url: string;
  from: string;
  to: string;
}

function BrowserMockup({ url, from, to }: MockupProps) {
  return (
    <div className="absolute inset-0 flex flex-col">
      {/* Chrome bar */}
      <div className="flex-shrink-0 h-8 bg-black/70 backdrop-blur-sm flex items-center gap-1.5 px-3 border-b border-white/5">
        <div className="w-2.5 h-2.5 rounded-full bg-red-400/70" />
        <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/70" />
        <div className="w-2.5 h-2.5 rounded-full bg-green-400/70" />
        <div className="flex-1 mx-2 h-4 rounded bg-white/5 flex items-center px-2">
          <span className="text-white/20 text-[9px] font-mono truncate">{url}</span>
        </div>
      </div>

      {/* Gradient + dot grid */}
      <div className={`flex-1 relative bg-gradient-to-br ${from} ${to}`}>
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'radial-gradient(circle, rgba(255,255,255,0.07) 1px, transparent 1px)',
            backgroundSize: '20px 20px',
          }}
        />
        {/* UI skeleton */}
        <div className="absolute inset-0 flex">
          <div className="w-[18%] bg-black/25 border-r border-white/5 p-3 space-y-2">
            <div className="h-3 w-full rounded bg-white/8" />
            <div className="h-3 w-3/4 rounded bg-white/5" />
            <div className="h-3 w-2/3 rounded bg-white/4" />
            <div className="h-3 w-full rounded bg-white/5 mt-4" />
            <div className="h-3 w-3/4 rounded bg-white/4" />
          </div>
          <div className="flex-1 p-4 space-y-3">
            <div className="h-5 w-2/3 rounded-md bg-white/10" />
            <div className="h-3 w-1/3 rounded bg-white/6" />
            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="h-16 rounded-xl bg-white/8" />
              <div className="h-16 rounded-xl bg-white/5" />
              <div className="h-10 rounded-xl bg-white/5 col-span-2" />
            </div>
            <div className="flex gap-2 pt-1">
              <div className="h-6 w-20 rounded-full bg-white/8" />
              <div className="h-6 w-16 rounded-full bg-white/5" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Metric ─────────────────────────────────────────────────────────────────

function Metric({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <p className="font-display text-3xl gradient-text leading-none">{value}</p>
      <p className="text-xs text-white/40 uppercase tracking-wide mt-1">{label}</p>
    </div>
  );
}

// ─── Case study data ─────────────────────────────────────────────────────────

interface CaseData {
  imageRight: boolean;
  year: string;
  category: string;
  client: string;
  title: string;
  description: string;
  metrics: [{ value: string; label: string }, { value: string; label: string }];
  tech: string[];
  url: string;
  from: string;
  to: string;
}

const CASES: CaseData[] = [
  {
    imageRight: false,
    year: '2026',
    category: 'Custom CRM',
    client: 'Herbal Vantage · Healthcare MLM · 2026',
    title: 'A binary MLM system built for scale',
    description:
      'A multi-level commission engine for a herbal healthcare company. Custom dashboards, E-Pin generation, KYC workflows, and Razorpay-integrated payouts — all running on Supabase with row-level security.',
    metrics: [
      { value: '11 tables', label: '6 build phases' },
      { value: 'ap-south-1', label: 'Vercel Edge' },
    ],
    tech: ['Next.js', 'Supabase', 'Tailwind v4', 'shadcn/ui'],
    url: 'herbalvantage-crm.vercel.app',
    from: 'from-emerald-950/70',
    to: 'to-teal-950/50',
  },
  {
    imageRight: true,
    year: '2026',
    category: 'Hotel Tech',
    client: 'Quick Hotels · Hospitality · 2026',
    title: 'End-to-end hotel management',
    description:
      'A property management system + public booking website connected through a shared Supabase backend. Razorpay full + partial payment flows, GST-inclusive pricing, and Edge Functions for booking tracking.',
    metrics: [
      { value: '₹50L+', label: 'Bookings processed' },
      { value: 'Edge Fn', label: 'Supabase Realtime' },
    ],
    tech: ['Next.js', 'React 19', 'Vite', 'Supabase Edge Functions'],
    url: 'quickhotels.vercel.app',
    from: 'from-blue-950/70',
    to: 'to-indigo-950/50',
  },
  {
    imageRight: false,
    year: '2025',
    category: 'EdTech',
    client: 'UnSkills · Education · 2025',
    title: 'Multi-branch institute management',
    description:
      'A red-themed CRM for a NIELIT-authorized computer education institute across 8 branches. Student lifecycle, fee management, branded OTP emails via Resend, and Cloudflare R2 for document storage.',
    metrics: [
      { value: '8 branches', label: 'Simultaneous' },
      { value: '16 phases', label: 'Rollout plan' },
    ],
    tech: ['Next.js', 'Supabase', 'Cloudflare R2', 'Resend'],
    url: 'unskills-crm.vercel.app',
    from: 'from-red-950/70',
    to: 'to-rose-950/50',
  },
  {
    imageRight: true,
    year: '2025',
    category: 'AgriTech',
    client: 'Laxmi Agro Agency · Agriculture · 2025',
    title: 'WhatsApp leads to PDF invoices',
    description:
      'Agricultural CRM with BotBee WhatsApp webhook integration, auto round-robin lead distribution, GST-compliant invoicing, PWA push notifications, and a CA-ready GST report generator.',
    metrics: [
      { value: '12 modules', label: 'Built to spec' },
      { value: '15 tables', label: 'Schema depth' },
    ],
    tech: ['Next.js', 'Supabase Realtime', 'BotBee', 'Web Push API'],
    url: 'laxmi-agro-crm.vercel.app',
    from: 'from-amber-950/70',
    to: 'to-orange-950/50',
  },
];

// ─── CaseStudyCard ────────────────────────────────────────────────────────────

function CaseStudyCard({ c, reduced }: { c: CaseData; reduced: boolean | null }) {
  const imgOrder = c.imageRight ? 'lg:order-2' : 'lg:order-1';
  const txtOrder = c.imageRight ? 'lg:order-1' : 'lg:order-2';

  return (
    <motion.article
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-center py-10 lg:py-16"
      initial={reduced ? false : { opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-150px' }}
      transition={{ duration: 0.4 }}
    >
      {/* IMAGE BLOCK */}
      <motion.div
        className={`col-span-1 lg:col-span-7 order-1 ${imgOrder}`}
        initial={reduced ? false : { opacity: 0, scale: 0.96 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        viewport={{ once: true, margin: '-150px' }}
      >
        <div className="relative aspect-[16/11] rounded-2xl overflow-hidden border border-white/5 shadow-[inset_0_0_120px_rgba(0,0,0,0.4)] group sm:aspect-[16/10] sm:rounded-3xl">
          {/* Year/category badge */}
          <div className="absolute top-4 left-4 z-20 bg-black/60 backdrop-blur-sm text-white/55 text-xs font-mono px-3 py-1 rounded-full border border-white/10">
            {c.year} · {c.category}
          </div>

          <BrowserMockup url={c.url} from={c.from} to={c.to} />

          {/* Hover overlay */}
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-10">
            <span className="text-white text-sm font-medium flex items-center gap-2">
              View case study <ArrowUpRight className="w-4 h-4" />
            </span>
          </div>
        </div>
      </motion.div>

      {/* CONTENT BLOCK */}
      <div className={`col-span-1 lg:col-span-5 order-2 ${txtOrder}`}>
        {/* Client meta */}
        <motion.p
          custom={0.1}
          variants={fadeSlide}
          initial={reduced ? false : 'hidden'}
          whileInView="visible"
          viewport={{ once: true, margin: '-150px' }}
          className="text-xs uppercase tracking-[0.2em] text-white/40"
        >
          {c.client}
        </motion.p>

        {/* Title */}
        <motion.h3
          custom={0.18}
          variants={fadeSlide}
          initial={reduced ? false : 'hidden'}
          whileInView="visible"
          viewport={{ once: true, margin: '-150px' }}
          className="font-display text-[2.5rem] lg:text-5xl font-bold tracking-normal leading-[1.08] mt-4 text-white"
        >
          {c.title}
        </motion.h3>

        {/* Description */}
        <motion.p
          custom={0.26}
          variants={fadeSlide}
          initial={reduced ? false : 'hidden'}
          whileInView="visible"
          viewport={{ once: true, margin: '-150px' }}
          className="mt-4 text-white/55 text-base leading-relaxed"
        >
          {c.description}
        </motion.p>

        {/* Metrics */}
        <motion.div
          custom={0.34}
          variants={fadeSlide}
          initial={reduced ? false : 'hidden'}
          whileInView="visible"
          viewport={{ once: true, margin: '-150px' }}
          className="mt-6 grid grid-cols-2 gap-4"
        >
          <Metric {...c.metrics[0]} />
          <Metric {...c.metrics[1]} />
        </motion.div>

        {/* Tech chips */}
        <motion.div
          custom={0.42}
          variants={fadeSlide}
          initial={reduced ? false : 'hidden'}
          whileInView="visible"
          viewport={{ once: true, margin: '-150px' }}
          className="mt-6 flex flex-wrap gap-2"
        >
          {c.tech.map((t) => (
            <span key={t} className="bg-white/5 text-white/60 text-xs px-3 py-1 rounded-full border border-white/10">
              {t}
            </span>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          custom={0.5}
          variants={fadeSlide}
          initial={reduced ? false : 'hidden'}
          whileInView="visible"
          viewport={{ once: true, margin: '-150px' }}
        >
          <button className="mt-8 text-sm text-white/40 hover:text-white flex items-center gap-2 transition-colors duration-200 group/link">
            Read case study
            <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
          </button>
        </motion.div>
      </div>
    </motion.article>
  );
}

// ─── Main section ─────────────────────────────────────────────────────────────

interface WorkProps {
  onOpenContact: (title: string, rect: DOMRect) => void;
}

export function Work({ onOpenContact }: WorkProps) {
  const reduced = useReducedMotion();
  const ctaBtnRef = useRef<HTMLDivElement>(null);

  const handleStartProject = () => {
    const rect = ctaBtnRef.current?.getBoundingClientRect() ?? new DOMRect();
    onOpenContact('Start a project', rect);
  };

  return (
    <section id="work" className="relative py-10 md:py-12 bg-black">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-pink-600/4 rounded-full blur-[140px]" />
      </div>

      {/* ── Section header ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 mb-8 md:mb-10">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-pink-400/80">
          / 02 — Selected work
        </p>
        <h2 className="font-display text-[44px] font-bold tracking-normal text-white mt-3 leading-[1.02] sm:text-[clamp(3.25rem,7vw,6.75rem)] sm:leading-[1]">
          <Word text="Recent" delay={0} reduced={reduced} />{' '}
          <Word text="projects" delay={0.1} reduced={reduced} />
          <br />
          <span className="mt-2 flex flex-wrap items-baseline gap-x-[0.18em] gap-y-1 sm:mt-3 sm:gap-x-[0.22em]">
            <Word text="we've" delay={0.2} reduced={reduced} />
            <Word
              text="shipped."
              delay={0.3}
              className="gradient-text font-serif italic font-normal leading-[1.12] py-[0.05em]"
              reduced={reduced}
            />
          </span>
        </h2>

        {/* Sub-header row */}
        <motion.div
          className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4 mt-5 md:mt-6"
          initial={reduced ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
          viewport={{ once: true }}
        >
          <p className="text-white/55 text-base leading-relaxed max-w-md">
            Each project is built with the same care we'd give our own product. No templates. No shortcuts.
          </p>
          <button className="text-sm text-white/40 hover:text-white flex items-center gap-1.5 transition-colors duration-200 group/all whitespace-nowrap">
            View all work
            <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover/all:translate-x-0.5 group-hover/all:-translate-y-0.5" />
          </button>
        </motion.div>
      </div>

      {/* ── Divider ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        <div className="border-t border-white/5" />
      </div>

      {/* ── Case studies ── */}
      {CASES.map((c, i) => (
        <React.Fragment key={i}>
          <CaseStudyCard c={c} reduced={reduced} />
          {i < CASES.length - 1 && (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
              <div className="border-t border-white/5" />
            </div>
          )}
        </React.Fragment>
      ))}

      {/* ── Bottom CTA card ── */}
      <motion.div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 mt-12 md:mt-20"
        initial={reduced ? false : { opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        viewport={{ once: true, margin: '-100px' }}
      >
        <div className="rounded-2xl border border-white/[0.06] bg-[var(--color-bg-elevated)] p-6 text-center grain relative overflow-hidden sm:rounded-3xl sm:p-12">
          {/* Ambient gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-pink-500/5 via-purple-500/5 to-fuchsia-500/5 pointer-events-none" />

          <h3 className="font-display text-3xl lg:text-4xl font-bold text-white relative z-10">
            Have a project in mind?
          </h3>
          <p className="text-white/55 mt-4 mb-8 relative z-10 max-w-md mx-auto leading-relaxed">
            Let's build something that ships, scales, and outlives the hype cycle.
          </p>

          <div ref={ctaBtnRef} className="relative z-10 inline-block">
            <MagneticButton variant="primary" onClick={handleStartProject}>
              Start a project
            </MagneticButton>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
