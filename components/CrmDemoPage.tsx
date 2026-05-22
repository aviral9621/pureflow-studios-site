
import React, { useEffect } from 'react';
import { ViewState } from '../types';
import { ArrowLeft, Play, Layout, Users, FileText, CheckSquare, BarChart3, CreditCard } from 'lucide-react';

interface CrmDemoPageProps {
  onViewChange: (view: ViewState) => void;
}

export const CrmDemoPage: React.FC<CrmDemoPageProps> = ({ onViewChange }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const features = [
    { icon: Layout, title: "Dashboard", desc: "Real-time overview of your business health." },
    { icon: Users, title: "Leads", desc: "Track conversions from entry to close." },
    { icon: CheckSquare, title: "Tasks", desc: "Assign, track, and complete team tasks." },
    { icon: FileText, title: "Invoices", desc: "Generate GST-compliant invoices instantly." },
    { icon: CreditCard, title: "Expenses", desc: "Manage petty cash and operational costs." },
    { icon: BarChart3, title: "Reports", desc: "Deep dive analytics into performance." },
  ];

  return (
    <div className="min-h-screen bg-[#0C0C0E] pt-24 pb-20 relative animate-fade-in">
      
      {/* Background Ambience */}
      <div className="fixed top-0 left-0 w-full h-[500px] bg-brand/5 blur-[120px] rounded-b-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        
        {/* Back Button */}
        <button 
          onClick={() => onViewChange('pricing')}
          className="group flex items-center gap-2 text-sm text-gray-500 hover:text-white mb-12 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Pricing
        </button>

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block px-3 py-1 rounded-full bg-brand/10 border border-brand/20 text-brand text-[10px] font-bold tracking-widest uppercase mb-6">
            Live Preview
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight mb-6">
            Experience the CRM <br/> in <span className="text-brand">Action.</span>
          </h1>
          <p className="text-lg text-gray-400 font-light leading-relaxed">
            Explore real screens, modules, and workflows.
          </p>
        </div>

        {/* Video Placeholder */}
        <div className="relative w-full aspect-video bg-[#141416] border border-white/10 rounded-2xl md:rounded-3xl shadow-[0_0_50px_-10px_rgba(0,0,0,0.5)] overflow-hidden group cursor-pointer mb-20">
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
          
          {/* Mock UI Elements Inside Video Placeholder */}
          <div className="absolute inset-0 p-8 flex flex-col opacity-30 group-hover:opacity-20 transition-opacity duration-500">
             <div className="flex gap-4 mb-8">
                <div className="w-48 h-full bg-white/5 rounded-xl border border-white/5" />
                <div className="flex-1 bg-white/5 rounded-xl border border-white/5" />
             </div>
          </div>

          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-20 h-20 md:w-24 md:h-24 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20 group-hover:scale-110 transition-transform duration-300">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-brand rounded-full flex items-center justify-center shadow-lg shadow-brand/40">
                <Play className="w-6 h-6 md:w-8 md:h-8 text-white fill-white ml-1" />
              </div>
            </div>
          </div>
          <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10">
             <div className="text-white font-bold text-xl mb-1">Watch Walkthrough</div>
             <div className="text-gray-400 text-sm">2 min 45 sec • 4K Quality</div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 mb-20">
          {features.map((feature, idx) => (
            <div key={idx} className="p-6 bg-[#121214] border border-white/5 rounded-xl hover:border-white/10 transition-colors group">
              <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center mb-4 group-hover:bg-brand/20 transition-colors">
                <feature.icon className="w-5 h-5 text-gray-300 group-hover:text-brand transition-colors" />
              </div>
              <h3 className="text-white font-bold mb-2">{feature.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="bg-gradient-to-br from-[#1A1A1E] to-[#121214] border border-white/10 rounded-3xl p-8 md:p-12 text-center relative overflow-hidden">
           <div className="absolute top-0 right-0 w-64 h-64 bg-brand/10 blur-[80px] rounded-full pointer-events-none" />
           <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 relative z-10">Ready to modernize your operations?</h2>
           <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
              <button className="px-8 py-4 bg-brand hover:bg-brand-light text-white rounded-xl font-bold tracking-wide transition-all shadow-lg shadow-brand/20">
                Book Demo
              </button>
              <button 
                 onClick={() => onViewChange('pricing')}
                 className="px-8 py-4 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-xl font-bold tracking-wide transition-all"
              >
                View Pricing Again
              </button>
           </div>
        </div>

      </div>
    </div>
  );
};
