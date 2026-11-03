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
  test('rundtur for alle filtre gir sorterte nøkler og sorterte verdier tilbake', () => {
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
    // Verdiene sorteres, så samme valg gir samme filter uansett rekkefølgen de ble valgt i.
    expect(tolkLagretSøkFilter(filter)).toEqual({
      ...filtre,
      statuser: [
        RekrutteringstreffStatus.FULLFØRT,
        RekrutteringstreffStatus.UTKAST,
      ],
    });
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
      'fylker=03%2C11&kommuner=0301%2C1103&kontorer=Kontor+1%2CKontor%262&publisertStatuser=%C3%85PEN_FOR_S%C3%98KERE&sortering=eldste&statuser=FULLF%C3%98RT%2CUTKAST&visning=valgte_kontorer',
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
    await expect(page.getByText('Lagret søk:')).toContainText(
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
    await expect(page.getByText('Lagret søk:')).toHaveCount(0);
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

  test('API-et avviser ugyldige filtre, for mange søkeord og ukjent domene', async ({
    page,
  }) => {
    await brukEgenMockbruker(page);
    for (const data of [
      { navn: 'Ukjent parameter', filter: 'ukjent=1', fritekst: [] },
      { navn: 'Dobbel parameter', filter: 'fylker=03&fylker=11', fritekst: [] },
      { navn: 'Ugyldig fylke', filter: 'fylker=3', fritekst: [] },
      { navn: 'Spørsmålstegn', filter: '?sortering=eldste', fritekst: [] },
      {
        navn: 'Langt filter',
        filter: `fylker=${'0'.repeat(2000)}`,
        fritekst: [],
      },
      {
        navn: 'Mange søkeord',
        filter: '',
        fritekst: Array.from({ length: 11 }, (_, i) => `ord${i}`),
      },
      { navn: 'Lange søkeord', filter: '', fritekst: ['a'.repeat(201)] },
    ]) {
      const respons = await page.request.post(endepunkt, { data });
      expect(respons.status(), data.navn).toBe(400);
    }

    const ukjentDomene = endepunkt.replace(/rekrutteringstreff$/, 'ukjent');
    expect((await page.request.get(ukjentDomene)).status()).toBe(404);
    expect(
      (
        await page.request.post(ukjentDomene, {
          data: { navn: 'Søk', filter: '', fritekst: [] },
        })
      ).status(),
    ).toBe(404);

    const gyldig = await page.request.post(endepunkt, {
      data: {
        navn: 'Gyldig',
        filter: 'fylker=03,11&statuser=&sortering=eldste',
        fritekst: [' kokk ', ''],
      },
    });
    expect(gyldig.ok()).toBe(true);
    expect(await gyldig.json()).toMatchObject({ fritekst: ['kokk'] });
  });

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

    // Navnet på søket som erstattes, fylles inn og kan endres i samme operasjon.
    await velgSøk.selectOption({ label: 'Søk 3' });
    await expect(navn).toHaveValue('Søk 3');
    await velgSøk.selectOption({ label: 'Søk 4' });
    await expect(navn).toHaveValue('Søk 4');
    await navn.fill('');
    await dialog.getByRole('button', { name: 'Erstatt søk' }).click();
    await expect(
      dialog.getByText('Du må skrive et navn på søket.'),
    ).toBeVisible();

    await navn.fill('Eldste først');
    await dialog.getByRole('button', { name: 'Erstatt søk' }).click();
    await expect(dialog).toBeHidden();
    await expect(page.getByText('Lagret søk:')).toContainText('Eldste først');
    await åpneMeny(page);
    await expect(
      page.getByRole('menuitemradio', { name: /Søk 4/ }),
    ).toHaveCount(0);
  });

  test('Med ti søk kan veilederen gå fra lagre-dialogen til Administrer søk og slette et søk', async ({
    page,
  }) => {
    await brukEgenMockbruker(page);
    for (let i = 1; i <= 10; i++) {
      await opprettSøk(page, `Søk ${i}`, 'sortering=nyeste');
    }
    await gotoApp(page, '/rekrutteringstreff?sortering=eldste');

    const lagreDialog = await åpneLagreDialog(page);
    await lagreDialog
      .getByRole('button', { name: 'Slett søk i Administrer søk' })
      .click();
    await expect(lagreDialog).toBeHidden();

    const administrer = page.getByRole('dialog', {
      name: 'Administrer søk (10 av 10)',
    });
    await expect(administrer).toBeVisible();
    await administrer
      .getByRole('button', { name: 'Slett: Søk 1', exact: true })
      .click();
    await page
      .getByRole('dialog', { name: 'Slett lagret søk' })
      .getByRole('button', { name: 'Slett', exact: true })
      .click();
    await expect(
      page.getByRole('dialog', { name: 'Administrer søk (9 av 10)' }),
    ).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(page.getByRole('dialog')).toHaveCount(0);

    // Fokus går tilbake til disketten, og nå kan søket lagres som nytt.
    const lagreknapp = page.getByRole('button', { name: 'Lagre søk' });
    await expect(lagreknapp).toBeFocused();
    await lagreknapp.click();
    await expect(
      page
        .getByRole('dialog', { name: 'Lagre søk' })
        .getByRole('radio', { name: 'Lagre som nytt søk' }),
    ).toBeEnabled();
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
    await expect(
      page.getByRole('button', { name: 'Lagrede søk' }),
    ).toBeFocused();
    await expect(page.getByText('Lagret søk:')).toContainText('Nyeste treff');

    // Neste gang siden åpnes, er det vanlig søk som brukes.
    await gotoApp(page, '/rekrutteringstreff');
    await expect(
      page.getByRole('radio', { name: 'Sist oppdaterte' }),
    ).toBeChecked();
    await expect(page.getByText('Lagret søk:')).toHaveCount(0);
    await åpneMeny(page);
    await expect(
      page.getByRole('menuitemradio', { name: /Vanlig søk/ }),
    ).toContainText('Standard');
    await expect(
      page.getByRole('menuitemradio', { name: /Nyeste treff/ }),
    ).not.toContainText('Standard');
    await page.keyboard.press('Escape');
  });

  test('Lagret søk vises bare så lenge filtrene er uendret', async ({
    page,
  }) => {
    await brukEgenMockbruker(page);
    await opprettSøk(page, 'Eldste treff', 'sortering=eldste');
    await gotoApp(page, '/rekrutteringstreff?side=1');

    await expect(page.getByText('Lagret søk:')).toHaveCount(0);
    await åpneMeny(page);
    await page.getByRole('menuitemradio', { name: /Eldste treff/ }).click();
    await expect(page.getByText('Lagret søk:')).toContainText('Eldste treff');

    await åpneMeny(page);
    await expect(
      page.getByRole('menuitemradio', { name: /Eldste treff/ }),
    ).toBeChecked();
    await page.keyboard.press('Escape');

    await page.getByRole('radio', { name: 'Nyeste' }).click();
    await expect(page.getByText('Lagret søk:')).toHaveCount(0);

    await åpneMeny(page);
    await expect(
      page.getByRole('menuitemradio', { name: /Eldste treff/ }),
    ).not.toBeChecked();
    await page.keyboard.press('Escape');
  });

  test('Et lagret filter med annen rekkefølge og standardverdier regnes som samme søk', async ({
    page,
  }) => {
    await brukEgenMockbruker(page);
    // Usortert, og med standardverdiene for visning og statuser. Frontend lagrer det som `sortering=eldste`.
    await opprettStandardsøk(
      page,
      'Usortert kokketreff',
      'visning=alle&statuser=PUBLISERT&sortering=eldste',
      ['kokk'],
    );
    await gotoApp(page, '/rekrutteringstreff?brukStandardsok=true');

    const statuslinje = page.getByText('Lagret søk:');
    const kokk = page.getByRole('button', { name: 'Kokk slett' });
    await expect(statuslinje).toContainText('Usortert kokketreff');
    await expect(page.getByRole('radio', { name: 'Eldste' })).toBeChecked();
    await expect(
      page.getByRole('button', { name: 'Lagre søk' }),
    ).toBeDisabled();
    await expect(page).toHaveURL(/sortering=eldste/);

    await page.reload();
    await expect(statuslinje).toContainText('Usortert kokketreff');
    await expect(kokk).toBeVisible();
  });

  test('Lagre søk er deaktivert når et lagret søk vises og ikke er endret', async ({
    page,
  }) => {
    await brukEgenMockbruker(page);
    await opprettSøk(page, 'Eldste treff', 'sortering=eldste');
    await gotoApp(page, '/rekrutteringstreff?side=1');

    await åpneMeny(page);
    await page.getByRole('menuitemradio', { name: /Eldste treff/ }).click();
    await expect(page.getByText('Lagret søk:')).toContainText('Eldste treff');

    const lagreknapp = page.getByRole('button', { name: 'Lagre søk' });
    await expect(lagreknapp).toBeDisabled();

    await page.getByRole('radio', { name: 'Nyeste' }).click();
    await expect(page.getByText('Lagret søk:')).toHaveCount(0);
    await expect(lagreknapp).toBeEnabled();
  });

  test('Lagret søk vises igjen når filtrene og søkeordene settes tilbake', async ({
    page,
  }) => {
    await brukEgenMockbruker(page);
    await opprettSøk(page, 'Eldste kokketreff', 'sortering=eldste', [
      'kokk',
      'lager',
    ]);
    await gotoApp(page, '/rekrutteringstreff');
    const statuslinje = page.getByText('Lagret søk:');
    const lagreknapp = page.getByRole('button', { name: 'Lagre søk' });
    const søkefelt = page.getByRole('searchbox', { name: 'Søk i treff' });

    await page.getByRole('radio', { name: 'Eldste' }).click();
    // Søkeordene i en annen rekkefølge enn i det lagrede søket, og ett av dem to ganger.
    for (const ord of ['lager', 'kokk', 'lager']) {
      await søkefelt.fill(ord);
      await søkefelt.press('Enter');
    }
    await expect(statuslinje).toContainText('Eldste kokketreff');
    await expect(lagreknapp).toBeDisabled();
    await expect(page.getByRole('button', { name: 'Lager slett' })).toHaveCount(
      1,
    );

    await page.getByRole('radio', { name: 'Nyeste' }).click();
    await expect(statuslinje).toHaveCount(0);
    await expect(lagreknapp).toBeEnabled();

    await page.getByRole('radio', { name: 'Eldste' }).click();
    await expect(statuslinje).toContainText('Eldste kokketreff');
    await åpneMeny(page);
    await expect(
      page.getByRole('menuitemradio', { name: /Eldste kokketreff/ }),
    ).toBeChecked();
    await page.keyboard.press('Escape');
  });

  test('Like søk fra to faner: det øverste er valgt, og Administrer søk viser dem', async ({
    page,
  }) => {
    await brukEgenMockbruker(page);
    // Backend godtar like søk. Det skjer når to faner lagrer det samme søket samtidig.
    await opprettSøk(page, 'Kokk A', 'sortering=eldste', ['kokk', 'lager']);
    await opprettSøk(page, 'Kokk B', 'sortering=eldste', ['lager', 'kokk']);
    await gotoApp(page, '/rekrutteringstreff');

    await åpneMeny(page);
    await page.getByRole('menuitemradio', { name: /Kokk B/ }).click();
    await expect(page.getByRole('radio', { name: 'Eldste' })).toBeChecked();
    await expect(page.getByText('Lagret søk:')).toContainText('Kokk A');
    await expect(
      page.getByRole('button', { name: 'Lagre søk' }),
    ).toBeDisabled();

    await åpneMeny(page);
    await page.getByRole('menuitem', { name: 'Administrer søk' }).click();
    const dialog = page.getByRole('dialog', { name: /Administrer søk/ });
    await expect(dialog.getByText('Likt søket «Kokk B»')).toBeVisible();
    await expect(dialog.getByText('Likt søket «Kokk A»')).toBeVisible();
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

    await expect(page.getByText('Lagret søk:')).toContainText('Nyeste treff');
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
    // «Lagret søk» er venstrestilt med knappen.
    const knapp = await menyknapp.boundingBox();
    const valgt = await page
      .locator('p', { hasText: 'Lagret søk:' })
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
    // Lagreknappen i stillingssøket har ikke tilgjengelig navn, så den finnes som knappen etter «Bruk standardsøk».
    const stillingLagreknapp = await standardsøkknapp
      .locator('xpath=../following-sibling::button[1]')
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
    await expect(page.getByText('Lagret søk:')).toContainText('Gammelt søk');
    const søkefelt = page.getByRole('searchbox', { name: 'Søk i treff' });
    await søkefelt.fill('kokk');
    await søkefelt.press('Enter');
    await expect(page.getByText('Lagret søk:')).toHaveCount(0);

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
    await expect(page.getByText('Lagret søk:')).toContainText('Gammelt søk');
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
    await expect(page.getByText('Lagret søk:')).toHaveCount(0);
  });

  test('Administrer søk: vanlig søk kan tas i bruk', async ({ page }) => {
    await brukEgenMockbruker(page);
    await opprettStandardsøk(page, 'Eldste først', 'sortering=eldste');
    await gotoApp(page, '/rekrutteringstreff?brukStandardsok=true');
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
    await expect(page.getByText('Lagret søk:')).toHaveCount(0);
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
    await expect(page.getByText('Lagret søk:')).toContainText('Eldste først');
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
    await expect(page.getByText('Lagret søk:')).toHaveCount(0);

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
    await expect(page.getByText('Lagret søk:')).toContainText(
      'Mitt standardsøk',
    );
    await expect.poll(() => brukskall).toHaveLength(1);

    await menylink.click();
    await expect(page).not.toHaveURL(/brukStandardsok/);
    await expect(page.getByRole('radio', { name: 'Eldste' })).toBeChecked();
    await expect.poll(() => brukskall).toHaveLength(2);
  });

  test('Menylenken fjerner søkeord når siden er åpen og veilederen ikke har standardsøk', async ({
    page,
  }) => {
    await brukEgenMockbruker(page);
    await gotoApp(page, '/rekrutteringstreff?sortering=eldste');

    const søkefelt = page.getByRole('searchbox', { name: 'Søk i treff' });
    await søkefelt.fill('kokk');
    await søkefelt.press('Enter');
    const kokk = page.getByRole('button', { name: 'Kokk slett' });
    await expect(kokk).toBeVisible();

    await page.locator('a[aria-label="Rekrutteringstreff"]').click();

    await expect(page).not.toHaveURL(/brukStandardsok/);
    await expect(
      page.getByRole('radio', { name: 'Sist oppdaterte' }),
    ).toBeChecked();
    await expect(kokk).toHaveCount(0);
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

  test('Menylenken gir vanlig søk når ingen lagrede søk er valgt som standard', async ({
    page,
  }) => {
    await brukEgenMockbruker(page);
    await opprettSøk(page, 'Første søk', 'sortering=eldste', ['lager']);

    await gotoApp(page, '/rekrutteringstreff?brukStandardsok=true');
    await expect(page).not.toHaveURL(/brukStandardsok/);

    await expect(
      page.getByRole('radio', { name: 'Sist oppdaterte' }),
    ).toBeChecked();
    await expect(page.getByText('Lagret søk:')).toHaveCount(0);
    await expect(page.getByRole('button', { name: 'Lager slett' })).toHaveCount(
      0,
    );
  });

  test('Standardsøket brukes fra menylenken, ikke når siden åpnes uten filtre', async ({
    page,
  }) => {
    await brukEgenMockbruker(page);
    await opprettSøk(page, 'Annet søk', 'statuser=AVLYST');
    await opprettStandardsøk(page, 'Mitt standardsøk', 'sortering=eldste', [
      'lager',
    ]);
    const statuslinje = page.getByText('Lagret søk:');
    const lager = page.getByRole('button', { name: 'Lager slett' });

    await gotoApp(page, '/rekrutteringstreff');
    await expect(
      page.getByRole('radio', { name: 'Sist oppdaterte' }),
    ).toBeChecked();
    await expect(statuslinje).toHaveCount(0);
    await expect(lager).toHaveCount(0);
    await expect(page).not.toHaveURL(/brukStandardsok/);

    await page.locator('a[aria-label="Rekrutteringstreff"]').click();
    await expect(statuslinje).toContainText('Mitt standardsøk');
    await expect(page.getByRole('radio', { name: 'Eldste' })).toBeChecked();
    await expect(lager).toBeVisible();
    await expect(page).not.toHaveURL(/brukStandardsok/);

    // Vanlig søk står seg ved refresh, selv om veilederen har et standardsøk.
    await åpneMeny(page);
    await page.getByRole('menuitemradio', { name: /Vanlig søk/ }).click();
    await expect(statuslinje).toHaveCount(0);
    // URL-en oppdateres litt etter klikket. Venter, så refresh ikke laster den gamle URL-en.
    await expect(page).toHaveURL(/\/rekrutteringstreff$/);
    await page.reload();
    await expect(
      page.getByRole('radio', { name: 'Sist oppdaterte' }),
    ).toBeChecked();
    await expect(statuslinje).toHaveCount(0);
    await expect(lager).toHaveCount(0);
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
    // Søkene må ha ulikt innhold. Ellers vises det øverste som valgt.
    await opprettSøk(page, 'Arendal', 'statuser=AVLYST');
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
    await expect(page.getByText('Lagret søk:')).toContainText('Bergen');
    await åpneMeny(page);
    await expect(page.getByRole('menuitemradio')).toHaveText([
      /Vanlig søk/,
      /Østlandet/,
      /Arendal/,
      /Bergen/,
    ]);
  });

  test('Lagret søk og søkeord beholdes ved refresh, og søkeordene står også etter endrede filtre', async ({
    page,
  }) => {
    await brukEgenMockbruker(page);
    await opprettStandardsøk(page, 'Eldste kokketreff', 'sortering=eldste', [
      'kokk',
    ]);
    await gotoApp(page, '/rekrutteringstreff?brukStandardsok=true');

    const statuslinje = page.getByText('Lagret søk:');
    const kokk = page.getByRole('button', { name: 'Kokk slett' });
    await expect(statuslinje).toContainText('Eldste kokketreff');
    await expect(page).toHaveURL(/sortering=eldste/);

    await page.reload();
    await expect(statuslinje).toContainText('Eldste kokketreff');
    await expect(kokk).toBeVisible();
    await expect(page.getByRole('radio', { name: 'Eldste' })).toBeChecked();
    expect(page.url()).not.toContain('kokk');
    await åpneMeny(page);
    await expect(
      page.getByRole('menuitemradio', { name: /Eldste kokketreff/ }),
    ).toBeChecked();
    await page.keyboard.press('Escape');

    await page.getByRole('radio', { name: 'Nyeste' }).click();
    await expect(statuslinje).toHaveCount(0);
    await expect(page).toHaveURL(/sortering=nyeste/);

    await page.reload();
    await expect(page.getByRole('radio', { name: 'Nyeste' })).toBeChecked();
    await expect(statuslinje).toHaveCount(0);
    await expect(kokk).toBeVisible();
  });

  test('Erstatt foreslår søket statuslinjen viste, også når det ikke er valgt i menyen', async ({
    page,
  }) => {
    await brukEgenMockbruker(page);
    await opprettSøk(page, 'Annet søk', 'sortering=eldste');
    const id = await opprettSøk(page, 'Nyeste treff', 'sortering=nyeste');
    await gotoApp(page, '/rekrutteringstreff?sortering=nyeste');

    const statuslinje = page.getByText('Lagret søk:');
    await expect(statuslinje).toContainText('Nyeste treff');
    const søkefelt = page.getByRole('searchbox', { name: 'Søk i treff' });
    await søkefelt.fill('lager');
    await søkefelt.press('Enter');
    await expect(statuslinje).toHaveCount(0);

    const dialog = await åpneLagreDialog(page);
    await dialog.getByRole('radio', { name: 'Erstatt et lagret søk' }).check();
    await expect(
      dialog.getByRole('combobox', { name: 'Søk som skal erstattes' }),
    ).toHaveValue(id);
  });

  test('Erstatt av et søk som er slettet i en annen fane, gir feilmelding og oppdatert liste', async ({
    page,
  }) => {
    await brukEgenMockbruker(page);
    await opprettSøk(page, 'Beholdes', 'sortering=eldste');
    const id = await opprettSøk(page, 'Slettes', 'sortering=nyeste');
    await gotoApp(page, '/rekrutteringstreff?statuser=AVLYST');

    const dialog = await åpneLagreDialog(page);
    await dialog.getByRole('radio', { name: 'Erstatt et lagret søk' }).check();
    const søkSomErstattes = dialog.getByRole('combobox', {
      name: 'Søk som skal erstattes',
    });
    await søkSomErstattes.selectOption(id);
    expect((await page.request.delete(`${endepunkt}/${id}`)).ok()).toBe(true);

    await dialog.getByRole('button', { name: 'Erstatt søk' }).click();
    await expect(
      dialog.getByText(
        'Fant ikke søket du ville erstatte. Det kan være slettet.',
      ),
    ).toBeVisible();
    await expect(dialog).toBeVisible();
    await expect(
      søkSomErstattes.getByRole('option', { name: 'Slettes' }),
    ).toHaveCount(0);
    await expect(
      søkSomErstattes.getByRole('option', { name: 'Beholdes' }),
    ).toHaveCount(1);
  });

  test('Et søk som er slettet i en annen fane, gir varsel og endrer ikke filtrene', async ({
    page,
  }) => {
    await brukEgenMockbruker(page);
    await opprettSøk(page, 'Beholdes', 'sortering=nyeste');
    const id = await opprettSøk(page, 'Slettes', 'sortering=eldste');
    await gotoApp(page, '/rekrutteringstreff');

    await åpneMeny(page);
    const slettes = page.getByRole('menuitemradio', { name: /Slettes/ });
    await expect(slettes).toBeVisible();
    expect((await page.request.delete(`${endepunkt}/${id}`)).ok()).toBe(true);
    await slettes.click();

    await expect(
      page.getByText(
        'Fant ikke det lagrede søket. Det kan være slettet fordi det ikke er brukt på seks måneder.',
      ),
    ).toBeVisible();
    await expect(
      page.getByRole('radio', { name: 'Sist oppdaterte' }),
    ).toBeChecked();
    expect(page.url()).not.toContain('sortering');
    await expect(page.getByText('Lagret søk:')).toHaveCount(0);

    await åpneMeny(page);
    await expect(
      page.getByRole('menuitemradio', { name: /Beholdes/ }),
    ).toBeVisible();
    await expect(
      page.getByRole('menuitemradio', { name: /Slettes/ }),
    ).toHaveCount(0);
  });
});

test.describe('Søket er uendret etter et treff', () => {
  test('filtre og søkeord som ikke er lagret, står når veilederen går tilbake og laster siden på nytt', async ({
    page,
  }) => {
    await brukEgenMockbruker(page);
    await gotoApp(page, '/rekrutteringstreff?sortering=nyeste');
    const søkefelt = page.getByRole('searchbox', { name: 'Søk i treff' });
    await søkefelt.fill('publisert');
    await søkefelt.press('Enter');
    const publisert = page.getByRole('button', { name: 'Publisert slett' });
    await expect(publisert).toBeVisible();
    const søkeUrl = page.url();

    await page.locator('a[href^="/rekrutteringstreff/"]').first().click();
    await expect(page).not.toHaveURL(søkeUrl);
    await page.goBack();

    await expect(page).toHaveURL(søkeUrl);
    await expect(page.getByRole('radio', { name: 'Nyeste' })).toBeChecked();
    await expect(publisert).toBeVisible();
    await expect(page.getByText('Lagret søk:')).toHaveCount(0);

    await page.reload();
    await expect(publisert).toBeVisible();
  });

  test('søkeord som kan være et fødselsnummer, huskes ikke i fanen', async ({
    page,
  }) => {
    await brukEgenMockbruker(page);
    await gotoApp(page, '/rekrutteringstreff?sortering=nyeste');
    const søkefelt = page.getByRole('searchbox', { name: 'Søk i treff' });
    for (const ord of ['publisert', '12345678901']) {
      await søkefelt.fill(ord);
      await søkefelt.press('Enter');
    }
    const publisert = page.getByRole('button', { name: 'Publisert slett' });
    const sifre = page.getByRole('button', { name: /12345678901/ });
    await expect(publisert).toBeVisible();
    await expect(sifre).toBeVisible();

    await expect
      .poll(() => page.evaluate(() => JSON.stringify({ ...sessionStorage })))
      .toContain('publisert');
    expect(
      await page.evaluate(() => JSON.stringify({ ...sessionStorage })),
    ).not.toContain('12345678901');

    await page.reload();
    await expect(publisert).toBeVisible();
    await expect(sifre).toHaveCount(0);
  });

  test('søkeord følger filtrene, og menylenken gir vanlig søk uten dem', async ({
    page,
  }) => {
    await brukEgenMockbruker(page);
    await gotoApp(page, '/rekrutteringstreff?sortering=nyeste');
    const søkefelt = page.getByRole('searchbox', { name: 'Søk i treff' });
    await søkefelt.fill('lager');
    await søkefelt.press('Enter');
    const lager = page.getByRole('button', { name: 'Lager slett' });
    await expect(lager).toBeVisible();

    // Andre filtre i en ny lenke får ikke søkeordene.
    await gotoApp(page, '/rekrutteringstreff?sortering=eldste');
    await expect(page.getByRole('radio', { name: 'Eldste' })).toBeChecked();
    await expect(lager).toHaveCount(0);

    await gotoApp(page, '/rekrutteringstreff?sortering=nyeste');
    await expect(lager).toBeVisible();

    await page.locator('a[aria-label="Rekrutteringstreff"]').click();
    await expect(
      page.getByRole('radio', { name: 'Sist oppdaterte' }),
    ).toBeChecked();
    await expect(lager).toHaveCount(0);
  });
});

test.describe('Tilbakeknappen etter menylenken', () => {
  test('gir filtrene og søkeordene fra før, ikke søkeordene fra standardsøket', async ({
    page,
  }) => {
    await brukEgenMockbruker(page);
    await opprettStandardsøk(page, 'Kokketreff', 'sortering=eldste', ['kokk']);
    await gotoApp(page, '/rekrutteringstreff?sortering=nyeste');
    const søkefelt = page.getByRole('searchbox', { name: 'Søk i treff' });
    await søkefelt.fill('lager');
    await søkefelt.press('Enter');
    await expect(
      page.getByRole('button', { name: 'Lager slett' }),
    ).toBeVisible();

    await page.locator('a[aria-label="Rekrutteringstreff"]').click();
    const statuslinje = page.getByText('Lagret søk:');
    await expect(statuslinje).toContainText('Kokketreff');
    await expect(
      page.getByRole('button', { name: 'Kokk slett' }),
    ).toBeVisible();

    await page.goBack();
    await expect(page).toHaveURL(/sortering=nyeste/);
    await expect(page.getByRole('radio', { name: 'Nyeste' })).toBeChecked();
    await expect(page.getByRole('button', { name: 'Kokk slett' })).toHaveCount(
      0,
    );
    await expect(
      page.getByRole('button', { name: 'Lager slett' }),
    ).toBeVisible();
    await expect(statuslinje).toHaveCount(0);
  });

  test('viser det lagrede søket fra før med søkeordene, og framknappen viser standardsøket', async ({
    page,
  }) => {
    await brukEgenMockbruker(page);
    await opprettStandardsøk(page, 'Kokketreff', 'sortering=eldste', ['kokk']);
    await opprettSøk(page, 'Nyeste lagertreff', 'sortering=nyeste', ['lager']);
    await gotoApp(page, '/rekrutteringstreff?side=1');
    await åpneMeny(page);
    await page
      .getByRole('menuitemradio', { name: /Nyeste lagertreff/ })
      .click();
    const statuslinje = page.getByText('Lagret søk:');
    const lager = page.getByRole('button', { name: 'Lager slett' });
    const kokk = page.getByRole('button', { name: 'Kokk slett' });
    await expect(statuslinje).toContainText('Nyeste lagertreff');

    await page.locator('a[aria-label="Rekrutteringstreff"]').click();
    await expect(statuslinje).toContainText('Kokketreff');
    await expect(kokk).toBeVisible();
    await expect(lager).toHaveCount(0);

    await page.goBack();
    await expect(statuslinje).toContainText('Nyeste lagertreff');
    await expect(page.getByRole('radio', { name: 'Nyeste' })).toBeChecked();
    await expect(lager).toBeVisible();
    await expect(kokk).toHaveCount(0);

    await page.goForward();
    await expect(statuslinje).toContainText('Kokketreff');
    await expect(page.getByRole('radio', { name: 'Eldste' })).toBeChecked();
    await expect(kokk).toBeVisible();
    await expect(lager).toHaveCount(0);
  });
});

test.describe('Svar som kommer sent', () => {
  test('Et nyere valg vinner over et lagret søk som venter på svar', async ({
    page,
  }) => {
    await brukEgenMockbruker(page);
    const eldsteId = await opprettSøk(page, 'Eldste treff', 'sortering=eldste');
    await opprettSøk(page, 'Nyeste treff', 'sortering=nyeste');
    await gotoApp(page, '/rekrutteringstreff?side=1');

    let slippEldste!: () => void;
    const eldsteHoldes = new Promise<void>((slipp) => (slippEldste = slipp));
    await page.route(`${endepunkt}/${eldsteId}/bruk`, async (route) => {
      await eldsteHoldes;
      await route.continue();
    });

    await åpneMeny(page);
    await page.getByRole('menuitemradio', { name: /Eldste treff/ }).click();
    await åpneMeny(page);
    await page.getByRole('menuitemradio', { name: /Nyeste treff/ }).click();
    const statuslinje = page.getByText('Lagret søk:');
    await expect(statuslinje).toContainText('Nyeste treff');

    const eldsteSvar = page.waitForResponse(`${endepunkt}/${eldsteId}/bruk`);
    slippEldste();
    await eldsteSvar;
    // Gir et eventuelt sent svar tid til å sette filtrene før vi sjekker at det ikke skjedde.
    await page.waitForTimeout(500);

    await expect(statuslinje).toContainText('Nyeste treff');
    await expect(page.getByRole('radio', { name: 'Nyeste' })).toBeChecked();
  });

  test('Søkeord skrevet mens lagrede søk hentes etter refresh, beholdes', async ({
    page,
  }) => {
    await brukEgenMockbruker(page);
    await opprettStandardsøk(page, 'Kokketreff', 'sortering=eldste', ['kokk']);
    await gotoApp(page, '/rekrutteringstreff?brukStandardsok=true');
    await expect(page.getByText('Lagret søk:')).toContainText('Kokketreff');
    await expect(page).toHaveURL(/sortering=eldste/);

    let slippListe!: () => void;
    const listeHoldes = new Promise<void>((slipp) => (slippListe = slipp));
    await page.route(endepunkt, async (route) => {
      if (route.request().method() === 'GET') await listeHoldes;
      await route.continue();
    });
    const listeEtterspurt = page.waitForRequest(
      (request) => request.method() === 'GET' && request.url() === endepunkt,
    );
    await page.reload();
    await listeEtterspurt;

    const søkefelt = page.getByRole('searchbox', { name: 'Søk i treff' });
    await søkefelt.fill('lager');
    await søkefelt.press('Enter');
    slippListe();

    await åpneMeny(page);
    await expect(
      page.getByRole('menuitemradio', { name: /Kokketreff/ }),
    ).toBeVisible();
    await page.keyboard.press('Escape');

    await expect(
      page.getByRole('button', { name: 'Lager slett' }),
    ).toBeVisible();
    await expect(
      page.getByRole('button', { name: 'Kokk slett' }),
    ).toBeVisible();
    await expect(page.getByText('Lagret søk:')).toHaveCount(0);
  });

  test('Søkeord skrevet mens siden venter på standardsøket, beholdes', async ({
    page,
  }) => {
    await brukEgenMockbruker(page);
    await opprettStandardsøk(page, 'Kokketreff', 'sortering=eldste', ['kokk']);

    let slippListe!: () => void;
    const listeHoldes = new Promise<void>((slipp) => (slippListe = slipp));
    await page.route(endepunkt, async (route) => {
      if (route.request().method() === 'GET') await listeHoldes;
      await route.continue();
    });
    const listeEtterspurt = page.waitForRequest(
      (request) => request.method() === 'GET' && request.url() === endepunkt,
    );
    // gotoApp venter til «Laster...» er borte, og det skjer først når lista slippes.
    const siden = gotoApp(page, '/rekrutteringstreff?brukStandardsok=true');
    await listeEtterspurt;
    await expect(page).toHaveURL(/brukStandardsok=true/);

    const søkefelt = page.getByRole('searchbox', { name: 'Søk i treff' });
    await søkefelt.fill('lager');
    await søkefelt.press('Enter');
    await expect(page).not.toHaveURL(/brukStandardsok/);
    slippListe();
    await siden;

    await åpneMeny(page);
    await expect(
      page.getByRole('menuitemradio', { name: /Kokketreff/ }),
    ).toBeVisible();
    await page.keyboard.press('Escape');

    await expect(
      page.getByRole('button', { name: 'Lager slett' }),
    ).toBeVisible();
    await expect(page.getByRole('button', { name: 'Kokk slett' })).toHaveCount(
      0,
    );
    await expect(page.getByText('Lagret søk:')).toHaveCount(0);
    await expect(
      page.getByRole('radio', { name: 'Sist oppdaterte' }),
    ).toBeChecked();
  });

  test('Siden viser vanlig søk når standardsøket ikke kan brukes', async ({
    page,
  }) => {
    await brukEgenMockbruker(page);
    await opprettStandardsøk(page, 'Eldste treff', 'sortering=eldste');
    await page.route(`${endepunkt}/*/bruk`, (route) =>
      route.fulfill({ status: 500 }),
    );

    await gotoApp(page, '/rekrutteringstreff?brukStandardsok=true');

    await expect(
      page.getByText('Kunne ikke bruke det lagrede søket. Prøv igjen.'),
    ).toBeVisible();
    await expect(page).not.toHaveURL(/brukStandardsok/);
    await expect(
      page.getByRole('radio', { name: 'Sist oppdaterte' }),
    ).toBeChecked();
    await expect(page.getByText('Lagret søk:')).toHaveCount(0);
  });
});
