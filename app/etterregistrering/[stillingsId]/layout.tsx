import NotFound from '@/app/not-found';
import { StillingsContextProvider } from '@/app/stilling/[stillingsId]/StillingsContext';

interface FormidlingSideRootLayoutProps {
  children: React.ReactNode;
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
