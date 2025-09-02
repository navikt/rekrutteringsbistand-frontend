/*const avsluttetinvitasjonhendelser = [
  {
    id: '8ccd0b7c-57c0-468b-b265-653d58da5be6',
    tidspunkt: '2025-08-15T11:48:08Z',
    hendelsestype: 'OPPRETT',
    opprettetAvAktørType: 'ARRANGØR',
    aktørIdentifikasjon: 'Z994886',
  },
  {
    id: '913ab846-808e-4098-9972-c3fcdf04a035',
    tidspunkt: '2025-08-15T11:48:29Z',
    hendelsestype: 'OPPDATER',
    opprettetAvAktørType: 'ARRANGØR',
    aktørIdentifikasjon: 'Z994886',
  },
  {
    id: '989541f2-1ac6-425a-8729-69fa3111bf30',
    tidspunkt: '2025-08-15T11:48:35Z',
    hendelsestype: 'OPPDATER',
    opprettetAvAktørType: 'ARRANGØR',
    aktørIdentifikasjon: 'Z994886',
  },
  {
    id: '9dabcaf7-056e-42fe-8e2b-3887b8b75d1d',
    tidspunkt: '2025-08-15T11:49:03Z',
    hendelsestype: 'OPPDATER',
    opprettetAvAktørType: 'ARRANGØR',
    aktørIdentifikasjon: 'Z994886',
  },
  {
    id: '00a8a511-db50-480b-9a83-e67d839b8331',
    tidspunkt: '2025-08-15T11:49:06Z',
    hendelsestype: 'OPPDATER',
    opprettetAvAktørType: 'ARRANGØR',
    aktørIdentifikasjon: 'Z994886',
  },
  {
    id: '08e401be-624a-4131-a32f-a861bb4a5904',
    tidspunkt: '2025-08-15T11:49:18Z',
    hendelsestype: 'PUBLISER',
    opprettetAvAktørType: 'ARRANGØR',
    aktørIdentifikasjon: 'Z994886',
  },
  {
    id: 'fe77ddbe-213d-47e8-8938-648d341b6e7b',
    tidspunkt: '2025-08-15T11:50:17Z',
    hendelsestype: 'OPPDATER',
    opprettetAvAktørType: 'ARRANGØR',
    aktørIdentifikasjon: 'Z994886',
  },
  {
    id: 'd176b193-287a-46b9-9f0f-b9d9a708cc94',
    tidspunkt: '2025-08-15T11:51:00Z',
    hendelsestype: 'OPPDATER',
    opprettetAvAktørType: 'ARRANGØR',
    aktørIdentifikasjon: 'Z994886',
  },
  {
    id: '5acaec32-a6c3-4838-87a7-ff68b7e83223',
    tidspunkt: '2025-08-15T11:52:30Z',
    hendelsestype: 'AVSLUTT_INVITASJON',
    opprettetAvAktørType: 'ARRANGØR',
    aktørIdentifikasjon: 'Z994886',
  },
];*/

const ikkepubliserthendelserMock = [
  {
    id: '8ccd0b7c-57c0-468b-b265-653d58da5be6',
    tidspunkt: '2025-08-15T11:48:08Z',
    hendelsestype: 'OPPRETT',
    opprettetAvAktørType: 'ARRANGØR',
    aktørIdentifikasjon: 'Z994886',
  },
  {
    id: '913ab846-808e-4098-9972-c3fcdf04a035',
    tidspunkt: '2025-08-15T11:48:29Z',
    hendelsestype: 'OPPDATER',
    opprettetAvAktørType: 'ARRANGØR',
    aktørIdentifikasjon: 'Z994886',
  },
];

export const rekrutteringstreffMock = {
  id: 'd6a587cd-8797-4b9a-a68b-575373f16d65',
  tittel: 'Sommerjobbtreff',
  beskrivelse: 'Testbeskrivelse',
  fraTid: '2025-06-01T08:00:00+02:00',
  tilTid: '2025-07-01T10:00:00+02:00',
  svarfrist: '2025-06-01T12:00:00+02:00',
  gateadresse: 'Malmøgata 1',
  postnummer: '0284',
  poststed: 'Oslo',
  status: 'Utkast',
  opprettetAvPersonNavident: 'A123456',
  opprettetAvNavkontorEnhetId: '0318',
  opprettetAvTidspunkt: '2025-06-01T08:00:00+02:00',
  hendelser: ikkepubliserthendelserMock,
};
