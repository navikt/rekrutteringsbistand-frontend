import { Heading } from '@navikt/ds-react';
import { ReactNode } from 'react';
// import Grunnbanner from '../grunnbanner/Grunnbanner';

type ISideTopBanner = {
  tittel: string;
  ikon: ReactNode;
  children?: ReactNode;
  nederst?: ReactNode;
};

const SideTopBanner = ({ tittel, nederst, ikon, children }: ISideTopBanner) => {
  return (
    <div>
      <div className='flex justify-between items-center'>
        <div className='flex justify-start items-center gap-8'>
          {ikon}
          <Heading className='my-8 ml-0 mr-auto' level='2' size='large'>
            {tittel}
          </Heading>
        </div>
        <div id='knapperRad'>{children}</div>
      </div>
      {nederst}
    </div>
  );
};

export default SideTopBanner;
