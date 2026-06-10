'use client';

import OpprettFormidlingFraTreffModal from './OpprettFormidlingFraTreffModal';
import { PlusIcon } from '@navikt/aksel-icons';
import { Button } from '@navikt/ds-react';
import { FC, useState } from 'react';

const OpprettFormidlingFraTreffKnapp: FC = () => {
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
        Opprett formidling
      </Button>
      {åpen && (
        <OpprettFormidlingFraTreffModal
          åpen={åpen}
          onLukk={() => setÅpen(false)}
        />
      )}
    </>
  );
};

export default OpprettFormidlingFraTreffKnapp;
