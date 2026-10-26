import KandidatlisteKandidatView from '@/app/stilling/[stillingsId]/kandidatliste/KandidatlisteKandidatView';
import { sidetittel } from '@/util/sidetittel';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: sidetittel('Jobbsøker i kandidatliste'),
};

export default async function KandidatlisteKandidatIndex({
  params,
}: {
  params: Promise<{ stillingsId: string; kandidatId: string }>;
}) {
  const { kandidatId } = await params;

  return <KandidatlisteKandidatView kandidatId={kandidatId} />;
}
