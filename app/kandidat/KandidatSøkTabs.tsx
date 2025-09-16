'use client';

import {
  KandidatSøkPortefølje,
  useKandidatSøkFilterContext,
} from './KandidaSokFilterContext';
import KandidatSøkResultat from './KandidatSøkResultat';
import KandidatSøkChips from './_ui/KandidatSøkChips';
import ValgteKontorer from './_ui/ValgteKontorer';
import KandidatSøkFilter from './kandidat-søk-filter/KandidatSøkFilter';
import Arbeidserfaring from '@/app/kandidat/kandidat-søk-filter/_ui/Arbeidserfaring';
import Arbeidsønsker from '@/app/kandidat/kandidat-søk-filter/_ui/Arbeidsønsker';
import FritekstSøk from '@/app/kandidat/kandidat-søk-filter/_ui/FritekstSøk';
import Førerkort from '@/app/kandidat/kandidat-søk-filter/_ui/Førerkort';
import Hovedmål from '@/app/kandidat/kandidat-søk-filter/_ui/Hovedmål';
import Innsatsgrupper from '@/app/kandidat/kandidat-søk-filter/_ui/Innsatsgrupper';
import KandidatStedSøk from '@/app/kandidat/kandidat-søk-filter/_ui/KandidatStedSøk';
import Kompetanse from '@/app/kandidat/kandidat-søk-filter/_ui/Kompetanse';
import PrioriterteMålgrupper from '@/app/kandidat/kandidat-søk-filter/_ui/PrioriterteMålgrupper';
import Språk from '@/app/kandidat/kandidat-søk-filter/_ui/Språk';
import Utdanningsnivå from '@/app/kandidat/kandidat-søk-filter/_ui/Utdanningsnivå';
import { TilgangskontrollForInnhold } from '@/components/tilgangskontroll/TilgangskontrollForInnhold';
import { Roller } from '@/components/tilgangskontroll/roller';
import { useApplikasjonContext } from '@/providers/ApplikasjonContext';
import { Button } from '@navikt/ds-react';
import { FC } from 'react';

interface KandidatSøkTabsProps {
  stillingsId?: string;
  rekrutteringstreffId?: string;
  alleredeLagtTilTreff?: string[];
  alleredeLagtTilKandidatliste?: string[];
}

const KandidatSøkTabs: FC<KandidatSøkTabsProps> = ({
  stillingsId,
  rekrutteringstreffId,
  alleredeLagtTilTreff,
  alleredeLagtTilKandidatliste,
}) => {
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
      Mine brukere
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
        size='xsmall'
        className={labelClass}
        title='Valgte kontorer'
        aria-label='Valgte kontorer'
      >
        Valgte kontorer
      </Button>
    </TilgangskontrollForInnhold>
  );

  return (
    <div className='@container'>
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
        </div>
        <KandidatSøkFilter />
      </div>
      {portefølje === KandidatSøkPortefølje.VALGTE_KONTORER && (
        <ValgteKontorer />
      )}
      <KandidatSøkChips />
      <div className='@container/kandidatsøk flex'>
        <div className='flex-grow min-w-0'>
          <KandidatSøkResultat
            alleredeLagtTilTreff={alleredeLagtTilTreff}
            alleredeLagtTilKandidatliste={alleredeLagtTilKandidatliste}
            type={portefølje as KandidatSøkPortefølje}
            stillingsId={stillingsId}
            rekrutteringstreffId={rekrutteringstreffId}
          />
        </div>
        <div className='hidden @[720px]:block ml-4 pt-4  max-w-[200px]'>
          <div className='flex flex-col gap-4'>
            <FritekstSøk />
            <Arbeidsønsker />
            <KandidatStedSøk />
            <Kompetanse />
            <Førerkort />
            <Språk />
            <Arbeidserfaring />
            <Hovedmål />
            <Utdanningsnivå />
            <PrioriterteMålgrupper />
            <Innsatsgrupper />
          </div>
        </div>
      </div>
    </div>
  );
};

export default KandidatSøkTabs;
