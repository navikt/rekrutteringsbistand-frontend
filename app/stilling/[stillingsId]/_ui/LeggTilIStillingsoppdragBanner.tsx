'use client';

import { useKandidatsammendrag } from '@/app/api/kandidat-sok/useKandidatsammendrag';
import LenkeKortMedIkon from '@/components/lenke-kort/LenkeKortMedIkon';
import { FC } from 'react';

interface LeggTilIStillingsoppdragBannerProps {
  kandidatNr: string;
  laster: boolean;
  onLeggTil: () => void;
}

const LeggTilIStillingsoppdragBanner: FC<
  LeggTilIStillingsoppdragBannerProps
> = ({ kandidatNr, laster, onLeggTil }) => {
  const { data } = useKandidatsammendrag(kandidatNr);
  const navn = data ? `${data.fornavn} ${data.etternavn}` : null;

  return (
    <LenkeKortMedIkon
      tittel={`Legg til ${navn ? `«${navn}»` : 'jobbsøker'} i stillingsoppdrag`}
      beskrivelse='Legg jobbsøkeren til i kandidatlisten for stillingsoppdraget.'
      ikon={'➕'}
      loading={laster}
      onClick={onLeggTil}
    />
  );
};

export default LeggTilIStillingsoppdragBanner;
