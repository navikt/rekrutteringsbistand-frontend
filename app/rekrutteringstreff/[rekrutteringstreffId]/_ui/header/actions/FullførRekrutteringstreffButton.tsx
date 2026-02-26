'use client';

import { useRekrutteringstreffData } from '../../useRekrutteringstreffData';
import { fullførRekrutteringstreff } from '@/app/api/rekrutteringstreff/[...slug]/statushendelser/mutations';
import { RekbisError } from '@/util/rekbisError';
import { CheckmarkCircleIcon } from '@navikt/aksel-icons';
import { Button } from '@navikt/ds-react';
import { FC, useState } from 'react';

const FullførRekrutteringstreffButton: FC = () => {
  const {
    rekrutteringstreffId,
    harInvitert,
    tilTidspunktHarPassert,
    oppdaterData,
  } = useRekrutteringstreffData();
  const [laster, setLaster] = useState(false);

  const fullfør = async () => {
    if (laster) return;
    setLaster(true);

    try {
      await fullførRekrutteringstreff(rekrutteringstreffId);
      oppdaterData();
    } catch (error) {
      new RekbisError({
        message: 'Avslutting av rekrutteringstreff feilet',
        error,
      });
    }
  };

  return (
    <>
      <Button
        icon={<CheckmarkCircleIcon />}
        type='button'
        size='small'
        variant='tertiary'
        disabled={!harInvitert || !tilTidspunktHarPassert || laster}
        loading={laster}
        onClick={() => fullfør()}
      >
        Fullfør
      </Button>
    </>
  );
};

export default FullførRekrutteringstreffButton;
