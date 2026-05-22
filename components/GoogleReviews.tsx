
import React, { useEffect, useState, useRef } from 'react';
import { Star, Quote } from 'lucide-react';
import { OFFICE_LOCATION } from '../constants';

const GOOGLE_MAPS_API_KEY = "AIzaSyBohJfK2TbmuPgoGSzghT71jI64aXo3Ge0";

interface Review {
  author_name: string;
  profile_photo_url: string;
  rating: number;
  relative_time_description: string;
  text: string;
}

declare global {
  interface Window {
    google: any;
  }
}

// Inline Google Logo for reliability
const GoogleLogo = () => (
  <svg viewBox="0 0 24 24" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 4.08 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
  </svg>
);

export const GoogleReviews: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [rating, setRating] = useState<number>(5.0);
  const [totalRatings, setTotalRatings] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [apiLoaded, setApiLoaded] = useState(false);

  // Scroll State
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeftState, setScrollLeftState] = useState(0);

  // Load Google Maps Script
  useEffect(() => {
    if (window.google && window.google.maps && window.google.maps.importLibrary) {
      setApiLoaded(true);
    } else {
      if (!document.querySelector('script[src*="maps.googleapis.com"]')) {
        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places&v=weekly`;
        script.async = true;
        script.defer = true;
        document.head.appendChild(script);
        script.onload = () => setApiLoaded(true);
      } else {
        const interval = setInterval(() => {
          if (window.google && window.google.maps && window.google.maps.importLibrary) {
            setApiLoaded(true);
            clearInterval(interval);
          }
        }, 500);
        return () => clearInterval(interval);
      }
    }
  }, []);

  // Fetch Reviews
  useEffect(() => {
    if (!apiLoaded || !OFFICE_LOCATION.place_id) return;

    const fetchReviews = async () => {
      try {
        const { Place } = await window.google.maps.importLibrary("places") as any;
        const place = new Place({ id: OFFICE_LOCATION.place_id });

        // Note: The Google Places API (Client Side) is limited to returning 5 reviews max.
        // We will fetch what is available and display them optimally.
        await place.fetchFields({
          fields: ['reviews', 'rating', 'userRatingCount']
        });

        const reviewsData = place.reviews;
        const ratingData = place.rating;
        const totalData = place.userRatingCount;

        if (reviewsData && Array.isArray(reviewsData)) {
          const mappedReviews: Review[] = reviewsData.map((r: any) => ({
            author_name: r.authorAttribution?.displayName || 'Anonymous',
            profile_photo_url: r.authorAttribution?.photoUri || '',
            rating: r.rating,
            relative_time_description: r.relativePublishTimeDescription || '',
            text: r.text || r.originalText || ''
          }));

          // Sort: Written reviews first, then by rating
          const sortedReviews = mappedReviews.sort((a, b) => {
             const aHasText = a.text && a.text.length > 0;
             const bHasText = b.text && b.text.length > 0;
             if (aHasText && !bHasText) return -1;
             if (!aHasText && bHasText) return 1;
             return b.rating - a.rating;
          });
          
          setReviews(sortedReviews);
        }

        if (ratingData) setRating(ratingData);
        if (totalData) setTotalRatings(totalData);
        setLoading(false);

      } catch (error) {
        console.error("Google Places API Error:", error);
        setLoading(false);
      }
    };

    fetchReviews();
  }, [apiLoaded]);

  // Infinite Auto-Scroll Logic
  useEffect(() => {
    const container = scrollContainerRef.current;
    // Don't animate if no container, loading, no reviews, or user is interacting
    if (!container || loading || reviews.length === 0) return;

    let animationId: number;
    
    const animate = () => {
      if (!isPaused && !isMouseDown) {
        // Increment scroll
        container.scrollLeft += 0.8; // Slightly reduced speed for smoother reading
        
        // Loop Logic:
        // We duplicate reviews multiple times. 
        // When we pass the halfway point (end of 2nd set), we reset to 0 seamlessly.
        if (container.scrollLeft >= (container.scrollWidth / 2)) {
            container.scrollLeft = 0;
        }
      }
      animationId = requestAnimationFrame(animate);
    };
    
    animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, [isPaused, isMouseDown, loading, reviews]);

  // --- Mouse Drag Handlers ---
  const handleMouseDown = (e: React.MouseEvent) => {
    const container = scrollContainerRef.current;
    if (!container) return;
    
    setIsMouseDown(true);
    setIsPaused(true);
    setStartX(e.pageX - container.offsetLeft);
    setScrollLeftState(container.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsMouseDown(false);
    setIsPaused(false);
  };

  const handleMouseUp = () => {
    setIsMouseDown(false);
    setIsPaused(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isMouseDown) return;
    e.preventDefault();
    const container = scrollContainerRef.current;
    if (!container) return;
    
    const x = e.pageX - container.offsetLeft;
    const walk = (x - startX) * 2; // Scroll-fast multiplier
    container.scrollLeft = scrollLeftState - walk;
  };

  // --- Touch Handlers (Thumb Scrolling) ---
  const handleTouchStart = () => {
     setIsPaused(true);
  };

  const handleTouchEnd = () => {
     // Small delay before resuming auto-scroll to let momentum settle/feels natural
     setTimeout(() => setIsPaused(false), 1000);
  };


  if (loading) {
     return <div className="py-12 flex justify-center"><div className="w-8 h-8 border-2 border-brand border-t-transparent rounded-full animate-spin" /></div>;
  }
  
  if (reviews.length === 0) return null;

  // Duplicate reviews multiple times (x6) to ensure enough width for infinite loop on all screens
  const displayReviews = [...reviews, ...reviews, ...reviews, ...reviews, ...reviews, ...reviews];

  return (
    <section className="relative w-full py-14 md:py-16 overflow-hidden border-t border-white/5">
      
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
        
        /* Ensure cursor indicates interactivity */
        .grab-cursor { cursor: grab; }
        .grab-cursor:active { cursor: grabbing; }
      `}</style>

      {/* Background Ambience handled by parent flow wrapper */}

      <div className="relative z-10 max-w-7xl mx-auto px-4 mb-8 md:mb-10 flex flex-col items-center text-center">
         
         {/* Google Badge - Updated Style with proper Logo */}
         <div className="mb-5 md:mb-6 animate-fade-in hover:scale-105 transition-transform duration-300">
            <a 
              href={OFFICE_LOCATION.googleMapsUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-4 bg-white hover:bg-gray-50 border border-gray-200 rounded-full pl-2 pr-6 py-2 shadow-[0_0_20px_rgba(255,255,255,0.1)] transition-all cursor-pointer"
            >
               {/* Logo Circle */}
               <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shrink-0 shadow-sm border border-gray-100">
                  <div className="w-6 h-6">
                     <GoogleLogo />
                  </div>
               </div>
               
               {/* Text Info */}
               <div className="flex flex-col items-start leading-none gap-1">
                   <div className="flex items-center gap-1.5">
                      <span className="font-bold text-gray-900 text-sm">Excellent</span>
                      <div className="flex">
                          {[...Array(5)].map((_, i) => (
                              <Star 
                                key={i} 
                                className={`w-3.5 h-3.5 ${i < Math.round(rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
                              />
                          ))}
                      </div>
                   </div>
                   <div className="flex items-center gap-1 text-[11px] text-gray-500 font-medium">
                      <span className="text-gray-900 font-bold">{rating.toFixed(1)}/5</span>
                      <span>•</span>
                      <span>Based on {totalRatings} reviews</span>
                   </div>
               </div>
            </a>
         </div>

         <div className="flex flex-col items-center">
            <span className="font-serif italic text-white/95 text-[clamp(1.75rem,3.4vw,3rem)] leading-[1.1] tracking-normal">
              What people say
            </span>
            <span
              className="hero-automation-text mt-1 inline-block leading-none text-[clamp(2.1rem,4.8vw,4.5rem)]"
              data-text="BEHIND OUR BACK."
            >
              BEHIND OUR BACK.
            </span>
         </div>
         <p className="mt-5 text-gray-400 text-sm md:text-base font-light tracking-wide leading-relaxed max-w-xl mx-auto">
            Don't take our word for it. Trust the internet.
         </p>
      </div>

      {/* Scrollable Container */}
      <div className="relative w-full">
         
         {/* Fade Masks for Edges */}
         <div className="absolute top-0 left-0 h-full w-12 md:w-32 bg-gradient-to-r from-black/95 to-transparent z-20 pointer-events-none" />
         <div className="absolute top-0 right-0 h-full w-12 md:w-32 bg-gradient-to-l from-black/95 to-transparent z-20 pointer-events-none" />

         <div 
            ref={scrollContainerRef}
            className="flex gap-6 overflow-x-auto hide-scrollbar pb-8 px-4 grab-cursor"
            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseLeave}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            style={{ 
                scrollBehavior: 'auto', // Disable smooth scroll to allow JS frame updates
                WebkitOverflowScrolling: 'touch' // Smooth momentum on iOS
            }} 
         >
            {displayReviews.map((review, i) => (
               <div 
                  key={i} 
                  className="
                    w-[280px] sm:w-[320px] md:w-[380px] flex-shrink-0 
                    bg-[#0F0F12]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-5 sm:p-6 md:p-8
                    transition-all duration-300 hover:border-[#A452FF]/40 hover:bg-[#141419]
                    flex flex-col justify-between select-none
                  "
               >
                  {/* Header: Author Info */}
                  <div className="flex justify-between items-start mb-4">
                     <div className="flex items-center gap-3">
                        {review.profile_photo_url ? (
                           <img 
                              src={review.profile_photo_url} 
                              alt={review.author_name} 
                              className="w-10 h-10 rounded-full object-cover border border-white/10 pointer-events-none"
                           />
                        ) : (
                           <div className="w-10 h-10 rounded-full bg-brand/20 flex items-center justify-center text-brand font-bold text-lg">
                              {review.author_name.charAt(0)}
                           </div>
                        )}
                        <div>
                           <div className="font-bold text-white text-sm truncate max-w-[140px]">{review.author_name}</div>
                           <div className="text-gray-500 text-[10px]">{review.relative_time_description}</div>
                        </div>
                     </div>
                     
                     <div className="flex gap-0.5">
                        {[...Array(5)].map((_, starIndex) => (
                           <Star 
                              key={starIndex} 
                              className={`w-3.5 h-3.5 ${starIndex < review.rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-700'}`} 
                           />
                        ))}
                     </div>
                  </div>

                  {/* Body: Review Text */}
                  <div className="relative flex-1">
                     {review.text ? (
                        <>
                           <Quote className="absolute -top-1 -left-1 w-4 h-4 text-gray-700 transform scale-x-[-1] opacity-50" />
                           <p className="text-gray-300 text-sm leading-relaxed pl-4 line-clamp-4 font-light">
                              {review.text}
                           </p>
                        </>
                     ) : (
                        <div className="h-full flex items-center justify-center min-h-[80px]">
                           <div className="flex flex-col items-center gap-1 opacity-40">
                              <Star className="w-5 h-5" />
                              <p className="text-xs italic">Rated 5.0</p>
                           </div>
                        </div>
                     )}
                  </div>
                  
                  {/* Google Icon Footer */}
                  <div className="mt-6 flex items-center gap-2 opacity-50">
                     <div className="w-4 h-4 grayscale opacity-70">
                        <GoogleLogo />
                     </div>
                     <span className="text-[10px] text-gray-500 font-medium">Posted on Google</span>
                  </div>

               </div>
            ))}
            
            {/* View All Card - Helps address the 'not all reviews' issue by linking out */}
            <div className="
                w-[280px] sm:w-[320px] md:w-[380px] flex-shrink-0 
                bg-[#0F0F12]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6 md:p-8
                flex flex-col justify-center items-center text-center gap-4
                cursor-pointer hover:border-[#A452FF] transition-all group
            "
            onClick={() => window.open(OFFICE_LOCATION.googleMapsUrl, '_blank')}
            >
                <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <div className="w-10 h-10">
                        <GoogleLogo />
                    </div>
                </div>
                <h3 className="text-xl font-bold text-white">Read All {totalRatings} Reviews</h3>
                <p className="text-gray-400 text-sm">See what everyone else is saying on our Google Business Profile.</p>
                <span className="text-brand font-bold text-sm mt-2">View on Maps &rarr;</span>
            </div>

         </div>
      </div>
    </section>
  );
};
