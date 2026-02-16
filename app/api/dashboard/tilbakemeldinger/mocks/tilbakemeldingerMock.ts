import { TilbakemeldingDTO, TilbakemeldingKategori } from '../typer';

export const tilbakemeldingerMock: TilbakemeldingDTO[] = [
  {
    id: '1',
    navn: 'A123456',
    tilbakemelding: 'Veldig nyttig verktøy for å finne kandidater raskt.',
    dato: '2026-02-10T09:15:00Z',
    avvist: false,
    trelloLenke:
      'https://trello.com/c/abc123/rekrutteringstreff-tilbakemelding',
    kategori: TilbakemeldingKategori.Rekrutteringstreff,
    url: '/rekrutteringstreff/123',
  },
  {
    id: '2',
    navn: 'B654321',
    tilbakemelding:
      'Kunne vært enklere å filtrere på arbeidssted i stillingssøket.',
    dato: '2026-02-12T14:30:00Z',
    avvist: false,
    trelloLenke: null,
    kategori: TilbakemeldingKategori.Stillingsoppdrag,
    url: '/stilling/456',
  },
  {
    id: '3',
    navn: 'C112233',
    tilbakemelding:
      'Etterregistrering fungerte fint, men jeg fikk en feilmelding ved lagring som forsvant av seg selv.',
    dato: '2026-02-13T08:00:00Z',
    avvist: true,
    trelloLenke: null,
    kategori: TilbakemeldingKategori.Etterregistreringer,
    url: '/etterregistrering/789',
  },
  {
    id: '4',
    navn: 'D445566',
    tilbakemelding:
      'Jobbsøkerprofilen mangler mulighet for å legge til sertifiseringer.',
    dato: '2026-02-14T11:45:00Z',
    avvist: false,
    trelloLenke: 'https://trello.com/c/def456/jobbsoker-sertifiseringer',
    kategori: TilbakemeldingKategori.Jobbsøker,
    url: '/kandidat/012',
  },
  {
    id: '5',
    navn: 'E778899',
    tilbakemelding: 'Sidepanelet lukker seg når man bytter fane, irriterende.',
    dato: '2026-02-15T16:20:00Z',
    avvist: false,
    trelloLenke: null,
    kategori: TilbakemeldingKategori.Rekrutteringstreff,
    url: '/rekrutteringstreff/345',
  },
  {
    id: '6',
    navn: 'F334455',
    tilbakemelding:
      'Ønsker mulighet til å eksportere kandidatlister til Excel.',
    dato: '2026-02-16T07:00:00Z',
    avvist: false,
    trelloLenke: null,
    kategori: TilbakemeldingKategori.Stillingsoppdrag,
    url: '/stilling/678',
  },
];
