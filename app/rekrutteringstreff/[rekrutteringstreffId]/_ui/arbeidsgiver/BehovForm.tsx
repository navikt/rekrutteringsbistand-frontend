'use client';

import { usePersonligeEgenskaper } from '@/app/api/pam-ontologi/personlige_egenskaper/usePersonligeEgenskaper';
import { useSamledeKvalifikasjoner } from '@/app/api/pam-ontologi/samlede_kvalifikasjoner/useSamledeKvalifikasjoner';
import {
  ArbeidsgiverBehovDTO,
  BehovTagDTO,
} from '@/app/api/rekrutteringstreff/[...slug]/arbeidsgivere/useArbeidsgivereMedBehov';
import { useBehovMetadata } from '@/app/api/rekrutteringstreff/arbeidsgiver-behov-metadata/useBehovMetadata';
import {
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
  control: Control<ArbeidsgiverBehovFormData>;
  idPrefix?: string;
  trigger?: UseFormTrigger<ArbeidsgiverBehovFormData>;
  revaliderVedEndring?: boolean;
}

export type ArbeidsgiverBehovFormData = Omit<ArbeidsgiverBehovDTO, 'antall'> & {
  antall: string;
};

export type BehovFormFelt = keyof ArbeidsgiverBehovFormData;

export const BEHOV_FELT_ID = {
  antall: 'arbeidsgiver-behov-antall',
  samledeKvalifikasjoner: 'arbeidsgiver-behov-kvalifikasjoner',
  arbeidssprak: 'arbeidsgiver-behov-sprak',
  ansettelsesformer: 'arbeidsgiver-behov-ansettelsesform',
  personligeEgenskaper: 'arbeidsgiver-behov-personlige-egenskaper',
} as const satisfies Record<BehovFormFelt, string>;

export const behovFeltId = (felt: BehovFormFelt, idPrefix?: string): string =>
  idPrefix ? `${idPrefix}-${BEHOV_FELT_ID[felt]}` : BEHOV_FELT_ID[felt];

const tagToValue = (tag: BehovTagDTO) => `${tag.kategori}:${tag.konseptId}`;

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

const egenskapToOption = (tag: BehovTagDTO) => ({
  label: tag.label,
  value: tagToValue(tag),
});

type ApiTag = { label: string; kategori?: string; konseptId: number | null };

const byggTagForslag = (
  apiData: ReadonlyArray<ApiTag> | undefined,
  eksisterende: BehovTagDTO[],
  kategoriOverstyring?: string,
): BehovTagDTO[] => {
  const fraApi: BehovTagDTO[] =
    apiData
      ?.filter((d): d is ApiTag & { konseptId: number } => d.konseptId != null)
      .map((d) => ({
        label: d.label,
        kategori: kategoriOverstyring ?? d.kategori ?? '',
        konseptId: d.konseptId,
      })) ?? [];
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

  const samlede = useSamledeKvalifikasjoner(samletSøk);
  const egenskaper = usePersonligeEgenskaper(egenskapSøk);
  const metadata = useBehovMetadata();
  const ARBEIDSSPRAK = metadata.data?.arbeidssprak ?? FALLBACK_ARBEIDSSPRAK;
  const ANSETTELSESFORMER =
    metadata.data?.ansettelsesformer ?? FALLBACK_ANSETTELSESFORMER;

  const samledeValgte = useWatch({ control, name: 'samledeKvalifikasjoner' });
  const egenskapValgte = useWatch({ control, name: 'personligeEgenskaper' });

  const samledeForslag = useMemo(
    () => byggTagForslag(samlede.data, samledeValgte ?? []),
    [samlede.data, samledeValgte],
  );

  const egenskapForslag = useMemo(
    () =>
      byggTagForslag(
        egenskaper.data,
        egenskapValgte ?? [],
        'PERSONLIG_EGENSKAP',
      ),
    [egenskaper.data, egenskapValgte],
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
                isLoading={samlede.isLoading}
                options={samledeForslag.map(tagToOption)}
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
                options={ARBEIDSSPRAK}
                selectedOptions={field.value ?? []}
                onToggleSelected={lagStringToggle(
                  field.value ?? [],
                  field.onChange,
                  'arbeidssprak',
                )}
                onBlur={field.onBlur}
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
                options={[...ANSETTELSESFORMER]}
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
                options={egenskapForslag.map(egenskapToOption)}
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

export const behovResolver: Resolver<ArbeidsgiverBehovFormData> = async (
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
