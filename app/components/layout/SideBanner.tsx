import { Heading } from '@navikt/ds-react';
import * as React from 'react';

export interface SideBannerProps {
  tittel: string;
  ikon?: React.ReactNode | undefined;
  navigasjon?: React.ReactNode | undefined;
  knapper?: React.ReactNode | undefined;
}

const SideBanner: React.FC<SideBannerProps> = ({
  tittel,
  navigasjon,
  knapper,
  ikon,
}) => {
  return (
    <div className='h-10 py-4 flex justify-between  items-center my-4'>
      <div className='flex'>
        {ikon && ikon}
        <Heading className={ikon ? 'pl-1' : ''} size='small'>
          {tittel}
        </Heading>
        {navigasjon && (
          <div className='flex'>
            <div className='px-3'>
              <div className='w-0 h-8 outline-1 outline-offset-[-0.50px] outline-Border-Accent-Accent-Subtle'></div>
            </div>
            {navigasjon}
          </div>
        )}
      </div>
      {knapper}
    </div>
  );
};

export default SideBanner;
