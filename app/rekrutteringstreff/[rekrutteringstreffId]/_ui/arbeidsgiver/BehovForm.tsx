'use client';

import {
  ANSETTELSESFORMER,
  ArbeidsgiverBehovDTO,
  BehovTagDTO,
} from '@/app/api/rekrutteringstreff/[...slug]/arbeidsgivere/useArbeidsgivereMedBehov';
import { usePersonligeEgenskaper } from '@/app/api/pam-ontologi/personligeEgenskaper/usePersonligeEgenskaper';
import { useSamledeKvalifikasjoner } from '@/app/api/pam-ontologi/samledeKvalifikasjoner/useSamledeKvalifikasjoner';
import { TextField, UNSAFE_Combobox } from '@navikt/ds-react';
import { FC, useMemo, useState } from 'react';

const ARBEIDSSPRAK = [
  'Norsk',
  'Engelsk',
  'Svensk',
  'Dansk',
  'Tysk',
  'Fransk',
  'Spansk',
  'Annet',
];

interface Props {
  verdi: ArbeidsgiverBehovDTO;
  onChange: (neste: ArbeidsgiverBehovDTO) => void;
  feilmeldinger?: Partial<Record<keyof ArbeidsgiverBehovDTO, string>>;
}

const tagToOption = (tag: BehovTagDTO) =>
  `${tag.label}__${tag.kategori}__${tag.konseptId ?? ''}`;

const BehovForm: FC<Props> = ({ verdi, onChange, feilmeldinger }) => {
  const [samletSøk, setSamletSøk] = useState('');
  const [egenskapSøk, setEgenskapSøk] = useState('');

  const samlede = useSamledeKvalifikasjoner(samletSøk);
  const egenskaper = usePersonligeEgenskaper(egenskapSøk);

  const samledeForslag = useMemo(() => {
    const fraApi: BehovTagDTO[] =
      samlede.data?.map((d) => ({
        label: d.label,
        kategori: d.kategori,
        konseptId: d.konseptId ?? undefined,
      })) ?? [];
    const eksisterende = verdi.samledeKvalifikasjoner;
    const set = new Map<string, BehovTagDTO>();
    [...eksisterende, ...fraApi].forEach((t) => set.set(tagToOption(t), t));
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
    [...eksisterende, ...fraApi].forEach((t) => set.set(tagToOption(t), t));
    return Array.from(set.values());
  }, [egenskaper.data, verdi.personligeEgenskaper]);

  const toggleSamlet = (option: string, isSelected: boolean) => {
    const tag = samledeForslag.find((t) => tagToOption(t) === option);
    if (!tag) return; // ignorer fri tekst som ikke kommer fra pam-ontologi
    if (isSelected) {
      const finnes = verdi.samledeKvalifikasjoner.some(
        (t) => tagToOption(t) === option,
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
          (t) => tagToOption(t) !== option,
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
    const tag = egenskapForslag.find((t) => tagToOption(t) === option);
    if (!tag) return; // ignorer fri tekst som ikke kommer fra pam-ontologi
    const eksisterende = verdi.personligeEgenskaper ?? [];
    if (isSelected) {
      const finnes = eksisterende.some((t) => tagToOption(t) === option);
      if (!finnes)
        onChange({
          ...verdi,
          personligeEgenskaper: [...eksisterende, tag],
        });
    } else {
      onChange({
        ...verdi,
        personligeEgenskaper: eksisterende.filter(
          (t) => tagToOption(t) !== option,
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
        value={verdi.antall === 0 ? '' : String(verdi.antall)}
        onChange={(e) => {
          const n = Number(e.target.value);
          onChange({ ...verdi, antall: Number.isFinite(n) ? n : 0 });
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
  antall: 1,
  ansettelsesformer: [],
  personligeEgenskaper: [],
});

export const validerBehov = (
  b: ArbeidsgiverBehovDTO,
): Partial<Record<keyof ArbeidsgiverBehovDTO, string>> => {
  const feil: Partial<Record<keyof ArbeidsgiverBehovDTO, string>> = {};
  if (!b.antall || b.antall < 1) feil.antall = 'Oppgi antall stillinger';
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
export const ARBEIDSSPRAK_LISTE = ARBEIDSSPRAK;
export const tagDtoToOption = tagToOption;

export default BehovForm;
