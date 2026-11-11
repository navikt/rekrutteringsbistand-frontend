import { LagredeSøkDomene } from '@/app/api/bruker/lagrede-sok/lagredeSøkTyper';
import type { KandidatStillingssøkDTO } from '@/app/api/kandidat-sok/useKandidatStillingssøk';
import {
  byggLagretSøkFilter,
  lagbareVerdier,
  normaliserLagretSøkFilter,
  filtreFraLagretSøk,
} from '@/app/stilling/_util/lagredeSøkFilter';
import { gotoApp } from '@/tests/gotoApp';
import {
  brukEgenMockbruker,
  endepunktFor,
  opprettSøk,
  opprettStandardsøk,
  tellLagringsforsøk,
  åpneLagreDialog,
  åpneMeny,
} from '@/tests/lagrede-sok/lagredeSøkHjelpere';
import { expect, test, type Page } from '@playwright/test';

test.use({ storageState: 'tests/.auth/arbeigsgiverrettet.json' });

const STILLING = LagredeSøkDomene.STILLING;

/**
 * Samme strenger som `filtreFraFrontend` i `StillingFilterTest.kt` i rekrutteringsbistand-bruker-api.
 * Feiler kontrakttesten etter en ny verdi i frontend: legg verdien til i `StillingFilterparameter`
 * og i begge listene, og deploy bruker-api før frontend.
 */
const filtreIBrukerApi = [
  'portefolje=visMine',
  'portefolje=mittKontor',
  'portefolje=arbeidsplassen&utenOppdrag=true',
  'sortering=utl%C3%B8psdato',
  'sortering=mestRelevant',
  'statuser=',
  [
    'fylker=03%2C46',
    'inkludering=' +
      [
        'INKLUDERING',
        'PRIORITERT_M%C3%85LGRUPPE',
        'STATLIG_INKLUDERINGSDUGNAD',
        'TILTAK_ELLER_VIRKEMIDDEL',
      ].join('%2C'),
    'inkluderingUnderkategori=' +
      [
        'INKLUDERING__ARBEIDSMILJ%C3%98',
        'INKLUDERING__ARBEIDSTID',
        'INKLUDERING__FYSISK',
        'INKLUDERING__GRUNNLEGGENDE',
        'PRIORITERT_M%C3%85LGRUPPE__HULL_I_CV_EN',
        'PRIORITERT_M%C3%85LGRUPPE__KOMMER_FRA_LAND_UTENFOR_E%C3%98S',
        'PRIORITERT_M%C3%85LGRUPPE__LITE_ELLER_INGEN_ARBEIDSERFARING',
        'PRIORITERT_M%C3%85LGRUPPE__LITE_ELLER_INGEN_UTDANNING',
        'PRIORITERT_M%C3%85LGRUPPE__SENIORER_OVER_45',
        'PRIORITERT_M%C3%85LGRUPPE__UNGE_UNDER_30',
        'TILTAK_ELLER_VIRKEMIDDEL__L%C3%86RLINGPLASS',
        'TILTAK_ELLER_VIRKEMIDDEL__L%C3%98NNSTILSKUDD',
        'TILTAK_ELLER_VIRKEMIDDEL__MENTORTILSKUDD',
      ].join('%2C'),
    'kommuner=0301%2C4601',
    'statuser=' +
      [
        'Fullf%C3%B8rt',
        'Ikke+publisert',
        'Stengt+for+s%C3%B8kere',
        'Utl%C3%B8pt+-+Stengt+for+s%C3%B8kere',
        '%C3%85pen+for+s%C3%B8kere',
      ].join('%2C'),
    'stillingskategori=' +
      [
        'ARBEIDSTRENING',
        'FORMIDLING',
        'JOBBMESSE',
        'REKRUTTERINGSTREFF_FORMIDLING',
        'STILLING',
      ].join('%2C'),
  ].join('&'),
];

const søkefelt = (page: Page) =>
  page.getByRole('searchbox', { name: 'Søk i stillinger' });

const søkEtter = async (page: Page, ord: string) => {
  await søkefelt(page).fill(ord);
  await søkefelt(page).press('Enter');
};

const åpenForSøkere = (page: Page) =>
  page.getByRole('checkbox', { name: /Åpen for søkere/ });

test.describe('Serialisering av filtre i lagrede søk for stilling', () => {
  const standard = {
    portefølje: 'intern',
    sortering: 'publiseringsdato',
    statuser: ['Åpen for søkere'],
    kategori: [],
    inkludering: [],
    inkluderingUnderkategori: [],
    fylker: [],
    kommuner: [],
    utenOppdrag: false,
  };

  test('standardvisningen gir tomt filter', () => {
    expect(byggLagretSøkFilter(standard)).toBe('');
    expect(filtreFraLagretSøk('')).toEqual(standard);
  });

  test('ingen valgte statuser lagres som en tom parameter', () => {
    expect(byggLagretSøkFilter({ ...standard, statuser: [] })).toBe(
      'statuser=',
    );
    expect(filtreFraLagretSøk('statuser=').statuser).toEqual([]);
  });

  test('sorterer nøkler og verdier og tar bare med verdier bruker-api tar imot', () => {
    expect(
      byggLagretSøkFilter({
        portefølje: 'visMine',
        sortering: 'utløpsdato',
        statuser: ['Fullført', 'Slettet', 'Åpen for søkere', 'Fullført'],
        kategori: ['STILLING', 'UKJENT'],
        inkludering: ['INKLUDERING'],
        inkluderingUnderkategori: ['INKLUDERING__FYSISK'],
        fylker: ['46', '03', '3'],
        kommuner: ['4601', '0301x'],
        utenOppdrag: false,
      }),
    ).toBe(
      'fylker=03%2C46&inkludering=INKLUDERING&inkluderingUnderkategori=INKLUDERING__FYSISK' +
        '&kommuner=4601&portefolje=visMine&sortering=utl%C3%B8psdato' +
        '&statuser=Fullf%C3%B8rt%2C%C3%85pen+for+s%C3%B8kere&stillingskategori=STILLING',
    );
  });

  test('et filter i en annen rekkefølge og med parametere som ikke lagres, får samme form', () => {
    expect(
      normaliserLagretSøkFilter(
        '?publisert=intern&side=2&fylker=03&sortering=publiseringsdato',
      ),
    ).toBe('fylker=03');
  });

  test('utenOppdrag lagres bare på arbeidsplassen.no', () => {
    expect(
      byggLagretSøkFilter({
        ...standard,
        portefølje: 'arbeidsplassen',
        utenOppdrag: true,
      }),
    ).toBe('portefolje=arbeidsplassen&utenOppdrag=true');
    expect(
      byggLagretSøkFilter({
        ...standard,
        portefølje: 'arbeidsplassen',
        utenOppdrag: false,
      }),
    ).toBe('portefolje=arbeidsplassen');
    expect(byggLagretSøkFilter({ ...standard, utenOppdrag: true })).toBe('');
    expect(
      filtreFraLagretSøk('portefolje=arbeidsplassen&utenOppdrag=true')
        .utenOppdrag,
    ).toBe(true);
    expect(
      filtreFraLagretSøk('portefolje=intern&utenOppdrag=true').utenOppdrag,
    ).toBe(false);
    expect(
      normaliserLagretSøkFilter('utenOppdrag=true&portefolje=arbeidsplassen'),
    ).toBe('portefolje=arbeidsplassen&utenOppdrag=true');
  });

  test('bygger de samme filtrene som kontrakttesten i bruker-api', () => {
    const filtre = [
      ...lagbareVerdier.porteføljer.map((portefølje) =>
        byggLagretSøkFilter({ ...standard, portefølje, utenOppdrag: true }),
      ),
      ...lagbareVerdier.sorteringer.map((sortering) =>
        byggLagretSøkFilter({ ...standard, sortering }),
      ),
      byggLagretSøkFilter({ ...standard, statuser: [] }),
      byggLagretSøkFilter({
        ...standard,
        statuser: [...lagbareVerdier.statuser],
        kategori: [...lagbareVerdier.kategorier],
        inkludering: [...lagbareVerdier.hovedtagger],
        inkluderingUnderkategori: [...lagbareVerdier.undertagger],
        fylker: ['46', '03'],
        kommuner: ['4601', '0301'],
      }),
    ].filter((filter) => filter !== '');
    expect([...filtre].sort()).toEqual([...filtreIBrukerApi].sort());
  });
});

test.describe('Lagrede søk i stillingssøket', () => {
  test('Menylenken «Stillingsoppdrag» ber om standardsøket', async ({
    page,
  }) => {
    await brukEgenMockbruker(page);
    await gotoApp(page, '/stilling');
    await expect(
      page.locator('a[aria-label="Stillingsoppdrag"]'),
    ).toHaveAttribute('href', '/stilling?brukStandardsok=true');
  });

  test('Uten lagrede søk er vanlig søk standard, og lagring krever filter eller søkeord', async ({
    page,
  }) => {
    await brukEgenMockbruker(page);
    await gotoApp(page, '/stilling');

    await expect(åpenForSøkere(page)).toBeChecked();
    await expect(
      page.getByRole('button', { name: 'Lagre søk' }),
    ).toBeDisabled();
    await åpneMeny(page);
    const vanligSøk = page.getByRole('menuitemradio', { name: /Vanlig søk/ });
    await expect(vanligSøk).toBeChecked();
    await expect(vanligSøk).toContainText('Standard');
    await page.keyboard.press('Escape');
  });

  test('Lagrer filtre og søkeord, men ikke side, publisert og utenOppdrag på fanen Alle', async ({
    page,
  }) => {
    await brukEgenMockbruker(page);
    await gotoApp(page, '/stilling?side=2&publisert=intern&utenOppdrag=true');

    await page.getByRole('radio', { name: 'Utløpsdato' }).click();
    await søkEtter(page, 'lager');
    await expect(
      page.getByRole('button', { name: 'Lager slett' }),
    ).toBeVisible();

    const lagret = page.waitForRequest(
      (request) =>
        request.method() === 'POST' && request.url() === endepunktFor(STILLING),
    );
    const dialog = await åpneLagreDialog(page);
    await dialog
      .getByRole('textbox', { name: 'Navn på søket' })
      .fill('Lager etter utløp');
    await dialog.getByRole('button', { name: 'Lagre', exact: true }).click();
    expect((await lagret).postDataJSON()).toEqual({
      navn: 'Lager etter utløp',
      filter: 'sortering=utl%C3%B8psdato',
      fritekst: ['lager'],
    });
    await expect(page.getByText('Søket er lagret.')).toBeVisible();
    await expect(page.getByText('Lagret søk:')).toContainText(
      'Lager etter utløp',
    );
  });

  test('Et lagret søk setter filtrene og søkeordene, og vanlig søk setter dem tilbake', async ({
    page,
  }) => {
    await brukEgenMockbruker(page);
    await opprettSøk(
      page,
      'Mine fullførte',
      'portefolje=visMine&statuser=Fullf%C3%B8rt',
      ['lager'],
      STILLING,
    );
    await gotoApp(page, '/stilling?side=2');

    await åpneMeny(page);
    await page.getByRole('menuitemradio', { name: /Mine fullførte/ }).click();

    await expect(
      page.getByRole('checkbox', { name: /Fullført/ }),
    ).toBeChecked();
    await expect(åpenForSøkere(page)).not.toBeChecked();
    await expect(
      page.getByRole('button', { name: 'Lager slett' }),
    ).toBeVisible();
    await expect(page).toHaveURL(/portefolje=visMine/);
    await expect(page).not.toHaveURL(/side=/);
    expect(page.url()).not.toContain('lager');

    await åpneMeny(page);
    await page.getByRole('menuitemradio', { name: /Vanlig søk/ }).click();

    await expect(page).toHaveURL(/\/stilling$/);
    await expect(åpenForSøkere(page)).toBeChecked();
    await expect(page.getByRole('button', { name: 'Lager slett' })).toHaveCount(
      0,
    );
    await expect(page.getByText('Lagret søk:')).toHaveCount(0);
  });

  test('Menylenken bruker standardsøket med filtre og søkeord', async ({
    page,
  }) => {
    await brukEgenMockbruker(page);
    await opprettStandardsøk(
      page,
      'Mitt standardsøk',
      'sortering=utl%C3%B8psdato',
      ['lager'],
      STILLING,
    );

    await gotoApp(page, '/stilling?brukStandardsok=true');

    await expect(page.getByRole('radio', { name: 'Utløpsdato' })).toBeChecked();
    await expect(
      page.getByRole('button', { name: 'Lager slett' }),
    ).toBeVisible();
    await expect(page.getByText('Lagret søk:')).toContainText(
      'Mitt standardsøk',
    );
    await expect(page).not.toHaveURL(/brukStandardsok/);
  });

  test('Standardsøket brukes ikke når siden åpnes uten menylenken', async ({
    page,
  }) => {
    await brukEgenMockbruker(page);
    await opprettStandardsøk(
      page,
      'Mitt standardsøk',
      'sortering=utl%C3%B8psdato',
      [],
      STILLING,
    );

    await gotoApp(page, '/stilling');

    await expect(
      page.getByRole('radio', { name: 'Publiseringsdato' }),
    ).toBeChecked();
    await expect(page.getByText('Lagret søk:')).toHaveCount(0);
  });

  test('Fjern alle filtre fjerner søkeord og statuser, men beholder porteføljen', async ({
    page,
  }) => {
    await brukEgenMockbruker(page);
    await gotoApp(
      page,
      '/stilling?portefolje=visMine&sortering=utl%C3%B8psdato',
    );
    await søkEtter(page, 'lager');
    await expect(
      page.getByRole('button', { name: 'Lager slett' }),
    ).toBeVisible();

    await page.getByRole('button', { name: 'Fjern alle filtre' }).click();

    await expect(page.getByRole('button', { name: 'Lager slett' })).toHaveCount(
      0,
    );
    await expect(
      page.getByRole('radio', { name: 'Publiseringsdato' }),
    ).toBeChecked();
    await expect(åpenForSøkere(page)).not.toBeChecked();
    await expect(page).toHaveURL(/portefolje=visMine/);
  });

  test('Lagrer at Med oppdrag er slått av på arbeidsplassen.no', async ({
    page,
  }) => {
    await brukEgenMockbruker(page);
    await gotoApp(page, '/stilling?portefolje=arbeidsplassen');

    const medOppdrag = page.getByRole('button', { name: 'Med oppdrag' });
    await medOppdrag.click();
    await expect(medOppdrag).toHaveAttribute('aria-pressed', 'false');
    await expect(page).toHaveURL(/utenOppdrag=true/);

    const lagret = page.waitForRequest(
      (request) =>
        request.method() === 'POST' && request.url() === endepunktFor(STILLING),
    );
    const dialog = await åpneLagreDialog(page);
    await dialog
      .getByRole('textbox', { name: 'Navn på søket' })
      .fill('Uten oppdrag');
    await dialog.getByRole('button', { name: 'Lagre', exact: true }).click();
    expect((await lagret).postDataJSON()).toEqual({
      navn: 'Uten oppdrag',
      filter: 'portefolje=arbeidsplassen&utenOppdrag=true',
      fritekst: [],
    });
    await expect(page.getByText('Lagret søk:')).toContainText('Uten oppdrag');
  });

  test('Et lagret søk slår av Med oppdrag, og vanlig søk setter det tilbake', async ({
    page,
  }) => {
    await brukEgenMockbruker(page);
    await opprettSøk(
      page,
      'Uten oppdrag',
      'portefolje=arbeidsplassen&utenOppdrag=true',
      [],
      STILLING,
    );
    await gotoApp(page, '/stilling');

    await åpneMeny(page);
    await page.getByRole('menuitemradio', { name: /Uten oppdrag/ }).click();

    await expect(page).toHaveURL(/portefolje=arbeidsplassen/);
    await expect(page).toHaveURL(/utenOppdrag=true/);
    const medOppdrag = page.getByRole('button', { name: 'Med oppdrag' });
    await expect(medOppdrag).toHaveAttribute('aria-pressed', 'false');
    await expect(page.getByText('Lagret søk:')).toContainText('Uten oppdrag');

    await medOppdrag.click();
    await expect(page.getByText('Lagret søk:')).toHaveCount(0);

    await åpneMeny(page);
    await page.getByRole('menuitemradio', { name: /Uten oppdrag/ }).click();
    await åpneMeny(page);
    await page.getByRole('menuitemradio', { name: /Vanlig søk/ }).click();

    await expect(page).toHaveURL(/\/stilling$/);
    await expect(page.getByRole('button', { name: 'Med oppdrag' })).toHaveCount(
      0,
    );
    await expect(page.getByText('Lagret søk:')).toHaveCount(0);
  });

  test('Fjern alle filtre slår på Med oppdrag igjen, men beholder arbeidsplassen.no', async ({
    page,
  }) => {
    await brukEgenMockbruker(page);
    await gotoApp(
      page,
      '/stilling?portefolje=arbeidsplassen&utenOppdrag=true&sortering=utl%C3%B8psdato',
    );
    await søkEtter(page, 'lager');
    await expect(
      page.getByRole('button', { name: 'Lager slett' }),
    ).toBeVisible();

    await page.getByRole('button', { name: 'Fjern alle filtre' }).click();

    await expect(page.getByRole('button', { name: 'Lager slett' })).toHaveCount(
      0,
    );
    await expect(
      page.getByRole('radio', { name: 'Publiseringsdato' }),
    ).toBeChecked();
    await expect(page).toHaveURL(/portefolje=arbeidsplassen/);
    await expect(page).not.toHaveURL(/utenOppdrag=true/);
    await expect(
      page.getByRole('button', { name: 'Med oppdrag' }),
    ).toHaveAttribute('aria-pressed', 'true');
  });

  test('Standardsøk uten statuser beholder ingen valgte statuser', async ({
    page,
  }) => {
    await brukEgenMockbruker(page);
    await opprettStandardsøk(page, 'Alle statuser', 'statuser=', [], STILLING);
    await gotoApp(page, '/stilling?brukStandardsok=true');

    await expect(page.getByText('Lagret søk:')).toContainText('Alle statuser');
    await expect(åpenForSøkere(page)).not.toBeChecked();
    await expect(page).not.toHaveURL(/brukStandardsok/);
  });

  test('brukStandardsok med en annen verdi enn true brukes ikke, og fjernes fra URL-en', async ({
    page,
  }) => {
    await brukEgenMockbruker(page);
    await opprettStandardsøk(
      page,
      'Mitt standardsøk',
      'sortering=utl%C3%B8psdato',
      [],
      STILLING,
    );
    await gotoApp(page, '/stilling?brukStandardsok=1');

    await expect(page).not.toHaveURL(/brukStandardsok/);
    await expect(
      page.getByRole('radio', { name: 'Publiseringsdato' }),
    ).toBeChecked();
    await expect(page.getByText('Lagret søk:')).toHaveCount(0);
  });

  for (const { beskrivelse, søkeord } of [
    {
      beskrivelse: 'flere enn 20 søkeord',
      søkeord: Array.from({ length: 21 }, (_, indeks) => `ord${indeks + 1}`),
    },
    {
      beskrivelse: 'søkeordene har over 400 tegn',
      søkeord: ['a'.repeat(201), 'b'.repeat(200)],
    },
  ]) {
    test(`Stopper lagring når ${beskrivelse}`, async ({ page }) => {
      await brukEgenMockbruker(page);
      await gotoApp(page, '/stilling');
      const lagringsforsøk = tellLagringsforsøk(page, STILLING);

      // Lange søkeord får ikke plass som chips, så testen sjekker at søkefeltet tømmes.
      for (const ord of søkeord) {
        await søkEtter(page, ord);
        await expect(søkefelt(page)).toHaveValue('');
      }

      const dialog = await åpneLagreDialog(page);
      await dialog
        .getByRole('textbox', { name: 'Navn på søket' })
        .fill('Mange søkeord');
      await dialog.getByRole('button', { name: 'Lagre', exact: true }).click();

      await expect(
        dialog.getByText(
          'Du kan lagre opptil 20 søkeord med til sammen 400 tegn. Fjern søkeord før du lagrer.',
        ),
      ).toBeVisible();
      await expect(dialog).toBeVisible();
      expect(lagringsforsøk.antall).toBe(0);
    });
  }

  test('På smal skjerm åpner Filtrer panelet med lagrede søk', async ({
    page,
  }) => {
    await brukEgenMockbruker(page);
    await page.setViewportSize({ width: 375, height: 800 });
    await opprettSøk(
      page,
      'Mobilsøk',
      'sortering=utl%C3%B8psdato',
      [],
      STILLING,
    );
    await gotoApp(page, '/stilling');

    await page.getByRole('button', { name: 'Filtrer' }).click();
    const panel = page.getByRole('dialog', { name: 'Filtrer' });
    await expect(panel).toBeVisible();

    await panel.getByRole('button', { name: 'Lagrede søk' }).click();
    await page.getByRole('menuitemradio', { name: /Mobilsøk/ }).click();
    await expect(
      page.getByRole('radio', { name: 'Utløpsdato' }).last(),
    ).toBeChecked();
  });

  test('Tilbake viser det lagrede søket fra før med søkeordene, og fram viser standardsøket', async ({
    page,
  }) => {
    await brukEgenMockbruker(page);
    await opprettStandardsøk(
      page,
      'Mitt standardsøk',
      'sortering=utl%C3%B8psdato',
      ['kokk'],
      STILLING,
    );
    await opprettSøk(
      page,
      'Mest relevante lager',
      'sortering=mestRelevant',
      ['lager'],
      STILLING,
    );
    await gotoApp(page, '/stilling');
    await åpneMeny(page);
    await page
      .getByRole('menuitemradio', { name: /Mest relevante lager/ })
      .click();

    const statuslinje = page.getByText('Lagret søk:');
    const lager = page.getByRole('button', { name: 'Lager slett' });
    const kokk = page.getByRole('button', { name: 'Kokk slett' });
    await expect(statuslinje).toContainText('Mest relevante lager');

    await page.locator('a[aria-label="Stillingsoppdrag"]').click();
    await expect(statuslinje).toContainText('Mitt standardsøk');
    await expect(kokk).toBeVisible();
    await expect(lager).toHaveCount(0);

    await page.goBack();
    await expect(statuslinje).toContainText('Mest relevante lager');
    await expect(
      page.getByRole('radio', { name: 'Mest relevant' }),
    ).toBeChecked();
    await expect(lager).toBeVisible();
    await expect(kokk).toHaveCount(0);

    await page.goForward();
    await expect(statuslinje).toContainText('Mitt standardsøk');
    await expect(page.getByRole('radio', { name: 'Utløpsdato' })).toBeChecked();
    await expect(kokk).toBeVisible();
    await expect(lager).toHaveCount(0);
  });
});

test.describe('Lagrede søk i stillingssøket for jobbsøkerrettet veileder', () => {
  test.use({ storageState: 'tests/.auth/jobbsokerrettet.json' });

  test('Et lagret søk med fanen Mine gir standardporteføljen', async ({
    page,
  }) => {
    await brukEgenMockbruker(page);
    await opprettSøk(
      page,
      'Mine stillinger',
      'portefolje=visMine&sortering=utl%C3%B8psdato',
      [],
      STILLING,
    );
    await gotoApp(page, '/stilling');

    await åpneMeny(page);
    await page.getByRole('menuitemradio', { name: /Mine stillinger/ }).click();

    await expect(page.getByRole('radio', { name: 'Utløpsdato' })).toBeChecked();
    await expect(page).not.toHaveURL(/portefolje=/);
    await expect(
      page.getByRole('button', { name: 'Mine', exact: true }),
    ).toHaveCount(0);
  });
});

test.describe('Stillingssøket er uendret etter en stilling', () => {
  test('søkeordene står når veilederen går tilbake, men ikke etter refresh', async ({
    page,
  }) => {
    await brukEgenMockbruker(page);
    await gotoApp(page, '/stilling?sortering=utl%C3%B8psdato');
    await søkEtter(page, 'lager');
    const lager = page.getByRole('button', { name: 'Lager slett' });
    await expect(lager).toBeVisible();
    const søkeUrl = page.url();

    await page
      .getByTestId('stillings-kort')
      .first()
      .getByRole('link')
      .first()
      .click();
    await expect(page).not.toHaveURL(søkeUrl);
    await page.goBack();

    await expect(page).toHaveURL(søkeUrl);
    await expect(page.getByRole('radio', { name: 'Utløpsdato' })).toBeChecked();
    await expect(lager).toBeVisible();

    await page.reload();
    await expect(page.getByRole('radio', { name: 'Utløpsdato' })).toBeChecked();
    await expect(lager).toHaveCount(0);
  });

  test('søkeordene og scrollposisjonen for et søk med søkeord lagres ikke i sessionStorage', async ({
    page,
  }) => {
    await brukEgenMockbruker(page);
    await gotoApp(page, '/stilling');
    await søkEtter(page, 'lager');
    await expect(
      page.getByRole('button', { name: 'Lager slett' }),
    ).toBeVisible();
    const liste = page
      .locator('.scroll-container')
      .filter({ has: page.getByTestId('stillings-kort') });
    await liste.evaluate((element) => {
      element.scrollTop = 200;
    });
    await expect.poll(() => liste.evaluate((e) => e.scrollTop)).toBe(200);

    await page.reload();
    await expect(liste).toBeVisible();
    expect(
      await page.evaluate(() => JSON.stringify({ ...sessionStorage })),
    ).not.toMatch(/lager/i);
  });

  test('søkeord står etter en stilling og tilbakeknappen når et fylke med valgt kommune fjernes', async ({
    page,
  }) => {
    await brukEgenMockbruker(page);
    await gotoApp(page, '/stilling?fylker=11&kommuner=1103');
    await søkEtter(page, 'lager');
    const lager = page.getByRole('button', { name: 'Lager slett' });
    await expect(lager).toBeVisible();

    await page.getByRole('checkbox', { name: /^Rogaland/ }).uncheck();
    await expect(page).not.toHaveURL(/fylker|kommuner/);

    await page
      .getByTestId('stillings-kort')
      .first()
      .getByRole('link')
      .first()
      .click();
    await expect(page).toHaveURL(/\/stilling\/[^/?]+/);
    await page.goBack();
    await expect(lager).toBeVisible();
  });

  test('brødsmulen «Stillingsoppdrag» bruker standardsøket, som menylenken', async ({
    page,
  }) => {
    await brukEgenMockbruker(page);
    await opprettStandardsøk(
      page,
      'Mitt standardsøk',
      'sortering=utl%C3%B8psdato',
      [],
      STILLING,
    );
    await gotoApp(page, '/stilling?sortering=mestRelevant');

    await page
      .getByTestId('stillings-kort')
      .first()
      .getByRole('link')
      .first()
      .click();
    const brødsmule = page
      .getByRole('navigation', { name: 'Brødsmulesti' })
      .getByRole('link', { name: 'Stillingsoppdrag' });
    await expect(brødsmule).toHaveAttribute(
      'href',
      '/stilling?brukStandardsok=true',
    );
    await brødsmule.click();

    await expect(page.getByText('Lagret søk:')).toContainText(
      'Mitt standardsøk',
    );
    await expect(page.getByRole('radio', { name: 'Utløpsdato' })).toBeChecked();
    await expect(page).not.toHaveURL(/brukStandardsok/);
  });
});

test.describe('Sider uten lagrede søk', () => {
  test('etterregistreringen har ikke lagrede søk eller standardsøk', async ({
    page,
  }) => {
    let hentetLagredeSøk = false;
    page.on('request', (request) => {
      if (request.url().includes('/api/bruker/lagrede-sok/')) {
        hentetLagredeSøk = true;
      }
    });
    await brukEgenMockbruker(page);
    await gotoApp(page, '/etterregistrering');

    await expect(
      page.getByRole('searchbox', { name: 'Søk i stillinger' }),
    ).toBeVisible();
    await expect(page.getByRole('button', { name: 'Lagrede søk' })).toHaveCount(
      0,
    );
    await expect(page.getByRole('button', { name: 'Lagre søk' })).toHaveCount(
      0,
    );
    await expect(
      page.getByRole('button', { name: 'Bruk standardsøk' }),
    ).toHaveCount(0);
    expect(hentetLagredeSøk).toBe(false);
  });
});

test.describe('Lagrede søk i jobbsøkerens stillingssøk', () => {
  const jobbønsker: KandidatStillingssøkDTO = {
    yrkeJobbonskerObj: [
      {
        styrkBeskrivelse: 'Sykepleier',
        sokeTitler: ['Sykepleier'],
        primaertJobbonske: true,
        styrkKode: null,
      },
    ],
    geografiJobbonsker: [
      { geografiKodeTekst: 'Bergen', geografiKode: 'Bergen.NO46.4601' },
    ],
    kommunenummerstring: null,
    kommuneNavn: null,
  };
  const finnStilling = '/kandidat/kandidat-arenaKandidatnr-2/finn-stilling';
  const sykepleier = (page: Page) =>
    page.getByRole('button', { name: 'Sykepleier slett' });
  const lager = (page: Page) =>
    page.getByRole('button', { name: 'Lager slett' });

  test.beforeEach(async ({ page }) => {
    await brukEgenMockbruker(page);
    await page.route('**/kandidat-stillingssok', (route) =>
      route.fulfill({ json: { hits: { hits: [{ _source: jobbønsker }] } } }),
    );
  });

  test('starter fra jobbønskene, og menyen kan bytte til et lagret søk og tilbake', async ({
    page,
  }) => {
    await opprettStandardsøk(
      page,
      'Mitt standardsøk',
      'sortering=utl%C3%B8psdato',
      ['lager'],
      STILLING,
    );
    await gotoApp(page, finnStilling);

    await expect(sykepleier(page)).toBeVisible();
    await expect(page).toHaveURL(/fylker=46/);
    await expect(
      page.getByRole('radio', { name: 'Publiseringsdato' }),
    ).toBeChecked();
    await expect(lager(page)).toHaveCount(0);
    await expect(page.getByText('Lagret søk:')).toHaveCount(0);

    await åpneMeny(page);
    const fraJobbsøkeren = page.getByRole('menuitemradio', {
      name: /Fra jobbsøkeren/,
    });
    await expect(fraJobbsøkeren).toBeChecked();
    await expect(fraJobbsøkeren).toContainText('Jobbønsker og sted');
    await expect(fraJobbsøkeren).toContainText('Standard');
    await expect(
      page.getByRole('menuitemradio', { name: /Vanlig søk/ }),
    ).not.toContainText('Standard');
    const standardsøk = page.getByRole('menuitemradio', {
      name: /Mitt standardsøk/,
    });
    await expect(standardsøk).toContainText('Standard i Stillingsoppdrag');
    await standardsøk.click();

    await expect(page.getByRole('radio', { name: 'Utløpsdato' })).toBeChecked();
    await expect(lager(page)).toBeVisible();
    await expect(sykepleier(page)).toHaveCount(0);
    await expect(page).not.toHaveURL(/fylker=/);

    await åpneMeny(page);
    await page.getByRole('menuitemradio', { name: /Fra jobbsøkeren/ }).click();

    await expect(sykepleier(page)).toBeVisible();
    await expect(lager(page)).toHaveCount(0);
    await expect(page).toHaveURL(/fylker=46/);
    await expect(page).toHaveURL(/kommuner=4601/);
    await expect(
      page.getByRole('radio', { name: 'Publiseringsdato' }),
    ).toBeChecked();
  });

  test('kortet «Finn jobb» gir jobbønskene, uten søkeordene fra stillingssøket', async ({
    page,
  }) => {
    // Samme filtre som jobbønskene, så søkeordene ville fulgt med hvis minnet var felles.
    await gotoApp(page, '/stilling?fylker=46&kommuner=4601');
    await søkEtter(page, 'lager');
    await expect(lager(page)).toBeVisible();

    // Minnet står seg bare ved klientnavigering, som når veilederen bruker menyen i appen.
    await page.getByRole('button', { name: 'Jobbsøkere', exact: true }).click();
    await expect(page).toHaveURL(/\/kandidat/);
    await page
      .getByTestId('kandidatkort-lenke-kandidat-arenaKandidatnr-2')
      .click();
    await page.getByRole('link', { name: 'Finn jobb', exact: true }).click();

    await expect(page).toHaveURL(/\/finn-stilling\?/);
    await expect(sykepleier(page)).toBeVisible();
    await expect(page).toHaveURL(/fylker=46/);
    await expect(lager(page)).toHaveCount(0);
  });
});
