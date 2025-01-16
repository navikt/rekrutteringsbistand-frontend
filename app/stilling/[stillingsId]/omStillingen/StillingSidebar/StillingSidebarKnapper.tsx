'use client';

import { Button } from '@navikt/ds-react';
import * as React from 'react';
import { useStillingsContext } from '../../StillingsContext';
import StillingPrint from './StillingPrint';
import EierStillingVisning from './components/EierStillingVisning';

interface StillingSidebarKnapperProps {
  printRef: React.RefObject<HTMLDivElement>;
}

const StillingSidebarKnapper: React.FC<StillingSidebarKnapperProps> = ({
  printRef,
}) => {
  const { erEier, erDirektemeldt } = useStillingsContext();

  return (
    <>
      <div className='flex'>
        <StillingPrint printRef={printRef} />
      </div>
      {erEier && <EierStillingVisning />}
      {!erEier && erDirektemeldt && (
        <Button variant='secondary' size='small' className='w-full h-5 my-2'>
          Overta stillingen
        </Button>
      )}
    </>
  );
};

export default StillingSidebarKnapper;
