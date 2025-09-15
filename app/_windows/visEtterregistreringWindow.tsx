'use client';

import { UrlWindowConfig } from './useUrlWindow';
import WindowLoader from '@/app/_windows/WindowLoader';
import { createElement, FC, lazy, Suspense } from 'react';

// Wrapper komponent for stilling
const StillingWrapper: FC<{ stillingId: string }> = ({ stillingId }) => {
  const StillingsContextProvider = lazy(() =>
    import('@/app/stilling/[stillingsId]/StillingsContext').then((module) => ({
      default: module.StillingsContextProvider,
    })),
  );
  const StillingsSidePage = lazy(
    () => import('@/app/stilling/[stillingsId]/page'),
  );

  return (
    <Suspense fallback={<WindowLoader />}>
      <StillingsContextProvider stillingsId={stillingId}>
        <StillingsSidePage />
      </StillingsContextProvider>
    </Suspense>
  );
};

/**
 * Konfigurasjon for visStillingId vinduet
 */
export const visEtterregistreringWindowConfig: UrlWindowConfig = {
  urlParam: 'visEtterregistreringId',
  windowId: 'visEtterregistreringId',
  title: 'Vis etterregistrering',
  position: 'right',
  createContent: (stillingId: string) => {
    return createElement(StillingWrapper, {
      key: `etterregistrering-${stillingId}-${Date.now()}`,
      stillingId,
    });
  },
};
