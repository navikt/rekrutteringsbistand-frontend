import { RekrutteringstreffContextProvider } from './RekrutteringstreffContext';
import RekrutteringstreffForm from './RekrutteringstreffForm';
import SideLayout from '@/components/layout/SideLayout';

interface RekrutteringsTreffLayoutProps {
  children: React.ReactNode;
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
        <SideLayout> {children}</SideLayout>
      </RekrutteringstreffForm>
    </RekrutteringstreffContextProvider>
  );
}
