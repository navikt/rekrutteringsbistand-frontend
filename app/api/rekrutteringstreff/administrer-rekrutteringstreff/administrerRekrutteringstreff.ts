import { deleteApi } from '@/app/api/fetcher';

const administrerRekrutteringstreffEndepunkt = (
  id: string,
  hendelse: RekrutteringstreffAdministrasjonHendelse,
) => `/api/rekrutteringstreff/${id}/${hendelse}`;

export type RekrutteringstreffAdministrasjonHendelse =
  | 'slett'
  | 'avlys'
  | 'avpubliser';

const utførAdministrasjon = (
  id: string,
  hendelse: RekrutteringstreffAdministrasjonHendelse,
) => deleteApi(administrerRekrutteringstreffEndepunkt(id, hendelse));

export const slettRekrutteringstreff = (id: string) =>
  utførAdministrasjon(id, 'slett');

export const avlysRekrutteringstreff = (id: string) =>
  utførAdministrasjon(id, 'avlys');

export const avpubliserRekrutteringstreff = (id: string) =>
  utførAdministrasjon(id, 'avpubliser');

export const administrerRekrutteringstreffMirage = (server: any) => {
  ['slett', 'avlys', 'avpubliser'].forEach((hendelse) => {
    server.delete(
      `/api/rekrutteringstreff/:rekrutteringstreffId/${hendelse}`,
      () => undefined,
    );
  });
};
