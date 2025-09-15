import { Heading } from '@navikt/ds-react';
import { de } from 'date-fns/locale';
import { ReactNode } from 'react';

export type ISideTopBanner = {
  tittel: string | null;
  chip?: ReactNode;
  ikon?: ReactNode;
  headerInnhold?: ReactNode;
  knappIBanner?: ReactNode;
  tilbakeKnapp?: boolean;
  tittelElementer?: ReactNode[];
};

const SideTopBanner = ({
  tittel,
  knappIBanner,
  headerInnhold,
  chip,
  tittelElementer,
}: ISideTopBanner) => {
  return (
    <div className='@container/topBanner w-full flex justify-between pt-[32px] pb-10'>
      <div className='flex items-center w-full justify-between flex-col'>
        <div className='flex w-full items-center justify-start gap-8'>
          <div className='w-full'>
            {tittel && (
              <div className='flex justify-between @2xl/topBanner:flex-row flex-col'>
                <div className='flex items-center'>
                  <Heading className='ml-0' level='2' size='xlarge'>
                    {tittel}
                  </Heading>
                  {tittelElementer && tittelElementer.length > 0 && (
                    <div className='flex items-center ml-4 gap-4'>
                      {tittelElementer.map((element, index) => (
                        <div key={`tittel-el-${index}`}>{element}</div>
                      ))}
                    </div>
                  )}
                </div>
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
