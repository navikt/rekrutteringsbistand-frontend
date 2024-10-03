'use client';

import {
  ArrowForwardIcon,
  PencilIcon,
  PrinterSmallIcon,
  TrashIcon,
} from '@navikt/aksel-icons';
import { Button } from '@navikt/ds-react';
import { useRouter } from 'next/navigation';
import * as React from 'react';
import { useStillingsContext } from '../../StillingsContext';

const StillingSidebarKnapper: React.FC = () => {
  const { erEier, stillingsData } = useStillingsContext();
  const router = useRouter();
  return (
    <>
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
            onClick={() =>
              router.push(`/stilling/${stillingsData.stilling.uuid}/rediger`)
            }
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
      {!erEier && (
        <Button variant='secondary' size='small' className='w-full h-5 my-2'>
          Overta stillingen
        </Button>
      )}
    </>
  );
};

export default StillingSidebarKnapper;
