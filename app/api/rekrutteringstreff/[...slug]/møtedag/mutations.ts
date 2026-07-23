import type {
  ArbeidsgiverIntervjufordelingDTO,
  MøtedagDTO,
  VurderingDTO,
  ØnskeDTO,
} from './useMøtedag';
import { MøtedagSchema, møtedagEndepunkt } from './useMøtedag';
import { putApi } from '@/app/api/fetcher';

export interface MøteoppsettInput {
  antallRom: number;
  starttidspunkt: string;
  varighetPerMøteMinutter: number;
  pauseMellomMøterMinutter: number;
}

export const oppmøteEndepunkt = (id: string) =>
  `${møtedagEndepunkt(id)}/oppmote`;

export const møteoppsettEndepunkt = (id: string) =>
  `${møtedagEndepunkt(id)}/moteoppsett`;

export const ønskerEndepunkt = (id: string) => `${møtedagEndepunkt(id)}/onsker`;

export const intervjufordelingEndepunkt = (id: string) =>
  `${møtedagEndepunkt(id)}/intervjufordeling`;

export const vurderingerEndepunkt = (id: string) =>
  `${møtedagEndepunkt(id)}/vurderinger`;

export const oppdaterOppmøte = async (
  rekrutteringstreffId: string,
  personTreffId: string,
  møtt: boolean,
): Promise<MøtedagDTO> => {
  const respons = await putApi(oppmøteEndepunkt(rekrutteringstreffId), {
    personTreffId,
    møtt,
  });
  return MøtedagSchema.parse(respons);
};

export const settOppMøteplan = async (
  rekrutteringstreffId: string,
  oppsett: MøteoppsettInput,
): Promise<MøtedagDTO> => {
  const respons = await putApi(
    møteoppsettEndepunkt(rekrutteringstreffId),
    oppsett,
  );
  return MøtedagSchema.parse(respons);
};

export const oppdaterØnske = async (
  rekrutteringstreffId: string,
  ønske: ØnskeDTO,
  ønsket: boolean,
): Promise<MøtedagDTO> => {
  const respons = await putApi(ønskerEndepunkt(rekrutteringstreffId), {
    ...ønske,
    ønsket,
  });
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
