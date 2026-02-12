import LenkeKortMedIkon from '@/components/lenke-kort/LenkeKortMedIkon';
import { UmamiEvent } from '@/util/umamiEvents';
import { FC } from 'react';

export interface FinnStillingForKandidatKnappProps {
  kandidatId: string;
}

const FinnStillingForKandidatKnapp: FC<FinnStillingForKandidatKnappProps> = ({
  kandidatId,
}) => {
  return (
    <LenkeKortMedIkon
      ikon='🔎'
      tittel='Finn jobb'
      beskrivelse='Se stillingsoppdrag som kan passe.'
      data-umami-event={UmamiEvent.Kandidat.finn_stilling_knapp}
      href={`/kandidat/${kandidatId}/finn-stilling`}
    />
  );
};

export default FinnStillingForKandidatKnapp;
