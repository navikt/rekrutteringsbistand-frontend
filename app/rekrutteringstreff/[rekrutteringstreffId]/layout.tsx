import { RekrutteringstreffContextProvider } from './RekrutteringstreffContext';
import RekrutteringstreffForm from './RekrutteringstreffForm';

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
        {children}
      </RekrutteringstreffForm>
    </RekrutteringstreffContextProvider>
  );
}
