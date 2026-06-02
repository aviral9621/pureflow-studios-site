import React from 'react';
import { AiDashboardMockup } from './AiDashboardMockup';
import { HerbalCrmMockup } from './HerbalCrmMockup';

// Dispatches a designed (non-interactive) mockup by kind. Each mockup fills its
// parent (absolute inset-0), so place it inside a `relative` framed container.
export type MockupKind = 'ai-dashboard' | 'herbal-crm';

export const Mockup: React.FC<{ kind: MockupKind }> = ({ kind }) =>
  kind === 'herbal-crm' ? <HerbalCrmMockup /> : <AiDashboardMockup />;
