import { Heading } from '@navikt/ds-react';

import { ReactNode } from 'react';
import TilbakeKnapp from './TilbakeKnapp';
// import Grunnbanner from '../grunnbanner/Grunnbanner';

export type ISideTopBanner = {
  tittel: string;
  chip?: ReactNode;
  ikon?: ReactNode;
  headerInnhold?: ReactNode;
  knappIBanner?: ReactNode;
  tilbakeKnapp?: boolean;
};

const SideTopBanner = ({
  tittel,
  ikon,
  tilbakeKnapp,
  knappIBanner,
  headerInnhold,
  chip,
}: ISideTopBanner) => {
  return (
    <div className='my-4 '>
      {tilbakeKnapp && <TilbakeKnapp />}
      <div className='flex justify-between items-center '>
        <div className='flex justify-start items-center gap-8 w-full'>
          {ikon}
          <div className='w-full'>
            <div className='flex justify-between '>
              <Heading className=' ml-0 mr-auto' level='2' size='large'>
                {tittel}
              </Heading>
              <div className='flex flex-end'>{chip}</div>
            </div>
            {headerInnhold}
          </div>
        </div>
      </div>
      <div className='flex justify-end' id='knapperRad'>
        {knappIBanner}
      </div>
    </div>
  );
};

export default SideTopBanner;
