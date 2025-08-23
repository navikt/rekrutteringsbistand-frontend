import { StillingsContextProvider } from './StillingsContext';
import StillingSideLayout from './StillingssideLayout';
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
      <StillingSideLayout>{children}</StillingSideLayout>
    </StillingsContextProvider>
  );
}
