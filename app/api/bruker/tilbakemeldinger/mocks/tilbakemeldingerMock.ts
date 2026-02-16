import {
  TilbakemeldingDTO,
  TilbakemeldingKategori,
  TilbakemeldingStatus,
} from '../typer';

export const tilbakemeldingerMock: TilbakemeldingDTO[] = [
  {
    id: '1',
    navn: 'A123456',
    tilbakemelding: 'Veldig nyttig verktøy for å finne kandidater raskt.',
    dato: '2026-02-10T09:15:00Z',
    status: TilbakemeldingStatus.Fullført,
    trelloLenke:
      'https://trello.com/c/abc123/rekrutteringstreff-tilbakemelding',
    kategori: TilbakemeldingKategori.Rekrutteringstreff,
    url: '/rekrutteringstreff/123',
  },
  {
    id: '2',
    navn: null,
    tilbakemelding:
      'Kunne vært enklere å filtrere på arbeidssted i stillingssøket.',
    dato: '2026-02-12T14:30:00Z',
    status: TilbakemeldingStatus.Ny,
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
    status: TilbakemeldingStatus.Avvist,
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
    status: TilbakemeldingStatus.Vurdering,
    trelloLenke: 'https://trello.com/c/def456/jobbsoker-sertifiseringer',
    kategori: TilbakemeldingKategori.Jobbsøker,
    url: '/kandidat/012',
  },
  {
    id: '5',
    navn: 'E778899',
    tilbakemelding: 'Sidepanelet lukker seg når man bytter fane, irriterende.',
    dato: '2026-02-15T16:20:00Z',
    status: TilbakemeldingStatus.Ny,
    trelloLenke: null,
    kategori: TilbakemeldingKategori.Rekrutteringstreff,
    url: '/rekrutteringstreff/345',
  },
  {
    id: '6',
    navn: null,
    tilbakemelding:
      'Ønsker mulighet til å eksportere kandidatlister til Excel.',
    dato: '2026-02-16T07:00:00Z',
    status: TilbakemeldingStatus.Ny,
    trelloLenke: null,
    kategori: TilbakemeldingKategori.Stillingsoppdrag,
    url: '/stilling/678',
  },
];
