import {
  type JobbsøkerSøkMockParams,
  søkJobbsøkere,
} from './mocks/jobbsøkereMockBackend';
import { RekrutteringstreffAPI } from '@/app/api/api-routes';
import { JobbsøkerStatusEnum } from '@/app/api/rekrutteringstreff/[...slug]/jobbsøkere/useJobbsøkerSøk';
import { useSWRPost } from '@/app/api/useSWRPost';
import { Roller } from '@/components/tilgangskontroll/roller';
import { postMock } from '@/mocks/mockUtils';
import { useApplikasjonContext } from '@/providers/ApplikasjonContext';
import { HttpResponse } from 'msw';
import { z } from 'zod';

export const JobbsøkerFormidlingTreffSchema = z.object({
  personTreffId: z.string(),
  fødselsnummer: z.string(),
  fornavn: z.string().nullable(),
  etternavn: z.string().nullable(),
  status: JobbsøkerStatusEnum,
});

export const JobbsøkerFormidlingResponsSchema = z.object({
  totalt: z.number(),
  side: z.number(),
  jobbsøkere: z.array(JobbsøkerFormidlingTreffSchema),
});

export type JobbsøkerFormidlingTreffDTO = z.output<
  typeof JobbsøkerFormidlingTreffSchema
>;
export type JobbsøkerFormidlingResponsDTO = z.output<
  typeof JobbsøkerFormidlingResponsSchema
>;

export interface JobbsøkereForFormidlingParams {
  side: number;
  antallPerSide: number;
  fritekst?: string;
}

interface JobbsøkereForFormidlingBody {
  side: number;
  antallPerSide: number;
  fritekst?: string;
}

export const useJobbsøkereForFormidling = (
  id: string | undefined,
  params: JobbsøkereForFormidlingParams,
) => {
  const { harRolle } = useApplikasjonContext();

  const harTilgang = harRolle([
    Roller.AD_GRUPPE_REKRUTTERINGSBISTAND_JOBBSOKERRETTET,
    Roller.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET,
    Roller.AD_GRUPPE_REKRUTTERINGSBISTAND_UTVIKLER,
  ]);

  const endpoint =
    id && harTilgang
      ? `${RekrutteringstreffAPI.internUrl}/${id}/jobbsoker/formidling`
      : null;

  const body: JobbsøkereForFormidlingBody | null = endpoint
    ? {
        side: params.side,
        antallPerSide: params.antallPerSide,
        ...(params.fritekst && params.fritekst.trim().length > 0
          ? { fritekst: params.fritekst.trim() }
          : {}),
      }
    : null;

  return useSWRPost(endpoint, JobbsøkerFormidlingResponsSchema, body);
};

export const jobbsøkereForFormidlingMSWHandler = postMock(
  `${RekrutteringstreffAPI.internUrl}/:rekrutteringstreffId/jobbsoker/formidling`,
  async ({ params, request }) => {
    const treffId = params.rekrutteringstreffId as string;
    const body = ((await request.json().catch(() => ({}))) ??
      {}) as Partial<JobbsøkereForFormidlingBody>;

    const søkParams: JobbsøkerSøkMockParams = {
      side: Number(body.side ?? 1),
      antallPerSide: Number(body.antallPerSide ?? 25),
      sorteringsfelt: 'navn',
      fritekst: body.fritekst ?? undefined,
    };

    const resultat = søkJobbsøkere(treffId, søkParams);

    return HttpResponse.json({
      totalt: resultat.totalt,
      side: resultat.side,
      jobbsøkere: resultat.jobbsøkere.map((j) => ({
        personTreffId: j.personTreffId,
        fødselsnummer: j.fødselsnummer,
        fornavn: j.fornavn,
        etternavn: j.etternavn,
        status: j.status,
      })),
    });
  },
);
