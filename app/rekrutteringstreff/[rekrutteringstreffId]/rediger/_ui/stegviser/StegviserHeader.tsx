'use client';

import { useStegviser } from './StegviserContext';
import { RekrutteringstreffStatusType } from '@/app/api/rekrutteringstreff/oversikt/useRekrutteringstreffOversikt';
import { RekrutteringstreffStatus } from '@/app/rekrutteringstreff/_types/constants';
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
      <div className='mt-1 flex justify-end text-sm tabular-nums'>
        {value} / {max}
      </div>
    </>
  );
};

interface Props {
  onToggleForhåndsvisning?: (erIForhåndsvisning: boolean) => void;
  erIForhåndsvisning: boolean;
  rekrutteringstreffStatus?: RekrutteringstreffStatusType;
}

const StegviserHeader: FC<Props> = ({ rekrutteringstreffStatus }: Props) => {
  const {
    sjekklistePunkterFullfort,
    totaltAntallSjekklistePunkter,
    antallInviterePunkterFullfort,
    totaltAntallInviterePunkter,
  } = useStegviser();

  return (
    <div className='w-full'>
      <div className='mt-2 w-full'>
        {rekrutteringstreffStatus === RekrutteringstreffStatus.UTKAST && (
          <ProgressMedTeller
            value={sjekklistePunkterFullfort}
            max={totaltAntallSjekklistePunkter}
            ariaLabel='Fremdrift for publisering'
          />
        )}
        {rekrutteringstreffStatus === RekrutteringstreffStatus.PUBLISERT && (
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
