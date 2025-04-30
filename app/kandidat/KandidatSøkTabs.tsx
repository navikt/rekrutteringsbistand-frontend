'use client';

import { TilgangskontrollForInnhold } from '../components/tilgangskontroll/TilgangskontrollForInnhold';
import { Roller } from '../components/tilgangskontroll/roller';
import { useApplikasjonContext } from '../providers/ApplikasjonContext';
import {
  KandidatSøkPortefølje,
  useKandidatSøkFilterContext,
} from './KandidaSokFilterContext';
import KandidatSøkResultat from './KandidatSøkResultat';
import KandidatSøkChips from './components/KandidatSøkChips';
import ValgteKontorer from './components/ValgteKontorer';
import { Tabs } from '@navikt/ds-react';
import * as React from 'react';

interface KandidatSøkTabsProps {
  stillingsId?: string;
  rekrutteringstreffId?: string;
  alleredeLagtTil?: string[];
}

const KandidatSøkTabs: React.FC<KandidatSøkTabsProps> = ({
  stillingsId,
  rekrutteringstreffId,
  alleredeLagtTil,
}) => {
  const { portefølje, setPortefølje } = useKandidatSøkFilterContext();
  const { valgtNavKontor, brukerData } = useApplikasjonContext();

  const MineBrukere = () => (
    <Tabs.Tab value={KandidatSøkPortefølje.MINE_BRUKERE} label='Mine brukere' />
  );

  const MittKontor = () => {
    if (valgtNavKontor) {
      return (
        <TilgangskontrollForInnhold
          skjulVarsel
          kreverEnAvRollene={[
            Roller.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET,
            Roller.AD_GRUPPE_REKRUTTERINGSBISTAND_JOBBSOKERRETTET,
          ]}
        >
          <Tabs.Tab
            className='whitespace-nowrap'
            value={KandidatSøkPortefølje.MITT_KONTOR}
            label='Mitt kontor'
          />
        </TilgangskontrollForInnhold>
      );
    }
    return null;
  };

  const MineKontorer = () => {
    if (brukerData?.enheter && brukerData.enheter.length > 1) {
      return (
        <TilgangskontrollForInnhold
          skjulVarsel
          kreverEnAvRollene={[
            Roller.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET,
            Roller.AD_GRUPPE_REKRUTTERINGSBISTAND_JOBBSOKERRETTET,
          ]}
        >
          <Tabs.Tab
            className='whitespace-nowrap'
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
      <Tabs.Tab
        className='whitespace-nowrap'
        value={KandidatSøkPortefølje.ALLE}
        label='Alle kontorer'
      />
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
        className='whitespace-nowrap'
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
        <div className='flex w-full items-baseline justify-between'>
          <KandidatSøkChips />
        </div>
        {portefølje === KandidatSøkPortefølje.VALGTE_KONTORER && (
          <ValgteKontorer />
        )}
        <KandidatSøkResultat
          alleredeLagtTil={alleredeLagtTil}
          type={portefølje as KandidatSøkPortefølje}
          stillingsId={stillingsId}
          rekrutteringstreffId={rekrutteringstreffId}
        />
      </Tabs.Panel>
    </Tabs>
  );
};

export default KandidatSøkTabs;
