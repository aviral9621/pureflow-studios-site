
import React, { useLayoutEffect, useRef } from 'react';
import { ViewState } from '../types';
import { ArrowRight, ChevronRight, Layers, Smartphone, Globe, Share2, BarChart3, Database, Layout } from 'lucide-react';
import gsap from 'gsap';

interface ServicesPageProps {
  onViewChange: (view: ViewState) => void;
}

// Service Data with correct routing ViewState
const SERVICES = [
  {
    id: 'software',
    route: 'service-software' as ViewState,
    title: "Softwares & CRMs",
    usp: "Custom CRMs & automations tailored to your workflows.",
    icon: Database,
    illustration: () => (
      <div className="relative w-full h-full flex items-center justify-center">
        <div className="absolute inset-0 bg-yellow-500/5 blur-2xl rounded-full" />
        <div className="relative w-32 h-20 bg-white dark:bg-[#1A1A1E] border border-gray-200 dark:border-white/10 rounded-lg shadow-xl dark:shadow-2xl flex flex-col p-2 overflow-hidden transform rotate-[-5deg] group-hover:rotate-0 transition-transform duration-500">
           <div className="h-2 w-full flex gap-1 mb-2">
             <div className="w-2 h-2 rounded-full bg-red-500/20" />
             <div className="w-2 h-2 rounded-full bg-yellow-500/20" />
           </div>
           <div className="space-y-1">
             <div className="h-1.5 w-3/4 bg-gray-100 dark:bg-white/10 rounded-full" />
             <div className="h-1.5 w-1/2 bg-gray-100 dark:bg-white/10 rounded-full" />
             <div className="h-1.5 w-full bg-gray-50 dark:bg-white/5 rounded-full" />
           </div>
           <div className="absolute bottom-2 right-2 w-8 h-8 bg-yellow-500/10 dark:bg-yellow-500/20 rounded flex items-center justify-center">
              <Database className="w-4 h-4 text-yellow-600 dark:text-yellow-500" />
           </div>
        </div>
        <div className="absolute -right-4 top-4 w-24 h-16 bg-gray-50 dark:bg-[#252529] border border-gray-200 dark:border-white/10 rounded-lg shadow-lg dark:shadow-xl p-2 transform rotate-[10deg] translate-y-4 group-hover:translate-y-2 transition-transform duration-500 delay-75">
             <div className="flex gap-2 items-end h-full pb-1">
                <div className="w-2 h-6 bg-yellow-500/40 rounded-t-sm" />
                <div className="w-2 h-10 bg-yellow-500/60 rounded-t-sm" />
                <div className="w-2 h-4 bg-yellow-500/20 rounded-t-sm" />
             </div>
        </div>
      </div>
    )
  },
  {
    id: 'mobile',
    route: 'service-mobile' as ViewState,
    title: "Mobile Apps",
    usp: "Native Android & iOS apps built for scale.",
    icon: Smartphone,
    illustration: () => (
      <div className="relative w-full h-full flex items-center justify-center">
         <div className="absolute inset-0 bg-blue-500/5 blur-2xl rounded-full" />
         <div className="relative w-[70px] h-[120px] bg-gray-900 dark:bg-[#0C0C0E] border-2 border-gray-700 dark:border-[#333] rounded-[14px] shadow-2xl flex flex-col items-center pt-2 group-hover:scale-105 transition-transform duration-500">
             <div className="w-8 h-1 bg-gray-800 dark:bg-[#222] rounded-full mb-2" />
             <div className="w-[85%] h-full bg-white dark:bg-[#1A1A1E] rounded-b-[10px] p-2 space-y-2">
                 <div className="w-full h-16 bg-gray-100 dark:bg-white/5 rounded-lg flex items-center justify-center">
                    <Smartphone className="w-6 h-6 text-gray-400 dark:text-white/20" />
                 </div>
                 <div className="flex gap-1">
                    <div className="w-6 h-6 bg-yellow-500 rounded-lg" />
                    <div className="flex-1 space-y-1">
                       <div className="w-full h-1 bg-gray-200 dark:bg-white/10 rounded" />
                       <div className="w-2/3 h-1 bg-gray-200 dark:bg-white/10 rounded" />
                    </div>
                 </div>
             </div>
         </div>
      </div>
    )
  },
  {
    id: 'websites',
    route: 'service-website' as ViewState,
    title: "Websites",
    usp: "High-conversion websites with speed & SEO first.",
    icon: Globe,
    illustration: () => (
      <div className="relative w-full h-full flex items-center justify-center">
         <div className="absolute inset-0 bg-purple-500/5 blur-2xl rounded-full" />
         <div className="relative w-40 h-28 bg-white dark:bg-[#1A1A1E] border border-gray-200 dark:border-white/10 rounded-lg shadow-xl dark:shadow-2xl overflow-hidden group-hover:-translate-y-1 transition-transform duration-500">
             <div className="h-6 bg-gray-100 dark:bg-[#252529] border-b border-gray-200 dark:border-white/5 flex items-center px-2 gap-1.5">
                 <div className="w-1.5 h-1.5 rounded-full bg-gray-300 dark:bg-white/20" />
                 <div className="w-1.5 h-1.5 rounded-full bg-gray-300 dark:bg-white/20" />
                 <div className="ml-2 w-20 h-2 bg-gray-200 dark:bg-[#0C0C0E] rounded-full" />
             </div>
             <div className="p-3 grid grid-cols-2 gap-2">
                 <div className="col-span-2 h-8 bg-gray-100 dark:bg-white/5 rounded flex items-center px-2">
                     <Layout className="w-4 h-4 text-gray-400 dark:text-white/30" />
                 </div>
                 <div className="h-8 bg-yellow-500/10 border border-yellow-500/20 rounded" />
                 <div className="h-8 bg-gray-50 dark:bg-white/5 rounded" />
             </div>
         </div>
      </div>
    )
  },
  {
    id: 'social',
    route: 'service-social' as ViewState,
    title: "Social Media",
    usp: "Content, growth, and community that converts.",
    icon: Share2,
    illustration: () => (
      <div className="relative w-full h-full flex items-center justify-center">
         <div className="absolute inset-0 bg-pink-500/5 blur-2xl rounded-full" />
         <div className="relative flex gap-3">
             <div className="w-14 h-14 bg-white dark:bg-[#1A1A1E] border border-gray-200 dark:border-white/10 rounded-2xl flex items-center justify-center shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                <Share2 className="w-6 h-6 text-pink-500" />
             </div>
             <div className="w-14 h-14 bg-white dark:bg-[#1A1A1E] border border-gray-200 dark:border-white/10 rounded-2xl flex items-center justify-center shadow-lg transform -translate-y-2 group-hover:-translate-y-4 transition-transform duration-500 delay-75">
                 <div className="text-xl">❤️</div>
             </div>
         </div>
         <div className="absolute -bottom-2 -right-2 bg-yellow-500/20 border border-yellow-500/40 text-yellow-600 dark:text-yellow-500 text-[10px] font-bold px-2 py-0.5 rounded-full">
            +120%
         </div>
      </div>
    )
  },
  {
    id: 'ads',
    route: 'service-ads' as ViewState,
    title: "Meta Ads",
    usp: "Performance-driven ad campaigns with measurable ROAS.",
    icon: BarChart3,
    illustration: () => (
       <div className="relative w-full h-full flex items-center justify-center">
          <div className="absolute inset-0 bg-green-500/5 blur-2xl rounded-full" />
          <div className="relative w-36 h-24 flex items-end justify-between px-4 pb-2 bg-white dark:bg-[#1A1A1E] border border-gray-200 dark:border-white/10 rounded-lg shadow-xl overflow-hidden">
              {[40, 60, 45, 80, 65, 95].map((h, i) => (
                  <div 
                    key={i} 
                    style={{ height: `${h}%` }}
                    className={`w-3 rounded-t-sm transition-all duration-500 ${i === 5 ? 'bg-yellow-500' : 'bg-gray-200 dark:bg-white/10 group-hover:bg-gray-300 dark:group-hover:bg-white/20'}`} 
                  />
              ))}
              <div className="absolute top-2 left-2 text-[8px] font-bold text-gray-400 dark:text-gray-500 uppercase">ROAS</div>
              <div className="absolute top-2 right-2 text-[10px] font-bold text-yellow-600 dark:text-yellow-500">4.5x</div>
          </div>
       </div>
    )
  }
];

export const ServicesPage: React.FC<ServicesPageProps> = ({ onViewChange }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useLayoutEffect(() => {
    // Only run if not reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // 1. Staggered Entrance
      gsap.fromTo(".service-card", 
        { y: 30, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 0.6, 
          stagger: 0.15, 
          ease: "power2.out",
          delay: 0.2
        }
      );

      // 2. Text Reveal
      gsap.fromTo(".service-header",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" }
      );

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} id="services-hero" className="min-h-screen bg-gray-50 dark:bg-[#0b0b0e] pt-32 pb-24 relative overflow-hidden transition-colors duration-300">
      
      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none">
         <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand/5 blur-[120px] rounded-full opacity-40 translate-x-1/3 -translate-y-1/3" />
         <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-yellow/5 blur-[100px] rounded-full opacity-20 -translate-x-1/3 translate-y-1/3" />
      </div>

      <div className="max-w-[1400px] mx-auto px-6 md:px-8 lg:px-12 relative z-10">
        
        {/* Layout Grid */}
        <div className="flex flex-col lg:grid lg:grid-cols-[0.5fr_1fr] gap-16 lg:gap-8 items-start">
          
          {/* Left Column: Header */}
          <div className="service-header sticky top-32 lg:max-w-md">
             <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold text-gray-900 dark:text-white tracking-tight leading-[1.1] mb-6">
               We build products that run your business
             </h1>
             <div className="h-1 w-20 bg-yellow rounded-full mb-6" />
             <p className="text-lg text-gray-600 dark:text-gray-400 font-light leading-relaxed max-w-sm">
               Minimal UI. Maximum impact. Custom tools & growth engines designed for scale.
             </p>
          </div>

          {/* Right Column: Cards Grid */}
          <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6 auto-rows-fr">
             {SERVICES.map((service, idx) => (
                <a
                  key={service.id}
                  href={`#${service.id}`} // For SEO/Semantic, handled by onClick for SPA
                  onClick={(e) => {
                    e.preventDefault();
                    onViewChange(service.route);
                  }}
                  className={`
                    service-card group relative bg-white dark:bg-[#121214] border border-gray-200 dark:border-white/5 rounded-3xl p-6 lg:p-7 
                    flex flex-col justify-between overflow-hidden transition-all duration-300
                    hover:scale-[1.02] hover:shadow-xl dark:hover:shadow-[0_12px_30px_rgba(0,0,0,0.6),0_0_30px_rgba(255,190,11,0.06)] hover:border-brand/40
                    focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 focus:ring-offset-gray-50 dark:focus:ring-offset-[#0b0b0e]
                    ${/* Layout Logic: 3 top, 2 bottom for desktop */ ''}
                    ${idx >= 3 ? 'lg:col-span-1.5 lg:last:col-start-auto' : ''}
                    h-[320px] md:h-[340px]
                  `}
                  aria-label={`View details for ${service.title}`}
                >
                   {/* Card Background Glow */}
                   <div className="absolute inset-0 bg-gradient-to-b from-gray-50/50 to-transparent dark:from-white/[0.02] dark:to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                   
                   {/* Illustration Area */}
                   <div className="relative w-full h-[160px] mb-6 rounded-2xl bg-gray-50 dark:bg-[#0b0b0e]/50 border border-gray-100 dark:border-white/5 overflow-hidden flex items-center justify-center group-hover:bg-gray-100 dark:group-hover:bg-[#0b0b0e]/30 transition-colors">
                      <service.illustration />
                   </div>

                   {/* Content */}
                   <div className="relative z-10 flex-1 flex flex-col justify-end">
                      <div className="flex justify-between items-end">
                          <div>
                             <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-brand dark:group-hover:text-yellow-400 transition-colors">
                               {service.title}
                             </h3>
                             <p className="text-sm text-gray-500 dark:text-gray-400 font-medium leading-snug max-w-[90%]">
                               {service.usp}
                             </p>
                          </div>
                          
                          {/* Chevron CTA */}
                          <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-white/5 flex items-center justify-center opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0 transition-all duration-300">
                             <ChevronRight className="w-4 h-4 text-gray-900 dark:text-white" />
                          </div>
                      </div>
                   </div>

                   {/* Semantic Data */}
                   <div className="hidden" data-service-name={service.title} data-usp={service.usp} />
                </a>
             ))}
          </div>

        </div>
      </div>
    </div>
  );
};
