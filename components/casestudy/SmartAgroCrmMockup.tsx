import React from 'react';
import {
  LayoutDashboard,
  UserPlus,
  Users,
  Package,
  Warehouse,
  FileText,
  ShoppingCart,
  Truck,
  ClipboardList,
  Building2,
  Bell,
  IndianRupee,
  ShoppingBag,
  Boxes,
  TrendingUp,
} from 'lucide-react';

// ─────────────────────────────────────────────────────────────────────────────
// SmartAgroCrmMockup — a designed (non-interactive) forest-green business CRM
// dashboard ("Smart Agro · Laxmi Agro CRM"). Fills its parent (absolute inset-0).
// Illustrative only — no real/sensitive data.
// ─────────────────────────────────────────────────────────────────────────────

const GREEN = '#16a34a';
const BRIGHT = '#22c55e';
const DARK = '#14532d';

const NAV: { section?: string; items: { label: string; Icon: any; active?: boolean }[] }[] = [
  { items: [{ label: 'Dashboard', Icon: LayoutDashboard, active: true }] },
  { section: 'Sales & CRM', items: [{ label: 'Leads', Icon: UserPlus }, { label: 'Customers', Icon: Users }] },
  {
    section: 'Operations',
    items: [
      { label: 'Products', Icon: Package },
      { label: 'Inventory', Icon: Warehouse },
      { label: 'Quotations', Icon: FileText },
      { label: 'Orders', Icon: ShoppingCart },
      { label: 'Dispatch', Icon: Truck },
    ],
  },
  { section: 'Procurement', items: [{ label: 'Purchase Orders', Icon: ClipboardList }, { label: 'Parties', Icon: Building2 }] },
];

const STATS = [
  { label: 'Total Revenue', value: '₹33,859', delta: '38% vs last 7 days', tone: GREEN, Icon: IndianRupee },
  { label: 'Total Orders', value: '17', delta: '0 today', tone: '#2563eb', Icon: ShoppingBag },
  { label: 'Total Leads', value: '433', delta: '100% vs last 7 days', tone: GREEN, Icon: Users },
  { label: 'Total Products', value: '8', delta: '0 new this month', tone: '#d97706', Icon: Boxes },
];

const SOURCES = [
  { label: 'Instagram', pct: '47%', color: '#ec4899' },
  { label: 'WhatsApp', pct: '26%', color: '#22c55e' },
  { label: 'Facebook', pct: '24%', color: '#3b82f6' },
  { label: 'Manual', pct: '2%', color: '#9ca3af' },
  { label: 'Referral', pct: '1%', color: '#f59e0b' },
];

const DONUT = 'conic-gradient(#ec4899 0 47%, #22c55e 47% 73%, #3b82f6 73% 97%, #9ca3af 97% 99%, #f59e0b 99% 100%)';

export const SmartAgroCrmMockup: React.FC = () => (
  <div className="absolute inset-0 overflow-hidden bg-[#f3f5f8] font-sans text-gray-900">
    <div className="flex h-full w-full">
      {/* sidebar */}
      <aside
        className="hidden w-[20%] min-w-[104px] flex-col gap-0.5 overflow-hidden p-2 text-white sm:flex"
        style={{ background: `linear-gradient(180deg, ${DARK}, ${GREEN})` }}
      >
        <div className="mb-1.5 flex items-center gap-1.5">
          <div className="flex h-5 w-5 items-center justify-center rounded-md bg-white/15 text-[8px] font-bold">SA</div>
          <div className="leading-none">
            <p className="text-[9px] font-bold">Smart Agro</p>
            <p className="text-[5.5px] text-white/55">LAXMI AGRO CRM</p>
          </div>
        </div>
        {NAV.map((grp, gi) => (
          <div key={gi} className="mt-0.5">
            {grp.section && <p className="mb-0.5 px-1 text-[5.5px] font-semibold uppercase tracking-[0.16em] text-white/40">{grp.section}</p>}
            {grp.items.map(({ label, Icon, active }) => (
              <div
                key={label}
                className="flex items-center gap-1.5 rounded-md px-1.5 py-[3px] text-white/75"
                style={active ? { background: BRIGHT, color: '#06281a' } : undefined}
              >
                <Icon className="h-2.5 w-2.5" />
                <span className="flex-1 text-[7px] font-medium">{label}</span>
              </div>
            ))}
          </div>
        ))}
      </aside>

      {/* main */}
      <div className="flex flex-1 flex-col gap-1.5 overflow-hidden p-2">
        {/* topbar */}
        <header className="flex items-center justify-between rounded-lg border border-gray-200 bg-white px-2 py-1.5">
          <div className="leading-tight">
            <p className="text-[10px] font-bold">Good afternoon, Aviral 👋</p>
            <p className="text-[6.5px] text-gray-400">Here's what's happening with your business today.</p>
          </div>
          <div className="flex items-center gap-1.5">
            <Bell className="h-3 w-3 text-gray-400" />
            <div className="flex items-center gap-1">
              <div className="flex h-4 w-4 items-center justify-center rounded-full text-[6px] font-bold text-white" style={{ background: GREEN }}>A</div>
              <div className="hidden leading-none lg:block">
                <p className="text-[6.5px] font-semibold">Aviral</p>
                <p className="text-[5.5px] text-gray-400">Admin</p>
              </div>
            </div>
          </div>
        </header>

        {/* stat cards */}
        <div className="grid grid-cols-4 gap-1.5">
          {STATS.map((s) => (
            <div key={s.label} className="rounded-lg border border-gray-200 bg-white p-1.5">
              <div className="flex items-center gap-1">
                <span className="flex h-3 w-3 items-center justify-center rounded-full" style={{ background: `${s.tone}1a`, color: s.tone }}>
                  <s.Icon className="h-2 w-2" />
                </span>
                <span className="text-[5.5px] uppercase tracking-wide text-gray-400">{s.label}</span>
              </div>
              <p className="mt-0.5 text-[11px] font-bold leading-none">{s.value}</p>
              <span className="mt-0.5 inline-flex items-center gap-0.5 text-[5.5px] font-semibold" style={{ color: s.tone }}>
                <TrendingUp className="h-1.5 w-1.5" /> {s.delta}
              </span>
            </div>
          ))}
        </div>

        {/* charts row */}
        <div className="grid min-h-0 flex-1 grid-cols-[1.5fr_1fr] gap-1.5">
          {/* sales overview */}
          <div className="flex flex-col rounded-lg border border-gray-200 bg-white p-2">
            <div className="flex items-center justify-between">
              <p className="text-[7.5px] font-semibold text-gray-700">Sales Overview</p>
              <span className="rounded border border-gray-200 px-1 py-[1px] text-[5.5px] text-gray-500">Last 7 days</span>
            </div>
            <svg viewBox="0 0 200 70" preserveAspectRatio="none" className="mt-1 h-full w-full">
              <defs>
                <linearGradient id="sa-area" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={BRIGHT} stopOpacity="0.35" />
                  <stop offset="100%" stopColor={BRIGHT} stopOpacity="0" />
                </linearGradient>
              </defs>
              <path d="M0,60 L33,58 L66,57 L100,12 L133,55 L166,58 L200,57 L200,70 L0,70 Z" fill="url(#sa-area)" />
              <path d="M0,60 L33,58 L66,57 L100,12 L133,55 L166,58 L200,57" fill="none" stroke={GREEN} strokeWidth="1.5" />
              <circle cx="100" cy="12" r="2" fill={GREEN} />
            </svg>
            <div className="mt-1 flex items-center justify-between text-[5px] text-gray-400">
              <span>29 May</span><span>31 May</span><span>02 Jun</span><span>04 Jun</span>
            </div>
          </div>

          {/* leads by source */}
          <div className="flex flex-col rounded-lg border border-gray-200 bg-white p-2">
            <p className="text-[7.5px] font-semibold text-gray-700">Leads by Source</p>
            <div className="mt-1 flex flex-1 items-center gap-2">
              <div className="relative h-12 w-12 shrink-0 rounded-full" style={{ background: DONUT }}>
                <div className="absolute inset-[26%] flex flex-col items-center justify-center rounded-full bg-white">
                  <span className="text-[8px] font-bold leading-none">433</span>
                  <span className="text-[4.5px] text-gray-400">Total</span>
                </div>
              </div>
              <div className="flex-1 space-y-[2px]">
                {SOURCES.map((s) => (
                  <div key={s.label} className="flex items-center gap-1 text-[5.5px]">
                    <span className="h-1.5 w-1.5 rounded-full" style={{ background: s.color }} />
                    <span className="flex-1 text-gray-600">{s.label}</span>
                    <span className="font-semibold text-gray-800">{s.pct}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-1 border-t border-gray-100 pt-1 text-[5.5px]">
              <span className="text-gray-400">Top Source </span>
              <span className="font-semibold" style={{ color: GREEN }}>Instagram · 47%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
