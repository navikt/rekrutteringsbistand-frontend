'use client';
import { Tabs } from '@navikt/ds-react';
import * as React from 'react';

import { Roller } from '../components/tilgangskontroll/roller';
import { TilgangskontrollForInnhold } from '../components/tilgangskontroll/TilgangskontrollForInnhold';
import KandidatSøkChips from './components/KandidatSøkChips';
// import { KandidatSøkPortefølje } from './components/PorteføljeTabs';
import { useKandidatSøkFilter } from './KandidaSokContext';
import KandidatSøkResultat from './KandidatSøkResultat';
import ValgteKontorer from './ValgteKontorer';

export enum KandidatSøkPortefølje {
  MINE_BRUKERE = 'minebrukere',
  VALGTE_KONTORER = 'valgtekontorer',
  MINE_KONTORER = 'minekontorer',
  MITT_KONTOR = 'mittkontor',
  ALLE = 'alle',
}

const KandidatSøk: React.FC = () => {
  const { portefølje, setPortefølje } = useKandidatSøkFilter();

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
            Roller.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET,
            Roller.AD_GRUPPE_REKRUTTERINGSBISTAND_JOBBSOKERRETTET,
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
            Roller.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET,
            Roller.AD_GRUPPE_REKRUTTERINGSBISTAND_JOBBSOKERRETTET,
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
        Roller.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET,
      ]}
    >
      <Tabs.Tab value={KandidatSøkPortefølje.ALLE} label='Alle kontorer' />
    </TilgangskontrollForInnhold>
  );

  const VelgKontor = () => (
    <TilgangskontrollForInnhold
      skjulVarsel
      kreverEnAvRollene={[
        Roller.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET,
      ]}
    >
      <Tabs.Tab
        value={KandidatSøkPortefølje.VALGTE_KONTORER}
        label='Valgte kontorer'
      />
    </TilgangskontrollForInnhold>
  );

  return (
    <Tabs value={portefølje} onChange={(value) => setPortefølje(value)}>
      <Tabs.List className='w-full'>
        <MineBrukere />
        <MittKontor />
        <MineKontorer />
        <TilgangskontrollForInnhold
          skjulVarsel
          kreverEnAvRollene={[
            Roller.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET,
          ]}
        >
          <AlleKontorer />
          <VelgKontor />
        </TilgangskontrollForInnhold>
      </Tabs.List>
      <Tabs.Panel value={portefølje}>
        <div className='w-full flex justify-between items-baseline'>
          <KandidatSøkChips />
        </div>
        {portefølje === KandidatSøkPortefølje.VALGTE_KONTORER && (
          <ValgteKontorer />
        )}
        <KandidatSøkResultat type={portefølje as KandidatSøkPortefølje} />
      </Tabs.Panel>
    </Tabs>
  );
};

export default KandidatSøk;
