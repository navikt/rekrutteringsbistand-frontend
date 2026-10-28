import {
  brukEgenMockbruker,
  endepunkt,
  opprettSøk,
  opprettStandardsøk,
  åpneLagreDialog,
  åpneMeny,
  syntetiskNummer,
  tellLagringsforsøk,
} from './lagredeSøkHjelpere';
import {
  PublisertStatus,
  RekrutteringstreffStatus,
  Sortering,
  Visning,
} from '@/app/rekrutteringstreff/_types/constants';
import {
  byggLagretSøkFilter,
  tolkLagretSøkFilter,
} from '@/app/rekrutteringstreff/_utils/lagredeSøkFilter';
import { gotoApp } from '@/tests/gotoApp';
import { expect, test } from '@playwright/test';

test.use({ storageState: 'tests/.auth/arbeigsgiverrettet.json' });

test.describe('Serialisering av filtre i lagrede søk', () => {
  test('rundtur for alle filtre gir sorterte nøkler og samme verdier tilbake', () => {
    const filtre = {
      visning: Visning.VALGTE_KONTORER,
      kontorer: ['Kontor 1', 'Kontor&2'],
      statuser: [
        RekrutteringstreffStatus.UTKAST,
        RekrutteringstreffStatus.FULLFØRT,
      ],
      publisertStatuser: [PublisertStatus.ÅPEN_FOR_SØKERE],
      fylker: ['03', '11'],
      kommuner: ['0301', '1103'],
      sortering: Sortering.ELDSTE,
    };

    const filter = byggLagretSøkFilter(filtre);

    expect([...new URLSearchParams(filter).keys()]).toEqual([
      'fylker',
      'kommuner',
      'kontorer',
      'publisertStatuser',
      'sortering',
      'statuser',
      'visning',
    ]);
    expect(tolkLagretSøkFilter(filter)).toEqual(filtre);
  });

  test('lagrer alle filtre med eksakt kodet streng', () => {
    expect(
      byggLagretSøkFilter({
        visning: Visning.VALGTE_KONTORER,
        kontorer: ['Kontor 1', 'Kontor&2'],
        statuser: [
          RekrutteringstreffStatus.UTKAST,
          RekrutteringstreffStatus.FULLFØRT,
        ],
        publisertStatuser: [PublisertStatus.ÅPEN_FOR_SØKERE],
        fylker: ['03', '11'],
        kommuner: ['0301', '1103'],
        sortering: Sortering.ELDSTE,
      }),
    ).toBe(
      'fylker=03%2C11&kommuner=0301%2C1103&kontorer=Kontor+1%2CKontor%262&publisertStatuser=%C3%85PEN_FOR_S%C3%98KERE&sortering=eldste&statuser=UTKAST%2CFULLF%C3%98RT&visning=valgte_kontorer',
    );
  });

  test('lagrer tomme statuser som en tom parameter', () => {
    expect(
      byggLagretSøkFilter({
        visning: Visning.ALLE,
        kontorer: [],
        statuser: [],
        publisertStatuser: [],
        fylker: [],
        kommuner: [],
        sortering: Sortering.SIST_OPPDATERTE,
      }),
    ).toBe('statuser=');
  });

  test('lagrer publiserte og utkast som eksakt statusstreng', () => {
    expect(
      byggLagretSøkFilter({
        visning: Visning.ALLE,
        kontorer: [],
        statuser: [
          RekrutteringstreffStatus.PUBLISERT,
          RekrutteringstreffStatus.UTKAST,
        ],
        publisertStatuser: [],
        fylker: [],
        kommuner: [],
        sortering: Sortering.SIST_OPPDATERTE,
      }),
    ).toBe('statuser=PUBLISERT%2CUTKAST');
  });

  test('lagrer ett fylke og ikke-standard sortering med eksakt streng', () => {
    expect(
      byggLagretSøkFilter({
        visning: Visning.ALLE,
        kontorer: [],
        statuser: [RekrutteringstreffStatus.PUBLISERT],
        publisertStatuser: [],
        fylker: ['03'],
        kommuner: [],
        sortering: Sortering.ELDSTE,
      }),
    ).toBe('fylker=03&sortering=eldste');
  });

  test('beholder eksakt format for lagrede søk fra mocken', () => {
    [
      'fylker=03',
      'statuser=AVLYST',
      'sortering=eldste&statuser=FULLF%C3%98RT',
    ].forEach((filterstreng) => {
      expect(byggLagretSøkFilter(tolkLagretSøkFilter(filterstreng))).toBe(
        filterstreng,
      );
    });
  });

  test('utelater standardverdier, og manglende filtre får standardverdien mens tomme lister beholdes', () => {
    expect(
      byggLagretSøkFilter({
        visning: Visning.ALLE,
        kontorer: [],
        statuser: [RekrutteringstreffStatus.PUBLISERT],
        publisertStatuser: [],
        fylker: [],
        kommuner: [],
        sortering: Sortering.SIST_OPPDATERTE,
      }),
    ).toBe('');

    expect(tolkLagretSøkFilter('')).toEqual({
      visning: Visning.ALLE,
      kontorer: [],
      statuser: [RekrutteringstreffStatus.PUBLISERT],
      publisertStatuser: [],
      fylker: [],
      kommuner: [],
      sortering: Sortering.SIST_OPPDATERTE,
    });
    expect(
      tolkLagretSøkFilter(
        'fylker=&kommuner=&kontorer=&publisertStatuser=&sortering=&statuser=&visning=',
      ),
    ).toEqual({
      visning: Visning.ALLE,
      kontorer: [],
      statuser: [],
      publisertStatuser: [],
      fylker: [],
      kommuner: [],
      sortering: Sortering.SIST_OPPDATERTE,
    });
  });

  test('forkaster ukjente verdier', () => {
    expect(
      tolkLagretSøkFilter(
        'statuser=UKJENT,PUBLISERT&publisertStatuser=UKJENT&visning=ukjent&sortering=ukjent',
      ),
    ).toMatchObject({
      statuser: [RekrutteringstreffStatus.PUBLISERT],
      publisertStatuser: [],
      visning: Visning.ALLE,
      sortering: Sortering.SIST_OPPDATERTE,
    });
  });
});

test.describe('Lagrede søk i rekrutteringstreff', () => {
  test('Menylenken i sidemenyen ber om standardsøket', async ({ page }) => {
    await brukEgenMockbruker(page);
    await gotoApp(page, '/rekrutteringstreff');
    await expect(
      page.locator('a[aria-label="Rekrutteringstreff"]'),
    ).toHaveAttribute('href', '/rekrutteringstreff?brukStandardsok=true');
  });

  test('Uten lagrede søk viser menyen vanlig søk som standard, og lagring krever filter eller søkeord', async ({
    page,
  }) => {
    await brukEgenMockbruker(page);
    await gotoApp(page, '/rekrutteringstreff');

    await expect(
      page.getByRole('button', { name: 'Lagre søk' }),
    ).toBeDisabled();
    await åpneMeny(page);
    const vanligSøk = page.getByRole('menuitemradio', { name: /Vanlig søk/ });
    await expect(vanligSøk).toBeChecked();
    await expect(vanligSøk).toContainText('Standard');
    await expect(
      page.getByRole('menuitem', { name: 'Du har ingen lagrede søk' }),
    ).toBeVisible();
    await expect(
      page.getByRole('menuitem', { name: 'Administrer søk' }),
    ).toBeDisabled();
  });

  test('Vanlig søk i menyen fjerner filtre og søkeord fra et lagret søk', async ({
    page,
  }) => {
    await brukEgenMockbruker(page);
    await opprettSøk(page, 'Eldste kokketreff', 'sortering=eldste', ['kokk']);
    await gotoApp(page, '/rekrutteringstreff');

    await åpneMeny(page);
    await page
      .getByRole('menuitemradio', { name: /Eldste kokketreff/ })
      .click();
    await expect(page.getByRole('radio', { name: 'Eldste' })).toBeChecked();
    await expect(page.getByText('Valgt søk:')).toContainText(
      'Eldste kokketreff',
    );

    await åpneMeny(page);
    await page.getByRole('menuitemradio', { name: /Vanlig søk/ }).click();

    await expect(page).toHaveURL(/\/rekrutteringstreff$/);
    await expect(
      page.getByRole('radio', { name: 'Sist oppdaterte' }),
    ).toBeChecked();
    await expect(page.getByRole('button', { name: 'Kokk slett' })).toHaveCount(
      0,
    );
    await expect(page.getByText('Valgt søk:')).toHaveCount(0);
    await åpneMeny(page);
    await expect(
      page.getByRole('menuitemradio', { name: /Vanlig søk/ }),
    ).toBeChecked();
    await page.keyboard.press('Escape');
  });

  test('Lagrer filtre og søkeord, og bruker søket igjen uten fritekst i URL-en', async ({
    page,
  }) => {
    await brukEgenMockbruker(page);
    await gotoApp(page, '/rekrutteringstreff');

    await page.getByRole('radio', { name: 'Eldste' }).click();
    const søkefelt = page.getByRole('searchbox', { name: 'Søk i treff' });
    await søkefelt.fill('kokk');
    await søkefelt.press('Enter');

    const dialog = await åpneLagreDialog(page);
    await dialog
      .getByRole('textbox', { name: 'Navn på søket' })
      .fill('Eldste kokketreff');
    await dialog.getByRole('button', { name: 'Lagre', exact: true }).click();
    await expect(dialog).toBeHidden();
    await expect(page.getByText('Søket er lagret.')).toBeVisible();

    // Parameter i URL-en hindrer at standardsøket brukes når siden åpnes.
    await gotoApp(page, '/rekrutteringstreff?side=1');
    await expect(
      page.getByRole('radio', { name: 'Sist oppdaterte' }),
    ).toBeChecked();

    await åpneMeny(page);
    await page
      .getByRole('menuitemradio', { name: /Eldste kokketreff/ })
      .click();

    await expect(page.getByRole('radio', { name: 'Eldste' })).toBeChecked();
    await expect(page).toHaveURL(/sortering=eldste/);
    await expect(
      page.getByRole('button', { name: 'Kokk slett' }),
    ).toBeVisible();
    expect(page.url()).not.toContain('kokk');
  });

  for (const { felt, beskrivelse, melding } of [
    {
      felt: 'navn',
      beskrivelse: 'navnet',
      melding: 'Navnet inneholder noe som kan være et fødselsnummer.',
    },
    {
      felt: 'søkeord',
      beskrivelse: 'et søkeord',
      melding:
        'Søkeordene inneholder noe som kan være et fødselsnummer. Fjern søkeordet før du lagrer.',
    },
  ] as const) {
    test(`Stopper lagring når ${beskrivelse} inneholder fødselsnummer`, async ({
      page,
    }) => {
      await brukEgenMockbruker(page);
      await gotoApp(page, '/rekrutteringstreff?sortering=nyeste');
      const lagringsforsøk = tellLagringsforsøk(page);

      if (felt === 'søkeord') {
        const søkefelt = page.getByRole('searchbox', { name: 'Søk i treff' });
        await søkefelt.fill(syntetiskNummer);
        await søkefelt.press('Enter');
      }

      const dialog = await åpneLagreDialog(page);
      await dialog
        .getByRole('textbox', { name: 'Navn på søket' })
        .fill(felt === 'navn' ? `Treff ${syntetiskNummer}` : 'Treff');
      await dialog.getByRole('button', { name: 'Lagre', exact: true }).click();

      await expect(dialog.getByText(melding)).toBeVisible();
      await expect(dialog).toBeVisible();
      expect(lagringsforsøk.antall).toBe(0);
    });
  }

  test('Lagre-dialogen viser søkeordene som lagres og advarer mot opplysninger om personer', async ({
    page,
  }) => {
    await brukEgenMockbruker(page);
    await gotoApp(page, '/rekrutteringstreff?sortering=nyeste');
    const advarsel =
      'Ikke skriv opplysninger om personer i navnet på søket eller i søkeordene, for eksempel personnavn eller fødselsnummer.';

    let dialog = await åpneLagreDialog(page);
    await expect(dialog.getByText(advarsel)).toBeVisible();
    await expect(dialog.getByText('Søkeord som lagres:')).toHaveCount(0);
    // Navnefeltet får fokus når dialogen åpnes, så advarselen leses opp sammen med feltet.
    const navn = dialog.getByRole('textbox', { name: 'Navn på søket' });
    await expect(navn).toBeFocused();
    await expect(navn).toHaveAccessibleDescription(`${advarsel} Maks 25 tegn.`);
    await dialog.getByRole('button', { name: 'Avbryt' }).click();

    const søkefelt = page.getByRole('searchbox', { name: 'Søk i treff' });
    for (const ord of ['kokk', 'servitør']) {
      await søkefelt.fill(ord);
      await søkefelt.press('Enter');
    }

    dialog = await åpneLagreDialog(page);
    await expect(
      dialog.getByText('Søkeord som lagres:').locator('..'),
    ).toHaveText('Søkeord som lagres: «kokk», «servitør»');
    await expect(dialog.getByText(advarsel)).toBeVisible();
    await expect(
      dialog.getByRole('textbox', { name: 'Navn på søket' }),
    ).toHaveAccessibleDescription(
      `${advarsel} Søkeord som lagres: «kokk», «servitør» Maks 25 tegn.`,
    );
  });

  test('API-et avviser fødselsnummer i navn og søkeord', async ({ page }) => {
    await brukEgenMockbruker(page);
    for (const data of [
      { navn: syntetiskNummer, filter: '', fritekst: [] },
      { navn: 'Treff', filter: '', fritekst: [`kokk ${syntetiskNummer}`] },
    ]) {
      const respons = await page.request.post(endepunkt, { data });
      expect(respons.status()).toBe(400);
    }
  });

  test('Lagre som nytt er deaktivert når det finnes ti søk, og søket som erstattes må velges', async ({
    page,
  }) => {
    await brukEgenMockbruker(page);
    for (let i = 1; i <= 10; i++) {
      await opprettSøk(page, `Søk ${i}`, 'sortering=nyeste');
    }
    await gotoApp(page, '/rekrutteringstreff?sortering=eldste');

    const dialog = await åpneLagreDialog(page);
    await expect(
      dialog.getByRole('radio', { name: /Lagre som nytt søk/ }),
    ).toBeDisabled();
    await expect(
      dialog.getByRole('radio', { name: 'Erstatt et lagret søk' }),
    ).toBeChecked();

    const velgSøk = dialog.getByRole('combobox', {
      name: 'Søk som skal erstattes',
    });
    const navn = dialog.getByRole('textbox', { name: 'Navn på søket' });
    // Med ti søk starter dialogen på erstatting, og fokus går til det valgte alternativet.
    await expect(
      dialog.getByRole('radio', { name: 'Erstatt et lagret søk' }),
    ).toBeFocused();
    await expect(velgSøk).toHaveValue('');
    await expect(navn).toHaveCount(0);

    await dialog.getByRole('button', { name: 'Erstatt søk' }).click();
    await expect(
      dialog.getByText('Du må velge søket som skal erstattes.'),
    ).toBeVisible();

    await velgSøk.selectOption({ label: 'Søk 3' });
    await expect(navn).toHaveCount(0);
  });

  test('Første lagring blir ikke standard og kan sendes med Enter', async ({
    page,
  }) => {
    await brukEgenMockbruker(page);
    await gotoApp(page, '/rekrutteringstreff?sortering=nyeste');

    const dialog = await åpneLagreDialog(page);
    await expect(dialog.getByRole('radio')).toHaveCount(0);
    await expect(
      dialog.getByText('kan du gjøre det til standard i Administrer søk', {
        exact: false,
      }),
    ).toBeVisible();

    const navn = dialog.getByRole('textbox', { name: 'Navn på søket' });
    await navn.fill('Nyeste treff');
    await navn.press('Enter');

    await expect(dialog).toBeHidden();
    await expect(page.getByRole('button', { name: 'Lagre søk' })).toBeFocused();
    await expect(page.getByText('Valgt søk:')).toContainText('Nyeste treff');

    // Neste gang siden åpnes, er det vanlig søk som brukes.
    await gotoApp(page, '/rekrutteringstreff');
    await expect(
      page.getByRole('radio', { name: 'Sist oppdaterte' }),
    ).toBeChecked();
    await expect(page.getByText('Valgt søk:')).toHaveCount(0);
    await åpneMeny(page);
    await expect(
      page.getByRole('menuitemradio', { name: /Vanlig søk/ }),
    ).toContainText('Standard');
    await expect(
      page.getByRole('menuitemradio', { name: /Nyeste treff/ }),
    ).not.toContainText('Standard');
    await page.keyboard.press('Escape');
  });

  test('Valgt søk vises bare så lenge filtrene er uendret', async ({
    page,
  }) => {
    await brukEgenMockbruker(page);
    await opprettSøk(page, 'Eldste treff', 'sortering=eldste');
    await gotoApp(page, '/rekrutteringstreff?side=1');

    await expect(page.getByText('Valgt søk:')).toHaveCount(0);
    await åpneMeny(page);
    await page.getByRole('menuitemradio', { name: /Eldste treff/ }).click();
    await expect(page.getByText('Valgt søk:')).toContainText('Eldste treff');

    await åpneMeny(page);
    await expect(
      page.getByRole('menuitemradio', { name: /Eldste treff/ }),
    ).toBeChecked();
    await page.keyboard.press('Escape');

    await page.getByRole('radio', { name: 'Nyeste' }).click();
    await expect(page.getByText('Valgt søk:')).toHaveCount(0);

    await åpneMeny(page);
    await expect(
      page.getByRole('menuitemradio', { name: /Eldste treff/ }),
    ).not.toBeChecked();
    await page.keyboard.press('Escape');
  });

  test('Lagre søk er deaktivert når et valgt søk ikke er endret', async ({
    page,
  }) => {
    await brukEgenMockbruker(page);
    await opprettSøk(page, 'Eldste treff', 'sortering=eldste');
    await gotoApp(page, '/rekrutteringstreff?side=1');

    await åpneMeny(page);
    await page.getByRole('menuitemradio', { name: /Eldste treff/ }).click();
    await expect(page.getByText('Valgt søk:')).toContainText('Eldste treff');

    const lagreknapp = page.getByRole('button', { name: 'Lagre søk' });
    await expect(lagreknapp).toBeDisabled();

    await page.getByRole('radio', { name: 'Nyeste' }).click();
    await expect(page.getByText('Valgt søk:')).toHaveCount(0);
    await expect(lagreknapp).toBeEnabled();
  });

  test('Administrer søk: endre navn på et lagret søk', async ({ page }) => {
    await brukEgenMockbruker(page);
    await opprettSøk(page, 'Eldste treff', 'sortering=eldste');
    await gotoApp(page, '/rekrutteringstreff');

    await åpneMeny(page);
    await page.getByRole('menuitem', { name: 'Administrer søk' }).click();
    const dialog = page.getByRole('dialog', {
      name: 'Administrer søk (1 av 10)',
    });
    await dialog
      .getByRole('button', { name: 'Endre navn: Eldste treff' })
      .click();

    const endre = page.getByRole('dialog', { name: 'Endre navn på søket' });
    const navn = endre.getByRole('textbox', { name: 'Navn på søket' });
    await expect(navn).toHaveValue('Eldste treff');
    await expect(navn).toBeFocused();

    await navn.fill('');
    await endre.getByRole('button', { name: 'Lagre navn' }).click();
    await expect(
      endre.getByText('Du må skrive et navn på søket.'),
    ).toBeVisible();

    await navn.fill('Eldste først');
    await navn.press('Enter');

    await expect(dialog).toBeVisible();
    await expect(
      dialog.getByText('«Eldste treff» heter nå «Eldste først».'),
    ).toBeVisible();
    await expect(
      dialog.getByRole('button', { name: 'Endre navn: Eldste først' }),
    ).toBeFocused();
  });

  test('Lagrede søk kan brukes med tastatur', async ({ page }) => {
    await brukEgenMockbruker(page);
    await opprettSøk(page, 'Eldste treff', 'sortering=eldste');
    await opprettSøk(page, 'Nyeste treff', 'sortering=nyeste');
    await gotoApp(page, '/rekrutteringstreff?side=1');

    const menyknapp = page.getByRole('button', { name: 'Lagrede søk' });
    await menyknapp.focus();
    await page.keyboard.press('Enter');
    await expect(page.getByRole('menu')).toBeFocused();
    await expect(page.getByRole('menuitemradio')).toHaveCount(3);
    await page.keyboard.press('ArrowDown');
    await expect(
      page.getByRole('menuitemradio', { name: /Vanlig søk/ }),
    ).toBeFocused();
    await page.keyboard.press('ArrowDown');
    await expect(
      page.getByRole('menuitemradio', { name: /Eldste treff/ }),
    ).toBeFocused();
    await page.keyboard.press('ArrowDown');
    await expect(
      page.getByRole('menuitemradio', { name: /Nyeste treff/ }),
    ).toBeFocused();
    await page.keyboard.press('Enter');

    await expect(page.getByText('Valgt søk:')).toContainText('Nyeste treff');
    await expect(menyknapp).toBeFocused();

    await page.keyboard.press('Enter');
    await expect(page.getByRole('menu')).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(page.getByRole('menu')).toHaveCount(0);
    await expect(menyknapp).toBeFocused();
  });

  test('Lagrede søk står på linje med standardsøket i stillingssøket', async ({
    page,
  }) => {
    await brukEgenMockbruker(page);
    await opprettSøk(page, 'Eldste treff', 'sortering=eldste');
    await opprettSøk(page, 'Nyeste treff', 'sortering=nyeste');
    await gotoApp(page, '/rekrutteringstreff?side=1');

    const menyknapp = page.getByRole('button', { name: 'Lagrede søk' });
    await åpneMeny(page);
    await page.getByRole('menuitemradio', { name: /Nyeste treff/ }).click();
    // «Valgt søk» er venstrestilt med knappen.
    const knapp = await menyknapp.boundingBox();
    const valgt = await page
      .locator('p', { hasText: 'Valgt søk:' })
      .boundingBox();
    const søkefelt = await page
      .getByRole('searchbox', { name: 'Søk i treff' })
      .boundingBox();
    const lagreknapp = await page
      .getByRole('button', { name: 'Lagre søk' })
      .boundingBox();
    expect(knapp && valgt && søkefelt && lagreknapp).toBeTruthy();
    expect(Math.round(valgt!.x)).toBe(Math.round(knapp!.x));

    // Testen sammenligner med stillingssøket og må oppdateres hvis layouten der endres.
    await gotoApp(page, '/stilling');
    const stillingSøkefelt = await page
      .getByRole('searchbox', { name: 'Søk i stillinger' })
      .boundingBox();
    const standardsøkknapp = page.getByRole('button', {
      name: 'Bruk standardsøk',
    });
    const standardsøk = await standardsøkknapp.boundingBox();
    // Lagreknappen i stillingssøket har ikke tilgjengelig navn, så den finnes via raden.
    const stillingLagreknapp = await standardsøkknapp
      .locator('xpath=ancestor::div[contains(@class,"flex-nowrap")][1]')
      .locator('button')
      .last()
      .boundingBox();
    expect(Math.round(knapp!.y - søkefelt!.y)).toBe(
      Math.round(standardsøk!.y - stillingSøkefelt!.y),
    );
    expect(Math.round(knapp!.height)).toBe(Math.round(standardsøk!.height));
    expect({
      bredde: Math.round(lagreknapp!.width),
      høyde: Math.round(lagreknapp!.height),
    }).toEqual({
      bredde: Math.round(stillingLagreknapp!.width),
      høyde: Math.round(stillingLagreknapp!.height),
    });
  });

  test('Lagre-dialogen starter på nytt søk og foreslår sist valgte søk ved erstatting', async ({
    page,
  }) => {
    await brukEgenMockbruker(page);
    await opprettSøk(page, 'Annet søk', 'sortering=eldste');
    const id = await opprettSøk(page, 'Gammelt søk', 'sortering=nyeste');
    await gotoApp(page, '/rekrutteringstreff');

    await åpneMeny(page);
    await page.getByRole('menuitemradio', { name: /Gammelt søk/ }).click();
    await expect(page.getByText('Valgt søk:')).toContainText('Gammelt søk');
    await page.getByRole('radio', { name: 'Eldste' }).click();
    await expect(page.getByText('Valgt søk:')).toHaveCount(0);

    const dialog = await åpneLagreDialog(page);
    await expect(
      dialog.getByRole('radio', { name: 'Lagre som nytt søk' }),
    ).toBeChecked();
    await dialog.getByRole('radio', { name: 'Erstatt et lagret søk' }).check();
    // Søket som sist var valgt, foreslås selv om filtrene er endret.
    await expect(
      dialog.getByRole('combobox', { name: 'Søk som skal erstattes' }),
    ).toHaveValue(id);
    await dialog.getByRole('button', { name: 'Erstatt søk' }).click();
    await expect(dialog).toBeHidden();
    await expect(page.getByText('Valgt søk:')).toContainText('Gammelt søk');
  });

  test('Administrer søk: gjør til standard og slett med bekreftelse', async ({
    page,
  }) => {
    await brukEgenMockbruker(page);
    await opprettSøk(page, 'Første', 'sortering=nyeste');
    await opprettSøk(page, 'Andre', 'sortering=eldste');
    await gotoApp(page, '/rekrutteringstreff');

    await åpneMeny(page);
    await page.getByRole('menuitem', { name: 'Administrer søk' }).click();
    const dialog = page.getByRole('dialog', {
      name: 'Administrer søk (2 av 10)',
    });
    await expect(dialog).toBeVisible();

    await dialog
      .getByRole('button', { name: 'Gjør til standard: Andre' })
      .click();
    await expect(
      dialog.getByRole('button', { name: 'Gjør til standard: Første' }),
    ).toBeVisible();
    await expect(dialog.getByText('Standard', { exact: true })).toHaveCount(1);

    await dialog.getByRole('button', { name: 'Slett: Første' }).click();
    const bekreft = page.getByRole('dialog', { name: 'Slett lagret søk' });
    await expect(bekreft.getByText('Vil du slette «Første»?')).toBeVisible();
    await expect(bekreft.getByRole('button', { name: 'Avbryt' })).toBeFocused();

    await page.keyboard.press('Escape');
    await expect(dialog).toBeVisible();
    await expect(
      dialog.getByRole('button', { name: 'Slett: Første' }),
    ).toBeFocused();

    await dialog.getByRole('button', { name: 'Slett: Første' }).click();
    await bekreft.getByRole('button', { name: 'Slett', exact: true }).click();

    const etterSletting = page.getByRole('dialog', {
      name: 'Administrer søk (1 av 10)',
    });
    await expect(etterSletting).toBeVisible();
    await expect(etterSletting.getByText('«Første» er slettet.')).toBeVisible();
    await expect(
      etterSletting.getByRole('button', { name: 'Lukk' }).last(),
    ).toBeFocused();

    await etterSletting.getByRole('button', { name: 'Lukk' }).last().click();
    await expect(
      page.getByRole('button', { name: 'Lagrede søk' }),
    ).toBeFocused();
  });

  test('Administrer søk: vanlig søk står over listen og kan velges som standard igjen', async ({
    page,
  }) => {
    await brukEgenMockbruker(page);
    await opprettSøk(page, 'Eldste treff', 'sortering=eldste');
    await gotoApp(page, '/rekrutteringstreff');

    await åpneMeny(page);
    await page.getByRole('menuitem', { name: 'Administrer søk' }).click();
    const dialog = page.getByRole('dialog', {
      name: 'Administrer søk (1 av 10)',
    });
    const liste = dialog.getByRole('list', { name: 'Lagrede søk' });
    await expect(liste.getByRole('listitem')).toHaveCount(1);
    await expect(liste.getByText('Vanlig søk')).toHaveCount(0);
    await expect(dialog.getByText('Standard', { exact: true })).toHaveCount(1);
    await expect(
      dialog.getByRole('button', { name: 'Gjør til standard: Vanlig søk' }),
    ).toHaveCount(0);
    await expect(
      dialog.getByRole('button', { name: /Slett: Vanlig søk/ }),
    ).toHaveCount(0);

    await dialog
      .getByRole('button', { name: 'Gjør til standard: Eldste treff' })
      .click();
    const vanligSøkKnapp = dialog.getByRole('button', {
      name: 'Gjør til standard: Vanlig søk',
    });
    await expect(vanligSøkKnapp).toBeVisible();

    await vanligSøkKnapp.click();
    await expect(dialog.getByText('Vanlig søk er nå standard.')).toBeVisible();
    await expect(
      dialog.getByRole('button', { name: 'Bruk Vanlig søk' }),
    ).toBeFocused();
    await expect(
      dialog.getByRole('button', { name: 'Gjør til standard: Eldste treff' }),
    ).toBeVisible();

    // Valget overlever ny åpning av siden.
    await gotoApp(page, '/rekrutteringstreff');
    await expect(
      page.getByRole('radio', { name: 'Sist oppdaterte' }),
    ).toBeChecked();
    await expect(page.getByText('Valgt søk:')).toHaveCount(0);
  });

  test('Administrer søk: vanlig søk kan tas i bruk', async ({ page }) => {
    await brukEgenMockbruker(page);
    await opprettStandardsøk(page, 'Eldste først', 'sortering=eldste');
    await gotoApp(page, '/rekrutteringstreff');
    await expect(page.getByRole('radio', { name: 'Eldste' })).toBeChecked();

    await åpneMeny(page);
    await page.getByRole('menuitem', { name: 'Administrer søk' }).click();
    const dialog = page.getByRole('dialog', {
      name: 'Administrer søk (1 av 10)',
    });
    await dialog.getByRole('button', { name: 'Bruk Vanlig søk' }).click();

    await expect(dialog).toBeHidden();
    await expect(
      page.getByRole('radio', { name: 'Sist oppdaterte' }),
    ).toBeChecked();
    await expect(page.getByText('Valgt søk:')).toHaveCount(0);
  });

  test('Administrer søk: navnet tar søket i bruk', async ({ page }) => {
    await brukEgenMockbruker(page);
    await opprettSøk(page, 'Eldste først', 'sortering=eldste');
    await gotoApp(page, '/rekrutteringstreff');

    await åpneMeny(page);
    await page.getByRole('menuitem', { name: 'Administrer søk' }).click();
    const dialog = page.getByRole('dialog', {
      name: 'Administrer søk (1 av 10)',
    });
    await dialog
      .getByRole('button', { name: 'Bruk søket Eldste først' })
      .click();

    await expect(dialog).toBeHidden();
    await expect(page.getByRole('radio', { name: 'Eldste' })).toBeChecked();
    await expect(page.getByText('Valgt søk:')).toContainText('Eldste først');
  });

  test('På smal skjerm åpner Filtrer panelet med lagrede søk', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 375, height: 800 });
    await brukEgenMockbruker(page);
    await opprettSøk(page, 'Mobilsøk', 'sortering=eldste');
    await gotoApp(page, '/rekrutteringstreff');

    await page.getByRole('button', { name: 'Filtrer' }).click();
    const panel = page.getByRole('dialog', { name: 'Filtrer' });
    await expect(panel).toBeVisible();

    await panel.getByRole('button', { name: 'Lagrede søk' }).click();
    await page.getByRole('menuitemradio', { name: /Mobilsøk/ }).click();
    await expect(
      page.getByRole('radio', { name: 'Eldste' }).last(),
    ).toBeChecked();
  });

  test('Menylenken bruker standardsøket med filtre og søkeord', async ({
    page,
  }) => {
    await brukEgenMockbruker(page);
    await opprettStandardsøk(page, 'Mitt standardsøk', 'sortering=eldste', [
      'lager',
    ]);

    await gotoApp(page, '/rekrutteringstreff?brukStandardsok=true');

    await expect(page.getByRole('radio', { name: 'Eldste' })).toBeChecked();
    await expect(
      page.getByRole('button', { name: 'Lager slett' }),
    ).toBeVisible();
    await expect(page).not.toHaveURL(/brukStandardsok/);
  });

  test('Menylenken bruker standardsøket én gang per menyinngang', async ({
    page,
  }) => {
    await brukEgenMockbruker(page);
    await opprettStandardsøk(page, 'Mitt standardsøk', 'sortering=eldste');
    // Filtre i URL-en hindrer at standardsøket brukes allerede når siden åpnes.
    await gotoApp(page, '/rekrutteringstreff?statuser=AVLYST');
    await expect(page.getByText('Valgt søk:')).toHaveCount(0);

    const brukskall: string[] = [];
    page.on('request', (request) => {
      if (
        request.url().includes(endepunkt) &&
        (request.url() !== endepunkt || request.method() !== 'GET')
      ) {
        brukskall.push(request.url());
      }
    });
    const menylink = page.locator('a[aria-label="Rekrutteringstreff"]');

    await menylink.click();
    await expect(page).not.toHaveURL(/brukStandardsok/);
    await expect(page.getByRole('radio', { name: 'Eldste' })).toBeChecked();
    await expect(page.getByText('Valgt søk:')).toContainText(
      'Mitt standardsøk',
    );
    await expect.poll(() => brukskall).toHaveLength(1);

    await menylink.click();
    await expect(page).not.toHaveURL(/brukStandardsok/);
    await expect(page.getByRole('radio', { name: 'Eldste' })).toBeChecked();
    await expect.poll(() => brukskall).toHaveLength(2);
  });

  test('Menylenken gir vanlig søk når veilederen ikke har standardsøk', async ({
    page,
  }) => {
    await brukEgenMockbruker(page);
    await opprettSøk(page, 'Ikke standard', 'sortering=eldste');

    await gotoApp(page, '/rekrutteringstreff?brukStandardsok=true');

    await expect(
      page.getByRole('radio', { name: 'Sist oppdaterte' }),
    ).toBeChecked();
    await expect(page).not.toHaveURL(/brukStandardsok/);
  });

  test('Viser merknad for søk som snart slettes, og den forsvinner når søket brukes', async ({
    page,
  }) => {
    await brukEgenMockbruker(page, 'MED-EKSEMPELDATA');
    await gotoApp(page, '/rekrutteringstreff');

    await åpneMeny(page);
    const snartSlettet = page.getByRole('menuitemradio', {
      name: /Fullførte i fjor/,
    });
    await expect(snartSlettet).toContainText('Slettes snart');
    await expect(
      page.getByRole('menuitemradio', { name: /Publiserte i Oslo/ }),
    ).toContainText('Standard');
    await snartSlettet.click();
    await expect(page).toHaveURL(/sortering=eldste/);

    await åpneMeny(page);
    await expect(
      page.getByRole('menuitemradio', { name: /Fullførte i fjor/ }),
    ).not.toContainText('Slettes');
  });

  test('Siden åpnes med vanlig søk når ingen lagrede søk er valgt som standard', async ({
    page,
  }) => {
    await brukEgenMockbruker(page);
    await opprettSøk(page, 'Første søk', 'sortering=eldste', ['lager']);

    await gotoApp(page, '/rekrutteringstreff');

    await expect(
      page.getByRole('radio', { name: 'Sist oppdaterte' }),
    ).toBeChecked();
    await expect(page.getByText('Valgt søk:')).toHaveCount(0);
    await expect(page.getByRole('button', { name: 'Lager slett' })).toHaveCount(
      0,
    );
  });

  test('Siden åpnes med standardsøket og viser navnet', async ({ page }) => {
    await brukEgenMockbruker(page);
    await opprettSøk(page, 'Annet søk', 'statuser=AVLYST');
    await opprettStandardsøk(page, 'Mitt standardsøk', 'sortering=eldste', [
      'lager',
    ]);

    await gotoApp(page, '/rekrutteringstreff');

    await expect(page.getByText('Valgt søk:')).toContainText(
      'Mitt standardsøk',
    );
    await expect(page.getByRole('radio', { name: 'Eldste' })).toBeChecked();
    await expect(
      page.getByRole('button', { name: 'Lager slett' }),
    ).toBeVisible();
    await expect(page).not.toHaveURL(/brukStandardsok/);
  });

  test('Filtre i URL-en går foran standardsøket', async ({ page }) => {
    await brukEgenMockbruker(page);
    await opprettStandardsøk(page, 'Mitt standardsøk', 'sortering=eldste');

    await gotoApp(page, '/rekrutteringstreff?statuser=AVLYST');

    await expect(page).toHaveURL(/statuser=AVLYST/);
    await expect(page).not.toHaveURL(/sortering=eldste/);
    await expect(page.getByText('Valgt søk:')).toHaveCount(0);
  });

  test('Sletting av standardsøket gjør vanlig søk til standard', async ({
    page,
  }) => {
    await brukEgenMockbruker(page);
    await opprettStandardsøk(page, 'Standard', 'sortering=eldste');
    await opprettSøk(page, 'Neste', 'sortering=nyeste');
    await gotoApp(page, '/rekrutteringstreff');

    await åpneMeny(page);
    await page.getByRole('menuitem', { name: 'Administrer søk' }).click();
    const dialog = page.getByRole('dialog', {
      name: 'Administrer søk (2 av 10)',
    });
    await dialog.getByRole('button', { name: 'Slett: Standard' }).click();
    await page
      .getByRole('dialog', { name: 'Slett lagret søk' })
      .getByRole('button', { name: 'Slett', exact: true })
      .click();

    const etterSletting = page.getByRole('dialog', {
      name: 'Administrer søk (1 av 10)',
    });
    await expect(
      etterSletting.getByText(
        '«Standard» er slettet. Vanlig søk er nå standard.',
      ),
    ).toBeVisible();
    await expect(
      etterSletting.getByRole('button', { name: 'Gjør til standard: Neste' }),
    ).toBeVisible();
    await expect(
      etterSletting.getByRole('button', {
        name: 'Gjør til standard: Vanlig søk',
      }),
    ).toHaveCount(0);
  });

  test('Fjern alle filtre setter filtre og sortering tilbake til standard', async ({
    page,
  }) => {
    await brukEgenMockbruker(page);
    await gotoApp(page, '/rekrutteringstreff');
    const fjernAlle = page.getByRole('button', { name: 'Fjern alle filtre' });
    await expect(fjernAlle).toHaveCount(0);

    await gotoApp(page, '/rekrutteringstreff?sortering=eldste&statuser=AVLYST');
    await expect(page.getByRole('radio', { name: 'Eldste' })).toBeChecked();
    await fjernAlle.click();

    await expect(page).toHaveURL(/\/rekrutteringstreff$/);
    await expect(
      page.getByRole('radio', { name: 'Sist oppdaterte' }),
    ).toBeChecked();
    await expect(fjernAlle).toHaveCount(0);
  });

  test('Menyen viser vanlig søk og standardsøket øverst og resten alfabetisk', async ({
    page,
  }) => {
    await brukEgenMockbruker(page);
    await opprettStandardsøk(page, 'Østlandet', 'sortering=nyeste');
    await opprettSøk(page, 'Bergen', 'sortering=eldste');
    await opprettSøk(page, 'Arendal', 'sortering=eldste');
    await gotoApp(page, '/rekrutteringstreff?side=1');

    await åpneMeny(page);
    await expect(page.getByRole('menuitemradio')).toHaveText([
      /Vanlig søk/,
      /Østlandet/,
      /Arendal/,
      /Bergen/,
    ]);

    // Rekkefølgen er den samme etter at et søk er brukt.
    await page.getByRole('menuitemradio', { name: /Bergen/ }).click();
    await expect(page.getByText('Valgt søk:')).toContainText('Bergen');
    await åpneMeny(page);
    await expect(page.getByRole('menuitemradio')).toHaveText([
      /Vanlig søk/,
      /Østlandet/,
      /Arendal/,
      /Bergen/,
    ]);
  });

  test('Valgt søk og søkeord beholdes ved refresh, men ikke etter endrede filtre', async ({
    page,
  }) => {
    await brukEgenMockbruker(page);
    await opprettStandardsøk(page, 'Eldste kokketreff', 'sortering=eldste', [
      'kokk',
    ]);
    await gotoApp(page, '/rekrutteringstreff');

    const valgtSøk = page.getByText('Valgt søk:');
    const kokk = page.getByRole('button', { name: 'Kokk slett' });
    await expect(valgtSøk).toContainText('Eldste kokketreff');
    await expect(page).toHaveURL(/lagretSok=/);

    await page.reload();
    await expect(valgtSøk).toContainText('Eldste kokketreff');
    await expect(kokk).toBeVisible();
    await expect(page.getByRole('radio', { name: 'Eldste' })).toBeChecked();
    expect(page.url()).not.toContain('kokk');
    await åpneMeny(page);
    await expect(
      page.getByRole('menuitemradio', { name: /Eldste kokketreff/ }),
    ).toBeChecked();
    await page.keyboard.press('Escape');

    await page.getByRole('radio', { name: 'Nyeste' }).click();
    await expect(valgtSøk).toHaveCount(0);
    await expect(page).not.toHaveURL(/lagretSok=/);

    await page.reload();
    await expect(page.getByRole('radio', { name: 'Nyeste' })).toBeChecked();
    await expect(valgtSøk).toHaveCount(0);
    await expect(kokk).toHaveCount(0);
  });
});
