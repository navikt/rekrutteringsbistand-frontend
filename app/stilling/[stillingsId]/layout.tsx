import * as React from 'react';
import { StillingsContextProvider } from './StillingsContext';
import StillingSideLayout from './StillingssideLayout';
interface StillingSideRootLayoutProps {
  children: React.ReactNode;
  params: Promise<{ stillingsId: string }>;
}
export default async function StillingSideRootLayout({
  children,
  params,
}: StillingSideRootLayoutProps) {
  const stillingsId = (await params).stillingsId;
  return (
    <StillingsContextProvider stillingsId={stillingsId}>
      <StillingSideLayout>{children}</StillingSideLayout>
    </StillingsContextProvider>
  );
}
