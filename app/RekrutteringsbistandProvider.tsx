'use client';
import { NuqsAdapter } from 'nuqs/adapters/next/app';
import * as React from 'react';
import { useBruker } from './api/bruker/useBruker';
import { useDecoratorData } from './api/decorator/useDecoratorData';
import { ApplikasjonContextProvider } from './ApplikasjonContext';
import ErrorBoundary from './components/feilhåndtering/ErrorBoundary';
import { KandidatNavigeringProvider } from './components/KandidatNavigeringContext';
import Sidelaster from './components/Sidelaster';
import { VarslingContextProvider } from './components/varsling/Varsling';

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
    return <div>Fant ikke brukerdata</div>;
  }

  return (
    <ErrorBoundary>
      <NuqsAdapter>
        <VarslingContextProvider>
          <ApplikasjonContextProvider
            brukerData={{
              ...dekoratørHook.data,
              roller: brukerHook.data?.roller ?? [],
            }}
          >
            <KandidatNavigeringProvider>{children}</KandidatNavigeringProvider>
          </ApplikasjonContextProvider>
        </VarslingContextProvider>
      </NuqsAdapter>
    </ErrorBoundary>
  );
};

export default RekrutteringsbistandProvider;
