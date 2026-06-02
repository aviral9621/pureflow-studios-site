import React from 'react';
import { AiDashboardMockup } from './AiDashboardMockup';
import { UnskillsCrmMockup } from './UnskillsCrmMockup';

// Dispatches a designed (non-interactive) mockup by kind. Each mockup fills its
// parent (absolute inset-0), so place it inside a `relative` framed container.
export type MockupKind = 'ai-dashboard' | 'unskills-crm';

export const Mockup: React.FC<{ kind: MockupKind }> = ({ kind }) =>
  kind === 'unskills-crm' ? <UnskillsCrmMockup /> : <AiDashboardMockup />;
