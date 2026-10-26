import { RekrutteringstreffProvider } from '../_providers/RekrutteringstreffContext';
import WorkOpTreffTilgang from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/WorkOpTreffTilgang';
import { sidetittel } from '@/util/sidetittel';
import type { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = { title: sidetittel('Treff') };

interface RekrutteringsTreffLayoutProps {
  children: ReactNode;
  params: Promise<{ rekrutteringstreffId: string }>;
}

export default async function RekrutteringsTreffLayout({
  children,
  params,
}: RekrutteringsTreffLayoutProps) {
  const { rekrutteringstreffId } = await params;

  return (
    <RekrutteringstreffProvider rekrutteringstreffId={rekrutteringstreffId}>
      <WorkOpTreffTilgang>{children}</WorkOpTreffTilgang>
    </RekrutteringstreffProvider>
  );
}
