import { Heading } from '@navikt/ds-react';
import * as React from 'react';
export interface GråRammeProps {
  children?: React.ReactNode | undefined;
  ikon?: React.ReactNode | undefined;
  tittel: string;
}

const GråRamme: React.FC<GråRammeProps> = ({ children, ikon, tittel }) => {
  return (
    <div className='p-4 rounded-xl border border-[rgba(7,26,54,0.21)]'>
      <div className='flex items-center mb-4'>
        {ikon && (
          <div className='w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3'>
            {ikon}
          </div>
        )}
        <Heading size='small'>{tittel}</Heading>
      </div>
      {children}
    </div>
  );
};

export default GråRamme;
