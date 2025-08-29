import Kandidat from '@/app/kandidat/[kandidatNr]/Kandidat';
import NotFound from '@/app/not-found';
import SideLayout from '@/components/layout/SideLayout';

interface KandidatSideProps {
  children: React.ReactNode;
  params: Promise<{ kandidatNr: string }>;
}
export default async function KandidatSide({ params }: KandidatSideProps) {
  const kandidatNr = (await params).kandidatNr;

  if (!kandidatNr) {
    return <NotFound />;
  }
  return (
    <SideLayout>
      <Kandidat kandidatNr={kandidatNr} />
    </SideLayout>
  );
}
