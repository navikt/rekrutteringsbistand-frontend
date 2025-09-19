import { postApi } from '@/app/api/fetcher';

const administrerRekrutteringstreffEndepunkt = (
  id: string,
  hendelse: RekrutteringstreffAdministrasjonHendelse,
) => `/api/rekrutteringstreff/${id}/${hendelse}`;

export type RekrutteringstreffAdministrasjonHendelse = 'avlys' | 'avpubliser';

const utførAdministrasjon = (
  id: string,
  hendelse: RekrutteringstreffAdministrasjonHendelse,
) => postApi(administrerRekrutteringstreffEndepunkt(id, hendelse), {});

export const avlysRekrutteringstreff = (id: string) =>
  utførAdministrasjon(id, 'avlys');

export const avpubliserRekrutteringstreff = (id: string) =>
  utførAdministrasjon(id, 'avpubliser');

export const administrerRekrutteringstreffMirage = (server: any) => {
  ['avlys', 'avpubliser'].forEach((hendelse) => {
    server.post(
      `/api/rekrutteringstreff/:rekrutteringstreffId/${hendelse}`,
      () => undefined,
    );
  });
};
