import { RekrutteringstreffProvider } from '../_providers/RekrutteringstreffContext';
import RekrutteringstreffForm from './_ui/rediger/RekrutteringstreffForm';
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
      <RekrutteringstreffForm rekrutteringstreffId={rekrutteringstreffId}>
        {children}
      </RekrutteringstreffForm>
    </RekrutteringstreffProvider>
  );
}
