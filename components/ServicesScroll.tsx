
import React from 'react';
import { 
  Layout, 
  BadgeDollarSign, 
  Smartphone, 
  Bot, 
  Magnet, 
  LayoutDashboard, 
  Cloud, 
  Workflow, 
  Headphones 
} from 'lucide-react';

const SERVICES = [
  {
    icon: Layout,
    title: "Websites That Actually Work",
    description: "Fast, stable, and not allergic to traffic."
  },
  {
    icon: BadgeDollarSign,
    title: "CRMs That Make You Money",
    description: "Track leads, close deals, stop guessing."
  },
  {
    icon: Smartphone,
    title: "Apps That Look & Feel Premium",
    description: "Because your business deserves more than a template."
  },
  {
    icon: Bot,
    title: "Automations That Save Your Time",
    description: "Let the system work while you sip your coffee."
  },
  {
    icon: Magnet,
    title: "Lead Systems That Don’t Miss Opportunities",
    description: "Capture, track, convert — without babysitting."
  },
  {
    icon: LayoutDashboard,
    title: "Dashboards That Tell the Truth",
    description: "Real metrics, no sugar-coating."
  },
  {
    icon: Cloud,
    title: "Integrations That Play Nice",
    description: "All your tools finally working together."
  },
  {
    icon: Workflow,
    title: "Workflows on Autopilot",
    description: "Your business... but self-driving."
  },
  {
    icon: Headphones,
    title: "Support That Doesn’t Ghost You",
    description: "Reliable help, without the excuses."
  }
];

export const ServicesScroll: React.FC = () => {
  return (
    <section className="bg-[#0A0A0A] py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      
      {/* Background Ambience - Deep and Dark */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-purple-900/10 via-[#0A0A0A] to-[#0A0A0A] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Heading */}
        <div className="text-center mb-12 md:mb-16 max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight leading-tight drop-shadow-lg">
            What We Build for Businesses That Want to Scale
          </h2>
          <p className="text-gray-400 text-base md:text-lg font-light leading-relaxed">
            From websites to automation — here’s everything we can build for your growth.
          </p>
        </div>

        {/* 3x3 Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          {SERVICES.map((service, idx) => (
            <div 
              key={idx}
              className="
                group relative overflow-hidden rounded-2xl
                bg-[#121214]/60 backdrop-blur-md
                border border-white/5 hover:border-[#C716E8]/30
                p-6 md:p-8 flex flex-col justify-between
                transition-all duration-500 ease-out
                hover:-translate-y-1 hover:scale-[1.02]
                hover:shadow-[0_10px_30px_-10px_rgba(199,22,232,0.15)]
              "
            >
              {/* Premium Purple Gradient Flow - Top Curve */}
              {/* This simulates the 'Nano Banana' style glow: soft, top-weighted, breathing */}
              <div 
                className="absolute top-[-30%] left-[-20%] right-[-20%] h-[220px] 
                bg-[radial-gradient(50%_50%_at_50%_50%,_rgba(199,22,232,0.15)_0%,_transparent_100%)] 
                blur-[50px] opacity-60 group-hover:opacity-100 
                transition-all duration-700 pointer-events-none" 
              />
              
              {/* Secondary Moving Gradient for Depth */}
              <div className="absolute top-0 right-0 w-40 h-40 bg-[#C716E8]/5 blur-[70px] rounded-full pointer-events-none group-hover:bg-[#C716E8]/10 transition-colors duration-500" />

              {/* Icon Container - Glass & Glow */}
              <div className="relative z-10 mb-8">
                 <div className="w-12 h-12 md:w-14 md:h-14 flex items-center justify-center rounded-xl bg-gradient-to-br from-white/10 to-transparent border border-white/10 text-white shadow-inner group-hover:shadow-[0_0_20px_rgba(199,22,232,0.2)] group-hover:scale-105 transition-all duration-300">
                    <service.icon strokeWidth={1.5} className="w-6 h-6 md:w-7 md:h-7" />
                 </div>
              </div>

              {/* Text Content */}
              <div className="relative z-10 flex flex-col gap-3">
                <h3 className="text-xl md:text-2xl font-bold text-white leading-snug group-hover:text-[#C716E8] transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-gray-400 text-sm md:text-base leading-relaxed font-medium opacity-80 group-hover:opacity-100 group-hover:text-gray-300 transition-all duration-300">
                  {service.description}
                </p>
              </div>
              
              {/* Bottom Subtle Glow Line on Hover */}
              <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#C716E8]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
