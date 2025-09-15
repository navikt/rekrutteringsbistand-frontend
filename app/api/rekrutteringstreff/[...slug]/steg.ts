import { postApi } from '@/app/api/fetcher';
import { logger } from '@navikt/next-logger';

const rekrutteringstreffHendelseEndepunkt = (
  rekrutteringstreffId: string,
  hendelse: string,
) => `/api/rekrutteringstreff/${rekrutteringstreffId}/${hendelse}`;

const utførHendelse = async (
  rekrutteringstreffId: string,
  hendelse: string,
  feilmelding: string,
): Promise<void> => {
  try {
    await postApi(
      rekrutteringstreffHendelseEndepunkt(rekrutteringstreffId, hendelse),
      {},
    );
  } catch (error) {
    logger.error(
      error,
      `${feilmelding} for rekrutteringstreff ${rekrutteringstreffId}`,
    );
    throw error;
  }
};

export const publiserRekrutteringstreff = (rekrutteringstreffId: string) =>
  utførHendelse(rekrutteringstreffId, 'publiser', 'Feil ved publisering');

export const gjenåpnRekrutteringstreff = (rekrutteringstreffId: string) =>
  utførHendelse(
    rekrutteringstreffId,
    'gjenåpn',
    'Feil ved gjenåpning av rekrutteringstreff',
  );

export const fullførRekrutteringstreff = (rekrutteringstreffId: string) =>
  utførHendelse(
    rekrutteringstreffId,
    'fullfør',
    'Feil ved fullføring av rekrutteringstreff',
  );

export const rekrutteringstreffHendelserMirage = (server: any) => {
  server.post(
    '/api/rekrutteringstreff/:rekrutteringstreffId/publiser',
    () => ({}),
  );
  server.post(
    '/api/rekrutteringstreff/:rekrutteringstreffId/fullfør',
    () => ({}),
  );
  server.post(
    '/api/rekrutteringstreff/:rekrutteringstreffId/gjenåpn',
    () => ({}),
  );
};
