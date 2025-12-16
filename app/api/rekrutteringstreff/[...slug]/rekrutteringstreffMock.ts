import { RekrutteringstreffDTO } from './useRekrutteringstreff';
import {
  RekrutteringstreffStatus,
} from '@/app/rekrutteringstreff/_types/constants';

export const rekrutteringstreffMock = (id: string): RekrutteringstreffDTO => {
  if (id === '1231-1234-1234-1234') {
    return {
      rekrutteringstreff: {
        id: 'd6a587cd-8797-4b9a-a68b-575373f16d65',
        tittel: 'Treff med navn',
        beskrivelse: null,
        fraTid: null,
        tilTid: null,
        svarfrist: null,
        gateadresse: null,
        postnummer: null,
        poststed: null,
        kommune: null,
        kommunenummer: null,
        fylke: null,
        fylkesnummer: null,
        status: RekrutteringstreffStatus.UTKAST,
        opprettetAvPersonNavident: 'A123456',
        opprettetAvNavkontorEnhetId: '0318',
        opprettetAvTidspunkt: '2025-10-09T09:35:42+02:00',
        antallArbeidsgivere: 0,
        antallJobbsøkere: 0,
        eiere: ['A123456', 'B654321'],
        sistEndret: '2025-10-11T09:35:42+02:00',
        sistEndretAv: 'A123456',
      },
    };
  }

  return {
    rekrutteringstreff: {
      id: 'd6a587cd-8797-4b9a-a68b-575373f16d65',
      tittel: 'Treff med navn',
      beskrivelse: null,
      fraTid: '2025-11-01T08:00:00+02:00',
      tilTid: '2025-11-01T10:00:00+02:00',
      svarfrist: '2025-11-01T07:00:00+02:00',
      gateadresse: 'Malmøgata 1',
      postnummer: '5555',
      poststed: 'Kristiansand S',
      kommune: 'Kristiansand',
      kommunenummer: '4204',
      fylke: 'Agder',
      fylkesnummer: '42',
      status: RekrutteringstreffStatus.PUBLISERT,
      opprettetAvPersonNavident: 'A123456',
      opprettetAvNavkontorEnhetId: '0318',
      opprettetAvTidspunkt: '2025-10-08T09:35:42+02:00',
      antallArbeidsgivere: 3,
      antallJobbsøkere: 4,
      eiere: ['A123456', 'B654321', 'C654321'],
      sistEndret: '2025-10-11T10:37:28+02:00',
      sistEndretAv: 'A123456',
    },
  };
};
