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
  knappIBanner,
  headerInnhold,
  chip,
}: ISideTopBanner) => {
  return (
    <div className='@container/topBanner w-full flex justify-between pt-[32px] pb-10'>
      <div className='flex items-center w-full justify-between flex-col'>
        <div className='flex w-full items-center justify-start gap-8'>
          <div className='w-full'>
            {tittel && (
              <div className='flex justify-between @2xl/topBanner:flex-row flex-col'>
                <Heading className='mr-auto ml-0' level='2' size='xlarge'>
                  {tittel}
                </Heading>
                <div className='flex-end flex'>{chip}</div>
              </div>
            )}
            <div className='w-full'>{headerInnhold}</div>
          </div>
        </div>
      </div>
      {knappIBanner && (
        <div className='flex justify-end w-full' id='knapperRad'>
          {knappIBanner}
        </div>
      )}
    </div>
  );
};

export default SideTopBanner;
