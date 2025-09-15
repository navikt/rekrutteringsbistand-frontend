import { InnleggListeDTO } from '@/app/api/rekrutteringstreff/[...slug]/useInnlegg';

export const innleggMock: InnleggListeDTO = [
  {
    id: '123e4567-e89b-12d3-a456-426614174000',
    treffId: 'aa1b2c3d-4e5f-6789-abcd-ef0123456789',
    tittel: 'Et kult treff',
    opprettetAvPersonNavident: 'AB12345',
    opprettetAvPersonNavn: 'Kari Nordmann',
    opprettetAvPersonBeskrivelse: 'Rekrutteringsansvarlig',
    sendesTilJobbsokerTidspunkt: null,
    htmlContent:
      '<p>Hei og velkommen! Vi gleder oss til å møte dere på rekrutteringstreffet.</p><div>Dette blir gøy!</div><p>Husk å ta med dere CV-er og spørsmål.</p>',
    opprettetTidspunkt: '2025-05-25T08:15:34+02:00',
    sistOppdatertTidspunkt: '2025-05-25T08:15:34+02:00',
  },
];
