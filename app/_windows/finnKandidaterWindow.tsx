'use client';

import { UrlWindowConfig } from './useUrlWindow';
import WindowLoader from '@/app/_windows/WindowLoader';
import React, { FC } from 'react';

// Wrapper komponent for finn kandidater
const FinnKandidaterWrapper: FC<{ stillingsId: string }> = ({
  stillingsId,
}) => {
  const StillingsContextProvider = React.lazy(() =>
    import('@/app/stilling/[stillingsId]/StillingsContext').then((module) => ({
      default: module.StillingsContextProvider,
    })),
  );
  const FinnKandidaterForStilling = React.lazy(
    () => import('@/app/stilling/[stillingsId]/_ui/FinnKandidaterForStilling'),
  );

  return (
    <React.Suspense fallback={<WindowLoader />}>
      <StillingsContextProvider stillingsId={stillingsId}>
        <FinnKandidaterForStilling />
      </StillingsContextProvider>
    </React.Suspense>
  );
};

/**
 * Konfigurasjon for finnKandidater vinduet
 */
export const finnKandidaterWindowConfig: UrlWindowConfig = {
  urlParam: 'finnKandidater',
  windowId: 'finnKandidater',
  title: 'Finn kandidater',
  position: 'left', // Finn kandidater skal være til venstre
  createContent: (value: string) => {
    // For boolean parametere, hvis value er 'true' lager vi innholdet
    if (value !== 'true') {
      return React.createElement('div');
    }

    // Hent stillingsId fra URL
    const pathname =
      typeof window !== 'undefined' ? window.location.pathname : '';
    const stillingsIdMatch = pathname.match(/\/stilling\/([^\/]+)/);
    const stillingsId = stillingsIdMatch ? stillingsIdMatch[1] : '';

    if (!stillingsId) {
      return React.createElement(
        'div',
        { className: 'p-4' },
        'Kunne ikke finne stillings-ID',
      );
    }

    return React.createElement(FinnKandidaterWrapper, {
      key: `finn-kandidater-${stillingsId}-${Date.now()}`,
      stillingsId,
    });
  },
};
