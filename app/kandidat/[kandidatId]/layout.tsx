import * as React from 'react';
import { KandidatContextProvider } from './KandidatContext';
import KandidatSideLayout from './KandidatsideLayout';

interface KandidatSideRootLayoutProps {
  children: React.ReactNode;
  params: Promise<{ kandidatId: string }>;
}
export default async function KandidatSideRootLayout({
  children,
  params,
}: KandidatSideRootLayoutProps) {
  const kandidatId = (await params).kandidatId;
  return (
    <KandidatContextProvider kandidatId={kandidatId}>
      <KandidatSideLayout>{children}</KandidatSideLayout>
    </KandidatContextProvider>
  );
}
