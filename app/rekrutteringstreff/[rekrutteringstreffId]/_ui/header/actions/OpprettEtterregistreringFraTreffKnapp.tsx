'use client';

import OpprettEtterregistreringFraTreffModal from './OpprettEtterregistreringFraTreffModal';
import { PlusIcon } from '@navikt/aksel-icons';
import { Button } from '@navikt/ds-react';
import { FC, useState } from 'react';

const OpprettEtterregistreringFraTreffKnapp: FC = () => {
  const [åpen, setÅpen] = useState(false);

  return (
    <>
      <Button
        type='button'
        size='small'
        variant='tertiary'
        icon={<PlusIcon />}
        onClick={() => setÅpen(true)}
      >
        Opprett etterregistrering
      </Button>
      {åpen && (
        <OpprettEtterregistreringFraTreffModal
          åpen={åpen}
          onLukk={() => setÅpen(false)}
        />
      )}
    </>
  );
};

export default OpprettEtterregistreringFraTreffKnapp;
