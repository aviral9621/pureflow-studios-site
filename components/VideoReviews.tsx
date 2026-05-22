
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Volume2, VolumeX } from 'lucide-react';

const REVIEWS = [
  {
    id: 1,
    url: "https://jnytayxxwaydlmeuvtqr.supabase.co/storage/v1/object/sign/Review%20Videos/1.mp4?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9hNDg2YjZhNS0wYzE4LTQ4ZGUtYjZlZi02Nzc1ZmYxNDgyYTkiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJSZXZpZXcgVmlkZW9zLzEubXA0IiwiaWF0IjoxNzY1NDQyODk3LCJleHAiOjMzNDIyNDI4OTd9.i3bIcIgj6XnV8ix2ScfQWlhRu8CfmtR_buMCYOAQDMk"
  },
  {
    id: 2,
    url: "https://jnytayxxwaydlmeuvtqr.supabase.co/storage/v1/object/sign/Review%20Videos/4.mp4?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9hNDg2YjZhNS0wYzE4LTQ4ZGUtYjZlZi02Nzc1ZmYxNDgyYTkiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJSZXZpZXcgVmlkZW9zLzQubXA0IiwiaWF0IjoxNzY1NDQyOTE4LCJleHAiOjMzNDIyNDI5MTh9.AoHg7KZinyB4doXsFGwr8fIOGpZyuqqLUlEanebEOoI"
  },
  {
    id: 3,
    url: "https://jnytayxxwaydlmeuvtqr.supabase.co/storage/v1/object/sign/Review%20Videos/3.mp4?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9hNDg2YjZhNS0wYzE4LTQ4ZGUtYjZlZi02Nzc1ZmYxNDgyYTkiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJSZXZpZXcgVmlkZW9zLzMubXA0IiwiaWF0IjoxNzY1NDQyOTQ5LCJleHAiOjMzNDIyNDI5NDl9.Lar87PHZnM1KE8KKUiuWAeImc4kCs631n5PIMzk-mZA"
  }
];

export const VideoReviews: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(1);
  const [isMuted, setIsMuted] = useState(true);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);
  const autoPlayRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  // Touch state
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const minSwipeDistance = 50;

  // Helper to handle wrapping indices correctly for the loop
  const getIndex = (index: number) => {
    const len = REVIEWS.length;
    return ((index % len) + len) % len;
  };

  const handleNext = useCallback((isAuto = false) => {
    setActiveIndex((prev) => prev + 1);
    setIsMuted(true); // Always mute on transition
    
    // Only resume auto-scroll if it was a manual interaction
    if (!isAuto) {
      setIsAutoScrolling(true);
    }
  }, []);

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => prev - 1);
    setIsMuted(true); // Always mute on transition
    setIsAutoScrolling(true); // Resume auto-scroll on manual interaction
  }, []);

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      handleNext(false); // Manual swipe -> resume auto scroll
    }
    if (isRightSwipe) {
      handlePrev(); // Manual swipe -> resume auto scroll
    }
  };

  const startAutoPlay = useCallback(() => {
    if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    autoPlayRef.current = setInterval(() => {
      handleNext(true); // indicate auto transition
    }, 5000); // 5 seconds per slide
  }, [handleNext]);

  const stopAutoPlay = useCallback(() => {
    if (autoPlayRef.current) clearInterval(autoPlayRef.current);
  }, []);

  // Manage Auto-Scroll Lifecycle
  useEffect(() => {
    if (isAutoScrolling) {
      startAutoPlay();
    } else {
      stopAutoPlay();
    }
    return () => stopAutoPlay();
  }, [isAutoScrolling, startAutoPlay, stopAutoPlay]);

  // Restart video from beginning when it becomes the center slide
  useEffect(() => {
    const currentIndex = getIndex(activeIndex);
    const videoEl = videoRefs.current[currentIndex];
    if (videoEl) {
      videoEl.currentTime = 0;
      // Ensure it plays (it should be playing due to autoPlay, but explicit play is safer after seek)
      videoEl.play().catch(() => {});
    }
  }, [activeIndex]);

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    const newMutedState = !isMuted;
    setIsMuted(newMutedState);
    
    // If user unmutes, pause auto-scroll immediately.
    // The center video remains fixed.
    if (!newMutedState) {
      setIsAutoScrolling(false);
    }
    // Note: We do NOT resume auto-scroll if they re-mute. 
    // It only resumes on manual navigation (arrows).
  };

  // Pre-calculate indices for Left, Center, Right
  const current = getIndex(activeIndex);
  const prev = getIndex(activeIndex - 1);
  const next = getIndex(activeIndex + 1);

  return (
    <section className="relative w-full py-14 md:py-16 bg-[#050508] overflow-hidden">
      
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
      `}</style>

      {/* Background Ambience */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-6xl h-[600px] bg-brand/5 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 flex flex-col items-center">
        
        {/* Header with Gradient Text and Subheading */}
        <div className="text-center mb-8 md:mb-10 relative w-full">
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-tight mb-4">
            When Clients Become <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#A452FF] via-[#FF20A0] to-[#A452FF] animate-text-flow inline-block">Influencers</span>
          </h2>
          
          <p className="text-gray-400 text-sm md:text-lg font-light tracking-wide leading-relaxed max-w-xl mx-auto">
             Real stories from businesses that chose to lead, not follow.
          </p>
        </div>

        {/* Carousel Container */}
        <div 
          className="relative w-full max-w-[1200px] h-[470px] flex items-center justify-center touch-pan-y md:h-[550px]"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          
          {REVIEWS.map((review, i) => {
            // Determine Visual State based on position relative to Active Index
            let visualState = 'hidden'; 
            
            if (i === current) visualState = 'center';
            else if (i === prev) visualState = 'left';
            else if (i === next) visualState = 'right';

            // We render all videos, but use CSS transforms to position them.
            if (visualState === 'hidden') return null;

            const isCenter = visualState === 'center';
            const isLeft = visualState === 'left';
            const isRight = visualState === 'right';

            return (
              <div
                key={review.id}
                className={`
                  absolute top-1/2 left-1/2 w-[250px] h-[430px] md:h-[560px] md:w-[320px]
                  transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]
                  origin-center
                `}
                style={{
                  zIndex: isCenter ? 30 : 10,
                  opacity: isCenter ? 1 : 0.4,
                  filter: isCenter ? 'blur(0px)' : 'blur(2px)',
                  transform: `
                    translate(-50%, -50%)
                    ${isCenter ? 'translateX(0) scale(1)' : ''}
                    ${isLeft ? 'translateX(-70%) scale(0.88)' : ''}
                    ${isRight ? 'translateX(70%) scale(0.88)' : ''}
                  `
                }}
                onClick={() => {
                  if (isLeft) handlePrev();
                  if (isRight) handleNext(false);
                }}
              >
                {/* Glow Backdrop for Center Card */}
                {isCenter && (
                  <div className="absolute inset-0 bg-[#A452FF] blur-[50px] opacity-40 rounded-[32px] animate-pulse-slow pointer-events-none" />
                )}

                {/* Card Content */}
                <div 
                  className={`
                    relative w-full h-full rounded-[24px] overflow-hidden border 
                    ${isCenter ? 'border-[#A452FF] shadow-[0_0_30px_-5px_rgba(164,82,255,0.4)]' : 'border-white/10 bg-black'}
                    bg-[#0C0C0E] transition-all duration-500
                  `}
                >
                  <video
                    ref={(el) => { videoRefs.current[i] = el; }}
                    src={review.url}
                    className="w-full h-full object-cover"
                    playsInline
                    loop
                    // Side videos are ALWAYS muted. Center video is controlled by state.
                    muted={isCenter ? isMuted : true}
                    autoPlay
                  />
                  
                  {/* Overlay Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/10 pointer-events-none" />

                  {/* Mute Button - Center Only */}
                  {isCenter && (
                    <button
                      onClick={toggleMute}
                      className="absolute bottom-5 right-5 w-11 h-11 rounded-full bg-black/40 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-[#A452FF] hover:border-[#A452FF] hover:scale-110 transition-all duration-300 group z-50 cursor-pointer md:bottom-6 md:right-6 md:h-12 md:w-12"
                    >
                      {isMuted ? (
                        <VolumeX className="w-6 h-6 group-hover:text-white" />
                      ) : (
                        <Volume2 className="w-6 h-6 group-hover:text-white" />
                      )}
                    </button>
                  )}
                </div>
              </div>
            );
          })}

          {/* Navigation Arrows */}
          <button
            onClick={() => handlePrev()}
            className="absolute left-2 md:left-10 top-1/2 -translate-y-1/2 z-40 w-10 h-10 rounded-full border border-[#A452FF]/30 text-white hover:bg-[#A452FF] hover:border-[#A452FF] hover:shadow-[0_0_20px_rgba(164,82,255,0.4)] transition-all duration-300 flex items-center justify-center backdrop-blur-sm group md:h-14 md:w-14"
            aria-label="Previous Review"
          >
            <ChevronLeft className="w-6 h-6 group-hover:-translate-x-0.5 transition-transform" />
          </button>

          <button
            onClick={() => handleNext(false)}
            className="absolute right-2 md:right-10 top-1/2 -translate-y-1/2 z-40 w-10 h-10 rounded-full border border-[#A452FF]/30 text-white hover:bg-[#A452FF] hover:border-[#A452FF] hover:shadow-[0_0_20px_rgba(164,82,255,0.4)] transition-all duration-300 flex items-center justify-center backdrop-blur-sm group md:h-14 md:w-14"
            aria-label="Next Review"
          >
            <ChevronRight className="w-6 h-6 group-hover:translate-x-0.5 transition-transform" />
          </button>

        </div>

      </div>
    </section>
  );
};
