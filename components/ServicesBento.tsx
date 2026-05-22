
import React from 'react';
import { Database, Cpu, Globe, Layout, Zap, ArrowUpRight } from 'lucide-react';

export const ServicesBento: React.FC = () => {
  return (
    <section className="py-24 bg-black/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16 md:flex md:items-end md:justify-between">
           <div className="max-w-2xl">
             <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
               Beyond standard websites.
             </h2>
             <p className="text-gray-400 text-lg">
               We are a strategic partner for businesses that need custom software ecosystems.
             </p>
           </div>
           <button className="hidden md:flex items-center gap-2 text-brand-light font-medium hover:text-white transition-colors">
             View all services <ArrowUpRight className="w-4 h-4" />
           </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 grid-rows-2 gap-6 h-auto md:h-[600px]">
          
          {/* Card 1: CRM / Custom Software (Large) */}
          <div className="md:col-span-2 md:row-span-2 group relative overflow-hidden rounded-3xl border border-white/10 bg-[#0F0F12] hover:bg-[#141419] transition-all duration-300 p-8 md:p-12 flex flex-col justify-between">
             <div className="absolute top-0 right-0 w-64 h-64 bg-brand/10 rounded-full blur-[80px] group-hover:bg-brand/20 transition-all" />
             
             <div className="relative z-10">
               <div className="w-12 h-12 rounded-xl bg-brand/10 flex items-center justify-center mb-6 text-brand-light">
                 <Database className="w-6 h-6" />
               </div>
               <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">Custom CRM & Software</h3>
               <p className="text-gray-400 leading-relaxed max-w-md">
                 We build bespoke operating systems for your business. Own your data, automate your workflows, and stop paying licensing fees for software that doesn't fit.
               </p>
             </div>
             
             <div className="relative mt-8 h-48 w-full bg-black/30 rounded-xl border border-white/5 overflow-hidden">
                {/* Mock UI */}
                <div className="absolute top-4 left-4 right-4 bottom-0 bg-[#1A1A20] rounded-t-lg border-t border-l border-r border-white/5 p-4">
                   <div className="flex gap-4 mb-4">
                      <div className="w-1/3 h-2 bg-white/10 rounded" />
                      <div className="w-1/3 h-2 bg-white/10 rounded" />
                   </div>
                   <div className="space-y-2">
                      {[1,2,3].map(i => (
                        <div key={i} className="h-8 w-full bg-white/5 rounded flex items-center px-3">
                           <div className="w-2 h-2 rounded-full bg-brand mr-3" />
                           <div className="w-20 h-1.5 bg-white/20 rounded" />
                        </div>
                      ))}
                   </div>
                </div>
             </div>
          </div>

          {/* Card 2: Automation (Medium) */}
          <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-[#0F0F12] hover:bg-[#141419] transition-all duration-300 p-8 flex flex-col justify-between">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-[60px]" />
             <div>
               <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center mb-4 text-blue-400">
                 <Cpu className="w-5 h-5" />
               </div>
               <h3 className="text-xl font-bold text-white mb-2">Automation & AI</h3>
               <p className="text-sm text-gray-400">
                 Save 20+ hours/week by automating repetitive tasks.
               </p>
             </div>
          </div>

          {/* Card 3: Ecommerce (Medium) */}
          <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-[#0F0F12] hover:bg-[#141419] transition-all duration-300 p-8 flex flex-col justify-between">
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-green-500/10 rounded-full blur-[60px]" />
             <div>
               <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center mb-4 text-green-400">
                 <Globe className="w-5 h-5" />
               </div>
               <h3 className="text-xl font-bold text-white mb-2">High-Scale Web</h3>
               <p className="text-sm text-gray-400">
                 Performance-first websites and ecommerce stores.
               </p>
             </div>
          </div>

        </div>
      </div>
    </section>
  );
};
