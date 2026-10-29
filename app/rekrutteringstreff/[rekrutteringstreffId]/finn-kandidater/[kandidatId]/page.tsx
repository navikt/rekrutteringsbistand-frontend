import VisJobbsøker from '@/app/kandidat/[kandidatNr]/jobbsøker-visning/VisJobbsøker';
import { sidetittel } from '@/util/sidetittel';
import type { Metadata } from 'next';

export const metadata: Metadata = { title: sidetittel('Jobbsøker') };

export default async function KandidatForStilling({
  params,
}: {
  params: Promise<{ kandidatId: string; stillingsId: string }>;
}) {
  const { kandidatId } = await params;

  return (
    <VisJobbsøker kandidatId={kandidatId} leggTilKnapp='rekrutteringstreff' />
  );
}
