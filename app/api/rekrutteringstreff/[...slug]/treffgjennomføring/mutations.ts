import {
  fordelIntervjuerEndepunkt,
  fordelRomEndepunkt,
  flyttJobbsøkerRomEndepunkt,
  interesseEndepunkt,
  intervjufordelingEndepunkt,
  møteoppsettEndepunkt,
  oppmøteEndepunkt,
  stegEndepunkt,
  vurderingerEndepunkt,
} from './treffgjennomføringEndepunkter';
import {
  TreffgjennomføringSchema,
  type ArbeidsgiverIntervjufordelingDTO,
  type GjeldendeSteg,
  type InteresseDTO,
  type MøteoppsettDTO,
  type TreffgjennomføringDTO,
  type VurderingDTO,
} from './treffgjennomføringSchema';
import { postApi, putApi } from '@/app/api/fetcher';

/** Alle endringer svarer med hele den oppdaterte treffgjennomføringen. */
const sendEndring = async (
  metode: 'PUT' | 'POST',
  url: string,
  body: Record<string, unknown> = {},
): Promise<TreffgjennomføringDTO> => {
  const send = metode === 'PUT' ? putApi : postApi;
  return TreffgjennomføringSchema.parse(await send(url, body));
};

export const oppdaterOppmøte = (
  rekrutteringstreffId: string,
  personTreffId: string,
  møtt: boolean,
) =>
  sendEndring('PUT', oppmøteEndepunkt(rekrutteringstreffId), {
    personTreffId,
    møtt,
  });

export const settGjeldendeSteg = (
  rekrutteringstreffId: string,
  steg: GjeldendeSteg,
) => sendEndring('PUT', stegEndepunkt(rekrutteringstreffId), { steg });

export const settOppMøteplan = (
  rekrutteringstreffId: string,
  oppsett: MøteoppsettDTO,
) => sendEndring('PUT', møteoppsettEndepunkt(rekrutteringstreffId), oppsett);

export const oppdaterRomplassering = (
  rekrutteringstreffId: string,
  personTreffId: string,
  romnummer: number,
) =>
  sendEndring(
    'PUT',
    flyttJobbsøkerRomEndepunkt(rekrutteringstreffId, personTreffId),
    { romnummer },
  );

export const fordelRom = (rekrutteringstreffId: string) =>
  sendEndring('POST', fordelRomEndepunkt(rekrutteringstreffId));

export const oppdaterInteresse = (
  rekrutteringstreffId: string,
  interesse: InteresseDTO,
  interessert: boolean,
) =>
  sendEndring('PUT', interesseEndepunkt(rekrutteringstreffId), {
    ...interesse,
    interessert,
  });

export const oppdaterIntervjufordeling = (
  rekrutteringstreffId: string,
  fordeling: ArbeidsgiverIntervjufordelingDTO,
) =>
  sendEndring(
    'PUT',
    intervjufordelingEndepunkt(rekrutteringstreffId),
    fordeling,
  );

export const fordelIntervjuer = (rekrutteringstreffId: string) =>
  sendEndring('POST', fordelIntervjuerEndepunkt(rekrutteringstreffId));

export const oppdaterVurdering = (
  rekrutteringstreffId: string,
  vurdering: VurderingDTO,
) => sendEndring('PUT', vurderingerEndepunkt(rekrutteringstreffId), vurdering);
