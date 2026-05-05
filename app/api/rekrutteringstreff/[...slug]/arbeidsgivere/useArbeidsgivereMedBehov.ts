import {
  mockByggArbeidsgivereMedBehovListe,
  mockOppdaterBehovForArbeidsgiver,
  mockOpprettArbeidsgiverMedBehov,
} from './arbeidsgivereMockBackend';
import { RekrutteringstreffAPI } from '@/app/api/api-routes';
import { postApi, putApi } from '@/app/api/fetcher';
import type { NæringskodeDTO } from '@/app/api/pam-search/underenhet/useArbeidsgiver';
import { useSWRGet } from '@/app/api/useSWRGet';
import { getMock, postMock, putMock } from '@/mocks/mockUtils';
import { HttpResponse } from 'msw';
import { z } from 'zod';

export const BehovTagSchema = z.object({
  label: z.string(),
  kategori: z.string(),
  konseptId: z.number(),
});

export type BehovTagDTO = z.infer<typeof BehovTagSchema>;

export const ArbeidsgiverBehovSchema = z.object({
  samledeKvalifikasjoner: z.array(BehovTagSchema),
  arbeidssprak: z.array(z.string()),
  antall: z.number().int().positive().max(99),
  ansettelsesformer: z.array(z.string()),
  personligeEgenskaper: z.array(BehovTagSchema).default([]).optional(),
});

export type ArbeidsgiverBehovDTO = z.infer<typeof ArbeidsgiverBehovSchema>;

export const ArbeidsgiverMedBehovSchema = z.object({
  arbeidsgiverTreffId: z.string(),
  organisasjonsnummer: z.string(),
  navn: z.string(),
  behov: ArbeidsgiverBehovSchema.nullable().optional(),
});

export const ArbeidsgivereMedBehovSchema = z.array(ArbeidsgiverMedBehovSchema);

export type ArbeidsgiverMedBehovDTO = z.infer<
  typeof ArbeidsgiverMedBehovSchema
>;

export type LeggTilArbeidsgiverMedBehovDTO = {
  organisasjonsnummer: string;
  navn: string;
  næringskoder: Array<NæringskodeDTO> | null | undefined;
  gateadresse: string | null | undefined;
  postnummer: string | null | undefined;
  poststed: string | null | undefined;
  behov: ArbeidsgiverBehovDTO;
};

const arbeidsgivereMedBehovEndepunkt = (rekrutteringstreffId: string) =>
  `${RekrutteringstreffAPI.internUrl}/${rekrutteringstreffId}/arbeidsgiver-med-behov`;

const behovEndepunkt = (
  rekrutteringstreffId: string,
  arbeidsgiverTreffId: string,
) =>
  `${RekrutteringstreffAPI.internUrl}/${rekrutteringstreffId}/arbeidsgiver/${arbeidsgiverTreffId}/behov`;

export const opprettArbeidsgiverMedBehov = (
  rekrutteringstreffId: string,
  dto: LeggTilArbeidsgiverMedBehovDTO,
) => postApi(arbeidsgivereMedBehovEndepunkt(rekrutteringstreffId), dto);

export const oppdaterBehov = (
  rekrutteringstreffId: string,
  arbeidsgiverTreffId: string,
  behov: ArbeidsgiverBehovDTO,
) => putApi(behovEndepunkt(rekrutteringstreffId, arbeidsgiverTreffId), behov);

export const useArbeidsgivereMedBehov = (
  rekrutteringstreffId: string,
  enabled = true,
) =>
  useSWRGet(
    enabled ? arbeidsgivereMedBehovEndepunkt(rekrutteringstreffId) : null,
    ArbeidsgivereMedBehovSchema,
  );

export const arbeidsgivereMedBehovMSWHandler = getMock(
  `${RekrutteringstreffAPI.internUrl}/:rekrutteringstreffId/arbeidsgiver-med-behov`,
  ({ params, request }) => {
    const id = params.rekrutteringstreffId as string;
    return HttpResponse.json(mockByggArbeidsgivereMedBehovListe(request, id));
  },
);

export const opprettArbeidsgiverMedBehovMSWHandler = postMock(
  `${RekrutteringstreffAPI.internUrl}/:rekrutteringstreffId/arbeidsgiver-med-behov`,
  async ({ params, request }) => {
    const id = params.rekrutteringstreffId as string;
    const body = (await request.json()) as LeggTilArbeidsgiverMedBehovDTO;
    const opprettet = mockOpprettArbeidsgiverMedBehov(request, id, body);
    return HttpResponse.json(opprettet, { status: 201 });
  },
);

export const oppdaterBehovMSWHandler = putMock(
  `${RekrutteringstreffAPI.internUrl}/:rekrutteringstreffId/arbeidsgiver/:arbeidsgiverTreffId/behov`,
  async ({ params, request }) => {
    const treffId = params.rekrutteringstreffId as string;
    const arbeidsgiverTreffId = params.arbeidsgiverTreffId as string;
    const behov = (await request.json()) as ArbeidsgiverBehovDTO;
    const oppdatert = mockOppdaterBehovForArbeidsgiver(
      request,
      treffId,
      arbeidsgiverTreffId,
      behov,
    );
    if (!oppdatert) return new HttpResponse(null, { status: 404 });
    return HttpResponse.json(oppdatert satisfies ArbeidsgiverMedBehovDTO);
  },
);
