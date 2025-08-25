'use client';

import { useBruker } from '@/app/api/bruker/useBruker';
import { useModiaAktivBruker } from '@/app/api/modia/context/useModiaAktivBruker';
import { useModiaAktivEnhet } from '@/app/api/modia/context/useModiaAktivEnhet';
import { useDecoratorData } from '@/app/api/modia/decorator/useDecoratorData';
import SWRLaster from '@/components/SWRLaster';
import ErrorBoundary from '@/components/feilhåndtering/ErrorBoundary';
import NavigasjonWrapper from '@/components/layout/NavigasjonWrapper';
import WindowController from '@/components/layout/windows/WindowController';
import WindowWrapper from '@/components/layout/windows/WindowWrapper';
import { ApplikasjonContextProvider } from '@/providers/ApplikasjonContext';
import { KandidatNavigeringProvider } from '@/providers/KandidatNavigeringContext';
import NavigasjonsBlockerProvider from '@/providers/NavigasjonsBlockerProvider';
import { ThemeProvider } from '@/providers/ThemeProvider';
import { RekbisError } from '@/util/rekbisError';
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
    // Kjør kun én gang – ellers risikerer vi at query-param fjernes rett etter at WindowController har åpnet vindu
    if (retryCount < MAX_RETRY_ATTEMPTS) {
      if (typeof window !== 'undefined' && window?.skyra?.redactSearchParam) {
        try {
          window.skyra.redactSearchParam('visKandidatnr');
        } catch (e) {
          // eslint-disable-next-line no-console
          console.warn('Klarte ikke å kalle redactSearchParam', e);
        }
      } else {
        const t = setTimeout(() => {
          setRetryCount((prevCount) => prevCount + 1);
        }, 1000);
        return () => clearTimeout(t);
      }
    } else {
      new RekbisError(
        'Skyramaskering: Maximum retry attempts reached. Could not call redactSearchParam.',
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
                      <KandidatNavigeringProvider>
                        <NavigasjonWrapper>
                          <WindowWrapper>
                            {/* Controller som åpner/lukker dynamiske vinduer basert på query params */}
                            <WindowController />
                            {children}
                          </WindowWrapper>
                        </NavigasjonWrapper>
                      </KandidatNavigeringProvider>
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
