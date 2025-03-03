import { Box, Heading } from '@navikt/ds-react';
import * as React from 'react';

export interface GråRammeProps {
  children?: React.ReactNode | undefined;
  ikon?: React.ReactNode | undefined;
  tittel: string;
}

const GråRamme: React.FC<GråRammeProps> = ({ children, ikon, tittel }) => {
  return (
    <Box.New
      background='raised'
      borderColor='neutral-subtleA'
      borderRadius='xlarge'
      borderWidth='1'
      padding='4'
    >
      <div className='mb-4 flex items-center'>
        {ikon && (
          <div className='mr-3 flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-[var(--a-gray-900)]'>
            {ikon}
          </div>
        )}
        <Heading size='small'>{tittel}</Heading>
      </div>
      {children}
    </Box.New>
  );
};

export default GråRamme;
