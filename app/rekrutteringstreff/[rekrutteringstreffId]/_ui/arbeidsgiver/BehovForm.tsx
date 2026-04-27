'use client';

import {
  ArbeidsgiverBehovDTO,
  BehovTagDTO,
} from '@/app/api/rekrutteringstreff/[...slug]/arbeidsgivere/useArbeidsgivereMedBehov';
import { useBehovMetadata } from '@/app/api/rekrutteringstreff/arbeidsgiver-behov-metadata/useBehovMetadata';
import { usePersonligeEgenskaper } from '@/app/api/pam-ontologi/personligeEgenskaper/usePersonligeEgenskaper';
import { useSamledeKvalifikasjoner } from '@/app/api/pam-ontologi/samledeKvalifikasjoner/useSamledeKvalifikasjoner';
import { TextField, UNSAFE_Combobox } from '@navikt/ds-react';
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
  verdi: ArbeidsgiverBehovDTO;
  onChange: (neste: ArbeidsgiverBehovDTO) => void;
  feilmeldinger?: Partial<Record<keyof ArbeidsgiverBehovDTO, string>>;
}

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
        onChange({
          ...verdi,
          samledeKvalifikasjoner: [...verdi.samledeKvalifikasjoner, tag],
        });
    } else {
      onChange({
        ...verdi,
        samledeKvalifikasjoner: verdi.samledeKvalifikasjoner.filter(
          (t) => tagToValue(t) !== option,
        ),
      });
    }
  };

  const toggleSpråk = (option: string, isSelected: boolean) => {
    if (isSelected) {
      const liste = verdi.arbeidssprak;
      onChange({
        ...verdi,
        arbeidssprak: liste.includes(option) ? liste : [...liste, option],
      });
    } else {
      onChange({
        ...verdi,
        arbeidssprak: verdi.arbeidssprak.filter((s) => s !== option),
      });
    }
  };

  const toggleAnsettelsesform = (option: string, isSelected: boolean) => {
    if (isSelected) {
      const liste = verdi.ansettelsesformer;
      onChange({
        ...verdi,
        ansettelsesformer: liste.includes(option)
          ? liste
          : [...liste, option],
      });
    } else {
      onChange({
        ...verdi,
        ansettelsesformer: verdi.ansettelsesformer.filter((s) => s !== option),
      });
    }
  };

  const toggleEgenskap = (option: string, isSelected: boolean) => {
    const tag = egenskapForslag.find((t) => tagToValue(t) === option);
    if (!tag) return; // ignorer fri tekst som ikke kommer fra pam-ontologi
    const eksisterende = verdi.personligeEgenskaper ?? [];
    if (isSelected) {
      const finnes = eksisterende.some((t) => tagToValue(t) === option);
      if (!finnes)
        onChange({
          ...verdi,
          personligeEgenskaper: [...eksisterende, tag],
        });
    } else {
      onChange({
        ...verdi,
        personligeEgenskaper: eksisterende.filter(
          (t) => tagToValue(t) !== option,
        ),
      });
    }
  };

  return (
    <div className='space-y-4'>
      <TextField
        label='Antall stillinger'
        type='number'
        min={1}
        value={verdi.antall == null ? '' : String(verdi.antall)}
        onChange={(e) => {
          const raa = e.target.value;
          if (raa === '') {
            onChange({ ...verdi, antall: null as unknown as number });
            return;
          }
          const n = Number(raa);
          onChange({ ...verdi, antall: Number.isFinite(n) ? n : (null as unknown as number) });
        }}
        error={feilmeldinger?.antall}
      />

      <UNSAFE_Combobox
        label='Hva arbeidsgiver leter etter'
        description='Skriv minst to bokstaver. Velg fra forslagene fra pam-ontologi.'
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
        label='Språk'
        isMultiSelect
        options={ARBEIDSSPRAK}
        selectedOptions={verdi.arbeidssprak}
        onToggleSelected={toggleSpråk}
        error={feilmeldinger?.arbeidssprak}
      />

      <UNSAFE_Combobox
        label='Ansettelsesform'
        isMultiSelect
        options={[...ANSETTELSESFORMER]}
        selectedOptions={verdi.ansettelsesformer}
        onToggleSelected={toggleAnsettelsesform}
        error={feilmeldinger?.ansettelsesformer}
      />

      <UNSAFE_Combobox
        label='Personlige egenskaper (valgfritt)'
        description='Skriv minst to bokstaver. Velg fra forslagene fra pam-ontologi.'
        isMultiSelect
        isLoading={egenskaper.isLoading}
        options={egenskapForslag.map(tagToOption)}
        selectedOptions={(verdi.personligeEgenskaper ?? []).map(tagToOption)}
        onToggleSelected={toggleEgenskap}
        onChange={(v) => setEgenskapSøk(v ?? '')}
        toggleListButton={false}
      />
    </div>
  );
};

export const tomtBehov = (): ArbeidsgiverBehovDTO => ({
  samledeKvalifikasjoner: [],
  arbeidssprak: [],
  antall: null as unknown as number,
  ansettelsesformer: [],
  personligeEgenskaper: [],
});

export const validerBehov = (
  b: ArbeidsgiverBehovDTO,
): Partial<Record<keyof ArbeidsgiverBehovDTO, string>> => {
  const feil: Partial<Record<keyof ArbeidsgiverBehovDTO, string>> = {};
  if (b.antall == null || b.antall < 1) feil.antall = 'Oppgi antall stillinger';
  if (b.samledeKvalifikasjoner.length === 0)
    feil.samledeKvalifikasjoner =
      'Velg minst én kvalifikasjon arbeidsgiver leter etter';
  if (b.arbeidssprak.length === 0)
    feil.arbeidssprak = 'Velg minst ett arbeidsspråk';
  if (b.ansettelsesformer.length === 0)
    feil.ansettelsesformer = 'Velg minst én ansettelsesform';
  return feil;
};

// Visningsetiketter — eksporteres slik at andre komponenter kan rendre samme tekstene som forms.
export const tagDtoToOption = tagToValue;
export const tagDtoToVisning = tagToLabel;

export default BehovForm;
