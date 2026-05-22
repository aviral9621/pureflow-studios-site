import { useEffect } from 'react';
import { ViewState } from '../types';

interface Meta {
  title: string;
  description: string;
}

const SITE = 'Pureflow Studios';

export const META: Record<ViewState, Meta> = {
  home: {
    title: `${SITE} — Custom Software, CRMs, AI Agents & Web Apps`,
    description:
      'Custom software, CRMs, AI agents, and websites that turn manual chaos into measurable systems. A Lucknow-based design and engineering studio.',
  },
  pricing: {
    title: `Pricing — ${SITE}`,
    description:
      'Transparent fixed-price proposals for custom software, CRMs, AI agents, and websites. Founder-led, India-based, no hourly games.',
  },
  contact: {
    title: `Contact — ${SITE}`,
    description:
      'Talk to Pureflow Studios about your project. Email support@pureflowdesigns.com or message us on WhatsApp.',
  },
  services: {
    title: `Services — Custom Software, CRMs, AI Agents | ${SITE}`,
    description:
      'Our service offering: custom software, CRMs and dashboards, AI agents, mobile and web apps, brand & content, Meta ads management.',
  },
  'service-software': {
    title: `Custom Software Development — ${SITE}`,
    description:
      'We build bespoke software, internal tools, and dashboards on Next.js + Supabase. No templates, no WordPress — actual software.',
  },
  'service-crm': {
    title: `CRM & Dashboard Development — ${SITE}`,
    description:
      'Commission engines, KYC portals, lead pipelines, custom CRMs — built to replace WhatsApp chaos with a real system.',
  },
  'service-mobile': {
    title: `Mobile App Development — ${SITE}`,
    description:
      'iOS + Android apps under one budget. PWA-first or React Native, depending on what your users actually need.',
  },
  'service-website': {
    title: `Website Development — ${SITE}`,
    description:
      'Marketing sites, booking portals, agency websites. Built on Next.js + Tailwind. Fast, SEO-optimised, designed to convert.',
  },
  'service-social': {
    title: `Social Media & Brand — ${SITE}`,
    description:
      'Content strategy, reel scripts, AI-generated product visuals, brand voice — for travel, healthcare, and edtech founders.',
  },
  'service-ads': {
    title: `Meta Ads Management — ${SITE}`,
    description:
      'Facebook + Instagram ad campaigns that chase ROAS, not vanity metrics. Creative, copy, targeting, and weekly reporting.',
  },
  'get-website-built': {
    title: `Get a Website Built — ${SITE}`,
    description:
      'Tell us what you need. Fixed-price proposal in 48 hours, live in weeks. No retainer required to start.',
  },
  'get-software-built': {
    title: `Get Custom Software Built — ${SITE}`,
    description:
      'CRMs, dashboards, internal tools — get a fixed-price proposal in 48 hours. No middlemen, direct line to the founder.',
  },
  'get-app-built': {
    title: `Get an App Built — ${SITE}`,
    description:
      'Mobile app development for iOS and Android. PWA or native — fixed-price proposal in 48 hours.',
  },
  'get-social-media': {
    title: `Get Social Media Done — ${SITE}`,
    description:
      'Monthly content strategy, reels, and brand-aligned creatives. Pricing in 24 hours.',
  },
  'get-ads': {
    title: `Get Ads Run — ${SITE}`,
    description: 'Meta ads management. Performance-focused, transparently reported, no vanity metrics.',
  },
  'crm-demo': {
    title: `CRM Demo — ${SITE}`,
    description: 'See a live demo of the CRMs and dashboards we build for our clients.',
  },
  'automation-video': {
    title: `AI & Automation — ${SITE}`,
    description: 'See how AI agents and automations are transforming small businesses in real time.',
  },
  'refund-policy': {
    title: `Refund Policy — ${SITE}`,
    description: 'Pureflow Studios refund policy for guaranteed-growth social media engagements.',
  },
  privacy: {
    title: `Privacy Policy — ${SITE}`,
    description:
      'How Pureflow Studios collects, uses, and protects the personal data you share with us.',
  },
  terms: {
    title: `Terms of Service — ${SITE}`,
    description:
      'The terms governing your use of pureflowstudios.com and the services delivered by Pureflow Studios.',
  },
  cookies: {
    title: `Cookie Policy — ${SITE}`,
    description: 'The cookies and similar technologies in use on Pureflow Studios and how to control them.',
  },
  blog: {
    title: `Good Stuff — Blog & Field Notes | ${SITE}`,
    description:
      'Field notes on AI, automation, CRMs, and the boring software that quietly runs growing businesses. From the Pureflow Studios team.',
  },
  'blog-post': {
    title: `Article — ${SITE}`,
    description:
      'Read the full article on the Pureflow Studios blog — practical takes on AI agents, custom software, and modern automation.',
  },
};

function setMeta(name: string, value: string, attr: 'name' | 'property' = 'name') {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${name}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, name);
    document.head.appendChild(el);
  }
  el.setAttribute('content', value);
}

/** Updates <title>, description, OG, and Twitter meta tags when the view changes. */
export function useDocumentMeta(view: ViewState) {
  useEffect(() => {
    const m = META[view] ?? META.home;
    document.title = m.title;
    setMeta('description', m.description);

    setMeta('og:title', m.title, 'property');
    setMeta('og:description', m.description, 'property');

    setMeta('twitter:title', m.title);
    setMeta('twitter:description', m.description);
  }, [view]);
}
