import React, { useEffect } from 'react';
import { useReducedMotion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { ViewState } from '../../types';
import type { CaseStudy } from '../../lib/caseStudies';
import { Footer } from '../Footer';
import {
  Hero,
  SnapshotStrip,
  Challenge,
  WhatWeBuilt,
  TechStack,
  VisualShowcase,
  Outcome,
  Testimonial,
  CaseStudyCTA,
} from './sections';

interface Props {
  caseStudy: CaseStudy;
  onViewChange: (view: ViewState) => void;
  /** Accepted for routing parity with WorkPostPage; unused here. */
  onOpenProject?: (slug: string) => void;
}

export const CaseStudyPage: React.FC<Props> = ({ caseStudy, onViewChange }) => {
  const reduced = useReducedMotion();

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = `${caseStudy.name} — Pureflow Studios`;
    const meta = document.head.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (meta) meta.content = `${caseStudy.name} — ${caseStudy.tagline}`;
  }, [caseStudy]);

  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-white">
      {/* Back to all work */}
      <div className="relative z-10 mx-auto max-w-7xl px-5 pt-24 sm:px-6 lg:px-10">
        <button
          onClick={() => onViewChange('work')}
          className="group flex items-center gap-2 text-sm text-white/45 transition-colors hover:text-white"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          Back to all work
        </button>
      </div>

      <Hero cs={caseStudy} reduced={reduced} />
      <SnapshotStrip cs={caseStudy} reduced={reduced} />
      <Challenge cs={caseStudy} reduced={reduced} />
      <WhatWeBuilt cs={caseStudy} reduced={reduced} />
      <TechStack cs={caseStudy} reduced={reduced} />
      <VisualShowcase cs={caseStudy} reduced={reduced} />
      <Outcome cs={caseStudy} reduced={reduced} />
      <Testimonial cs={caseStudy} reduced={reduced} />
      <CaseStudyCTA reduced={reduced} liveUrl={caseStudy.liveUrl} onStart={() => onViewChange('start-project')} />

      <Footer onViewChange={onViewChange} />
    </main>
  );
};
