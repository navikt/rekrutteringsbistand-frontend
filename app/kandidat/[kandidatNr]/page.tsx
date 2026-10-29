import VisJobbsøker from '@/app/kandidat/[kandidatNr]/jobbsøker-visning/VisJobbsøker';
import { sidetittel } from '@/util/sidetittel';
import type { Metadata } from 'next';

export const metadata: Metadata = { title: sidetittel('Jobbsøker') };

interface KandidatPageProps {
  params: Promise<{ kandidatNr: string }>;
}

export default async function KandidatPage({ params }: KandidatPageProps) {
  const kandidatNr = (await params).kandidatNr;
  return <VisJobbsøker kandidatId={kandidatNr} />;
}
