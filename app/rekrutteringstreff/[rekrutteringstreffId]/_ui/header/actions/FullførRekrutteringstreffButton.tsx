'use client';

import { fullførRekrutteringstreff } from '@/app/api/rekrutteringstreff/[...slug]/statushendelser/mutations';
import { RekbisError } from '@/util/rekbisError';
import { Button } from '@navikt/ds-react';
import { FC, useState } from 'react';

type Props = {
  rekrutteringstreffId: string;
  harInvitert: boolean;
  tiltidspunktHarPassert: boolean;
  oppdaterData: () => void;
};

const FullførRekrutteringstreffButton: FC<Props> = ({
  rekrutteringstreffId,
  harInvitert,
  tiltidspunktHarPassert,
  oppdaterData,
}) => {
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
        type='button'
        size='small'
        variant='primary'
        disabled={!harInvitert || !tiltidspunktHarPassert || laster}
        loading={laster}
        onClick={() => fullfør()}
      >
        Fullfør
      </Button>
    </>
  );
};

export default FullførRekrutteringstreffButton;
