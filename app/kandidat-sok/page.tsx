'use client';
import { Tabs } from '@navikt/ds-react';
import * as React from 'react';
import { TilgangskontrollForInnhold } from '../../components/tilgangskontroll/TilgangskontrollForInnhold';
import { Rolle } from '../../types/Roller';

import { useKandidatSøkFilter } from './KandidatsøkContext';
import KandidatSøkResultat from './KandidatSøkResultat';
import ValgteKontorer from './ValgteKontorer';
import { KandidatSøkPortefølje } from './components/PorteføljeTabs';

const KandidatSøk: React.FC = () => {
  const { portefølje, setPortefølje } = useKandidatSøkFilter();
  // const hook = useKandidatsøk(KandidatsøkTyper.MINE_BRUKERE, {
  //   orgenhet: '0321',
  //   fritekst: null,
  //   portefølje: 'minebrukere',
  //   valgtKontor: [],
  //   innsatsgruppe: [],
  //   side: 1,
  //   ønsketYrke: [],
  //   ønsketSted: [],
  //   borPåØnsketSted: null,
  //   kompetanse: [],
  //   førerkort: [],
  //   prioritertMålgruppe: [],
  //   hovedmål: [],
  //   utdanningsnivå: [],
  //   arbeidserfaring: [],
  //   ferskhet: null,
  //   språk: [],
  //   sortering: 'nyeste',
  // });

  const data = {
    enheter: [],
  };

  const MineBrukere = () => (
    <Tabs.Tab value={KandidatSøkPortefølje.MINE_BRUKERE} label='Mine brukere' />
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
          <Tabs.Tab
            value={KandidatSøkPortefølje.MITT_KONTOR}
            label='Mitt kontor'
          />
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
          <Tabs.Tab
            value={KandidatSøkPortefølje.MINE_KONTORER}
            label='Mine kontorer'
          />
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
      <Tabs.Tab value={KandidatSøkPortefølje.ALLE} label='Alle kontorer' />
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
    <Tabs value={portefølje} onChange={(value) => setPortefølje(value)}>
      <Tabs.List>
        <MineBrukere />
        <MittKontor />
        <MineKontorer />
        <AlleKontorer />
        <VelgKontor />
      </Tabs.List>
      <Tabs.Panel value={portefølje}>
        <KandidatSøkResultat type={portefølje as KandidatSøkPortefølje} />
      </Tabs.Panel>
    </Tabs>
  );
};

export default KandidatSøk;
