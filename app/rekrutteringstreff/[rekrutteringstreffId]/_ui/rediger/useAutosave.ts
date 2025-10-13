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

export const skalHindreAutosave = (
  treff: any,
  overstyrKiFeil?: boolean,
): boolean => {
  if (overstyrKiFeil) return false;
  return erPublisert(treff) && erEditMode();
};

export const skalLagreFelt = (
  harFormFeil: boolean,
  harKiFeil: boolean,
  harInnhold: boolean,
  overstyrKiFeil?: boolean,
): boolean => {
  if (harFormFeil) return false;
  if (harKiFeil && !overstyrKiFeil) return false;
  return harInnhold;
};

/** Autosave av rekrutteringstreff (blokkeres når publisert og i edit-mode) */
export function useAutosave() {
  const { rekrutteringstreffId, startLagring, stoppLagring } =
    useRekrutteringstreffContext();
  const { data: treff, mutate } = useRekrutteringstreff(rekrutteringstreffId);
  const { getValues, trigger, formState } = useFormContext<AnyValues>();

  const buildFullDto = useCallback(
    (overstyrKiFeil?: boolean) => {
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

      const trimmedTitle =
        typeof formVerdier.tittel === 'string' ? formVerdier.tittel.trim() : '';
      const harTittelFeil = Boolean((formState?.errors as any)?.tittel);
      const harTittelKiFeil = Boolean(formVerdier.tittelKiFeil);
      const tittelKiSjekket = Boolean((formVerdier as any)?.tittelKiSjekket);
      const harTittelInnhold = Boolean(
        trimmedTitle.length > 0 ||
          (treff?.tittel && treff.tittel.trim().length > 0),
      );
      let skalInkludereTittel = skalLagreFelt(
        harTittelFeil,
        harTittelKiFeil,
        harTittelInnhold,
        overstyrKiFeil,
      );
      // I kladdmodus skal vi ikke autosave tittel før KI-sjekk er utført og godkjent
      if (!erPublisert(treff) && !overstyrKiFeil) {
        skalInkludereTittel =
          skalInkludereTittel && tittelKiSjekket && !harTittelKiFeil;
      }
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
    async (fieldsToValidate?: string[], overstyrKiFeil?: boolean) => {
      if (!rekrutteringstreffId) return;

      if (skalHindreAutosave(treff, overstyrKiFeil)) {
        return;
      }

      const skalValidereAlleFelder =
        !fieldsToValidate || fieldsToValidate.length === 0;

      let prebuiltDto: any | undefined;
      let valideringOk = true;
      if (!overstyrKiFeil) {
        valideringOk = await trigger(
          skalValidereAlleFelder ? undefined : (fieldsToValidate as any),
          {
            shouldFocus: false,
          },
        );
        if (!valideringOk) {
          const errors = (formState?.errors as any) || {};
          const errorKeys = Object.keys(errors).filter((k) => k !== 'root');
          const onlyTittelFeil =
            errorKeys.length > 0 && errorKeys.every((k) => k === 'tittel');
          if (onlyTittelFeil) {
            prebuiltDto = buildFullDto(overstyrKiFeil);
            const inkludererTittel = Object.prototype.hasOwnProperty.call(
              prebuiltDto,
              'tittel',
            );
            if (inkludererTittel) {
              return;
            }
            // else: allow to proceed (we will still block on manualPeriod below)
          } else {
            return;
          }
        }
      }

      if ((formState?.errors as any)?.root?.type === 'manualPeriod') {
        return;
      }

      const dto = prebuiltDto ?? buildFullDto(overstyrKiFeil);
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
    async (fieldsToValidate?: string[], overstyrKiFeil?: boolean) => {
      if (!rekrutteringstreffId) return;

      if (skalHindreAutosave(treff as any, overstyrKiFeil)) {
        return;
      }

      if (fieldsToValidate && fieldsToValidate.length && !overstyrKiFeil) {
        const valideringOk = await trigger(fieldsToValidate as any, {
          shouldFocus: false,
        });
        if (!valideringOk) return;
      }

      const formVerdier = getValues();
      const harInnleggFeil = Boolean((formState?.errors as any)?.htmlContent);
      const harInnleggKiFeil = Boolean((formVerdier as any)?.htmlContentKiFeil);
      const innleggKiSjekket = Boolean(
        (formVerdier as any)?.htmlContentKiSjekket,
      );
      const innholdSomSkalLagres = (formVerdier.htmlContent ?? '').toString();
      const harInnleggInnhold = Boolean(innholdSomSkalLagres.trim().length > 0);
      let skalLagre = skalLagreFelt(
        harInnleggFeil,
        harInnleggKiFeil,
        harInnleggInnhold,
        overstyrKiFeil,
      );
      // I kladdmodus skal vi ikke autosave innlegg før KI-sjekk er utført og godkjent
      if (!erPublisert(treff as any) && !overstyrKiFeil) {
        skalLagre = skalLagre && innleggKiSjekket && !harInnleggKiFeil;
      }

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
