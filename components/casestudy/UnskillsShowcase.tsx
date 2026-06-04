import React from 'react';
import { UnskillsMobileMockup } from './UnskillsMobileMockup';
import { UnskillsCrmMockup } from './UnskillsCrmMockup';

// Multi-device Visual Showcase collage (phone + laptop + tablet) in the style of
// the reference — clean dark canvas, devices on a shared baseline. Shows UnSkills
// CRM content: mobile view, the real dashboard screenshot, and the dashboard UI.

interface Props {
  image?: string;
}

export const UnskillsShowcase: React.FC<Props> = ({ image }) => (
  <div className="relative mt-12 flex items-end justify-center gap-3 sm:gap-5 lg:gap-7">
    {/* Phone — mobile CRM (hidden on small screens) */}
    <div className="hidden w-[15%] max-w-[150px] shrink-0 md:block">
      <div className="relative rounded-[1.5rem] border border-white/14 bg-[#0b0b10] p-[5px] shadow-[0_24px_60px_-26px_rgba(164,82,255,0.5)]">
        <div className="absolute left-1/2 top-[7px] z-20 h-[10px] w-[34%] -translate-x-1/2 rounded-full bg-black" />
        <div
          className="relative aspect-[390/845] w-full overflow-hidden rounded-[1.25rem] border border-black/60"
          style={{ clipPath: 'inset(0 round 1.25rem)' }}
        >
          <UnskillsMobileMockup />
        </div>
      </div>
    </div>

    {/* Laptop — the real dashboard screenshot */}
    <div className="w-[64%] max-w-[600px] sm:w-[52%] lg:w-[48%]">
      <div className="relative rounded-[12px] border border-white/12 bg-[#0b0b10] p-[8px] shadow-[0_36px_90px_-34px_rgba(164,82,255,0.5)]">
        <div className="absolute left-1/2 top-[4px] h-1 w-1 -translate-x-1/2 rounded-full bg-white/25" />
        <div
          className="relative aspect-[16/10] w-full overflow-hidden rounded-[3px] border border-black/60"
          style={{ clipPath: 'inset(0 round 3px)' }}
        >
          {image ? (
            <img src={image} alt="UnSkills CRM dashboard" loading="lazy" className="absolute inset-0 h-full w-full bg-white object-cover object-top" />
          ) : (
            <UnskillsCrmMockup />
          )}
        </div>
      </div>
      <div className="relative mx-auto h-[12px] w-[112%] -translate-x-[5.4%] rounded-b-[10px] rounded-t-[2px] border border-t-0 border-white/10 bg-gradient-to-b from-[#17171d] to-[#0b0b0f]">
        <div className="absolute left-1/2 top-0 h-[4px] w-[16%] -translate-x-1/2 rounded-b-[5px] bg-black/70" />
      </div>
    </div>

    {/* Tablet — the dashboard UI (hidden on small screens) */}
    <div className="hidden w-[30%] max-w-[400px] sm:block">
      <div className="relative rounded-[14px] border border-white/14 bg-[#0b0b10] p-[7px] shadow-[0_30px_80px_-30px_rgba(164,82,255,0.5)]">
        <div
          className="relative aspect-[4/3] w-full overflow-hidden rounded-[7px] border border-black/60"
          style={{ clipPath: 'inset(0 round 7px)' }}
        >
          <UnskillsCrmMockup />
        </div>
      </div>
    </div>
  </div>
);
