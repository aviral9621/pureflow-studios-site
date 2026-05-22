import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Star } from 'lucide-react';

// ─── Word reveal ─────────────────────────────────────────────────────────────

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

// ─── Data ─────────────────────────────────────────────────────────────────────

const FEATURED = {
  quote:
    "Aviral didn't just build us a CRM. He understood our binary MLM logic better than our previous developers ever did — and shipped it in 4 weeks. Three months in, we're using every module daily.",
  name: 'Rakesh Sharma',
  role: 'Founder, Herbal Vantage Healthcare',
  initials: 'RS',
  gradient: 'from-pink-500 to-purple-600',
};

interface TestimonialData {
  quote: string;
  name: string;
  role: string;
  initials: string;
  gradient: string;
}

const SUPPORTING: TestimonialData[] = [
  {
    quote:
      "We've worked with 3 agencies before. PureFlow is the only one who shipped what they promised, on time, without scope creep.",
    name: 'Priya Mehta',
    role: 'MD, Quick Hotels',
    initials: 'PM',
    gradient: 'from-blue-500 to-indigo-600',
  },
  {
    quote:
      "The WhatsApp AI agent he built handles 80% of our incoming leads. I haven't missed a midnight enquiry in months.",
    name: 'Vikram Singh',
    role: 'Owner, TS Associates',
    initials: 'VS',
    gradient: 'from-amber-500 to-orange-600',
  },
  {
    quote:
      "Aviral writes specs better than most CTOs. Working with him felt like having a technical co-founder, not a vendor.",
    name: 'Anjali Bose',
    role: 'Founder, Strataloom Research',
    initials: 'AB',
    gradient: 'from-emerald-500 to-teal-600',
  },
];

// ─── Stars ────────────────────────────────────────────────────────────────────

function Stars({ size = 'w-5 h-5' }: { size?: string }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className={`${size} text-pink-400`} fill="currentColor" strokeWidth={0} />
      ))}
    </div>
  );
}

// ─── Avatar ───────────────────────────────────────────────────────────────────

interface AvatarProps {
  initials: string;
  gradient: string;
  size?: string;
}

function Avatar({ initials, gradient, size = 'w-14 h-14' }: AvatarProps) {
  return (
    <div
      className={`${size} rounded-full bg-gradient-to-br ${gradient} flex items-center justify-center flex-shrink-0`}
    >
      <span className="text-white font-bold text-sm select-none">{initials}</span>
    </div>
  );
}

// ─── Main section ─────────────────────────────────────────────────────────────

export function Testimonials() {
  const reduced = useReducedMotion();

  return (
    <section className="relative py-14 md:py-16 px-6 lg:px-10 bg-black overflow-hidden">
      {/* Decorative giant quote mark */}
      <span
        className="absolute top-10 left-10 font-serif italic text-[20rem] text-white/[0.02] leading-none select-none pointer-events-none"
        aria-hidden="true"
      >
        "
      </span>

      {/* Ambient glow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-fuchsia-600/4 rounded-full blur-[130px]" />
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* ── Section header ── */}
        <div className="mb-8 md:mb-10">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-pink-400/80">
            / 04 — Word of mouth
          </p>
          <h2 className="font-display text-[clamp(3.25rem,7vw,6.75rem)] font-bold tracking-tight text-white mt-3 leading-[0.9]">
            <Word text="What" delay={0} reduced={reduced} />{' '}
            <Word text="founders" delay={0.08} reduced={reduced} />{' '}
            <Word text="say" delay={0.16} reduced={reduced} />{' '}
            <Word
              text="after"
              delay={0.24}
              className="gradient-text font-serif italic font-normal"
              reduced={reduced}
            />{' '}
            <Word text="we" delay={0.32} reduced={reduced} />{' '}
            <Word text="ship." delay={0.4} reduced={reduced} />
          </h2>
        </div>

        {/* ── Featured testimonial ── */}
        <motion.div
          className="max-w-5xl mx-auto rounded-3xl border border-white/[0.08] p-12 lg:p-16 relative overflow-hidden grain"
          style={{
            background:
              'linear-gradient(135deg, rgba(236,72,153,0.04) 0%, rgba(217,70,239,0.02) 50%, rgba(168,85,247,0.04) 100%)',
            backgroundSize: '200% 200%',
            backgroundPosition: '0% 0%',
            boxShadow: 'inset 0 0 120px rgba(217,70,239,0.06)',
          }}
          whileHover={reduced ? {} : { backgroundPosition: '100% 100%' }}
          transition={{ duration: 1.2, ease: 'easeInOut' }}
          initial={reduced ? false : { opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-80px' }}
        >
          <Stars />
          <blockquote className="mt-5 md:mt-6 font-serif italic text-2xl md:text-4xl lg:text-5xl leading-tight text-white/95">
            "{FEATURED.quote}"
          </blockquote>
          <div className="mt-6 md:mt-8 flex items-center gap-4">
            <Avatar initials={FEATURED.initials} gradient={FEATURED.gradient} />
            <div>
              <p className="font-medium text-white text-base">{FEATURED.name}</p>
              <p className="text-sm text-white/50">{FEATURED.role}</p>
            </div>
          </div>
        </motion.div>

        {/* ── Supporting testimonials ── */}
        {/* Mobile: 2-col snap scroll   Desktop: 3-col grid */}
        <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 mt-8 pb-2 -mx-6 px-6
          md:mx-0 md:px-0 md:grid md:grid-cols-3 md:overflow-visible md:pb-0
          [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {SUPPORTING.map((t, i) => (
            <motion.div
              key={i}
              className="snap-start flex-shrink-0 w-[calc(50%-8px)] md:w-auto
                rounded-2xl border border-white/[0.06] bg-[var(--color-bg-elevated)] p-6 md:p-8
                transition-colors duration-300 hover:border-white/[0.12]"
              initial={reduced ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: i * 0.1 }}
              viewport={{ once: true, margin: '-60px' }}
            >
              <Stars size="w-4 h-4" />
              <blockquote className="mt-4 text-white/80 text-sm md:text-base leading-relaxed italic">
                "{t.quote}"
              </blockquote>
              <div className="mt-6 flex items-center gap-3">
                <Avatar initials={t.initials} gradient={t.gradient} size="w-10 h-10" />
                <div>
                  <p className="text-sm font-medium text-white">{t.name}</p>
                  <p className="text-xs text-white/45">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
