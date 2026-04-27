import { RekrutteringstreffAPI } from '@/app/api/api-routes';
import { arbeidsgivereMock } from '@/app/api/rekrutteringstreff/[...slug]/arbeidsgivere/arbeidsgivereMock';
import { byggMswScopeKey } from '@/app/api/rekrutteringstreff/mswScope';
import {
  arbeidsgiverStore,
  erNyopprettetUtkast,
} from '@/app/api/rekrutteringstreff/mswState';
import { deleteMock, getMock, postMock } from '@/mocks/mockUtils';
import { HttpResponse } from 'msw';

const hentArbeidsgivereForTreff = (request: Request, treffId: string) => {
  const scopeKey = byggMswScopeKey(request, treffId);
  const stored = arbeidsgiverStore.get(scopeKey);
  if (stored !== undefined) return stored;
  if (erNyopprettetUtkast(treffId)) return [];
  return arbeidsgivereMock();
};

export const rekrutteringstreffArbeidsgivereMSWHandler = getMock(
  `${RekrutteringstreffAPI.internUrl}/:rekrutteringstreffId/arbeidsgiver`,
  ({ params, request }) => {
    const id = params.rekrutteringstreffId as string;
    return HttpResponse.json(hentArbeidsgivereForTreff(request, id));
  },
);

export const opprettArbeidsgiverMSWHandler = postMock(
  `${RekrutteringstreffAPI.internUrl}/:rekrutteringstreffId/arbeidsgiver`,
  async ({ params, request }) => {
    const id = params.rekrutteringstreffId as string;
    const scopeKey = byggMswScopeKey(request, id);
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
    const eksisterende = hentArbeidsgivereForTreff(request, id);
    arbeidsgiverStore.set(scopeKey, [...eksisterende, nyArbeidsgiver]);
    return HttpResponse.json(nyArbeidsgiver);
  },
);

export const slettArbeidsgiverMSWHandler = deleteMock(
  `${RekrutteringstreffAPI.internUrl}/:rekrutteringstreffId/arbeidsgiver/:arbeidsgiverId`,
  ({ params, request }) => {
    const treffId = params.rekrutteringstreffId as string;
    const agId = params.arbeidsgiverId as string;
    const eksisterende = hentArbeidsgivereForTreff(request, treffId);
    arbeidsgiverStore.set(
      byggMswScopeKey(request, treffId),
      eksisterende.filter((a) => a.arbeidsgiverTreffId !== agId),
    );
    return new HttpResponse(null, { status: 204 });
  },
);
