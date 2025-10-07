'use client';

import { postApi } from '@/app/api/fetcher';
import { logger } from '@navikt/next-logger';
import { z } from 'zod';

const opprettRekrutteringstreffEndepunkt = () => `/api/rekrutteringstreff`;

const statusEndepunkt = (id: string, hendelse: string) =>
  `/api/rekrutteringstreff/${id}/${hendelse}`;

export const MAX_TITLE_LENGTH = 100;

export const OpprettRekrutteringstreffSchema = z.object({
  opprettetAvNavkontorEnhetId: z.string().nullable(),
  tittel: z.string().min(1).max(MAX_TITLE_LENGTH),
});

export type OpprettRekrutteringstreffDTO = z.infer<
  typeof OpprettRekrutteringstreffSchema
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

export const opprettRekrutteringstreff = async (
  rekrutteringstreff: OpprettRekrutteringstreffDTO,
) => {
  return await postApi(
    opprettRekrutteringstreffEndepunkt(),
    rekrutteringstreff,
  );
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
  server.post(opprettRekrutteringstreffEndepunkt(), () => ({
    id: '1231-1234-1234-1234',
    tittel: 'Treff uten navn',
  }));

  Object.values(tekniskHendelsePathMap).forEach((hendelsePath) => {
    server.post(
      `/api/rekrutteringstreff/:rekrutteringstreffId/${hendelsePath}`,
      () => ({}),
    );
  });
};
