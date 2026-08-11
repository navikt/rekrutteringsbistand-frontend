import type {
  ArbeidsgiverIntervjufordelingDTO,
  MøteoppsettDTO,
  TreffgjennomforingDTO,
  RomDTO,
  VurderingDTO,
  InteresseDTO,
} from './useTreffgjennomforing';
import {
  TreffgjennomforingSchema,
  treffgjennomforingSkrivEndepunkt,
  oppfølgingSkrivEndepunkt,
} from './useTreffgjennomforing';
import { postApi, putApi } from '@/app/api/fetcher';

export const oppmøteEndepunkt = (id: string) =>
  `${treffgjennomforingSkrivEndepunkt(id)}/oppmote`;

export const møteoppsettEndepunkt = (id: string) =>
  `${treffgjennomforingSkrivEndepunkt(id)}/moteoppsett`;

export const romfordelingEndepunkt = (id: string) =>
  `${treffgjennomforingSkrivEndepunkt(id)}/romfordeling`;

export const interesseEndepunkt = (id: string) =>
  `${treffgjennomforingSkrivEndepunkt(id)}/interesse`;

export const intervjufordelingEndepunkt = (id: string) =>
  `${treffgjennomforingSkrivEndepunkt(id)}/intervjufordeling`;

export const fordelIntervjuerEndepunkt = (id: string) =>
  `${intervjufordelingEndepunkt(id)}/fordel`;

export const vurderingerEndepunkt = (id: string) =>
  `${oppfølgingSkrivEndepunkt(id)}/vurderinger`;

export const oppdaterOppmøte = async (
  rekrutteringstreffId: string,
  personTreffId: string,
  møtt: boolean,
  // Å fjerne et oppmøte sletter ønsker, intervjuplasser og vurderinger for
  // jobbsøkeren. Backend krever derfor at kallet er eksplisitt bekreftet.
  bekreftSlettRegistreringer = false,
): Promise<TreffgjennomforingDTO> => {
  const respons = await putApi(oppmøteEndepunkt(rekrutteringstreffId), {
    personTreffId,
    møtt,
    bekreftSlettRegistreringer,
  });
  return TreffgjennomforingSchema.parse(respons);
};

export const settOppMøteplan = async (
  rekrutteringstreffId: string,
  oppsett: MøteoppsettDTO,
): Promise<TreffgjennomforingDTO> => {
  const respons = await putApi(
    møteoppsettEndepunkt(rekrutteringstreffId),
    oppsett,
  );
  return TreffgjennomforingSchema.parse(respons);
};

export const oppdaterRomfordeling = async (
  rekrutteringstreffId: string,
  rom: RomDTO[],
): Promise<TreffgjennomforingDTO> => {
  const respons = await putApi(
    romfordelingEndepunkt(rekrutteringstreffId),
    { rom },
    { skjulFeilmelding: true },
  );
  return TreffgjennomforingSchema.parse(respons);
};

export const oppdaterØnske = async (
  rekrutteringstreffId: string,
  interesse: InteresseDTO,
  interessert: boolean,
): Promise<TreffgjennomforingDTO> => {
  const respons = await putApi(
    interesseEndepunkt(rekrutteringstreffId),
    {
      ...interesse,
      interessert,
    },
    { skjulFeilmelding: true },
  );
  return TreffgjennomforingSchema.parse(respons);
};

export const oppdaterIntervjufordeling = async (
  rekrutteringstreffId: string,
  fordeling: ArbeidsgiverIntervjufordelingDTO,
): Promise<TreffgjennomforingDTO> => {
  const respons = await putApi(
    intervjufordelingEndepunkt(rekrutteringstreffId),
    fordeling,
    { skjulFeilmelding: true },
  );
  return TreffgjennomforingSchema.parse(respons);
};

/**
 * Ber backend fordele speedintervjuene på nytt.
 */
export const fordelIntervjuer = async (
  rekrutteringstreffId: string,
): Promise<TreffgjennomforingDTO> => {
  const respons = await postApi(
    fordelIntervjuerEndepunkt(rekrutteringstreffId),
    {},
    { skjulFeilmelding: true },
  );
  return TreffgjennomforingSchema.parse(respons);
};

export const oppdaterVurdering = async (
  rekrutteringstreffId: string,
  vurdering: VurderingDTO,
): Promise<TreffgjennomforingDTO> => {
  const respons = await putApi(
    vurderingerEndepunkt(rekrutteringstreffId),
    vurdering,
    { skjulFeilmelding: true },
  );
  return TreffgjennomforingSchema.parse(respons);
};
