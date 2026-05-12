import {
  type JobbsøkerSøkMockParams,
  søkJobbsøkere,
} from './mocks/jobbsøkereMockBackend';
import { RekrutteringstreffAPI } from '@/app/api/api-routes';
import { JobbsøkerStatusEnum } from '@/app/api/rekrutteringstreff/[...slug]/jobbsøkere/useJobbsøkerSøk';
import { useRekrutteringstreff } from '@/app/api/rekrutteringstreff/[...slug]/useRekrutteringstreff';
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

const formidlingEgneEndpoint = (id: string) =>
  `${RekrutteringstreffAPI.internUrl}/${id}/jobbsoker/formidling/egne`;

const formidlingAlleEndpoint = (id: string) =>
  `${RekrutteringstreffAPI.internUrl}/${id}/jobbsoker/formidling/alle`;

const formidlingBody = (
  params: JobbsøkereForFormidlingParams,
): JobbsøkereForFormidlingBody => ({
  side: params.side,
  antallPerSide: params.antallPerSide,
  ...(params.fritekst && params.fritekst.trim().length > 0
    ? { fritekst: params.fritekst.trim() }
    : {}),
});

export const useEgneJobbsøkereForFormidling = (
  id: string | undefined,
  params: JobbsøkereForFormidlingParams,
  enabled: boolean = true,
) => {
  const endpoint = id && enabled ? formidlingEgneEndpoint(id) : null;
  const body = endpoint ? formidlingBody(params) : null;
  return useSWRPost(endpoint, JobbsøkerFormidlingResponsSchema, body);
};

export const useAlleJobbsøkereForFormidling = (
  id: string | undefined,
  params: JobbsøkereForFormidlingParams,
  enabled: boolean,
) => {
  const endpoint = id && enabled ? formidlingAlleEndpoint(id) : null;
  const body = endpoint ? formidlingBody(params) : null;
  return useSWRPost(endpoint, JobbsøkerFormidlingResponsSchema, body);
};

export const useAntallEgneJobbsøkereForFormidling = (
  id: string | undefined,
  enabled: boolean,
) => useEgneJobbsøkereForFormidling(id, { side: 1, antallPerSide: 1 }, enabled);

export const useJobbsøkereForFormidling = (
  id: string | undefined,
  params: JobbsøkereForFormidlingParams,
) => {
  const { brukerData, harRolle } = useApplikasjonContext();
  const treff = useRekrutteringstreff(id).data;

  const harUtviklerRolle = harRolle([
    Roller.AD_GRUPPE_REKRUTTERINGSBISTAND_UTVIKLER,
  ]);
  const erEier =
    (treff?.eiere.includes(brukerData.ident) ?? false) || harUtviklerRolle;

  const alle = useAlleJobbsøkereForFormidling(id, params, erEier);
  const egne = useEgneJobbsøkereForFormidling(id, params, !erEier);

  return erEier ? alle : egne;
};

const lagFormidlingMockHandler =
  (kunEgne: boolean) =>
  async ({
    cookies,
    params,
    request,
  }: Parameters<Parameters<typeof postMock>[1]>[0]) => {
    const treffId = params.rekrutteringstreffId as string;
    const veilederNavIdent = cookies['DEV-BRUKER'] || 'TestIdent';
    const body = ((await request.json().catch(() => ({}))) ??
      {}) as Partial<JobbsøkereForFormidlingBody>;

    const søkParams: JobbsøkerSøkMockParams = {
      side: Number(body.side ?? 1),
      antallPerSide: Number(body.antallPerSide ?? 25),
      sorteringsfelt: 'navn',
      fritekst: body.fritekst ?? undefined,
      ...(kunEgne ? { kunForVeilederNavIdent: veilederNavIdent } : {}),
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
  };

export const jobbsøkereForFormidlingEgneMSWHandler = postMock(
  `${RekrutteringstreffAPI.internUrl}/:rekrutteringstreffId/jobbsoker/formidling/egne`,
  lagFormidlingMockHandler(true),
);

export const jobbsøkereForFormidlingAlleMSWHandler = postMock(
  `${RekrutteringstreffAPI.internUrl}/:rekrutteringstreffId/jobbsoker/formidling/alle`,
  lagFormidlingMockHandler(false),
);
