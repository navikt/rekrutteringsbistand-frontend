import { RekrutteringstreffAPI } from '@/app/api/api-routes';

const tekniskHendelsePathMap: Record<string, string> = {
  PUBLISER: 'publiser',
  GJENÅPN: 'gjenapn',
  FULLFØR: 'fullfor',
  AVLYS: 'avlys',
  AVPUBLISER: 'avpubliser',
};

export const statusHendelseMirage = (server: any) => {
  Object.values(tekniskHendelsePathMap).forEach((hendelsePath) => {
    server.post(
      `${RekrutteringstreffAPI.internUrl}/:rekrutteringstreffId/${hendelsePath}`,
      () => ({}),
    );
  });
};
