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

const DEFAULT_TITTEL = 'Treff uten navn';

const fokusErPåTittelFelt = (): boolean => {
  if (typeof document === 'undefined') return false;
  const activeEl = document.activeElement;
  if (!activeEl) return false;

  const inputEl = activeEl as HTMLInputElement;
  return (
    inputEl.tagName === 'INPUT' &&
    (inputEl.name === 'tittel' || inputEl.getAttribute('name') === 'tittel')
  );
};

const settFokusPåTittelFelt = (): void => {
  if (typeof document === 'undefined') return;

  const tittelInput = document.querySelector<HTMLInputElement>(
    'input[name="tittel"]',
  );

  if (tittelInput) {
    tittelInput.focus();
    tittelInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
};

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
      if (skalHindreAutosave(treff, overstyrKiFeil)) return;

      const prebuiltDto: any | undefined = buildFullDto(overstyrKiFeil);
      const dtoKeys = new Set(Object.keys(prebuiltDto ?? {}));

      // Sjekk om vi er i kladd-modus og tittel mangler eller er default
      const erIKladdModus = !erPublisert(treff);
      if (erIKladdModus) {
        const formVerdier = getValues();
        const tittel = (formVerdier.tittel ?? '').trim();
        const tittelMangler = tittel.length === 0 || tittel === DEFAULT_TITTEL;

        // Hvis tittel mangler og bruker ikke fokuserer på tittelfeltet, gi fokus til tittel
        if (tittelMangler && !fokusErPåTittelFelt()) {
          settFokusPåTittelFelt();
          return; // Ikke lagre andre felt før tittel er fylt ut
        }

        // Hvis tittel har KI-feil og ikke er overstyrt, gi fokus til tittel
        const tittelKiFeil = (formState.errors as any)?.tittelKiFeil;
        if (tittelKiFeil && !overstyrKiFeil && !fokusErPåTittelFelt()) {
          settFokusPåTittelFelt();
          return; // Ikke lagre før KI-feil er håndtert
        }
      }

      const feltSomSkalValideres: string[] | undefined =
        fieldsToValidate && fieldsToValidate.length > 0
          ? fieldsToValidate
          : Array.from(dtoKeys);

      if (!dtoKeys.has('tittel')) {
        const i = feltSomSkalValideres?.indexOf('tittel') ?? -1;
        if (i >= 0) feltSomSkalValideres!.splice(i, 1);
      }

      if (!overstyrKiFeil) {
        const valideringOk = await trigger(
          feltSomSkalValideres?.length
            ? (feltSomSkalValideres as any)
            : undefined,
          { shouldFocus: false },
        );
        if (!valideringOk) {
          const errors = (formState?.errors as any) || {};
          const errorKeys = Object.keys(errors).filter((k) => k !== 'root');
          const relevanteFeil = errorKeys.filter((k) => dtoKeys.has(k));
          if (
            relevanteFeil.length === 0 ||
            (relevanteFeil.length === 1 &&
              relevanteFeil[0] === 'tittel' &&
              !dtoKeys.has('tittel'))
          ) {
            // ok
          } else {
            return;
          }
        }
      }

      if ((formState?.errors as any)?.root?.type === 'manualPeriod') {
        const endrerPeriode =
          (prebuiltDto?.fraTid ?? null) !== (treff?.fraTid ?? null) ||
          (prebuiltDto?.tilTid ?? null) !== (treff?.tilTid ?? null);
        if (endrerPeriode) return;
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
      if (skalHindreAutosave(treff as any, overstyrKiFeil)) return;

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
