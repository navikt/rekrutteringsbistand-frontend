'use client';

import {
  ArbeidsgiverBehovDTO,
  BehovTagDTO,
} from '@/app/api/rekrutteringstreff/[...slug]/arbeidsgivere/useArbeidsgivereMedBehov';
import { useBehovMetadata } from '@/app/api/rekrutteringstreff/arbeidsgiver-behov-metadata/useBehovMetadata';
import { usePersonligeEgenskaper } from '@/app/api/pam-ontologi/personligeEgenskaper/usePersonligeEgenskaper';
import { useSamledeKvalifikasjoner } from '@/app/api/pam-ontologi/samledeKvalifikasjoner/useSamledeKvalifikasjoner';
import { BodyShort, Heading, HStack, TextField, UNSAFE_Combobox } from '@navikt/ds-react';
import { FC, useMemo, useState } from 'react';

const FALLBACK_ARBEIDSSPRAK = [
  'Norsk',
  'Engelsk',
  'Svensk',
  'Dansk',
  'Tysk',
  'Fransk',
  'Spansk',
  'Annet',
];

const FALLBACK_ANSETTELSESFORMER = [
  'Fast',
  'Vikariat',
  'Engasjement',
  'Prosjekt',
  'Sesong',
  'Trainee',
  'Lærling',
  'Annet',
  'Selvstendig næringsdrivende',
  'Feriejobb',
  'Åremål',
];

interface Props {
  verdi: ArbeidsgiverBehovFormData;
  onChange: (
    neste: ArbeidsgiverBehovFormData,
    meta?: BehovFormEndringsMeta,
  ) => void;
  feilmeldinger?: Partial<Record<BehovFormFelt, string>>;
}

export type ArbeidsgiverBehovFormData = Omit<ArbeidsgiverBehovDTO, 'antall'> & {
  antall: string;
};

export type BehovFormFelt = keyof ArbeidsgiverBehovFormData;

export type BehovFormEndringsMeta = {
  felt: BehovFormFelt;
  type: 'input' | 'blur' | 'toggle';
};

export const BEHOV_FELT_ID = {
  antall: 'arbeidsgiver-behov-antall',
  samledeKvalifikasjoner: 'arbeidsgiver-behov-kvalifikasjoner',
  arbeidssprak: 'arbeidsgiver-behov-sprak',
  ansettelsesformer: 'arbeidsgiver-behov-ansettelsesform',
  personligeEgenskaper: 'arbeidsgiver-behov-personlige-egenskaper',
} as const satisfies Record<BehovFormFelt, string>;

const tagToValue = (tag: BehovTagDTO) =>
  `${tag.kategori}:${tag.konseptId}`;

const formaterKategori = (kategori: string) =>
  kategori.toLowerCase().replace(/_/g, ' ');

const tagToLabel = (tag: BehovTagDTO) =>
  `${tag.label} (${formaterKategori(tag.kategori)})`;

const tagToOption = (tag: BehovTagDTO) => ({
  label: tagToLabel(tag),
  value: tagToValue(tag),
});

const egenskapToOption = (tag: BehovTagDTO) => ({
  label: tag.label,
  value: tagToValue(tag),
});

const oppdaterBehov = (
  verdi: ArbeidsgiverBehovFormData,
  onChange: Props['onChange'],
  neste: Partial<ArbeidsgiverBehovFormData>,
  meta: BehovFormEndringsMeta,
) => onChange({ ...verdi, ...neste }, meta);

const BehovForm: FC<Props> = ({ verdi, onChange, feilmeldinger }) => {
  const [samletSøk, setSamletSøk] = useState('');
  const [egenskapSøk, setEgenskapSøk] = useState('');

  const samlede = useSamledeKvalifikasjoner(samletSøk);
  const egenskaper = usePersonligeEgenskaper(egenskapSøk);
  const metadata = useBehovMetadata();
  const ARBEIDSSPRAK = metadata.data?.arbeidssprak ?? FALLBACK_ARBEIDSSPRAK;
  const ANSETTELSESFORMER =
    metadata.data?.ansettelsesformer ?? FALLBACK_ANSETTELSESFORMER;

  const samledeForslag = useMemo(() => {
    const fraApi: BehovTagDTO[] =
      samlede.data
        ?.filter((d): d is typeof d & { konseptId: number } => d.konseptId != null)
        .map((d) => ({
          label: d.label,
          kategori: d.kategori,
          konseptId: d.konseptId,
        })) ?? [];
    const eksisterende = verdi.samledeKvalifikasjoner;
    const set = new Map<string, BehovTagDTO>();
    [...eksisterende, ...fraApi].forEach((t) => set.set(tagToValue(t), t));
    return Array.from(set.values());
  }, [samlede.data, verdi.samledeKvalifikasjoner]);

  const egenskapForslag = useMemo(() => {
    const fraApi: BehovTagDTO[] =
      egenskaper.data?.map((d) => ({
        label: d.label,
        kategori: 'PERSONLIG_EGENSKAP',
        konseptId: d.konseptId,
      })) ?? [];
    const eksisterende = verdi.personligeEgenskaper ?? [];
    const set = new Map<string, BehovTagDTO>();
    [...eksisterende, ...fraApi].forEach((t) => set.set(tagToValue(t), t));
    return Array.from(set.values());
  }, [egenskaper.data, verdi.personligeEgenskaper]);

  const toggleSamlet = (option: string, isSelected: boolean) => {
    const tag = samledeForslag.find((t) => tagToValue(t) === option);
    if (!tag) return; // ignorer fri tekst som ikke kommer fra pam-ontologi
    if (isSelected) {
      const finnes = verdi.samledeKvalifikasjoner.some(
        (t) => tagToValue(t) === option,
      );
      if (!finnes)
        oppdaterBehov(
          verdi,
          onChange,
          {
            samledeKvalifikasjoner: [...verdi.samledeKvalifikasjoner, tag],
          },
          { felt: 'samledeKvalifikasjoner', type: 'toggle' },
        );
    } else {
      oppdaterBehov(
        verdi,
        onChange,
        {
          samledeKvalifikasjoner: verdi.samledeKvalifikasjoner.filter(
            (t) => tagToValue(t) !== option,
          ),
        },
        { felt: 'samledeKvalifikasjoner', type: 'toggle' },
      );
    }
  };

  const toggleSpråk = (option: string, isSelected: boolean) => {
    if (isSelected) {
      const liste = verdi.arbeidssprak;
      oppdaterBehov(
        verdi,
        onChange,
        {
          arbeidssprak: liste.includes(option) ? liste : [...liste, option],
        },
        { felt: 'arbeidssprak', type: 'toggle' },
      );
    } else {
      oppdaterBehov(
        verdi,
        onChange,
        {
          arbeidssprak: verdi.arbeidssprak.filter((s) => s !== option),
        },
        { felt: 'arbeidssprak', type: 'toggle' },
      );
    }
  };

  const toggleAnsettelsesform = (option: string, isSelected: boolean) => {
    if (isSelected) {
      const liste = verdi.ansettelsesformer;
      oppdaterBehov(
        verdi,
        onChange,
        {
          ansettelsesformer: liste.includes(option)
            ? liste
            : [...liste, option],
        },
        { felt: 'ansettelsesformer', type: 'toggle' },
      );
    } else {
      oppdaterBehov(
        verdi,
        onChange,
        {
          ansettelsesformer: verdi.ansettelsesformer.filter((s) => s !== option),
        },
        { felt: 'ansettelsesformer', type: 'toggle' },
      );
    }
  };

  const toggleEgenskap = (option: string, isSelected: boolean) => {
    const tag = egenskapForslag.find((t) => tagToValue(t) === option);
    if (!tag) return; // ignorer fri tekst som ikke kommer fra pam-ontologi
    const eksisterende = verdi.personligeEgenskaper ?? [];
    if (isSelected) {
      const finnes = eksisterende.some((t) => tagToValue(t) === option);
      if (!finnes)
        oppdaterBehov(
          verdi,
          onChange,
          {
            personligeEgenskaper: [...eksisterende, tag],
          },
          { felt: 'personligeEgenskaper', type: 'toggle' },
        );
    } else {
      oppdaterBehov(
        verdi,
        onChange,
        {
          personligeEgenskaper: eksisterende.filter(
            (t) => tagToValue(t) !== option,
          ),
        },
        { felt: 'personligeEgenskaper', type: 'toggle' },
      );
    }
  };

  return (
    <div className='space-y-4'>
      <div className='space-y-1'>
        <Heading level='3' size='small'>
          Dokumentasjon av rekrutteringsbehov
        </Heading>
        <BodyShort size='small'>
          Denne informasjonen er kun synlig for eier av rekrutteringstreffet og
          brukes til å dokumentere et konkret rekrutteringsbehov fra
          arbeidsgiver.
        </BodyShort>
      </div>

      <HStack gap='space-16' align='start' wrap={false}>
        <div className='shrink-0 w-[125px]'>
          <TextField
            id={BEHOV_FELT_ID.antall}
            label='Antall stillinger'
            description='Anslagsvis'
            type='number'
            inputMode='numeric'
            min={1}
            max={99}
            value={verdi.antall}
            onChange={(e) => {
              const begrenset = e.target.value.replace(/\D/g, '').slice(0, 2);
              oppdaterBehov(
                verdi,
                onChange,
                { antall: begrenset },
                { felt: 'antall', type: 'input' },
              );
            }}
            onBlur={() => onChange(verdi, { felt: 'antall', type: 'blur' })}
            error={feilmeldinger?.antall}
          />
        </div>

        <div className='flex-1 min-w-0 space-y-4'>
          <UNSAFE_Combobox
            id={BEHOV_FELT_ID.samledeKvalifikasjoner}
            label='Hva arbeidsgiver leter etter'
            description='Velg yrkestittel, fagbrev, førerkort, godkjenninger osv'
            isMultiSelect
            isLoading={samlede.isLoading}
            options={samledeForslag.map(tagToOption)}
            selectedOptions={verdi.samledeKvalifikasjoner.map(tagToOption)}
            onToggleSelected={toggleSamlet}
            onChange={(v) => setSamletSøk(v ?? '')}
            toggleListButton={false}
            error={feilmeldinger?.samledeKvalifikasjoner}
          />

          <UNSAFE_Combobox
            id={BEHOV_FELT_ID.arbeidssprak}
            label='Språk'
            isMultiSelect
            options={ARBEIDSSPRAK}
            selectedOptions={verdi.arbeidssprak}
            onToggleSelected={toggleSpråk}
            error={feilmeldinger?.arbeidssprak}
          />

          <UNSAFE_Combobox
            id={BEHOV_FELT_ID.ansettelsesformer}
            label='Ansettelsesform'
            description='Fast, vikariat, sesong osv'
            isMultiSelect
            options={[...ANSETTELSESFORMER]}
            selectedOptions={verdi.ansettelsesformer}
            onToggleSelected={toggleAnsettelsesform}
            error={feilmeldinger?.ansettelsesformer}
          />

          <UNSAFE_Combobox
            id={BEHOV_FELT_ID.personligeEgenskaper}
            label={
              <span>
                Personlige egenskaper{' '}
                <BodyShort as='span' size='small' textColor='subtle'>
                  (Valgfritt)
                </BodyShort>
              </span>
            }
            isMultiSelect
            isLoading={egenskaper.isLoading}
            options={egenskapForslag.map(egenskapToOption)}
            selectedOptions={(verdi.personligeEgenskaper ?? []).map(egenskapToOption)}
            onToggleSelected={toggleEgenskap}
            onChange={(v) => setEgenskapSøk(v ?? '')}
            toggleListButton={false}
          />
        </div>
      </HStack>
    </div>
  );
};

export const tomtBehov = (): ArbeidsgiverBehovFormData => ({
  samledeKvalifikasjoner: [],
  arbeidssprak: [],
  antall: '',
  ansettelsesformer: [],
  personligeEgenskaper: [],
});

export const tilBehovFormData = (
  behov: ArbeidsgiverBehovDTO | null | undefined,
): ArbeidsgiverBehovFormData =>
  behov
    ? {
        ...behov,
        antall: String(behov.antall),
        personligeEgenskaper: behov.personligeEgenskaper ?? [],
      }
    : tomtBehov();

export const validerBehov = (
  b: ArbeidsgiverBehovFormData,
): Partial<Record<BehovFormFelt, string>> => {
  const feil: Partial<Record<BehovFormFelt, string>> = {};
  const antall = Number(b.antall);
  if (b.antall.trim() === '' || antall < 1) feil.antall = 'Oppgi antall stillinger';
  else if (!Number.isInteger(antall)) feil.antall = 'Oppgi antall stillinger som et helt tall';
  else if (antall > 99)
    feil.antall = 'Antall stillinger kan ikke være større enn 99';
  if (b.samledeKvalifikasjoner.length === 0)
    feil.samledeKvalifikasjoner =
      'Velg minst én kvalifikasjon arbeidsgiver leter etter';
  if (b.arbeidssprak.length === 0)
    feil.arbeidssprak = 'Velg minst ett arbeidsspråk';
  if (b.ansettelsesformer.length === 0)
    feil.ansettelsesformer = 'Velg minst én ansettelsesform';
  return feil;
};

export const tilArbeidsgiverBehovDTO = (
  behov: ArbeidsgiverBehovFormData,
): ArbeidsgiverBehovDTO | null => {
  const feil = validerBehov(behov);
  if (Object.keys(feil).length > 0) return null;

  return {
    ...behov,
    antall: Number(behov.antall),
    personligeEgenskaper: behov.personligeEgenskaper ?? [],
  };
};

export const behovFeilTilErrorSummaryItems = (
  feil: Partial<Record<BehovFormFelt, string>>,
) =>
  (Object.entries(feil) as Array<[BehovFormFelt, string | undefined]>)
    .filter(([, melding]) => Boolean(melding))
    .map(([felt, melding]) => ({
      href: `#${BEHOV_FELT_ID[felt]}`,
      melding: melding as string,
    }));

// Visningsetiketter — eksporteres slik at andre komponenter kan rendre samme tekstene som forms.
export const tagDtoToOption = tagToValue;
export const tagDtoToVisning = tagToLabel;

export default BehovForm;
