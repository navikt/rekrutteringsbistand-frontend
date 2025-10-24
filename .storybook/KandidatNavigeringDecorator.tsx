import { KandidatNavigeringProvider as RealKandidatNavigeringProvider } from '../providers/KandidatNavigeringContext';
import React, { useState } from 'react';

/**
 * Storybook-spesifikk wrapper rundt KandidatNavigeringProvider.
 * Gir mulighet til å sette en statisk/overstyrbar kandidatNavigering-liste
 * uten å bruke sessionStorage eller URL query i stories.
 *
 * Bruk i en story:
 *  export const MedNavigering: Story = {
 *    decorators: [createKandidatNavigeringDecorator(['kandidat-1','kandidat-2'], { startIndex: 0 })],
 *    render: () => <DinKomponent />
 *  }
 */
export interface KandidatNavigeringOptions {
  /** Startindex i kandidatlisten som skal vises initialt */
  startIndex?: number;
}

export const createKandidatNavigeringDecorator = (
  kandidatIder: string[] = ['kandidat-1', 'kandidat-2', 'kandidat-3'],
  opts: KandidatNavigeringOptions = {},
) => {
  const { startIndex = 0 } = opts;

  const Decorator = (Story: any) => {
    // Vi bruker en proxy provider som kontrollerer initial navigering via sessionStorage-keyen den ekte provideren leser.
    // For å unngå side-effekter mellom stories manipulerer vi sessionStorage lokalt ved mount.
    const [init] = useState(() => {
      try {
        if (typeof window !== 'undefined') {
          sessionStorage.setItem(
            'kandidatNavigering',
            JSON.stringify(kandidatIder),
          );
          // Sett også query param hvis mulig for å simulere aktiv kandidat
          const aktivId = kandidatIder[startIndex];
          if (aktivId) {
            const url = new URL(window.location.href);
            url.searchParams.set('visKandidatId', aktivId);
            window.history.replaceState(null, '', url.toString());
          }
        }
      } catch {
        // ignorér i storybook miljø hvis sessionStorage ikke er tilgjengelig
      }
      return true;
    });

    return init ? (
      <RealKandidatNavigeringProvider>
        <Story />
      </RealKandidatNavigeringProvider>
    ) : (
      <Story />
    );
  };
  Decorator.displayName = 'KandidatNavigeringDecorator';
  return Decorator;
};

/**
 * Enkel convenience HOC-style wrapper lik de andre withX helpers.
 * Bruk: withKandidatNavigering(() => <Component />, ['id1','id2'])
 */
export const withKandidatNavigering = (
  fn: () => React.ReactNode,
  kandidatIder?: string[],
  opts?: KandidatNavigeringOptions,
) => {
  const D = createKandidatNavigeringDecorator(kandidatIder, opts);
  return (<D>{fn()}</D>) as any; // Storybook Decorator signature vs. JSX element
};
