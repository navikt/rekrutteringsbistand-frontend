'use client';

import Sidelaster from '../components/Sidelaster';
import SideBanner from '../components/layout/SideBanner';
import SideLayout from '../components/layout/SideLayout';
import { StillingsSøkProvider } from '../stilling/StillingsSøkContext';
import StillingsSøkeresultat from '../stilling/StillingsSøkeresultat';
import StillingsSøkFilter from '../stilling/components/StillingsSøkFilter';
import StillingsSøkNavigasjon from '../stilling/components/StillingsSøkNavigasjon';
import { ReceptionIcon } from '@navikt/aksel-icons';
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
          ikon={<ReceptionIcon className='h-6 w-6' />}
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
