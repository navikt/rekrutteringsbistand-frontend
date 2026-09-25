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

type Gjennomføringsside = z.infer<typeof GjennomføringssideSchema>;

/** Ber man om en side etter den siste, svarer backend med den siste siden. */
const forventetSideOgAntall = (totalt: number, body: JobbsøkerSøkBody) => {
  const sisteSide = Math.max(1, Math.ceil(totalt / body.antallPerSide));
  const side = Math.min(body.side, sisteSide);
  const antall = Math.min(
    body.antallPerSide,
    totalt - (side - 1) * body.antallPerSide,
  );
  return { side, antall };
};

const harUnikeJobbsøkere = (data: Gjennomføringsside) =>
  new Set(data.jobbsøkere.map((person) => person.personTreffId)).size ===
  data.jobbsøkere.length;

const erKomplettSide = (data: Gjennomføringsside, body: JobbsøkerSøkBody) => {
  const forventet = forventetSideOgAntall(data.totalt, body);
  return (
    data.side === forventet.side &&
    data.jobbsøkere.length === forventet.antall &&
    harUnikeJobbsøkere(data)
  );
};

export const hentJobbsøkersideForGjennomføring = async (
  endpoint: string,
  body: JobbsøkerSøkBody,
) => {
  const respons = await postApi(endpoint, body, { skjulFeilmelding: true });
  const data = GjennomføringssideSchema.parse(respons);
  if (!erKomplettSide(data, body)) {
    throw new Error('Jobbsøkersiden er ufullstendig. Hent på nytt.');
  }
  return data;
};
