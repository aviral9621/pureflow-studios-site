import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';

export interface Country {
  code: string;
  name: string;
  dial_code: string;
  flag: string;
}

export const COUNTRIES: Country[] = [
  { code: 'IN', name: 'India', dial_code: '+91', flag: '🇮🇳' },
  { code: 'US', name: 'United States', dial_code: '+1', flag: '🇺🇸' },
  { code: 'GB', name: 'United Kingdom', dial_code: '+44', flag: '🇬🇧' },
  { code: 'CA', name: 'Canada', dial_code: '+1', flag: '🇨🇦' },
  { code: 'AU', name: 'Australia', dial_code: '+61', flag: '🇦🇺' },
  { code: 'AE', name: 'UAE', dial_code: '+971', flag: '🇦🇪' },
  { code: 'SG', name: 'Singapore', dial_code: '+65', flag: '🇸🇬' },
  { code: 'DE', name: 'Germany', dial_code: '+49', flag: '🇩🇪' },
];

interface CountrySelectProps {
  selected: Country;
  onSelect: (country: Country) => void;
}

export const CountrySelect: React.FC<CountrySelectProps> = ({ selected, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 bg-gray-100 hover:bg-gray-200 border-b-2 border-transparent transition-colors py-2 px-2 rounded-t-md h-full focus:outline-none"
      >
        <span className="text-lg leading-none">{selected.flag}</span>
        <span className="text-xs font-bold text-gray-700">{selected.dial_code}</span>
        <ChevronDown className={`w-3 h-3 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-1 w-64 bg-white rounded-lg shadow-xl border border-gray-100 z-50 max-h-60 overflow-y-auto custom-scrollbar">
          <div className="py-1">
            {COUNTRIES.map((country) => (
              <button
                key={country.code}
                type="button"
                onClick={() => {
                  onSelect(country);
                  setIsOpen(false);
                }}
                className={`w-full text-left px-4 py-2.5 flex items-center gap-3 hover:bg-gray-50 transition-colors ${selected.code === country.code ? 'bg-brand/5' : ''}`}
              >
                <span className="text-xl">{country.flag}</span>
                <div className="flex-1">
                  <div className="text-xs font-bold text-gray-800">{country.name}</div>
                  <div className="text-[10px] text-gray-500">{country.dial_code}</div>
                </div>
                {selected.code === country.code && <Check className="w-4 h-4 text-brand" />}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
