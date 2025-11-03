'use client';

import { useStegviser } from './StegviserContext';
import { AktivtSteg } from '@/app/rekrutteringstreff/_types/constants';
import { ProgressBar } from '@navikt/ds-react';
import { FC } from 'react';

const ProgressMedTeller: FC<{
  value: number;
  max: number;
  ariaLabel: string;
}> = ({ value, max, ariaLabel }) => {
  const prosent = max === 0 ? 0 : (value / max) * 100;

  return (
    <>
      <ProgressBar
        value={prosent}
        size='small'
        className='mt-2'
        aria-label={ariaLabel}
      />
      <div className='flex justify-end text-sm tabular-nums mt-1'>
        {value} / {max}
      </div>
    </>
  );
};

interface Props {
  onToggleForhåndsvisning?: (erIForhåndsvisning: boolean) => void;
  erIForhåndsvisning: boolean;
}

const StegviserHeader: FC<Props> = () => {
  const {
    activeStep,
    sjekklistePunkterFullfort,
    totaltAntallSjekklistePunkter,
    antallInviterePunkterFullfort,
    totaltAntallInviterePunkter,
  } = useStegviser();

  return (
    <div className='w-full'>
      <div className='w-full mt-2'>
        {activeStep === AktivtSteg.KLADD && (
          <ProgressMedTeller
            value={sjekklistePunkterFullfort}
            max={totaltAntallSjekklistePunkter}
            ariaLabel='Fremdrift for publisering'
          />
        )}
        {activeStep === AktivtSteg.INVITERE && (
          <ProgressMedTeller
            value={antallInviterePunkterFullfort}
            max={totaltAntallInviterePunkter}
            ariaLabel='Fremdrift for invitasjon'
          />
        )}
      </div>
    </div>
  );
};

export default StegviserHeader;
