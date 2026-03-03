'use client';

import { RekrutteringstreffAPI } from '@/app/api/api-routes';
import { postApi } from '@/app/api/fetcher';
import { logger } from '@navikt/next-logger';

const rekrutteringstreffStatusEndepunkt = (id: string, hendelse: string) =>
  `${RekrutteringstreffAPI.internUrl}/${id}/${hendelse}`;

export const RekrutteringstreffStatusHendelser = {
  PUBLISER: 'PUBLISER',
  GJENÅPN: 'GJENÅPN',
  FULLFØR: 'FULLFØR',
  AVLYS: 'AVLYS',
  AVPUBLISER: 'AVPUBLISER',
} as const;

export type RekrutteringstreffStatusHendelse =
  (typeof RekrutteringstreffStatusHendelser)[keyof typeof RekrutteringstreffStatusHendelser];

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
    await postApi(
      rekrutteringstreffStatusEndepunkt(id, tekniskHendelsePathMap[hendelse]),
      {},
    );
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
