
import React, { useState } from 'react';
import { PricingPlan, ViewState } from '../types';
import { CheckIcon } from './CheckIcon';
import { ArrowRight } from 'lucide-react';

interface PricingCardProps {
  plan: PricingPlan;
  onViewChange?: (view: ViewState) => void;
}

export const PricingCard: React.FC<PricingCardProps> = ({ plan, onViewChange }) => {
  const {
    name,
    monthlyPriceDisplay,
    yearlyTotalDisplay,
    priceDisplay,
    isOneTime,
    description,
    features,
    isPopular,
    buttonText,
    subtitleTag
  } = plan;

  return (
    <div
      className={`
        relative flex flex-col h-full p-8 rounded-3xl transition-all duration-300
        ${isPopular 
          ? 'bg-white dark:bg-white/5 border border-brand shadow-xl dark:shadow-[0_0_40px_-10px_rgba(106,13,173,0.3)] scale-100 z-10 lg:scale-105 hover:shadow-2xl dark:hover:shadow-[0_0_60px_-10px_rgba(164,82,255,0.4)]' 
          : 'bg-white dark:bg-white/[0.02] border border-gray-200 dark:border-white/10 hover:border-gray-300 dark:hover:border-white/20 hover:bg-gray-50 dark:hover:bg-white/[0.04] z-0 shadow-lg dark:shadow-[0_0_20px_-10px_rgba(255,255,255,0.05)]'
        }
      `}
    >
      {/* Popular Badge */}
      {isPopular && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
          <span className="bg-brand text-white text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full shadow-lg shadow-brand/40 animate-pulse-slow">
            Popular
          </span>
        </div>
      )}

      {/* Header */}
      <div className="mb-8">
        <h3 className="text-lg font-medium text-gray-800 dark:text-gray-300 mb-2">{name}</h3>
        
        {/* Subtitle Tag (e.g., Guaranteed Growth) */}
        {subtitleTag && (
           <div className="inline-block px-2.5 py-0.5 rounded bg-green-500/10 border border-green-500/20 text-[10px] font-bold text-green-600 dark:text-green-400 uppercase tracking-wide mb-3">
             {subtitleTag}
           </div>
        )}

        {description && (
          <p className="text-sm text-gray-500 font-medium leading-relaxed mb-6 min-h-[40px]">
             {description}
          </p>
        )}
        
        {/* Spacer if no description but we need layout consistency */}
        {!description && <div className="h-4"></div>}

        <div className="flex items-baseline gap-1 mt-2">
          {isOneTime ? (
             <span className="text-4xl font-bold text-gray-900 dark:text-white tracking-tight">₹{priceDisplay}</span>
          ) : (
            <>
               <span className="text-4xl font-bold text-gray-900 dark:text-white tracking-tight">₹{monthlyPriceDisplay}</span>
               <span className="text-gray-500 dark:text-gray-400 text-sm font-medium">/mo</span>
            </>
          )}
        </div>
        
        {/* Billed Yearly or One-time text */}
        <div className="min-h-[20px]">
          {isOneTime ? (
             <p className="text-sm text-gray-500 mt-2 font-medium">
               One-time payment
             </p>
          ) : (
             yearlyTotalDisplay ? (
               <p className="text-sm text-gray-500 mt-2 font-medium">
                 Billed yearly at ₹{yearlyTotalDisplay}
               </p>
             ) : (
               <p className="text-sm text-gray-500 mt-2 font-medium opacity-0">.</p>
             )
          )}
        </div>
      </div>

      {/* CTA Button */}
      <button
        className={`
          w-full py-3.5 px-6 rounded-xl text-sm font-bold tracking-wide transition-all duration-200
          ${isPopular
            ? 'bg-brand hover:bg-brand-light text-white shadow-lg shadow-brand/25 hover:shadow-brand/40'
            : 'bg-gray-100 dark:bg-white text-gray-900 dark:text-black hover:bg-gray-200 dark:hover:bg-gray-200 border border-gray-200 dark:border-transparent'
          }
        `}
      >
        {buttonText}
      </button>

      {/* Divider */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-gray-200 dark:via-white/10 to-transparent my-8" />

      {/* Features */}
      <div className="flex-1">
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-6">
          You get:
        </p>
        <ul className="space-y-4">
          {features.map((feature, idx) => (
            <li key={idx} className="flex items-start gap-3 group">
              <div className={`
                mt-0.5 flex-shrink-0 rounded-full p-0.5
                ${feature.highlight ? 'text-brand' : 'text-gray-400 group-hover:text-gray-600 dark:group-hover:text-white transition-colors'}
              `}>
                <CheckIcon />
              </div>
              <div className="flex flex-col">
                <span className={`text-sm leading-relaxed ${feature.highlight ? 'text-gray-900 dark:text-white font-medium' : 'text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300'}`}>
                  {feature.text}
                </span>
                {/* Link support */}
                {feature.link && (
                  <button 
                    onClick={() => onViewChange && onViewChange(feature.link!.view)}
                    className="text-[10px] text-brand hover:text-brand-light underline underline-offset-2 text-left mt-0.5 flex items-center gap-1"
                  >
                    {feature.link.text} <ArrowRight className="w-2.5 h-2.5" />
                  </button>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
