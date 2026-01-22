'use client';

import { ChevronLeftIcon, ChevronRightIcon } from '@navikt/aksel-icons';
import { Button } from '@navikt/ds-react';
import { FC } from 'react';

interface LitenPagneringProps {
  fraAntall: number;
  tilAntall: number;
  total: number;
  side: number;
  setSide: (side: number) => void;
}

const LitenPagnering: FC<LitenPagneringProps> = ({
  fraAntall,
  tilAntall,
  total,
  side,
  setSide,
}) => {
  return (
    <div className='flex shrink-0 items-center justify-end py-1.5 whitespace-nowrap'>
      {fraAntall}-{tilAntall < total ? tilAntall : total} av {total}
      <Button
        className='shrink-0'
        disabled={side === 1}
        onClick={() => setSide(side - 1)}
        icon={<ChevronLeftIcon />}
        size='small'
        variant='tertiary'
      />
      <Button
        className='shrink-0'
        disabled={tilAntall >= total}
        onClick={() => setSide(side + 1)}
        icon={<ChevronRightIcon />}
        size='small'
        variant='tertiary'
      />
    </div>
  );
};

export default LitenPagnering;
