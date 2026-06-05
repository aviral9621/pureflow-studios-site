import React from 'react';
import {
  LayoutDashboard,
  Building2,
  MessageSquare,
  CalendarDays,
  BarChart3,
  Users,
  Settings,
  Menu,
  Search,
  Filter,
  ChevronRight,
  ChevronLeft,
  Plus,
  Pencil,
  Trash2,
  Layers,
  PieChart,
  Clock,
  DollarSign,
  TrendingUp,
  MoreHorizontal,
} from 'lucide-react';
import { useFitScale } from '../../hooks/useFitScale';

// ─────────────────────────────────────────────────────────────────────────────
// StayHubShowcase — a designed (non-interactive) SaaS hotel-management dashboard
// collage ("StayHub"), recreated as pure UI. Built at a fixed 1540×1030 canvas
// and scaled to fit its container with useFitScale, so it stays crisp at any size.
// Illustrative sample data only.
// ─────────────────────────────────────────────────────────────────────────────

const BLUE = '#3B82F6';
const GREEN = '#22C55E';
const GOLD = '#F59E0B';
const PURPLE = '#8B5CF6';
const NAVY = '#1E293B';

const CW = 1540;
const CH = 1030;

// ── small primitives ─────────────────────────────────────────────────────────
const Card: React.FC<{ style?: React.CSSProperties; className?: string; children: React.ReactNode }> = ({ style, className = '', children }) => (
  <div
    className={`absolute rounded-2xl bg-white ring-1 ring-black/[0.06] shadow-[0_18px_50px_-20px_rgba(15,23,42,0.35)] ${className}`}
    style={style}
  >
    {children}
  </div>
);

const Badge: React.FC<{ text: string; color: string }> = ({ text, color }) => (
  <span className="inline-flex items-center rounded-full px-2 py-[2px] text-[10px] font-semibold" style={{ background: `${color}1f`, color }}>
    {text}
  </span>
);

const Donut: React.FC<{ size: number; segs: { pct: number; color: string }[]; center: string; sub: string }> = ({ size, segs, center, sub }) => {
  let acc = 0;
  const stops = segs
    .map((s) => {
      const from = acc;
      acc += s.pct;
      return `${s.color} ${from}% ${acc}%`;
    })
    .join(', ');
  return (
    <div className="relative shrink-0 rounded-full" style={{ width: size, height: size, background: `conic-gradient(${stops})` }}>
      <div className="absolute flex flex-col items-center justify-center rounded-full bg-white" style={{ inset: size * 0.2 }}>
        <span className="font-bold leading-none text-slate-900" style={{ fontSize: size * (center.length > 5 ? 0.115 : 0.16) }}>{center}</span>
        <span className="mt-0.5 text-slate-400" style={{ fontSize: size * 0.085 }}>{sub}</span>
      </div>
    </div>
  );
};

const LineChart: React.FC<{ w: number; h: number; vals: number[] }> = ({ w, h, vals }) => {
  const padL = 34, padR = 10, padT = 10, padB = 22;
  const iw = w - padL - padR, ih = h - padT - padB;
  const max = 20;
  const stepX = iw / (vals.length - 1);
  const pts = vals.map((v, i) => [padL + i * stepX, padT + ih - (v / max) * ih]);
  const line = pts.map((p, i) => `${i ? 'L' : 'M'}${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(' ');
  const area = `${line} L${pts[pts.length - 1][0].toFixed(1)},${padT + ih} L${padL},${padT + ih} Z`;
  const yLabels = ['$20K', '$15K', '$10K', '$5K', '$0'];
  const xLabels = ['01 May', '06 May', '11 May', '16 May', '21 May', '26 May', '31 May'];
  return (
    <svg width={w} height={h} className="block">
      {yLabels.map((l, i) => {
        const y = padT + (ih / 4) * i;
        return (
          <g key={l}>
            <line x1={padL} y1={y} x2={w - padR} y2={y} stroke="#EEF2F7" strokeWidth={1} />
            <text x={padL - 6} y={y + 3} textAnchor="end" fontSize={9} fill="#94A3B8">{l}</text>
          </g>
        );
      })}
      {xLabels.map((l, i) => (
        <text key={l} x={padL + (iw / (xLabels.length - 1)) * i} y={h - 6} textAnchor="middle" fontSize={9} fill="#94A3B8">{l}</text>
      ))}
      <defs>
        <linearGradient id="shArea" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={BLUE} stopOpacity="0.22" />
          <stop offset="100%" stopColor={BLUE} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={area} fill="url(#shArea)" />
      <path d={line} fill="none" stroke={BLUE} strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};

// ── data ─────────────────────────────────────────────────────────────────────
const TREND = [5.2, 6.1, 5.6, 7.4, 8.9, 7.8, 9.2, 8.6, 10.8, 9.9, 12.4, 11.3, 13.6, 12.1, 14.8, 13.2, 15.1, 14.3, 16.2];

const KPIS = [
  { label: 'Total Revenue', value: '$125,430', delta: '12.5%', Icon: Layers },
  { label: 'Total Bookings', value: '320', delta: '8.3%', Icon: CalendarDays },
  { label: 'Occupancy Rate', value: '68.2%', delta: '5.7%', Icon: PieChart },
  { label: 'Avg. Daily Rate', value: '$145.75', delta: '3.9%', Icon: DollarSign },
];

const NAV = [
  { label: 'Dashboard', Icon: LayoutDashboard, active: true },
  { label: 'Hotels', Icon: Building2 },
  { label: 'Leads & Inquiries', Icon: MessageSquare },
  { label: 'Bookings', Icon: CalendarDays },
  { label: 'Reports', Icon: BarChart3 },
  { label: 'Users', Icon: Users },
  { label: 'Settings', Icon: Settings },
];

const SOURCE = [
  { label: 'Direct', meta: '40% (128)', pct: 40, color: BLUE },
  { label: 'Website', meta: '30% (96)', pct: 30, color: GREEN },
  { label: 'OTA', meta: '20% (64)', pct: 20, color: GOLD },
  { label: 'Walk-in', meta: '10% (32)', pct: 10, color: PURPLE },
];

const BOOKINGS = [
  { g: 'John Smith', h: 'Ocean View Hotel', ci: '12 May 2024', co: '15 May 2024', amt: '$450.00', st: 'Confirmed', c: GREEN },
  { g: 'Emma Johnson', h: 'Mountain Resort', ci: '14 May 2024', co: '18 May 2024', amt: '$620.00', st: 'Confirmed', c: GREEN },
  { g: 'Michael Brown', h: 'City Center Hotel', ci: '15 May 2024', co: '16 May 2024', amt: '$230.00', st: 'Pending', c: GOLD },
  { g: 'Sarah Davis', h: 'Ocean View Hotel', ci: '16 May 2024', co: '20 May 2024', amt: '$750.00', st: 'Confirmed', c: GREEN },
];

const HOTELS = [
  { n: 'Ocean View Hotel', e: 'oceanview@stayhub.com', loc: 'Miami, Florida', r: 120, active: true },
  { n: 'Mountain Resort', e: 'mountain@stayhub.com', loc: 'Denver, Colorado', r: 85, active: true },
  { n: 'City Center Hotel', e: 'citycenter@stayhub.com', loc: 'New York, New York', r: 200, active: true },
  { n: 'Beachside Inn', e: 'beachside@stayhub.com', loc: 'Los Angeles, California', r: 60, active: false },
  { n: 'Airport Hotel', e: 'airport@stayhub.com', loc: 'Chicago, Illinois', r: 75, active: true },
];

const LEADS = [
  { n: 'John Smith', e: 'john.smith@email.com', p: '+1 (555) 123-4567', st: 'New', c: GREEN, d: '20 May 2024' },
  { n: 'Sarah Johnson', e: 'sarah.j@email.com', p: '+1 (555) 987-6543', st: 'Contacted', c: BLUE, d: '19 May 2024' },
  { n: 'Michael Brown', e: 'michael.b@email.com', p: '+1 (555) 456-7890', st: 'Qualified', c: GOLD, d: '18 May 2024' },
  { n: 'Emma Davis', e: 'emma.d@email.com', p: '+1 (555) 321-0987', st: 'Proposal Sent', c: PURPLE, d: '17 May 2024' },
  { n: 'David Wilson', e: 'david.w@email.com', p: '+1 (555) 654-3210', st: 'Closed', c: '#EF4444', d: '16 May 2024' },
];

const BY_HOTEL = [
  { label: 'Ocean View Hotel', meta: '40% ($50,172)', pct: 40, color: BLUE },
  { label: 'Mountain Resort', meta: '30% ($37,629)', pct: 30, color: GREEN },
  { label: 'City Center Hotel', meta: '20% ($25,086)', pct: 20, color: GOLD },
  { label: 'Beachside Inn', meta: '10% ($12,543)', pct: 10, color: PURPLE },
];

const DatePill: React.FC<{ small?: boolean }> = ({ small }) => (
  <span className={`inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white font-medium text-slate-500 ${small ? 'px-2 py-1 text-[9px]' : 'px-2.5 py-1.5 text-[11px]'}`}>
    <CalendarDays className={small ? 'h-2.5 w-2.5' : 'h-3 w-3'} /> 01 May 2024 - 31 May 2024
  </span>
);

const KpiCard: React.FC<{ k: typeof KPIS[number] }> = ({ k }) => (
  <div className="rounded-xl border border-slate-200 bg-white p-3">
    <div className="flex items-start justify-between">
      <span className="text-[11px] text-slate-500">{k.label}</span>
      <span className="flex h-6 w-6 items-center justify-center rounded-lg" style={{ background: `${BLUE}1a`, color: BLUE }}>
        <k.Icon className="h-3.5 w-3.5" />
      </span>
    </div>
    <p className="mt-1 text-[20px] font-bold leading-none text-slate-900">{k.value}</p>
    <p className="mt-1.5 flex items-center gap-1 text-[10px] font-semibold" style={{ color: GREEN }}>
      <TrendingUp className="h-3 w-3" /> {k.delta}
    </p>
    <p className="mt-0.5 text-[8.5px] text-slate-400">vs 01 Apr 2024 - 30 Apr 2024</p>
  </div>
);

const Legend: React.FC<{ items: { label: string; meta: string; color: string }[]; gap?: string }> = ({ items, gap = 'gap-2.5' }) => (
  <div className={`flex flex-col ${gap}`}>
    {items.map((s) => (
      <div key={s.label} className="flex items-start gap-2">
        <span className="mt-[3px] h-2 w-2 shrink-0 rounded-full" style={{ background: s.color }} />
        <div className="leading-tight">
          <p className="text-[11px] font-medium text-slate-700">{s.label}</p>
          <p className="text-[10px] text-slate-400">{s.meta}</p>
        </div>
      </div>
    ))}
  </div>
);

// ── the collage ──────────────────────────────────────────────────────────────
export const StayHubShowcase: React.FC<{ image?: string }> = ({ image }) => {
  const fit = useFitScale(CW);
  return (
    <div
      ref={fit.ref}
      className="relative w-full"
      style={{ aspectRatio: `${CW} / ${CH}` }}
    >
      <div
        className="absolute left-0 top-0 origin-top-left font-sans"
        style={{ width: CW, height: CH, transform: `scale(${fit.scale || 0.0001})`, visibility: fit.scale ? 'visible' : 'hidden' }}
      >
        {/* ── MAIN DASHBOARD (real screenshot when provided; widened to the right) ── */}
        <Card style={{ left: 372, top: 40, width: 840, height: 566 }} className="z-30">
          {image ? (
            <img
              src={image}
              alt="Quick Hotels CRM dashboard"
              loading="lazy"
              className="h-full w-full rounded-2xl bg-white object-cover object-left-top"
            />
          ) : (
          <div className="flex h-full overflow-hidden rounded-2xl">
            {/* sidebar */}
            <aside className="flex w-[150px] shrink-0 flex-col p-3 text-white" style={{ background: NAVY }}>
              <div className="mb-4 flex items-center justify-between">
                <span className="text-[15px] font-bold">Stay<span style={{ color: BLUE }}>Hub</span></span>
                <Menu className="h-3.5 w-3.5 text-white/60" />
              </div>
              <nav className="flex flex-col gap-1">
                {NAV.map(({ label, Icon, active }) => (
                  <div
                    key={label}
                    className="flex items-center gap-2 rounded-lg px-2 py-[7px] text-[11px] font-medium"
                    style={active ? { background: BLUE, color: '#fff' } : { color: '#CBD5E1' }}
                  >
                    <Icon className="h-3.5 w-3.5 shrink-0" />
                    <span className="truncate">{label}</span>
                  </div>
                ))}
              </nav>
              <div className="mt-auto flex items-center gap-2 border-t border-white/10 pt-3">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/15 text-[9px] font-bold">SA</span>
                <div className="leading-tight">
                  <p className="text-[10px] font-semibold">StayHub Admin</p>
                  <p className="text-[8px] text-white/50">admin@stayhub.com</p>
                </div>
              </div>
            </aside>

            {/* content */}
            <div className="flex flex-1 flex-col gap-2.5 overflow-hidden p-3">
              <div className="flex items-center justify-between">
                <h3 className="text-[16px] font-bold text-slate-900">Dashboard</h3>
                <DatePill />
              </div>

              <div className="grid grid-cols-4 gap-2.5">
                {KPIS.map((k) => <KpiCard key={k.label} k={k} />)}
              </div>

              <div className="grid grid-cols-[1.45fr_1fr] gap-2.5">
                {/* revenue overview */}
                <div className="rounded-xl border border-slate-200 bg-white p-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[12px] font-semibold text-slate-800">Revenue Overview</span>
                    <span className="rounded-md border border-slate-200 px-2 py-0.5 text-[9px] text-slate-500">Daily ▾</span>
                  </div>
                  <LineChart w={350} h={150} vals={TREND} />
                </div>
                {/* bookings by source */}
                <div className="rounded-xl border border-slate-200 bg-white p-3">
                  <span className="text-[12px] font-semibold text-slate-800">Bookings by Source</span>
                  <div className="mt-2 flex items-center gap-3">
                    <Donut size={92} segs={SOURCE} center="320" sub="Total" />
                    <Legend items={SOURCE} gap="gap-1.5" />
                  </div>
                </div>
              </div>

              {/* recent bookings */}
              <div className="flex-1 rounded-xl border border-slate-200 bg-white p-3">
                <div className="mb-1.5 flex items-center justify-between">
                  <span className="text-[12px] font-semibold text-slate-800">Recent Bookings</span>
                  <span className="rounded-md px-2 py-0.5 text-[9px] font-semibold" style={{ background: `${BLUE}14`, color: BLUE }}>View All</span>
                </div>
                <table className="w-full text-left">
                  <thead>
                    <tr className="text-[9px] uppercase tracking-wide text-slate-400">
                      <th className="pb-1 font-medium">Guest Name</th>
                      <th className="pb-1 font-medium">Hotel</th>
                      <th className="pb-1 font-medium">Check-in</th>
                      <th className="pb-1 font-medium">Check-out</th>
                      <th className="pb-1 font-medium">Amount</th>
                      <th className="pb-1 font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {BOOKINGS.map((b) => (
                      <tr key={b.g} className="border-t border-slate-100 text-[10px] text-slate-600">
                        <td className="py-[5px] font-medium text-slate-800">{b.g}</td>
                        <td className="py-[5px]">{b.h}</td>
                        <td className="py-[5px]">{b.ci}</td>
                        <td className="py-[5px]">{b.co}</td>
                        <td className="py-[5px] font-medium text-slate-800">{b.amt}</td>
                        <td className="py-[5px]"><Badge text={b.st} color={b.c} /></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          )}
        </Card>

        {/* ── HOTELS (top-left) ── */}
        <Card style={{ left: 36, top: 152, width: 330, height: 420 }}>
          <div className="flex h-full flex-col p-4">
            <div className="flex items-center justify-between">
              <span className="text-[14px] font-bold text-slate-900">Hotels</span>
              <span className="inline-flex items-center gap-1 rounded-lg px-2.5 py-1 text-[10px] font-semibold text-white" style={{ background: BLUE }}>
                <Plus className="h-3 w-3" /> Add Hotel
              </span>
            </div>
            <div className="mt-3 flex items-center gap-1.5 rounded-lg border border-slate-200 px-2 py-1.5 text-[10px] text-slate-400">
              <Search className="h-3 w-3" /> Search hotels...
            </div>
            <div className="mt-3 grid grid-cols-[1fr_auto_auto_auto] items-center gap-x-2 text-[8.5px] uppercase tracking-wide text-slate-400">
              <span>Hotel Name</span><span>Rooms</span><span>Status</span><span>Actions</span>
            </div>
            <div className="mt-1 flex flex-col">
              {HOTELS.map((h) => (
                <div key={h.n} className="grid grid-cols-[1fr_auto_auto_auto] items-center gap-x-2 border-t border-slate-100 py-[7px]">
                  <div className="flex items-center gap-2 overflow-hidden">
                    <span className="h-6 w-6 shrink-0 rounded-md bg-gradient-to-br from-slate-200 to-slate-300" />
                    <div className="overflow-hidden leading-tight">
                      <p className="truncate text-[10px] font-semibold text-slate-800">{h.n}</p>
                      <p className="truncate text-[8px] text-slate-400">{h.loc}</p>
                    </div>
                  </div>
                  <span className="text-[10px] text-slate-600">{h.r}</span>
                  <Badge text={h.active ? 'Active' : 'Inactive'} color={h.active ? GREEN : '#94A3B8'} />
                  <div className="flex items-center gap-1.5 text-slate-400">
                    <Pencil className="h-3 w-3" /><Trash2 className="h-3 w-3" />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-auto flex items-center justify-between pt-2 text-[9px] text-slate-400">
              <span>Showing 1 to 5 of 5 results</span>
              <span className="flex items-center gap-1">
                <ChevronLeft className="h-3 w-3" />
                <span className="flex h-4 w-4 items-center justify-center rounded text-[9px] font-semibold text-white" style={{ background: BLUE }}>1</span>
                <ChevronRight className="h-3 w-3" />
              </span>
            </div>
          </div>
        </Card>

        {/* ── LEADS & INQUIRIES (right) ── */}
        <Card style={{ left: 1238, top: 118, width: 262, height: 500 }}>
          <div className="flex h-full flex-col p-3.5">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1 text-[13px] font-bold text-slate-900"><ChevronLeft className="h-3.5 w-3.5" /> Leads &amp; inquiries</span>
              <span className="inline-flex items-center gap-1 rounded-lg px-2 py-1 text-[9px] font-semibold text-white" style={{ background: BLUE }}>
                <Plus className="h-2.5 w-2.5" /> Add New
              </span>
            </div>
            <div className="mt-2.5 flex items-center gap-2">
              <div className="flex flex-1 items-center gap-1.5 rounded-lg border border-slate-200 px-2 py-1.5 text-[9px] text-slate-400">
                <Search className="h-2.5 w-2.5" /> Search leads...
              </div>
              <span className="flex h-6 w-6 items-center justify-center rounded-lg border border-slate-200 text-slate-400"><Filter className="h-3 w-3" /></span>
            </div>
            <div className="mt-2 flex flex-col gap-2">
              {LEADS.map((l) => (
                <div key={l.n} className="rounded-xl border border-slate-100 bg-white p-2.5 shadow-[0_2px_8px_-4px_rgba(15,23,42,0.18)]">
                  <div className="flex items-start justify-between">
                    <span className="text-[11px] font-semibold text-slate-800">{l.n}</span>
                    <Badge text={l.st} color={l.c} />
                  </div>
                  <p className="mt-0.5 text-[9px] text-slate-500">{l.e}</p>
                  <div className="mt-0.5 flex items-center justify-between">
                    <span className="text-[9px] text-slate-500">{l.p}</span>
                    <span className="flex items-center gap-1 text-[8px] text-slate-400">{l.d} <ChevronRight className="h-2.5 w-2.5" /></span>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-auto flex items-center justify-between pt-2 text-[8.5px] text-slate-400">
              <span>Showing 1 to 5 of 25 results</span>
              <span className="flex items-center gap-0.5">
                <ChevronLeft className="h-2.5 w-2.5" />
                <span className="flex h-4 w-4 items-center justify-center rounded text-[8px] font-semibold text-white" style={{ background: BLUE }}>1</span>
                <span>2</span><span>3</span><span>…</span><span>5</span>
                <ChevronRight className="h-2.5 w-2.5" />
              </span>
            </div>
          </div>
        </Card>

        {/* ── MOBILE APP (bottom-left) ── */}
        <Card style={{ left: 118, top: 582, width: 184, height: 432 }} className="!rounded-[26px]">
          <div className="flex h-full flex-col overflow-hidden rounded-[26px] p-3">
            <div className="flex items-center justify-between">
              <span className="text-[13px] font-bold text-slate-900">Reports</span>
            </div>
            <div className="mt-2"><DatePill small /></div>
            <div className="mt-2.5 flex flex-1 flex-col gap-2">
              {KPIS.map((k) => (
                <div key={k.label} className="flex items-center justify-between rounded-xl border border-slate-200 bg-white px-2.5 py-2">
                  <div className="leading-tight">
                    <p className="text-[8px] text-slate-400">{k.label}</p>
                    <p className="text-[13px] font-bold text-slate-900">{k.value}</p>
                    <p className="flex items-center gap-0.5 text-[8px] font-semibold" style={{ color: GREEN }}><TrendingUp className="h-2 w-2" />{k.delta}</p>
                  </div>
                  <span className="flex h-6 w-6 items-center justify-center rounded-lg" style={{ background: `${BLUE}1a`, color: BLUE }}><k.Icon className="h-3 w-3" /></span>
                </div>
              ))}
            </div>
            <div className="mt-2 flex items-center justify-between border-t border-slate-100 pt-2 text-slate-400">
              {[
                { Icon: LayoutDashboard, l: 'Dashboard', a: false },
                { Icon: CalendarDays, l: 'Bookings', a: false },
                { Icon: BarChart3, l: 'Reports', a: true },
                { Icon: MoreHorizontal, l: 'More', a: false },
              ].map(({ Icon, l, a }) => (
                <div key={l} className="flex flex-col items-center gap-0.5" style={a ? { color: BLUE } : undefined}>
                  <Icon className="h-3.5 w-3.5" />
                  <span className="text-[7px]">{l}</span>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* ── REPORTS (bottom-center) ── */}
        <Card style={{ left: 392, top: 632, width: 614, height: 384 }}>
          <div className="flex h-full flex-col p-4">
            <div className="flex items-center justify-between">
              <span className="text-[15px] font-bold text-slate-900">Reports</span>
              <DatePill />
            </div>
            <div className="mt-2.5 flex items-center gap-4 border-b border-slate-100 text-[11px]">
              {['Overview', 'Revenue', 'Bookings', 'Occupancy', 'Guests'].map((t, i) => (
                <span key={t} className={`pb-2 ${i === 0 ? 'border-b-2 font-semibold text-slate-900' : 'text-slate-400'}`} style={i === 0 ? { borderColor: BLUE, color: BLUE } : undefined}>{t}</span>
              ))}
            </div>
            <div className="mt-3 grid flex-1 grid-cols-[1.3fr_1fr] gap-3">
              <div className="rounded-xl border border-slate-200 bg-white p-3">
                <div className="flex items-center justify-between">
                  <span className="text-[12px] font-semibold text-slate-800">Revenue Trend</span>
                  <span className="rounded-md border border-slate-200 px-2 py-0.5 text-[9px] text-slate-500">Daily ▾</span>
                </div>
                <LineChart w={310} h={188} vals={TREND} />
              </div>
              <div className="rounded-xl border border-slate-200 bg-white p-3">
                <span className="text-[12px] font-semibold text-slate-800">Revenue by Hotel</span>
                <div className="mt-3 flex items-center gap-3">
                  <Donut size={104} segs={BY_HOTEL} center="$125,430" sub="Total" />
                  <Legend items={BY_HOTEL} gap="gap-2" />
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};
