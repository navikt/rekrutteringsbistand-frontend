import { RekrutteringstreffContextProvider } from '../_contexts/RekrutteringstreffContext';
import RekrutteringstreffForm from './_ui/RekrutteringstreffForm';
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
    <RekrutteringstreffContextProvider
      rekrutteringstreffId={rekrutteringstreffId}
    >
      <RekrutteringstreffForm rekrutteringstreffId={rekrutteringstreffId}>
        {children}
      </RekrutteringstreffForm>
    </RekrutteringstreffContextProvider>
  );
}
