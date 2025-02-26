'use client';
import { useParams } from 'next/navigation';
import { usePamGeografi } from '../../../api/pam-geografi/typehead/lokasjoner/usePamGeografi';
import { useStilling } from '../../../api/stilling/rekrutteringsbistandstilling/[slug]/useStilling';
import Sidelaster from '../../../components/Sidelaster';
import KandidatTilStilling from './KandidatTilStilling';

export default function KandidatForStilling() {
  const params = useParams();
  const stillingsId = params.slug;

  if (typeof stillingsId !== 'string') {
    throw new Error('Stillings-ID må være en streng');
  }
  const stillingsData = useStilling(stillingsId);
  const geografiData = usePamGeografi();

  if (stillingsData.isLoading || geografiData.isLoading) {
    return <Sidelaster />;
  }

  return <KandidatTilStilling stillingsData={stillingsData.data} />;
}
