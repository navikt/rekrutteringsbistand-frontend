import {
  type JobbsøkerSøkMockParams,
  søkJobbsøkere,
} from './mocks/jobbsøkereMockBackend';
import { RekrutteringstreffAPI } from '@/app/api/api-routes';
import { type fetchOptions } from '@/app/api/fetcher';
import { useSWRPost } from '@/app/api/useSWRPost';
import { useErTreffEier } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/useErTreffEier';
import { useRekrutteringstreffData } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/useRekrutteringstreffData';
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
  alleredeFormidlet: z.boolean(),
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
  orgnr?: string;
}

interface JobbsøkereForFormidlingBody {
  side: number;
  antallPerSide: number;
  fritekst?: string;
  orgnr?: string;
}

export const bareTotaltAntallParams: JobbsøkereForFormidlingParams = {
  side: 1,
  antallPerSide: 1,
};

const formidlingEndepunkt = (variant: 'alle' | 'mittkontor', id: string) =>
  `${RekrutteringstreffAPI.internUrl}/${id}/jobbsoker/formidling/${variant}`;

const formidlingBody = (
  params: JobbsøkereForFormidlingParams,
): JobbsøkereForFormidlingBody => ({
  side: params.side,
  antallPerSide: params.antallPerSide,
  ...(params.fritekst && params.fritekst.trim().length > 0
    ? { fritekst: params.fritekst.trim() }
    : {}),
  ...(params.orgnr ? { orgnr: params.orgnr } : {}),
});

const useFormidlingSWR = (
  variant: 'alle' | 'mittkontor',
  id: string | undefined,
  params: JobbsøkereForFormidlingParams,
  enabled: boolean,
  fetchOptions?: fetchOptions,
) => {
  const endpoint = id && enabled ? formidlingEndepunkt(variant, id) : null;
  const body = endpoint ? formidlingBody(params) : null;
  return useSWRPost(endpoint, JobbsøkerFormidlingResponsSchema, body, {
    fetchOptions,
  });
};

export const useJobbsøkereForFormidling = (
  id: string | undefined,
  params: JobbsøkereForFormidlingParams,
  fetchOptions?: fetchOptions,
) => {
  const { harRolle, brukerData } = useApplikasjonContext();
  const erTreffEier = useErTreffEier();
  const { treff } = useRekrutteringstreffData();

  const erPåEttAvMineKontorer = (treff?.kontorer ?? []).some((kontor) =>
    brukerData.enheter.some((enhet) => enhet.enhetId === kontor),
  );

  const brukerAlleEndpoint =
    (erTreffEier || erPåEttAvMineKontorer) &&
    harRolle([Roller.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET]);
  const brukerMittKontorEndpoint =
    !brukerAlleEndpoint &&
    harRolle([Roller.AD_GRUPPE_REKRUTTERINGSBISTAND_JOBBSOKERRETTET]);

  const alle = useFormidlingSWR(
    'alle',
    id,
    params,
    brukerAlleEndpoint,
    fetchOptions,
  );
  const mittkontor = useFormidlingSWR(
    'mittkontor',
    id,
    params,
    brukerMittKontorEndpoint,
    fetchOptions,
  );

  return brukerAlleEndpoint ? alle : mittkontor;
};

export const FORMIDLING_ALLE_FORBUDT_TREFF_ID = 'formidling-alle-forbudt';

const lagFormidlingMockHandler =
  (kunMittKontor: boolean) =>
  async ({
    cookies,
    params,
    request,
  }: Parameters<Parameters<typeof postMock>[1]>[0]) => {
    const treffId = params.rekrutteringstreffId as string;
    const veilederNavIdent = cookies['DEV-BRUKER'] || 'TestIdent';

    if (!kunMittKontor && treffId === FORMIDLING_ALLE_FORBUDT_TREFF_ID) {
      return HttpResponse.json(
        { feil: 'Personen har ikke tilgang til formidlingslisten' },
        { status: 403 },
      );
    }

    const body = ((await request.json().catch(() => ({}))) ??
      {}) as Partial<JobbsøkereForFormidlingBody>;

    const søkParams: JobbsøkerSøkMockParams = {
      side: Number(body.side ?? 1),
      antallPerSide: Number(body.antallPerSide ?? 25),
      sorteringsfelt: 'navn',
      fritekst: body.fritekst ?? undefined,
      ...(kunMittKontor ? { kunForVeilederNavIdent: veilederNavIdent } : {}),
    };

    const resultat = søkJobbsøkere(treffId, søkParams);

    return HttpResponse.json({
      totalt: resultat.totalt,
      side: resultat.side,
      jobbsøkere: resultat.jobbsøkere.map((j, index) => ({
        personTreffId: j.personTreffId,
        fødselsnummer: j.fødselsnummer,
        fornavn: j.fornavn,
        etternavn: j.etternavn,
        alleredeFormidlet: index === 0,
      })),
    });
  };

export const jobbsøkereForFormidlingMittKontorMSWHandler = postMock(
  `${RekrutteringstreffAPI.internUrl}/:rekrutteringstreffId/jobbsoker/formidling/mittkontor`,
  lagFormidlingMockHandler(true),
);

export const jobbsøkereForFormidlingAlleMSWHandler = postMock(
  `${RekrutteringstreffAPI.internUrl}/:rekrutteringstreffId/jobbsoker/formidling/alle`,
  lagFormidlingMockHandler(false),
);
