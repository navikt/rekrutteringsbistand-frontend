'use client';

import ArbeidsgiverKort from './ArbeidsgiverKort';
import BehovForm, {
  ArbeidsgiverBehovFormData,
  BehovFormFelt,
  behovFeltId,
  behovResolver,
  tilArbeidsgiverBehovDTO,
  tomtBehov,
} from './BehovForm';
import VelgArbeidsgiver from './VelgArbeidsgiver';
import { ArbeidsgiverDTO as PamArbeidsgiverDTO } from '@/app/api/pam-search/underenhet/useArbeidsgiver';
import { useArbeidsgiverHendelser } from '@/app/api/rekrutteringstreff/[...slug]/arbeidsgivere/useArbeidsgiverHendelser';
import { useRekrutteringstreffArbeidsgivere } from '@/app/api/rekrutteringstreff/[...slug]/arbeidsgivere/useArbeidsgivere';
import {
  opprettArbeidsgiverMedBehov,
  useArbeidsgivereMedBehov,
} from '@/app/api/rekrutteringstreff/[...slug]/arbeidsgivere/useArbeidsgivereMedBehov';
import { useRekrutteringstreffContext } from '@/app/rekrutteringstreff/_providers/RekrutteringstreffContext';
import { RekbisError } from '@/util/rekbisError';
import { XMarkIcon } from '@navikt/aksel-icons';
import { Box, Button, ErrorSummary, HStack } from '@navikt/ds-react';
import { FC, useEffect, useId, useMemo, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';

interface Props {
  onCompleted?: () => void;
}

const LeggTilArbeidsgiverForm: FC<Props> = ({ onCompleted }) => {
  const { rekrutteringstreffId } = useRekrutteringstreffContext();
  const arbeidsgivereHook =
    useRekrutteringstreffArbeidsgivere(rekrutteringstreffId);
  const arbeidsgivereMedBehovHook =
    useArbeidsgivereMedBehov(rekrutteringstreffId);
  const hendelseHook = useArbeidsgiverHendelser(rekrutteringstreffId);
  const { data: arbeidsgivere } = arbeidsgivereHook;

  const [valgt, setValgt] = useState<PamArbeidsgiverDTO | null>(null);
  const [valgtFeil, setValgtFeil] = useState<string | undefined>();
  const [saving, setSaving] = useState(false);
  const [harForsoktSubmit, setHarForsoktSubmit] = useState(false);
  const errorSummaryRef = useRef<HTMLDivElement>(null);
  const idPrefix = useId();
  const formId = `${idPrefix}-legg-til-arbeidsgiver-form`;
  const finnArbeidsgiverId = `${idPrefix}-legg-til-arbeidsgiver-sok`;

  const methods = useForm<ArbeidsgiverBehovFormData>({
    resolver: behovResolver,
    defaultValues: tomtBehov(),
  });
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = methods;

  const eksisterendeOrgnr = useMemo(
    () => new Set((arbeidsgivere ?? []).map((a) => a.organisasjonsnummer)),
    [arbeidsgivere],
  );

  useEffect(() => {
    if (!valgt) return;
    if (eksisterendeOrgnr.has(valgt.organisasjonsnummer)) {
      setValgtFeil('Denne arbeidsgiveren er allerede lagt til');
      setValgt(null);
    } else {
      setValgtFeil(undefined);
    }
  }, [valgt, eksisterendeOrgnr]);

  const errorSummaryItems = [
    ...(valgtFeil
      ? [{ href: `#${finnArbeidsgiverId}`, melding: valgtFeil }]
      : []),
    ...(
      Object.entries(errors) as Array<
        [BehovFormFelt, { message?: string } | undefined]
      >
    )
      .filter(([, e]) => Boolean(e?.message))
      .map(([felt, e]) => ({
        href: `#${behovFeltId(felt, idPrefix)}`,
        melding: e!.message as string,
      })),
  ];

  useEffect(() => {
    if (harForsoktSubmit && errorSummaryItems.length > 0) {
      errorSummaryRef.current?.focus();
    }
  }, [errorSummaryItems.length, harForsoktSubmit]);

  const lagreMedBehov = handleSubmit(async (verdier) => {
    const behovDto = tilArbeidsgiverBehovDTO(verdier);
    if (!valgt || !behovDto) return;

    setSaving(true);
    try {
      await opprettArbeidsgiverMedBehov(rekrutteringstreffId, {
        organisasjonsnummer: valgt.organisasjonsnummer,
        navn: valgt.navn,
        behov: behovDto,
      });
      arbeidsgivereHook.mutate();
      arbeidsgivereMedBehovHook.mutate();
      hendelseHook.mutate();
      setValgt(null);
      reset(tomtBehov());
      setValgtFeil(undefined);
      onCompleted?.();
    } catch (error) {
      throw new RekbisError({
        message: 'Feiler når prøver å legge til arbeidsgiver med behov.',
        error,
      });
    } finally {
      setSaving(false);
    }
  });

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setHarForsoktSubmit(true);
    if (!valgt) {
      setValgtFeil(valgtFeil ?? 'Velg arbeidsgiver');
      return;
    }
    lagreMedBehov();
  };

  return (
    <form id={formId} className='space-y-4' onSubmit={onSubmit} noValidate>
      {!valgt && (
        <Box background='neutral-soft' borderRadius='8' padding='space-16'>
          <VelgArbeidsgiver
            id={finnArbeidsgiverId}
            arbeidsgiverCallback={setValgt}
            valgtArbeidsgiver={valgt}
            labelText={'Finn arbeidsgiver'}
            description={'Søk på navn eller organisasjonsnummer'}
            error={valgtFeil}
          />
        </Box>
      )}

      {valgt && (
        <div className='relative'>
          <ArbeidsgiverKort
            navn={valgt.navn}
            organisasjonsnummer={valgt.organisasjonsnummer}
            gateadresse={valgt.adresse?.adresse}
            postnummer={valgt.adresse?.postnummer}
            poststed={valgt.adresse?.poststed}
          />
          <div className='absolute top-2 right-2'>
            <Button
              type='button'
              size='xsmall'
              variant='tertiary'
              onClick={() => {
                setValgt(null);
                reset(tomtBehov());
              }}
              aria-label={`Fjern ${valgt.navn}`}
            >
              <XMarkIcon aria-hidden />
            </Button>
          </div>
        </div>
      )}

      {valgt && (
        <Box
          background='neutral-soft'
          borderRadius='8'
          padding='space-16'
          className='max-h-144 overflow-y-auto'
        >
          <BehovForm control={control} idPrefix={idPrefix} />
        </Box>
      )}

      {harForsoktSubmit && errorSummaryItems.length > 0 && (
        <ErrorSummary ref={errorSummaryRef} headingTag='h3'>
          {errorSummaryItems.map((item) => (
            <ErrorSummary.Item key={item.href} href={item.href}>
              {item.melding}
            </ErrorSummary.Item>
          ))}
        </ErrorSummary>
      )}

      <HStack gap='space-8' justify='end'>
        <Button
          type='button'
          variant='secondary'
          onClick={() => onCompleted?.()}
        >
          Avbryt
        </Button>
        <Button type='submit' loading={saving}>
          Legg til
        </Button>
      </HStack>
    </form>
  );
};

export default LeggTilArbeidsgiverForm;
