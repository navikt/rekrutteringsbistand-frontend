import * as React from 'react';
import { useUseKandidatlisteInfo } from '../../api/kandidat/useKandidatlisteInfo';
import NotFound from '../../not-found';
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

  if (!stillingsId) {
    return <NotFound />;
  }

  const hook = useUseKandidatlisteInfo(stillingsId);

  console.log('🎺 hook', hook);
  return (
    <StillingsContextProvider stillingsId={stillingsId}>
      <StillingSideLayout>{children}</StillingSideLayout>
    </StillingsContextProvider>
  );
}
