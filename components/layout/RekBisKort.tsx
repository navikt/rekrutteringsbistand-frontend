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
    <div className='p-2'>
      <Box.New
        id={id}
        borderRadius='xlarge'
        borderColor='info-subtleA'
        background='default'
        className={`flex flex-col w-full min-h-[calc(100vh-70px)] ${className}`}
      >
        {/* Kortet vokser nå naturlig med innholdet og lar siden scrolle. */}
        {children}
      </Box.New>
    </div>
  );
};

export default RekBisKort;
