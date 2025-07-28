'use client';

import { SidebarProvider } from '../../components/ui/sidebar';
import { RekbisError } from '../../util/rekbisError';
import { useBruker } from '../api/bruker/useBruker';
import { useModiaAktivBruker } from '../api/modia/context/useModiaAktivBruker';
import { useModiaAktivEnhet } from '../api/modia/context/useModiaAktivEnhet';
import { useDecoratorData } from '../api/modia/decorator/useDecoratorData';
import SWRLaster from '../components/SWRLaster';
import ErrorBoundary from '../components/feilhåndtering/ErrorBoundary';
import { AppNavigasjon } from '../components/layout/AppNavigasjon';
import { SplitScreenLayout } from '../components/layout/SplitScreenLayout';
import { ApplikasjonContextProvider } from './ApplikasjonContext';
import { KandidatNavigeringProvider } from './KandidatNavigeringContext';
import NavigasjonsBlockerProvider from './NavigasjonsBlockerProvider';
import { ThemeProvider } from './ThemeProvider';
import { NuqsAdapter } from 'nuqs/adapters/next/app';
import * as React from 'react';
import { SWRConfig } from 'swr';

const MAX_RETRY_ATTEMPTS = 10;

export interface RekrutteringsbistandProviderProps {
  children?: React.ReactNode | undefined;
}

const RekrutteringsbistandProvider: React.FC<
  RekrutteringsbistandProviderProps
> = ({ children }) => {
  const brukerHook = useBruker();
  const dekoratørHook = useDecoratorData();
  const modiaAktivEnhetHook = useModiaAktivEnhet();
  const modiaAktivBrukerHook = useModiaAktivBruker();
  const [retryCount, setRetryCount] = React.useState(0);

  React.useEffect(() => {
    if (retryCount < MAX_RETRY_ATTEMPTS) {
      if (window !== undefined && window?.skyra?.redactSearchParam) {
        window?.skyra?.redactSearchParam('visKandidatnr');
      } else {
        setTimeout(() => {
          setRetryCount((prevCount) => prevCount + 1);
        }, 1000); // Retry after 1 second
      }
    } else {
      new RekbisError(
        'Skyramaskering: Maximum retry attempts reached. Could not call redactSearchParam.',
      );
    }
  });

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
        <SWRLaster
          hooks={[
            brukerHook,
            dekoratørHook,
            modiaAktivEnhetHook,
            modiaAktivBrukerHook,
          ]}
        >
          {(bruker, dekoratørData, aktivEnhetData, aktivBrukerData) => {
            const brukerData = {
              ...dekoratørData,
              roller: bruker?.roller ?? [],
            };

            if (!bruker || !dekoratørData) {
              throw new RekbisError({
                message: 'Fant ikke bruker eller dekoratør',
              });
            }
            return (
              <ApplikasjonContextProvider
                brukerData={brukerData}
                aktivEnhet={aktivEnhetData?.aktivEnhet ?? null}
                aktivBruker={aktivBrukerData?.aktivBruker ?? null}
              >
                <ErrorBoundary>
                  <NavigasjonsBlockerProvider>
                    <NuqsAdapter>
                      <SidebarProvider>
                        <AppNavigasjon />
                        <KandidatNavigeringProvider>
                          <SplitScreenLayout>{children}</SplitScreenLayout>
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
