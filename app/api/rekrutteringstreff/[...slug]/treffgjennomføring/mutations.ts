import type {
  ArbeidsgiverIntervjufordelingDTO,
  GjeldendeSteg,
  MøteoppsettDTO,
  TreffgjennomføringDTO,
  RomDTO,
  VurderingDTO,
  InteresseDTO,
} from './useTreffgjennomføring';
import {
  TreffgjennomføringSchema,
  treffgjennomføringOppdaterEndepunkt,
  oppfølgingOppdaterEndepunkt,
} from './useTreffgjennomføring';
import { postApi, putApi } from '@/app/api/fetcher';

export const oppmøteEndepunkt = (id: string) =>
  `${treffgjennomføringOppdaterEndepunkt(id)}/oppmote`;

export const møteoppsettEndepunkt = (id: string) =>
  `${treffgjennomføringOppdaterEndepunkt(id)}/moteoppsett`;

export const romfordelingEndepunkt = (id: string) =>
  `${treffgjennomføringOppdaterEndepunkt(id)}/romfordeling`;

export const interesseEndepunkt = (id: string) =>
  `${treffgjennomføringOppdaterEndepunkt(id)}/interesse`;

export const intervjufordelingEndepunkt = (id: string) =>
  `${treffgjennomføringOppdaterEndepunkt(id)}/intervjufordeling`;

export const fordelIntervjuerEndepunkt = (id: string) =>
  `${intervjufordelingEndepunkt(id)}/fordel`;

export const stegEndepunkt = (id: string) =>
  `${treffgjennomføringOppdaterEndepunkt(id)}/steg`;

export const vurderingerEndepunkt = (id: string) =>
  `${oppfølgingOppdaterEndepunkt(id)}/vurderinger`;

export const oppdaterOppmøte = async (
  rekrutteringstreffId: string,
  personTreffId: string,
  møtt: boolean,
): Promise<TreffgjennomføringDTO> => {
  const respons = await putApi(
    oppmøteEndepunkt(rekrutteringstreffId),
    { personTreffId, møtt },
    { skjulFeilmelding: true },
  );
  return TreffgjennomføringSchema.parse(respons);
};

export const settGjeldendeSteg = async (
  rekrutteringstreffId: string,
  steg: GjeldendeSteg,
): Promise<TreffgjennomføringDTO> => {
  const respons = await putApi(
    stegEndepunkt(rekrutteringstreffId),
    { steg },
    { skjulFeilmelding: true },
  );
  return TreffgjennomføringSchema.parse(respons);
};

export const settOppMøteplan = async (
  rekrutteringstreffId: string,
  oppsett: MøteoppsettDTO,
): Promise<TreffgjennomføringDTO> => {
  const respons = await putApi(
    møteoppsettEndepunkt(rekrutteringstreffId),
    oppsett,
  );
  return TreffgjennomføringSchema.parse(respons);
};

export const oppdaterRomfordeling = async (
  rekrutteringstreffId: string,
  rom: RomDTO[],
): Promise<TreffgjennomføringDTO> => {
  const respons = await putApi(
    romfordelingEndepunkt(rekrutteringstreffId),
    rom,
    { skjulFeilmelding: true },
  );
  return TreffgjennomføringSchema.parse(respons);
};

export const oppdaterInteresse = async (
  rekrutteringstreffId: string,
  interesse: InteresseDTO,
  interessert: boolean,
): Promise<TreffgjennomføringDTO> => {
  const respons = await putApi(
    interesseEndepunkt(rekrutteringstreffId),
    {
      ...interesse,
      interessert,
    },
    { skjulFeilmelding: true },
  );
  return TreffgjennomføringSchema.parse(respons);
};

export const oppdaterIntervjufordeling = async (
  rekrutteringstreffId: string,
  fordeling: ArbeidsgiverIntervjufordelingDTO,
): Promise<TreffgjennomføringDTO> => {
  const respons = await putApi(
    intervjufordelingEndepunkt(rekrutteringstreffId),
    fordeling,
    { skjulFeilmelding: true },
  );
  return TreffgjennomføringSchema.parse(respons);
};

export const fordelIntervjuer = async (
  rekrutteringstreffId: string,
): Promise<TreffgjennomføringDTO> => {
  const respons = await postApi(
    fordelIntervjuerEndepunkt(rekrutteringstreffId),
    {},
    { skjulFeilmelding: true },
  );
  return TreffgjennomføringSchema.parse(respons);
};

export const oppdaterVurdering = async (
  rekrutteringstreffId: string,
  vurdering: VurderingDTO,
): Promise<TreffgjennomføringDTO> => {
  const respons = await putApi(
    vurderingerEndepunkt(rekrutteringstreffId),
    vurdering,
    { skjulFeilmelding: true },
  );
  return TreffgjennomføringSchema.parse(respons);
};
