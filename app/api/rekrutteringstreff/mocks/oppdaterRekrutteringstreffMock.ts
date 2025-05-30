export const oppdaterRekrutteringstreffMock = (id: string) => {
  return {
    id,
    tittel: 'Oppdatert tittel',
    beskrivelse: 'Oppdatert beskrivelse',
    fraTid: '2025-06-15T09:30:00+02:00',
    tilTid: '2025-06-15T11:30:00+02:00',
    svarfrist: '2025-06-01T12:00:00+02:00',
    gateadresse: 'Malmøgata 1',
    postnummer: '0284',
    poststed: 'Oslo',
    status: 'Utkast',
    opprettetAvPersonNavident: 'A123456',
    opprettetAvNavkontorEnhetId: '0318',
    opprettetAvTidspunkt: '2025-06-01T08:00:00+02:00',
  };
};
