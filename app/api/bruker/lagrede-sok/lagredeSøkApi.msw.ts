import {
  type LagreSøkDTO,
  MAKS_ANTALL_LAGREDE_SØK,
  MAKS_NAVNELENGDE_LAGRET_SØK,
  LagredeSøkDomene,
  type LagretSøkDTO,
} from '@/app/api/bruker/lagrede-sok/lagredeSøkTyper';
import { inneholderFødselsnummer } from '@/components/lagrede-søk/fødselsnummer';
import { deleteMock, getMock, postMock, putMock } from '@/mocks/mockUtils';
import { addMonths, format, parseISO, subDays, subMonths } from 'date-fns';
import { HttpResponse } from 'msw';

/*
 * Dynamisk mock av lagrede søk i bruker-api. Søkene lagres i minnet per DEV-BRUKER-cookie,
 * slik backend lagrer per Nav-ident. Da kan Playwright-tester bruke egne brukere uten å påvirke hverandre.
 * Brukere som starter med MED-EKSEMPELDATA får eksempelsøk, også ett som snart slettes, og har valgt ett av dem
 * som standard. Standardbrukeren får ingen, fordi standardsøket brukes når siden åpnes og ville endret filtrene
 * i andre tester.
 * Mocken følger regelen i backend: uten et merket søk er vanlig søk standard, og ingen handling merker et søk
 * uten at veilederen har valgt det.
 */

type MockSøk = Omit<LagretSøkDTO, 'slettes' | 'visSlettevarsel'>;

const STANDARDBRUKER = 'TestIdent';
const endepunkt = '/api/bruker/lagrede-sok/:domene';

const lagredeSøk = new Map<string, MockSøk[]>();

const osloDato = new Intl.DateTimeFormat('sv-SE', { timeZone: 'Europe/Oslo' });

/** Dagens dato i Oslo som `yyyy-MM-dd`, samme format som backend bruker. */
const iDagIOslo = () => osloDato.format(new Date());

const tilDato = (dato: Date) => format(dato, 'yyyy-MM-dd');
const slettes = (sistAktiv: string) =>
  tilDato(addMonths(parseISO(sistAktiv), 6));
const varselFra = (sistAktiv: string) =>
  tilDato(addMonths(parseISO(sistAktiv), 5));
const erAktiv = (søk: MockSøk) => slettes(søk.sistAktiv) > iDagIOslo();

const eksempelsøk = (): MockSøk[] => {
  const idag = parseISO(iDagIOslo());
  return [
    {
      id: crypto.randomUUID(),
      navn: 'Publiserte i Oslo',
      erStandard: true,
      filter: 'fylker=03',
      fritekst: [],
      sistAktiv: tilDato(subDays(idag, 3)),
    },
    {
      id: crypto.randomUUID(),
      navn: 'Avlyste jobbmesser',
      erStandard: false,
      filter: 'statuser=AVLYST',
      fritekst: ['jobbmesse'],
      sistAktiv: tilDato(subDays(idag, 30)),
    },
    {
      id: crypto.randomUUID(),
      navn: 'Fullførte i fjor',
      erStandard: false,
      filter: 'sortering=eldste&statuser=FULLF%C3%98RT',
      fritekst: [],
      sistAktiv: tilDato(subDays(subMonths(idag, 5), 3)),
    },
  ];
};

// Som backend lagrer mocken søkene per bruker og domene. Eksempelsøkene har filtre for rekrutteringstreff.
const søkForBruker = (
  cookies: Record<string, string>,
  domene: string,
): MockSøk[] => {
  const bruker = cookies['DEV-BRUKER'] || STANDARDBRUKER;
  const nøkkel = `${bruker}:${domene}`;
  if (!lagredeSøk.has(nøkkel)) {
    const medEksempler =
      bruker.startsWith('MED-EKSEMPELDATA') &&
      domene === LagredeSøkDomene.REKRUTTERINGSTREFF;
    lagredeSøk.set(nøkkel, medEksempler ? eksempelsøk() : []);
  }
  const alle = lagredeSøk.get(nøkkel)!;
  // Utløpte søk slettes, som opprydningsjobben i backend
  const aktive = alle.filter(erAktiv);
  lagredeSøk.set(nøkkel, aktive);
  return aktive;
};

const domeneFra = (params: Record<string, unknown>) => String(params.domene);

const kjenteDomener: readonly string[] = Object.values(LagredeSøkDomene);

const MAKS_FILTERLENGDE = 2000;
const MAKS_ANTALL_SØKEORD = 10;
const MAKS_SØKEORDLENGDE_TOTALT = 200;
const MAKS_VERDIER_PER_PARAMETER = 50;

type Regel = (verdi: string) => boolean;
const enAv =
  (...verdier: string[]): Regel =>
  (verdi) =>
    verdier.includes(verdi);
/** Kommaseparert liste der alle verdiene må være gyldige. Tom liste er lov, for eksempel `statuser=`. */
const liste =
  (element: Regel): Regel =>
  (verdi) => {
    if (verdi === '') return true;
    const verdier = verdi.split(',');
    return (
      verdier.length <= MAKS_VERDIER_PER_PARAMETER && verdier.every(element)
    );
  };
const sifre =
  (antall: number): Regel =>
  (verdi) =>
    new RegExp(`^\\d{${antall}}$`).test(verdi);

/*
 * Samme filterregler som bruker-api (`RekrutteringstreffFilterparameter` og `Filterregler`). Reglene er skrevet
 * for seg og ikke hentet fra frontendens parsere, så Playwright fanger filtre som backend ville avvist.
 */
const filterregler: Record<string, Record<string, Regel>> = {
  [LagredeSøkDomene.REKRUTTERINGSTREFF]: {
    visning: enAv('alle', 'mine', 'mitt_kontor', 'valgte_kontorer'),
    sortering: enAv('sist_oppdaterte', 'nyeste', 'eldste'),
    statuser: liste(
      enAv('UTKAST', 'PUBLISERT', 'FULLFØRT', 'AVLYST', 'SLETTET'),
    ),
    publisertStatuser: liste(enAv('ÅPEN_FOR_SØKERE', 'SVARFRIST_PASSERT')),
    fylker: liste(sifre(2)),
    kommuner: liste(sifre(4)),
    kontorer: liste(sifre(4)),
  },
};

const dekod = (tekst: string) => {
  try {
    return decodeURIComponent(tekst.replace(/\+/g, ' '));
  } catch {
    return null;
  }
};

const erGyldigFilter = (domene: string, filter: string) => {
  if (filter === '') return true;
  const regler = filterregler[domene];
  if (!regler || filter.length > MAKS_FILTERLENGDE) return false;
  const brukteNavn = new Set<string>();
  return filter.split('&').every((del) => {
    const skille = del.indexOf('=');
    if (skille === -1) return false;
    const navn = dekod(del.slice(0, skille));
    const verdi = dekod(del.slice(skille + 1));
    if (navn === null || verdi === null || brukteNavn.has(navn)) return false;
    brukteNavn.add(navn);
    return regler[navn]?.(verdi) === true;
  });
};

const tilDTO = (søk: MockSøk): LagretSøkDTO => ({
  ...søk,
  slettes: slettes(søk.sistAktiv),
  visSlettevarsel: varselFra(søk.sistAktiv) <= iDagIOslo(),
});

const valider = (body: Partial<LagreSøkDTO>, domene: string) => {
  const navn = (body.navn ?? '').trim();
  if (navn.length === 0 || navn.length > MAKS_NAVNELENGDE_LAGRET_SØK) {
    return null;
  }
  const filter = body.filter ?? '';
  if (!erGyldigFilter(domene, filter)) return null;
  const søkeord = (body.fritekst ?? [])
    .map((ord) => ord.trim())
    .filter((ord) => ord.length > 0);
  if (
    søkeord.length > MAKS_ANTALL_SØKEORD ||
    søkeord.join('').length > MAKS_SØKEORDLENGDE_TOTALT
  ) {
    return null;
  }
  // Som backend: avvis i stedet for å fjerne fødselsnummer.
  if (inneholderFødselsnummer(navn) || søkeord.some(inneholderFødselsnummer)) {
    return null;
  }
  return { navn, filter, fritekst: søkeord };
};

const ikkeFunnet = () =>
  HttpResponse.json({ feil: 'Fant ikke det lagrede søket' }, { status: 404 });

const ugyldig = () =>
  HttpResponse.json({ feil: 'Ugyldig forespørsel' }, { status: 400 });

// Som backend: ukjent domene gir 404 på alle endepunktene.
const ukjentDomene = (params: Record<string, unknown>) =>
  kjenteDomener.includes(domeneFra(params))
    ? null
    : HttpResponse.json({ feil: 'Ukjent domene' }, { status: 404 });

export const lagredeSøkMSWHandlers = [
  getMock(
    endepunkt,
    ({ cookies, params }) =>
      ukjentDomene(params) ??
      HttpResponse.json(
        [...søkForBruker(cookies, domeneFra(params))]
          .sort(
            (a, b) =>
              Number(b.erStandard) - Number(a.erStandard) ||
              a.navn.localeCompare(b.navn, 'nb') ||
              a.id.localeCompare(b.id),
          )
          .map(tilDTO),
      ),
  ),

  postMock(endepunkt, async ({ cookies, params, request }) => {
    const feil = ukjentDomene(params);
    if (feil) return feil;
    const søk = søkForBruker(cookies, domeneFra(params));
    const input = valider(
      (await request.json()) as LagreSøkDTO,
      domeneFra(params),
    );
    if (!input) return ugyldig();
    if (søk.length >= MAKS_ANTALL_LAGREDE_SØK) {
      return HttpResponse.json(
        { feil: `Du har allerede ${MAKS_ANTALL_LAGREDE_SØK} lagrede søk` },
        { status: 409 },
      );
    }
    const nytt: MockSøk = {
      id: crypto.randomUUID(),
      navn: input.navn,
      erStandard: false,
      filter: input.filter,
      fritekst: input.fritekst,
      sistAktiv: iDagIOslo(),
    };
    søk.push(nytt);
    return HttpResponse.json(tilDTO(nytt), { status: 201 });
  }),

  // Må stå før :id/standard, som ellers fanger segmentet «vanlig». Vanlig søk er standard når ingen søk er merket.
  putMock(`${endepunkt}/vanlig/standard`, ({ cookies, params }) => {
    const feil = ukjentDomene(params);
    if (feil) return feil;
    søkForBruker(cookies, domeneFra(params)).forEach((s) => {
      s.erStandard = false;
    });
    return new HttpResponse(null, { status: 204 });
  }),

  putMock(`${endepunkt}/:id/standard`, ({ cookies, params }) => {
    const feil = ukjentDomene(params);
    if (feil) return feil;
    const søk = søkForBruker(cookies, domeneFra(params));
    const valgt = søk.find((s) => s.id === params.id);
    if (!valgt) return ikkeFunnet();
    søk.forEach((s) => {
      s.erStandard = false;
    });
    valgt.erStandard = true;
    valgt.sistAktiv = iDagIOslo();
    return new HttpResponse(null, { status: 204 });
  }),

  putMock(`${endepunkt}/:id`, async ({ cookies, params, request }) => {
    const feil = ukjentDomene(params);
    if (feil) return feil;
    const eksisterende = søkForBruker(cookies, domeneFra(params)).find(
      (s) => s.id === params.id,
    );
    if (!eksisterende) return ikkeFunnet();
    const input = valider(
      (await request.json()) as LagreSøkDTO,
      domeneFra(params),
    );
    if (!input) return ugyldig();
    eksisterende.navn = input.navn;
    eksisterende.filter = input.filter;
    eksisterende.fritekst = input.fritekst;
    eksisterende.sistAktiv = iDagIOslo();
    return HttpResponse.json(tilDTO(eksisterende));
  }),

  deleteMock(`${endepunkt}/:id`, ({ cookies, params }) => {
    const feil = ukjentDomene(params);
    if (feil) return feil;
    const søk = søkForBruker(cookies, domeneFra(params));
    const indeks = søk.findIndex((s) => s.id === params.id);
    if (indeks === -1) return ikkeFunnet();
    søk.splice(indeks, 1);
    return new HttpResponse(null, { status: 204 });
  }),

  postMock(`${endepunkt}/:id/bruk`, ({ cookies, params }) => {
    const feil = ukjentDomene(params);
    if (feil) return feil;
    const valgt = søkForBruker(cookies, domeneFra(params)).find(
      (s) => s.id === params.id,
    );
    if (!valgt) return ikkeFunnet();
    if (valgt.sistAktiv < iDagIOslo()) valgt.sistAktiv = iDagIOslo();
    return HttpResponse.json(tilDTO(valgt));
  }),
];
