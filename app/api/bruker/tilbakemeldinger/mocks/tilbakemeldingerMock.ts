import {
  TilbakemeldingDTO,
  TilbakemeldingKategori,
  TilbakemeldingStatus,
} from '../typer';

const kategorier = Object.values(TilbakemeldingKategori);
const statuser = Object.values(TilbakemeldingStatus);

const tilbakemeldingTekster = [
  'Veldig nyttig verktøy for å finne kandidater raskt.',
  'Kunne vært enklere å filtrere på arbeidssted i stillingssøket.',
  'Etterregistrering fungerte fint, men jeg fikk en feilmelding ved lagring.',
  'Jobbsøkerprofilen mangler mulighet for å legge til sertifiseringer.',
  'Sidepanelet lukker seg når man bytter fane, irriterende.',
  'Ønsker mulighet til å eksportere kandidatlister til Excel.',
  'Søkefunksjonen gir irrelevante treff når man bruker forkortelser.',
  'Bra med mulighet for å dele stillinger med kollegaer.',
  'Vanskelig å finne tilbake til tidligere søk etter kandidater.',
  'Fint om man kan lagre filterinnstillinger som favoritter.',
  'Notifikasjoner fungerer bra, men kunne kommet raskere.',
  'Savner mørk modus for lange arbeidsdager.',
  'Kandidatlisten bør vise siste aktivitet tydeligere.',
  'Trenger bedre sortering av stillingsannonser etter relevans.',
  'Burde kunne markere kandidater som ikke er aktuelle lenger.',
  'Etterregistreringen mangler validering på telefonnummer.',
  'Flott at man kan se historikk på kandidater nå.',
  'Recruitering av IT-kandidater er mye enklere med det nye søket.',
  'Ønsker mulighet for å sende meldinger direkte til kandidater.',
  'Statistikksiden gir god oversikt, men mangler eksportmulighet.',
];

const urler = [
  '/rekrutteringstreff/123',
  '/stilling/456',
  '/etterregistrering/789',
  '/kandidat/012',
  '/rekrutteringstreff/345',
  '/stilling/678',
  '/rekrutteringstreff/901',
  '/stilling/234',
  '/etterregistrering/567',
  '/kandidat/890',
];

const genererMock = (): TilbakemeldingDTO[] =>
  Array.from({ length: 62 }, (_, i) => ({
    id: String(i + 1),
    navn: i % 3 === 0 ? null : `Z${String(100000 + i)}`,
    tilbakemelding: tilbakemeldingTekster[i % tilbakemeldingTekster.length],
    dato: new Date(2026, 1, 16 - (i % 30), 8 + (i % 12), i % 60).toISOString(),
    status: statuser[i % statuser.length],
    trelloLenke:
      i % 4 === 0 ? `https://trello.com/c/mock${i}/tilbakemelding-${i}` : null,
    kategori: kategorier[i % kategorier.length],
    url: urler[i % urler.length],
  }));

export const tilbakemeldingerMock: TilbakemeldingDTO[] = genererMock();
