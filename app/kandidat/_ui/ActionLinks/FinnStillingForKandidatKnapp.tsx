import { useKandidatContext } from '@/app/kandidat/vis-kandidat/KandidatContext';
import LenkeKortMedIkon from '@/components/lenke-kort/LenkeKortMedIkon';
import { useUmami } from '@/providers/UmamiContext';
import { UmamiEvent } from '@/util/umamiEvents';
import { FC } from 'react';

const FinnStillingForKandidatKnapp: FC = () => {
  const { kandidatId } = useKandidatContext();
  const { trackAndNavigate } = useUmami();

  return (
    <LenkeKortMedIkon
      ikon='🔎'
      tittel='Finn jobb'
      beskrivelse='Se stillingsoppdrag som kan passe.'
      onClick={() => {
        trackAndNavigate(
          UmamiEvent.Kandidat.finn_stilling_knapp,
          `/kandidat/${kandidatId}/finn-stilling`,
        );
      }}
    />
  );
};

export default FinnStillingForKandidatKnapp;
