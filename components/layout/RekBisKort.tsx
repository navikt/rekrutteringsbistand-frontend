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
    <div className='h-full p-2'>
      <Box
        id={id}
        borderRadius='12'
        borderColor='info-subtleA'
        background='neutral-soft'
        className={`flex h-full w-full flex-col overflow-hidden ${className}`}
      >
        {children}
      </Box>
    </div>
  );
};

export default RekBisKort;
