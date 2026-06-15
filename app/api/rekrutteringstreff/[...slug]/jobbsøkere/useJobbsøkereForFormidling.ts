import {
  type JobbsøkerSøkMockParams,
  søkJobbsøkere,
} from './mocks/jobbsøkereMockBackend';
import { RekrutteringstreffAPI } from '@/app/api/api-routes';
import { type fetchOptions } from '@/app/api/fetcher';
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

const formidlingEndepunkt = (variant: 'alle' | 'egne', id: string) =>
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
  variant: 'alle' | 'egne',
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
  const { harRolle } = useApplikasjonContext();

  const brukerAlleEndpoint = harRolle([
    Roller.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET,
  ]);
  const brukerEgneEndpoint =
    !brukerAlleEndpoint &&
    harRolle([Roller.AD_GRUPPE_REKRUTTERINGSBISTAND_JOBBSOKERRETTET]);

  const alle = useFormidlingSWR(
    'alle',
    id,
    params,
    brukerAlleEndpoint,
    fetchOptions,
  );
  const egne = useFormidlingSWR(
    'egne',
    id,
    params,
    brukerEgneEndpoint,
    fetchOptions,
  );

  return brukerAlleEndpoint ? alle : egne;
};

export const FORMIDLING_ALLE_FORBUDT_TREFF_ID = 'formidling-alle-forbudt';

const lagFormidlingMockHandler =
  (kunEgne: boolean) =>
  async ({
    cookies,
    params,
    request,
  }: Parameters<Parameters<typeof postMock>[1]>[0]) => {
    const treffId = params.rekrutteringstreffId as string;
    const veilederNavIdent = cookies['DEV-BRUKER'] || 'TestIdent';

    if (!kunEgne && treffId === FORMIDLING_ALLE_FORBUDT_TREFF_ID) {
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
      ...(kunEgne ? { kunForVeilederNavIdent: veilederNavIdent } : {}),
    };

    const resultat = søkJobbsøkere(treffId, søkParams);

    // Marker første jobbsøker som allerede formidlet når et orgnr er valgt, slik at
    // disable-tilstanden i steg 3 kan øves i dev/test.
    const harValgtOrgnr = Boolean(body.orgnr);

    return HttpResponse.json({
      totalt: resultat.totalt,
      side: resultat.side,
      jobbsøkere: resultat.jobbsøkere.map((j, index) => ({
        personTreffId: j.personTreffId,
        fødselsnummer: j.fødselsnummer,
        fornavn: j.fornavn,
        etternavn: j.etternavn,
        alleredeFormidlet: harValgtOrgnr && index === 0,
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
