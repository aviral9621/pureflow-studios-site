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
  /** 'live' embeds the real site in an iframe; 'video'/'image' are fallbacks. */
  type: 'live' | 'video' | 'image';
  /** Live URL, video file, or image path. */
  src: string;
  /** Optional poster screenshot shown before a live/video embed loads. */
  poster?: string;
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
