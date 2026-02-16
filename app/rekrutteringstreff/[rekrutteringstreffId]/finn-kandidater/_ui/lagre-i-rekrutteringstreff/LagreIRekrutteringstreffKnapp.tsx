'use client';

import { lagreKandidaterIRekrutteringstreff } from './lagre-i-rekrutteringstreff';
import { KandidatDataSchemaDTO } from '@/app/api/kandidat-sok/schema/cvSchema.zod';
import { KandidatsokKandidat } from '@/app/api/kandidat-sok/useKandidatsøk';
import { useJobbsøkere } from '@/app/api/rekrutteringstreff/[...slug]/jobbsøkere/useJobbsøkere';
import { useKandidatSøkMarkerteContext } from '@/app/kandidat/KandidatSøkMarkerteContext';
import LagreIRekrutteringstreffModal from '@/app/rekrutteringstreff/[rekrutteringstreffId]/finn-kandidater/_ui/lagre-i-rekrutteringstreff/LagreIRekrutteringstreffModal';
import LenkeKortMedIkon from '@/components/lenke-kort/LenkeKortMedIkon';
import { useApplikasjonContext } from '@/providers/ApplikasjonContext';
import { PersonPlusIcon } from '@navikt/aksel-icons';
import { Button } from '@navikt/ds-react';
import { useRouter } from 'next/navigation';
import { FC, useState } from 'react';

interface LagreIRekrutteringstreffKnappProps {
  rekrutteringstreffId?: string;
  kandidatsokKandidater: KandidatsokKandidat[] | KandidatDataSchemaDTO[];
  lenkeKort?: boolean;
}

const LagreIRekrutteringstreffKnapp: FC<LagreIRekrutteringstreffKnappProps> = ({
  rekrutteringstreffId,
  kandidatsokKandidater,
  lenkeKort,
}) => {
  const [visModal, setVisModal] = useState(false);
  const [laster, setLaster] = useState(false);

  const router = useRouter();
  const { visVarsel } = useApplikasjonContext();
  const { markerteKandidater, fjernMarkerteKandidater } =
    useKandidatSøkMarkerteContext();
  const jobbsøkerHook = useJobbsøkere(rekrutteringstreffId);

  const lagreKandidater = async (valgteTreff?: string[]) => {
    setLaster(true);
    const resultat = await lagreKandidaterIRekrutteringstreff(
      {
        markerteKandidater,
        kandidatsokKandidater,
        rekrutteringstreffId,
        selectedRows: valgteTreff,
      },
      {
        visVarsel,
        fjernMarkerteKandidater,
        mutateJobbsøkere: jobbsøkerHook.mutate,
      },
    );
    setLaster(false);
    if (resultat.suksess) {
      setVisModal(false);
      if (rekrutteringstreffId) {
        router.push(
          `/rekrutteringstreff/${rekrutteringstreffId}?visFane=jobbsøkere`,
        );
      }
    }
  };

  const handleButtonClick = () => {
    if (rekrutteringstreffId) {
      void lagreKandidater();
    } else {
      setVisModal(true);
    }
  };

  if (lenkeKort) {
    return (
      <LenkeKortMedIkon
        onClick={lagreKandidater}
        tittel='Legg til jobbsøker i rekrutteringstreff'
        beskrivelse='Lagrer valgt jobbsøker i listen for rekrutteringstreff'
        ikon={<PersonPlusIcon aria-hidden />}
      />
    );
  }

  return (
    <>
      <Button
        size='small'
        variant='tertiary'
        onClick={handleButtonClick}
        icon={<PersonPlusIcon aria-hidden />}
        disabled={markerteKandidater?.length === 0 || laster}
        loading={laster}
      >
        {rekrutteringstreffId
          ? 'Legg til jobbsøkere og fullfør'
          : 'Lagre i rekrutteringstreff'}
      </Button>
      {visModal && (
        <LagreIRekrutteringstreffModal
          kandidatsokKandidater={[]}
          onClose={() => setVisModal(false)}
        />
      )}
    </>
  );
};

export default LagreIRekrutteringstreffKnapp;
