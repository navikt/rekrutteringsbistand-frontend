'use client';

import OpprettFormidlingFraTreffModal from './OpprettFormidlingFraTreffModal';
import { PlusIcon } from '@navikt/aksel-icons';
import { Button, ButtonProps } from '@navikt/ds-react';
import { FC, useState } from 'react';

interface Props {
  size?: ButtonProps['size'];
  variant?: ButtonProps['variant'];
}

const OpprettFormidlingFraTreffKnapp: FC<Props> = ({
  size = 'small',
  variant = 'tertiary',
}) => {
  const [åpen, setÅpen] = useState(false);

  return (
    <>
      <Button
        type='button'
        size={size}
        variant={variant}
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
