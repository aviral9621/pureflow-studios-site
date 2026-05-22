import { motion, useReducedMotion } from 'framer-motion';
import { Rocket, ShieldCheck, Sparkles, Users } from 'lucide-react';

const PILLARS = [
  {
    icon: Rocket,
    title: 'Ship fast.',
    body: 'Daily commits, weekly demos, live staging from day one. No agency theatre.',
  },
  {
    icon: ShieldCheck,
    title: 'Own your code.',
    body: 'Source code, repos, and infra transfer to your org on full payment. Nothing locked in.',
  },
  {
    icon: Users,
    title: 'One direct line.',
    body: 'You talk to the founder, not a project manager forwarding emails.',
  },
  {
    icon: Sparkles,
    title: 'Built to last.',
    body: 'TypeScript, Next.js, Supabase — modern foundations that outlive the hype cycle.',
  },
];

export function About() {
  const reduced = useReducedMotion();

  return (
    <section
      id="about"
      className="relative overflow-hidden bg-black py-16 md:py-20"
      aria-label="About Pureflow Studios"
    >
      {/* Ambient */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-purple-600/5 rounded-full blur-[130px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-5 sm:px-6 lg:px-10">
        {/* Heading */}
        <motion.div
          className="mb-12 flex flex-col items-center text-center md:mb-16"
          initial={reduced ? false : { opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="font-serif italic text-white/95 text-[clamp(1.75rem,3.4vw,3rem)] leading-[1.1] tracking-normal">
            A small studio.
          </span>
          <span
            className="hero-automation-text mt-1 inline-block leading-none text-[clamp(2.5rem,5.6vw,5rem)]"
            data-text="BUILT TO SHIP."
          >
            BUILT TO SHIP.
          </span>
          <p className="mt-6 max-w-2xl text-[15px] leading-relaxed text-white/65 sm:text-base">
            Pureflow Studios is a Lucknow-based design and engineering studio. We help founders and growing teams replace
            WhatsApp chaos and spreadsheets with custom software — CRMs, dashboards, AI agents, and web apps that
            actually move the business forward.
          </p>
        </motion.div>

        {/* Pillars */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4 lg:gap-6">
          {PILLARS.map((p, i) => {
            const Icon = p.icon;
            return (
              <motion.div
                key={p.title}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[#08060d] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[#ff3f8d]/45"
                initial={reduced ? false : { opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: i * 0.08 }}
              >
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg border border-white/85 bg-black text-white shadow-[0_0_24px_-12px_rgba(255,255,255,0.4)]">
                  <Icon className="h-5 w-5" strokeWidth={1.9} />
                </div>
                <h3 className="font-sans text-[1.05rem] font-semibold leading-tight tracking-[-0.01em] text-white">
                  {p.title}
                </h3>
                <p className="mt-2 text-[13.5px] leading-relaxed text-white/60">
                  {p.body}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
