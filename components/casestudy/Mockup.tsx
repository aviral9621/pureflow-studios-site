import React from 'react';
import { AiDashboardMockup } from './AiDashboardMockup';
import { UnskillsCrmMockup } from './UnskillsCrmMockup';
import { SmartAgroCrmMockup } from './SmartAgroCrmMockup';

// Dispatches a designed (non-interactive) mockup by kind. Each mockup fills its
// parent (absolute inset-0), so place it inside a `relative` framed container.
export type MockupKind = 'ai-dashboard' | 'unskills-crm' | 'smart-agro';

export const Mockup: React.FC<{ kind: MockupKind }> = ({ kind }) => {
  if (kind === 'unskills-crm') return <UnskillsCrmMockup />;
  if (kind === 'smart-agro') return <SmartAgroCrmMockup />;
  return <AiDashboardMockup />;
};
