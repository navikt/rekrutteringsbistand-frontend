'use client';
import { Tabs } from '@navikt/ds-react';
import * as React from 'react';

import { Roller } from '../components/tilgangskontroll/roller';
import { TilgangskontrollForInnhold } from '../components/tilgangskontroll/TilgangskontrollForInnhold';
import TømFiltre from '../components/TømFiltre';
import KandidatSøkChips from './components/KandidatSøkChips';
import { KandidatSøkPortefølje } from './components/PorteføljeTabs';
import { useKandidatSøkFilter } from './KandidaSokContext';
import KandidatSøkResultat from './KandidatSøkResultat';
import ValgteKontorer from './ValgteKontorer';

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
        <Tabs.Tab
          value={KandidatSøkPortefølje.MITT_KONTOR}
          label='Mitt kontor'
        />
      );
    }
    return null;
  };

  const MineKontorer = () => {
    if (data?.enheter && data.enheter.length > 1) {
      return (
        <Tabs.Tab
          value={KandidatSøkPortefølje.MINE_KONTORER}
          label='Mine kontorer'
        />
      );
    }
    return null;
  };

  const AlleKontorer = () => (
    <Tabs.Tab value={KandidatSøkPortefølje.ALLE} label='Alle kontorer' />
  );

  const VelgKontor = () => (
    <Tabs.Tab
      value={KandidatSøkPortefølje.VALGTE_KONTORER}
      label='Valgte kontorer'
    />
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
          <TømFiltre />
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
