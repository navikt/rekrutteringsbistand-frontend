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
  knappIBanner,
  headerInnhold,
  chip,
}: ISideTopBanner) => {
  return (
    <div className='@container/topBanner flex justify-between pt-[32px] pb-10'>
      <div className='flex items-center justify-between flex-col'>
        <div className='flex w-full items-center justify-start gap-8'>
          {ikon && <div className='w-[64px] h-[64px]'>{ikon}</div>}
          <div className='w-full'>
            {tittel && (
              <div className='flex justify-between @2xl/topBanner:flex-row flex-col'>
                <Heading className='mr-auto ml-0' level='2' size='xlarge'>
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
