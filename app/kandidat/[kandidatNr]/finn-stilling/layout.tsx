import { JobbsøkerContextProvider } from '@/app/kandidat/[kandidatNr]/jobbsøker-visning/JobbsøkerContext';
import { sidetittel } from '@/util/sidetittel';
import type { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: sidetittel('Finn stilling til jobbsøker'),
};

interface FinnStillingLayoutProps {
  children: ReactNode;
  params: Promise<{ kandidatNr: string }>;
}

export default async function FinnStillingLayout({
  children,
  params,
}: FinnStillingLayoutProps) {
  const { kandidatNr } = await params;

  return (
    <JobbsøkerContextProvider kandidatId={kandidatNr}>
      {children}
    </JobbsøkerContextProvider>
  );
}
