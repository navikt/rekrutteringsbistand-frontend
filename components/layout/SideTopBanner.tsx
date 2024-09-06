import { ArrowLeftIcon } from '@navikt/aksel-icons';
import { Button, Heading } from '@navikt/ds-react';
import { useRouter } from 'next/navigation';
import { ReactNode } from 'react';
// import Grunnbanner from '../grunnbanner/Grunnbanner';

export type ISideTopBanner = {
  tittel: string;
  ikon?: ReactNode;
  children?: ReactNode;
  headerInnhold?: ReactNode;
  knappIBanner?: ReactNode;
  nederst?: ReactNode;
  tilbakeKnapp?: boolean;
};

const SideTopBanner = ({
  tittel,
  ikon,
  children,
  tilbakeKnapp,
  knappIBanner,
  headerInnhold,
}: ISideTopBanner) => {
  const router = useRouter();
  const tilbake = () => router.back();
  return (
    <div>
      {tilbakeKnapp && (
        <Button icon={<ArrowLeftIcon />} onClick={tilbake} variant='tertiary'>
          Tilbake
        </Button>
      )}
      <div className='flex justify-between items-center'>
        <div>
          <div className='flex justify-start items-center gap-8'>
            {ikon}
            <div>
              <Heading className=' ml-0 mr-auto' level='2' size='large'>
                {tittel}
              </Heading>
              {headerInnhold}
            </div>
          </div>
        </div>
        <div>{knappIBanner}</div>
      </div>
      <div id='knapperRad'>{children}</div>
    </div>
  );
};

export default SideTopBanner;
