import {
  mockHentArbeidsgivereForTreff,
  mockOpprettArbeidsgiver,
  mockSlettArbeidsgiver,
} from './arbeidsgivereMockBackend';
import { RekrutteringstreffAPI } from '@/app/api/api-routes';
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

export const rekrutteringstreffArbeidsgivereMSWHandler = getMock(
  `${RekrutteringstreffAPI.internUrl}/:rekrutteringstreffId/arbeidsgiver`,
  ({ params, request }) => {
    const id = params.rekrutteringstreffId as string;
    return HttpResponse.json(mockHentArbeidsgivereForTreff(request, id));
  },
);

export const opprettArbeidsgiverMSWHandler = postMock(
  `${RekrutteringstreffAPI.internUrl}/:rekrutteringstreffId/arbeidsgiver`,
  async ({ params, request }) => {
    const id = params.rekrutteringstreffId as string;
    const body = (await request.json()) as Record<string, unknown>;
    const nyArbeidsgiver = mockOpprettArbeidsgiver(request, id, {
      organisasjonsnummer: body.organisasjonsnummer as string | undefined,
      navn: body.navn as string | undefined,
    });
    return HttpResponse.json(nyArbeidsgiver);
  },
);

export const slettArbeidsgiverMSWHandler = deleteMock(
  `${RekrutteringstreffAPI.internUrl}/:rekrutteringstreffId/arbeidsgiver/:arbeidsgiverId`,
  ({ params, request }) => {
    const treffId = params.rekrutteringstreffId as string;
    const arbeidsgiverId = params.arbeidsgiverId as string;
    mockSlettArbeidsgiver(request, treffId, arbeidsgiverId);
    return new HttpResponse(null, { status: 204 });
  },
);
