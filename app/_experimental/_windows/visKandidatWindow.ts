'use client';

import { UrlWindowConfig } from './useUrlWindow';
import WindowLoader from '@/app/_experimental/_windows/WindowLoader';
import { createElement, lazy, Suspense } from 'react';

/**
 * Konfigurasjon for visKandidatNr vinduet
 */
export const visKandidatWindowConfig: UrlWindowConfig = {
  urlParam: 'visKandidatnr',
  windowId: 'visKandidatNr',
  title: 'Vis kandidat',
  position: 'right', // Kandidat-vinduer skal alltid havne til høyre
  allowedPaths: ['/stilling', '/kandidat'],
  createContent: (kandidatnr: string) => {
    // Dynamisk import for å unngå sirkulære avhengigheter
    const VisKandidat = lazy(
      () => import('@/app/kandidat/vis-kandidat/VisKandidat'),
    );

    return createElement(
      Suspense,
      {
        fallback: createElement(WindowLoader),
      },
      createElement(VisKandidat, {
        key: `${kandidatnr}-${Date.now()}`,
      }),
    );
  },
};
