import React from 'react';
import { Check } from 'lucide-react';

export const CheckIcon = ({ className = "" }: { className?: string }) => (
  <Check className={`w-5 h-5 ${className}`} strokeWidth={2.5} />
);