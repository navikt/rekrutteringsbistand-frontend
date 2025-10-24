'use client';

import { UrlWindowConfig } from './useUrlWindow';
import WindowLoader from '@/app/_experimental/_windows/WindowLoader';
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
export const visStillingWindowConfig: UrlWindowConfig = {
  urlParam: 'visStillingId',
  windowId: 'visStillingId',
  title: 'Vis stilling',
  position: 'right', // Stillings-vinduer skal havne til høyre
  allowedPaths: ['/kandidat', '/etterregistrering', '/stilling'],
  createContent: (stillingId: string) => {
    return createElement(StillingWrapper, {
      key: `stilling-${stillingId}-${Date.now()}`,
      stillingId,
    });
  },
};
