import {
  ArrowForwardIcon,
  PencilIcon,
  PrinterSmallIcon,
  TrashIcon,
} from '@navikt/aksel-icons';
import { Button } from '@navikt/ds-react';
import * as React from 'react';
import { useStillingsContext } from '../../StillingsContext';

const StillingSidebarKnapper: React.FC = () => {
  const { erEier, setEndrerStilling } = useStillingsContext();
  return (
    <div className='grid grid-cols-2 gap-2'>
      <Button
        variant='secondary'
        size='small'
        className='w-full h-5 '
        icon={<ArrowForwardIcon />}
      >
        Del
      </Button>
      <Button
        variant='secondary'
        size='small'
        className='w-full h-5'
        icon={<PrinterSmallIcon />}
      >
        Skriv ut
      </Button>
      {erEier && (
        <Button
          variant='secondary'
          size='small'
          className='w-full h-5'
          icon={<PencilIcon />}
          onClick={() => setEndrerStilling(true)}
        >
          Rediger
        </Button>
      )}
      {erEier && (
        <Button
          variant='secondary'
          size='small'
          className='w-full h-5'
          icon={<TrashIcon />}
        >
          Avslutt
        </Button>
      )}
    </div>
  );
};

export default StillingSidebarKnapper;
