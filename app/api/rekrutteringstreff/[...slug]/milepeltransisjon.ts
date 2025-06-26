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
      `${feilmelding} for rekrutteringstreff ${rekrutteringstreffId}`,
      error,
    );
    throw error;
  }
};

export const publiserRekrutteringstreff = (rekrutteringstreffId: string) =>
  utførHendelse(rekrutteringstreffId, 'publiser', 'Feil ved publisering');

export const avsluttInvitasjon = (rekrutteringstreffId: string) =>
  utførHendelse(
    rekrutteringstreffId,
    'avslutt-invitasjon',
    'Feil ved avslutning av invitasjoner',
  );

export const avsluttArrangement = (rekrutteringstreffId: string) =>
  utførHendelse(
    rekrutteringstreffId,
    'avslutt-arrangement',
    'Feil ved avslutning av arrangement',
  );

export const avsluttOppfolging = (rekrutteringstreffId: string) =>
  utførHendelse(
    rekrutteringstreffId,
    'avslutt-oppfolging',
    'Feil ved avslutning av oppfølging',
  );

export const avsluttRekrutteringstreff = (rekrutteringstreffId: string) =>
  utførHendelse(
    rekrutteringstreffId,
    'avslutt',
    'Feil ved avslutning av rekrutteringstreff',
  );

export const rekrutteringstreffHendelserMirage = (server: any) => {
  server.post(
    '/api/rekrutteringstreff/:rekrutteringstreffId/publiser',
    () => ({}),
  );
  server.post(
    '/api/rekrutteringstreff/:rekrutteringstreffId/avslutt-invitasjon',
    () => ({}),
  );
  server.post(
    '/api/rekrutteringstreff/:rekrutteringstreffId/avslutt-arrangement',
    () => ({}),
  );
  server.post(
    '/api/rekrutteringstreff/:rekrutteringstreffId/avslutt-oppfolging',
    () => ({}),
  );
  server.post(
    '/api/rekrutteringstreff/:rekrutteringstreffId/avslutt',
    () => ({}),
  );
};
