'use client';

import { UrlWindowConfig } from './useUrlWindow';
import WindowLoader from '@/app/_windows/WindowLoader';
import React from 'react';

// Wrapper komponent for stilling
const StillingWrapper: React.FC<{ stillingId: string }> = ({ stillingId }) => {
  const StillingsContextProvider = React.lazy(() =>
    import('@/app/stilling/[stillingsId]/StillingsContext').then((module) => ({
      default: module.StillingsContextProvider,
    })),
  );
  const StillingsSidePage = React.lazy(
    () => import('@/app/stilling/[stillingsId]/page'),
  );

  return (
    <React.Suspense fallback={<WindowLoader />}>
      <StillingsContextProvider stillingsId={stillingId}>
        <StillingsSidePage />
      </StillingsContextProvider>
    </React.Suspense>
  );
};

/**
 * Konfigurasjon for visStillingId vinduet
 */
export const visStillingWindowConfig: UrlWindowConfig = {
  urlParam: 'visStillingId',
  windowId: 'visStillingId',
  title: 'Vis stilling',
  position: 'right', // Stillings-vinduer skal havne til høyre
  createContent: (stillingId: string) => {
    return React.createElement(StillingWrapper, {
      key: `stilling-${stillingId}-${Date.now()}`,
      stillingId,
    });
  },
};
