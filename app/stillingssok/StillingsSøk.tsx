'use client';
import { PlusCircleIcon } from '@navikt/aksel-icons';
import { Button, Tabs } from '@navikt/ds-react';
import Link from 'next/link';
import * as React from 'react';
import SideLayout from '../../components/layout/SideLayout';
import SideTopBanner from '../../components/layout/SideTopBanner';
import { TilgangskontrollForInnhold } from '../../components/tilgangskontroll/TilgangskontrollForInnhold';
import { Rolle } from '../../types/Roller';
import Piktogram from './components/icons/finn-stillinger.svg';
import StillingsSøkSidePanel from './components/StillingsSøkSidePanel';
import { StillingsSøkPortefølje } from './stillingssøk-typer';
import { useStillingsSøkFilter } from './StillingsSøkContext';
import StillingsSøkeresultat from './StillingsSøkeresultat';

const StillingsSøk: React.FC = () => {
  const { portefølje, setPortefølje } = useStillingsSøkFilter();

  return (
    <SideLayout
      // banner={kandidatnr !== undefined && <KontekstAvKandidat kandidatnr={kandidatnr} />}
      banner={
        <SideTopBanner
          tittel='Stillinger'
          ikon={<Piktogram />}
          knappIBanner={
            <TilgangskontrollForInnhold
              skjulVarsel
              kreverEnAvRollene={[
                Rolle.AD_GRUPPE_REKRUTTERINGSBISTAND_JOBBSOKERRETTET,
                Rolle.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET,
              ]}
            >
              <Link href={'/stilling/ny-stilling'}>
                <Button
                  icon={<PlusCircleIcon aria-hidden />}
                  variant='secondary'
                >
                  Opprett ny
                </Button>
              </Link>
            </TilgangskontrollForInnhold>
          }
        />
      }
      sidepanel={<StillingsSøkSidePanel />}
    >
      <Tabs
        defaultValue={portefølje || StillingsSøkPortefølje.VIS_ALLE}
        onChange={(e) => setPortefølje(e as StillingsSøkPortefølje)}
      >
        <Tabs.List>
          <Tabs.Tab value={StillingsSøkPortefølje.VIS_ALLE} label='Alle' />
          <TilgangskontrollForInnhold
            skjulVarsel
            kreverEnAvRollene={[
              Rolle.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET,
            ]}
          >
            <Tabs.Tab
              value={StillingsSøkPortefølje.VIS_MINE}
              label='Mine stillinger'
            />
          </TilgangskontrollForInnhold>
        </Tabs.List>
        <Tabs.Panel value={StillingsSøkPortefølje.VIS_ALLE}>
          <StillingsSøkeresultat />
          {/* <AlleStillinger
            kandidatnr={kandidatnr}
            finnerStillingForKandidat={finnerStillingForKandidat}
          /> */}
        </Tabs.Panel>
        <Tabs.Panel value={StillingsSøkPortefølje.VIS_MINE}>
          <StillingsSøkeresultat />
          {/* {navIdent ? (
            <MineStillinger
              navIdent={navIdent}
              kandidatnr={kandidatnr}
              finnerStillingForKandidat={finnerStillingForKandidat}
            />
          ) : null} */}
        </Tabs.Panel>
      </Tabs>
    </SideLayout>
  );
};

export default StillingsSøk;
