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
      <div className='flex items-center mb-4'>
        {ikon && (
          <div className='w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3 text-[var(--a-gray-900)]'>
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
