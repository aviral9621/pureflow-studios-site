
import React, { useEffect, useRef } from 'react';
import { ViewState } from '../types';
import { ArrowDown, Shield, Zap, Smartphone } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface SoftwareCrmPageProps {
  onViewChange: (view: ViewState) => void;
}

// ----------------------------------------------------------------------
// IMAGE SOURCE CONFIGURATION
// ----------------------------------------------------------------------
const DASHBOARD_IMAGE = "https://jnytayxxwaydlmeuvtqr.supabase.co/storage/v1/object/sign/Stuff/CRM%20Dashboard.jpeg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9hNDg2YjZhNS0wYzE4LTQ4ZGUtYjZlZi02Nzc1ZmYxNDgyYTkiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJTdHVmZi9DUk0gRGFzaGJvYXJkLmpwZWciLCJpYXQiOjE3NjQ3NzYwNjYsImV4cCI6NDkxODM3NjA2Nn0.9imptO-pM52r016n9sWFKIdjxS1n4oE1lb56QmAYmYY";
// ----------------------------------------------------------------------

export const SoftwareCrmPage: React.FC<SoftwareCrmPageProps> = ({ onViewChange }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const nextSectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // Hero Animations
      // Image Fade In & Slide Up
      tl.fromTo(".hero-image", 
        { y: 80, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, duration: 1.4, ease: "power3.out" },
        "start"
      );

      // Text Reveal
      tl.fromTo(".hero-text",
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.1, ease: "power2.out" },
        "start+=0.2"
      );

      // Button Entrance
      tl.fromTo(".scroll-btn",
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.8, ease: "back.out(1.7)" },
        "start+=0.8"
      );

    }, containerRef);

    return () => ctx.revert();
  }, []);

  const scrollToSection2 = () => {
    nextSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div ref={containerRef} className="min-h-screen bg-white dark:bg-[#0B0B0E] relative overflow-x-hidden font-sans selection:bg-brand selection:text-white transition-colors duration-300">
      
      {/* HERO SECTION */}
      <div 
        ref={heroRef} 
        className="relative min-h-[90vh] flex items-center justify-center pt-20 lg:pt-0 bg-white dark:bg-[#0B0B0E] overflow-hidden transition-colors duration-300"
      >
        {/* Ambient Background - Ultra Minimal & Dark */}
        <div className="absolute top-[-20%] right-[-10%] w-[1200px] h-[1200px] bg-brand/5 blur-[200px] rounded-full pointer-events-none select-none opacity-40" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[800px] h-[800px] bg-blue-900/5 blur-[200px] rounded-full pointer-events-none select-none opacity-30" />

        <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center relative z-10">
          
          {/* LEFT COLUMN: Ultra Minimal Text */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left order-2 lg:order-1">
            <h1 className="hero-text text-5xl md:text-7xl font-bold text-gray-900 dark:text-white leading-[1.05] tracking-tight mb-8">
              Your Business,<br />
              Supercharged.
            </h1>

            <p className="hero-text text-xl md:text-2xl text-gray-500 dark:text-gray-400 font-light mb-16 max-w-lg leading-relaxed tracking-wide">
              Custom CRMs built for speed, clarity, and automation.
            </p>

            <button 
              onClick={scrollToSection2}
              className="scroll-btn group flex flex-col items-center gap-3 outline-none cursor-pointer"
              aria-label="Scroll down"
            >
               {/* Looping Pop Animation Wrapper */}
               <div className="w-16 h-16 rounded-full border border-gray-200 dark:border-white/20 bg-transparent flex items-center justify-center animate-scale-loop transition-colors duration-300 group-hover:bg-gray-100 dark:group-hover:bg-white/5 group-hover:border-gray-300 dark:group-hover:border-white/40 group-hover:shadow-[0_0_20px_rgba(164,82,255,0.1)]">
                  <ArrowDown className="w-5 h-5 text-gray-900 dark:text-white" strokeWidth={1.5} />
               </div>
               <span className="text-[10px] font-medium text-gray-500 uppercase tracking-[0.2em] group-hover:text-gray-900 dark:group-hover:text-white transition-colors duration-300">Scroll</span>
            </button>
          </div>

          {/* RIGHT COLUMN: 3D Floating Dashboard */}
          <div className="hero-image relative order-1 lg:order-2 w-full perspective-1000">
             <div className="relative w-full aspect-[16/9] rounded-[24px] overflow-hidden bg-white dark:bg-[#121214] border border-gray-200 dark:border-white/5 shadow-2xl dark:shadow-[0_40px_100px_-20px_rgba(0,0,0,0.8)] group transition-all duration-700 hover:shadow-xl dark:hover:shadow-[0_50px_120px_-20px_rgba(164,82,255,0.1)]">
                {/* Subtle sheen */}
                <div className="absolute inset-0 bg-gradient-to-tr from-white/20 dark:from-white/5 via-transparent to-transparent pointer-events-none z-10 opacity-50" />
                <img 
                  src={DASHBOARD_IMAGE}
                  alt="CRM Dashboard Interface" 
                  className="w-full h-full object-cover"
                />
             </div>
          </div>

        </div>
      </div>

      {/* SECTION 2: Value Proposition */}
      <div ref={nextSectionRef} className="py-32 bg-gray-50 dark:bg-[#0C0C0E] border-t border-gray-200 dark:border-white/5 relative z-20 transition-colors duration-300">
         <div className="max-w-7xl mx-auto px-6 lg:px-8">
             <div className="text-center mb-24">
                <h2 className="text-xs font-bold text-brand uppercase tracking-[0.2em] mb-4">Why Go Custom?</h2>
                <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6 tracking-tight">Stop adapting to software. <br className="hidden md:block"/>Make software adapt to you.</h3>
                <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto text-lg font-light leading-relaxed">
                   Off-the-shelf tools are bloated, expensive, and rigid. We build systems that fit your business like a glove.
                </p>
             </div>

             <div className="grid md:grid-cols-3 gap-8">
                {[
                    { icon: Shield, title: "Lifetime Ownership", desc: "No monthly subscriptions. You own the code, the data, and the platform forever." },
                    { icon: Zap, title: "Tailored Workflows", desc: "Features designed specifically for your internal processes, cutting manual work by 50%." },
                    { icon: Smartphone, title: "Mobile & Web", desc: "Access your business data from anywhere with fully responsive, native-feel interfaces." },
                ].map((feature, i) => (
                    <div key={i} className="p-10 rounded-3xl bg-white dark:bg-[#141416] border border-gray-200 dark:border-white/5 hover:border-brand/30 transition-all duration-300 hover:-translate-y-2 group shadow-sm dark:shadow-none hover:shadow-xl dark:hover:shadow-none">
                        <div className="w-14 h-14 rounded-2xl bg-gray-50 dark:bg-white/5 flex items-center justify-center mb-8 group-hover:bg-brand/10 transition-colors">
                            <feature.icon className="w-6 h-6 text-gray-900 dark:text-white group-hover:text-brand transition-colors" strokeWidth={1.5} />
                        </div>
                        <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-4 tracking-tight">{feature.title}</h4>
                        <p className="text-gray-500 dark:text-gray-400 leading-relaxed font-light">
                            {feature.desc}
                        </p>
                    </div>
                ))}
             </div>

             <div className="mt-24 text-center">
                <button 
                   onClick={() => onViewChange('contact')}
                   className="px-12 py-5 bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 rounded-full font-bold text-sm tracking-wide transition-all shadow-xl dark:shadow-[0_10px_40px_-10px_rgba(255,255,255,0.2)] transform hover:scale-105"
                >
                   Start Your Project
                </button>
             </div>
         </div>
      </div>

    </div>
  );
};
