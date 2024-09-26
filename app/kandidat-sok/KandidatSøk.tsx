'use client';
import { Tabs } from '@navikt/ds-react';
import * as React from 'react';
import SWRLaster from '../../components/SWRLaster';
import SideLayout from '../../components/layout/SideLayout';
import SideTopBanner from '../../components/layout/SideTopBanner';
import { TilgangskontrollForInnhold } from '../../components/tilgangskontroll/TilgangskontrollForInnhold';
import { Rolle } from '../../types/Roller';
import {
  KandidatsøkTyper,
  useKandidatsøk,
} from '../api/kandidat-sok/useKandidatsøk';
import { useKandidatSøkFilterContext } from './KandidatsøkContext';
import ValgteKontorer from './ValgteKontorer';
import KandidatKort from './components/KandidatKort';
import Sidebar from './components/KandidatSøkSidebar';
import { Portefølje } from './components/PorteføljeTabs';
import Piktogram from './components/icons/finn-kandidater.svg';

const KandidatSøk: React.FC = () => {
  const { portefølje, setPortefølje } = useKandidatSøkFilterContext();
  const hook = useKandidatsøk(KandidatsøkTyper.MINE_BRUKERE, {
    orgenhet: '0321',
    fritekst: null,
    portefølje: 'minebrukere',
    valgtKontor: [],
    innsatsgruppe: [],
    side: 1,
    ønsketYrke: [],
    ønsketSted: [],
    borPåØnsketSted: null,
    kompetanse: [],
    førerkort: [],
    prioritertMålgruppe: [],
    hovedmål: [],
    utdanningsnivå: [],
    arbeidserfaring: [],
    ferskhet: null,
    språk: [],
    sortering: 'nyeste',
  });

  const data = {
    enheter: [],
  };

  const MineBrukere = () => (
    <Tabs.Tab value={Portefølje.MINE_BRUKERE} label='Mine brukere' />
  );

  const MittKontor = () => {
    if (data?.enheter && data.enheter.length > 0) {
      return (
        <TilgangskontrollForInnhold
          skjulVarsel
          kreverEnAvRollene={[
            Rolle.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET,
            Rolle.AD_GRUPPE_REKRUTTERINGSBISTAND_JOBBSOKERRETTET,
          ]}
        >
          <Tabs.Tab value={Portefølje.MITT_KONTOR} label='Mitt kontor' />
        </TilgangskontrollForInnhold>
      );
    }
    return null;
  };

  const MineKontorer = () => {
    if (data?.enheter && data.enheter.length > 1) {
      return (
        <TilgangskontrollForInnhold
          skjulVarsel
          kreverEnAvRollene={[
            Rolle.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET,
            Rolle.AD_GRUPPE_REKRUTTERINGSBISTAND_JOBBSOKERRETTET,
          ]}
        >
          <Tabs.Tab value={Portefølje.MINE_KONTORER} label='Mine kontorer' />
        </TilgangskontrollForInnhold>
      );
    }
    return null;
  };

  const AlleKontorer = () => (
    <TilgangskontrollForInnhold
      skjulVarsel
      kreverEnAvRollene={[
        Rolle.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET,
      ]}
      // manglerEierskap={knyttetTilStillingOgIkkeEier}
    >
      <Tabs.Tab value={Portefølje.ALLE} label='Alle kontorer' />
    </TilgangskontrollForInnhold>
  );

  const VelgKontor = () => (
    <TilgangskontrollForInnhold
      skjulVarsel
      kreverEnAvRollene={[
        Rolle.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET,
      ]}
      // manglerEierskap={knyttetTilStillingOgIkkeEier}
    >
      {/* <VelgKontorTab søkekriterier={søkekriterier} /> */}
      <ValgteKontorer />
    </TilgangskontrollForInnhold>
  );

  return (
    <SideLayout
      banner={<SideTopBanner tittel='Kandidatsøk' ikon={<Piktogram />} />}
      sidepanel={<Sidebar />}
    >
      <Tabs value={portefølje} onChange={(value) => setPortefølje(value)}>
        <Tabs.List>
          <MineBrukere />
          <MittKontor />
          <MineKontorer />
          <AlleKontorer />
          <VelgKontor />
        </Tabs.List>
        <Tabs.Panel value={portefølje}>
          <SWRLaster hook={hook}>
            {(data) => {
              return (
                <div>
                  {data.kandidater.map((kandidat, i) => (
                    <KandidatKort
                      key={i}
                      erIListen={false}
                      kandidat={kandidat}
                      markert={false}
                    />
                  ))}
                </div>
              );
            }}
          </SWRLaster>
        </Tabs.Panel>
      </Tabs>
    </SideLayout>
  );
};

export default KandidatSøk;
