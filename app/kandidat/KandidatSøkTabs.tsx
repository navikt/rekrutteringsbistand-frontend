'use client';

import {
  KandidatSøkPortefølje,
  useKandidatSøkFilterContext,
} from './KandidaSokFilterContext';
import ValgteKontorer from './_ui/ValgteKontorer';
import { SidepanelTrigger } from '@/components/layout/SidepanelTrigger';
import { TilgangskontrollForInnhold } from '@/components/tilgangskontroll/TilgangskontrollForInnhold';
import { Roller } from '@/components/tilgangskontroll/roller';
import { useApplikasjonContext } from '@/providers/ApplikasjonContext';
import { FilterIcon } from '@navikt/aksel-icons';
import { Button } from '@navikt/ds-react';

export default function KandidatSøkTabs() {
  const { portefølje, setPortefølje } = useKandidatSøkFilterContext();
  const { valgtNavKontor, brukerData } = useApplikasjonContext();

  const labelClass = 'tab-ellipsis';

  const MineBrukere = () => (
    <Button
      variant={
        portefølje === KandidatSøkPortefølje.MINE_BRUKERE
          ? 'primary'
          : 'tertiary'
      }
      onClick={() => setPortefølje(KandidatSøkPortefølje.MINE_BRUKERE)}
      size='xsmall'
      className={labelClass}
      title='Mine brukere'
      aria-label='Mine brukere'
    >
      Mine
    </Button>
  );

  const MittKontor = () => {
    if (!valgtNavKontor) return null;
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
          className={labelClass}
          title='Mitt kontor'
          aria-label='Mitt kontor'
        >
          Mitt kontor
        </Button>
      </TilgangskontrollForInnhold>
    );
  };

  const MineKontorer = () => {
    if (!(brukerData?.enheter && brukerData.enheter.length > 1)) return null;
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
          className={labelClass}
          title='Mine kontorer'
          aria-label='Mine kontorer'
        >
          Mine kontorer
        </Button>
      </TilgangskontrollForInnhold>
    );
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
        className={labelClass}
        title='Alle kontorer'
        aria-label='Alle kontorer'
      >
        Alle
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
        size='xsmall'
        className={labelClass}
        title='Valgte kontorer'
        aria-label='Valgte kontorer'
      >
        Velg kontor
      </Button>
    </TilgangskontrollForInnhold>
  );

  return (
    <div>
      {' '}
      {/*Trenger denne div-en for å løse z-index problemer tilknyttet container og combobox*/}
      <div className='@container contain-layout'>
        <div className='flex justify-between flex-col @3xl:flex-row @3xl:gap-0 gap-3 '>
          <div className='flex gap-2 items-center'>
            <AlleKontorer />
            <MineBrukere />
            <MittKontor />
            <MineKontorer />
            <TilgangskontrollForInnhold
              skjulVarsel
              kreverEnAvRollene={[
                Roller.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET,
              ]}
            >
              <VelgKontor />
            </TilgangskontrollForInnhold>
            <div className='ml-auto'>
              <SidepanelTrigger icon={<FilterIcon />}>Filtrer</SidepanelTrigger>
            </div>
          </div>
        </div>
      </div>
      {portefølje === KandidatSøkPortefølje.VALGTE_KONTORER && (
        <ValgteKontorer />
      )}
    </div>
  );
}
