import { RekrutteringstreffDTO } from './useRekrutteringstreff';
import {
  RekrutteringstreffHendelsestype,
  JobbsøkerHendelsestype,
} from '@/app/rekrutteringstreff/_types/constants';

const _fullførthendelser = [
  {
    id: '8ccd0b7c-57c0-468b-b265-653d58da5be6',
    tidspunkt: '2025-08-15T11:48:08Z',
    hendelsestype: RekrutteringstreffHendelsestype.OPPRETTET,
    opprettetAvAktørType: 'ARRANGØR',
    aktørIdentifikasjon: 'Z994886',
  },
  {
    id: '913ab846-808e-4098-9972-c3fcdf04a035',
    tidspunkt: '2025-08-15T11:48:29Z',
    hendelsestype: RekrutteringstreffHendelsestype.OPPDATERT,
    opprettetAvAktørType: 'ARRANGØR',
    aktørIdentifikasjon: 'Z994886',
  },
  {
    id: '08e401be-624a-4131-a32f-a861bb4a5904',
    tidspunkt: '2025-08-15T11:49:18Z',
    hendelsestype: RekrutteringstreffHendelsestype.PUBLISERT,
    opprettetAvAktørType: 'ARRANGØR',
    aktørIdentifikasjon: 'Z994886',
  },
  {
    id: '08e401be-624a-4131-a32f-a861bb4a5904',
    tidspunkt: '2025-08-15T11:49:18Z',
    hendelsestype: JobbsøkerHendelsestype.INVITERT,
    opprettetAvAktørType: 'ARRANGØR',
    aktørIdentifikasjon: 'Z994886',
  },
  {
    id: '5acaec32-a6c3-4838-87a7-ff68b7e83223',
    tidspunkt: '2025-08-15T11:52:30Z',
    hendelsestype: RekrutteringstreffHendelsestype.FULLFØRT,
    opprettetAvAktørType: 'ARRANGØR',
    aktørIdentifikasjon: 'Z994886',
  },
];

const _publisertHendelser = [
  {
    id: '5e322a9e-34eb-41ef-8adc-97e56a5f8a51',
    tidspunkt: '2025-09-10T17:10:19Z',
    hendelsestype: RekrutteringstreffHendelsestype.OPPRETTET,
    opprettetAvAktørType: 'ARRANGØR',
    aktørIdentifikasjon: 'Z994744',
  },
  {
    id: '48435074-2200-429c-830d-8e03a920c11c',
    tidspunkt: '2025-09-15T06:35:26Z',
    hendelsestype: RekrutteringstreffHendelsestype.PUBLISERT,
    opprettetAvAktørType: 'ARRANGØR',
    aktørIdentifikasjon: 'Z994886',
  },
];

const _avlysHendelser = [
  {
    id: '5e322a9e-34eb-41ef-8adc-97e56a5f8a51',
    tidspunkt: '2025-09-10T17:10:19Z',
    hendelsestype: RekrutteringstreffHendelsestype.OPPRETTET,
    opprettetAvAktørType: 'ARRANGØR',
    aktørIdentifikasjon: 'Z994744',
  },
  {
    id: '48435074-2200-429c-830d-8e03a920c11c',
    tidspunkt: '2025-09-15T06:35:26Z',
    hendelsestype: RekrutteringstreffHendelsestype.PUBLISERT,
    opprettetAvAktørType: 'ARRANGØR',
    aktørIdentifikasjon: 'Z994886',
  },
  {
    id: '48435074-2200-429c-830d-8e03a920c11c',
    tidspunkt: '2025-09-16T06:35:26Z',
    hendelsestype: RekrutteringstreffHendelsestype.AVLYST,
    opprettetAvAktørType: 'ARRANGØR',
    aktørIdentifikasjon: 'Z994886',
  },
];

const _kladdHendelser = [
  {
    id: '8ccd0b7c-57c0-468b-b265-653d58da5be6',
    tidspunkt: '2025-08-15T11:48:08Z',
    hendelsestype: RekrutteringstreffHendelsestype.OPPRETTET,
    opprettetAvAktørType: 'ARRANGØR',
    aktørIdentifikasjon: 'Z994886',
  },
  {
    id: '913ab846-808e-4098-9972-c3fcdf04a035',
    tidspunkt: '2025-08-15T11:48:29Z',
    hendelsestype: RekrutteringstreffHendelsestype.OPPDATERT,
    opprettetAvAktørType: 'ARRANGØR',
    aktørIdentifikasjon: 'Z994886',
  },
];

export const rekrutteringstreffMock: RekrutteringstreffDTO = {
  id: 'd6a587cd-8797-4b9a-a68b-575373f16d65',
  tittel: 'Treff med navn',
  beskrivelse: null,
  fraTid: '2025-11-01T08:00:00+02:00',
  tilTid: '2025-11-01T10:00:00+02:00',
  svarfrist: '2025-11-01T07:00:00+02:00',
  gateadresse: 'Malmøgata 1',
  postnummer: '5555',
  poststed: 'Kristiansand S',
  status: 'todo tabort',
  opprettetAvPersonNavident: 'A123456',
  opprettetAvNavkontorEnhetId: '0318',
  hendelser: _publisertHendelser,
};
