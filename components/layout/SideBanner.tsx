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
      </div>
      {knapper}
    </div>
  );
};

export default SideBanner;
