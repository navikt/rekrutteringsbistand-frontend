import { postApi } from '@/app/api/fetcher';
import {
  JobbsøkerSøkResponsSchema,
  type JobbsøkerSøkBody,
} from '@/app/api/rekrutteringstreff/[...slug]/jobbsøkere/useJobbsøkerSøk';
import { z } from 'zod';

export const JOBBSØKERE_PER_SIDE = 100;

const GjennomføringssideSchema = JobbsøkerSøkResponsSchema.extend({
  totalt: z.number().int().nonnegative(),
  side: z.number().int().positive(),
  antallPerStatus: z.record(z.string(), z.number().int().nonnegative()),
});

export const hentJobbsøkersideForGjennomføring = async (
  endpoint: string,
  body: JobbsøkerSøkBody,
) => {
  const respons = await postApi(endpoint, body, { skjulFeilmelding: true });
  const data = GjennomføringssideSchema.parse(respons);
  const sisteSide = Math.max(1, Math.ceil(data.totalt / body.antallPerSide));
  const forventetSide = Math.min(body.side, sisteSide);
  const forventetAntall = Math.min(
    body.antallPerSide,
    data.totalt - (forventetSide - 1) * body.antallPerSide,
  );
  if (
    data.side !== forventetSide ||
    data.jobbsøkere.length !== forventetAntall ||
    new Set(data.jobbsøkere.map((person) => person.personTreffId)).size !==
      data.jobbsøkere.length
  ) {
    throw new Error('Jobbsøkersiden er ufullstendig. Hent på nytt.');
  }
  return data;
};
