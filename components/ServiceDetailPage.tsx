import React from 'react';
import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  Cloud,
  Code2,
  Database,
  Gauge,
  Globe2,
  Megaphone,
  Puzzle,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Users,
} from 'lucide-react';
import { ViewState } from '../types';

interface ServiceDetailPageProps {
  service: Extract<
    ViewState,
    'service-software' | 'service-crm' | 'service-mobile' | 'service-website' | 'service-social' | 'service-ads'
  >;
  onViewChange: (view: ViewState) => void;
  onServicesClick: () => void;
}

const serviceDetails = {
  'service-software': {
    eyebrow: 'Development',
    titleTop: 'Custom software built for your exact',
    accent: 'business logic.',
    description:
      'We build bespoke systems, dashboards, CRMs, ERPs and internal tools that match the way your business actually works. No templates. No WordPress. Just clean, scalable software.',
    leadView: 'get-software-built' as ViewState,
    chips: ['Next.js', 'TypeScript', 'Supabase', 'Tailwind CSS', 'Vercel'],
    deliverables: [
      ['Custom Web Applications', 'Full-stack web apps built with Next.js and Supabase. Scalable, secure and tailored to your workflows.', Code2],
      ['Database & Architecture', 'Robust database design, RLS policies, APIs and scalable architecture that handles growth effortlessly.', Database],
      ['Dashboards & Analytics', 'Real-time dashboards and reports that turn your data into insights you can act on instantly.', BarChart3],
      ['Authentication & Roles', 'Secure auth, role-based access and permission systems built the right way from day one.', ShieldCheck],
      ['Integrations', 'Payment gateways, CRMs, APIs, WhatsApp, email and third-party tools connected cleanly.', Puzzle],
      ['Deployment & Support', 'Deployment on Vercel, monitoring, performance tuning and post-launch maintenance.', Cloud],
    ],
  },
  'service-crm': {
    eyebrow: 'Product',
    titleTop: 'CRMs and dashboards built around your',
    accent: 'daily workflow.',
    description:
      'We replace spreadsheet chaos and scattered WhatsApp updates with one clean operating system for leads, tasks, reporting, commissions and customer management.',
    leadView: 'get-software-built' as ViewState,
    chips: ['CRM Logic', 'Reports', 'Automation', 'Roles', 'APIs'],
    deliverables: [
      ['Lead & Customer Pipelines', 'Track every lead, customer, deal stage and follow-up in one reliable workspace.', Users],
      ['Custom Dashboards', 'Role-specific dashboards for founders, managers and teams with live business visibility.', BarChart3],
      ['Workflow Automation', 'Automate assignments, reminders, approvals, task creation and status updates.', Sparkles],
      ['Commission Engines', 'Custom payout, incentive, target and team performance logic built into the CRM.', Gauge],
      ['Data Permissions', 'Keep sensitive data protected with access levels, audit trails and approval flows.', ShieldCheck],
      ['Third-party Integrations', 'Connect forms, WhatsApp, payment tools, email, analytics and your existing software.', Puzzle],
    ],
  },
  'service-mobile': {
    eyebrow: 'Mobile',
    titleTop: 'Mobile apps designed for real',
    accent: 'user behavior.',
    description:
      'We build PWA-first and React Native mobile experiences that feel fast, focused and practical across Android and iOS without wasting budget.',
    leadView: 'get-app-built' as ViewState,
    chips: ['React Native', 'PWA', 'Android', 'iOS', 'Push'],
    deliverables: [
      ['App UX & Flows', 'Clean user journeys, onboarding, dashboards and task flows shaped around real usage.', Smartphone],
      ['Cross-platform Builds', 'One strong codebase for Android, iOS and web-like PWA experiences where it fits.', Code2],
      ['Backend & APIs', 'Secure APIs, database setup, auth, media storage and admin controls for the app.', Database],
      ['Push & Notifications', 'Reminders, alerts and activity updates that keep users moving through the product.', Sparkles],
      ['Performance Tuning', 'Fast loading, responsive screens and mobile-first optimization across devices.', Gauge],
      ['Launch Support', 'Testing, release preparation, updates and maintenance after the first version goes live.', Cloud],
    ],
  },
  'service-website': {
    eyebrow: 'Web',
    titleTop: 'Websites built to convert',
    accent: 'serious visitors.',
    description:
      'We create fast, SEO-friendly marketing sites, booking portals and business websites that communicate clearly and turn attention into action.',
    leadView: 'get-website-built' as ViewState,
    chips: ['Next.js', 'SEO', 'Tailwind CSS', 'Forms', 'Analytics'],
    deliverables: [
      ['Conversion Pages', 'Home, service, about, contact and landing pages structured for clarity and conversion.', Globe2],
      ['Responsive UI', 'Polished layouts that work across mobile, tablet and desktop without broken sections.', Smartphone],
      ['SEO Foundation', 'Metadata, page structure, performance and technical basics set up for search visibility.', Gauge],
      ['Forms & Booking', 'Lead forms, booking flows, WhatsApp links and tracking connected to your sales process.', Puzzle],
      ['CMS-ready Content', 'Reusable sections and scalable page structure so the site can grow with your business.', Code2],
      ['Deployment & Analytics', 'Launch setup, domain support, analytics, performance checks and post-launch fixes.', Cloud],
    ],
  },
  'service-social': {
    eyebrow: 'Marketing',
    titleTop: 'Social media systems for',
    accent: 'consistent demand.',
    description:
      'We turn scattered content ideas into repeatable social media output with strategy, scripts, visuals and brand voice built for your market.',
    leadView: 'get-social-media' as ViewState,
    chips: ['Strategy', 'Reels', 'Carousels', 'AI Visuals', 'Brand Voice'],
    deliverables: [
      ['Content Strategy', 'Clear monthly themes, campaign angles and content pillars matched to your goals.', Sparkles],
      ['Reel Scripts', 'Short-form video scripts with hooks, structure and CTA direction for consistent posting.', Megaphone],
      ['Carousel Design', 'Educational, promotional and authority-building carousel creatives for Instagram.', Globe2],
      ['Brand Voice', 'Tone, messaging, captions and repeatable formats that make your brand recognizable.', Users],
      ['AI Product Visuals', 'Generated and edited visual assets for product, service and campaign storytelling.', Puzzle],
      ['Monthly Management', 'Planning, delivery, revisions and publishing support for ongoing execution.', Cloud],
    ],
  },
  'service-ads': {
    eyebrow: 'Performance',
    titleTop: 'Ads management focused on',
    accent: 'business outcomes.',
    description:
      'We run Meta ad campaigns with practical copy, creative testing, targeting and optimization tied to leads, sales and measurable growth.',
    leadView: 'get-ads' as ViewState,
    chips: ['Meta Ads', 'A/B Tests', 'Funnels', 'Retargeting', 'Reports'],
    deliverables: [
      ['Campaign Strategy', 'Audience, offer, funnel and budget planning before money goes into the ad account.', Megaphone],
      ['Creative Testing', 'Ad copy, visuals, hooks and variations tested to find the strongest performers.', Sparkles],
      ['Targeting Setup', 'Cold, warm, retargeting and lookalike audiences structured around campaign goals.', Users],
      ['Lead Funnel Tracking', 'Landing pages, forms, events and conversion tracking aligned with the campaign.', BarChart3],
      ['Budget Optimization', 'Daily checks, spend allocation, performance review and scaling decisions.', Gauge],
      ['Reporting & Insights', 'Clear reporting on spend, leads, CPL, winners, losers and next actions.', ShieldCheck],
    ],
  },
} as const;

export const ServiceDetailPage: React.FC<ServiceDetailPageProps> = ({ service, onViewChange, onServicesClick }) => {
  const detail = serviceDetails[service];

  return (
    <main className="min-h-screen overflow-hidden bg-[#030406] text-white">
      <section className="relative border-b border-white/10 px-4 pb-12 pt-24 sm:px-8 sm:pb-16 sm:pt-28 lg:px-14">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_48%_78%,rgba(255,47,134,0.28),transparent_34%),radial-gradient(ellipse_at_80%_20%,rgba(164,82,255,0.12),transparent_30%),linear-gradient(180deg,#050608_0%,#030406_100%)]" />
        <div className="pointer-events-none absolute inset-0 opacity-[0.05] [background-image:linear-gradient(115deg,transparent_0%,rgba(255,255,255,0.45)_50%,transparent_100%)]" />

        <div className="relative z-10 mx-auto max-w-7xl">
          <nav className="mb-8 flex flex-wrap items-center gap-2 text-[11px] font-medium text-white/45 sm:mb-14">
            <button type="button" onClick={() => onViewChange('home')} className="transition-colors hover:text-white">
              Home
            </button>
            <span>/</span>
            <button type="button" onClick={onServicesClick} className="transition-colors hover:text-white">
              Services
            </button>
            <span>/</span>
            <span className="text-white">{detail.titleTop.split(' built')[0]}</span>
          </nav>

          <div className="grid items-start gap-10 lg:grid-cols-[1fr_370px] lg:gap-16">
            <div>
              <p className="mb-4 text-xs font-extrabold uppercase tracking-[0.16em] text-[#ff3f8d]">
                {detail.eyebrow}
              </p>
              <h1 className="max-w-4xl text-[44px] font-medium leading-[0.96] tracking-tight text-white sm:text-[clamp(3.25rem,7vw,6.9rem)] sm:leading-[0.94]">
                {detail.titleTop}{' '}
                <span className="font-serif italic font-normal text-[#f04aa5]">{detail.accent}</span>
              </h1>
              <p className="mt-7 max-w-2xl text-[15px] leading-7 text-white/62 md:text-base">
                {detail.description}
              </p>

              <div className="mt-7 flex flex-wrap gap-3">
                {detail.chips.map((chip) => (
                  <span
                    key={chip}
                    className="inline-flex h-9 items-center gap-2 rounded-md border border-white/15 bg-white/[0.035] px-3 text-xs font-semibold text-white/86"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-[#ff3f8d]" />
                    {chip}
                  </span>
                ))}
              </div>
            </div>

            <aside className="rounded-2xl border border-white/20 bg-[#08080b]/82 p-5 shadow-[0_30px_80px_-50px_rgba(255,47,134,0.65)] backdrop-blur sm:p-8">
              <p className="mb-3 text-xs font-bold text-[#ff3f8d]">Start a project in this service</p>
              <h2 className="mb-6 text-3xl font-medium tracking-tight text-white sm:mb-7 sm:text-4xl">Ready to build?</h2>
              <div className="space-y-4 text-sm text-white/74">
                {['Fixed-price proposal in 48 hours', 'Delivered in 4-week sprints', 'You get full code ownership'].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-[#ff3f8d]" strokeWidth={1.8} />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
              <button
                type="button"
                onClick={() => onViewChange(detail.leadView)}
                className="mt-8 inline-flex h-14 w-full items-center justify-center gap-3 rounded-md bg-gradient-to-r from-[#ff3f8d] to-[#8f35ff] text-sm font-bold text-white shadow-[0_0_34px_rgba(255,63,141,0.24)] transition-transform hover:scale-[1.02]"
              >
                Start this project
                <ArrowRight className="h-4 w-4" />
              </button>
              <p className="mt-5 text-center text-xs text-white/45">or email hello@pureflowstudios.com</p>
            </aside>
          </div>
        </div>
      </section>

      <section className="relative bg-[#050607] px-4 py-7 sm:px-8 lg:px-14">
        <div className="mx-auto max-w-7xl">
          <p className="mb-4 text-xs font-extrabold uppercase tracking-[0.18em] text-[#ff3f8d]">/ What we deliver</p>
          <h2 className="mb-6 text-3xl font-medium tracking-tight text-white md:text-5xl">What you get.</h2>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {detail.deliverables.map(([title, description, Icon]) => (
              <article
                key={title}
                className="min-h-[168px] rounded-xl border border-white/18 bg-[#050609] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] transition-colors hover:border-[#ff3f8d]/60 sm:min-h-[184px] sm:p-6"
              >
                <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-lg border border-[#ff3f8d]/70 bg-[#10070d] text-[#ff3f8d] sm:mb-7 sm:h-12 sm:w-12">
                  <Icon className="h-6 w-6" strokeWidth={1.8} />
                </div>
                <h3 className="mb-2 text-xl font-medium text-white">{title}</h3>
                <p className="max-w-[34ch] text-sm leading-5 text-white/62">{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};
