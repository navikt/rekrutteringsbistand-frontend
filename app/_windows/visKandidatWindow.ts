'use client';

import { UrlWindowConfig } from './useUrlWindow';
import WindowLoader from '@/app/_windows/WindowLoader';
import React from 'react';

/**
 * Konfigurasjon for visKandidatNr vinduet
 */
export const visKandidatWindowConfig: UrlWindowConfig = {
  urlParam: 'visKandidatnr',
  windowId: 'visKandidatNr',
  title: 'Vis kandidat',
  position: 'right', // Kandidat-vinduer skal alltid havne til høyre
  createContent: (kandidatnr: string) => {
    // Dynamisk import for å unngå sirkulære avhengigheter
    const VisKandidat = React.lazy(
      () => import('@/app/kandidat/vis-kandidat/VisKandidat'),
    );

    return React.createElement(
      React.Suspense,
      {
        fallback: React.createElement(WindowLoader),
      },
      React.createElement(VisKandidat, {
        key: `${kandidatnr}-${Date.now()}`,
        kandidatnr,
      }),
    );
  },
};
