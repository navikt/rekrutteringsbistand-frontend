import { RekrutteringstreffAPI } from '@/app/api/api-routes';
import type {
  ArbeidsgiverBehovDTO,
  ArbeidsgiverMedBehovDTO,
} from '@/app/api/rekrutteringstreff/[...slug]/arbeidsgivere/useArbeidsgivereMedBehov';
import {
  arbeidsgiverBehovStore,
  arbeidsgiverStore,
  erNyopprettetUtkast,
} from '@/app/api/rekrutteringstreff/mswState';
import { arbeidsgivereMock } from '@/app/api/rekrutteringstreff/[...slug]/arbeidsgivere/arbeidsgivereMock';
import { getMock, postMock, putMock } from '@/mocks/mockUtils';
import { HttpResponse } from 'msw';

const byggListe = (treffId: string): ArbeidsgiverMedBehovDTO[] => {
  const arbeidsgivere = arbeidsgiverStore.get(treffId) ?? [];
  return arbeidsgivere
    .filter((a) => !!a.arbeidsgiverTreffId)
    .map((a) => ({
      arbeidsgiverTreffId: a.arbeidsgiverTreffId as string,
      organisasjonsnummer: a.organisasjonsnummer,
      navn: a.navn,
      behov: arbeidsgiverBehovStore.get(a.arbeidsgiverTreffId as string) ?? null,
    }));
};

export const arbeidsgivereMedBehovMSWHandler = getMock(
  `${RekrutteringstreffAPI.internUrl}/:rekrutteringstreffId/arbeidsgiver-med-behov`,
  ({ params }) => {
    const id = params.rekrutteringstreffId as string;
    if (arbeidsgiverStore.has(id)) return HttpResponse.json(byggListe(id));
    if (erNyopprettetUtkast(id)) return HttpResponse.json([]);
    const fallbackArbeidsgivere = arbeidsgivereMock();
    return HttpResponse.json(
      fallbackArbeidsgivere
        .filter((a) => !!a.arbeidsgiverTreffId)
        .map((a) => ({
          arbeidsgiverTreffId: a.arbeidsgiverTreffId as string,
          organisasjonsnummer: a.organisasjonsnummer,
          navn: a.navn,
          behov: null,
        })),
    );
  },
);

export const opprettArbeidsgiverMedBehovMSWHandler = postMock(
  `${RekrutteringstreffAPI.internUrl}/:rekrutteringstreffId/arbeidsgiver-med-behov`,
  async ({ params, request }) => {
    const id = params.rekrutteringstreffId as string;
    const body = (await request.json()) as {
      organisasjonsnummer: string;
      navn: string;
      behov: ArbeidsgiverBehovDTO;
    };
    const arbeidsgiverTreffId = `ag-treff-${Date.now()}`;
    const nyArbeidsgiver = {
      arbeidsgiverTreffId,
      organisasjonsnummer: body.organisasjonsnummer,
      navn: body.navn,
      status: 'AKTIV',
      gateadresse: null,
      postnummer: null,
      poststed: null,
    };
    const eksisterende = arbeidsgiverStore.get(id) ?? [];
    arbeidsgiverStore.set(id, [...eksisterende, nyArbeidsgiver]);
    arbeidsgiverBehovStore.set(arbeidsgiverTreffId, body.behov);
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
    const arbeidsgiver = (arbeidsgiverStore.get(treffId) ?? []).find(
      (a) => a.arbeidsgiverTreffId === arbeidsgiverTreffId,
    );
    if (!arbeidsgiver) return new HttpResponse(null, { status: 404 });
    arbeidsgiverBehovStore.set(arbeidsgiverTreffId, behov);
    return HttpResponse.json({
      arbeidsgiverTreffId,
      organisasjonsnummer: arbeidsgiver.organisasjonsnummer,
      navn: arbeidsgiver.navn,
      behov,
    } satisfies ArbeidsgiverMedBehovDTO);
  },
);
