import { ArrowLeftIcon } from '@navikt/aksel-icons';
import { Button, Heading } from '@navikt/ds-react';
import { useRouter } from 'next/navigation';
import { ReactNode } from 'react';
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
  const router = useRouter();
  const tilbake = () => router.back();
  return (
    <div className='my-4'>
      {tilbakeKnapp && (
        <Button
          size='small'
          icon={<ArrowLeftIcon />}
          onClick={tilbake}
          variant='tertiary'
        >
          Tilbake
        </Button>
      )}
      <div className='flex justify-between items-center'>
        <div className='flex justify-start items-center gap-8'>
          {ikon}
          <div>
            <div className='flex justify-between'>
              <Heading className=' ml-0 mr-auto' level='2' size='large'>
                {tittel}
              </Heading>
              {chip}
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
