'use client';

import { usePersonligeEgenskaper } from '@/app/api/pam-ontologi/personlige_egenskaper/usePersonligeEgenskaper';
import { useSamledeKvalifikasjoner } from '@/app/api/pam-ontologi/samlede_kvalifikasjoner/useSamledeKvalifikasjoner';
import {
  ArbeidsgiversBehovDTO,
  BehovTagDTO,
} from '@/app/api/rekrutteringstreff/[...slug]/arbeidsgivere/useArbeidsgivereMedBehov';
import { useBehovMetadata } from '@/app/api/rekrutteringstreff/arbeidsgiver-behov-metadata/useBehovMetadata';
import {
  Alert,
  BodyShort,
  Heading,
  Stack,
  TextField,
  UNSAFE_Combobox,
} from '@navikt/ds-react';
import { FC, useMemo, useState } from 'react';
import {
  Control,
  Controller,
  Resolver,
  UseFormTrigger,
  useWatch,
} from 'react-hook-form';

interface Props {
  control: Control<ArbeidsgiversBehovFormData>;
  idPrefix?: string;
  trigger?: UseFormTrigger<ArbeidsgiversBehovFormData>;
  revaliderVedEndring?: boolean;
}

export type ArbeidsgiversBehovFormData = Omit<
  ArbeidsgiversBehovDTO,
  'antall'
> & {
  antall: string;
};

export type BehovFormFelt = keyof ArbeidsgiversBehovFormData;

export const BEHOV_FELT_ID = {
  antall: 'arbeidsgiver-behov-antall',
  samledeKvalifikasjoner: 'arbeidsgiver-behov-kvalifikasjoner',
  arbeidssprak: 'arbeidsgiver-behov-sprak',
  ansettelsesformer: 'arbeidsgiver-behov-ansettelsesform',
  personligeEgenskaper: 'arbeidsgiver-behov-personlige-egenskaper',
} as const satisfies Record<BehovFormFelt, string>;

export const behovFeltId = (felt: BehovFormFelt, idPrefix?: string): string =>
  idPrefix ? `${idPrefix}-${BEHOV_FELT_ID[felt]}` : BEHOV_FELT_ID[felt];

const tagToValue = (tag: BehovTagDTO) =>
  `${tag.kategori}:${tag.konseptId ?? tag.label}`;

const KATEGORI_VISNINGSNAVN: Record<string, string> = {
  YRKESTITTEL: 'yrkestittel',
  KOMPETANSE: 'kompetanse',
  AUTORISASJON: 'autorisasjon',
  FAGDOKUMENTASJON: 'fagdokumentasjon',
  FORERKORT: 'førerkort',
};

const formaterKategori = (kategori: string) =>
  KATEGORI_VISNINGSNAVN[kategori] ?? kategori.toLowerCase().replace(/_/g, ' ');

const tagToLabel = (tag: BehovTagDTO) =>
  `${tag.label} (${formaterKategori(tag.kategori)})`;

const tagToOption = (tag: BehovTagDTO) => ({
  label: tagToLabel(tag),
  value: tagToValue(tag),
});

const fjernValgte = <TOption, TValgt>(
  options: TOption[],
  valgte: TValgt[] | undefined,
  optionTilVerdi: (option: TOption) => string,
  valgtTilVerdi: (valgt: TValgt) => string,
): TOption[] => {
  const valgteVerdier = new Set((valgte ?? []).map(valgtTilVerdi));
  return options.filter((option) => !valgteVerdier.has(optionTilVerdi(option)));
};

const egenskapToOption = (tag: BehovTagDTO) => ({
  label: tag.label,
  value: tagToValue(tag),
});

const PRIORITERTE_ARBEIDSSPRAK = ['Norsk', 'Engelsk'];

const prioriterArbeidssprak = (arbeidssprak: string[]) => [
  ...PRIORITERTE_ARBEIDSSPRAK.filter((sprak) => arbeidssprak.includes(sprak)),
  ...arbeidssprak.filter((sprak) => !PRIORITERTE_ARBEIDSSPRAK.includes(sprak)),
];

const normaliserSøk = (tekst: string) => tekst.trim().toLocaleLowerCase('nb');

const sorterSprakTreff = (tilgjengelige: string[], søk: string): string[] => {
  const fullTreff: string[] = [];
  const prefiksTreff: string[] = [];
  const midtenTreff: string[] = [];

  tilgjengelige.forEach((sprak) => {
    const normalisertSprak = normaliserSøk(sprak);

    if (normalisertSprak === søk) {
      fullTreff.push(sprak);
    } else if (normalisertSprak.startsWith(søk)) {
      prefiksTreff.push(sprak);
    } else if (normalisertSprak.includes(søk)) {
      midtenTreff.push(sprak);
    }
  });

  return [...fullTreff, ...prefiksTreff, ...midtenTreff];
};

type ApiTag = { label: string; kategori?: string; konseptId: number | null };

const byggTagForslag = (
  apiData: ReadonlyArray<ApiTag> | undefined,
  eksisterende: BehovTagDTO[],
  kategoriOverstyring?: string,
): BehovTagDTO[] => {
  const fraApi: BehovTagDTO[] = (apiData ?? []).map((d) => ({
    label: d.label,
    kategori: kategoriOverstyring ?? d.kategori ?? '',
    konseptId: d.konseptId,
  }));
  return Array.from(
    new Map(
      [...eksisterende, ...fraApi].map((t) => [tagToValue(t), t]),
    ).values(),
  );
};

const BehovForm: FC<Props> = ({
  control,
  idPrefix,
  trigger,
  revaliderVedEndring = false,
}) => {
  const [samletSøk, setSamletSøk] = useState('');
  const [egenskapSøk, setEgenskapSøk] = useState('');
  const [sprakSøk, setSprakSøk] = useState('');

  const samlede = useSamledeKvalifikasjoner(samletSøk);
  const egenskaper = usePersonligeEgenskaper(egenskapSøk);
  const metadata = useBehovMetadata();
  const ARBEIDSSPRAK = metadata.data?.arbeidssprak ?? [];
  const ANSETTELSESFORMER = metadata.data?.ansettelsesformer ?? [];

  const samledeValgte = useWatch({ control, name: 'samledeKvalifikasjoner' });
  const egenskapValgte = useWatch({ control, name: 'personligeEgenskaper' });
  const sprakValgte = useWatch({ control, name: 'arbeidssprak' });
  const samletSøkErAktivt = samletSøk.trim().length >= 2;
  const egenskapSøkErAktivt = egenskapSøk.trim().length >= 2;

  const samledeForslag = useMemo(
    () => byggTagForslag(samlede.data, samledeValgte ?? []),
    [samlede.data, samledeValgte],
  );
  const samledeOptions = useMemo(
    () =>
      fjernValgte(
        samledeForslag.map(tagToOption),
        samledeValgte,
        (option) => option.value,
        tagToValue,
      ),
    [samledeForslag, samledeValgte],
  );
  const samledeFiltrerteOptions = useMemo(
    () =>
      fjernValgte(
        byggTagForslag(samlede.data, []).map(tagToOption),
        samledeValgte,
        (option) => option.value,
        tagToValue,
      ),
    [samlede.data, samledeValgte],
  );

  const sprakFiltrerteOptions = useMemo(() => {
    const tilgjengelige = fjernValgte(
      ARBEIDSSPRAK,
      sprakValgte ?? [],
      (option) => option,
      (valgt) => valgt,
    );
    const søk = normaliserSøk(sprakSøk);
    if (!søk) {
      return prioriterArbeidssprak(tilgjengelige);
    }
    return sorterSprakTreff(tilgjengelige, søk);
  }, [ARBEIDSSPRAK, sprakValgte, sprakSøk]);

  const egenskapForslag = useMemo(
    () =>
      byggTagForslag(
        egenskaper.data,
        egenskapValgte ?? [],
        'PERSONLIG_EGENSKAP',
      ),
    [egenskaper.data, egenskapValgte],
  );
  const egenskapOptions = useMemo(
    () =>
      fjernValgte(
        egenskapForslag.map(egenskapToOption),
        egenskapValgte,
        (option) => option.value,
        tagToValue,
      ),
    [egenskapForslag, egenskapValgte],
  );

  const lagTagToggle =
    (
      verdi: BehovTagDTO[],
      forslag: BehovTagDTO[],
      onChange: (neste: BehovTagDTO[]) => void,
      felt: BehovFormFelt,
    ) =>
    (option: string, isSelected: boolean) => {
      let nesteVerdi = verdi;

      if (isSelected) {
        const tag = forslag.find((t) => tagToValue(t) === option);
        if (!tag) return;
        if (verdi.some((t) => tagToValue(t) === option)) return;
        nesteVerdi = [...verdi, tag];
      } else {
        nesteVerdi = verdi.filter((t) => tagToValue(t) !== option);
      }

      onChange(nesteVerdi);
      if (revaliderVedEndring) {
        void trigger?.(felt);
      }
    };

  const lagStringToggle =
    (
      verdi: string[],
      onChange: (neste: string[]) => void,
      felt: BehovFormFelt,
    ) =>
    (option: string, isSelected: boolean) => {
      const neste = isSelected
        ? verdi.includes(option)
          ? verdi
          : [...verdi, option]
        : verdi.filter((s) => s !== option);
      onChange(neste);
      if (revaliderVedEndring) {
        void trigger?.(felt);
      }
    };

  return (
    <div className='space-y-4'>
      {metadata.error && (
        <Alert variant='error' size='small'>
          Kunne ikke laste språk og ansettelsesformer. Last siden på nytt.
        </Alert>
      )}
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

      <Stack
        direction={{ xs: 'column', md: 'row' }}
        gap='space-16'
        align={{ xs: 'stretch', md: 'start' }}
      >
        <div className='w-full md:w-[125px] md:shrink-0'>
          <Controller
            control={control}
            name='antall'
            render={({ field, fieldState }) => (
              <TextField
                ref={field.ref}
                name={field.name}
                id={behovFeltId('antall', idPrefix)}
                label='Antall stillinger'
                description='Anslagsvis'
                inputMode='numeric'
                maxLength={2}
                min={1}
                max={99}
                value={field.value}
                onChange={(e) => field.onChange(e.target.value.slice(0, 2))}
                onBlur={field.onBlur}
                error={fieldState.error?.message}
              />
            )}
          />
        </div>

        <div className='min-w-0 flex-1 space-y-4'>
          <Controller
            control={control}
            name='samledeKvalifikasjoner'
            render={({ field, fieldState }) => (
              <UNSAFE_Combobox
                id={behovFeltId('samledeKvalifikasjoner', idPrefix)}
                ref={field.ref}
                name={field.name}
                label='Hva arbeidsgiver leter etter'
                description='Velg yrkestittel, fagbrev, førerkort, godkjenninger osv'
                isMultiSelect
                isListOpen={samletSøkErAktivt ? undefined : false}
                isLoading={samlede.isLoading}
                options={samledeOptions}
                filteredOptions={
                  samletSøkErAktivt ? samledeFiltrerteOptions : undefined
                }
                selectedOptions={(field.value ?? []).map(tagToOption)}
                onToggleSelected={lagTagToggle(
                  field.value ?? [],
                  samledeForslag,
                  field.onChange,
                  'samledeKvalifikasjoner',
                )}
                onBlur={field.onBlur}
                onChange={(v) => setSamletSøk(v ?? '')}
                toggleListButton={false}
                error={fieldState.error?.message}
              />
            )}
          />

          <Controller
            control={control}
            name='arbeidssprak'
            render={({ field, fieldState }) => (
              <UNSAFE_Combobox
                id={behovFeltId('arbeidssprak', idPrefix)}
                ref={field.ref}
                name={field.name}
                label='Språk'
                isMultiSelect
                isLoading={metadata.isLoading}
                options={ARBEIDSSPRAK}
                filteredOptions={sprakFiltrerteOptions}
                selectedOptions={field.value ?? []}
                onToggleSelected={lagStringToggle(
                  field.value ?? [],
                  field.onChange,
                  'arbeidssprak',
                )}
                onBlur={field.onBlur}
                onChange={(v) => setSprakSøk(v ?? '')}
                error={fieldState.error?.message}
              />
            )}
          />

          <Controller
            control={control}
            name='ansettelsesformer'
            render={({ field, fieldState }) => (
              <UNSAFE_Combobox
                id={behovFeltId('ansettelsesformer', idPrefix)}
                ref={field.ref}
                name={field.name}
                label='Ansettelsesform'
                description='Fast, vikariat, sesong osv'
                isMultiSelect
                isLoading={metadata.isLoading}
                options={fjernValgte(
                  ANSETTELSESFORMER,
                  field.value ?? [],
                  (option) => option,
                  (valgt) => valgt,
                )}
                selectedOptions={field.value ?? []}
                onToggleSelected={lagStringToggle(
                  field.value ?? [],
                  field.onChange,
                  'ansettelsesformer',
                )}
                onBlur={field.onBlur}
                error={fieldState.error?.message}
              />
            )}
          />

          <Controller
            control={control}
            name='personligeEgenskaper'
            render={({ field, fieldState }) => (
              <UNSAFE_Combobox
                id={behovFeltId('personligeEgenskaper', idPrefix)}
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
                ref={field.ref}
                name={field.name}
                isListOpen={egenskapSøkErAktivt ? undefined : false}
                options={egenskapOptions}
                filteredOptions={
                  egenskapSøkErAktivt ? egenskapOptions : undefined
                }
                selectedOptions={(field.value ?? []).map(egenskapToOption)}
                onToggleSelected={lagTagToggle(
                  field.value ?? [],
                  egenskapForslag,
                  field.onChange,
                  'personligeEgenskaper',
                )}
                onBlur={field.onBlur}
                onChange={(v) => setEgenskapSøk(v ?? '')}
                toggleListButton={false}
                error={fieldState.error?.message}
              />
            )}
          />
        </div>
      </Stack>
    </div>
  );
};

export const tomtBehov = (): ArbeidsgiversBehovFormData => ({
  samledeKvalifikasjoner: [],
  arbeidssprak: [],
  antall: '',
  ansettelsesformer: [],
  personligeEgenskaper: [],
});

export const tilBehovFormData = (
  behov: ArbeidsgiversBehovDTO | null | undefined,
): ArbeidsgiversBehovFormData =>
  behov
    ? {
        ...behov,
        antall: String(behov.antall),
        personligeEgenskaper: behov.personligeEgenskaper ?? [],
      }
    : tomtBehov();

export const validerBehov = (
  b: ArbeidsgiversBehovFormData,
): Partial<Record<BehovFormFelt, string>> => {
  const feil: Partial<Record<BehovFormFelt, string>> = {};
  const antall = Number(b.antall);
  if (b.antall.trim() === '' || antall < 1)
    feil.antall = 'Oppgi antall stillinger';
  else if (!Number.isInteger(antall))
    feil.antall = 'Oppgi antall stillinger som et helt tall';
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

export const tilArbeidsgiversBehovDTO = (
  behov: ArbeidsgiversBehovFormData,
): ArbeidsgiversBehovDTO | null => {
  const feil = validerBehov(behov);
  if (Object.keys(feil).length > 0) return null;

  return {
    ...behov,
    antall: Number(behov.antall),
    personligeEgenskaper: behov.personligeEgenskaper ?? [],
  };
};

export const behovResolver: Resolver<ArbeidsgiversBehovFormData> = async (
  values,
) => {
  const feil = validerBehov(values);
  const errors = Object.fromEntries(
    Object.entries(feil).map(([felt, melding]) => [
      felt,
      { type: 'validate', message: melding },
    ]),
  );
  return {
    values: Object.keys(errors).length === 0 ? values : {},
    errors,
  };
};

export const behovFeilTilErrorSummaryItems = (
  feil: Partial<Record<BehovFormFelt, string>>,
  idPrefix?: string,
) =>
  (Object.entries(feil) as Array<[BehovFormFelt, string | undefined]>)
    .filter(([, melding]) => Boolean(melding))
    .map(([felt, melding]) => ({
      href: `#${behovFeltId(felt, idPrefix)}`,
      melding: melding as string,
    }));

export default BehovForm;
