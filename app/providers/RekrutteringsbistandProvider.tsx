'use client';

import { SidebarProvider } from '../../components/ui/sidebar';
import { rekbisError } from '../../util/rekbisError';
import { useBruker } from '../api/bruker/useBruker';
import { useModiaAktivEnhet } from '../api/modia/context/useModiaAktivEnhet';
import { useDecoratorData } from '../api/modia/decorator/useDecoratorData';
import SWRLaster from '../components/SWRLaster';
import ErrorBoundary from '../components/feilhåndtering/ErrorBoundary';
import { AppNavigasjon } from '../components/layout/AppNavigasjon';
import { ApplikasjonContextProvider } from './ApplikasjonContext';
import { KandidatNavigeringProvider } from './KandidatNavigeringContext';
import NavigasjonsBlockerProvider from './NavigasjonsBlockerProvider';
import { ThemeProvider } from './ThemeProvider';
import { NuqsAdapter } from 'nuqs/adapters/next/app';
import * as React from 'react';
import { SWRConfig } from 'swr';

export interface RekrutteringsbistandProviderProps {
  children?: React.ReactNode | undefined;
}

const RekrutteringsbistandProvider: React.FC<
  RekrutteringsbistandProviderProps
> = ({ children }) => {
  const brukerHook = useBruker();
  const dekoratørHook = useDecoratorData();
  const modiaAktivEnhetHook = useModiaAktivEnhet();

  return (
    <ThemeProvider>
      <SWRConfig
        value={{
          revalidateOnFocus: true,
          revalidateOnMount: true,
          dedupingInterval: 0,
          refreshInterval: 0,
          provider: () => new Map(), // Forces a new cache for each page load
        }}
      >
        <SWRLaster hooks={[brukerHook, dekoratørHook, modiaAktivEnhetHook]}>
          {(bruker, dekoratørData, aktivEnhetData) => {
            const brukerData = {
              ...dekoratørData,
              roller: bruker?.roller ?? [],
            };

            if (!bruker || !dekoratørData) {
              throw new rekbisError({
                beskrivelse: 'Fant ikke bruker eller dekoratør',
              });
            }
            return (
              <ApplikasjonContextProvider
                brukerData={brukerData}
                aktivEnhet={aktivEnhetData?.aktivEnhet ?? null}
              >
                <ErrorBoundary>
                  <NavigasjonsBlockerProvider>
                    <NuqsAdapter>
                      <SidebarProvider>
                        <AppNavigasjon />
                        <KandidatNavigeringProvider>
                          {children}
                        </KandidatNavigeringProvider>
                      </SidebarProvider>
                    </NuqsAdapter>
                  </NavigasjonsBlockerProvider>
                </ErrorBoundary>
              </ApplikasjonContextProvider>
            );
          }}
        </SWRLaster>
      </SWRConfig>
    </ThemeProvider>
  );
};

export default RekrutteringsbistandProvider;
