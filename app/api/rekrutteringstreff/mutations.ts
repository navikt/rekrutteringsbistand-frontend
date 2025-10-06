'use client';

import { RekrutteringstreffUtenHendelserSchema } from './useRekrutteringstreff';
import { deleteApi, postApi, putApi } from '@/app/api/fetcher';
import { logger } from '@navikt/next-logger';
import { z } from 'zod';

const rekrutteringstreffEndepunkt = (id: string) =>
  `/api/rekrutteringstreff/${id}`;

const nyRekrutteringstreffEndepunkt = () => `/api/rekrutteringstreff`;

const statusEndepunkt = (id: string, hendelse: string) =>
  `/api/rekrutteringstreff/${id}/${hendelse}`;

export const MAX_TITLE_LENGTH = 100;

export const OpprettNyttRekrutteringstreffSchema = z.object({
  opprettetAvNavkontorEnhetId: z.string().nullable(),
  tittel: z.string().min(1).max(MAX_TITLE_LENGTH),
});

export type OpprettNyttRekrutteringstreffDTO = z.infer<
  typeof OpprettNyttRekrutteringstreffSchema
>;

export const OppdaterRekrutteringstreffSchema = z.object({
  tittel: z
    .string()
    .trim()
    .min(1, 'Tittel kan ikke være tom.')
    .max(
      MAX_TITLE_LENGTH,
      `Tittelen kan ikke ha mer enn ${MAX_TITLE_LENGTH} tegn.`,
    )
    .optional(),
  beskrivelse: z.string().nullable().optional(),
  fraTid: z.string().nullable().optional(),
  tilTid: z.string().nullable().optional(),
  svarfrist: z.string().nullable().optional(),
  gateadresse: z.string().nullable().optional(),
  postnummer: z.string().nullable().optional(),
  poststed: z.string().nullable().optional(),
});

export type OppdaterRekrutteringstreffDTO = z.infer<
  typeof OppdaterRekrutteringstreffSchema
>;

export const RekrutteringstreffStatusHendelser = {
  PUBLISER: 'PUBLISER',
  GJENÅPN: 'GJENÅPN',
  FULLFØR: 'FULLFØR',
  AVLYS: 'AVLYS',
  AVPUBLISER: 'AVPUBLISER',
} as const;

export type RekrutteringstreffStatusHendelse =
  (typeof RekrutteringstreffStatusHendelser)[keyof typeof RekrutteringstreffStatusHendelser];

export const opprettNyttRekrutteringstreff = async (
  rekrutteringstreff: OpprettNyttRekrutteringstreffDTO,
) => {
  return await postApi(nyRekrutteringstreffEndepunkt(), rekrutteringstreff);
};

export const oppdaterRekrutteringstreff = async (
  id: string,
  data: OppdaterRekrutteringstreffDTO,
) => {
  OppdaterRekrutteringstreffSchema.parse(data);
  const response = await putApi(rekrutteringstreffEndepunkt(id), data);
  return RekrutteringstreffUtenHendelserSchema.parse(response);
};

export const slettRekrutteringstreff = (id: string) => {
  return deleteApi(rekrutteringstreffEndepunkt(id));
};

const tekniskHendelsePathMap: Record<RekrutteringstreffStatusHendelse, string> =
  {
    PUBLISER: 'publiser',
    GJENÅPN: 'gjenapn',
    FULLFØR: 'fullfor',
    AVLYS: 'avlys',
    AVPUBLISER: 'avpubliser',
  };

export const utførRekrutteringstreffStatusHendelse = async (
  id: string,
  hendelse: RekrutteringstreffStatusHendelse,
  feilmelding: string,
): Promise<void> => {
  try {
    await postApi(statusEndepunkt(id, tekniskHendelsePathMap[hendelse]), {});
  } catch (error) {
    logger.error(error, `${feilmelding} for rekrutteringstreff ${id}`);
    throw error;
  }
};

export const publiserRekrutteringstreff = (id: string) =>
  utførRekrutteringstreffStatusHendelse(
    id,
    RekrutteringstreffStatusHendelser.PUBLISER,
    'Feil ved publisering av rekrutteringstreff',
  );

export const gjenåpnRekrutteringstreff = (id: string) =>
  utførRekrutteringstreffStatusHendelse(
    id,
    RekrutteringstreffStatusHendelser.GJENÅPN,
    'Feil ved gjenåpning av rekrutteringstreff',
  );

export const fullførRekrutteringstreff = (id: string) =>
  utførRekrutteringstreffStatusHendelse(
    id,
    RekrutteringstreffStatusHendelser.FULLFØR,
    'Feil ved fullføring av rekrutteringstreff',
  );

export const avlysRekrutteringstreff = (id: string) =>
  utførRekrutteringstreffStatusHendelse(
    id,
    RekrutteringstreffStatusHendelser.AVLYS,
    'Feil ved avlysning av rekrutteringstreff',
  );

export const avpubliserRekrutteringstreff = (id: string) =>
  utførRekrutteringstreffStatusHendelse(
    id,
    RekrutteringstreffStatusHendelser.AVPUBLISER,
    'Feil ved avpublisering av rekrutteringstreff',
  );

export const rekrutteringstreffMutationsMirage = (server: any) => {
  server.post(nyRekrutteringstreffEndepunkt(), () => ({
    id: '1231-1234-1234-1234',
    tittel: 'Treff uten navn',
  }));

  server.put(rekrutteringstreffEndepunkt(':id'), (_: any, request: any) => {
    const { id } = request.params;
    return {
      id,
      tittel: 'Oppdatert treff',
      beskrivelse: 'Oppdatert beskrivelse',
      fraTid: null,
      tilTid: null,
      svarfrist: null,
      gateadresse: null,
      postnummer: null,
      poststed: null,
      status: 'UTKAST',
      opprettetAvPersonNavident: 'A123456',
      opprettetAvNavkontorEnhetId: '1234',
    };
  });

  server.delete(rekrutteringstreffEndepunkt(':id'), () => undefined);

  Object.values(tekniskHendelsePathMap).forEach((hendelsePath) => {
    server.post(
      `/api/rekrutteringstreff/:rekrutteringstreffId/${hendelsePath}`,
      () => ({}),
    );
  });
};
