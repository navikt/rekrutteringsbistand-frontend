import {
  type LagreSøkDTO,
  MAKS_ANTALL_LAGREDE_SØK,
  LagredeSøkDomene,
  type LagretSøkDTO,
} from '@/app/api/bruker/lagrede-sok/lagredeSøkTyper';
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
 * Mocken skal gi en realistisk lokal visning og validerer ikke input. Frontend stopper ugyldig input før sending,
 * og bruker-api og kontrakttestene (`lagrede-sok.spec.ts` per domene og `*FilterTest.kt` i bruker-api) eier valideringen.
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

const eksempelsøkStilling = (): MockSøk[] => {
  const idag = parseISO(iDagIOslo());
  return [
    {
      id: crypto.randomUUID(),
      navn: 'Stillinger i Oslo',
      erStandard: true,
      filter: 'fylker=03',
      fritekst: [],
      sistAktiv: tilDato(subDays(idag, 3)),
    },
    {
      id: crypto.randomUUID(),
      navn: 'Mine fullførte',
      erStandard: false,
      filter: 'portefolje=visMine&statuser=Fullf%C3%B8rt',
      fritekst: ['lager'],
      sistAktiv: tilDato(subDays(subMonths(idag, 5), 3)),
    },
  ];
};

const eksempelsøkRekrutteringstreff = (): MockSøk[] => {
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

const eksempelsøkKandidatsøk = (): MockSøk[] => {
  const idag = parseISO(iDagIOslo());
  return [
    {
      id: crypto.randomUUID(),
      navn: 'Kokk i Bergen',
      erStandard: true,
      filter: 'sted=Bergen+%28Kommune%29&yrke=Kokk',
      fritekst: [],
      sistAktiv: tilDato(subDays(idag, 3)),
    },
    {
      id: crypto.randomUUID(),
      navn: 'Truck med førerkort',
      erStandard: false,
      filter: 'forerkort=B+-+Personbil&kompetanse=Truckf%C3%B8rerbevis+T1-T4',
      fritekst: ['lager'],
      sistAktiv: tilDato(subDays(subMonths(idag, 5), 3)),
    },
  ];
};

interface MockDomene {
  /** Søkene brukere som starter med MED-EKSEMPELDATA, får første gang de åpner domenet. */
  eksempelsøk: () => MockSøk[];
}

/*
 * Alt mocken trenger å vite om hvert domene. Typen krever en oppføring for hver verdi i `LagredeSøkDomene`,
 * så et nytt domene gir typefeil her til det har eksempelsøk.
 */
const mockDomener: Record<LagredeSøkDomene, MockDomene> = {
  [LagredeSøkDomene.REKRUTTERINGSTREFF]: {
    eksempelsøk: eksempelsøkRekrutteringstreff,
  },
  [LagredeSøkDomene.STILLING]: {
    eksempelsøk: eksempelsøkStilling,
  },
  [LagredeSøkDomene.KANDIDATSOK]: {
    eksempelsøk: eksempelsøkKandidatsøk,
  },
};

const kjentDomene = (
  params: Record<string, unknown>,
): LagredeSøkDomene | null => {
  const domene = String(params.domene);
  return Object.hasOwn(mockDomener, domene)
    ? (domene as LagredeSøkDomene)
    : null;
};

// Som backend lagrer mocken søkene per bruker og domene.
const søkForBruker = (
  cookies: Record<string, string>,
  domene: LagredeSøkDomene,
): MockSøk[] => {
  const bruker = cookies['DEV-BRUKER'] || STANDARDBRUKER;
  const nøkkel = `${bruker}:${domene}`;
  if (!lagredeSøk.has(nøkkel)) {
    const medEksempler = bruker.startsWith('MED-EKSEMPELDATA');
    lagredeSøk.set(
      nøkkel,
      medEksempler ? mockDomener[domene].eksempelsøk() : [],
    );
  }
  const alle = lagredeSøk.get(nøkkel)!;
  // Utløpte søk slettes, som opprydningsjobben i backend
  const aktive = alle.filter(erAktiv);
  lagredeSøk.set(nøkkel, aktive);
  return aktive;
};

const tilDTO = (søk: MockSøk): LagretSøkDTO => ({
  ...søk,
  slettes: slettes(søk.sistAktiv),
  visSlettevarsel: varselFra(søk.sistAktiv) <= iDagIOslo(),
});

const normaliser = (body: Partial<LagreSøkDTO>) => ({
  navn: typeof body.navn === 'string' ? body.navn.trim() : '',
  filter: typeof body.filter === 'string' ? body.filter : '',
  fritekst: (body.fritekst ?? [])
    .map((ord) => ord.trim())
    .filter((ord) => ord.length > 0),
});

const ikkeFunnet = () =>
  HttpResponse.json({ feil: 'Fant ikke det lagrede søket' }, { status: 404 });

// Som backend: ukjent domene gir 404 på alle endepunktene.
const ukjentDomene = () =>
  HttpResponse.json({ feil: 'Ukjent domene' }, { status: 404 });

export const lagredeSøkMSWHandlers = [
  getMock(endepunkt, ({ cookies, params }) => {
    const domene = kjentDomene(params);
    if (!domene) return ukjentDomene();
    return HttpResponse.json(
      [...søkForBruker(cookies, domene)]
        .sort(
          (a, b) =>
            Number(b.erStandard) - Number(a.erStandard) ||
            a.navn.localeCompare(b.navn, 'nb') ||
            a.id.localeCompare(b.id),
        )
        .map(tilDTO),
    );
  }),

  postMock(endepunkt, async ({ cookies, params, request }) => {
    const domene = kjentDomene(params);
    if (!domene) return ukjentDomene();
    const søk = søkForBruker(cookies, domene);
    const input = normaliser((await request.json()) as LagreSøkDTO);
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
    const domene = kjentDomene(params);
    if (!domene) return ukjentDomene();
    søkForBruker(cookies, domene).forEach((s) => {
      s.erStandard = false;
    });
    return new HttpResponse(null, { status: 204 });
  }),

  putMock(`${endepunkt}/:id/standard`, ({ cookies, params }) => {
    const domene = kjentDomene(params);
    if (!domene) return ukjentDomene();
    const søk = søkForBruker(cookies, domene);
    const valgt = søk.find((s) => s.id === params.id);
    if (!valgt) return ikkeFunnet();
    søk.forEach((s) => {
      s.erStandard = false;
    });
    valgt.erStandard = true;
    valgt.sistAktiv = iDagIOslo();
    return new HttpResponse(null, { status: 204 });
  }),

  // Som backend: bare navnet endres, så innhold som er erstattet i en annen fane, står.
  putMock(`${endepunkt}/:id/navn`, async ({ cookies, params, request }) => {
    const domene = kjentDomene(params);
    if (!domene) return ukjentDomene();
    const eksisterende = søkForBruker(cookies, domene).find(
      (s) => s.id === params.id,
    );
    if (!eksisterende) return ikkeFunnet();
    const body = (await request.json()) as Partial<LagreSøkDTO>;
    const { navn } = normaliser(body);
    eksisterende.navn = navn;
    eksisterende.sistAktiv = iDagIOslo();
    return HttpResponse.json(tilDTO(eksisterende));
  }),

  putMock(`${endepunkt}/:id`, async ({ cookies, params, request }) => {
    const domene = kjentDomene(params);
    if (!domene) return ukjentDomene();
    const eksisterende = søkForBruker(cookies, domene).find(
      (s) => s.id === params.id,
    );
    if (!eksisterende) return ikkeFunnet();
    const input = normaliser((await request.json()) as LagreSøkDTO);
    eksisterende.navn = input.navn;
    eksisterende.filter = input.filter;
    eksisterende.fritekst = input.fritekst;
    eksisterende.sistAktiv = iDagIOslo();
    return HttpResponse.json(tilDTO(eksisterende));
  }),

  deleteMock(`${endepunkt}/:id`, ({ cookies, params }) => {
    const domene = kjentDomene(params);
    if (!domene) return ukjentDomene();
    const søk = søkForBruker(cookies, domene);
    const indeks = søk.findIndex((s) => s.id === params.id);
    if (indeks === -1) return ikkeFunnet();
    søk.splice(indeks, 1);
    return new HttpResponse(null, { status: 204 });
  }),

  postMock(`${endepunkt}/:id/bruk`, ({ cookies, params }) => {
    const domene = kjentDomene(params);
    if (!domene) return ukjentDomene();
    const valgt = søkForBruker(cookies, domene).find((s) => s.id === params.id);
    if (!valgt) return ikkeFunnet();
    if (valgt.sistAktiv < iDagIOslo()) valgt.sistAktiv = iDagIOslo();
    return HttpResponse.json(tilDTO(valgt));
  }),
];
