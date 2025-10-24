'use client';

import { UrlWindowConfig } from './useUrlWindow';
import WindowLoader from '@/app/_experimental/_windows/WindowLoader';
import { createElement, FC, lazy, Suspense } from 'react';

// Wrapper komponent for finn kandidater
const FinnKandidaterWrapper: FC<{ stillingsId: string }> = ({
  stillingsId,
}) => {
  const StillingsContextProvider = lazy(() =>
    import('@/app/stilling/[stillingsId]/StillingsContext').then((module) => ({
      default: module.StillingsContextProvider,
    })),
  );
  const FinnKandidaterForStilling = lazy(
    () =>
      import(
        '@/app/stilling/[stillingsId]/finn-kandidater/FinnKandidaterForStilling'
      ),
  );

  return (
    <Suspense fallback={<WindowLoader />}>
      <StillingsContextProvider stillingsId={stillingsId}>
        <FinnKandidaterForStilling />
      </StillingsContextProvider>
    </Suspense>
  );
};

/**
 * Konfigurasjon for finnKandidater vinduet
 */
export const finnKandidaterWindowConfig: UrlWindowConfig = {
  urlParam: 'finnKandidater',
  windowId: 'finnKandidater',
  title: 'Finn jobbsøkere',
  position: 'left', // Finn kandidater skal være til venstre
  allowedPaths: ['/stilling'],
  createContent: (value: string) => {
    // For boolean parametere, hvis value er 'true' lager vi innholdet
    if (value !== 'true') {
      return createElement('div');
    }

    // Hent stillingsId fra URL
    const pathname =
      typeof window !== 'undefined' ? window.location.pathname : '';
    const stillingsIdMatch = pathname.match(/\/stilling\/([^\/]+)/);
    const stillingsId = stillingsIdMatch ? stillingsIdMatch[1] : '';

    if (!stillingsId) {
      return createElement(
        'div',
        { className: 'p-4' },
        'Kunne ikke finne stillings-ID',
      );
    }

    return createElement(FinnKandidaterWrapper, {
      key: `finn-kandidater-${stillingsId}-${Date.now()}`,
      stillingsId,
    });
  },
};
