import { useKandidatContext } from '@/app/kandidat/vis-kandidat/KandidatContext';
import LenkeKortMedIkon from '@/components/felles/LenkeKortMedIkon';
import { UmamiEvent } from '@/components/umami/umamiEvents';
import { useUmami } from '@/providers/UmamiContext';
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
          `/kandidat/${kandidatId}?finnStilling=true`,
        );
      }}
    />
  );
};

export default FinnStillingForKandidatKnapp;
