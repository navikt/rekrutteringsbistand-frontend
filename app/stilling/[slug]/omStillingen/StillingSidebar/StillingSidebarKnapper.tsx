'use client';

import { ArrowForwardIcon, PencilIcon, TrashIcon } from '@navikt/aksel-icons';
import { Button } from '@navikt/ds-react';
import { useRouter } from 'next/navigation';
import * as React from 'react';
import { useStillingsContext } from '../../StillingsContext';
import StillingPrint from './StillingPrint';

interface StillingSidebarKnapperProps {
  printRef: React.RefObject<HTMLDivElement>;
}

const StillingSidebarKnapper: React.FC<StillingSidebarKnapperProps> = ({
  printRef,
}) => {
  const { erEier, stillingsData } = useStillingsContext();
  const router = useRouter();

  return (
    <>
      <div className='grid grid-cols-2 gap-2'>
        <Button
          disabled
          variant='secondary'
          size='small'
          className='w-full h-5 '
          icon={<ArrowForwardIcon />}
        >
          Del
        </Button>
        <StillingPrint printRef={printRef} />
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
            // TODO Stoppet / Slettet er eksisterende statuser
            disabled
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
