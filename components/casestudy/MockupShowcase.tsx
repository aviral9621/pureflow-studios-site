import React from 'react';
import { Mockup, type MockupKind } from './Mockup';

// A clean two-device collage (laptop + tablet) for designed-mockup case studies
// that don't have a live site — both devices show the same product UI.

export const MockupShowcase: React.FC<{ kind: MockupKind }> = ({ kind }) => (
  <div className="mt-12 flex items-end justify-center gap-4 sm:gap-6 lg:gap-8">
    {/* Laptop */}
    <div className="w-[66%] max-w-[640px] sm:w-[58%]">
      <div className="relative rounded-[12px] border border-white/12 bg-[#0b0b10] p-[8px] shadow-[0_36px_90px_-34px_rgba(34,197,94,0.4)]">
        <div className="absolute left-1/2 top-[4px] h-1 w-1 -translate-x-1/2 rounded-full bg-white/25" />
        <div
          className="relative aspect-[16/10] w-full overflow-hidden rounded-[3px] border border-black/60"
          style={{ clipPath: 'inset(0 round 3px)' }}
        >
          <Mockup kind={kind} />
        </div>
      </div>
      <div className="relative mx-auto h-[12px] w-[112%] -translate-x-[5.4%] rounded-b-[10px] rounded-t-[2px] border border-t-0 border-white/10 bg-gradient-to-b from-[#17171d] to-[#0b0b0f]">
        <div className="absolute left-1/2 top-0 h-[4px] w-[16%] -translate-x-1/2 rounded-b-[5px] bg-black/70" />
      </div>
    </div>

    {/* Tablet (hidden on small screens) */}
    <div className="hidden w-[32%] max-w-[420px] sm:block">
      <div className="relative rounded-[14px] border border-white/14 bg-[#0b0b10] p-[7px] shadow-[0_30px_80px_-30px_rgba(34,197,94,0.4)]">
        <div
          className="relative aspect-[4/3] w-full overflow-hidden rounded-[7px] border border-black/60"
          style={{ clipPath: 'inset(0 round 7px)' }}
        >
          <Mockup kind={kind} />
        </div>
      </div>
    </div>
  </div>
);
