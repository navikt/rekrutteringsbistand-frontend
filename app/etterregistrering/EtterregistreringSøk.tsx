'use client';

import { StillingsSøkProvider } from '@/app/stilling/StillingsSøkContext';
import StillingsSøkeresultat from '@/app/stilling/StillingsSøkeresultat';
import StillingsSøkFilter from '@/app/stilling/_ui/StillingsSøkFilter';
import StillingsSøkNavigasjon from '@/app/stilling/_ui/StillingsSøkNavigasjon';
import SideBanner from '@/components/layout/SideBanner';
import SideLayout from '@/components/layout/SideLayout';
import Sidelaster from '@/components/layout/Sidelaster';
import { BriefcaseClockIcon } from '@navikt/aksel-icons';
import { Button } from '@navikt/ds-react';
import Link from 'next/link';
import * as React from 'react';

const EtterRegistreringSøk = () => {
  return (
    <React.Suspense fallback={<Sidelaster />}>
      <StillingsSøkProvider formidlinger={true}>
        <EtterRegistreringSøkLayout />
      </StillingsSøkProvider>
    </React.Suspense>
  );
};

const EtterRegistreringSøkLayout: React.FC = () => {
  return (
    <SideLayout
      topBanner={
        <SideBanner
          ikon={<BriefcaseClockIcon className='h-6 w-6' />}
          tittel='Etterregistreringer'
          navigasjon={<StillingsSøkNavigasjon />}
          knapper={
            <div>
              <Link href={'/etterregistrering/ny-etterregistrering'}>
                <Button size='small'>Opprett etterregistrering</Button>
              </Link>
            </div>
          }
        />
      }
    >
      <StillingsSøkFilter formidlinger={true} />
      <StillingsSøkeresultat />
    </SideLayout>
  );
};

export default EtterRegistreringSøk;
