import React, { useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { MagneticButton } from '../shared/MagneticButton';
import { useFeaturedProjects, type Project } from '../../hooks/useProjects';
import { ProjectImageCarousel } from './ProjectImageCarousel';
import { LiveCardPreview } from './LiveCardPreview';
import { AiDashboardMockup } from '../casestudy/AiDashboardMockup';

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

// ─── CaseStudyCard ────────────────────────────────────────────────────────────
//
// NOTE: case study data lives in `lib/projects.ts`. To wire up a CRM (Supabase,
// Notion, Sanity, etc.), fetch into the same `Project` shape and pass through.

interface CaseStudyCardProps {
  project: Project;
  reduced: boolean | null;
  index: number;
  onOpen: (slug: string) => void;
}

export const CaseStudyCard: React.FC<CaseStudyCardProps> = ({
  project,
  reduced,
  index,
  onOpen,
}) => {
  return (
    <motion.article
      onClick={() => onOpen(project.slug)}
      className="case-card group relative flex h-full w-full cursor-pointer flex-col overflow-hidden rounded-xl border border-white/10 bg-[#08060d] transition-all duration-300 hover:-translate-y-1 hover:border-[#ff3f8d]/45 sm:rounded-2xl"
      initial={reduced ? false : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1], delay: (index % 3) * 0.06 }}
    >
      {/* Animated gradient halo on hover */}
      <div className="case-card__halo pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" aria-hidden="true" />

      {/* TOP — Image carousel (if images) else gradient mockup */}
      <div className="relative z-10 aspect-[16/10] w-full overflow-hidden border-b border-white/8">
        <div className="absolute top-2.5 left-2.5 z-20 rounded-full border border-white/10 bg-black/60 px-2 py-0.5 font-mono text-[9px] text-white/60 backdrop-blur-sm sm:top-3 sm:left-3 sm:px-2.5 sm:text-[10px]">
          {project.year} · {project.category}
        </div>
        {project.images.length > 0 ? (
          <ProjectImageCarousel images={project.images} intervalMs={4500} />
        ) : project.cardMockup === 'ai-dashboard' ? (
          <AiDashboardMockup />
        ) : project.previewUrl ? (
          <LiveCardPreview url={project.previewUrl} siteName={project.client.split('·')[0].trim()} />
        ) : (
          <BrowserMockup url={project.url} from={project.from} to={project.to} />
        )}
      </div>

      {/* BOTTOM — Lean text content */}
      <div className="relative z-10 flex flex-1 flex-col p-4 sm:p-5">
        <p className="gradient-flow-text text-[9px] font-extrabold uppercase tracking-[0.16em] sm:text-[10px] sm:tracking-[0.2em]">
          {project.client}
        </p>

        <h3 className="mt-2 font-sans text-[1.05rem] font-semibold leading-[1.25] tracking-[-0.01em] text-white sm:text-[1.12rem] md:text-[1.18rem]">
          {project.title}
        </h3>

        <p className="mt-1.5 text-[12.5px] leading-relaxed text-white/55 sm:text-[13px]">
          {project.description}
        </p>

        <div className="mt-3 flex flex-wrap gap-1.5">
          {project.tech.slice(0, 4).map((t) => (
            <span
              key={t}
              className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] text-white/60"
            >
              {t}
            </span>
          ))}
        </div>

        <span className="mt-4 inline-flex items-center gap-1.5 self-start text-[11px] font-medium text-white/55 transition-colors duration-200 group-hover:text-white sm:text-xs">
          View case study
          <ArrowUpRight className="h-3 w-3 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 sm:h-3.5 sm:w-3.5" />
        </span>
      </div>
    </motion.article>
  );
};

// ─── Main section ─────────────────────────────────────────────────────────────

interface WorkProps {
  onStartProject: () => void;
  onOpenProject: (slug: string) => void;
  onViewAll: () => void;
}

export function Work({ onStartProject, onOpenProject, onViewAll }: WorkProps) {
  const reduced = useReducedMotion();
  const ctaBtnRef = useRef<HTMLDivElement>(null);
  const { projects } = useFeaturedProjects(6);

  const handleStartProject = () => {
    onStartProject();
  };

  return (
    <section id="work" className="relative py-10 md:py-12 bg-black">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-pink-600/4 rounded-full blur-[140px]" />
      </div>

      {/* ── Section header ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 mb-8 md:mb-10">
        <motion.div
          className="flex flex-col items-center text-center"
          initial={reduced ? false : { opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="font-serif italic text-white/95 text-[clamp(1.75rem,3.4vw,3rem)] leading-[1.1] tracking-normal">
            Stuff we
          </span>
          <span
            className="hero-automation-text mt-1 inline-block leading-none text-[clamp(2.5rem,5.6vw,5rem)]"
            data-text="SHIPPED."
          >
            SHIPPED.
          </span>
        </motion.div>

        {/* Sub-header row */}
        <motion.div
          className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4 mt-6 md:mt-8"
          initial={reduced ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          viewport={{ once: true }}
        >
          <p className="text-white/55 text-base leading-relaxed max-w-md">
            Real products. Real users. No templates, no shortcuts.
          </p>
          <button
            onClick={onViewAll}
            className="text-sm text-white/40 hover:text-white flex items-center gap-1.5 transition-colors duration-200 group/all whitespace-nowrap"
          >
            View all work
            <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover/all:translate-x-0.5 group-hover/all:-translate-y-0.5" />
          </button>
        </motion.div>
      </div>

      {/* ── Case studies grid ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 mt-8">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-6">
          {projects.map((project, i) => (
            <CaseStudyCard
              key={project.id}
              project={project}
              reduced={reduced}
              index={i}
              onOpen={onOpenProject}
            />
          ))}
        </div>

        {projects.length >= 6 && (
          <div className="mt-8 flex justify-center md:mt-10">
            <button
              onClick={onViewAll}
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-5 py-2.5 text-sm font-semibold text-white/85 transition-all duration-200 hover:bg-white/[0.08] hover:border-white/25 hover:text-white"
            >
              View all work
              <ArrowUpRight className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>

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
