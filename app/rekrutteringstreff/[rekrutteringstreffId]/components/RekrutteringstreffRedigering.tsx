'use client';

import { useRekrutteringstreffContext } from '../RekrutteringstreffContext';
import InnleggForm from './redigereRekrutteringstreff/InnleggForm';
import PraktiskeForhold from './redigereRekrutteringstreff/Praktiskeforhold';
import TittelForm from './redigereRekrutteringstreff/TittelForm';
import {
  toIso as toIsoUtil,
  formatIso as formatIsoUtil,
} from './redigereRekrutteringstreff/tidspunkt/utils';
import {
  useAutosave,
  useInnleggAutosave,
} from './redigereRekrutteringstreff/useAutosave';
import { useInnlegg } from '@/app/api/rekrutteringstreff/[...slug]/useInnlegg';
import { useKiLogg } from '@/app/api/rekrutteringstreff/kiValidering/useKiLogg';
import { useRekrutteringstreff } from '@/app/api/rekrutteringstreff/useRekrutteringstreff';
import LeggTilArbeidsgiverForm from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/arbeidsgivere/_ui/LeggTilArbeidsgiverForm';
import RepubliserRekrutteringstreffButton from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/rekrutteringstreff/RepubliserRekrutteringstreffButton';
import { getActiveStepFromHendelser } from '@/app/rekrutteringstreff/_utils/rekrutteringstreff';
import { RekbisError } from '@/util/rekbisError';
import { Button, Heading, Box } from '@navikt/ds-react';
import { FC, useEffect, useRef, useState } from 'react';
import { useFormContext } from 'react-hook-form';

const toIsoLocal = (
  date: Date | null | undefined,
  time?: string | null,
): string | null => {
  if (!date) return null;
  const timeValue = time && time.trim() !== '' ? time : '00:00';
  return toIsoUtil(date, timeValue);
};

const formatIsoLocal = (iso: string | null | undefined) =>
  iso ? formatIsoUtil(iso) : '';

interface RekrutteringstreffRedigeringProps {
  onUpdated?: () => void;
  onGåTilForhåndsvisning?: () => void;
}

const RekrutteringstreffRedigering: FC<RekrutteringstreffRedigeringProps> = ({
  onUpdated,
  onGåTilForhåndsvisning,
}) => {
  const { rekrutteringstreffId, startLagring, stoppLagring } =
    useRekrutteringstreffContext();
  const rekrutteringstreffHook = useRekrutteringstreff(rekrutteringstreffId);
  const innleggHook = useInnlegg(rekrutteringstreffId);
  const { save } = useAutosave();
  const { save: saveInnlegg } = useInnleggAutosave();
  const { getValues, watch, formState } = useFormContext();

  const tittelKiFeil = (watch('tittelKiFeil' as any) as any) ?? false;
  const innleggKiFeil = (watch('innleggKiFeil' as any) as any) ?? false;
  const tittelKiSjekket = (watch('tittelKiSjekket' as any) as any) ?? false;
  const innleggKiSjekket = (watch('innleggKiSjekket' as any) as any) ?? false;
  const anyKiFeil = !!tittelKiFeil || !!innleggKiFeil;
  const harAndreSkjemafeil = Boolean(
    formState.errors &&
      Object.keys(formState.errors).some((key) => key !== 'root'),
  );
  const harFeil = anyKiFeil || harAndreSkjemafeil;

  const activeStep = getActiveStepFromHendelser(
    rekrutteringstreffHook.data?.hendelser,
  );
  const harPublisert = activeStep === 'INVITERE' || activeStep === 'FULLFØRE';

  // KI-logg hooks for tittel og innlegg slik at vi kan markere logg som lagret ved republisering
  const kiTittelLogg = useKiLogg(rekrutteringstreffId, 'tittel');
  const kiInnleggLogg = useKiLogg(rekrutteringstreffId, 'innlegg');

  const markerSisteKiLoggSomLagret = async () => {
    const mark = async (
      liste:
        | { id: string; opprettetTidspunkt: string; lagret: boolean }[]
        | undefined,
      setLagret?: (arg: { id: string; lagret: boolean }) => Promise<void>,
    ) => {
      if (!liste || liste.length === 0 || !setLagret) return;

      // Sorter etter opprettettidspunkt for å finne den nyeste
      const sorted = [...liste].sort(
        (a, b) =>
          new Date(b.opprettetTidspunkt).getTime() -
          new Date(a.opprettetTidspunkt).getTime(),
      );
      const siste = sorted[0]; // Første element er nå det nyeste

      if (siste && !siste.lagret) {
        await setLagret({ id: siste.id, lagret: true });
      }
    };

    try {
      // Hent ferskeste KI-logg rett før vi markerer siste som lagret
      const [tittelListe, innleggListe] = await Promise.all([
        kiTittelLogg.refresh(),
        kiInnleggLogg.refresh(),
      ]);

      await Promise.all([
        mark(tittelListe ?? kiTittelLogg.data, kiTittelLogg.setLagret),
        mark(innleggListe ?? kiInnleggLogg.data, kiInnleggLogg.setLagret),
      ]);
    } catch (error) {
      new RekbisError({
        message: 'Kunne ikke oppdatere KI-logg lagret-status:',
        error,
      });
    }
  };

  const håndterOppdatert = () => {
    rekrutteringstreffHook.mutate();
    onUpdated?.();
  };

  // Publiseringsknappen skal være deaktivert dersom treffet ikke har fått et navn ennå
  const DEFAULT_TITTEL = 'Treff uten navn';
  const lagretTittel = rekrutteringstreffHook.data?.tittel ?? '';
  const manglerNavn =
    typeof lagretTittel === 'string' && lagretTittel.trim() === DEFAULT_TITTEL;

  return (
    <div className='space-y-8 max-w-[64rem] mx-auto'>
      <Box.New
        background='neutral-soft'
        borderColor='neutral-subtle'
        borderRadius='xlarge'
        borderWidth='1'
        padding='6'
      >
        <TittelForm onUpdated={håndterOppdatert} />
      </Box.New>

      <Box.New
        background='neutral-soft'
        borderColor='neutral-subtle'
        borderRadius='xlarge'
        borderWidth='1'
        padding='6'
      >
        <PraktiskeForhold />
      </Box.New>

      <Box.New
        background='neutral-soft'
        borderColor='neutral-subtle'
        borderRadius='xlarge'
        borderWidth='1'
        padding='6'
        className='space-y-4'
      >
        <Heading level='2' size='medium'>
          Introduksjon
        </Heading>
        <InnleggForm onUpdated={håndterOppdatert} />
      </Box.New>

      {!harPublisert && (
        <Box.New
          background='neutral-soft'
          borderColor='neutral-subtle'
          borderRadius='xlarge'
          borderWidth='1'
          padding='6'
          className='space-y-4'
        >
          <Heading level='2' size='medium'>
            Arbeidsgivere
          </Heading>
          <LeggTilArbeidsgiverForm variant='inline' />
        </Box.New>
      )}

      {harPublisert && (
        <div className='flex gap-2'>
          <RepubliserRekrutteringstreffButton
            disabled={harFeil || manglerNavn}
            treff={rekrutteringstreffHook.data}
            innleggHtmlFraBackend={
              (innleggHook.data?.[0]?.htmlContent ?? '') as string
            }
            onBekreft={async () => {
              try {
                startLagring('republiser');
                await save(undefined, true);
                const values: any = getValues();
                const currentHtml: string = (values?.htmlContent ??
                  '') as string;
                const backendHtml: string = (innleggHook.data?.[0]
                  ?.htmlContent ?? '') as string;
                const shouldSaveInnlegg =
                  (currentHtml ?? '').trim() !== (backendHtml ?? '').trim() &&
                  (currentHtml ?? '').trim().length > 0;
                if (shouldSaveInnlegg) {
                  await saveInnlegg(undefined, true);
                }
                await markerSisteKiLoggSomLagret();
              } finally {
                stoppLagring('republiser');
              }
            }}
          />
        </div>
      )}

      <div aria-hidden className='h-80' />
    </div>
  );
};

export default RekrutteringstreffRedigering;
