import type {
  ArbeidsgiverIntervjufordelingDTO,
  MøteoppsettDTO,
  TreffgjennomføringDTO,
  RomDTO,
  VurderingDTO,
  InteresseDTO,
} from './useTreffgjennomføring';
import {
  TreffgjennomføringSchema,
  treffgjennomføringSkrivEndepunkt,
  oppfølgingSkrivEndepunkt,
} from './useTreffgjennomføring';
import { postApi, putApi } from '@/app/api/fetcher';

export const oppmøteEndepunkt = (id: string) =>
  `${treffgjennomføringSkrivEndepunkt(id)}/oppmote`;

export const møteoppsettEndepunkt = (id: string) =>
  `${treffgjennomføringSkrivEndepunkt(id)}/moteoppsett`;

export const romfordelingEndepunkt = (id: string) =>
  `${treffgjennomføringSkrivEndepunkt(id)}/romfordeling`;

export const interesseEndepunkt = (id: string) =>
  `${treffgjennomføringSkrivEndepunkt(id)}/interesse`;

export const intervjufordelingEndepunkt = (id: string) =>
  `${treffgjennomføringSkrivEndepunkt(id)}/intervjufordeling`;

export const fordelIntervjuerEndepunkt = (id: string) =>
  `${intervjufordelingEndepunkt(id)}/fordel`;

export const vurderingerEndepunkt = (id: string) =>
  `${oppfølgingSkrivEndepunkt(id)}/vurderinger`;

export const oppdaterOppmøte = async (
  rekrutteringstreffId: string,
  personTreffId: string,
  møtt: boolean,
  // Å fjerne et oppmøte sletter interesser, intervjuplasser og vurderinger for
  // jobbsøkeren. Backend krever derfor at kallet er eksplisitt bekreftet.
  bekreftSlettRegistreringer = false,
): Promise<TreffgjennomføringDTO> => {
  const respons = await putApi(oppmøteEndepunkt(rekrutteringstreffId), {
    personTreffId,
    møtt,
    bekreftSlettRegistreringer,
  });
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

/**
 * Ber backend fordele speedintervjuene på nytt.
 */
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
