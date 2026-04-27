import { RekrutteringstreffAPI } from '@/app/api/api-routes';
import {
  arbeidsgiverBehovMock,
  arbeidsgivereMock,
} from '@/app/api/rekrutteringstreff/[...slug]/arbeidsgivere/arbeidsgivereMock';
import { byggMswScopeKey } from '@/app/api/rekrutteringstreff/mswScope';
import type {
  ArbeidsgiverBehovDTO,
  ArbeidsgiverMedBehovDTO,
} from '@/app/api/rekrutteringstreff/[...slug]/arbeidsgivere/useArbeidsgivereMedBehov';
import {
  arbeidsgiverBehovStore,
  arbeidsgiverStore,
  erNyopprettetUtkast,
} from '@/app/api/rekrutteringstreff/mswState';
import { getMock, postMock, putMock } from '@/mocks/mockUtils';
import { HttpResponse } from 'msw';

const hentArbeidsgivereForTreff = (request: Request, treffId: string) => {
  const scopeKey = byggMswScopeKey(request, treffId);
  const stored = arbeidsgiverStore.get(scopeKey);
  if (stored !== undefined) return stored;
  if (erNyopprettetUtkast(treffId)) return [];
  return arbeidsgivereMock();
};

const hentBehovForArbeidsgiver = (request: Request, arbeidsgiverTreffId: string) =>
  arbeidsgiverBehovStore.get(byggMswScopeKey(request, arbeidsgiverTreffId)) ??
  arbeidsgiverBehovMock(arbeidsgiverTreffId) ??
  null;

const byggListe = (request: Request, treffId: string): ArbeidsgiverMedBehovDTO[] => {
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

export const arbeidsgivereMedBehovMSWHandler = getMock(
  `${RekrutteringstreffAPI.internUrl}/:rekrutteringstreffId/arbeidsgiver-med-behov`,
  ({ params, request }) => {
    const id = params.rekrutteringstreffId as string;
    return HttpResponse.json(byggListe(request, id));
  },
);

export const opprettArbeidsgiverMedBehovMSWHandler = postMock(
  `${RekrutteringstreffAPI.internUrl}/:rekrutteringstreffId/arbeidsgiver-med-behov`,
  async ({ params, request }) => {
    const id = params.rekrutteringstreffId as string;
    const treffScopeKey = byggMswScopeKey(request, id);
    const body = (await request.json()) as {
      organisasjonsnummer: string;
      navn: string;
      behov: ArbeidsgiverBehovDTO;
    };
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
    const eksisterende = hentArbeidsgivereForTreff(request, id);
    arbeidsgiverStore.set(treffScopeKey, [...eksisterende, nyArbeidsgiver]);
    arbeidsgiverBehovStore.set(
      byggMswScopeKey(request, arbeidsgiverTreffId),
      body.behov,
    );
    return HttpResponse.json(
      {
        arbeidsgiverTreffId,
        organisasjonsnummer: body.organisasjonsnummer,
        navn: body.navn,
        behov: body.behov,
      },
      { status: 201 },
    );
  },
);

export const oppdaterBehovMSWHandler = putMock(
  `${RekrutteringstreffAPI.internUrl}/:rekrutteringstreffId/arbeidsgiver/:arbeidsgiverTreffId/behov`,
  async ({ params, request }) => {
    const treffId = params.rekrutteringstreffId as string;
    const arbeidsgiverTreffId = params.arbeidsgiverTreffId as string;
    const behov = (await request.json()) as ArbeidsgiverBehovDTO;
    const arbeidsgiver = hentArbeidsgivereForTreff(request, treffId).find(
      (a) => a.arbeidsgiverTreffId === arbeidsgiverTreffId,
    );
    if (!arbeidsgiver) return new HttpResponse(null, { status: 404 });
    arbeidsgiverBehovStore.set(
      byggMswScopeKey(request, arbeidsgiverTreffId),
      behov,
    );
    return HttpResponse.json({
      arbeidsgiverTreffId,
      organisasjonsnummer: arbeidsgiver.organisasjonsnummer,
      navn: arbeidsgiver.navn,
      behov,
    } satisfies ArbeidsgiverMedBehovDTO);
  },
);
