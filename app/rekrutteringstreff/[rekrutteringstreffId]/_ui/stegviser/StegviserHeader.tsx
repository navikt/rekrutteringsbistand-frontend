'use client';

import { useStegviser } from './StegviserContext';
import { ProgressBar } from '@navikt/ds-react';
import { FC } from 'react';

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

  const getProsent = (value: number, max: number) =>
    max === 0 ? 0 : (value / max) * 100;

  const ProgressMedTeller: FC<{
    value: number;
    max: number;
    ariaLabel: string;
  }> = ({ value, max, ariaLabel }) => (
    <>
      <ProgressBar
        value={getProsent(value, max)}
        size='small'
        className='mt-2'
        aria-label={ariaLabel}
      />
      <div className='flex justify-end text-sm tabular-nums mt-1'>
        {value} / {max}
      </div>
    </>
  );

  return (
    <div className='w-full'>
      <div className='w-full mt-2'>
        {activeStep === 'PUBLISERE' && (
          <ProgressMedTeller
            value={sjekklistePunkterFullfort}
            max={totaltAntallSjekklistePunkter}
            ariaLabel='Fremdrift for publisering'
          />
        )}
        {activeStep === 'INVITERE' && (
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
