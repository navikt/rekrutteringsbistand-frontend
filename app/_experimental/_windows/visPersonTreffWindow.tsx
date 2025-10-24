'use client';

import { UrlWindowConfig } from './useUrlWindow';
import WindowLoader from '@/app/_experimental/_windows/WindowLoader';
import { createElement, lazy, Suspense } from 'react';

const VisRekrutteringstreffPerson = lazy(
  () =>
    import(
      '@/app/rekrutteringstreff/[rekrutteringstreffId]/vis-person/_ui/VisPerson'
    ),
);

export const visPersonTreffWindowConfig: UrlWindowConfig = {
  urlParam: 'visPersonTreffId',
  windowId: 'visPersonTreff',
  allowedPaths: ['/rekrutteringstreff/'],
  title: 'Jobbsøker',
  position: 'right',
  createContent: (personTreffId: string) =>
    createElement(
      Suspense,
      { fallback: createElement(WindowLoader) },
      createElement(VisRekrutteringstreffPerson, {
        key: `${personTreffId}-${Date.now()}`,
        personTreffId,
      }),
    ),
};
