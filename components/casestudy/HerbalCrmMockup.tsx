import React from 'react';
import {
  LayoutDashboard,
  Users,
  Ticket,
  Package,
  Coins,
  CreditCard,
  FileText,
  ShieldCheck,
  BarChart3,
  Settings,
  Bell,
  Search,
  IndianRupee,
  TrendingUp,
  TrendingDown,
} from 'lucide-react';

// ─────────────────────────────────────────────────────────────────────────────
// HerbalCrmMockup — a designed (non-interactive) herbal CRM / binary-MLM admin
// dashboard. Dark green-gold Ayurvedic theme. Fills its parent (absolute
// inset-0). No real credentials or sensitive data — purely illustrative.
// ─────────────────────────────────────────────────────────────────────────────

const GREEN = '#86bf54';
const GOLD = '#d4a843';
const TEAL = '#3fb6a8';
const PURPLE = '#a78bfa';
const RED = '#e06a6a';

const panel = 'rounded-lg border border-[#86bf54]/10 bg-[#0e1109]';

const NAV: { section: string; items: { label: string; Icon: any; badge?: string; active?: boolean }[] }[] = [
  {
    section: 'Main',
    items: [
      { label: 'Dashboard', Icon: LayoutDashboard, active: true },
      { label: 'Members', Icon: Users, badge: '248' },
      { label: 'E-Pins', Icon: Ticket },
      { label: 'Packages', Icon: Package },
    ],
  },
  {
    section: 'Finance',
    items: [
      { label: 'Commissions', Icon: Coins },
      { label: 'Payments', Icon: CreditCard, badge: '7' },
      { label: 'Invoices', Icon: FileText },
    ],
  },
  {
    section: 'Control',
    items: [
      { label: 'KYC', Icon: ShieldCheck, badge: '12' },
      { label: 'Reports', Icon: BarChart3 },
      { label: 'Settings', Icon: Settings },
    ],
  },
];

const KPIS = [
  { label: 'Total Members', value: '2,481', delta: '14.2% this week', up: true, color: GREEN, Icon: Users },
  { label: 'Revenue', value: '₹8.4L', delta: '22.7% vs last', up: true, color: GOLD, Icon: IndianRupee },
  { label: 'Active E-Pins', value: '346', delta: '31 issued today', up: true, color: TEAL, Icon: Ticket },
  { label: 'KYC Pending', value: '12', delta: '4 new requests', up: false, color: PURPLE, Icon: ShieldCheck },
];

const BARS = [
  { w: 'W18', h: 42 },
  { w: 'W19', h: 56 },
  { w: 'W20', h: 48 },
  { w: 'W21', h: 72 },
  { w: 'W22', h: 63 },
  { w: 'W23', h: 96, top: true },
];

const GRANDKIDS = [
  { id: 'M1', name: 'Ravi K.' },
  { id: 'M2', name: 'Anita S.' },
  { id: 'M3', name: 'Deepak R.' },
  { id: 'M4', name: 'Priya M.' },
];

const MEMBERS = [
  { initials: 'RK', name: 'Ravi Kumar', pack: 'Gold', pv: '480', status: 'Active', tone: GREEN },
  { initials: 'AS', name: 'Anita S.', pack: 'Silver', pv: '240', status: 'KYC', tone: GOLD },
  { initials: 'PM', name: 'Priya M.', pack: 'Platinum', pv: '960', status: 'Active', tone: GREEN },
  { initials: 'DR', name: 'Deepak R.', pack: 'Gold', pv: '480', status: 'Pending', tone: RED },
];

const ACTIVITY = [
  { text: 'Ravi Kumar joined via E-Pin HV-3041', time: '2m ago', color: GREEN },
  { text: 'Commission ₹4,800 released to Anita S.', time: '11m ago', color: GOLD },
  { text: 'Priya M. KYC documents approved', time: '28m ago', color: TEAL },
  { text: 'Platinum pack activated — Deepak R.', time: '1h ago', color: PURPLE },
];

const Node: React.FC<{ label: string; sub: string; tone?: string; root?: boolean }> = ({ label, sub, tone, root }) => (
  <div
    className="flex flex-col items-center justify-center rounded-md px-1.5 py-1 text-center"
    style={{
      background: root
        ? `linear-gradient(135deg, ${GREEN}, ${GOLD})`
        : `${tone ?? GREEN}1f`,
      border: `1px solid ${tone ?? GREEN}55`,
      color: root ? '#0c0f0a' : '#e9f4dd',
    }}
  >
    <span className="text-[7px] font-bold leading-none">{label}</span>
    <span className="text-[6px] leading-none opacity-80">{sub}</span>
  </div>
);

export const HerbalCrmMockup: React.FC = () => (
  <div className="absolute inset-0 overflow-hidden bg-[#111408] font-sans text-white">
    <div className="flex h-full w-full">
      {/* sidebar */}
      <aside className="hidden w-[18%] min-w-[92px] flex-col gap-1 border-r border-[#86bf54]/12 bg-[#0e1109] p-2 sm:flex">
        <div className="mb-1 flex items-center gap-1.5">
          <div
            className="flex h-5 w-5 items-center justify-center rounded-md text-[8px] font-bold text-[#0c0f0a]"
            style={{ background: `linear-gradient(135deg, ${GREEN}, ${GOLD})` }}
          >
            HV
          </div>
          <div className="leading-none">
            <p className="text-[8px] font-bold">Herbal Vantage</p>
            <p className="text-[6px] text-white/40">Admin Portal · CRM v2.1</p>
          </div>
        </div>
        {NAV.map((grp) => (
          <div key={grp.section} className="mt-0.5">
            <p className="mb-0.5 px-1 text-[6px] uppercase tracking-[0.18em] text-white/30">{grp.section}</p>
            {grp.items.map(({ label, Icon, badge, active }) => (
              <div
                key={label}
                className={`flex items-center gap-1.5 rounded-md px-1.5 py-[3px] ${
                  active ? 'text-white' : 'text-white/50'
                }`}
                style={active ? { background: `${GREEN}22`, boxShadow: `inset 2px 0 0 ${GREEN}` } : undefined}
              >
                <Icon className="h-2.5 w-2.5" style={{ color: active ? GREEN : undefined }} />
                <span className="flex-1 text-[7px]">{label}</span>
                {badge && (
                  <span
                    className="rounded-full px-1 text-[5.5px] font-bold"
                    style={{ background: `${GOLD}26`, color: GOLD }}
                  >
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
            <p className="text-[9px] font-bold">Dashboard</p>
            <p className="text-[6px] text-white/40">Operations overview</p>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="flex h-4 items-center gap-1 rounded-full border border-[#86bf54]/15 bg-[#0e1109] px-1.5">
              <Search className="h-2 w-2 text-white/40" />
              <span className="text-[6px] text-white/35">Search members…</span>
            </div>
            <div className="relative">
              <Bell className="h-3 w-3 text-white/55" />
              <span className="absolute -right-0.5 -top-0.5 h-1.5 w-1.5 rounded-full" style={{ background: GOLD }} />
            </div>
            <div
              className="flex h-4 w-4 items-center justify-center rounded-full text-[6px] font-bold text-[#0c0f0a]"
              style={{ background: `linear-gradient(135deg, ${GREEN}, ${GOLD})` }}
            >
              AD
            </div>
          </div>
        </header>

        {/* KPI row */}
        <div className="grid grid-cols-4 gap-1.5">
          {KPIS.map((k) => (
            <div key={k.label} className={`${panel} p-1.5`} style={{ borderBottom: `2px solid ${k.color}` }}>
              <div className="flex items-center justify-between">
                <span className="text-[6px] text-white/45">{k.label}</span>
                <k.Icon className="h-2.5 w-2.5" style={{ color: k.color }} />
              </div>
              <p className="mt-0.5 text-[12px] font-bold leading-none">{k.value}</p>
              <span
                className="mt-1 inline-flex items-center gap-0.5 text-[5.5px] font-semibold"
                style={{ color: k.up ? GREEN : PURPLE }}
              >
                {k.up ? <TrendingUp className="h-1.5 w-1.5" /> : <TrendingDown className="h-1.5 w-1.5" />}
                {k.delta}
              </span>
            </div>
          ))}
        </div>

        {/* middle row */}
        <div className="grid min-h-0 flex-1 grid-cols-3 gap-1.5">
          {/* bar chart */}
          <div className={`${panel} col-span-2 flex flex-col p-2`}>
            <div className="flex items-center justify-between">
              <p className="text-[7.5px] font-semibold text-white/80">Commission Payouts · Weekly</p>
              <span className="rounded-full px-1.5 py-[1px] text-[5.5px] font-bold" style={{ background: `${GREEN}22`, color: GREEN }}>
                ↑ ₹2.1L cycle
              </span>
            </div>
            <div className="mt-1 flex flex-1 items-end gap-1.5 px-0.5">
              {BARS.map((b) => (
                <div key={b.w} className="flex flex-1 flex-col items-center gap-0.5">
                  <div className="flex h-full w-full items-end">
                    <div
                      className="w-full rounded-t-sm"
                      style={{
                        height: `${b.h}%`,
                        background: b.top
                          ? `linear-gradient(180deg, ${GREEN}, ${GREEN}66)`
                          : `${GREEN}33`,
                        boxShadow: b.top ? `0 0 10px ${GREEN}88` : undefined,
                      }}
                    />
                  </div>
                  <span className="text-[5px] text-white/35">{b.w}</span>
                </div>
              ))}
            </div>
          </div>

          {/* binary tree */}
          <div className={`${panel} flex flex-col p-2`}>
            <p className="text-[7.5px] font-semibold text-white/80">Binary Tree · Top Node</p>
            <div className="flex flex-1 flex-col items-center justify-center gap-1">
              <Node label="HV" sub="3,840 PV" root />
              <div className="h-1 w-px bg-[#86bf54]/30" />
              <div className="flex w-full justify-around">
                <Node label="L" sub="1,920 PV" tone={GREEN} />
                <Node label="R" sub="1,920 PV" tone={GOLD} />
              </div>
              <div className="h-1 w-px bg-[#86bf54]/30" />
              <div className="grid w-full grid-cols-4 gap-0.5">
                {GRANDKIDS.map((g) => (
                  <div key={g.id} className="flex flex-col items-center">
                    <div
                      className="flex h-3.5 w-3.5 items-center justify-center rounded-full text-[5.5px] font-bold"
                      style={{ background: `${GREEN}26`, border: `1px solid ${GREEN}55`, color: '#e9f4dd' }}
                    >
                      {g.id}
                    </div>
                    <span className="mt-0.5 text-[5px] text-white/45">{g.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* bottom row */}
        <div className="grid min-h-0 flex-1 grid-cols-2 gap-1.5">
          {/* members table */}
          <div className={`${panel} flex flex-col p-2`}>
            <p className="mb-1 text-[7.5px] font-semibold text-white/80">Recent Members</p>
            <div className="grid grid-cols-[1.6fr_1fr_0.7fr_1fr] gap-x-1 text-[5.5px] uppercase tracking-wide text-white/30">
              <span>Member</span>
              <span>Package</span>
              <span>PV</span>
              <span>Status</span>
            </div>
            <div className="mt-0.5 flex flex-1 flex-col justify-around">
              {MEMBERS.map((m) => (
                <div key={m.name} className="grid grid-cols-[1.6fr_1fr_0.7fr_1fr] items-center gap-x-1">
                  <span className="flex items-center gap-1 truncate">
                    <span
                      className="flex h-3 w-3 items-center justify-center rounded-full text-[5px] font-bold text-[#0c0f0a]"
                      style={{ background: `linear-gradient(135deg, ${GREEN}, ${GOLD})` }}
                    >
                      {m.initials}
                    </span>
                    <span className="truncate text-[6.5px] text-white/80">{m.name}</span>
                  </span>
                  <span className="text-[6px] text-white/55">{m.pack}</span>
                  <span className="text-[6px] text-white/55">{m.pv}</span>
                  <span
                    className="w-fit rounded-full px-1 py-[1px] text-[5.5px] font-semibold"
                    style={{ background: `${m.tone}22`, color: m.tone }}
                  >
                    {m.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* activity feed */}
          <div className={`${panel} flex flex-col p-2`}>
            <p className="mb-1 flex items-center gap-1 text-[7.5px] font-semibold text-white/80">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full" style={{ background: GREEN }} />
              Live Activity
            </p>
            <div className="flex flex-1 flex-col justify-around">
              {ACTIVITY.map((a) => (
                <div key={a.text} className="flex items-start gap-1">
                  <span className="mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: a.color }} />
                  <div className="leading-tight">
                    <p className="text-[6px] text-white/70">{a.text}</p>
                    <p className="text-[5px] text-white/35">{a.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
