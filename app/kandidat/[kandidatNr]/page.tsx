import VisJobbsøker from '@/app/kandidat/[kandidatNr]/jobbsøker-visning/VisJobbsøker';

interface KandidatPageProps {
  params: Promise<{ kandidatNr: string }>;
}

export default async function KandidatPage({ params }: KandidatPageProps) {
  const kandidatNr = (await params).kandidatNr;
  return <VisJobbsøker kandidatId={kandidatNr} />;
}
