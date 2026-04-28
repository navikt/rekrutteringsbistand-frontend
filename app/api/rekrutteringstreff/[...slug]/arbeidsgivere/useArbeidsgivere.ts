import { arbeidsgivereMock } from './arbeidsgivereMock';
import { RekrutteringstreffAPI } from '@/app/api/api-routes';
import { byggMswScopeKey } from '@/app/api/rekrutteringstreff/mswScope';
import {
  arbeidsgiverStore,
  erNyopprettetUtkast,
} from '@/app/api/rekrutteringstreff/mswState';
import { useSWRGet } from '@/app/api/useSWRGet';
import { deleteMock, getMock, postMock } from '@/mocks/mockUtils';
import { HttpResponse } from 'msw';
import { z } from 'zod';

export const ArbeidsgiverSchema = z.object({
  arbeidsgiverTreffId: z.string().optional(),
  organisasjonsnummer: z.string(),
  navn: z.string(),
  status: z.string(),
  gateadresse: z.string().nullable(),
  postnummer: z.string().nullable(),
  poststed: z.string().nullable(),
});

export const ArbeidsgivereSchema = z.array(ArbeidsgiverSchema);

// DTOs
export type ArbeidsgiverDTO = z.infer<typeof ArbeidsgiverSchema>;
export type ArbeidsgivereDTO = z.infer<typeof ArbeidsgivereSchema>;

export const rekrutteringstreffArbeidsgivereEndepunkt = (id: string) =>
  `${RekrutteringstreffAPI.internUrl}/${id}/arbeidsgiver`;

export const useRekrutteringstreffArbeidsgivere = (id: string) => {
  return useSWRGet(
    rekrutteringstreffArbeidsgivereEndepunkt(id),
    ArbeidsgivereSchema,
  );
};

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
