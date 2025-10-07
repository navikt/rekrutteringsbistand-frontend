import { AlleHendelserDTO } from './useAlleHendelser';

export const alleHendelserMock = (): AlleHendelserDTO => [
  {
    id: '1',
    ressurs: 'REKRUTTERINGSTREFF',
    tidspunkt: '2025-04-23T10:00:00Z',
    hendelsestype: 'OPPRETT',
    opprettetAvAktørType: 'ARRANGØR',
    aktørIdentifikasjon: 'A123456',
  },
  {
    id: '2',
    ressurs: 'ARBEIDSGIVER',
    tidspunkt: '2025-04-23T10:05:00Z',
    hendelsestype: 'OPPRETT',
    opprettetAvAktørType: 'ARRANGØR',
    aktørIdentifikasjon: 'A123456',
  },
  {
    id: '3',
    ressurs: 'JOBBSØKER',
    tidspunkt: '2025-04-23T10:07:00Z',
    hendelsestype: 'OPPRETT',
    opprettetAvAktørType: 'ARRANGØR',
    aktørIdentifikasjon: 'A123456',
  },
];
