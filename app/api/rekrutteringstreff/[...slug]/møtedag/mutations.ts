import type { MøtedagDTO } from './useMøtedag';
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
