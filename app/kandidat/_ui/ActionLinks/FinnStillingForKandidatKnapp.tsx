import { useKandidatContext } from '@/app/kandidat/[kandidatNr]/vis-kandidat/KandidatContext';
import LenkeKortMedIkon from '@/components/lenke-kort/LenkeKortMedIkon';
import { UmamiEvent } from '@/util/umamiEvents';
import { FC } from 'react';

const FinnStillingForKandidatKnapp: FC = () => {
  const { kandidatId } = useKandidatContext();

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
