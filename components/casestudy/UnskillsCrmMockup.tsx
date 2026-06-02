import React from 'react';
import {
  LayoutDashboard,
  GraduationCap,
  Building2,
  Layers,
  Wallet,
  FileBadge,
  ClipboardList,
  Settings,
  Bell,
  Search,
  Users,
  MapPin,
  TrendingUp,
} from 'lucide-react';

// ─────────────────────────────────────────────────────────────────────────────
// UnskillsCrmMockup — a designed (non-interactive) admin dashboard for the
// UnSkills computer-education franchise CRM. On-brand dark purple theme. Fills
// its parent (absolute inset-0). Illustrative only — no real/sensitive data.
// ─────────────────────────────────────────────────────────────────────────────

const PURPLE = '#a452ff';
const MAGENTA = '#d946ef';
const PINK = '#ff2f86';
const GREEN = '#34d399';
const GOLD = '#fbbf24';
const RED = '#f87171';

const panel = 'rounded-lg border border-white/10 bg-white/[0.03]';

const NAV: { section: string; items: { label: string; Icon: any; badge?: string; active?: boolean }[] }[] = [
  {
    section: 'Academics',
    items: [
      { label: 'Dashboard', Icon: LayoutDashboard, active: true },
      { label: 'Students', Icon: GraduationCap, badge: '1.1k' },
      { label: 'Branches', Icon: Building2, badge: '32' },
      { label: 'Batches', Icon: Layers },
    ],
  },
  {
    section: 'Operations',
    items: [
      { label: 'Fees', Icon: Wallet, badge: '14' },
      { label: 'Exams', Icon: ClipboardList },
      { label: 'Certificates', Icon: FileBadge },
    ],
  },
  { section: 'System', items: [{ label: 'Settings', Icon: Settings }] },
];

const KPIS = [
  { label: 'Total Students', value: '1,150+', delta: '+86 this term', color: PURPLE, Icon: Users },
  { label: 'Active Branches', value: '32', delta: '+3 new', color: MAGENTA, Icon: Building2 },
  { label: 'States Covered', value: '7', delta: 'pan-India', color: '#38bdf8', Icon: MapPin },
  { label: 'Certificates', value: '4,280', delta: '+120 issued', color: GOLD, Icon: FileBadge },
];

const BARS = [
  { m: 'Nov', h: 44 },
  { m: 'Dec', h: 58 },
  { m: 'Jan', h: 50 },
  { m: 'Feb', h: 74 },
  { m: 'Mar', h: 66 },
  { m: 'Apr', h: 95, top: true },
];

const BRANCHES = [
  { name: 'Lucknow', pct: 92 },
  { name: 'Kanpur', pct: 74 },
  { name: 'Noida', pct: 63 },
  { name: 'Jaipur', pct: 48 },
];

const ROWS = [
  { initials: 'RK', name: 'Ravi Kumar', branch: 'Lucknow', course: 'ADCA', status: 'Enrolled', tone: GREEN },
  { initials: 'AS', name: 'Anita Sharma', branch: 'Kanpur', course: 'Tally + GST', status: 'Fees Due', tone: GOLD },
  { initials: 'PM', name: 'Priya Mishra', branch: 'Noida', course: 'Web Dev', status: 'Certified', tone: PURPLE },
  { initials: 'DR', name: 'Deepak Rao', branch: 'Jaipur', course: 'DCA', status: 'Pending', tone: RED },
];

const PIPELINE = ['Enquiry', 'Admission', 'Batch', 'Exam', 'Certificate'];

export const UnskillsCrmMockup: React.FC = () => (
  <div className="absolute inset-0 overflow-hidden bg-[linear-gradient(150deg,#0c0a16,#08070d)] font-sans text-white">
    <div className="pointer-events-none absolute -top-1/4 right-0 h-1/2 w-1/2 rounded-full bg-[#a452ff]/20 blur-3xl" />
    <div className="pointer-events-none absolute -bottom-1/4 left-1/4 h-1/2 w-1/2 rounded-full bg-[#ff2f86]/12 blur-3xl" />

    <div className="relative flex h-full w-full">
      {/* sidebar */}
      <aside className="hidden w-[18%] min-w-[92px] flex-col gap-1 border-r border-white/10 bg-black/30 p-2 sm:flex">
        <div className="mb-1.5 flex items-center gap-1.5">
          <div
            className="flex h-5 w-5 items-center justify-center rounded-md text-[9px] font-bold text-white"
            style={{ background: `linear-gradient(135deg, ${PINK}, ${PURPLE})` }}
          >
            U
          </div>
          <div className="leading-none">
            <p className="text-[8.5px] font-bold">UnSkills</p>
            <p className="text-[6px] text-white/40">Admin · CRM v3</p>
          </div>
        </div>
        {NAV.map((grp) => (
          <div key={grp.section} className="mt-0.5">
            <p className="mb-0.5 px-1 text-[6px] uppercase tracking-[0.18em] text-white/30">{grp.section}</p>
            {grp.items.map(({ label, Icon, badge, active }) => (
              <div
                key={label}
                className={`flex items-center gap-1.5 rounded-md px-1.5 py-[3px] ${active ? 'text-white' : 'text-white/45'}`}
                style={active ? { background: `${PURPLE}26`, boxShadow: `inset 2px 0 0 ${PURPLE}` } : undefined}
              >
                <Icon className="h-2.5 w-2.5" style={{ color: active ? PURPLE : undefined }} />
                <span className="flex-1 text-[7px]">{label}</span>
                {badge && (
                  <span className="rounded-full px-1 text-[5.5px] font-bold" style={{ background: `${MAGENTA}26`, color: '#f0abfc' }}>
                    {badge}
                  </span>
                )}
              </div>
            ))}
          </div>
        ))}
      </aside>

      {/* main */}
      <div className="flex flex-1 flex-col gap-1.5 p-2">
        {/* topbar */}
        <header className="flex items-center justify-between">
          <div className="leading-none">
            <p className="text-[9px] font-bold">Franchise Dashboard</p>
            <p className="text-[6px] text-white/40">Multi-branch overview · 7 states</p>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="flex h-4 items-center gap-1 rounded-full border border-white/10 bg-white/[0.04] px-1.5">
              <Search className="h-2 w-2 text-white/40" />
              <span className="text-[6px] text-white/35">Search students…</span>
            </div>
            <Bell className="h-3 w-3 text-white/55" />
            <div className="flex h-4 w-4 items-center justify-center rounded-full text-[6px] font-bold text-white" style={{ background: `linear-gradient(135deg, ${PINK}, ${PURPLE})` }}>
              AD
            </div>
          </div>
        </header>

        {/* KPIs */}
        <div className="grid grid-cols-4 gap-1.5">
          {KPIS.map((k) => (
            <div key={k.label} className={`${panel} p-1.5`} style={{ borderBottom: `2px solid ${k.color}` }}>
              <div className="flex items-center justify-between">
                <span className="text-[6px] text-white/45">{k.label}</span>
                <k.Icon className="h-2.5 w-2.5" style={{ color: k.color }} />
              </div>
              <p className="mt-0.5 text-[12px] font-bold leading-none">{k.value}</p>
              <span className="mt-1 inline-flex items-center gap-0.5 text-[5.5px] font-semibold" style={{ color: GREEN }}>
                <TrendingUp className="h-1.5 w-1.5" />
                {k.delta}
              </span>
            </div>
          ))}
        </div>

        {/* chart + top branches */}
        <div className="grid min-h-0 flex-1 grid-cols-3 gap-1.5">
          <div className={`${panel} col-span-2 flex flex-col p-2`}>
            <div className="flex items-center justify-between">
              <p className="text-[7.5px] font-semibold text-white/80">Admissions · Monthly</p>
              <span className="rounded-full px-1.5 py-[1px] text-[5.5px] font-bold" style={{ background: `${PURPLE}26`, color: '#d8b4fe' }}>
                ↑ peak this term
              </span>
            </div>
            <div className="mt-1 flex flex-1 items-end gap-1.5 px-0.5">
              {BARS.map((b) => (
                <div key={b.m} className="flex flex-1 flex-col items-center gap-0.5">
                  <div className="flex h-full w-full items-end">
                    <div
                      className="w-full rounded-t-sm"
                      style={{
                        height: `${b.h}%`,
                        background: b.top ? `linear-gradient(180deg, ${MAGENTA}, ${PURPLE})` : `${PURPLE}33`,
                        boxShadow: b.top ? `0 0 10px ${MAGENTA}88` : undefined,
                      }}
                    />
                  </div>
                  <span className="text-[5px] text-white/35">{b.m}</span>
                </div>
              ))}
            </div>
          </div>

          <div className={`${panel} flex flex-col p-2`}>
            <p className="text-[7.5px] font-semibold text-white/80">Top Branches</p>
            <div className="mt-1 flex flex-1 flex-col justify-around">
              {BRANCHES.map((b) => (
                <div key={b.name}>
                  <div className="flex items-center justify-between">
                    <span className="text-[6.5px] text-white/70">{b.name}</span>
                    <span className="text-[6px] text-white/40">{b.pct}%</span>
                  </div>
                  <div className="mt-0.5 h-1 w-full overflow-hidden rounded-full bg-white/10">
                    <div className="h-full rounded-full" style={{ width: `${b.pct}%`, background: `linear-gradient(90deg, ${PURPLE}, ${MAGENTA})` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* recent admissions table */}
        <div className={`${panel} p-2`}>
          <p className="mb-1 text-[7.5px] font-semibold text-white/80">Recent Admissions</p>
          <div className="grid grid-cols-[1.6fr_1fr_1fr_1fr] gap-x-1 text-[5.5px] uppercase tracking-wide text-white/30">
            <span>Student</span>
            <span>Branch</span>
            <span>Course</span>
            <span>Status</span>
          </div>
          <div className="mt-0.5 space-y-0.5">
            {ROWS.map((r) => (
              <div key={r.name} className="grid grid-cols-[1.6fr_1fr_1fr_1fr] items-center gap-x-1">
                <span className="flex items-center gap-1 truncate">
                  <span className="flex h-3 w-3 items-center justify-center rounded-full text-[5px] font-bold text-white" style={{ background: `linear-gradient(135deg, ${PINK}, ${PURPLE})` }}>
                    {r.initials}
                  </span>
                  <span className="truncate text-[6.5px] text-white/80">{r.name}</span>
                </span>
                <span className="text-[6px] text-white/55">{r.branch}</span>
                <span className="text-[6px] text-white/55">{r.course}</span>
                <span className="w-fit rounded-full px-1 py-[1px] text-[5.5px] font-semibold" style={{ background: `${r.tone}22`, color: r.tone }}>
                  {r.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* pipeline */}
        <div className={`${panel} flex items-center justify-between px-2 py-1.5`}>
          {PIPELINE.map((node, i) => (
            <React.Fragment key={node}>
              <div className="flex items-center gap-1">
                <span
                  className="h-2.5 w-2.5 rounded-full"
                  style={{ background: i === PIPELINE.length - 1 ? GREEN : `linear-gradient(135deg, ${PINK}, ${PURPLE})` }}
                />
                <span className="text-[7px] text-white/65">{node}</span>
              </div>
              {i < PIPELINE.length - 1 && <div className="mx-1 h-px flex-1 bg-white/15" />}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  </div>
);
