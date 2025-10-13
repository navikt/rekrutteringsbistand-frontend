'use client';

import { toIso as toIsoUtil } from './tidspunkt/utils';
import {
  oppdaterInnlegg,
  opprettInnlegg,
  type OpprettInnleggDto,
  type OppdaterInnleggDto,
} from '@/app/api/rekrutteringstreff/[...slug]/innlegg/mutations';
import { useInnlegg } from '@/app/api/rekrutteringstreff/[...slug]/innlegg/useInnlegg';
import { oppdaterRekrutteringstreff } from '@/app/api/rekrutteringstreff/[...slug]/mutations';
import { useRekrutteringstreff } from '@/app/api/rekrutteringstreff/[...slug]/useRekrutteringstreff';
import { useRekrutteringstreffContext } from '@/app/rekrutteringstreff/_providers/RekrutteringstreffContext';
import { AktivtSteg } from '@/app/rekrutteringstreff/_types/constants';
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
  return step === AktivtSteg.INVITERE || step === AktivtSteg.FULLFØRE;
};

/** Blokkerer autosave når publisert og i edit-mode (med mindre force=true) */
export const skalHindreAutosave = (treff: any, force?: boolean): boolean => {
  if (force) return false;
  return erPublisert(treff) && erEditMode();
};

/**
 * Sjekker om et felt skal lagres basert på valideringsstatus.
 * Returnerer true hvis feltet er gyldig ELLER hvis force=true.
 */
export const skalLagreFelt = (
  harFeil: boolean,
  harInnhold: boolean,
  force?: boolean,
): boolean => {
  return (!harFeil || Boolean(force)) && harInnhold;
};

/** Autosave av rekrutteringstreff (blokkeres når publisert og i edit-mode) */
export function useAutosave() {
  const { rekrutteringstreffId, startLagring, stoppLagring } =
    useRekrutteringstreffContext();
  const { data: treff, mutate } = useRekrutteringstreff(rekrutteringstreffId);
  const { getValues, trigger, formState } = useFormContext<AnyValues>();

  const buildFullDto = useCallback(
    (opts?: { force?: boolean }) => {
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
        toIsoUtil(
          formVerdier.svarfristDato ?? null,
          formVerdier.svarfristTid,
        ) ??
        treff?.svarfrist ??
        null;

      // Sjekk om tittel skal inkluderes i lagring
      const trimmedTitle =
        typeof formVerdier.tittel === 'string' ? formVerdier.tittel.trim() : '';
      const harTittelFeil = Boolean((formState?.errors as any)?.tittel);
      const harTittelInnhold = Boolean(
        trimmedTitle.length > 0 ||
          (treff?.tittel && treff.tittel.trim().length > 0),
      );
      const skalInkludereTittel = skalLagreFelt(
        harTittelFeil,
        harTittelInnhold,
        opts?.force,
      );
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
    },
    [getValues, treff, formState],
  );

  const save = useCallback(
    async (fieldsToValidate?: string[], force?: boolean) => {
      if (!rekrutteringstreffId) return;

      if (skalHindreAutosave(treff, force)) {
        return;
      }

      const skalValidereAlleFelder =
        !fieldsToValidate || fieldsToValidate.length === 0;

      let valideringOk = true;
      if (!force) {
        valideringOk = await trigger(
          skalValidereAlleFelder ? undefined : (fieldsToValidate as any),
          {
            shouldFocus: false,
          },
        );
        if (!valideringOk) return;
      }

      // Ikke lagre ved periodefeil (lik eller negativ tid)
      if ((formState?.errors as any)?.root?.type === 'manualPeriod') {
        return;
      }

      const dto = buildFullDto({ force });
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
  const { getValues, trigger, setValue, formState } = useFormContext<{
    htmlContent?: string;
  }>();

  const save = useCallback(
    async (fieldsToValidate?: string[], force?: boolean) => {
      if (!rekrutteringstreffId) return;

      if (skalHindreAutosave(treff as any, force)) {
        return;
      }

      // Valider felt hvis spesifisert (med mindre force=true)
      if (fieldsToValidate && fieldsToValidate.length && !force) {
        const valideringOk = await trigger(fieldsToValidate as any, {
          shouldFocus: false,
        });
        if (!valideringOk) return;
      }

      // Sjekk om innlegg skal lagres
      const harInnleggFeil = Boolean((formState?.errors as any)?.htmlContent);
      const innholdSomSkalLagres = (getValues('htmlContent') ?? '').toString();
      const harInnleggInnhold = Boolean(innholdSomSkalLagres.trim().length > 0);
      const skalLagre = skalLagreFelt(harInnleggFeil, harInnleggInnhold, force);

      if (!skalLagre) return;

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
          await oppdaterInnlegg(
            rekrutteringstreffId,
            innlegg.id,
            payloadData as OppdaterInnleggDto,
          );
        } else {
          await opprettInnlegg(
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
      formState?.errors,
    ],
  );

  return { save };
}
