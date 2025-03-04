'use client';

import { Button } from '@navikt/ds-react';
import Piktogram from '../../public/ikoner/rekrutteringstreff.svg';
import SVGDarkmode from '../components/SVGDarkmode';
import SideLayout from '../components/layout/SideLayout';
import SideTopBanner from '../components/layout/SideTopBanner';
import { RekrutteringstreffSøkSidebar } from './components/sidebar/RekrutteringstreffSøkSidebar';
import { PlusIcon } from '@navikt/aksel-icons';
import * as React from 'react';
import { useRouter } from 'next/navigation';
import { opprettNyStilling } from '../api/stilling/ny-stilling/opprettNyStilling';
import { opprettNyttRekrutteringstreff } from '../rekrutteringstreff/nytt-rekrutteringstreff/opprettNyttRekrutteringstreff';
import { OpprettNyttRekrutteringstreffDTO } from '../rekrutteringstreff/nytt-rekrutteringstreff/dto';

interface layoutProps {
  children?: React.ReactNode | undefined;
}

  const nyTreff: OpprettNyttRekrutteringstreffDTO = {
    tittel: 'Nytt rekrutteringstreff',
  };

export default function RekrutteringstreffSøkLayout({
  children,
}: layoutProps) {
  const router = useRouter();

  const handleButtonClick = () => {
    /*opprettNyttRekrutteringstreff(nyTreff)
      .then((response) => {
        const id = response.id;
        router.push(`/rekrutteringstreff/${id}`);
      })
      .catch((error) => {
        console.error('Error while creating rekrutteringstreff:', error);
      });*/
      router.push(`/rekrutteringstreff`);
  };

  return (
    <SideLayout
      sidepanel={<RekrutteringstreffSøkSidebar />}
      banner={
        <div className='flex justify-between items-center'>
          <SideTopBanner
            tittel='Rekrutteringstreff'
            ikon={<SVGDarkmode src={Piktogram} alt='Rekrutteringstreff' />}
          />
          <Button variant="primary" icon={<PlusIcon />} onClick={handleButtonClick}>Opprett treff</Button>
        </div>
      }
    >
      {children}
    </SideLayout>
  );
}
