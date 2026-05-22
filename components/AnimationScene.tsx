
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Truck, CheckCircle } from 'lucide-react';

interface AnimationSceneProps {
  onAnimationComplete?: () => void;
}

export const AnimationScene: React.FC<AnimationSceneProps> = ({ onAnimationComplete }) => {
  const deliveryRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const successRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
        // Calculate animation boundaries based on container
        const screenWidth = containerRef.current?.offsetWidth || window.innerWidth;
        
        const tl = gsap.timeline({ 
          onComplete: () => {
            // Show success screen after truck passes
            gsap.to(successRef.current, {
              opacity: 1,
              scale: 1,
              duration: 0.5,
              ease: 'back.out(1.7)'
            });
            
            // Auto-close after 3 seconds
            setTimeout(() => {
              if (onAnimationComplete) onAnimationComplete();
            }, 3000);
          }
        });
        
        // Delivery animation: LEFT to RIGHT (One pass)
        tl.fromTo(deliveryRef.current,
          { x: -100, opacity: 0 },
          { x: screenWidth + 100, opacity: 1, duration: 2.5, ease: 'power2.inOut' }
        );
    }, containerRef);

    return () => ctx.revert();
  }, [onAnimationComplete]);

  return (
    <div ref={containerRef} className="absolute inset-0 w-full h-full bg-[#0C0C0E] overflow-hidden flex flex-col items-center justify-center font-sans">
        
        {/* Subtle animated background grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(164,82,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(164,82,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]"></div>

        {/* Road Line */}
        <div className="absolute top-1/2 left-0 w-full h-[1px] bg-white/10" />

        {/* Delivery Truck Animation */}
        <div ref={deliveryRef} className="absolute top-1/2 -translate-y-1/2 left-0 z-20">
            <Truck className="w-16 h-16 text-purple-600 filter drop-shadow-[0_0_10px_rgba(164,82,255,0.5)]" />
        </div>

        {/* Success Message Screen */}
        <div ref={successRef} className="opacity-0 scale-50 absolute inset-0 flex items-center justify-center z-50">
             <div className="bg-[#1A1A1E] border border-purple-600/30 shadow-[0_0_50px_rgba(164,82,255,0.3)] rounded-3xl p-8 md:p-12 text-center max-w-xs md:max-w-md mx-4 backdrop-blur-xl">
                  <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-green-500/20 shadow-[0_0_30px_rgba(34,197,94,0.2)]">
                      <CheckCircle className="w-10 h-10 text-green-500" strokeWidth={2.5} />
                  </div>
                  <h2 className="text-3xl font-bold text-white mb-3 tracking-wide">REQUEST SENT!</h2>
                  <p className="text-gray-400 font-medium text-base">Your request has been securely delivered.</p>
                  <div className="mt-6 pt-6 border-t border-white/5">
                    <p className="text-sm font-bold text-purple-600 uppercase tracking-wider">Our team will contact you shortly.</p>
                  </div>
             </div>
        </div>
    </div>
  );
};
