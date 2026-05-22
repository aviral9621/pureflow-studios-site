import React from 'react';
import { motion } from 'framer-motion';
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
import { ViewState } from '../types';

interface AutomateSectionProps {
  onViewChange: (view: ViewState) => void;
}

const CARDS = [
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
    metric: '₹10L+ ad spend managed',
    view: 'service-ads',
  },
] as const;

const particles = [
  { top: '21%', left: '17%', size: 10, delay: 0, duration: 12 },
  { top: '44%', left: '10%', size: 8, delay: 1.5, duration: 14 },
  { top: '47%', left: '91%', size: 9, delay: 0.7, duration: 13 },
  { top: '78%', left: '85%', size: 8, delay: 2.2, duration: 15 },
  { top: '24%', left: '82%', size: 5, delay: 3, duration: 11 },
  { top: '35%', left: '29%', size: 4, delay: 1, duration: 10 },
  { top: '68%', left: '54%', size: 4, delay: 2.7, duration: 13 },
];

const cardVariants = {
  hidden: { opacity: 0, y: 28 },
  show: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: index * 0.1,
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

export const AutomateSection: React.FC<AutomateSectionProps> = ({ onViewChange }) => {
  return (
    <section id="automate-section" className="relative w-full bg-black py-12 md:py-20 px-3 sm:px-6 font-sans overflow-hidden">
      
      <style>{`
        @keyframes textFlow {
           0% { background-position: 0% 50%; }
           100% { background-position: 200% 50%; }
        }
        .animate-text-flow {
           background-size: 200% auto;
           animation: textFlow 3s linear infinite;
        }

        @keyframes particleFloat {
          0%, 100% { transform: translate3d(0, 0, 0) scale(1); opacity: .65; }
          35% { transform: translate3d(16px, -22px, 0) scale(1.14); opacity: 1; }
          70% { transform: translate3d(-12px, 18px, 0) scale(.9); opacity: .7; }
        }

        @keyframes glowPulse {
          0%, 100% { opacity: .32; transform: scale(1); }
          50% { opacity: .56; transform: scale(1.08); }
        }

        @keyframes waveDrift {
          0%, 100% { transform: translateY(0) scaleX(1); opacity: .34; }
          50% { transform: translateY(28px) scaleX(1.03); opacity: .55; }
        }

        @keyframes shineSweep {
          0% { transform: translateX(-140%) skewX(-18deg); opacity: 0; }
          35% { opacity: .42; }
          100% { transform: translateX(145%) skewX(-18deg); opacity: 0; }
        }

        .automation-particle {
          animation-name: particleFloat;
          animation-timing-function: ease-in-out;
          animation-iteration-count: infinite;
          will-change: transform, opacity;
        }

        .automation-glow {
          animation: glowPulse 9s ease-in-out infinite;
          will-change: transform, opacity;
        }

        .automation-wave {
          animation: waveDrift 14s ease-in-out infinite;
          will-change: transform, opacity;
        }

        .automation-card::after {
          content: "";
          position: absolute;
          top: -20%;
          bottom: -20%;
          left: 0;
          width: 38%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,.24), transparent);
          transform: translateX(-140%) skewX(-18deg);
          opacity: 0;
          pointer-events: none;
        }

        .automation-card:hover::after {
          animation: shineSweep 1.05s ease-out;
        }
      `}</style>

      <div className="absolute inset-0 z-0 pointer-events-none bg-[radial-gradient(ellipse_at_50%_0%,rgba(236,72,153,0.36),transparent_28%),linear-gradient(180deg,#050307_0%,#020204_42%,#000_100%)]" />
      <div className="automation-glow absolute -left-24 bottom-6 z-0 h-72 w-72 rounded-full bg-purple-700/45 blur-[105px] pointer-events-none" />
      <div className="automation-glow absolute -right-24 bottom-6 z-0 h-72 w-72 rounded-full bg-fuchsia-700/35 blur-[105px] pointer-events-none [animation-delay:-4s]" />
      <div className="automation-glow absolute left-1/2 top-0 z-0 h-44 w-[520px] -translate-x-1/2 rounded-full bg-purple-600/30 blur-[95px] pointer-events-none [animation-delay:-2s]" />

      <svg className="automation-wave absolute -left-28 top-20 z-0 h-[680px] w-[420px] text-purple-500/50 pointer-events-none" viewBox="0 0 420 680" fill="none" aria-hidden="true">
        <path d="M31 3C173 58 194 149 84 255C-49 383 206 443 294 533C356 596 284 650 224 676" stroke="currentColor" strokeWidth="1.15" />
      </svg>
      <svg className="automation-wave absolute -right-20 top-20 z-0 h-[700px] w-[430px] text-fuchsia-500/50 pointer-events-none [animation-delay:-6s]" viewBox="0 0 430 700" fill="none" aria-hidden="true">
        <path d="M379 4C233 52 207 145 323 255C464 389 184 445 99 551C45 618 117 665 198 695" stroke="currentColor" strokeWidth="1.15" />
      </svg>

      {particles.map((particle) => (
        <span
          key={`${particle.top}-${particle.left}`}
          className="automation-particle absolute z-0 rounded-full bg-purple-400 shadow-[0_0_22px_rgba(192,132,252,.95)] pointer-events-none"
          style={{
            top: particle.top,
            left: particle.left,
            width: particle.size,
            height: particle.size,
            animationDelay: `${particle.delay}s`,
            animationDuration: `${particle.duration}s`,
          }}
        />
      ))}

      <div className="max-w-7xl mx-auto relative z-10 flex flex-col items-center">
        
        {/* Header */}
        <div className="text-center mb-8 md:mb-12 max-w-4xl px-2">
          {/* Removed 'SERVICES' Word as requested */}
          <h3 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-tight mb-3 md:mb-6">
            What do you want to <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#A452FF] via-[#FF20A0] to-[#A452FF] animate-text-flow inline-block">
              Automate
            </span> today?
          </h3>
        </div>

        <div className="grid w-full max-w-[1168px] grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {CARDS.map((card, idx) => {
            const Icon = card.icon;
            return (
              <motion.button
                key={card.id}
                custom={idx}
                variants={cardVariants}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.25 }}
                whileHover={{ y: -5 }}
                whileTap={{ scale: 0.99 }}
                onClick={() => onViewChange(card.view as ViewState)}
                className={`
                  automation-card group relative min-h-[306px] overflow-hidden rounded-[14px] border border-white/20
                  bg-[#030406]/90 px-[22px] pb-[22px] pt-[20px] text-left
                  shadow-[inset_0_1px_0_rgba(255,255,255,.04),0_24px_70px_-55px_rgba(236,72,153,.85)]
                  transition-all duration-300 hover:border-white/35 hover:bg-[#06070a]
                  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#ff3f8d]
                `}
              >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_12%,rgba(236,72,153,.13),transparent_30%),linear-gradient(145deg,rgba(255,255,255,.035),transparent_42%)] opacity-80" />
                <ArrowUpRight
                  className="absolute right-6 top-6 z-10 h-[18px] w-[18px] text-white/90 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  strokeWidth={1.8}
                  aria-hidden="true"
                />

                <div className="relative z-10 flex h-full min-h-[264px] flex-col">
                  <div className="mb-[21px] flex h-[58px] w-[58px] items-center justify-center rounded-[12px] border border-[#ff3f8d]/80 bg-[#08070b] text-[#ff3f8d] shadow-[0_0_26px_-14px_rgba(255,63,141,1)]">
                    <Icon className="h-8 w-8" strokeWidth={1.9} />
                  </div>

                  <div>
                    <p className="mb-2 text-[10px] font-extrabold uppercase tracking-[0.09em] text-[#ff3f8d]">
                      {card.category}
                    </p>
                    <h3 className="text-[24px] font-medium leading-tight text-white md:text-[25px]">
                      {card.title}
                    </h3>
                    <p className="mt-3 max-w-[32ch] text-[14px] font-normal leading-[1.45] text-white/62">
                      {card.description}
                    </p>
                  </div>

                  <div className="mt-auto border-t border-white/10 pt-[15px]">
                    <div className="flex items-center justify-between gap-4">
                      <span className="text-[13px] font-medium text-white/78">
                        {card.metric}
                      </span>
                      <span className="inline-flex shrink-0 items-center gap-2 text-[13px] font-medium text-[#ff3f8d]">
                        Explore
                        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={1.8} />
                      </span>
                    </div>
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
