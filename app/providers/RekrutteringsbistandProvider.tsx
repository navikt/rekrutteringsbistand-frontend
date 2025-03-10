'use client';

import { rekbisError } from '../../util/rekbisError';
import { useBruker } from '../api/bruker/useBruker';
import { useDecoratorData } from '../api/decorator/useDecoratorData';
import Sidelaster from '../components/Sidelaster';
import ErrorBoundary from '../components/feilhåndtering/ErrorBoundary';
import { VarslingContextProvider } from '../components/varsling/Varsling';
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

  if (brukerHook.isLoading || dekoratørHook.isLoading) {
    return <Sidelaster />;
  }

  if (!brukerHook.data || !dekoratørHook.data) {
    throw new rekbisError({ beskrivelse: 'Fant ikke bruker eller dekoratør' });
  }

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
        <ErrorBoundary>
          <NavigasjonsBlockerProvider>
            <NuqsAdapter>
              <VarslingContextProvider>
                <ApplikasjonContextProvider
                  brukerData={{
                    ...dekoratørHook.data,
                    roller: brukerHook.data?.roller ?? [],
                  }}
                >
                  <KandidatNavigeringProvider>
                    {children}
                  </KandidatNavigeringProvider>
                </ApplikasjonContextProvider>
              </VarslingContextProvider>
            </NuqsAdapter>
          </NavigasjonsBlockerProvider>
        </ErrorBoundary>
      </SWRConfig>
    </ThemeProvider>
  );
};

export default RekrutteringsbistandProvider;
