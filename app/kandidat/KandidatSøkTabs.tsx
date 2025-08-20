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
import KandidatSøkFilter from './kandidat-søk-filter/KandidatSøkFilter';
import { Button } from '@navikt/ds-react';
import * as React from 'react';

interface KandidatSøkTabsProps {
  stillingsId?: string;
  rekrutteringstreffId?: string;
  alleredeLagtTilTreff?: string[];
  alleredeLagtTilKandidatliste?: string[];
}

const KandidatSøkTabs: React.FC<KandidatSøkTabsProps> = ({
  stillingsId,
  rekrutteringstreffId,
  alleredeLagtTilTreff,
  alleredeLagtTilKandidatliste,
}) => {
  const { portefølje, setPortefølje } = useKandidatSøkFilterContext();
  const { valgtNavKontor, brukerData } = useApplikasjonContext();

  const MineBrukere = () => (
    <Button
      variant={
        portefølje === KandidatSøkPortefølje.MINE_BRUKERE
          ? 'primary'
          : 'tertiary'
      }
      onClick={() => setPortefølje(KandidatSøkPortefølje.MINE_BRUKERE)}
      size='xsmall'
    >
      Mine brukere
    </Button>
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
          <Button
            variant={
              portefølje === KandidatSøkPortefølje.MITT_KONTOR
                ? 'primary'
                : 'tertiary'
            }
            onClick={() => setPortefølje(KandidatSøkPortefølje.MITT_KONTOR)}
            size='xsmall'
          >
            Mitt kontor
          </Button>
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
          <Button
            variant={
              portefølje === KandidatSøkPortefølje.MINE_KONTORER
                ? 'primary'
                : 'tertiary'
            }
            onClick={() => setPortefølje(KandidatSøkPortefølje.MINE_KONTORER)}
            size='xsmall'
          >
            Mine kontorer
          </Button>
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
      <Button
        variant={
          portefølje === KandidatSøkPortefølje.ALLE ? 'primary' : 'tertiary'
        }
        onClick={() => setPortefølje(KandidatSøkPortefølje.ALLE)}
        size='xsmall'
      >
        Alle kontorer
      </Button>
    </TilgangskontrollForInnhold>
  );

  const VelgKontor = () => (
    <TilgangskontrollForInnhold
      skjulVarsel
      kreverEnAvRollene={[
        Roller.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET,
      ]}
    >
      <Button
        variant={
          portefølje === KandidatSøkPortefølje.VALGTE_KONTORER
            ? 'primary'
            : 'tertiary'
        }
        onClick={() => setPortefølje(KandidatSøkPortefølje.VALGTE_KONTORER)}
        size='small'
      >
        Valgte kontorer
      </Button>
    </TilgangskontrollForInnhold>
  );

  return (
    <div>
      <div className='flex justify-between'>
        <div className='flex gap-2'>
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
        </div>
        <KandidatSøkFilter />
      </div>
      {portefølje === KandidatSøkPortefølje.VALGTE_KONTORER && (
        <ValgteKontorer />
      )}
      <KandidatSøkChips />
      <KandidatSøkResultat
        alleredeLagtTilTreff={alleredeLagtTilTreff}
        alleredeLagtTilKandidatliste={alleredeLagtTilKandidatliste}
        type={portefølje as KandidatSøkPortefølje}
        stillingsId={stillingsId}
        rekrutteringstreffId={rekrutteringstreffId}
      />
    </div>
  );
};

export default KandidatSøkTabs;
