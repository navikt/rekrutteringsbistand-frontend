import { KandidatContextProvider } from '@/app/kandidat/[kandidatNr]/vis-kandidat/KandidatContext';
import NotFound from '@/app/not-found';
import { ReactNode } from 'react';

interface KandidatRootLayoutProps {
  children: ReactNode;
  params: Promise<{ kandidatNr: string }>;
}
export default async function KandidatRootLayout({
  params,
  children,
}: KandidatRootLayoutProps) {
  const kandidatNr = (await params).kandidatNr;
  if (!kandidatNr) {
    return <NotFound />;
  }
  return (
    <KandidatContextProvider kandidatId={kandidatNr}>
      {children}
    </KandidatContextProvider>
  );
}
