import ErrorBoundary from '@/components/feilhåndtering/ErrorBoundary';
import Feilmelding from '@/components/feilhåndtering/Feilmelding';
import { RekbisError } from '@/util/rekbisError';
import { logger } from '@navikt/next-logger';
import { expect, test } from '@playwright/test';
import { mock } from 'node:test';
import React from 'react';

test.afterEach(() => {
  mock.restoreAll();
  Reflect.deleteProperty(globalThis, 'window');
});

test('RekbisError logger også innpakkede chunkfeil som info', () => {
  const info = mock.method(logger, 'info', () => {});
  const error = mock.method(logger, 'error', () => {});
  const feil = new Error('Failed to load chunk /_next/static/chunks/a.js');

  new RekbisError({ message: feil.message });
  new RekbisError({ message: 'Innpakket feil', error: feil });

  expect(info.mock.callCount()).toBe(2);
  expect(error.mock.callCount()).toBe(0);
});

for (const visning of ['Feilmelding', 'ErrorBoundary'] as const) {
  test(`${visning} logger chunkfeil som info, også når omlasting sperres`, () => {
    const info = mock.method(logger, 'info', () => {});
    const error = mock.method(logger, 'error', () => {});
    mock.method(React, 'useEffect', (effekt: React.EffectCallback) => {
      effekt();
    });
    mock.method(React, 'useState', () => [false, () => {}]);

    const lagret = new Map<string, string>();
    let omlastinger = 0;
    Object.defineProperty(globalThis, 'window', {
      configurable: true,
      value: {
        sessionStorage: {
          getItem: (nøkkel: string) => lagret.get(nøkkel) ?? null,
          setItem: (nøkkel: string, verdi: string) => lagret.set(nøkkel, verdi),
        },
        location: { reload: () => omlastinger++ },
      },
    });

    const feil = new Error(
      'Failed to load chunk /_next/static/chunks/1pstezan3liz3.js from module 242581',
    );
    const visFeil = () => {
      if (visning === 'Feilmelding') {
        return Feilmelding({ error: feil, message: feil.message });
      }
      const grense = new ErrorBoundary({});
      grense.componentDidCatch(feil);
      grense.state = ErrorBoundary.getDerivedStateFromError(feil);
      return grense.render();
    };

    expect(visFeil()).toBeTruthy();
    expect(omlastinger).toBe(1);
    expect(visFeil()).toBeTruthy();
    expect(omlastinger).toBe(1);
    expect(error.mock.callCount()).toBe(0);
    expect(info.mock.callCount()).toBe(2);
    expect(info.mock.calls[0].arguments).toEqual(['Chunkfeil oppdaget']);
  });

  test(`${visning} beholder error-logging av andre feil`, () => {
    const info = mock.method(logger, 'info', () => {});
    const error = mock.method(logger, 'error', () => {});
    mock.method(React, 'useEffect', (effekt: React.EffectCallback) => {
      effekt();
    });
    mock.method(React, 'useState', () => [false, () => {}]);

    const feil = new Error('Uventet feil');
    if (visning === 'Feilmelding') {
      Object.defineProperty(globalThis, 'window', {
        configurable: true,
        value: { location: { pathname: '/kandidat' } },
      });
      Feilmelding({ error: feil, message: feil.message });
      expect(error.mock.calls[0].arguments[0]).toMatchObject({
        url: '/kandidat',
        komponent: 'Feilmelding',
        err: feil,
      });
    } else {
      new ErrorBoundary({}).componentDidCatch(feil);
    }

    expect(error.mock.callCount()).toBe(1);
    expect(info.mock.callCount()).toBe(0);
  });
}
