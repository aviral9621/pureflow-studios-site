
import React, { useLayoutEffect, useRef } from 'react';
import { ViewState } from '../types';
import { ArrowLeft, ArrowDown, Bot, Users, Globe, Receipt, Zap, MessageSquare, BarChart, ChevronDown, ChevronRight, ChevronLeft, Cpu } from 'lucide-react';
import gsap from 'gsap';

interface AutomationPageProps {
  onViewChange: (view: ViewState) => void;
}

const AUTOMATION_STEPS = [
  { icon: MessageSquare, label: "Lead Inflow", desc: "Automated capture" },
  { icon: Bot, label: "AI Calling Agents", desc: "Instant qualification" },
  { icon: Globe, label: "Website Sales", desc: "24/7 conversion" },
  { icon: Users, label: "Deal Closing", desc: "CRM Pipeline logic" },
  { icon: Zap, label: "Workflow Automation", desc: "Zero manual data entry" },
  { icon: BarChart, label: "Marketing Ads", desc: "Retargeting on autopilot" },
  { icon: Receipt, label: "Invoice Generation", desc: "Auto-send & track" },
  { icon: ArrowDown, label: "Revenue", desc: "Money in the bank", highlight: true }
];

export const AutomationPage: React.FC<AutomationPageProps> = ({ onViewChange }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textSectionRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Smooth Fade In of the whole page
      gsap.fromTo(containerRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.8, ease: "power2.out" }
      );

      // 2. Video Reveal - Faster
      gsap.fromTo(".video-element",
        { scale: 0.9, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1, delay: 0.2, ease: "power3.out" }
      );

      // 3. Text Content Reveal - Faster sequence
      gsap.fromTo(".auto-text", 
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.1, duration: 0.8, delay: 0.6, ease: "power2.out" }
      );

      // 4. Grid Items Reveal
      gsap.fromTo(".grid-item",
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, stagger: 0.05, duration: 0.6, delay: 1.0, ease: "back.out(1.7)" }
      );
      
      // 5. Connectors Reveal
      gsap.fromTo(".connector-line",
        { opacity: 0, scaleX: 0 },
        { opacity: 1, scaleX: 1, duration: 0.5, delay: 1.5, stagger: 0.1 }
      );

    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleCtaClick = () => {
    onViewChange('home');
    setTimeout(() => {
      const element = document.getElementById('automate-section');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 400); // Small delay to allow Home component to mount
  };

  // Helper to determine visual order for Snake Layout
  const getOrderClass = (index: number) => {
    // Mobile (2 cols) - Snake Flow
    // Pair 0 (0-1): Left->Right (Order 1, 2)
    // Pair 1 (2-3): Right->Left (Order 4, 3) -> Item 2 is right, Item 3 is left
    // Pair 2 (4-5): Left->Right (Order 5, 6)
    // Pair 3 (6-7): Right->Left (Order 8, 7)
    
    const pair = Math.floor(index / 2);
    let mobileOrder;
    
    if (pair % 2 === 0) {
      // Even pairs (0, 2): Natural order
      mobileOrder = index + 1;
    } else {
      // Odd pairs (1, 3): Reverse order within the pair
      const base = pair * 2;
      // if index is even (left item in array), it goes to right slot (base + 2)
      // if index is odd (right item in array), it goes to left slot (base + 1)
      mobileOrder = (index % 2 === 0) ? base + 2 : base + 1;
    }

    // Desktop (4 cols) - Snake Flow
    // Row 1 (0-3): Left->Right (Order 1, 2, 3, 4)
    // Row 2 (4-7): Right->Left (Order 8, 7, 6, 5)
    let desktopOrder;
    if (index < 4) {
      desktopOrder = index + 1;
    } else {
      desktopOrder = 8 - (index - 4);
    }
    
    return `order-${mobileOrder} md:order-${desktopOrder}`;
  };

  return (
    <div ref={containerRef} className="min-h-screen w-full bg-black text-white relative overflow-x-hidden font-sans">
      
      {/* Animation Styles */}
      <style>{`
        @keyframes textFlow {
           0% { background-position: 0% 50%; }
           100% { background-position: 200% 50%; }
        }
        .animate-text-flow {
           background-size: 200% auto;
           animation: textFlow 3s linear infinite;
        }
        @keyframes btnFlow {
           0% { background-position: 0% 50%; }
           100% { background-position: 200% 50%; }
        }
        .animate-btn-flow {
           background: linear-gradient(90deg, #A452FF 0%, #FF20A0 50%, #A452FF 100%);
           background-size: 200% auto;
           animation: btnFlow 3s linear infinite;
        }
        
        @keyframes scrollLoop {
           0% { transform: translateY(0); opacity: 0.5; }
           50% { transform: translateY(6px); opacity: 1; }
           100% { transform: translateY(0); opacity: 0.5; }
        }
        .animate-scroll-loop {
           animation: scrollLoop 1.5s ease-in-out infinite;
        }
        
        /* Flow Animation for Chain */
        @keyframes flowLine {
           0% { background-position: 0% 50%; }
           100% { background-position: 100% 50%; }
        }
        .flow-gradient {
           background: linear-gradient(90deg, rgba(164,82,255,0.2) 0%, rgba(255,32,160,0.8) 50%, rgba(164,82,255,0.2) 100%);
           background-size: 200% auto;
           animation: flowLine 2s linear infinite;
        }
      `}</style>

      {/* Back Button */}
      <div className="fixed top-6 left-6 z-50">
        <button 
          onClick={() => onViewChange('home')}
          className="group flex items-center gap-2 text-sm text-gray-500 hover:text-white transition-colors duration-300 bg-black/50 backdrop-blur-md px-4 py-2 rounded-full border border-white/10"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Back</span>
        </button>
      </div>

      {/* Content Wrapper */}
      <div className="w-full flex flex-col items-center pt-24 pb-24">
        
        {/* VIDEO CONTAINER */}
        <div className="video-element relative w-full max-w-[90%] md:max-w-2xl mx-auto px-0 mb-12 z-10 flex justify-center">
           
           {/* Right Side Scroll Indicator (Desktop Only) */}
           <div className="absolute -right-8 md:-right-32 top-1/2 -translate-y-1/2 hidden md:flex flex-col items-center gap-2 z-20">
               <div className="flex flex-col items-center animate-scroll-loop">
                  <span className="text-[10px] font-bold text-[#A452FF] tracking-[0.2em] uppercase" style={{ writingMode: 'vertical-rl', textOrientation: 'mixed', transform: 'rotate(180deg)' }}>
                      Scroll
                  </span>
                  <ArrowDown className="w-5 h-5 text-[#A452FF] mt-2" />
               </div>
           </div>

           {/* Video Wrapper: Clean, no gradients, no borders */}
           <div className="relative w-full overflow-hidden rounded-2xl bg-black">
              <video 
                src="https://jnytayxxwaydlmeuvtqr.supabase.co/storage/v1/object/sign/Review%20Videos/automation(1).mov?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9hNDg2YjZhNS0wYzE4LTQ4ZGUtYjZlZi02Nzc1ZmYxNDgyYTkiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJSZXZpZXcgVmlkZW9zL2F1dG9tYXRpb24oMSkubW92IiwiaWF0IjoxNzY1NDcxNDg2LCJleHAiOjE3NTMzNDcxNDg2fQ.nGUwD9BhT2g9dmSnXqvUum5QkWwmXoeXamtU6VXhhyA"
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-auto object-cover opacity-100"
              />
           </div>
        </div>

        {/* TEXT CONTENT */}
        <div ref={textSectionRef} className="max-w-5xl mx-auto px-6 text-center mt-4">
           
           <h2 className="auto-text text-3xl md:text-5xl font-bold mb-8 tracking-tight leading-tight">
             Looks like <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#A452FF] via-[#FF20A0] to-[#A452FF] animate-text-flow">Magic?</span>
           </h2>

           {/* Improved Subheading Presentation */}
           <div className="auto-text flex justify-center mb-12">
              <div className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md shadow-lg">
                 <div className="w-6 h-6 rounded-full bg-blue-500/10 flex items-center justify-center border border-blue-500/20">
                    <Cpu className="w-3.5 h-3.5 text-blue-500" strokeWidth={2.5} />
                 </div>
                 <span className="text-gray-200 font-medium text-lg md:text-xl tracking-wide">
                    Nope. Just good engineering.
                 </span>
              </div>
           </div>

           <p className="auto-text text-gray-400 text-base md:text-lg leading-relaxed max-w-2xl mx-auto mb-20">
             Our team doesn't just build websites. We build <span className="text-white font-bold">self-driving businesses</span>. From the first click to the final invoice, we automate the boring stuff so you can focus on the big stuff.
           </p>

           {/* AUTOMATION CHAIN VISUAL (Snake Layout) */}
           <div className="grid grid-cols-2 md:grid-cols-4 gap-4 gap-y-12 md:gap-y-16 md:gap-x-6 relative mb-24 max-w-6xl mx-auto">
              {AUTOMATION_STEPS.map((step, idx) => {
                 return (
                 <div 
                   key={idx}
                   className={`
                     grid-item relative p-6 rounded-2xl border z-10
                     ${step.highlight ? 'bg-[#A452FF] border-[#A452FF] shadow-[0_0_40px_rgba(164,82,255,0.4)]' : 'bg-[#121214] border-white/10 hover:border-white/20'}
                     flex flex-col items-center justify-center gap-3 text-center
                     transition-all duration-300 hover:-translate-y-1
                     ${getOrderClass(idx)}
                   `}
                 >
                    {/* --- DESKTOP CONNECTORS --- */}
                    <div className="hidden md:block">
                        {/* Right Arrow (For top row, except last item) */}
                        {idx < 3 && (
                            <div className="connector-line absolute top-1/2 -right-6 w-8 h-[2px] bg-[#333] z-0 overflow-hidden">
                                <div className="absolute inset-0 flow-gradient" />
                                <ChevronRight className="absolute -right-1.5 -top-[5px] w-3 h-3 text-[#FF20A0]" />
                            </div>
                        )}

                        {/* Down Curve (For last item of top row connecting to bottom row) */}
                        {idx === 3 && (
                            <div className="connector-line absolute top-full left-1/2 -translate-x-1/2 w-[2px] h-16 bg-[#333] z-0 overflow-hidden origin-top">
                                <div className="absolute inset-0 bg-gradient-to-b from-[#A452FF] to-[#FF20A0] opacity-50" />
                                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-[#FF20A0]" />
                            </div>
                        )}

                        {/* Left Arrow (For bottom row, flowing right-to-left visually) */}
                        {idx >= 4 && idx < 7 && (
                           <div className="connector-line absolute top-1/2 -left-6 w-8 h-[2px] bg-[#333] z-0 overflow-hidden">
                               <div className="absolute inset-0 flow-gradient" style={{ animationDirection: 'reverse' }} />
                               <ChevronLeft className="absolute -left-1.5 -top-[5px] w-3 h-3 text-[#FF20A0]" />
                           </div>
                        )}
                    </div>

                    {/* --- MOBILE CONNECTORS (2-Col Snake Flow) --- */}
                    <div className="md:hidden">
                        {/* Horizontal Right (0->1, 4->5) */}
                        {(idx === 0 || idx === 4) && (
                            <div className="connector-line absolute top-1/2 -right-4 w-8 h-[2px] bg-[#333] z-0 overflow-hidden">
                                <div className="absolute inset-0 flow-gradient" />
                                <ChevronRight className="absolute -right-1.5 -top-[5px] w-3 h-3 text-[#FF20A0]" />
                            </div>
                        )}

                        {/* Horizontal Left (2->3, 6->7) */}
                        {(idx === 2 || idx === 6) && (
                            <div className="connector-line absolute top-1/2 -left-4 w-8 h-[2px] bg-[#333] z-0 overflow-hidden">
                                <div className="absolute inset-0 flow-gradient" style={{ animationDirection: 'reverse' }} />
                                <ChevronLeft className="absolute -left-1.5 -top-[5px] w-3 h-3 text-[#FF20A0]" />
                            </div>
                        )}

                        {/* Vertical Down (1->2, 3->4, 5->6) */}
                        {(idx === 1 || idx === 3 || idx === 5) && (
                            <div className="connector-line absolute top-full left-1/2 -translate-x-1/2 w-[2px] h-12 bg-[#333] z-0 overflow-hidden origin-top">
                                <div className="absolute inset-0 bg-gradient-to-b from-[#A452FF] to-[#FF20A0] opacity-50" />
                                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-[#FF20A0]" />
                            </div>
                        )}
                    </div>


                    {/* Card Icon */}
                    <div className={`
                      w-12 h-12 rounded-full flex items-center justify-center mb-2
                      ${step.highlight ? 'bg-white text-[#A452FF]' : 'bg-white/5 text-gray-400'}
                    `}>
                       <step.icon className="w-6 h-6" strokeWidth={1.5} />
                    </div>
                    
                    {/* Card Text */}
                    <div>
                      <h3 className={`font-bold text-sm md:text-base ${step.highlight ? 'text-white' : 'text-gray-200'}`}>
                        {step.label}
                      </h3>
                      <p className={`text-[10px] uppercase tracking-wider font-medium mt-1 ${step.highlight ? 'text-white/80' : 'text-gray-500'}`}>
                        {step.desc}
                      </p>
                    </div>
                 </div>
              )})}
           </div>

           {/* CTA */}
           <div className="auto-text">
              <button 
                onClick={handleCtaClick}
                className="animate-btn-flow px-10 py-5 md:px-14 md:py-6 rounded-full text-white font-bold text-lg md:text-xl tracking-wide shadow-[0_0_50px_rgba(164,82,255,0.4)] hover:shadow-[0_0_70px_rgba(164,82,255,0.6)] transform hover:scale-105 transition-all duration-300 w-full md:w-auto"
              >
                Automate My Business
              </button>
           </div>

        </div>

      </div>
    </div>
  );
};
