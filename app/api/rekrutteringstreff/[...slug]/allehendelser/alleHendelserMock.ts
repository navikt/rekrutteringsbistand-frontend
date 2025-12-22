import { AlleHendelserDTO } from './useAlleHendelser';

export const alleHendelserMock = (): AlleHendelserDTO => [
  {
    id: '1',
    ressurs: 'REKRUTTERINGSTREFF',
    tidspunkt: '2025-04-23T10:00:00Z',
    hendelsestype: 'OPPRETTET',
    opprettetAvAktørType: 'ARRANGØR',
    aktørIdentifikasjon: 'A123456',
  },
  {
    id: '2',
    ressurs: 'ARBEIDSGIVER',
    tidspunkt: '2025-04-23T10:05:00Z',
    hendelsestype: 'OPPRETTET',
    opprettetAvAktørType: 'ARRANGØR',
    aktørIdentifikasjon: 'A123456',
  },
  {
    id: '3',
    ressurs: 'JOBBSØKER',
    tidspunkt: '2025-04-23T10:07:00Z',
    hendelsestype: 'OPPRETTET',
    opprettetAvAktørType: 'ARRANGØR',
    aktørIdentifikasjon: 'A123456',
  },
  {
    id: '4',
    ressurs: 'JOBBSØKER',
    tidspunkt: '2025-04-23T10:10:00Z',
    hendelsestype: 'INVITERT',
    opprettetAvAktørType: 'ARRANGØR',
    aktørIdentifikasjon: 'A123456',
  },
  {
    id: '5',
    ressurs: 'JOBBSØKER',
    tidspunkt: '2025-04-23T10:12:00Z',
    hendelsestype: 'MOTTATT_SVAR_FRA_MINSIDE',
    opprettetAvAktørType: 'ARRANGØR',
    aktørIdentifikasjon: null,
  },
  {
    id: '6',
    ressurs: 'JOBBSØKER',
    tidspunkt: '2025-12-23T09:50:27.584+01:00',
    hendelsestype: 'TREFF_ENDRET_ETTER_PUBLISERING_NOTIFIKASJON',
    opprettetAvAktørType: 'ARRANGØR',
    aktørIdentifikasjon: 'Z994886',
  },
];
