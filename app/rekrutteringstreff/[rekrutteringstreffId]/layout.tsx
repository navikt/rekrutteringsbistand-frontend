import { RekrutteringstreffContextProvider } from './RekrutteringstreffContext';

interface RekrutteringsTreffLayoutProps {
  children: React.ReactNode;
  params: Promise<{ rekrutteringstreffId: string }>;
}

export default async function RekrutteringsTreffLayout({
  children,
  params,
}: RekrutteringsTreffLayoutProps) {
  const rekrutteringstreffId = (await params).rekrutteringstreffId;

  return (
    <RekrutteringstreffContextProvider
      rekrutteringstreffId={rekrutteringstreffId}
    >
      {children}
    </RekrutteringstreffContextProvider>
  );
}
