import {
  type LagreStandardsøkDTO,
  MAKS_ANTALL_STANDARDSØK,
  MAKS_NAVNELENGDE_STANDARDSØK,
  type StandardsøkDTO,
} from '@/app/api/bruker/standardsok/standardsøkTyper';
import { iDagIOslo } from '@/components/standardsøk/standardsøkDato';
import { deleteMock, getMock, postMock, putMock } from '@/mocks/mockUtils';
import { idnr } from '@navikt/fnrvalidator';
import { addMonths, format, parseISO, subDays, subMonths } from 'date-fns';
import { HttpResponse } from 'msw';

/*
 * Dynamisk mock av lagrede søk i bruker-api. Søkene lagres i minnet per DEV-BRUKER-cookie,
 * slik backend lagrer per Nav-ident. Da kan Playwright-tester bruke egne brukere uten å påvirke hverandre.
 * Brukere som starter med MED-EKSEMPELDATA får eksempelsøk, også ett som snart slettes.
 * Standardbrukeren får ingen, fordi standardsøket brukes når siden åpnes og ville endret filtrene i andre tester.
 */

interface MockSøk {
  id: string;
  navn: string;
  erStandard: boolean;
  filter: string;
  fritekst: string[];
  sistAktiv: string;
}

const STANDARDBRUKER = 'TestIdent';
const endepunkt = '/api/bruker/standardsok/:domene';

const lagredeSøk = new Map<string, MockSøk[]>();

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

const søkForBruker = (cookies: Record<string, string>): MockSøk[] => {
  const bruker = cookies['DEV-BRUKER'] || STANDARDBRUKER;
  if (!lagredeSøk.has(bruker)) {
    const medEksempler = bruker.startsWith('MED-EKSEMPELDATA');
    lagredeSøk.set(bruker, medEksempler ? eksempelsøk() : []);
  }
  const alle = lagredeSøk.get(bruker)!;
  // Utløpte søk slettes, som opprydningsjobben i backend
  const aktive = alle.filter(erAktiv);
  sikreStandardsøk(aktive);
  lagredeSøk.set(bruker, aktive);
  return aktive;
};

const tilDTO = (søk: MockSøk, fritekstFiltrert?: boolean): StandardsøkDTO => ({
  ...søk,
  slettes: slettes(søk.sistAktiv),
  visSlettevarsel: varselFra(søk.sistAktiv) <= iDagIOslo(),
  fritekstFiltrert: fritekstFiltrert ?? null,
});

const fødselsnummerkandidat = /(?<!\d)(\d{6})[ .]?(\d{5})(?!\d)/g;

const fjernFødselsnummer = (tekst: string) => {
  let fjernet = false;
  const renset = tekst.replace(fødselsnummerkandidat, (treff, del1, del2) => {
    if (idnr(`${del1}${del2}`).status === 'valid') {
      fjernet = true;
      return ' ';
    }
    return treff;
  });
  return {
    tekst: fjernet ? renset.replace(/\s+/g, ' ').trim() : tekst,
    fjernet,
  };
};

const valider = (body: Partial<LagreStandardsøkDTO>) => {
  const navn = (body.navn ?? '').trim();
  if (navn.length === 0 || navn.length > MAKS_NAVNELENGDE_STANDARDSØK) {
    return null;
  }
  const rensetNavn = fjernFødselsnummer(navn);
  if (rensetNavn.tekst.length === 0) return null;
  const søkeord = (body.fritekst ?? [])
    .map((ord) => fjernFødselsnummer(ord.trim()))
    .filter((ord) => ord.tekst.length > 0);
  return {
    navn: rensetNavn.tekst,
    filter: body.filter ?? '',
    fritekst: søkeord.map((ord) => ord.tekst),
    fjernet: rensetNavn.fjernet || søkeord.some((ord) => ord.fjernet),
  };
};

// Som backend: med aktive søk finnes alltid nøyaktig ett standardsøk. Mangler det, blir det sist brukte standard.
const sikreStandardsøk = (søk: MockSøk[]) => {
  if (søk.length === 0 || søk.some((s) => s.erStandard)) return;
  const [sistBrukt] = [...søk].sort(
    (a, b) =>
      b.sistAktiv.localeCompare(a.sistAktiv) ||
      a.navn.localeCompare(b.navn, 'nb') ||
      a.id.localeCompare(b.id),
  );
  sistBrukt.erStandard = true;
};

const ikkeFunnet = () =>
  HttpResponse.json({ feil: 'Fant ikke det lagrede søket' }, { status: 404 });

const ugyldig = () =>
  HttpResponse.json({ feil: 'Ugyldig forespørsel' }, { status: 400 });

export const standardsøkMSWHandlers = [
  getMock(endepunkt, ({ cookies }) =>
    HttpResponse.json(
      [...søkForBruker(cookies)]
        .sort(
          (a, b) =>
            Number(b.erStandard) - Number(a.erStandard) ||
            a.navn.localeCompare(b.navn, 'nb') ||
            a.id.localeCompare(b.id),
        )
        .map((søk) => tilDTO(søk)),
    ),
  ),

  postMock(endepunkt, async ({ cookies, request }) => {
    const søk = søkForBruker(cookies);
    const input = valider((await request.json()) as LagreStandardsøkDTO);
    if (!input) return ugyldig();
    if (søk.length >= MAKS_ANTALL_STANDARDSØK) {
      return HttpResponse.json(
        { feil: `Du har allerede ${MAKS_ANTALL_STANDARDSØK} lagrede søk` },
        { status: 409 },
      );
    }
    const nytt: MockSøk = {
      id: crypto.randomUUID(),
      navn: input.navn,
      erStandard: søk.length === 0,
      filter: input.filter,
      fritekst: input.fritekst,
      sistAktiv: iDagIOslo(),
    };
    søk.push(nytt);
    return HttpResponse.json(tilDTO(nytt, input.fjernet), { status: 201 });
  }),

  putMock(`${endepunkt}/:id`, async ({ cookies, params, request }) => {
    const eksisterende = søkForBruker(cookies).find((s) => s.id === params.id);
    if (!eksisterende) return ikkeFunnet();
    const input = valider((await request.json()) as LagreStandardsøkDTO);
    if (!input) return ugyldig();
    eksisterende.navn = input.navn;
    eksisterende.filter = input.filter;
    eksisterende.fritekst = input.fritekst;
    eksisterende.sistAktiv = iDagIOslo();
    return HttpResponse.json(tilDTO(eksisterende, input.fjernet));
  }),

  putMock(`${endepunkt}/:id/standard`, ({ cookies, params }) => {
    const søk = søkForBruker(cookies);
    const valgt = søk.find((s) => s.id === params.id);
    if (!valgt) return ikkeFunnet();
    søk.forEach((s) => {
      s.erStandard = false;
    });
    valgt.erStandard = true;
    valgt.sistAktiv = iDagIOslo();
    return new HttpResponse(null, { status: 204 });
  }),

  deleteMock(`${endepunkt}/:id`, ({ cookies, params }) => {
    const søk = søkForBruker(cookies);
    const indeks = søk.findIndex((s) => s.id === params.id);
    if (indeks === -1) return ikkeFunnet();
    søk.splice(indeks, 1);
    sikreStandardsøk(søk);
    return new HttpResponse(null, { status: 204 });
  }),

  postMock(`${endepunkt}/:id/bruk`, ({ cookies, params }) => {
    const valgt = søkForBruker(cookies).find((s) => s.id === params.id);
    if (!valgt) return ikkeFunnet();
    if (valgt.sistAktiv < iDagIOslo()) valgt.sistAktiv = iDagIOslo();
    return HttpResponse.json(tilDTO(valgt));
  }),
];
