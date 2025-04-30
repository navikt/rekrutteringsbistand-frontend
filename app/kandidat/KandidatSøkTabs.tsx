'use client';

import { TilgangskontrollForInnhold } from '../components/tilgangskontroll/TilgangskontrollForInnhold';
import { Roller } from '../components/tilgangskontroll/roller';
import { useApplikasjonContext } from '../providers/ApplikasjonContext';
import {
  KandidatSøkPortefølje,
  useKandidatSøkFilterContext,
} from './KandidaSokFilterContext';
import KandidatSøkFilter from './KandidatSøkFilter/KandidatSøkFilter';
import KandidatSøkResultat from './KandidatSøkResultat';
import KandidatSøkChips from './components/KandidatSøkChips';
import ValgteKontorer from './components/ValgteKontorer';
import { ToggleGroup } from '@navikt/ds-react';
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
    <ToggleGroup.Item
      value={KandidatSøkPortefølje.MINE_BRUKERE}
      label='Mine brukere'
    />
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
          <ToggleGroup.Item
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
          <ToggleGroup.Item
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
      <ToggleGroup.Item
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
      <ToggleGroup.Item
        className='whitespace-nowrap'
        value={KandidatSøkPortefølje.VALGTE_KONTORER}
        label='Valgte kontorer'
      />
    </TilgangskontrollForInnhold>
  );

  return (
    <div className='grid gap-4 mb-2'>
      <ToggleGroup
        size='small'
        value={portefølje}
        onChange={(value) => setPortefølje(value)}
      >
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

        {portefølje === KandidatSøkPortefølje.VALGTE_KONTORER && (
          <ValgteKontorer />
        )}
      </ToggleGroup>
      <KandidatSøkFilter />
      <div className='flex w-full items-baseline justify-between'>
        <KandidatSøkChips />
      </div>
      <KandidatSøkResultat
        alleredeLagtTil={alleredeLagtTil}
        type={portefølje as KandidatSøkPortefølje}
        stillingsId={stillingsId}
        rekrutteringstreffId={rekrutteringstreffId}
      />
    </div>
  );
};

export default KandidatSøkTabs;
