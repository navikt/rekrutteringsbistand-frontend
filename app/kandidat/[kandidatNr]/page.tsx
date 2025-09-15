import Kandidat from '@/app/kandidat/[kandidatNr]/Kandidat';
import NotFound from '@/app/not-found';
import { ReactNode } from 'react';

interface KandidatSideProps {
  children: ReactNode;
  params: Promise<{ kandidatNr: string }>;
}
export default async function KandidatSide({ params }: KandidatSideProps) {
  const kandidatNr = (await params).kandidatNr;

  if (!kandidatNr) {
    return <NotFound />;
  }
  return <Kandidat kandidatNr={kandidatNr} />;
}
