// ─────────────────────────────────────────────────────────────────────────────
// CASE STUDIES — structured, config-driven data for the premium project-detail
// template (`components/casestudy/CaseStudyPage.tsx`).
//
// This is the single source of truth for the new Nebula-style case pages. To add
// a project, append ONE `CaseStudy` object — nothing else. The renderer resolves
// `icon` / `logo` string keys to components, so this file stays plain data.
//
// Routing: the Work listing card for a case study uses `slug`; `App.tsx` renders
// the structured page when `getCaseStudyBySlug(slug)` matches (aliases included).
// ─────────────────────────────────────────────────────────────────────────────

export type DeviceShowcase = {
  /**
   * 'live' embeds the real site in an iframe; 'video'/'image' are fallbacks;
   * 'mockup' renders a designed in-app UI component (for products with no
   * public live URL).
   */
  type: 'live' | 'video' | 'image' | 'mockup';
  /** Live URL, video file, image path, or (for mockup) a display URL. */
  src: string;
  /** Optional poster screenshot shown before a live/video embed loads. */
  poster?: string;
  /** For type 'mockup': which designed mockup component to render. */
  mockup?: 'ai-dashboard' | 'herbal-crm';
};

export interface CaseStudy {
  slug: string;
  /** Extra slugs that should also resolve to this case study (legacy/CMS slugs). */
  matchSlugs?: string[];
  name: string;
  tagline: string;
  category: string;          // hero pill + Work filter tag, e.g. "Hospitality"
  liveUrl: string;           // full URL incl. https://

  /** Optional hero poster (decorative laptop). Falls back to a branded gradient. */
  hero?: { poster?: string };

  /** How this project appears as a card in the Work listing / homepage. */
  card?: {
    title?: string;
    description?: string;
    year?: string;
    /** Tailwind gradient classes for the placeholder card mockup. */
    from?: string;
    to?: string;
    /** Render a designed mockup as the card preview (no live URL needed). */
    mockup?: 'ai-dashboard' | 'herbal-crm';
    /** Optional secondary badge shown on the card preview (e.g. "MLM Platform"). */
    badge2?: string;
    /** Render the card's "View case study" CTA in gold. */
    ctaGold?: boolean;
  };

  snapshot: {
    client: string;
    industry: string;
    services: string;
    platforms: string;
    timeline?: string;       // optional — card is dropped if empty
    stack: string;
  };

  challenge: string;

  whatWeBuilt: [
    { title: string; icon: string; items: string[] },
    { title: string; icon: string; items: string[] },
  ];

  techStack: { name: string; logo: string }[];

  showcase: { desktop: DeviceShowcase; mobile: DeviceShowcase };

  /** One short qualitative sentence — no numbers. */
  outcome: string;
  /** Substring of `outcome` to render in the accent colour. */
  outcomeHighlight?: string;

  /** Off by default — never fabricate metrics. */
  metrics?: { value: string; label: string }[];

  testimonial?: { quote: string; name: string; role: string } | null;
}

export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: 'quick-hotels',
    matchSlugs: ['end-to-end-hotel-management'],
    name: 'Quick Hotels',
    tagline:
      'A complete booking-and-management ecosystem for budget-friendly stays across India.',
    category: 'Hospitality',
    liveUrl: 'https://quickhotels.co',

    card: {
      title: 'Booking website + custom PMS on one backend',
      description:
        'All-inclusive pricing, split payments and a back-office that stays in sync — automatically.',
      year: '2026',
      from: 'from-fuchsia-950/70',
      to: 'to-purple-950/50',
    },

    snapshot: {
      client: 'Quick Hotels',
      industry: 'Hospitality',
      services: 'Product Design · Web Dev · Custom PMS',
      platforms: 'Website + PMS',
      timeline: '4 weeks',
      stack: 'Next.js · Supabase · Razorpay',
    },

    challenge:
      'Quick Hotels runs budget-friendly stays across multiple Indian cities — Delhi, Bengaluru, Rishikesh, Noida, Mathura and more. They needed two things most vendors treat as separate projects: a fast, mobile-first website where guests discover and book rooms, and an internal system to manage those rooms, payments and inventory behind the scenes. The hard part was getting both halves to speak to one source of truth — no double-entry, no mismatched availability — while honouring one strict rule: every room price already includes GST, so a guest is never surprised by tax added at checkout.',

    whatWeBuilt: [
      {
        title: 'Guest Website',
        icon: 'globe',
        items: [
          'Search and browse stays across every Quick Hotels city',
          'Transparent, all-inclusive pricing — taxes and fees built in, never added at the end',
          'Flexible split payments — pay 30% now to confirm, settle the rest at check-in',
          'Secure checkout through Razorpay',
        ],
      },
      {
        title: 'Property Management System',
        icon: 'dashboard',
        items: [
          'Manage bookings, rooms and live availability in one place',
          'Track payments and outstanding balances against each reservation',
          'Keep inventory and pricing accurate across every property',
          'Role-based access so the right staff see the right tools',
        ],
      },
    ],

    techStack: [
      { name: 'Next.js', logo: 'nextjs' },
      { name: 'React', logo: 'react' },
      { name: 'Supabase', logo: 'supabase' },
      { name: 'Tailwind CSS', logo: 'tailwind' },
      { name: 'Vercel', logo: 'vercel' },
      { name: 'Razorpay', logo: 'razorpay' },
    ],

    showcase: {
      // Point at the canonical www host so the iframe skips the root → www
      // 307 redirect hop (smoother load). The visible "Open live site" link
      // still uses the short brand URL (liveUrl) above.
      desktop: { type: 'live', src: 'https://www.quickhotels.co/' },
      mobile: { type: 'live', src: 'https://www.quickhotels.co/' },
    },

    outcome:
      'A single connected platform that runs bookings and operations — with zero pricing surprises.',
    outcomeHighlight: 'surprises',

    metrics: [],
    testimonial: null,
  },

  // ── Herbal Vantage — herbal CRM & binary MLM platform (designed mockup) ─────
  {
    slug: 'herbal-vantage',
    name: 'Herbal Vantage CRM',
    tagline:
      'A herbal business CRM + binary MLM platform — inventory, commissions and control in one place.',
    category: 'Herbal CRM & ERP',
    liveUrl: '',

    card: {
      title: 'Herbal Vantage CRM System',
      description:
        'Advanced herbal business management CRM with inventory tracking, analytics dashboard, order management, customer insights and real-time operational control.',
      year: '2026',
      from: 'from-emerald-950/70',
      to: 'to-yellow-900/50',
      mockup: 'herbal-crm',
      badge2: 'MLM Platform',
      ctaGold: true,
    },

    snapshot: {
      client: 'Herbal Vantage',
      industry: 'Herbal & Wellness',
      services: 'Product Design · Web Dev · Custom CRM',
      platforms: 'CRM + Admin Portal',
      timeline: '9 weeks',
      stack: 'Next.js · Supabase · Razorpay',
    },

    challenge:
      'Herbal Vantage runs a fast-growing herbal business on a binary MLM model — members, e-pins, packages, commissions, KYC and inventory all moving at once. Spreadsheets and disconnected tools couldn’t keep the math, payouts and compliance in sync. They needed one CRM that runs the whole operation: members and the binary tree, commission cycles, KYC approvals and live operational control.',

    whatWeBuilt: [
      {
        title: 'CRM & MLM Engine',
        icon: 'dashboard',
        items: [
          'Member management with the full binary tree and PV tracking',
          'E-Pin engine and package activation, end to end',
          'Automated binary commission calculation and payout cycles',
          'KYC workflow with review, approval and status tracking',
        ],
      },
      {
        title: 'Operations & Insight',
        icon: 'globe',
        items: [
          'Real-time dashboard — members, revenue, e-pins and KYC at a glance',
          'Inventory and order management across the catalogue',
          'Payments and invoices tracked against every member',
          'Role-based admin access with a live activity feed',
        ],
      },
    ],

    techStack: [
      { name: 'Next.js 15', logo: 'nextjs' },
      { name: 'Binary MLM', logo: '' },
      { name: 'Supabase', logo: 'supabase' },
      { name: 'KYC System', logo: '' },
      { name: 'E-Pin Engine', logo: '' },
    ],

    showcase: {
      desktop: { type: 'mockup', src: 'https://crm.herbalvantage.app', mockup: 'herbal-crm' },
      mobile: { type: 'mockup', src: 'https://crm.herbalvantage.app', mockup: 'herbal-crm' },
    },

    outcome:
      'One platform runs members, commissions, KYC and inventory — with the math always in sync.',
    outcomeHighlight: 'always in sync',

    metrics: [],
    testimonial: null,
  },

  // ── AI Workflow System — AI automation product (designed mockup) ───────────
  {
    slug: 'ai-workflow-system',
    name: 'AI Workflow System',
    tagline: 'An AI automation platform that turns busywork into self-running workflows.',
    category: 'AI Automation',
    liveUrl: '',

    card: {
      title: 'AI Workflow Management System',
      description:
        'Advanced automation platform with smart analytics, AI workflow tracking, team collaboration tools and a real-time insights dashboard.',
      year: '2026',
      from: 'from-indigo-950/70',
      to: 'to-fuchsia-950/50',
      mockup: 'ai-dashboard',
    },

    snapshot: {
      client: 'PureFlow Labs',
      industry: 'AI Automation',
      services: 'Product Design · Web Dev · AI',
      platforms: 'Web App',
      timeline: '8 weeks',
      stack: 'Next.js · Supabase · AI',
    },

    challenge:
      'Operations teams lose hours to repetitive, manual steps scattered across tools — and have no single view of what is actually running. The goal was an automation platform where workflows run themselves, progress is tracked in real time, and the whole team works from one clear, intelligent dashboard.',

    whatWeBuilt: [
      {
        title: 'Automation Engine',
        icon: 'dashboard',
        items: [
          'Visual, node-based workflow builder for automating multi-step tasks',
          'AI-assisted steps that classify, summarise and route work',
          'Live workflow tracking with status across every run',
          'Triggers and schedules so processes run without babysitting',
        ],
      },
      {
        title: 'Insights & Collaboration',
        icon: 'globe',
        items: [
          'Real-time analytics dashboard with smart, glanceable metrics',
          'Team collaboration, roles and shared workspaces',
          'Trend and performance charts to spot bottlenecks fast',
          'A clean dark glassmorphism interface built for focus',
        ],
      },
    ],

    techStack: [
      { name: 'Next.js', logo: 'nextjs' },
      { name: 'React', logo: 'react' },
      { name: 'Supabase', logo: 'supabase' },
      { name: 'Tailwind CSS', logo: 'tailwind' },
      { name: 'Vercel', logo: 'vercel' },
    ],

    showcase: {
      desktop: { type: 'mockup', src: 'https://app.pureflow.studio', mockup: 'ai-dashboard' },
      mobile: { type: 'mockup', src: 'https://app.pureflow.studio', mockup: 'ai-dashboard' },
    },

    outcome:
      'Repetitive work runs itself — with one intelligent dashboard keeping the whole team in flow.',
    outcomeHighlight: 'in flow',

    metrics: [],
    testimonial: null,
  },
];

// Alias map: canonical slug + any matchSlugs all point at the same case study.
const bySlug = new Map<string, CaseStudy>();
for (const cs of CASE_STUDIES) {
  bySlug.set(cs.slug, cs);
  cs.matchSlugs?.forEach((alias) => bySlug.set(alias, cs));
}

export function getCaseStudyBySlug(slug: string | null | undefined): CaseStudy | null {
  return slug ? bySlug.get(slug) ?? null : null;
}
