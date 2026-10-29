import NotFound from '@/app/not-found';
import PersonTreffProvider from '@/app/rekrutteringstreff/[rekrutteringstreffId]/person/[personTreffId]/PersonTreffContext';
import { sidetittel } from '@/util/sidetittel';
import type { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = { title: sidetittel('Jobbsøker i treff') };

interface PersonTreffRootLayoutProps {
  children: ReactNode;
  params: Promise<{ personTreffId: string }>;
}
export default async function PersonTreffRootLayout({
  params,
  children,
}: PersonTreffRootLayoutProps) {
  const personId = (await params).personTreffId;
  if (!personId) {
    return <NotFound />;
  }
  return (
    <PersonTreffProvider personTreffId={personId}>
      {children}
    </PersonTreffProvider>
  );
}
