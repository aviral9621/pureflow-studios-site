
import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export interface FAQItem {
  question: string;
  answer: string;
}

interface FAQProps {
  items?: FAQItem[];
  title?: string;
  subtitle?: string;
}

export const FAQ: React.FC<FAQProps> = ({ 
  items = [], 
  title = "Frequently asked questions",
  subtitle = "Everything you need to know about the product and billing."
}) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // If no items, render nothing
  if (!items || items.length === 0) return null;

  return (
    <div className="max-w-3xl mx-auto mt-24 lg:mt-32 px-4 relative z-10">
      {/* Subtle ambient glow for the FAQ section */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-brand/5 blur-[100px] -z-10 rounded-full" />

      <div className="text-center mb-12">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 tracking-tight">{title}</h2>
        <p className="text-gray-400 text-sm md:text-base">{subtitle}</p>
      </div>
      
      <div className="space-y-1">
        {items.map((faq, index) => (
          <div 
            key={index}
            className="border-b border-white/5 last:border-none"
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full py-5 flex items-center justify-between text-left focus:outline-none group"
              aria-expanded={openIndex === index}
            >
              <span className={`text-[13px] md:text-base font-medium transition-colors duration-300 pr-4 ${openIndex === index ? 'text-brand-light' : 'text-gray-200 group-hover:text-white'}`}>
                {faq.question}
              </span>
              <ChevronDown 
                className={`w-5 h-5 flex-shrink-0 text-gray-500 transition-all duration-300 ${openIndex === index ? 'transform rotate-180 text-brand-light' : 'group-hover:text-gray-300'}`} 
              />
            </button>
            <div 
              className={`grid transition-all duration-300 ease-in-out ${openIndex === index ? 'grid-rows-[1fr] opacity-100 pb-6' : 'grid-rows-[0fr] opacity-0'}`}
            >
              <div className="overflow-hidden">
                <p className="text-gray-400 text-[13px] md:text-sm leading-relaxed pr-4">
                  {faq.answer}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
