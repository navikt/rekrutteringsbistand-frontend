import { JobbsøkerContextProvider } from '@/app/kandidat/[kandidatNr]/jobbsøker-visning/JobbsøkerContext';
import { ReactNode } from 'react';

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
