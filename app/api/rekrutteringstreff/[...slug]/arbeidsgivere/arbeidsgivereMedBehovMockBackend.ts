import { arbeidsgiverBehovMock, arbeidsgivereMock } from './arbeidsgivereMock';
import type {
  ArbeidsgiverBehovDTO,
  ArbeidsgiverMedBehovDTO,
  LeggTilArbeidsgiverMedBehovDTO,
} from './useArbeidsgivereMedBehov';
import { byggMswScopeKey } from '@/app/api/rekrutteringstreff/mswScope';
import {
  arbeidsgiverBehovStore,
  arbeidsgiverStore,
  erNyopprettetUtkast,
} from '@/app/api/rekrutteringstreff/mswState';

export const hentArbeidsgivereForTreff = (
  request: Request,
  treffId: string,
) => {
  const scopeKey = byggMswScopeKey(request, treffId);
  const stored = arbeidsgiverStore.get(scopeKey);
  if (stored !== undefined) return stored;
  if (erNyopprettetUtkast(treffId)) return [];
  return arbeidsgivereMock();
};

export const hentBehovForArbeidsgiver = (
  request: Request,
  arbeidsgiverTreffId: string,
): ArbeidsgiverBehovDTO | null =>
  arbeidsgiverBehovStore.get(byggMswScopeKey(request, arbeidsgiverTreffId)) ??
  arbeidsgiverBehovMock(arbeidsgiverTreffId) ??
  null;

export const byggListe = (
  request: Request,
  treffId: string,
): ArbeidsgiverMedBehovDTO[] => {
  const arbeidsgivere = hentArbeidsgivereForTreff(request, treffId);
  return arbeidsgivere
    .filter((a) => !!a.arbeidsgiverTreffId)
    .map((a) => ({
      arbeidsgiverTreffId: a.arbeidsgiverTreffId as string,
      organisasjonsnummer: a.organisasjonsnummer,
      navn: a.navn,
      behov: hentBehovForArbeidsgiver(request, a.arbeidsgiverTreffId as string),
    }));
};

export const opprettArbeidsgiverMedBehov = (
  request: Request,
  treffId: string,
  body: LeggTilArbeidsgiverMedBehovDTO,
): ArbeidsgiverMedBehovDTO => {
  const treffScopeKey = byggMswScopeKey(request, treffId);
  const arbeidsgiverTreffId = crypto.randomUUID();
  const nyArbeidsgiver = {
    arbeidsgiverTreffId,
    organisasjonsnummer: body.organisasjonsnummer,
    navn: body.navn,
    status: 'AKTIV',
    gateadresse: null,
    postnummer: null,
    poststed: null,
  };
  const eksisterende = hentArbeidsgivereForTreff(request, treffId);
  arbeidsgiverStore.set(treffScopeKey, [...eksisterende, nyArbeidsgiver]);
  arbeidsgiverBehovStore.set(
    byggMswScopeKey(request, arbeidsgiverTreffId),
    body.behov,
  );
  return {
    arbeidsgiverTreffId,
    organisasjonsnummer: body.organisasjonsnummer,
    navn: body.navn,
    behov: body.behov,
  };
};

export const oppdaterBehovForArbeidsgiver = (
  request: Request,
  treffId: string,
  arbeidsgiverTreffId: string,
  behov: ArbeidsgiverBehovDTO,
): ArbeidsgiverMedBehovDTO | null => {
  const arbeidsgiver = hentArbeidsgivereForTreff(request, treffId).find(
    (a) => a.arbeidsgiverTreffId === arbeidsgiverTreffId,
  );
  if (!arbeidsgiver) return null;
  arbeidsgiverBehovStore.set(
    byggMswScopeKey(request, arbeidsgiverTreffId),
    behov,
  );
  return {
    arbeidsgiverTreffId,
    organisasjonsnummer: arbeidsgiver.organisasjonsnummer,
    navn: arbeidsgiver.navn,
    behov,
  };
};
