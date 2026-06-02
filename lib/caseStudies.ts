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
  mockup?: 'ai-dashboard' | 'unskills-crm';
};

export interface CaseStudy {
  slug: string;
  /** Extra slugs that should also resolve to this case study (legacy/CMS slugs). */
  matchSlugs?: string[];
  name: string;
  tagline: string;
  category: string;          // hero pill + Work filter tag, e.g. "Hospitality"
  liveUrl: string;           // full URL incl. https://

  /** Optional hero extras: a static image to show in the hero browser frame
   *  (instead of the live/mockup showcase), feature bullets + a custom CTA. */
  hero?: { poster?: string; image?: string; bullets?: string[]; ctaLabel?: string };

  /** How this project appears as a card in the Work listing / homepage. */
  card?: {
    title?: string;
    description?: string;
    year?: string;
    /** Tailwind gradient classes for the placeholder card mockup. */
    from?: string;
    to?: string;
    /** Render a designed mockup as the card preview (no live URL needed). */
    mockup?: 'ai-dashboard' | 'unskills-crm';
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

  /** Optional results row. `icon` is a key resolved by the Outcome section. */
  metrics?: { value: string; label: string; icon?: string }[];

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

  // ── Herbal Vantage — premium herbal e-commerce (live) ──────────────────────
  {
    slug: 'herbal-vantage',
    name: 'Herbal Vantage',
    tagline: 'A premium herbal store experience — luxury wellness commerce, end to end.',
    category: 'Herbal & Wellness',
    liveUrl: 'https://herbal-vantage-website.vercel.app/',

    card: {
      title: 'Premium Herbal Store Experience',
      description:
        'Modern herbal e-commerce with a luxury product showcase, smooth shopping flow, clean UI and a conversion-focused design system.',
      year: '2026',
      from: 'from-emerald-950/70',
      to: 'to-purple-950/50',
    },

    snapshot: {
      client: 'Herbal Vantage',
      industry: 'Herbal & Wellness',
      services: 'Product Design · Web Dev · E-commerce',
      platforms: 'E-commerce Website',
      timeline: '5 weeks',
      stack: 'Next.js · Tailwind · Vercel',
    },

    challenge:
      'Herbal Vantage sells premium wellness and herbal products that live or die on how trustworthy and premium the storefront feels. They needed an online store that looked as refined as the products themselves — a luxury showcase with a fast, frictionless path from browsing to checkout — without the clutter and template feel of typical e-commerce builds.',

    whatWeBuilt: [
      {
        title: 'Luxury Storefront',
        icon: 'globe',
        items: [
          'Editorial product showcase with rich imagery and clean typography',
          'Fast, mobile-first browsing across the full catalogue',
          'Clear product detail pages built to build trust and intent',
          'A cohesive, premium design system applied end to end',
        ],
      },
      {
        title: 'Conversion & Commerce',
        icon: 'dashboard',
        items: [
          'A streamlined, low-friction add-to-cart and checkout flow',
          'Considered layout and CTAs to guide buyers to purchase',
          'Reusable components for quick catalogue and campaign updates',
          'Optimised, globally delivered front end for speed',
        ],
      },
    ],

    techStack: [
      { name: 'Next.js', logo: 'nextjs' },
      { name: 'React', logo: 'react' },
      { name: 'Tailwind CSS', logo: 'tailwind' },
      { name: 'Vercel', logo: 'vercel' },
    ],

    showcase: {
      desktop: { type: 'live', src: 'https://herbal-vantage-website.vercel.app/' },
      mobile: { type: 'live', src: 'https://herbal-vantage-website.vercel.app/' },
    },

    outcome:
      'A storefront that feels as premium as the products — turning browsers into confident buyers.',
    outcomeHighlight: 'confident buyers',

    metrics: [],
    testimonial: null,
  },

  // ── Spectrum Tour & Travels — travel booking website (live) ────────────────
  {
    slug: 'spectrum-tour-travels',
    matchSlugs: ['ai-workflow-system'],
    name: 'Spectrum Tour & Travels',
    tagline: 'A complete travel and tour booking experience — packages, enquiries and trips online.',
    category: 'Travel & Tourism',
    liveUrl: 'https://spectrumtourtravels.com/',

    card: {
      title: 'Travel & Tour Booking Website',
      description:
        'A modern travel website with curated tour packages, destination showcases, a smooth enquiry-to-booking flow and a clean, trust-building design.',
      year: '2026',
      from: 'from-sky-950/70',
      to: 'to-indigo-950/50',
    },

    snapshot: {
      client: 'Spectrum Tour & Travels',
      industry: 'Travel & Tourism',
      services: 'Product Design · Web Dev · SEO',
      platforms: 'Website',
      timeline: '4 weeks',
      stack: 'Responsive Web · SEO',
    },

    challenge:
      'Spectrum Tour & Travels needed an online presence that turns browsers into enquiries — a fast, trustworthy website that showcases destinations and tour packages clearly and makes it effortless for travellers to reach out and book.',

    whatWeBuilt: [
      {
        title: 'Travel Storefront',
        icon: 'globe',
        items: [
          'Destination and tour-package showcase with rich imagery',
          'Clear package detail pages built to inspire and inform',
          'Fast, mobile-first browsing across every trip',
          'A clean, trust-building design with strong calls to action',
        ],
      },
      {
        title: 'Enquiries & Reach',
        icon: 'dashboard',
        items: [
          'A smooth enquiry-to-booking flow for travellers',
          'Quick contact and WhatsApp paths to convert interest fast',
          'SEO-ready structure to get found by the right travellers',
          'Reusable sections for easy package and offer updates',
        ],
      },
    ],

    techStack: [
      { name: 'Responsive Web', logo: '' },
      { name: 'SEO', logo: '' },
      { name: 'Tour Packages', logo: '' },
      { name: 'Booking Enquiry', logo: '' },
    ],

    showcase: {
      desktop: { type: 'live', src: 'https://spectrumtourtravels.com/' },
      mobile: { type: 'live', src: 'https://spectrumtourtravels.com/' },
    },

    outcome:
      'A travel site that turns curious visitors into booked trips — clear, fast and trustworthy.',
    outcomeHighlight: 'booked trips',

    metrics: [],
    testimonial: null,
  },

  // ── UnSkills CRM — CRM for educational institutes (designed mockup) ─────────
  {
    slug: 'unskills-computer-education-crm',
    name: 'UnSkills CRM',
    tagline:
      'A complete CRM solution for educational institutes to streamline leads, admissions, fees, and student relationships — all in one place.',
    category: 'CRM Management',
    liveUrl: '',

    hero: {
      image: '/unskill%20crm%20dash.png',
      bullets: [
        'Centralized Lead & Enquiry Management',
        'Admission & Student Management',
        'Fee & Collection Tracking',
        'Task Automation & Follow-ups',
        'Real-time Reports & Analytics',
      ],
      ctaLabel: 'Request a Demo',
    },

    card: {
      title: 'A complete CRM for educational institutes',
      description:
        'Leads, admissions, fees, branches and student relationships — streamlined into one real-time platform with full reports and automation.',
      year: '2025',
      from: 'from-indigo-950/70',
      to: 'to-fuchsia-950/50',
      mockup: 'unskills-crm',
    },

    snapshot: {
      client: 'UnSkills CRM',
      industry: 'Education',
      services: 'CRM Development',
      platforms: 'Web',
      timeline: '12 weeks',
      stack: 'Next.js · Node.js · PostgreSQL · AWS',
    },

    challenge:
      'A multi-branch educational institute was running leads, admissions, fees and student records across spreadsheets, WhatsApp and disconnected tools — with no single view of enquiries, collections or branch performance. They needed one CRM that centralises the whole student lifecycle, automates follow-ups, and gives the head office real-time numbers across every branch.',

    whatWeBuilt: [
      {
        title: 'Leads, Admissions & Students',
        icon: 'dashboard',
        items: [
          'Centralized lead & enquiry capture with status pipelines',
          'Admission and student management across all branches',
          'Task automation and follow-up reminders for staff',
          'Role-based access and per-branch wallets & approvals',
        ],
      },
      {
        title: 'Fees, Reports & Automation',
        icon: 'globe',
        items: [
          'Fee, due, overdue and collection tracking in real time',
          'Revenue, profit, expenses and discount analytics',
          'Trial-class and conversion tracking, end to end',
          'A live head-office dashboard across every branch',
        ],
      },
    ],

    techStack: [
      { name: 'Next.js', logo: 'nextjs' },
      { name: 'Node.js', logo: '' },
      { name: 'PostgreSQL', logo: '' },
      { name: 'AWS', logo: '' },
    ],

    showcase: {
      desktop: { type: 'mockup', src: 'https://crm.unskills.app', mockup: 'unskills-crm' },
      mobile: { type: 'mockup', src: 'https://crm.unskills.app', mockup: 'unskills-crm' },
    },

    outcome:
      'One CRM streamlines leads, admissions, fees and students — with real-time numbers across every branch.',
    outcomeHighlight: 'real-time numbers',

    metrics: [
      { value: '+42%', label: 'More Admissions Converted', icon: 'up' },
      { value: '+35%', label: 'Faster Fee Collection', icon: 'wallet' },
      { value: '+28%', label: 'Revenue Growth', icon: 'rupee' },
      { value: '−60%', label: 'Manual Data Entry', icon: 'clock' },
    ],
    testimonial: {
      quote:
        'PureFlow gave us one place to run every branch — leads, admissions and fees finally live in a single system, and our team stopped drowning in spreadsheets.',
      name: 'UnSkills Leadership',
      role: 'Computer Education Institute',
    },
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
