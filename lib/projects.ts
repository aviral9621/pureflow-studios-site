// ─────────────────────────────────────────────────────────────────────────────
// PROJECTS — Case study data shown in the "Stuff we shipped" section.
//
// This is the single source of truth for the Work section. To connect to a CRM
// or CMS later, replace `PROJECTS` with the result of a fetch (e.g. Supabase,
// Sanity, Notion) and keep the same shape.
//
// Example future integration:
//   import { createClient } from '@supabase/supabase-js';
//   const supabase = createClient(URL, KEY);
//   const { data: PROJECTS } = await supabase.from('projects').select('*');
// ─────────────────────────────────────────────────────────────────────────────

export interface Project {
  year: string;
  category: string;
  client: string;
  title: string;
  description: string;
  tech: string[];
  url: string;
  /** Tailwind gradient classes for the browser mockup background. */
  from: string;
  to: string;
}

export const PROJECTS: Project[] = [
  {
    year: '2026',
    category: 'Custom CRM',
    client: 'Herbal Vantage · Healthcare',
    title: 'A binary MLM system built for scale',
    description:
      'Binary commissions, KYC, Razorpay payouts — all on Supabase. Math that doesn’t break.',
    tech: ['Next.js', 'Supabase', 'Tailwind v4', 'shadcn/ui'],
    url: 'herbalvantage-crm.vercel.app',
    from: 'from-emerald-950/70',
    to: 'to-teal-950/50',
  },
  // NOTE: Quick Hotels now lives in `lib/caseStudies.ts` (structured case-study
  // template) and is merged into this listing by `hooks/useProjects.ts`.
  {
    year: '2025',
    category: 'EdTech',
    client: 'UnSkills · Education',
    title: 'Multi-branch institute management',
    description: '8 branches. One CRM. Zero double-entry.',
    tech: ['Next.js', 'Supabase', 'Cloudflare R2', 'Resend'],
    url: 'unskills-crm.vercel.app',
    from: 'from-red-950/70',
    to: 'to-rose-950/50',
  },
  {
    year: '2025',
    category: 'AgriTech',
    client: 'Laxmi Agro Agency · Agriculture',
    title: 'WhatsApp leads to PDF invoices',
    description: 'WhatsApp lead → GST invoice in 2 taps. CA-ready out the box.',
    tech: ['Next.js', 'Supabase Realtime', 'BotBee', 'Web Push API'],
    url: 'laxmi-agro-crm.vercel.app',
    from: 'from-amber-950/70',
    to: 'to-orange-950/50',
  },
];
