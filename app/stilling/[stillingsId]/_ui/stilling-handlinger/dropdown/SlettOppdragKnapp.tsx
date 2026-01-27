'use client';
import { useStillingsContext } from '@/app/stilling/[stillingsId]/StillingsContext';
import SlettOppdragModal from '@/app/stilling/[stillingsId]/_ui/stilling-handlinger/SlettOppdragModal';
import { StillingsStatus } from '@/app/stilling/_ui/stilling-typer';
import { TrashIcon } from '@navikt/aksel-icons';
import { Button } from '@navikt/ds-react';
import { useState } from 'react';

export default function SlettOppdragKnapp() {
  const {
    erEier,
    stillingsData,
    omStilling: { erDirektemeldt },
  } = useStillingsContext();

  const [visSlettModal, setVisSlettModal] = useState(false);

  const kanSlette =
    erDirektemeldt && stillingsData.stilling.status !== StillingsStatus.Slettet;

  if (!kanSlette || !erEier) {
    return null;
  }

  return (
    <>
      <Button
        size='small'
        variant='tertiary'
        onClick={() => setVisSlettModal(true)}
        icon={<TrashIcon />}
      >
        Slett
      </Button>
      {visSlettModal && <SlettOppdragModal setVisModal={setVisSlettModal} />}
    </>
  );
}
