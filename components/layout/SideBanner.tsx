import { Heading } from '@navikt/ds-react';
import { ReactNode } from 'react';
// import Grunnbanner from '../grunnbanner/Grunnbanner';

type ISideBanner = {
  tittel: string;
  ikon: ReactNode;
  children?: ReactNode;
  nederst?: ReactNode;
};

const SideBanner = ({ tittel, nederst, ikon, children }: ISideBanner) => {
  return (
    <div role='banner' id='banner'>
      <div className='flex justify-between items-center'>
        <div className='flex justify-start items-center gap-8'>
          {ikon}
          <Heading level='2' size='large' className='my-8 ml-0 mr-auto'>
            {tittel}
          </Heading>
        </div>
        <div id='knapperRad'>{children}</div>
      </div>
      {nederst}
    </div>
  );
};

export default SideBanner;
