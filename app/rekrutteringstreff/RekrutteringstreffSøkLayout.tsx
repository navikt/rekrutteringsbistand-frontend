'use client';

import RekrutteringstreffDark from '../../public/ikoner/rekrutteringstreff-dark.svg';
import Rekrutteringstreff from '../../public/ikoner/rekrutteringstreff.svg';
import { RekbisError } from '../../util/rekbisError';
import { UmamiEvent } from '../../util/umamiEvents';
import {
  opprettNyttRekrutteringstreff,
  OpprettNyttRekrutteringstreffDTO,
} from '../api/rekrutteringstreff/nytt-rekrutteringstreff/opprettNyttRekrutteringstreff';
import SVGDarkmode from '../components/SVGDarkmode';
import SideLayout from '../components/layout/SideLayout';
import SideTopBanner from '../components/layout/SideTopBanner';
import { useApplikasjonContext } from '../providers/ApplikasjonContext';
import { useUmami } from '../providers/UmamiContext';
import { RekrutteringstreffFilter } from './components/RekrutteringstreffFilter';
import { Button } from '@navikt/ds-react';
import * as React from 'react';

export interface RekrutteringstreffSøkLayoutProps {
  children?: React.ReactNode | undefined;
}

const RekrutteringstreffSøkLayout: React.FC<
  RekrutteringstreffSøkLayoutProps
> = ({ children }) => {
  const { trackAndNavigate } = useUmami();
  const { valgtNavKontor } = useApplikasjonContext();

  const handleOpprettRekrutteringstreff = () => {
    const nyttTreff: OpprettNyttRekrutteringstreffDTO = {
      opprettetAvNavkontorEnhetId: valgtNavKontor?.navKontor || null,
    };

    opprettNyttRekrutteringstreff(nyttTreff)
      .then((response) => {
        const id = response.id;
        trackAndNavigate(
          UmamiEvent.Sidebar.opprettet_rekrutteringstreff,
          `/rekrutteringstreff/${id}`,
        );
      })
      .catch((error) => {
        throw new RekbisError({
          message: 'Feil ved opprettelse av nytt rekrutteringstreff:',
          error,
        });
      });
  };

  return (
    <SideLayout
      banner={
        <div className='flex justify-between items-center'>
          <SideTopBanner
            tittel='Rekrutteringstreff'
            knappIBanner={
              <div>
                <Button onClick={handleOpprettRekrutteringstreff}>
                  Nytt rekrutteringstreff
                </Button>
              </div>
            }
            ikon={
              <SVGDarkmode
                light={Rekrutteringstreff}
                dark={RekrutteringstreffDark}
                alt='Rekrutteringstreff'
              />
            }
          />
        </div>
      }
    >
      <RekrutteringstreffFilter />
      {children}
    </SideLayout>
  );
};

export default RekrutteringstreffSøkLayout;
