import {
  mockHentArbeidsgivereForTreff,
  mockOpprettArbeidsgiver,
  mockSlettArbeidsgiver,
} from './arbeidsgivereMockBackend';
import { RekrutteringstreffAPI } from '@/app/api/api-routes';
import { deleteMock, getMock, postMock } from '@/mocks/mockUtils';
import { HttpResponse } from 'msw';
import { z } from 'zod';

const OpprettArbeidsgiverSchema = z.object({
  organisasjonsnummer: z.string(),
  navn: z.string(),
  gateadresse: z.string().nullish(),
  postnummer: z.string().nullish(),
  poststed: z.string().nullish(),
});

export const rekrutteringstreffArbeidsgivereMSWHandler = getMock(
  `${RekrutteringstreffAPI.internUrl}/:rekrutteringstreffId/arbeidsgiver`,
  ({ params, request }) =>
    HttpResponse.json(
      mockHentArbeidsgivereForTreff(
        request,
        params.rekrutteringstreffId as string,
      ),
    ),
);

export const opprettArbeidsgiverMSWHandler = postMock(
  `${RekrutteringstreffAPI.internUrl}/:rekrutteringstreffId/arbeidsgiver`,
  async ({ params, request }) => {
    const resultat = OpprettArbeidsgiverSchema.safeParse(await request.json());
    if (!resultat.success) {
      return HttpResponse.json(
        { feil: 'Ugyldig arbeidsgiver.' },
        { status: 400 },
      );
    }
    const opprettet = mockOpprettArbeidsgiver(
      request,
      params.rekrutteringstreffId as string,
      resultat.data,
    );
    return HttpResponse.json(opprettet, { status: 201 });
  },
);

export const slettArbeidsgiverMSWHandler = deleteMock(
  `${RekrutteringstreffAPI.internUrl}/:rekrutteringstreffId/arbeidsgiver/:arbeidsgiverId`,
  ({ params, request }) => {
    const resultat = mockSlettArbeidsgiver(
      request,
      params.rekrutteringstreffId as string,
      params.arbeidsgiverId as string,
    );
    if (resultat.status === 204) {
      return new HttpResponse(null, { status: 204 });
    }
    const { status, ...feil } = resultat;
    return HttpResponse.json(feil, { status });
  },
);
