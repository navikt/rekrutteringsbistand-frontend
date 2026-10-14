import { postApi } from '@/app/api/fetcher';
import { JobbsøkerStatusEnum } from '@/app/api/rekrutteringstreff/[...slug]/jobbsøkere/useJobbsøkerSøk';
import { z } from 'zod';

export const JOBBSØKERE_PER_SIDE = 100;

/**
 * Bare feltene treffgjennomføringen trenger. Bygger bevisst ikke på skjemaet for
 * jobbsøkersøket, slik at nye felt der ikke følger med hit.
 */
export const GjennomføringsjobbsøkerSchema = z.object({
  personTreffId: z.string(),
  fornavn: z.string().nullable(),
  etternavn: z.string().nullable(),
  status: JobbsøkerStatusEnum,
  /** Mangler for usynlige på WorkOp. */
  fødselsnummer: z.string().nullable(),
});

export type GjennomføringsjobbsøkerDTO = z.output<
  typeof GjennomføringsjobbsøkerSchema
>;

const GjennomføringssideSchema = z.object({
  totalt: z.number().int().nonnegative(),
  side: z.number().int().positive(),
  antallPerStatus: z.record(z.string(), z.number().int().nonnegative()),
  jobbsøkere: z.array(GjennomføringsjobbsøkerSchema),
});

export type Gjennomføringsside = z.infer<typeof GjennomføringssideSchema>;

export interface GjennomføringsjobbsøkerBody {
  side: number;
  antallPerSide: number;
  status?: string[];
}

/** Ber man om en side etter den siste, svarer backend med den siste siden. */
const forventetSideOgAntall = (
  totalt: number,
  body: GjennomføringsjobbsøkerBody,
) => {
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

const erKomplettSide = (
  data: Gjennomføringsside,
  body: GjennomføringsjobbsøkerBody,
) => {
  const forventet = forventetSideOgAntall(data.totalt, body);
  return (
    data.side === forventet.side &&
    data.jobbsøkere.length === forventet.antall &&
    harUnikeJobbsøkere(data)
  );
};

export const hentJobbsøkersideForGjennomføring = async (
  endpoint: string,
  body: GjennomføringsjobbsøkerBody,
) => {
  const respons = await postApi(endpoint, body, { skjulFeilmelding: true });
  const data = GjennomføringssideSchema.parse(respons);
  if (!erKomplettSide(data, body)) {
    throw new Error('Jobbsøkersiden er ufullstendig. Hent på nytt.');
  }
  return data;
};
