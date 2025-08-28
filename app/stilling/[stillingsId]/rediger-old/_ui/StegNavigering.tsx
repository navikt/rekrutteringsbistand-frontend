import { ArrowLeftIcon, ArrowRightIcon } from '@navikt/aksel-icons';
import { Button } from '@navikt/ds-react';
import * as React from 'react';

export interface StegNavigeringProps {
  stegNummer: number;
  forrigeSteg: () => void;
}

const StegNavigering: React.FC<StegNavigeringProps> = ({
  stegNummer,
  forrigeSteg,
}) => {
  return (
    <div className='mt-4 mb-8 flex w-full justify-between'>
      {stegNummer > 1 ? (
        <Button
          variant='tertiary'
          onClick={forrigeSteg}
          icon={<ArrowLeftIcon />}
          iconPosition='left'
          type='button'
        >
          Forrige steg
        </Button>
      ) : (
        <div />
      )}
      <Button
        variant='primary'
        type='submit'
        icon={<ArrowRightIcon />}
        iconPosition='right'
      >
        Neste steg
      </Button>
    </div>
  );
};

export default StegNavigering;
