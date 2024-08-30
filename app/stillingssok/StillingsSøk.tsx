'use client';
import { PlusCircleIcon } from '@navikt/aksel-icons';
import { Button, Tabs } from '@navikt/ds-react';
import Link from 'next/link';
import { useQueryState } from 'nuqs';
import * as React from 'react';
import SideLayout from '../../components/layout/SideLayout';
import { TilgangskontrollForInnhold } from '../../components/tilgangskontroll/TilgangskontrollForInnhold';
import { Rolle } from '../../types/Roller';
import Piktogram from './components/icons/finn-stillinger.svg';
import { stillingsSøkQuery } from './components/StillingsSøkQuery';
import StillingsSøkSidePanel from './components/StillingsSøkSidePanel';
import StillingsSøkeresultat from './StillingsSøkeresultat';

enum StillingsSøkTab {
  VIS_ALLE = 'visAlle',
  VIS_MINE = 'visMine',
}

const StillingsSøk: React.FC = () => {
  const [portefølje, setPortefølje] = useQueryState('portefolje', {
    defaultValue: StillingsSøkTab.VIS_ALLE,
  });

  return (
    <SideLayout
      // banner={kandidatnr !== undefined && <KontekstAvKandidat kandidatnr={kandidatnr} />}
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
            <Button icon={<PlusCircleIcon aria-hidden />} variant='secondary'>
              Opprett ny
            </Button>
          </Link>
        </TilgangskontrollForInnhold>
      }
      sidepanel={<StillingsSøkSidePanel />}
      tittel='Stillinger'
    >
      <Tabs
        defaultValue={portefølje}
        onChange={(e) => setPortefølje(e as StillingsSøkTab)}
      >
        <Tabs.List>
          <Tabs.Tab value={StillingsSøkTab.VIS_ALLE} label='Alle' />
          <TilgangskontrollForInnhold
            skjulVarsel
            kreverEnAvRollene={[
              Rolle.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET,
            ]}
          >
            <Tabs.Tab
              value={StillingsSøkTab.VIS_MINE}
              label='Mine stillinger'
            />
          </TilgangskontrollForInnhold>
        </Tabs.List>
        <Tabs.Panel value={StillingsSøkTab.VIS_ALLE}>
          <StillingsSøkeresultat søkekriterier={stillingsSøkQuery()} />
          {/* <AlleStillinger
            kandidatnr={kandidatnr}
            finnerStillingForKandidat={finnerStillingForKandidat}
          /> */}
        </Tabs.Panel>
        <Tabs.Panel value={StillingsSøkTab.VIS_MINE}>
          <StillingsSøkeresultat søkekriterier={stillingsSøkQuery()} />
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
