import TilbakeKnapp, { TilbakeKnappProps } from './TilbakeKnapp';
import { Heading } from '@navikt/ds-react';
import { ReactNode } from 'react';

// import Grunnbanner from '../grunnbanner/Grunnbanner';

export type ISideTopBanner = {
  tittel: string;
  chip?: ReactNode;
  ikon?: ReactNode;
  headerInnhold?: ReactNode;
  knappIBanner?: ReactNode;
  tilbakeKnapp?: TilbakeKnappProps;
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
    <div className='my-4'>
      {tilbakeKnapp && <TilbakeKnapp {...tilbakeKnapp} />}
      <div className='flex items-center justify-between'>
        <div className='flex w-full items-center justify-start gap-8'>
          {ikon}
          <div className='w-full'>
            <div className='flex justify-between'>
              <Heading className='mr-auto ml-0' level='2' size='large'>
                {tittel}
              </Heading>
              <div className='flex-end flex'>{chip}</div>
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
