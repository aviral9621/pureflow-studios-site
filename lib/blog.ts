// ─────────────────────────────────────────────────────────────────────────────
// BLOG — All posts shown in /good-stuff (the blog index) and rendered by slug
// on individual /good-stuff/[slug] views.
//
// To wire this to a CMS (Notion, Sanity, Contentful, Supabase) later, swap
// `POSTS` for a fetch returning the same shape.
// ─────────────────────────────────────────────────────────────────────────────

export interface BlogBlock {
  type: 'heading' | 'paragraph' | 'list' | 'quote' | 'code';
  text?: string;
  items?: string[];
}

export interface BlogPost {
  slug: string;
  category: string;
  title: string;
  excerpt: string;
  readTime: string;
  date: string;
  author: string;
  image: string;
  imageAlt: string;
  content: BlogBlock[];
}

export const POSTS: BlogPost[] = [
  {
    slug: 'google-gemini-omni-for-small-business',
    category: 'AI & Automation',
    title: "Google's Gemini Omni: what it actually means for small businesses",
    excerpt:
      'Gemini Omni isn’t another chatbot. It’s a multimodal model that can read your CRM, watch your dashboard, and act — here’s how to use it without setting your data on fire.',
    readTime: '6 min read',
    date: 'May 12, 2026',
    author: 'Aviral Singh',
    image:
      'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1600&q=80',
    imageAlt: 'AI neural network visualisation in purple and blue gradients',
    content: [
      {
        type: 'paragraph',
        text:
          "Google announced Gemini Omni a few weeks ago and the timeline went predictable: half the internet called it 'the ChatGPT killer' and the other half called it 'just another model'. Both takes are wrong, and both are missing what actually matters for the businesses we build software for.",
      },
      {
        type: 'paragraph',
        text:
          "Omni is interesting because of one specific shift: it can natively process screenshots, voice, video, and structured data in the same context window — without you having to glue four different APIs together. For a small business running on WhatsApp, a CRM, and Google Sheets, that's a big deal.",
      },
      { type: 'heading', text: 'What Omni actually does' },
      {
        type: 'paragraph',
        text:
          "Think of it as a model that can sit on top of your existing tools and read everything as if it were a smart intern. You can feed it:",
      },
      {
        type: 'list',
        items: [
          'A screenshot of your dashboard, and it can summarise what changed since yesterday.',
          'A voice note from a customer, and it can extract the complaint + suggested next step.',
          'A spreadsheet, and it can tell you which row is the anomaly worth investigating.',
          'A video of a UI walkthrough, and it can write the test cases.',
        ],
      },
      { type: 'heading', text: "Where it falls flat" },
      {
        type: 'paragraph',
        text:
          "The hype glosses over a few real costs. Omni is expensive to run at scale, hallucinates confidently on long-tail data, and — most importantly for Indian small businesses — pricing isn't where Gemini 1.5 was. If you're piping every customer message through it, your bill will surprise you.",
      },
      {
        type: 'quote',
        text:
          "The mistake we keep watching founders make: they treat AI like a magic 'replace your team' button. It isn't. It's a tool that 10x's the team you already have.",
      },
      { type: 'heading', text: "What to actually do with it (this quarter)" },
      {
        type: 'paragraph',
        text:
          "Don't rebuild your stack. Instead, pick the single most painful manual workflow and pipe Omni into just that. We've seen the highest ROI from these three:",
      },
      {
        type: 'list',
        items: [
          'Lead triage — paste in every WhatsApp message; it tags by intent and urgency.',
          'Invoice extraction — drop a vendor PDF; it returns structured line items into your CRM.',
          'Daily dashboard digest — it watches your numbers and writes you a one-paragraph briefing every morning.',
        ],
      },
      {
        type: 'paragraph',
        text:
          "These are all wins you can ship in under two weeks. They don't require rebuilding anything. And they pay for themselves before the next billing cycle.",
      },
      { type: 'heading', text: "The bigger pattern" },
      {
        type: 'paragraph',
        text:
          "Every wave of AI tooling — GPT-3, GPT-4, Claude 3, Gemini 1.5, Omni — keeps repeating the same story. The teams that win aren't the ones with the fanciest model. They're the ones who picked one boring workflow and automated it ruthlessly. Omni doesn't change that. It just makes the boring stuff slightly easier to automate.",
      },
      {
        type: 'paragraph',
        text:
          "If you want to see what an AI-augmented workflow looks like for your specific business, we'll map it out for free. Drop us a brief — we'll respond within 24 hours.",
      },
    ],
  },
  {
    slug: 'crm-ai-agent-integration-2026',
    category: 'CRM & AI Agents',
    title: 'Your CRM should be talking to an AI agent by now — here’s how we wire it up',
    excerpt:
      'The handoff between leads, sales reps, and follow-ups is where most CRMs leak revenue. We walk through how we plug AI agents into Supabase + WhatsApp to close that gap in under 4 weeks.',
    readTime: '8 min read',
    date: 'April 28, 2026',
    author: 'Aviral Singh',
    image:
      'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=1600&q=80',
    imageAlt: 'Abstract glowing circuit board representing automation pipelines',
    content: [
      {
        type: 'paragraph',
        text:
          "We've shipped eight CRMs into production over the last 18 months. In every single one of them, the place revenue leaks isn't the lead capture, the pipeline, or even the reporting — it's the gap between a lead landing and a human actually doing something with it.",
      },
      {
        type: 'paragraph',
        text:
          "By the time the sales rep sees the WhatsApp ping, takes their lunch, reads the message, and replies — 40 minutes have passed. The lead has moved on. The deal is gone.",
      },
      { type: 'heading', text: 'The pattern that closes the gap' },
      {
        type: 'paragraph',
        text:
          "Every CRM we build in 2026 ships with the same pattern. We call it the qualification agent loop. It's three pieces:",
      },
      {
        type: 'list',
        items: [
          'A webhook listener that catches every incoming lead within 2 seconds.',
          'An AI agent (we use Gemini or Claude — depends on the use case) that runs the first qualifying conversation.',
          'A handoff trigger that pages the right human only when the lead is hot.',
        ],
      },
      {
        type: 'paragraph',
        text:
          "The result: leads get a real, intelligent reply within 30 seconds — 24/7. Your sales rep only gets pulled in for deals that are actually ready to close.",
      },
      { type: 'heading', text: 'What it looks like in code' },
      {
        type: 'paragraph',
        text:
          "We use Supabase Edge Functions for the listener and the agent orchestration. They're cheap, run close to your data, and integrate cleanly with row-level security. The flow is:",
      },
      {
        type: 'list',
        items: [
          'WhatsApp Cloud API or Meta lead form → webhook → Supabase Edge Function.',
          'Edge function fires up the agent with the customer message + the lead context already in your CRM (past purchases, support tickets, etc).',
          'Agent has a system prompt scoped to your business — what to ask, what to never promise, what triggers a human handoff.',
          'When the agent decides the lead is qualified, it writes a row to a "hot_leads" table that pages your sales team via push notification.',
        ],
      },
      {
        type: 'quote',
        text:
          "The agent doesn't replace your sales team. It buys them back the 6 hours a day they currently spend triaging garbage leads.",
      },
      { type: 'heading', text: 'Common mistakes' },
      {
        type: 'paragraph',
        text: "We've seen these wreck the loop more than once:",
      },
      {
        type: 'list',
        items: [
          "Letting the agent close deals on its own. Don't. Always hand off to a human at the commitment step.",
          "Skipping the context layer. An agent without your CRM context is just a chatbot. Boring.",
          "Running everything through one giant model. Use cheap models (Gemini Flash, Claude Haiku) for triage; reserve the expensive ones for nuanced replies.",
          "Forgetting the audit trail. Every agent reply should be logged with the prompt + context so you can debug and tune.",
        ],
      },
      { type: 'heading', text: 'Timeline' },
      {
        type: 'paragraph',
        text:
          "For a small business with an existing CRM (or one we're building from scratch), this whole loop takes us about 4 weeks end-to-end. Week 1 is mapping the workflow and writing the system prompts. Weeks 2-3 are wiring the Edge Functions and handoff logic. Week 4 is testing with real leads and tuning the prompts based on what the agent actually says.",
      },
      {
        type: 'paragraph',
        text:
          "If you've got a CRM (or are about to build one) and the lead-response gap is bleeding you, this is the highest-leverage thing you can ship this quarter. Want us to map yours? Send us a 2-line brief — fixed-price proposal in 48 hours.",
      },
    ],
  },
];

export const findPost = (slug: string) => POSTS.find((p) => p.slug === slug);
