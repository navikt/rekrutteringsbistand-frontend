import { StillingsContextProvider } from './StillingsContext';
import NotFound from '@/app/not-found';
import * as React from 'react';

interface StillingSideRootLayoutProps {
  children: React.ReactNode;
  params: Promise<{ stillingsId: string }>;
}
export default async function StillingSideRootLayout({
  children,
  params,
}: StillingSideRootLayoutProps) {
  const stillingsId = (await params).stillingsId;

  if (!stillingsId) {
    return <NotFound />;
  }

  return (
    <StillingsContextProvider stillingsId={stillingsId}>
      {children}
    </StillingsContextProvider>
  );
}
