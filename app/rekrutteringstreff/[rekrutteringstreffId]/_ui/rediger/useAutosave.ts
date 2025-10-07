'use client';

import { toIso as toIsoUtil } from './tidspunkt/utils';
import {
  oppdaterEttInnlegg,
  opprettInnleggForTreff,
  OpprettInnleggDto,
  OppdaterInnleggDto,
} from '@/app/api/rekrutteringstreff/[...slug]/innlegg/mutations';
import { useInnlegg } from '@/app/api/rekrutteringstreff/[...slug]/innlegg/useInnlegg';
import { oppdaterRekrutteringstreff } from '@/app/api/rekrutteringstreff/[...slug]/mutations';
import { useRekrutteringstreff } from '@/app/api/rekrutteringstreff/[...slug]/useRekrutteringstreff';
import { useRekrutteringstreffContext } from '@/app/rekrutteringstreff/_contexts/RekrutteringstreffContext';
import { getActiveStepFromHendelser } from '@/app/rekrutteringstreff/_utils/rekrutteringstreff';
import { RekbisError } from '@/util/rekbisError';
import { formatInTimeZone } from 'date-fns-tz';
import { useCallback } from 'react';
import { useFormContext } from 'react-hook-form';

type AnyValues = Record<string, any>;

export const erEditMode = (): boolean => {
  try {
    return (
      typeof window !== 'undefined' &&
      new URLSearchParams(window.location.search).get('mode') === 'edit'
    );
  } catch {
    return false;
  }
};

/** Sjekker om treff er publisert (INVITERE eller FULLFØRE steg) */
export const erPublisert = (treff: any): boolean => {
  const step = getActiveStepFromHendelser(treff?.hendelser);
  return step === 'INVITERE' || step === 'FULLFØRE';
};

/** Blokkerer autosave når publisert og i edit-mode (med mindre force=true) */
export const skalHindreAutosave = (treff: any, force?: boolean): boolean => {
  if (force) return false;
  return erPublisert(treff) && erEditMode();
};

/** Autosave av rekrutteringstreff (blokkeres når publisert og i edit-mode) */
export function useAutosave() {
  const { rekrutteringstreffId, startLagring, stoppLagring } =
    useRekrutteringstreffContext();
  const { data: treff, mutate } = useRekrutteringstreff(rekrutteringstreffId);
  const { getValues, trigger, formState } = useFormContext<AnyValues>();

  const buildFullDto = useCallback(() => {
    const formVerdier = getValues();

    const fraTid =
      toIsoUtil(formVerdier.fraDato ?? null, formVerdier.fraTid) ??
      treff?.fraTid ??
      null;

    const tilTid =
      toIsoUtil(
        formVerdier.tilDato ?? formVerdier.fraDato ?? null,
        formVerdier.tilTid,
      ) ??
      treff?.tilTid ??
      null;

    const svarfrist =
      toIsoUtil(formVerdier.svarfristDato ?? null, formVerdier.svarfristTid) ??
      treff?.svarfrist ??
      null;

    // Bare inkluder tittel dersom den faktisk har innhold (API krever min. 1 tegn når feltet er med)
    const trimmedTitle =
      typeof formVerdier.tittel === 'string' ? formVerdier.tittel.trim() : '';
    const skalInkludereTittel =
      trimmedTitle.length > 0 ||
      (treff?.tittel && treff.tittel.trim().length > 0);

    return {
      ...(skalInkludereTittel && {
        tittel: trimmedTitle.length > 0 ? trimmedTitle : treff?.tittel,
      }),
      beskrivelse: (formVerdier.beskrivelse ?? treff?.beskrivelse ?? null) as
        | string
        | null,
      fraTid,
      tilTid,
      svarfrist,
      gateadresse: (formVerdier.gateadresse ?? treff?.gateadresse ?? null) as
        | string
        | null,
      postnummer: (formVerdier.postnummer ?? treff?.postnummer ?? null) as
        | string
        | null,
      poststed: (formVerdier.poststed ?? treff?.poststed ?? null) as
        | string
        | null,
    };
  }, [getValues, treff]);

  const save = useCallback(
    async (fieldsToValidate?: string[], force?: boolean) => {
      if (!rekrutteringstreffId) return;

      if (skalHindreAutosave(treff, force)) {
        return;
      }

      const skalValidereAlleFelder =
        !fieldsToValidate || fieldsToValidate.length === 0;
      const valideringOk = await trigger(
        skalValidereAlleFelder ? undefined : (fieldsToValidate as any),
        {
          shouldFocus: false,
        },
      );

      if (!valideringOk) return;

      // Ikke lagre ved periodefeil (lik eller negativ tid)
      if ((formState?.errors as any)?.root?.type === 'manualPeriod') {
        return;
      }

      const dto = buildFullDto();
      try {
        startLagring('rekrutteringstreff');
        await oppdaterRekrutteringstreff(rekrutteringstreffId, dto);
        mutate();
      } finally {
        stoppLagring('rekrutteringstreff');
      }
    },
    [
      buildFullDto,
      rekrutteringstreffId,
      trigger,
      treff,
      mutate,
      formState?.errors,
      startLagring,
      stoppLagring,
    ],
  );

  return { save };
}

/** Autosave av innlegg (HTML-innhold) i rekrutteringstreff */
export function useInnleggAutosave() {
  const { rekrutteringstreffId, startLagring, stoppLagring } =
    useRekrutteringstreffContext();
  const { data: treff } = useRekrutteringstreff(rekrutteringstreffId);
  const { data: innleggListe, mutate } = useInnlegg(rekrutteringstreffId);
  const innlegg = innleggListe?.[0];
  const { getValues, trigger, setValue } = useFormContext<{
    htmlContent?: string;
  }>();

  const save = useCallback(
    async (fieldsToValidate?: string[], force?: boolean) => {
      if (!rekrutteringstreffId) return;

      if (skalHindreAutosave(treff as any, force)) {
        return;
      }

      if (fieldsToValidate && fieldsToValidate.length) {
        const valideringOk = await trigger(fieldsToValidate as any, {
          shouldFocus: false,
        });
        if (!valideringOk) return;
      }

      const innholdSomSkalLagres = (getValues('htmlContent') ?? '').toString();
      if (!innholdSomSkalLagres.trim()) return;

      try {
        const forfatterNavn =
          innlegg?.opprettetAvPersonNavn ||
          (innlegg as any)?.opprettetAvPersonNavident ||
          'Markedskontakt';

        const payloadData = {
          htmlContent: innholdSomSkalLagres,
          tittel: 'Om treffet',
          opprettetAvPersonNavn: forfatterNavn,
          opprettetAvPersonBeskrivelse: 'Markedskontakt',
          sendesTilJobbsokerTidspunkt: formatInTimeZone(
            new Date(),
            'Europe/Oslo',
            "yyyy-MM-dd'T'HH:mm:ssXXX",
          ),
        };

        startLagring('innlegg');

        if (innlegg?.id) {
          await oppdaterEttInnlegg(
            rekrutteringstreffId,
            innlegg.id,
            payloadData as OppdaterInnleggDto,
          );
        } else {
          await opprettInnleggForTreff(
            rekrutteringstreffId,
            payloadData as OpprettInnleggDto,
          );
        }

        mutate();

        setValue('htmlContent', innholdSomSkalLagres, { shouldDirty: false });
      } catch (error) {
        new RekbisError({ message: 'Lagring av innlegg feilet.', error });
      } finally {
        stoppLagring('innlegg');
      }
    },
    [
      getValues,
      innlegg,
      mutate,
      rekrutteringstreffId,
      startLagring,
      stoppLagring,
      setValue,
      treff,
      trigger,
    ],
  );

  return { save };
}
