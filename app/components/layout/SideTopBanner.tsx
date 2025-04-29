import TilbakeKnapp from './TilbakeKnapp';
import { Heading } from '@navikt/ds-react';
import { ReactNode } from 'react';

// import Grunnbanner from '../grunnbanner/Grunnbanner';

export type ISideTopBanner = {
  tittel: string | null;
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
    <div className='@container/topBanner my-4'>
      {tilbakeKnapp && <TilbakeKnapp />}
      <div className='flex items-center justify-between flex-col'>
        <div className='flex w-full items-center justify-start gap-8'>
          {ikon}
          <div className='w-full'>
            {tittel && (
              <div className='flex justify-between @2xl/topBanner:flex-row flex-col'>
                <Heading className='mr-auto ml-0' level='2' size='large'>
                  {tittel}
                </Heading>
                <div className='flex-end flex'>{chip}</div>
              </div>
            )}
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
