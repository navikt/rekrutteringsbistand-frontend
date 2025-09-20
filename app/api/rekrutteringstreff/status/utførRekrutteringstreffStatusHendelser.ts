import { postApi } from '@/app/api/fetcher';
import { logger } from '@navikt/next-logger';

export const RekrutteringstreffStatusHendelser = {
  PUBLISER: 'PUBLISER',
  GJENÅPN: 'GJENÅPN',
  FULLFØR: 'FULLFØR',
  AVLYS: 'AVLYS',
  AVPUBLISER: 'AVPUBLISER',
} as const;

export type RekrutteringstreffStatusHendelse =
  (typeof RekrutteringstreffStatusHendelser)[keyof typeof RekrutteringstreffStatusHendelser];

export type RekrutteringstreffAdministrasjonHendelse = 'avlys' | 'avpubliser';

const tekniskHendelsePathMap: Record<RekrutteringstreffStatusHendelse, string> =
  {
    PUBLISER: 'publiser',
    GJENÅPN: 'gjenapn',
    FULLFØR: 'fullfor',
    AVLYS: 'avlys',
    AVPUBLISER: 'avpubliser',
  };

const endepunkt = (id: string, hendelse: string) =>
  `/api/rekrutteringstreff/${id}/${hendelse}`;

export const utførRekrutteringstreffStatusHendelse = async (
  id: string,
  hendelse: RekrutteringstreffStatusHendelse,
  feilmelding: string,
): Promise<void> => {
  try {
    await postApi(endepunkt(id, tekniskHendelsePathMap[hendelse]), {});
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

// Mirage-registrering for alle status-hendelser
export const utførRekrutteringstreffStatusHendelseMirage = (server: any) => {
  Object.values(tekniskHendelsePathMap).forEach((hendelsePath) => {
    server.post(
      `/api/rekrutteringstreff/:rekrutteringstreffId/${hendelsePath}`,
      () => ({}),
    );
  });
};
