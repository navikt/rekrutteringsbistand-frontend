'use client';

import { Box } from '@navikt/ds-react';
import * as React from 'react';

export interface RekBisProps {
  children?: React.ReactNode | undefined;
  className?: string;
  id?: string;
}

const RekBisKort: React.FC<RekBisProps> = ({
  id,
  children,
  className = '',
}) => {
  return (
    <div className='p-2 h-full'>
      <Box.New
        id={id}
        borderRadius='xlarge'
        borderColor='info-subtleA'
        background='default'
        className={`min-w-[320px] flex flex-col w-full ${className}`}
      >
        {/* Kortet vokser nå naturlig med innholdet og lar siden scrolle. */}
        {children}
      </Box.New>
    </div>
  );
};

export default RekBisKort;
