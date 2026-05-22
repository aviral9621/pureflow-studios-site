
import React, { useEffect } from 'react';
import { ViewState } from '../types';
import { ArrowLeft, CheckCircle, XCircle, ShieldAlert } from 'lucide-react';

interface RefundPolicyPageProps {
  onViewChange: (view: ViewState) => void;
}

export const RefundPolicyPage: React.FC<RefundPolicyPageProps> = ({ onViewChange }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#0C0C0E] pt-28 pb-20 relative animate-fade-in">
       {/* Background */}
       <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
         <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[1200px] h-[1000px] bg-brand/5 rounded-full blur-[150px] opacity-30" />
      </div>

      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        {/* Back Button */}
        <button 
          onClick={() => onViewChange('pricing')}
          className="group flex items-center gap-2 text-sm text-gray-500 hover:text-white mb-10 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Pricing
        </button>

        {/* Title */}
        <div className="border-b border-white/10 pb-10 mb-10">
           <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand/10 border border-brand/20 text-brand text-[10px] font-bold tracking-widest uppercase mb-4">
              <ShieldAlert className="w-3 h-3" /> Policy
           </div>
           <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Pureflow Studios <br className="md:hidden"/> Social Media Growth Refund Policy
           </h1>
           <p className="text-gray-400 leading-relaxed max-w-2xl">
              We stand by our results. Our refund policy ensures you only pay for guaranteed growth. Please read the terms below carefully.
           </p>
        </div>

        {/* Content Blocks */}
        <div className="space-y-12">
           
           {/* Eligibility */}
           <section>
              <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                 1. Eligibility for Refund
              </h2>
              <div className="bg-[#141416] border border-white/5 rounded-2xl p-6 md:p-8">
                 <p className="text-gray-400 mb-4">A client is eligible for a refund <span className="text-white font-bold">ONLY</span> if:</p>
                 <ul className="space-y-3">
                    {[
                       "They purchased a plan that includes a growth guarantee.",
                       "They provided all required footage, assets, and account access on time.",
                       "They completed the full 30-day service cycle."
                    ].map((item, i) => (
                       <li key={i} className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-brand mt-0.5 shrink-0" />
                          <span className="text-gray-300 text-sm">{item}</span>
                       </li>
                    ))}
                 </ul>
              </div>
           </section>

           {/* Growth Targets */}
           <section>
              <h2 className="text-xl font-bold text-white mb-6">2. Growth Targets</h2>
              <div className="grid md:grid-cols-2 gap-4">
                 <div className="bg-[#141416] border border-white/5 rounded-2xl p-6 flex flex-col items-center text-center">
                    <span className="text-sm text-gray-500 uppercase tracking-widest mb-2 font-bold">Starter Plan</span>
                    <span className="text-3xl font-bold text-white mb-1">+5,000</span>
                    <span className="text-sm text-gray-400">Followers Guaranteed</span>
                 </div>
                 <div className="bg-[#141416] border border-white/5 rounded-2xl p-6 flex flex-col items-center text-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-brand/5" />
                    <span className="text-sm text-brand-light uppercase tracking-widest mb-2 font-bold relative z-10">Premium Plan</span>
                    <span className="text-3xl font-bold text-white mb-1 relative z-10">+10,000</span>
                    <span className="text-sm text-gray-400 relative z-10">Followers Guaranteed</span>
                 </div>
              </div>
           </section>

           {/* Refund Approval */}
           <section>
              <h2 className="text-xl font-bold text-white mb-6">3. When Refund Is Approved</h2>
              <div className="bg-brand/5 border border-brand/20 rounded-2xl p-6 md:p-8">
                 <p className="text-gray-300 mb-4 leading-relaxed">
                    If the Pureflow Studios team fails to achieve the guaranteed growth despite:
                 </p>
                 <ul className="list-disc list-inside text-gray-400 space-y-2 mb-6 ml-2">
                    <li>Daily posting execution</li>
                    <li>Proper strategy implementation</li>
                    <li>Adequate access and assets provided by the client</li>
                 </ul>
                 <div className="p-4 bg-brand/10 rounded-xl border border-brand/20 text-center">
                    <span className="text-white font-bold">→ 100% of the plan amount will be refunded.</span>
                 </div>
              </div>
           </section>

           {/* Not Eligible */}
           <section>
              <h2 className="text-xl font-bold text-white mb-6">4. Not Eligible Cases</h2>
              <div className="bg-[#141416] border border-white/5 rounded-2xl p-6 md:p-8">
                 <ul className="grid md:grid-cols-2 gap-4">
                    {[
                       "Client did not provide required footage",
                       "Client was not responsive to approvals",
                       "Account was restricted/banned due to client actions",
                       "Client changed login credentials mid-project",
                       "Client interfered with posting schedule",
                       "Service cancelled before 30 days"
                    ].map((item, i) => (
                       <li key={i} className="flex items-center gap-3 bg-white/[0.02] p-3 rounded-lg">
                          <XCircle className="w-4 h-4 text-red-400 shrink-0" />
                          <span className="text-gray-400 text-sm">{item}</span>
                       </li>
                    ))}
                 </ul>
              </div>
           </section>

           {/* Timeline */}
           <section className="mb-12">
              <h2 className="text-xl font-bold text-white mb-4">5. Refund Timeline</h2>
              <p className="text-gray-400 text-sm">
                 Refunds will be processed within <span className="text-white font-bold">7 working days</span> after approval via the original payment method.
              </p>
           </section>

        </div>
      </div>
    </div>
  );
};
