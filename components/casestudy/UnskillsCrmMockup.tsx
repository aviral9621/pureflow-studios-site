import React from 'react';
import {
  LayoutDashboard,
  Building2,
  Users,
  MessageSquare,
  MessageCircle,
  GraduationCap,
  BookOpen,
  Layers,
  FileText,
  PlaySquare,
  Settings,
  UserCircle,
  LogOut,
  Search,
  Bell,
  ChevronDown,
  TrendingDown,
  TrendingUp,
  Wallet,
  AlertTriangle,
  GraduationCap as Cap,
} from 'lucide-react';

// ─────────────────────────────────────────────────────────────────────────────
// UnskillsCrmMockup — a designed (non-interactive) light-theme admin dashboard
// for the UnSkills CRM (modelled on the real product). Fills its parent
// (absolute inset-0). Illustrative only — no real/sensitive data.
// ─────────────────────────────────────────────────────────────────────────────

const PURPLE = '#7c3aed';

const NAV: { section?: string; items: { label: string; Icon: any; caret?: boolean; active?: boolean; danger?: boolean }[] }[] = [
  {
    section: 'Main',
    items: [
      { label: 'Dashboard', Icon: LayoutDashboard, active: true },
      { label: 'Branches', Icon: Building2, caret: true },
      { label: 'Users', Icon: Users },
      { label: 'Leads', Icon: MessageSquare, caret: true },
      { label: 'WhatsApp', Icon: MessageCircle, caret: true },
    ],
  },
  {
    section: 'Academics',
    items: [
      { label: 'Students', Icon: GraduationCap, caret: true },
      { label: 'Courses', Icon: BookOpen, caret: true },
      { label: 'Batches', Icon: Layers, caret: true },
      { label: 'Study Material', Icon: FileText, caret: true },
    ],
  },
  {
    items: [
      { label: 'Module Tutorials', Icon: PlaySquare },
      { label: 'Settings', Icon: Settings },
      { label: 'Profile', Icon: UserCircle },
      { label: 'Logout', Icon: LogOut, danger: true },
    ],
  },
];

const KPIS = [
  { label: 'Total Students', value: '1,320', tone: '#7c3aed', Icon: GraduationCap },
  { label: 'New Admissions', value: '68', delta: '12% vs last month', down: true, tone: '#2563eb', Icon: Users },
  { label: 'Active Students', value: '1,285', tone: '#16a34a', Icon: Users },
  { label: 'Completed Students', value: '345', tone: '#7c3aed', Icon: Cap },
  { label: 'Total Revenue', value: '₹42,80,550', tone: '#16a34a', Icon: Wallet },
  { label: 'Pending Fees', value: '₹8,76,200', tone: '#d97706', Icon: AlertTriangle },
  { label: "Today's Collection", value: '₹1,42,600', tone: '#2563eb', Icon: Wallet },
  { label: 'Expenses', value: '₹52,450', tone: '#dc2626', Icon: Wallet },
  { label: 'Profit', value: '₹34,04,350', delta: 'healthy', tone: '#16a34a', Icon: TrendingUp },
  { label: 'Discount Given', value: '₹2,45,300', tone: '#7c3aed', Icon: Wallet },
  { label: 'Dropped Students', value: '22', tone: '#dc2626', Icon: Users },
  { label: 'Dropped Pending', value: '₹1,12,400', tone: '#d97706', Icon: Wallet },
];

const FEES = [
  { label: "Today's Collection", value: '₹1,42,600', bg: '#ecfdf5', fg: '#16a34a' },
  { label: "Today's Due", value: '₹1,85,600', bg: '#eff6ff', fg: '#2563eb' },
  { label: 'Overdue Fees', value: '₹8,76,200', bg: '#fef2f2', fg: '#dc2626' },
  { label: 'Total Pending', value: '₹10,61,800', bg: '#fffbeb', fg: '#d97706' },
];

export const UnskillsCrmMockup: React.FC = () => (
  <div className="absolute inset-0 overflow-hidden bg-[#eef1f6] font-sans text-gray-900">
    <div className="flex h-full w-full">
      {/* sidebar */}
      <aside className="hidden w-[19%] min-w-[100px] flex-col gap-0.5 overflow-hidden border-r border-gray-200 bg-white p-2 sm:flex">
        <div className="mb-1.5 flex items-center gap-1.5">
          <div className="flex h-5 w-5 items-center justify-center rounded-md bg-gray-900 text-[8px] font-bold text-white">Un</div>
          <span className="text-[9px] font-bold">UnSkills CRM</span>
        </div>
        {NAV.map((grp, gi) => (
          <div key={gi} className="mt-0.5">
            {grp.section && <p className="mb-0.5 px-1 text-[6px] font-semibold uppercase tracking-[0.16em] text-gray-400">{grp.section}</p>}
            {grp.items.map(({ label, Icon, caret, active, danger }) => (
              <div
                key={label}
                className="flex items-center gap-1.5 rounded-md px-1.5 py-[3px]"
                style={
                  active
                    ? { background: '#f3e8ff', color: PURPLE }
                    : danger
                      ? { color: '#dc2626' }
                      : { color: '#4b5563' }
                }
              >
                <Icon className="h-2.5 w-2.5" />
                <span className="flex-1 text-[7px] font-medium">{label}</span>
                {caret && <ChevronDown className="h-2 w-2 text-gray-300" />}
              </div>
            ))}
          </div>
        ))}
      </aside>

      {/* main */}
      <div className="flex flex-1 flex-col justify-between gap-1.5 overflow-hidden p-2">
        {/* topbar */}
        <header className="flex items-center justify-between">
          <div className="leading-none">
            <p className="text-[10px] font-bold">Dashboard</p>
            <p className="text-[6.5px] text-gray-400">Welcome back! Here's your institute overview</p>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="flex h-4 items-center gap-1 rounded-md border border-gray-200 bg-white px-1.5 text-[6px] text-gray-500">
              <Search className="h-2 w-2" /> Search…
            </div>
            <div className="flex h-4 items-center gap-1 rounded-md border border-gray-200 bg-white px-1.5 text-[6px] text-gray-600">
              This Month <ChevronDown className="h-2 w-2" />
            </div>
            <div className="relative">
              <Bell className="h-3 w-3 text-gray-500" />
              <span className="absolute -right-1 -top-1 flex h-2.5 w-2.5 items-center justify-center rounded-full bg-[#7c3aed] text-[5px] font-bold text-white">12</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="h-4 w-4 rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500" />
              <div className="hidden leading-none lg:block">
                <p className="text-[6.5px] font-semibold">Super Admin</p>
                <p className="text-[5.5px] text-gray-400">Super Admin</p>
              </div>
            </div>
          </div>
        </header>

        {/* KPI grid */}
        <div className="grid grid-cols-4 gap-1.5">
          {KPIS.map((k) => (
            <div key={k.label} className="rounded-lg border border-gray-200 bg-white p-1.5">
              <div className="flex items-start justify-between">
                <span className="text-[6px] text-gray-400">{k.label}</span>
                <span className="flex h-3 w-3 items-center justify-center rounded-md" style={{ background: `${k.tone}1a`, color: k.tone }}>
                  <k.Icon className="h-2 w-2" />
                </span>
              </div>
              <p className="mt-0.5 text-[10px] font-bold leading-none">{k.value}</p>
              {k.delta && (
                <span className="mt-0.5 inline-flex items-center gap-0.5 text-[5.5px] font-semibold" style={{ color: k.down ? '#dc2626' : '#16a34a' }}>
                  {k.down ? <TrendingDown className="h-1.5 w-1.5" /> : <TrendingUp className="h-1.5 w-1.5" />}
                  {k.delta}
                </span>
              )}
            </div>
          ))}
        </div>

        {/* banners */}
        <div className="flex items-center justify-between rounded-lg border border-emerald-200 bg-emerald-50 px-2 py-1.5">
          <div className="flex items-center gap-1.5">
            <Wallet className="h-3 w-3 text-emerald-600" />
            <div className="leading-tight">
              <p className="text-[7px] font-semibold text-emerald-800">Pending Wallet Recharge Requests</p>
              <p className="text-[6px] text-emerald-700/80">4 branches waiting on approval — total ₹3,300. Approving credits the branch wallet automatically.</p>
            </div>
          </div>
          <span className="rounded-md bg-emerald-600 px-1.5 py-0.5 text-[6px] font-semibold text-white">Review →</span>
        </div>
        <div className="flex items-center justify-between rounded-lg border border-violet-200 bg-violet-50 px-2 py-1.5">
          <div className="flex items-center gap-1.5">
            <Cap className="h-3 w-3 text-violet-600" />
            <div className="leading-tight">
              <p className="text-[7px] font-semibold text-violet-800">Trial Classes Ended</p>
              <p className="text-[6px] text-violet-700/80">8 trial students completed their demo period. Convert to a full student or mark them as gone.</p>
            </div>
          </div>
          <span className="rounded-md bg-violet-600 px-1.5 py-0.5 text-[6px] font-semibold text-white">Review →</span>
        </div>

        {/* fee management */}
        <div>
          <p className="mb-1 text-[6px] font-semibold uppercase tracking-[0.16em] text-gray-400">Fee Management</p>
          <div className="grid grid-cols-4 gap-1.5">
            {FEES.map((f) => (
              <div key={f.label} className="rounded-lg border p-1.5" style={{ background: f.bg, borderColor: `${f.fg}33` }}>
                <span className="text-[6px] font-medium" style={{ color: f.fg }}>{f.label}</span>
                <p className="mt-0.5 text-[10px] font-bold" style={{ color: f.fg }}>{f.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
);
