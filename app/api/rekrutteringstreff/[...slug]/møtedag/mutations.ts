import type {
  ArbeidsgiverIntervjufordelingDTO,
  MøteoppsettDTO,
  MøtedagDTO,
  RomDTO,
  VurderingDTO,
  ØnskeDTO,
} from './useMøtedag';
import { MøtedagSchema, møtedagEndepunkt } from './useMøtedag';
import { postApi, putApi } from '@/app/api/fetcher';

export const oppmøteEndepunkt = (id: string) =>
  `${møtedagEndepunkt(id)}/oppmote`;

export const møteoppsettEndepunkt = (id: string) =>
  `${møtedagEndepunkt(id)}/moteoppsett`;

export const romfordelingEndepunkt = (id: string) =>
  `${møtedagEndepunkt(id)}/romfordeling`;

export const ønskerEndepunkt = (id: string) => `${møtedagEndepunkt(id)}/onsker`;

export const intervjufordelingEndepunkt = (id: string) =>
  `${møtedagEndepunkt(id)}/intervjufordeling`;

export const fordelIntervjuerEndepunkt = (id: string) =>
  `${intervjufordelingEndepunkt(id)}/fordel`;

export const vurderingerEndepunkt = (id: string) =>
  `${møtedagEndepunkt(id)}/vurderinger`;

export const oppdaterOppmøte = async (
  rekrutteringstreffId: string,
  personTreffId: string,
  møtt: boolean,
  // Å fjerne et oppmøte sletter ønsker, intervjuplasser og vurderinger for
  // jobbsøkeren. Backend krever derfor at kallet er eksplisitt bekreftet.
  bekreftSlettRegistreringer = false,
): Promise<MøtedagDTO> => {
  const respons = await putApi(oppmøteEndepunkt(rekrutteringstreffId), {
    personTreffId,
    møtt,
    bekreftSlettRegistreringer,
  });
  return MøtedagSchema.parse(respons);
};

export const settOppMøteplan = async (
  rekrutteringstreffId: string,
  oppsett: MøteoppsettDTO,
): Promise<MøtedagDTO> => {
  const respons = await putApi(
    møteoppsettEndepunkt(rekrutteringstreffId),
    oppsett,
  );
  return MøtedagSchema.parse(respons);
};

export const oppdaterRomfordeling = async (
  rekrutteringstreffId: string,
  rom: RomDTO[],
): Promise<MøtedagDTO> => {
  const respons = await putApi(
    romfordelingEndepunkt(rekrutteringstreffId),
    { rom },
    { skjulFeilmelding: true },
  );
  return MøtedagSchema.parse(respons);
};

export const oppdaterØnske = async (
  rekrutteringstreffId: string,
  ønske: ØnskeDTO,
  ønsket: boolean,
): Promise<MøtedagDTO> => {
  const respons = await putApi(
    ønskerEndepunkt(rekrutteringstreffId),
    {
      ...ønske,
      ønsket,
    },
    { skjulFeilmelding: true },
  );
  return MøtedagSchema.parse(respons);
};

export const oppdaterIntervjufordeling = async (
  rekrutteringstreffId: string,
  fordeling: ArbeidsgiverIntervjufordelingDTO,
): Promise<MøtedagDTO> => {
  const respons = await putApi(
    intervjufordelingEndepunkt(rekrutteringstreffId),
    fordeling,
    { skjulFeilmelding: true },
  );
  return MøtedagSchema.parse(respons);
};

/**
 * Ber backend fordele speedintervjuene på nytt.
 *
 * Ingen payload: ønsker, arbeidsgivere, jobbsøkerrekkefølge og hvem som er
 * flyttet under sperrelinjen ligger allerede lagret. Backend leser alt inne i
 * én transaksjon og erstatter fordelingen samlet, så vi ikke kan ende med en
 * halvveis oppdatert intervjuplan slik ett kall per arbeidsgiver kunne gi.
 *
 * Svaret er hele møtedagen, som kan legges rett i SWR-cachen.
 */
export const fordelIntervjuer = async (
  rekrutteringstreffId: string,
): Promise<MøtedagDTO> => {
  const respons = await postApi(
    fordelIntervjuerEndepunkt(rekrutteringstreffId),
    {},
    { skjulFeilmelding: true },
  );
  return MøtedagSchema.parse(respons);
};

export const oppdaterVurdering = async (
  rekrutteringstreffId: string,
  vurdering: VurderingDTO,
): Promise<MøtedagDTO> => {
  const respons = await putApi(
    vurderingerEndepunkt(rekrutteringstreffId),
    vurdering,
    { skjulFeilmelding: true },
  );
  return MøtedagSchema.parse(respons);
};
