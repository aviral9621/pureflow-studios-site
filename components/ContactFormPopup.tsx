
import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { X, Mail, Check, ChevronDown } from 'lucide-react';
import { AnimationScene } from './AnimationScene';

interface ContactFormPopupProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  originRect: DOMRect | null;
}

const SERVICE_OPTIONS = ["Software/CRM", "Website", "Apps", "Social Media", "Paid Ads", "Other"];

export const ContactFormPopup: React.FC<ContactFormPopupProps> = ({ isOpen, onClose, title, originRect }) => {
  // State for mounting/unmounting the component in the DOM
  const [isRendered, setIsRendered] = useState(false);
  // State for driving the CSS classes for animation (closed -> opening -> open -> closing)
  const [animationState, setAnimationState] = useState<'idle' | 'opening' | 'open' | 'closing'>('idle');
  
  // Form Logic
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [selectedService, setSelectedService] = useState('');
  const [isServiceDropdownOpen, setIsServiceDropdownOpen] = useState(false);
  const [formErrors, setFormErrors] = useState<{[key: string]: string}>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Refs for DOM manipulation and Focus Trap
  const modalRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const formTitle = title.includes('Strategy') ? 'STRATEGY CALL REQUEST' : 'DEMO REQUEST';

  // --- Animation Lifecycle Logic ---
  useEffect(() => {
    if (isOpen) {
      setIsRendered(true);
      // Small delay to allow DOM to mount before starting animation
      requestAnimationFrame(() => {
        setAnimationState('opening');
        // Trigger reflow/next frame to transition to 'open'
        requestAnimationFrame(() => {
          setAnimationState('open');
        });
      });
      
      // Reset form on open
      setFormData({ name: '', email: '', phone: '', message: '' });
      setSelectedService('');
      setFormErrors({});
      setIsSubmitted(false);
    } else {
      if (isRendered) {
        setAnimationState('closing');
        // Wait for animation (450ms) to finish before unmounting
        const timer = setTimeout(() => {
          setIsRendered(false);
          setAnimationState('idle');
        }, 450);
        return () => clearTimeout(timer);
      }
    }
  }, [isOpen]);

  // --- "Genie" Position Calculation Logic ---
  useLayoutEffect(() => {
    // We only calculate this when the modal is about to open or currently closing
    if ((animationState === 'opening' || animationState === 'closing') && originRect && modalRef.current) {
      const modal = modalRef.current;
      
      // 1. Get Viewport Center
      const viewportW = window.innerWidth;
      const viewportH = window.innerHeight;
      const centerX = viewportW / 2;
      const centerY = viewportH / 2;

      // 2. Get Button Center (Origin)
      const btnCenterX = originRect.left + originRect.width / 2;
      const btnCenterY = originRect.top + originRect.height / 2;

      // 3. Calculate Delta (Distance from center to button)
      const deltaX = btnCenterX - centerX;
      const deltaY = btnCenterY - centerY;

      // 4. Set CSS Custom Properties for the transform
      // We set these on the element so CSS can use var(--delta-x)
      modal.style.setProperty('--delta-x', `${deltaX}px`);
      modal.style.setProperty('--delta-y', `${deltaY}px`);
      
      // Optional: Calculate start scale based on button size vs modal size (approximate)
      // A width of 500px is the max-width of modal. Button is approx 150px.
      const scaleStart = originRect.width / 500; 
      modal.style.setProperty('--scale-start', `${Math.max(0.1, scaleStart)}`);
    }
  }, [animationState, originRect, isRendered]);

  // --- Accessibility: Focus Trap & Esc Key ---
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      
      // Simple Focus Trap
      if (e.key === 'Tab' && containerRef.current) {
        const focusableElements = containerRef.current.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const firstElement = focusableElements[0] as HTMLElement;
        const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    // Focus the first input on open
    const timer = setTimeout(() => {
       const firstInput = containerRef.current?.querySelector('input');
       firstInput?.focus();
    }, 100);

    return () => {
        document.removeEventListener('keydown', handleKeyDown);
        clearTimeout(timer);
    };
  }, [isOpen, onClose]);


  const validateForm = () => {
      const errors: any = {};
      if (!formData.name) errors.name = "Name is required";
      if (!formData.phone || formData.phone.length < 10) errors.phone = "Valid phone required";
      if (!formData.email || !formData.email.includes('@')) errors.email = "Valid email required";
      if (!selectedService) errors.service = "Please select a service";
      setFormErrors(errors);
      return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
       setIsSubmitted(true);
    }
  };

  if (!isRendered) return null;

  return (
    <div 
        className="fixed inset-0 z-[100] flex items-center justify-center p-4"
        ref={containerRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
    >
      {/* Styles for the specific Genie/Scale Animation */}
      <style>{`
        .modal-backdrop {
            transition: opacity 450ms cubic-bezier(0.19, 1, 0.22, 1);
        }
        
        .modal-card {
            transition: transform 450ms cubic-bezier(0.19, 1, 0.22, 1), 
                        opacity 450ms cubic-bezier(0.19, 1, 0.22, 1), 
                        border-radius 450ms cubic-bezier(0.19, 1, 0.22, 1);
            will-change: transform, opacity, border-radius;
            transform-origin: center center;
        }

        /* Initial State (Hidden inside button) */
        .modal-card.state-opening, 
        .modal-card.state-closing {
            transform: translate(var(--delta-x), var(--delta-y)) scale(var(--scale-start, 0.2));
            opacity: 0;
            border-radius: 60px; /* Highly rounded to look like a bubble/button */
        }

        /* Active State (Centered & Expanded) */
        .modal-card.state-open {
            transform: translate(0, 0) scale(1);
            opacity: 1;
            border-radius: 24px; /* Matches standard card radius */
        }
      `}</style>

      {/* Backdrop */}
      <div 
        className={`absolute inset-0 bg-white/80 dark:bg-[#0C0C0E]/80 backdrop-blur-md modal-backdrop ${animationState === 'open' ? 'opacity-100' : 'opacity-0'}`}
        onClick={onClose}
      />

      {/* Animated Modal Container */}
      <div 
        ref={modalRef}
        className={`
            relative w-full max-w-[500px] bg-white dark:bg-[#0F0F12] border border-gray-200 dark:border-white/10 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]
            modal-card state-${animationState}
        `}
      >
        {/* Success View Overlay */}
        {isSubmitted && (
             <div className="absolute inset-0 z-50 bg-[#0C0C0E]">
                 <AnimationScene onAnimationComplete={onClose} />
             </div>
        )}

        {/* Content Wrapper - Kept in DOM (invisible when submitted) to preserve modal height/width for animation overlay */}
        <div className={`flex flex-col h-full ${isSubmitted ? 'invisible pointer-events-none' : ''}`}>
            
            {/* Header */}
            <div className="relative px-8 pt-8 pb-4 bg-gray-50 dark:bg-[#141416] border-b border-gray-200 dark:border-white/5 shrink-0">
                <button 
                    onClick={onClose} 
                    className="absolute top-6 right-6 text-gray-400 hover:text-gray-900 dark:text-gray-500 dark:hover:text-white transition-colors z-10 p-1 hover:bg-gray-200 dark:hover:bg-white/10 rounded-full"
                    aria-label="Close Modal"
                >
                    <X className="w-5 h-5" />
                </button>
                
                <div className="text-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-1 tracking-tight" id="modal-title">
                        {formTitle}
                    </h2>
                    <div className="h-1 w-12 bg-brand mx-auto rounded-full mb-3" />
                    <p className="text-gray-500 dark:text-gray-400 text-xs">Complete the form below to proceed.</p>
                </div>
            </div>

            {/* Body */}
            <div className="p-6 md:p-8 overflow-y-auto custom-scrollbar bg-white dark:bg-[#0F0F12]">
                <form onSubmit={handleSubmit} className="space-y-4">
                    
                    <div>
                        <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5">Full Name</label>
                        <input 
                            type="text"
                            value={formData.name}
                            onChange={e => setFormData({...formData, name: e.target.value})}
                            className={`w-full bg-gray-50 dark:bg-[#1A1A1E] border ${formErrors.name ? 'border-red-500' : 'border-gray-200 dark:border-white/10'} rounded-xl px-4 py-3.5 text-gray-900 dark:text-white text-sm focus:border-brand focus:bg-white dark:focus:bg-[#1A1A1E] outline-none transition-all placeholder:text-gray-400 dark:placeholder:text-gray-600`}
                            placeholder="e.g. Rahul Sharma"
                        />
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5">Mobile Number</label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        className={`w-full bg-gray-50 dark:bg-[#1A1A1E] border ${formErrors.phone ? 'border-red-500' : 'border-gray-200 dark:border-white/10'} rounded-xl px-4 py-3.5 text-gray-900 dark:text-white text-sm focus:border-brand focus:bg-white dark:focus:bg-[#1A1A1E] outline-none transition-all placeholder:text-gray-400 dark:placeholder:text-gray-600`}
                        placeholder="+91 98765 43210"
                      />
                    </div>

                    <div>
                        <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5">Email Address</label>
                        <input 
                            type="email"
                            value={formData.email}
                            onChange={e => setFormData({...formData, email: e.target.value})}
                            className={`w-full bg-gray-50 dark:bg-[#1A1A1E] border ${formErrors.email ? 'border-red-500' : 'border-gray-200 dark:border-white/10'} rounded-xl px-4 py-3.5 text-gray-900 dark:text-white text-sm focus:border-brand focus:bg-white dark:focus:bg-[#1A1A1E] outline-none transition-all placeholder:text-gray-400 dark:placeholder:text-gray-600`}
                            placeholder="name@company.com"
                        />
                    </div>

                    <div className="relative">
                        <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5">Interested In</label>
                        <button
                            type="button"
                            onClick={() => setIsServiceDropdownOpen(!isServiceDropdownOpen)}
                            className={`w-full bg-gray-50 dark:bg-[#1A1A1E] border ${formErrors.service ? 'border-red-500' : (isServiceDropdownOpen ? 'border-brand' : 'border-gray-200 dark:border-white/10')} rounded-xl px-4 py-3.5 text-left flex justify-between items-center transition-all`}
                        >
                            <span className={`text-sm ${selectedService ? 'text-gray-900 dark:text-white' : 'text-gray-500'}`}>
                                {selectedService || "Select a service..."}
                            </span>
                            <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${isServiceDropdownOpen ? 'rotate-180' : ''}`} />
                        </button>

                        {isServiceDropdownOpen && (
                            <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-[#1A1A1E] border border-gray-200 dark:border-white/10 rounded-xl shadow-xl z-20 overflow-hidden animate-[slideUp_0.2s_ease-out]">
                                {SERVICE_OPTIONS.map(opt => (
                                    <div
                                        key={opt}
                                        onClick={() => {
                                            setSelectedService(opt);
                                            setIsServiceDropdownOpen(false);
                                            setFormErrors({...formErrors, service: ''});
                                        }}
                                        className="px-4 py-3 text-sm text-gray-800 dark:text-gray-300 hover:bg-brand hover:text-white cursor-pointer flex items-center justify-between group transition-colors"
                                    >
                                        {opt}
                                        {selectedService === opt && <Check className="w-4 h-4 text-brand dark:text-white group-hover:text-white" />}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="pt-2">
                        <button
                            type="submit"
                            className="w-full py-4 bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 rounded-xl font-bold tracking-wide shadow-lg transition-all flex items-center justify-center gap-2 group transform active:scale-[0.98]"
                        >
                            <Mail className="w-4 h-4" />
                            Submit Request
                        </button>
                    </div>
                </form>
            </div>
        </div>
      </div>
    </div>
  );
};
