import { motion, useReducedMotion } from 'framer-motion';
import {
  ArrowRight,
  ArrowUpRight,
  ChartNoAxesCombined,
  Code2,
  Globe2,
  LayoutDashboard,
  Megaphone,
  Smartphone,
} from 'lucide-react';
import { ViewState } from '../../types';

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

interface ServicesProps {
  onViewChange: (view: ViewState) => void;
}

const serviceCards = [
  {
    id: 'development',
    icon: Code2,
    category: 'Development',
    title: 'Custom Software',
    description:
      'Bespoke systems that fit your exact business logic. CRMs, ERPs, dashboards, internal tools - built on Next.js + Supabase. Not templates. Not WordPress. Actual software.',
    metric: '12+ systems shipped',
    view: 'service-software',
  },
  {
    id: 'product',
    icon: LayoutDashboard,
    category: 'Product',
    title: 'CRMs & Dashboards',
    description:
      'Customer relationship tools, commission engines, KYC portals, report builders - anything that makes your team 3x more efficient by replacing WhatsApp chaos with a real system.',
    metric: '8 CRMs live in production',
    view: 'service-crm',
  },
  {
    id: 'mobile',
    icon: Smartphone,
    category: 'Mobile',
    title: 'Mobile Apps',
    description:
      'PWA-first when speed is the goal, React Native when native experience matters. We build apps that ship to both Android and iOS without two separate budgets.',
    metric: 'PWA + native both covered',
    view: 'service-mobile',
  },
  {
    id: 'web',
    icon: Globe2,
    category: 'Web',
    title: 'Websites',
    description:
      'Marketing sites, booking portals, multi-page agency websites. Fast, SEO-optimized, designed to convert. Built on Next.js 15 with Tailwind. Deployed on Vercel in hours.',
    metric: '15+ sites live',
    view: 'service-website',
  },
  {
    id: 'marketing',
    icon: ChartNoAxesCombined,
    category: 'Marketing',
    title: 'Social Media',
    description:
      'Content strategy, reel scripts, AI-generated product visuals, carousel design, brand voice development. We handle social for travel, healthcare, and edtech clients across Instagram and Facebook.',
    metric: '4 brands managed monthly',
    view: 'service-social',
  },
  {
    id: 'performance',
    icon: Megaphone,
    category: 'Performance',
    title: 'Ads Management',
    description:
      "Meta (Facebook + Instagram) ad campaigns. Copy, creative, targeting, A/B testing, budget optimization. We don't just run ads - we optimize toward your actual business goals.",
    metric: 'Rs 10L+ ad spend managed',
    view: 'service-ads',
  },
] as const;

const cardGridVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.09,
      delayChildren: 0.12,
    },
  },
};

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 24,
    scale: 0.97,
    filter: 'blur(8px)',
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: 'blur(0px)',
    transition: {
      duration: 0.56,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export function Services({ onViewChange }: ServicesProps) {
  const reduced = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-black py-14 md:py-16">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-0 h-[520px] w-[940px] -translate-x-1/2 rounded-full bg-[#ff2f86]/10 blur-[130px]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(236,72,153,0.18),transparent_32%),linear-gradient(180deg,#050307_0%,#020204_45%,#000_100%)]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        <div className="mb-7 md:mb-10">
          <p className="font-mono text-xs uppercase tracking-[0.3em] mb-3 bg-gradient-to-r from-[#FF20A0] to-[#A452FF] bg-clip-text text-transparent">
            / 01 - Capabilities
          </p>
          <h2 className="font-display text-[44px] font-bold leading-[1.02] tracking-normal text-white sm:text-[clamp(3.25rem,7vw,6.75rem)] sm:leading-[1]">
            <Word text="What" delay={0} reduced={reduced} />{' '}
            <Word text="do" delay={0.08} reduced={reduced} />{' '}
            <Word text="you" delay={0.16} reduced={reduced} />{' '}
            <Word text="want" delay={0.24} reduced={reduced} />{' '}
            <Word text="to" delay={0.32} reduced={reduced} />
            <br />
            <span className="mt-2 flex flex-wrap items-baseline gap-x-[0.18em] gap-y-1 sm:mt-3 sm:gap-x-[0.22em]">
              <Word
                text="Automate"
                delay={0.4}
                className="gradient-text font-serif italic font-normal leading-[1.12] py-[0.05em]"
                reduced={reduced}
              />
              <Word text="today?" delay={0.5} reduced={reduced} />
            </span>
          </h2>
        </div>

        <motion.div
          className="grid w-full grid-cols-2 gap-2.5 sm:gap-4 lg:grid-cols-3"
          variants={reduced ? undefined : cardGridVariants}
          initial={reduced ? false : 'hidden'}
          whileInView={reduced ? undefined : 'visible'}
          viewport={{ once: true, amount: 0.18 }}
        >
          {serviceCards.map((card) => {
            const Icon = card.icon;

            return (
              <motion.button
                key={card.id}
                type="button"
                onClick={() => onViewChange(card.view as ViewState)}
                variants={reduced ? undefined : cardVariants}
                className="group relative min-h-[208px] overflow-hidden rounded-lg border border-white/18 bg-[#020306] px-3 pb-3 pt-3 text-left shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] transition-all duration-300 hover:-translate-y-1 hover:border-[#ff3f8d]/65 hover:bg-[#050509] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#ff3f8d] sm:min-h-[330px] sm:px-5 sm:pb-5 sm:pt-5"
                whileHover={reduced ? undefined : { y: -4, transition: { duration: 0.2 } }}
                whileTap={reduced ? undefined : { scale: 0.985 }}
              >
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_0%,rgba(255,47,134,0.16),transparent_34%),linear-gradient(145deg,rgba(255,255,255,0.04),transparent_45%)] opacity-80 transition-opacity duration-300 group-hover:opacity-100" />
                <ArrowUpRight
                  className="absolute right-5 top-5 h-4 w-4 text-white/80 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  strokeWidth={1.8}
                  aria-hidden="true"
                />

                <div className="relative z-10 flex h-full min-h-[184px] flex-col sm:min-h-[290px]">
                  <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg border border-[#ff3f8d]/70 bg-[#08070b] text-[#ff3f8d] shadow-[0_0_24px_-15px_rgba(255,63,141,1)] sm:mb-5 sm:h-12 sm:w-12">
                    <Icon className="h-4.5 w-4.5 sm:h-6 sm:w-6" strokeWidth={1.9} />
                  </div>

                  <p className="mb-1.5 text-[9px] font-extrabold uppercase tracking-[0.06em] text-[#ff3f8d] sm:mb-2 sm:text-[10px] sm:tracking-[0.09em]">
                    {card.category}
                  </p>
                  <h3 className="text-[15px] font-medium leading-tight text-white sm:text-[21px]">
                    {card.title}
                  </h3>
                  <p className="mt-2 max-w-[36ch] overflow-hidden text-[11px] font-normal leading-[1.35] text-white/62 [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:2] sm:mt-3 sm:text-[13px] sm:leading-[1.48] sm:[-webkit-line-clamp:unset]">
                    {card.description}
                  </p>

                  <div className="mt-auto border-t border-white/10 pt-3 sm:pt-4">
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
                      <span className="text-[10px] font-medium leading-snug text-white/78 sm:text-[12px]">
                        {card.metric}
                      </span>
                      <span className="inline-flex shrink-0 items-center gap-1 text-[11px] font-medium text-[#ff3f8d] sm:gap-1.5 sm:text-[12px]">
                        Explore
                        <ArrowRight
                          className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1"
                          strokeWidth={1.8}
                        />
                      </span>
                    </div>
                  </div>
                </div>
              </motion.button>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
