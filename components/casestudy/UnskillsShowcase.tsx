import React from 'react';
import { IndianRupee, TrendingUp } from 'lucide-react';
import { UnskillsMobileMockup } from './UnskillsMobileMockup';
import { UnskillsCrmMockup } from './UnskillsCrmMockup';

// Visual Showcase composition (in the style of a premium SaaS marketing render):
// a multi-device collage (phone + laptop + tablet) with two floating, detached
// glass cards — a "Total Revenue" stat card and a "Leads by Source" donut — for
// depth. Content is UnSkills CRM data (purple brand).

interface Props {
  image?: string;
}

const SOURCES = [
  { label: 'Instagram', pct: '47%', color: '#ec4899' },
  { label: 'WhatsApp', pct: '26%', color: '#22c55e' },
  { label: 'Facebook', pct: '24%', color: '#3b82f6' },
  { label: 'Manual', pct: '2%', color: '#9ca3af' },
  { label: 'Referral', pct: '1%', color: '#f59e0b' },
];
const DONUT = 'conic-gradient(#ec4899 0 47%, #22c55e 47% 73%, #3b82f6 73% 97%, #9ca3af 97% 99%, #f59e0b 99% 100%)';

// ── Floating cards ──
const RevenueCard = () => (
  <div className="w-[190px] rounded-2xl bg-white p-3 text-gray-900 shadow-[0_26px_70px_-18px_rgba(124,58,237,0.55)] ring-1 ring-black/5">
    <div className="flex items-center gap-1.5">
      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-violet-100 text-violet-600">
        <IndianRupee className="h-3 w-3" />
      </span>
      <span className="text-[9px] font-semibold uppercase tracking-wide text-gray-400">Total Revenue</span>
    </div>
    <p className="mt-1.5 text-[21px] font-bold leading-none">₹42,80,550</p>
    <div className="mt-1.5 flex items-end justify-between">
      <span className="inline-flex items-center gap-0.5 text-[10px] font-semibold text-emerald-600">
        <TrendingUp className="h-3 w-3" /> 18% vs last month
      </span>
      <svg viewBox="0 0 60 22" className="h-6 w-[60px]" preserveAspectRatio="none">
        <path d="M0,18 L12,15 L24,16 L36,5 L48,12 L60,8" fill="none" stroke="#7c3aed" strokeWidth="1.6" />
      </svg>
    </div>
  </div>
);

const LeadsCard = () => (
  <div className="w-[200px] rounded-2xl bg-white p-3 text-gray-900 shadow-[0_26px_70px_-18px_rgba(124,58,237,0.55)] ring-1 ring-black/5">
    <p className="text-[11px] font-bold">Leads by Source</p>
    <div className="mt-2 flex items-center gap-2.5">
      <div className="relative h-14 w-14 shrink-0 rounded-full" style={{ background: DONUT }}>
        <div className="absolute inset-[26%] flex flex-col items-center justify-center rounded-full bg-white">
          <span className="text-[10px] font-bold leading-none">612</span>
          <span className="text-[5px] text-gray-400">Total</span>
        </div>
      </div>
      <div className="flex-1 space-y-[3px]">
        {SOURCES.map((s) => (
          <div key={s.label} className="flex items-center gap-1 text-[7.5px]">
            <span className="h-1.5 w-1.5 rounded-full" style={{ background: s.color }} />
            <span className="flex-1 text-gray-600">{s.label}</span>
            <span className="font-semibold text-gray-800">{s.pct}</span>
          </div>
        ))}
      </div>
    </div>
    <div className="mt-2 flex items-center justify-between border-t border-gray-100 pt-1.5 text-[8px]">
      <span className="text-gray-400">Top Source</span>
      <span className="font-semibold text-violet-600">Instagram · 47%</span>
    </div>
  </div>
);

export const UnskillsShowcase: React.FC<Props> = ({ image }) => (
  <div className="relative mx-auto mt-12 max-w-6xl px-2 lg:px-0 lg:py-6">
    {/* ── Devices row ── */}
    <div className="flex items-end justify-center gap-3 sm:gap-5 lg:gap-7 lg:pl-[150px]">
      {/* Phone */}
      <div className="hidden w-[15%] max-w-[150px] shrink-0 md:block">
        <div className="relative rounded-[1.5rem] border border-white/14 bg-[#0b0b10] p-[5px] shadow-[0_24px_60px_-26px_rgba(124,58,237,0.55)]">
          <div className="absolute left-1/2 top-[7px] z-20 h-[10px] w-[34%] -translate-x-1/2 rounded-full bg-black" />
          <div className="relative aspect-[390/845] w-full overflow-hidden rounded-[1.25rem] border border-black/60" style={{ clipPath: 'inset(0 round 1.25rem)' }}>
            <UnskillsMobileMockup />
          </div>
        </div>
      </div>

      {/* Laptop */}
      <div className="w-[64%] max-w-[600px] sm:w-[52%] lg:w-[48%]">
        <div className="relative rounded-[12px] border border-white/12 bg-[#0b0b10] p-[8px] shadow-[0_36px_90px_-34px_rgba(124,58,237,0.55)]">
          <div className="absolute left-1/2 top-[4px] h-1 w-1 -translate-x-1/2 rounded-full bg-white/25" />
          <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[3px] border border-black/60" style={{ clipPath: 'inset(0 round 3px)' }}>
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

      {/* Tablet */}
      <div className="hidden w-[30%] max-w-[400px] sm:block">
        <div className="relative rounded-[14px] border border-white/14 bg-[#0b0b10] p-[7px] shadow-[0_30px_80px_-30px_rgba(124,58,237,0.55)]">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[7px] border border-black/60" style={{ clipPath: 'inset(0 round 7px)' }}>
            <UnskillsCrmMockup />
          </div>
        </div>
      </div>
    </div>

    {/* ── Floating detached cards (desktop only) ── */}
    <div className="pointer-events-none absolute left-0 top-2 hidden -rotate-2 lg:block">
      <RevenueCard />
    </div>
    <div className="pointer-events-none absolute bottom-1 left-3 hidden rotate-1 lg:block">
      <LeadsCard />
    </div>
  </div>
);
