'use client';
import { NuqsAdapter } from 'nuqs/adapters/next/app';
import * as React from 'react';
import { ApplikasjonContextProvider, BrukerData } from './ApplikasjonContext';
import ErrorBoundary from './components/feilhåndtering/ErrorBoundary';

export interface RekrutteringsbistandProps {
  children?: React.ReactNode | undefined;
  brukerData: BrukerData;
}

const RekrutteringsbistandProvider: React.FC<RekrutteringsbistandProps> = ({
  children,
  brukerData,
}) => {
  return (
    <ErrorBoundary>
      <NuqsAdapter>
        <ApplikasjonContextProvider brukerData={brukerData}>
          {children}
        </ApplikasjonContextProvider>
      </NuqsAdapter>
    </ErrorBoundary>
  );
};

export default RekrutteringsbistandProvider;
