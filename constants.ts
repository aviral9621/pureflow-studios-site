
import { PricingPlan } from './types';

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: 'essential',
    name: 'Essential Ecommerce',
    description: 'Perfect for startups launching their first online store.',
    monthlyPriceDisplay: '1,000',
    yearlyTotalDisplay: '12,000',
    buttonText: 'Get Started',
    features: [
      { text: 'Fully functional ecommerce website' },
      { text: 'Product listing & category structure' },
      { text: 'Domain & hosting included' },
      { text: 'Secure checkout integration' },
      { text: 'Mobile-optimized design' },
      { text: 'Basic analytics' },
      { text: 'Email support' },
    ],
  },
  {
    id: 'growth',
    name: 'Growth Ecommerce',
    description: 'Designed for businesses ready to scale and rank higher.',
    monthlyPriceDisplay: '1,500',
    yearlyTotalDisplay: '18,000',
    isPopular: true,
    buttonText: 'Get Started',
    features: [
      { text: 'Everything in Essential plan', highlight: true },
      { text: 'Advanced Google ranking setup (SEO)' },
      { text: '1-year dedicated Pureflow support' },
      { text: 'Weekly backups for data safety' },
      { text: 'Speed optimization for conversions' },
      { text: 'Advanced analytics dashboard' },
    ],
  },
  {
    id: 'ultimate',
    name: 'Ultimate Ecommerce',
    description: 'The complete package for dominance and automation.',
    monthlyPriceDisplay: '2,083',
    yearlyTotalDisplay: '25,000',
    buttonText: 'Get Started',
    features: [
      { text: 'Everything in Growth plan', highlight: true },
      { text: 'Social media marketing + strategy' },
      { text: 'Detailed ecommerce marketing training' },
      { text: '2 months social media handling included' },
      { text: 'Conversion-focused product content' },
      { text: 'Premium UI upgrades' },
    ],
  },
];

export const SHOWCASE_PLANS: PricingPlan[] = [
  {
    id: 'essential-showcase',
    name: 'Essential Showcase',
    description: 'Ideal for small service-based businesses',
    priceDisplay: '8,000',
    isOneTime: true,
    buttonText: 'Get Started',
    features: [
      { text: '3–4 page responsive website' },
      { text: 'Clean, modern UI' },
      { text: 'Contact form integration' },
      { text: 'Basic on-page SEO' },
      { text: 'Fast-loading optimized pages' },
      { text: 'SSL setup' },
      { text: '1-month support' },
    ],
  },
  {
    id: 'growth-showcase',
    name: 'Growth Showcase',
    description: 'Best for growing brands',
    priceDisplay: '15,000',
    isOneTime: true,
    isPopular: true,
    buttonText: 'Get Started',
    features: [
      { text: '5–7 page high-performance website', highlight: true },
      { text: 'Premium animations + interactions' },
      { text: 'Brand-first design system' },
      { text: 'CTA-optimized layouts' },
      { text: 'WhatsApp API integration' },
      { text: 'Advanced on-page SEO' },
      { text: 'Speed optimization' },
      { text: '2-month support' },
    ],
  },
  {
    id: 'ultimate-showcase',
    name: 'Ultimate Showcase',
    description: 'Perfect for premium brands',
    priceDisplay: '20,000',
    isOneTime: true,
    buttonText: 'Get Started',
    features: [
      { text: '8–12 page premium website', highlight: true },
      { text: 'Cinematic + micro animations' },
      { text: 'Custom UI components' },
      { text: 'Blog setup option' },
      { text: 'Server-level speed optimization' },
      { text: 'Advanced schema SEO' },
      { text: '3-month support' },
    ],
  },
];

export const CRM_PLANS: PricingPlan[] = [
  {
    id: 'sme-crm',
    name: 'Business CRM — Lifetime Access',
    description: 'A complete operating system for your growing business.',
    priceDisplay: '49,900',
    isOneTime: true,
    buttonText: 'Get Started',
    features: [
      { text: 'Total 10 Modules Included', highlight: true },
      { text: '2 Completely Custom Modules tailored to your business workflow', highlight: true },
      { text: 'Dashboard & Reports' },
      { text: 'Leads Management' },
      { text: 'Invoice Management' },
      { text: 'Attendance & Task Management' },
      { text: 'Petty Cash & Expenses' },
      { text: 'Salary Management' },
      { text: 'Fast, stable, scalable architecture' },
      { text: 'Dedicated onboarding support' },
      { text: '1-year free maintenance (basic)' },
      { text: 'Unlimited users' },
    ],
  },
  {
    id: 'enterprise-crm',
    name: 'Enterprise Automation Suite',
    description: 'Best for large-scale teams needing deep automation, advanced technology, and custom AI systems.',
    // isContactSales: true, // Removed from type, handling via lack of price
    priceDisplay: '', // Empty indicates contact sales in logic
    buttonText: 'Contact Sales',
    features: [
      { text: 'Fully custom enterprise operating system', highlight: true },
      { text: 'Built for companies requiring large-scale workflow automation' },
      { text: 'AI-driven process automation' },
      { text: 'Multi-branch management' },
      { text: 'ERP + CRM fully integrated' },
      { text: 'Auto-sync across departments' },
      { text: 'Unlimited custom modules' },
      { text: 'Custom dashboards & BI analytics' },
      { text: 'End-to-end automation' },
      { text: 'Dedicated development team' },
      { text: 'Priority support' },
    ],
  }
];

export const SOCIAL_PLANS_MONTHLY: PricingPlan[] = [
  {
    id: 'social-starter-monthly',
    name: 'Starter Social Media',
    monthlyPriceDisplay: '12,000',
    subtitleTag: 'Guaranteed Growth',
    buttonText: 'Get Started',
    features: [
      { text: 'Management of Instagram + Facebook' },
      { text: '3 reels per week (provided footage or AI assets)' },
      { text: 'Daily Instagram stories' },
      { text: 'Weekly engagement activities (polls + quizzes)' },
      { text: '+5,000 real followers in 30 days OR full refund', highlight: true },
      { text: 'Check Refund Policy', link: { text: 'Check Refund Policy', view: 'refund-policy' } },
    ],
  },
  {
    id: 'social-premium-monthly',
    name: 'Premium Social Media',
    monthlyPriceDisplay: '25,000',
    subtitleTag: 'Guaranteed Growth',
    isPopular: true,
    buttonText: 'Get Started',
    features: [
      { text: 'Instagram + Facebook full management', highlight: true },
      { text: '5 reels per week' },
      { text: '5 static posts per week' },
      { text: 'Daily stories' },
      { text: 'Real UGC-style reels included', highlight: true },
      { text: '+10,000 real followers in 30 days OR 100% refund', highlight: true },
      { text: 'Priority support' },
      { text: 'Check Refund Policy', link: { text: 'Check Refund Policy', view: 'refund-policy' } },
    ],
  },
];

export const SOCIAL_PLANS_YEARLY: PricingPlan[] = [
  {
    id: 'social-starter-yearly',
    name: 'Starter Social Media (Yearly)',
    monthlyPriceDisplay: '9,000',
    yearlyTotalDisplay: '108,000',
    subtitleTag: 'Guaranteed Growth',
    buttonText: 'Get Started',
    features: [
      { text: 'YouTube handling & management', highlight: true },
      { text: 'Full Pureflow Team support', highlight: true },
      { text: 'Dedicated Personal Agent', highlight: true },
      { text: 'Management of Instagram + Facebook' },
      { text: '3 reels per week' },
      { text: 'Daily Instagram stories' },
      { text: 'Growth Guarantee Included' },
      { text: 'Check Refund Policy', link: { text: 'Check Refund Policy', view: 'refund-policy' } },
    ],
  },
  {
    id: 'social-premium-yearly',
    name: 'Premium Social Media (Yearly)',
    monthlyPriceDisplay: '18,750',
    yearlyTotalDisplay: '225,000',
    subtitleTag: 'Guaranteed Growth',
    isPopular: true,
    buttonText: 'Get Started',
    features: [
      { text: 'Full YouTube management', highlight: true },
      { text: 'Dedicated Strategy Manager', highlight: true },
      { text: 'Monthly performance meetings', highlight: true },
      { text: 'Instagram + Facebook full management' },
      { text: '5 reels + 5 posts per week' },
      { text: 'Real UGC-style reels included' },
      { text: 'Growth Guarantee Included' },
      { text: 'Check Refund Policy', link: { text: 'Check Refund Policy', view: 'refund-policy' } },
    ],
  },
];

export const ADS_PLANS: PricingPlan[] = [
  {
    id: 'ads-starter',
    name: 'Starter Performance Ads',
    monthlyPriceDisplay: '5,000',
    subtitleTag: 'Best for small & growing businesses',
    description: 'Guaranteed results or your money back.',
    buttonText: 'Get Started',
    features: [
      { text: '15 high-performance ad campaigns tailored to goals' },
      { text: 'ROAS guarantee of 2.5x or higher', highlight: true },
      { text: 'Full money-back guarantee if targets missed', highlight: true },
      { text: 'Ad creatives design + AI enhancement' },
      { text: 'Weekly ad optimization & improvements' },
      { text: 'Audience refinement and targeting strategy' },
      { text: 'Custom reporting dashboard' },
    ],
  },
  {
    id: 'ads-premium',
    name: 'Premium Growth Suite',
    monthlyPriceDisplay: '15,000',
    description: 'Maximum scale. Maximum returns.',
    isPopular: true,
    buttonText: 'Get Started',
    features: [
      { text: 'Unlimited campaign setup on Meta + Google Ads', highlight: true },
      { text: 'ROAS guarantee of 3x or more', highlight: true },
      { text: 'Dedicated account manager' },
      { text: 'Real-time analytics dashboard' },
      { text: 'Competitor analysis & campaign strategy' },
      { text: 'Conversion-focused landing page optimization' },
      { text: 'A/B testing for creatives & audiences' },
      { text: 'High-budget scaling strategy', highlight: true },
    ],
  },
];

export const ADS_FAQS = [
  {
    question: "What happens if the ROAS guarantee is not achieved?",
    answer: "Pureflow Studios provides a full money refund as per the plan’s guarantee policy, as long as the client provides required access, creatives, and business inputs."
  },
  {
    question: "How fast can I expect results from Meta and Google ads?",
    answer: "Most clients begin seeing strong traction within the first 7–14 days, depending on industry, audience strength, and budget."
  },
  {
    question: "Do I need to provide creatives or will Pureflow handle everything?",
    answer: "Pureflow creates optimized ad creatives using professional design + AI enhancement. Client-provided footage/photos are optional but help improve performance."
  },
  {
    question: "Will this affect my existing ad account or pixel data?",
    answer: "No — all optimization is done safely. Existing pixel data, events, and ad history remain intact and are used to improve future targeting."
  },
  {
    question: "What budgets do you recommend for best results?",
    answer: "Minimum recommended ad spend is ₹10,000–₹20,000/month for stable results. Higher budgets help achieve faster ROAS delivery and scale."
  }
];

export const ECOMMERCE_FAQS = [
  {
    question: "What’s included in the ₹12,000 ecommerce plan?",
    answer: "Our Essential plan gives you everything needed to launch: a fully functional ecommerce website, product listings, category structure, secure checkout, mobile optimization, and basic analytics. It also includes your domain and hosting for the first year."
  },
  {
    question: "What extra benefits do I get in the ₹18,000 Growth plan?",
    answer: "The Growth plan is designed for scale. On top of the Essential features, you get advanced SEO setup to rank on Google, 1 year of dedicated support, weekly data backups, speed optimization, and an advanced analytics dashboard."
  },
  {
    question: "Does the ₹25,000 plan include social media handling?",
    answer: "Yes, the Ultimate plan includes 2 months of professional social media handling. We create the strategy, manage the posting, and provide conversion-focused content to help you drive sales immediately."
  },
  {
    question: "Is the pricing monthly or yearly?",
    answer: "All plans are billed annually. The monthly price is displayed to help you compare value, but we charge yearly to ensure uninterrupted service, hosting stability, and long-term support for your business."
  },
  {
    question: "Can I upgrade my plan later?",
    answer: "Absolutely. You can upgrade your plan at any time as your business grows. We handle the transition seamlessly so your store remains online and fully functional during the upgrade."
  },
  {
    question: "Is domain & hosting included in all plans?",
    answer: "Yes! Every Pureflow Studios package includes 1 year of premium domain registration and secure, high-speed hosting. We handle the technical setup so you can focus on selling."
  }
];

export const CRM_FAQS = [
  {
    question: "Can the CRM be customized for my business workflow?",
    answer: "Yes. Pureflow Studios builds 2 fully custom modules designed around your unique business problems and internal processes."
  },
  {
    question: "Is the CRM a one-time purchase or subscription?",
    answer: "It is a one-time cost with lifetime use, including all core modules listed in the plan."
  },
  {
    question: "What technologies are used to build the CRM?",
    answer: "We use high-performance, secure, modern tech stacks with cloud hosting, scaling, analytics, and structured backend architecture."
  },
  {
    question: "Will I get support after delivery?",
    answer: "Yes. Every CRM package includes support, bug fixes, onboarding and training videos."
  },
  {
    question: "How long does it take to build a custom CRM?",
    answer: "Depending on modules and complexity, typical delivery time is 10–20 days."
  }
];

export const SHOWCASE_FAQS = [
  {
    question: "What is included in a showcase/business website?",
    answer: "A showcase website includes 4–10 pages (Home, Services, About, Contact, etc.), premium UI, SEO-optimized structure, mobile responsiveness, and fast loading speed."
  },
  {
    question: "Will my website be completely custom-designed?",
    answer: "Yes, the design is custom-crafted based on your brand, niche, colors and business goals."
  },
  {
    question: "Do you provide domain and hosting?",
    answer: "We provide domain & hosting packages as add-ons. You can use your own hosting if preferred."
  },
  {
    question: "What is the delivery time for a business website?",
    answer: "Standard delivery is 5–12 days, depending on the plan selected."
  },
  {
    question: "Can I update the website later on?",
    answer: "Yes. Admin access is fully given and you can request future updates anytime."
  }
];

export const SOCIAL_FAQS = [
  {
    question: "What platforms are included in the social media plans?",
    answer: "All plans include Instagram & Facebook. Yearly plans also include YouTube management."
  },
  {
    question: "Are the followers real? How do you guarantee growth?",
    answer: "All followers are real, organic users gained through strategic content, reels, and paid promotions—not bots."
  },
  {
    question: "How do the refund guarantees work?",
    answer: "If we fail to achieve the minimum monthly growth target (5K or 10K depending on plan), the service fee is refunded—provided the client gave all required footage."
  },
  {
    question: "Do you shoot the reels or use provided videos?",
    answer: "We use client-provided footage or create AI-enhanced reels. Premium packages include UGC-style reels."
  },
  {
    question: "Will I get reports?",
    answer: "Yes, you receive weekly performance insights and monthly growth reports."
  }
];

// Updated location constants as per requirements
export const OFFICE_LOCATION = {
  lat: 26.8904999,
  lng: 80.859048,
  place_id: "ChIJUSN8XOKXJgURCW_dTfaz9-k", 
  name: "Pureflow Studios HQ",
  address: "Amrapali Yojna, E-4/77, near LPS School, Dubagga, Lucknow, Uttar Pradesh 226003",
  googleMapsUrl: "https://maps.app.goo.gl/gWtQgZXkgY6cKFheA"
};
