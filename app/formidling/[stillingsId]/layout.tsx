import NotFound from '../../not-found';
import { StillingsContextProvider } from '../../stilling/[stillingsId]/StillingsContext';
import StillingSideLayout from '../../stilling/[stillingsId]/StillingssideLayout';
import * as React from 'react';

interface FormidlingSideRootLayoutProps {
  children: React.ReactNode;
  params: Promise<{ stillingsId: string }>;
}
export default async function FormidlingSideRootLayout({
  children,
  params,
}: FormidlingSideRootLayoutProps) {
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
