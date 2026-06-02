import React from 'react';
import { LayoutDashboard, GraduationCap, Wallet, ClipboardList, Bell } from 'lucide-react';

// Compact light-theme mobile view of the UnSkills CRM, for the phone frame in
// the Visual Showcase collage. Fills its parent (absolute inset-0).

const PURPLE = '#7c3aed';

const TILES = [
  { label: 'Students', value: '1,320', tone: '#7c3aed' },
  { label: 'Revenue', value: '₹42.8L', tone: '#16a34a' },
  { label: 'Pending', value: '₹8.7L', tone: '#d97706' },
  { label: 'Today', value: '₹1.4L', tone: '#2563eb' },
];

const ROWS = [
  { initials: 'RK', name: 'Ravi Kumar', meta: 'Lucknow · ADCA', tone: '#16a34a' },
  { initials: 'AS', name: 'Anita Sharma', meta: 'Kanpur · Tally', tone: '#d97706' },
  { initials: 'PM', name: 'Priya Mishra', meta: 'Noida · Web Dev', tone: '#7c3aed' },
];

const BARS = [40, 58, 50, 74, 66, 92];

export const UnskillsMobileMockup: React.FC = () => (
  <div className="absolute inset-0 flex flex-col bg-[#f4f5f8] font-sans text-gray-900">
    {/* status bar */}
    <div className="flex items-center justify-between px-3 pt-3 text-[6px] font-medium text-gray-500">
      <span>9:41</span>
      <span className="flex items-center gap-1 font-bold text-gray-800">
        <span className="flex h-3 w-3 items-center justify-center rounded-[4px] text-[6px] font-bold text-white" style={{ background: PURPLE }}>U</span>
        UnSkills
      </span>
      <Bell className="h-2.5 w-2.5" />
    </div>

    {/* heading */}
    <div className="px-3 pt-2">
      <p className="text-[11px] font-bold leading-none">Dashboard</p>
      <p className="text-[6.5px] text-gray-400">Institute overview</p>
    </div>

    {/* stat tiles */}
    <div className="mt-2 grid grid-cols-2 gap-1.5 px-3">
      {TILES.map((t) => (
        <div key={t.label} className="rounded-lg border border-gray-200 bg-white p-1.5" style={{ borderBottom: `2px solid ${t.tone}` }}>
          <span className="text-[6px] text-gray-400">{t.label}</span>
          <p className="text-[11px] font-bold leading-tight">{t.value}</p>
        </div>
      ))}
    </div>

    {/* chart */}
    <div className="mx-3 mt-2 rounded-lg border border-gray-200 bg-white p-2">
      <p className="text-[7px] font-semibold text-gray-700">Admissions</p>
      <div className="mt-1 flex h-8 items-end gap-1">
        {BARS.map((h, i) => (
          <div key={i} className="flex-1 rounded-t-sm" style={{ height: `${h}%`, background: i === BARS.length - 1 ? PURPLE : `${PURPLE}33` }} />
        ))}
      </div>
    </div>

    {/* recent */}
    <div className="mx-3 mt-2 flex-1 overflow-hidden rounded-lg border border-gray-200 bg-white p-2">
      <p className="mb-1 text-[7px] font-semibold text-gray-700">Recent Admissions</p>
      <div className="space-y-1">
        {ROWS.map((r) => (
          <div key={r.name} className="flex items-center gap-1.5">
            <span className="flex h-4 w-4 items-center justify-center rounded-full text-[6px] font-bold text-white" style={{ background: r.tone }}>
              {r.initials}
            </span>
            <div className="leading-none">
              <p className="text-[7px] font-medium">{r.name}</p>
              <p className="text-[5.5px] text-gray-400">{r.meta}</p>
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* bottom nav */}
    <div className="mt-2 flex items-center justify-around border-t border-gray-200 bg-white py-1.5">
      {[LayoutDashboard, GraduationCap, Wallet, ClipboardList].map((Icon, i) => (
        <Icon key={i} className="h-3 w-3" style={{ color: i === 0 ? PURPLE : '#9ca3af' }} />
      ))}
    </div>
  </div>
);
