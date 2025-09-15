import NotFound from '@/app/not-found';
import { StillingsContextProvider } from '@/app/stilling/[stillingsId]/StillingsContext';
import { ReactNode } from 'react';

interface FormidlingSideRootLayoutProps {
  children: ReactNode;
  params: Promise<{ stillingsId: string }>;
}
export default async function FormidlingSideRootLayout({
  children,
  params,
}: FormidlingSideRootLayoutProps) {
  const stillingsId = (await params).stillingsId;

  if (!stillingsId) {
    return <NotFound />;
  }
  return (
    <StillingsContextProvider stillingsId={stillingsId}>
      {children}
    </StillingsContextProvider>
  );
}
