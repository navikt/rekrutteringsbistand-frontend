import { RekrutteringstreffProvider } from '../_providers/RekrutteringstreffContext';
import WorkOpTreffTilgang from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/WorkOpTreffTilgang';
import { ReactNode } from 'react';

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
