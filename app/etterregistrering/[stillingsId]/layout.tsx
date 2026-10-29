import NotFound from '@/app/not-found';
import { StillingsContextProvider } from '@/app/stilling/[stillingsId]/StillingsContext';
import { sidetittel } from '@/util/sidetittel';
import type { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = { title: sidetittel('Etterregistrering') };

interface FormidlingSideRootLayoutProps {
  children: ReactNode;
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
      {children}
    </StillingsContextProvider>
  );
}
