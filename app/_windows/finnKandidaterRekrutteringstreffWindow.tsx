'use client';

import { UrlWindowConfig } from './useUrlWindow';
import WindowLoader from '@/app/_windows/WindowLoader';
import { createElement, FC, lazy, Suspense } from 'react';

const FinnKandidaterForRekrutteringstreffWrapper: FC<{
  rekrutteringstreffId: string;
}> = ({ rekrutteringstreffId }) => {
  const RekrutteringstreffContextProvider = lazy(() =>
    import(
      '@/app/rekrutteringstreff/[rekrutteringstreffId]/RekrutteringstreffContext'
    ).then((module) => ({
      default: module.RekrutteringstreffContextProvider,
    })),
  );

  const RekrutteringstreffForm = lazy(() =>
    import(
      '@/app/rekrutteringstreff/[rekrutteringstreffId]/RekrutteringstreffForm'
    ).then((module) => ({
      default: module.default,
    })),
  );

  const FinnKandidaterForRekrutteringstreff = lazy(
    () =>
      import(
        '@/app/rekrutteringstreff/[rekrutteringstreffId]/finn-kandidater/FinnKandidaterForRekrutteringstreff'
      ),
  );

  return (
    <Suspense fallback={<WindowLoader />}>
      <RekrutteringstreffContextProvider
        rekrutteringstreffId={rekrutteringstreffId}
      >
        <RekrutteringstreffForm rekrutteringstreffId={rekrutteringstreffId}>
          <FinnKandidaterForRekrutteringstreff />
        </RekrutteringstreffForm>
      </RekrutteringstreffContextProvider>
    </Suspense>
  );
};

export const finnKandidaterRekrutteringstreffWindowConfig: UrlWindowConfig = {
  urlParam: 'finnKandidaterTreff',
  windowId: 'finnKandidaterTreff',
  title: 'Finn jobbsøkere',
  position: 'left',
  createContent: (value: string) => {
    if (value !== 'true') {
      return createElement('div');
    }

    const pathname =
      typeof window !== 'undefined' ? window.location.pathname : '';
    const treffMatch = pathname.match(/\/rekrutteringstreff\/([^\/]+)/);
    const rekrutteringstreffId = treffMatch ? treffMatch[1] : '';

    if (!rekrutteringstreffId) {
      return createElement(
        'div',
        { className: 'p-4' },
        'Kunne ikke finne rekrutteringstreff-ID',
      );
    }

    return createElement(FinnKandidaterForRekrutteringstreffWrapper, {
      key: `finn-kandidater-treff-${rekrutteringstreffId}-${Date.now()}`,
      rekrutteringstreffId,
    });
  },
};
