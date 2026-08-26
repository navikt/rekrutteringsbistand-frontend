import {
  ArbeidsgiversBehovMock,
  arbeidsgivereMock,
  workOpArbeidsgivere,
} from './arbeidsgivereMock';
import type { ArbeidsgiverDTO, ArbeidsgivereDTO } from './useArbeidsgivere';
import type {
  ArbeidsgiversBehovDTO,
  ArbeidsgiverMedBehovDTO,
  LeggTilArbeidsgiverMedBehovDTO,
} from './useArbeidsgivereMedBehov';
import { byggMswScopeKey } from '@/app/api/rekrutteringstreff/mswScope';
import {
  ArbeidsgiversBehovStore,
  arbeidsgiverStore,
  erNyopprettetUtkast,
} from '@/app/api/rekrutteringstreff/mswState';

export const mockHentArbeidsgivereForTreff = (
  request: Request,
  treffId: string,
): ArbeidsgivereDTO => {
  const scopeKey = byggMswScopeKey(request, treffId);
  const stored = arbeidsgiverStore.get(scopeKey);
  if (stored !== undefined) return stored;
  if (erNyopprettetUtkast(treffId)) return [];
  if (treffId === 'workop') return workOpArbeidsgivere();
  return arbeidsgivereMock();
};

export const mockHentBehovForArbeidsgiver = (
  request: Request,
  arbeidsgiverTreffId: string,
): ArbeidsgiversBehovDTO | null =>
  ArbeidsgiversBehovStore.get(byggMswScopeKey(request, arbeidsgiverTreffId)) ??
  ArbeidsgiversBehovMock(arbeidsgiverTreffId) ??
  null;

export const mockOpprettArbeidsgiver = (
  request: Request,
  treffId: string,
  body: { organisasjonsnummer?: string; navn?: string },
): ArbeidsgiverDTO => {
  const scopeKey = byggMswScopeKey(request, treffId);
  const nyArbeidsgiver: ArbeidsgiverDTO = {
    arbeidsgiverTreffId: `ag-treff-${Date.now()}`,
    organisasjonsnummer: body.organisasjonsnummer ?? '999999999',
    navn: body.navn ?? 'Ny bedrift',
    status: 'AKTIV',
    gateadresse: null,
    postnummer: null,
    poststed: null,
  };
  const eksisterende = mockHentArbeidsgivereForTreff(request, treffId);
  arbeidsgiverStore.set(scopeKey, [...eksisterende, nyArbeidsgiver]);
  return nyArbeidsgiver;
};

export const mockSlettArbeidsgiver = (
  request: Request,
  treffId: string,
  arbeidsgiverId: string,
): void => {
  const eksisterende = mockHentArbeidsgivereForTreff(request, treffId);
  arbeidsgiverStore.set(
    byggMswScopeKey(request, treffId),
    eksisterende.filter((a) => a.arbeidsgiverTreffId !== arbeidsgiverId),
  );
};

export const mockByggArbeidsgivereMedBehovListe = (
  request: Request,
  treffId: string,
): ArbeidsgiverMedBehovDTO[] => {
  const arbeidsgivere = mockHentArbeidsgivereForTreff(request, treffId);
  return arbeidsgivere
    .filter((a) => !!a.arbeidsgiverTreffId)
    .map((a) => ({
      arbeidsgiverTreffId: a.arbeidsgiverTreffId as string,
      organisasjonsnummer: a.organisasjonsnummer,
      navn: a.navn,
      behov: mockHentBehovForArbeidsgiver(
        request,
        a.arbeidsgiverTreffId as string,
      ),
    }));
};

export const mockOpprettArbeidsgiverMedBehov = (
  request: Request,
  treffId: string,
  body: LeggTilArbeidsgiverMedBehovDTO,
): ArbeidsgiverMedBehovDTO => {
  const treffScopeKey = byggMswScopeKey(request, treffId);
  const arbeidsgiverTreffId = crypto.randomUUID();
  const nyArbeidsgiver: ArbeidsgiverDTO = {
    arbeidsgiverTreffId,
    organisasjonsnummer: body.organisasjonsnummer,
    navn: body.navn,
    status: 'AKTIV',
    gateadresse: body.gateadresse ?? null,
    postnummer: body.postnummer ?? null,
    poststed: body.poststed ?? null,
  };
  const eksisterende = mockHentArbeidsgivereForTreff(request, treffId);
  arbeidsgiverStore.set(treffScopeKey, [...eksisterende, nyArbeidsgiver]);
  ArbeidsgiversBehovStore.set(
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

export const mockOppdaterBehovForArbeidsgiver = (
  request: Request,
  treffId: string,
  arbeidsgiverTreffId: string,
  behov: ArbeidsgiversBehovDTO,
): ArbeidsgiverMedBehovDTO | null => {
  const arbeidsgiver = mockHentArbeidsgivereForTreff(request, treffId).find(
    (a) => a.arbeidsgiverTreffId === arbeidsgiverTreffId,
  );
  if (!arbeidsgiver) return null;
  ArbeidsgiversBehovStore.set(
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
