import React from 'react';
import {
  LayoutDashboard,
  GitBranch,
  BarChart3,
  Users,
  Settings,
  Zap,
  CheckCircle2,
  Clock,
  Search,
  TrendingUp,
} from 'lucide-react';

// ─────────────────────────────────────────────────────────────────────────────
// AiDashboardMockup — a designed (non-interactive) AI automation dashboard used
// as the preview for products without a public live URL. Dark glassmorphism,
// purple-blue gradients, stat cards, an area chart and a workflow pipeline.
// Fills its parent (absolute inset-0 friendly).
// ─────────────────────────────────────────────────────────────────────────────

const STATS = [
  { label: 'Active Workflows', value: '128', delta: '+12%', Icon: Zap },
  { label: 'Tasks Automated', value: '4,820', delta: '+24%', Icon: GitBranch },
  { label: 'Time Saved', value: '312h', delta: '+18%', Icon: Clock },
  { label: 'Success Rate', value: '99.2%', delta: '+2%', Icon: CheckCircle2 },
];

const NAV = [
  { label: 'Dashboard', Icon: LayoutDashboard, active: true },
  { label: 'Workflows', Icon: GitBranch },
  { label: 'Analytics', Icon: BarChart3 },
  { label: 'Team', Icon: Users },
  { label: 'Settings', Icon: Settings },
];

const RUNS = [
  { name: 'Invoice sync', status: 'Done', pct: 100, tone: 'text-emerald-300' },
  { name: 'Lead routing', status: 'Running', pct: 64, tone: 'text-indigo-300' },
  { name: 'Report digest', status: 'Queued', pct: 18, tone: 'text-white/45' },
];

const PIPELINE = ['Trigger', 'Classify', 'Route', 'Notify', 'Done'];

export const AiDashboardMockup: React.FC = () => (
  <div className="absolute inset-0 overflow-hidden bg-[linear-gradient(150deg,#0a0a16,#0b0820)] text-white">
    {/* ambient glows */}
    <div className="pointer-events-none absolute -top-1/4 right-0 h-1/2 w-1/2 rounded-full bg-indigo-600/20 blur-3xl" />
    <div className="pointer-events-none absolute -bottom-1/4 left-1/4 h-1/2 w-1/2 rounded-full bg-fuchsia-600/15 blur-3xl" />

    <div className="relative flex h-full w-full">
      {/* sidebar */}
      <div className="hidden w-[16%] min-w-[78px] flex-col gap-1 border-r border-white/10 bg-black/30 p-2 sm:flex">
        <div className="mb-1.5 flex items-center gap-1.5">
          <div className="h-4 w-4 rounded-md bg-gradient-to-br from-indigo-400 to-fuchsia-500" />
          <span className="text-[8.5px] font-bold tracking-wide">Flow AI</span>
        </div>
        {NAV.map(({ label, Icon, active }) => (
          <div
            key={label}
            className={`flex items-center gap-1.5 rounded-md px-1.5 py-1 ${
              active ? 'bg-white/[0.08] text-white' : 'text-white/45'
            }`}
          >
            <Icon className="h-2.5 w-2.5" />
            <span className="text-[8px]">{label}</span>
          </div>
        ))}
      </div>

      {/* main */}
      <div className="flex flex-1 flex-col gap-2 p-2.5">
        {/* topbar */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[10px] font-semibold leading-tight">Workflow Dashboard</p>
            <p className="text-[7px] text-white/40">Real-time automation overview</p>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="flex h-4 items-center gap-1 rounded-full border border-white/10 bg-white/[0.04] px-1.5">
              <Search className="h-2 w-2 text-white/40" />
              <span className="text-[6.5px] text-white/35">Search…</span>
            </div>
            <div className="h-4 w-4 rounded-full bg-gradient-to-br from-indigo-400 to-fuchsia-500" />
          </div>
        </div>

        {/* stat cards */}
        <div className="grid grid-cols-4 gap-1.5">
          {STATS.map(({ label, value, delta, Icon }) => (
            <div key={label} className="rounded-lg border border-white/10 bg-white/[0.03] p-1.5">
              <div className="flex items-center justify-between">
                <Icon className="h-2.5 w-2.5 text-indigo-300" />
                <span className="inline-flex items-center gap-0.5 text-[6.5px] font-semibold text-emerald-300">
                  <TrendingUp className="h-2 w-2" />
                  {delta}
                </span>
              </div>
              <p className="mt-1 text-[12px] font-bold leading-none">{value}</p>
              <p className="mt-0.5 truncate text-[6.5px] text-white/40">{label}</p>
            </div>
          ))}
        </div>

        {/* chart + runs */}
        <div className="grid flex-1 grid-cols-3 gap-1.5">
          <div className="col-span-2 flex flex-col rounded-lg border border-white/10 bg-white/[0.03] p-2">
            <div className="flex items-center justify-between">
              <p className="text-[8px] font-semibold text-white/80">Automation Throughput</p>
              <div className="flex items-center gap-1.5 text-[6.5px] text-white/40">
                <span className="inline-flex items-center gap-0.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-indigo-400" /> Runs
                </span>
                <span className="inline-flex items-center gap-0.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-fuchsia-400" /> Saved
                </span>
              </div>
            </div>
            <div className="relative mt-1 flex-1">
              <svg viewBox="0 0 100 40" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
                <defs>
                  <linearGradient id="aiArea" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="rgba(129,140,248,0.45)" />
                    <stop offset="100%" stopColor="rgba(129,140,248,0)" />
                  </linearGradient>
                </defs>
                <path d="M0,30 L16,22 L33,25 L50,14 L66,18 L83,8 L100,12 L100,40 L0,40 Z" fill="url(#aiArea)" />
                <path
                  d="M0,30 L16,22 L33,25 L50,14 L66,18 L83,8 L100,12"
                  fill="none"
                  stroke="#a5b4fc"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M0,34 L16,30 L33,32 L50,26 L66,28 L83,22 L100,24"
                  fill="none"
                  stroke="#e879f9"
                  strokeWidth="1"
                  strokeOpacity="0.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>

          <div className="flex flex-col gap-1 rounded-lg border border-white/10 bg-white/[0.03] p-2">
            <p className="text-[8px] font-semibold text-white/80">Recent Runs</p>
            {RUNS.map((r) => (
              <div key={r.name} className="mt-0.5">
                <div className="flex items-center justify-between">
                  <span className="text-[7px] text-white/70">{r.name}</span>
                  <span className={`text-[6.5px] font-semibold ${r.tone}`}>{r.status}</span>
                </div>
                <div className="mt-0.5 h-1 w-full overflow-hidden rounded-full bg-white/10">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-indigo-400 to-fuchsia-500"
                    style={{ width: `${r.pct}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* workflow pipeline */}
        <div className="flex items-center justify-between rounded-lg border border-white/10 bg-white/[0.03] px-2 py-1.5">
          {PIPELINE.map((node, i) => (
            <React.Fragment key={node}>
              <div className="flex items-center gap-1">
                <span
                  className={`h-2.5 w-2.5 rounded-full ${
                    i === PIPELINE.length - 1
                      ? 'bg-emerald-400'
                      : 'bg-gradient-to-br from-indigo-400 to-fuchsia-500'
                  }`}
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
