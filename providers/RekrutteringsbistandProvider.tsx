'use client';

import { useBruker } from '@/app/api/bruker/useBruker';
import { erSesjonUtløptFeil } from '@/app/api/fetcher';
import { useModiaAktivBruker } from '@/app/api/modia/context/useModiaAktivBruker';
import { useModiaAktivEnhet } from '@/app/api/modia/context/useModiaAktivEnhet';
import { useDecoratorData } from '@/app/api/modia/decorator/useDecoratorData';
import { KandidatSøkMarkerteContextProvider } from '@/app/kandidat/KandidatSøkMarkerteContext';
import SWRLaster from '@/components/SWRLaster';
import ErrorBoundary from '@/components/feilhåndtering/ErrorBoundary';
import Feilmelding from '@/components/feilhåndtering/Feilmelding';
import SesjonUtløptVarsel from '@/components/feilhåndtering/SesjonUtløptVarsel';
import NavigasjonWrapper from '@/components/layout/NavigasjonWrapper';
import { ApplikasjonContextProvider } from '@/providers/ApplikasjonContext';
import { KandidatNavigeringProvider } from '@/providers/KandidatNavigeringContext';
import NavigasjonsBlockerProvider from '@/providers/NavigasjonsBlockerProvider';
import { ThemeProvider } from '@/providers/ThemeProvider';
import { RekbisError } from '@/util/rekbisError';
import { NuqsAdapter } from 'nuqs/adapters/next/app';
import { FC, type ReactNode } from 'react';
import { SWRConfig } from 'swr';
import { ZodError } from 'zod';

const MAX_RETRY_ATTEMPTS = 10;

export interface RekrutteringsbistandProviderProps {
  children?: ReactNode | undefined;
}

const RekrutteringsbistandProvider: FC<RekrutteringsbistandProviderProps> = ({
  children,
}) => {
  const brukerHook = useBruker();
  const dekoratørHook = useDecoratorData();
  const modiaAktivEnhetHook = useModiaAktivEnhet();
  const modiaAktivBrukerHook = useModiaAktivBruker();

  return (
    <SWRConfig
      value={{
        revalidateOnFocus: true,
        revalidateOnMount: true,
        dedupingInterval: 0,
        refreshInterval: 0,
        provider: () => new Map(), // Forces a new cache for each page load
      }}
    >
      <ThemeProvider>
        <SWRLaster
          hooks={[
            brukerHook,
            dekoratørHook,
            modiaAktivEnhetHook,
            modiaAktivBrukerHook,
          ]}
          // Headeren (med sesjonsvarselet) rendres ikke når disse feiler
          egenFeilmelding={(error) =>
            erSesjonUtløptFeil(error) ? (
              <SesjonUtløptVarsel />
            ) : (
              <Feilmelding
                error={error}
                message='Feil ved henting av data'
                zodError={error instanceof ZodError ? error : undefined}
              />
            )
          }
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
                        <KandidatSøkMarkerteContextProvider>
                          <NavigasjonWrapper>{children}</NavigasjonWrapper>
                        </KandidatSøkMarkerteContextProvider>
                      </KandidatNavigeringProvider>
                    </NuqsAdapter>
                  </NavigasjonsBlockerProvider>
                </ErrorBoundary>
              </ApplikasjonContextProvider>
            );
          }}
        </SWRLaster>
      </ThemeProvider>
    </SWRConfig>
  );
};

export default RekrutteringsbistandProvider;
