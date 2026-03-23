import { RekrutteringstreffAPI } from '@/app/api/api-routes';
import { arbeidsgivereMock } from '@/app/api/rekrutteringstreff/[...slug]/arbeidsgivere/arbeidsgivereMock';
import {
  arbeidsgiverStore,
  erNyopprettetUtkast,
} from '@/app/api/rekrutteringstreff/mswState';
import { deleteMock, getMock, postMock } from '@/mocks/mockUtils';
import { HttpResponse } from 'msw';

export const rekrutteringstreffArbeidsgivereMSWHandler = getMock(
  `${RekrutteringstreffAPI.internUrl}/:rekrutteringstreffId/arbeidsgiver`,
  ({ params }) => {
    const id = params.rekrutteringstreffId as string;
    const stored = arbeidsgiverStore.get(id);
    if (stored !== undefined) return HttpResponse.json(stored);
    if (erNyopprettetUtkast(id)) return HttpResponse.json([]);
    return HttpResponse.json(arbeidsgivereMock());
  },
);

export const opprettArbeidsgiverMSWHandler = postMock(
  `${RekrutteringstreffAPI.internUrl}/:rekrutteringstreffId/arbeidsgiver`,
  async ({ params, request }) => {
    const id = params.rekrutteringstreffId as string;
    const body = (await request.json()) as Record<string, unknown>;
    const nyArbeidsgiver = {
      arbeidsgiverTreffId: `ag-treff-${Date.now()}`,
      organisasjonsnummer: (body.organisasjonsnummer as string) ?? '999999999',
      navn: (body.navn as string) ?? 'Ny bedrift',
      status: 'AKTIV',
      gateadresse: null,
      postnummer: null,
      poststed: null,
    };
    const eksisterende = arbeidsgiverStore.get(id) ?? [];
    arbeidsgiverStore.set(id, [...eksisterende, nyArbeidsgiver]);
    return HttpResponse.json(nyArbeidsgiver);
  },
);

export const slettArbeidsgiverMSWHandler = deleteMock(
  `${RekrutteringstreffAPI.internUrl}/:rekrutteringstreffId/arbeidsgiver/:arbeidsgiverId`,
  ({ params }) => {
    const treffId = params.rekrutteringstreffId as string;
    const agId = params.arbeidsgiverId as string;
    const eksisterende = arbeidsgiverStore.get(treffId) ?? [];
    arbeidsgiverStore.set(
      treffId,
      eksisterende.filter((a) => a.arbeidsgiverTreffId !== agId),
    );
    return new HttpResponse(null, { status: 204 });
  },
);
