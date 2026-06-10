import { behovMetadataMock } from '@/app/api/rekrutteringstreff/arbeidsgiver-behov-metadata/useBehovMetadata';
import { PLAYWRIGHT_MSW_SCOPE_COOKIE } from '@/app/api/rekrutteringstreff/mswScope';
import { gotoApp } from '@/tests/gotoApp';
import { expect, type Locator, type Page, test } from '@playwright/test';

const TEST_ARBEIDSGIVER_NAVN = 'TEST PLUTSELIG KATT';

const språkFelt = (modal: Locator) =>
  modal.getByRole('combobox', { name: 'Språk' });

async function fyllGyldigBehov(modal: Locator, page: Page) {
  await modal.getByLabel('Antall stillinger').fill('2');

  const kvalifikasjon = modal.getByLabel('Hva arbeidsgiver leter etter');
  await kvalifikasjon.fill('ko');
  await modal
    .getByRole('option', { name: /\(yrkestittel\)|\(kompetanse\)/i })
    .first()
    .click();

  await språkFelt(modal).click();
  await modal.getByRole('option', { name: 'Norsk', exact: true }).click();
  await page.keyboard.press('Escape');

  await modal.getByLabel('Ansettelsesform').click();
  await modal.getByRole('option', { name: 'Fast' }).click();
  await page.keyboard.press('Escape');
}

async function åpneLeggTilArbeidsgiverModal(page: Page) {
  await page.getByRole('button', { name: 'Legg til arbeidsgiver' }).click();
  const modal = page.getByRole('dialog', {
    name: /Legg til arbeidsgivere/i,
  });
  await expect(modal).toBeVisible();

  const finn = modal.getByLabel('Finn arbeidsgiver');
  await finn.fill('test');
  await modal
    .getByRole('option', { name: new RegExp(TEST_ARBEIDSGIVER_NAVN, 'i') })
    .click();
  await expect(finn).toBeHidden();

  return modal;
}

async function forventFørsteSpråkvalg(modal: Locator, forventede: string[]) {
  const options = modal.getByRole('option');
  for (const [index, forventet] of forventede.entries()) {
    await expect(options.nth(index)).toHaveText(forventet);
  }
}

test.use({ storageState: 'tests/.auth/arbeigsgiverrettet.json' });

test.beforeEach(async ({ page }, testInfo) => {
  await page.context().addCookies([
    {
      name: PLAYWRIGHT_MSW_SCOPE_COOKIE,
      value: encodeURIComponent(testInfo.testId),
      domain: 'localhost',
      path: '/',
    },
  ]);
  await page.route(
    '**/api/rekrutteringstreff/arbeidsgiver-behov-metadata',
    (route) =>
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(behovMetadataMock),
      }),
  );
});

test.describe('Arbeidsgiver-behov', () => {
  test.beforeEach(async ({ page }) => {
    await gotoApp(page, '/rekrutteringstreff/publisert');
    await page.getByRole('tab', { name: /Arbeidsgivere/ }).click();
  });

  test('Rediger-dialogen viser eksisterende behov for arbeidsgiver', async ({
    page,
  }) => {
    const knapp = page.getByRole('button', { name: 'Rediger behov' }).first();
    await expect(knapp).toBeVisible();

    await knapp.click();

    const modal = page.getByRole('dialog', {
      name: /Rediger behov/i,
    });
    await expect(modal).toBeVisible();
    await expect(modal.getByLabel('Antall stillinger')).toHaveValue('3');
  });

  test('Utenfor-klikk lukker ikke behov-dialogen', async ({ page }) => {
    await page.getByRole('button', { name: 'Rediger behov' }).first().click();

    const modal = page.getByRole('dialog', {
      name: /Rediger behov/i,
    });
    await expect(modal).toBeVisible();

    await modal.getByLabel('Antall stillinger').fill('7');
    await page.mouse.click(20, 20);

    await expect(modal).toBeVisible();
    await expect(modal.getByLabel('Antall stillinger')).toHaveValue('7');
  });

  test('Ugyldig behov holder rediger-dialogen åpen ved lagring', async ({
    page,
  }) => {
    await page.getByRole('button', { name: 'Rediger behov' }).first().click();

    const modal = page.getByRole('dialog', {
      name: /Rediger behov/i,
    });
    await expect(modal).toBeVisible();

    const antallFelt = modal.getByLabel('Antall stillinger');
    await antallFelt.clear();
    await expect(antallFelt).toHaveValue('');
    await modal.getByRole('button', { name: 'Lagre' }).click();

    await expect(modal).toBeVisible();
    await expect(
      modal.getByRole('link', { name: 'Oppgi antall stillinger' }),
    ).toBeVisible();
  });

  test('Legger til arbeidsgiver og viser den i arbeidsgiverlisten', async ({
    page,
  }) => {
    await page.getByRole('button', { name: 'Legg til arbeidsgiver' }).click();
    const modal = page.getByRole('dialog', {
      name: /Legg til arbeidsgivere/i,
    });
    await expect(modal).toBeVisible();

    await modal.getByLabel('Finn arbeidsgiver').fill('test');
    await modal
      .getByRole('option', { name: new RegExp(TEST_ARBEIDSGIVER_NAVN, 'i') })
      .click();
    await fyllGyldigBehov(modal, page);
    await modal.getByRole('button', { name: 'Legg til', exact: true }).click();

    await expect(modal).toBeHidden();
    await expect(
      page.getByRole('heading', { name: TEST_ARBEIDSGIVER_NAVN }),
    ).toBeVisible();
  });

  test('Behov vises ikke i lista før rediger-dialogen åpnes', async ({
    page,
  }) => {
    await expect(
      page.getByRole('heading', { name: 'Hva arbeidsgiver leter etter' }),
    ).toHaveCount(0);

    await page
      .getByRole('button', { name: /Rediger behov|Legg til behov/i })
      .first()
      .click();

    await expect(
      page.getByRole('dialog', { name: /Rediger behov/i }),
    ).toBeVisible();
    await expect(page.getByLabel('Hva arbeidsgiver leter etter')).toBeVisible();
  });

  test('Legg til arbeidsgiver-modal viser behovfelt og validerer input', async ({
    page,
  }) => {
    await page.getByRole('button', { name: 'Legg til arbeidsgiver' }).click();
    const modal = page.getByRole('dialog', {
      name: /Legg til arbeidsgivere/i,
    });
    await expect(modal).toBeVisible();

    const leggTil = modal.getByRole('button', {
      name: 'Legg til',
      exact: true,
    });
    await expect(leggTil).toBeEnabled();

    await leggTil.click();
    await expect(modal).toBeVisible();
    await expect(
      modal.getByRole('link', { name: 'Velg arbeidsgiver' }),
    ).toBeVisible();

    // Velg en arbeidsgiver via søk
    const finn = modal.getByLabel('Finn arbeidsgiver');
    await finn.fill('test');
    await modal
      .getByRole('option', { name: new RegExp(TEST_ARBEIDSGIVER_NAVN, 'i') })
      .click();

    await expect(modal.getByLabel('Finn arbeidsgiver')).toBeHidden();

    // Behov-felt skal nå være synlige
    await expect(modal.getByLabel('Antall stillinger')).toBeVisible();
    await expect(
      modal.getByLabel('Hva arbeidsgiver leter etter'),
    ).toBeVisible();
    await expect(språkFelt(modal)).toBeVisible();
    await expect(modal.getByLabel('Ansettelsesform')).toBeVisible();

    await expect(leggTil).toBeEnabled();

    // Klikk uten å fylle ut behov skal vise feilmeldinger og ErrorSummary
    await leggTil.click();
    await expect(modal).toBeVisible();
    await expect(
      modal.getByRole('heading', {
        name: 'Du må rette disse feilene før du kan fortsette:',
      }),
    ).toBeVisible();
    await expect(
      modal.getByRole('link', { name: 'Oppgi antall stillinger' }),
    ).toBeVisible();
    await expect(
      modal.getByRole('link', {
        name: 'Velg minst én kvalifikasjon arbeidsgiver leter etter',
      }),
    ).toBeVisible();
    await expect(
      modal.getByRole('link', { name: 'Velg minst ett arbeidsspråk' }),
    ).toBeVisible();
    await expect(
      modal.getByRole('link', { name: 'Velg minst én ansettelsesform' }),
    ).toBeVisible();

    // Fyll ut antall og tabb ut — feilmeldingen for antall forsvinner uten ny submit
    await modal.getByLabel('Antall stillinger').fill('2');
    await page.keyboard.press('Tab');
    await expect(
      modal.getByRole('link', { name: 'Oppgi antall stillinger' }),
    ).toHaveCount(0);

    await språkFelt(modal).click();
    await modal.getByRole('option', { name: 'Norsk', exact: true }).click();
    await expect(
      modal.getByRole('link', { name: 'Velg minst ett arbeidsspråk' }),
    ).toHaveCount(0);
    await page.keyboard.press('Escape');

    await expect(modal).toBeVisible();
  });

  test('Språk-listen viser Norsk øverst når ingen språk er valgt og søket er tomt', async ({
    page,
  }) => {
    const modal = await åpneLeggTilArbeidsgiverModal(page);

    await språkFelt(modal).click();

    await forventFørsteSpråkvalg(modal, ['Norsk', 'Engelsk', 'Abaluhyisk']);
  });

  test('Språk-søket rangerer eksakt treff, prefikstreff og treff midt i ordet', async ({
    page,
  }) => {
    const modal = await åpneLeggTilArbeidsgiverModal(page);
    const språk = språkFelt(modal);

    await språk.fill('eng');
    await forventFørsteSpråkvalg(modal, ['Engelsk']);

    await språk.fill('norsk');
    await forventFørsteSpråkvalg(modal, ['Norsk', 'Norsk tegnspråk']);

    await språk.fill('no');
    await forventFørsteSpråkvalg(modal, [
      'Nordsamisk',
      'Norsk',
      'Norsk tegnspråk',
      'Bono',
      'Cebuano',
      'Filipino/Tagalog',
      'Kurmanji (Nord-Kurdisk)',
    ]);
  });

  test('Utenfor-klikk lukker ikke legg til arbeidsgiver-modal', async ({
    page,
  }) => {
    await page.getByRole('button', { name: 'Legg til arbeidsgiver' }).click();
    const modal = page.getByRole('dialog', {
      name: /Legg til arbeidsgivere/i,
    });
    await expect(modal).toBeVisible();

    await modal.getByLabel('Finn arbeidsgiver').fill('test');
    await modal
      .getByRole('option', { name: new RegExp(TEST_ARBEIDSGIVER_NAVN, 'i') })
      .click();
    await modal.getByLabel('Antall stillinger').fill('4');

    await page.mouse.click(20, 20);

    await expect(modal).toBeVisible();
    await expect(modal.getByLabel('Antall stillinger')).toHaveValue('4');
  });

  test('Antall stillinger godtar maks 99 og to siffer', async ({ page }) => {
    await page.getByRole('button', { name: 'Legg til arbeidsgiver' }).click();
    const modal = page.getByRole('dialog', {
      name: /Legg til arbeidsgivere/i,
    });
    await modal.getByLabel('Finn arbeidsgiver').fill('test');
    await modal
      .getByRole('option', { name: new RegExp(TEST_ARBEIDSGIVER_NAVN, 'i') })
      .click();

    const antall = modal.getByLabel('Antall stillinger');
    await antall.fill('123');
    // Skal kuttes til to siffer
    await expect(antall).toHaveValue('12');

    // Sett 99 — gyldig
    await antall.fill('99');
    await expect(antall).toHaveValue('99');
  });

  test('Avbryt-knapp tilbakestiller skjemaet ved neste åpning', async ({
    page,
  }) => {
    await page.getByRole('button', { name: 'Legg til arbeidsgiver' }).click();
    let modal = page.getByRole('dialog', { name: /Legg til arbeidsgivere/i });
    await modal.getByLabel('Finn arbeidsgiver').fill('test');
    await modal
      .getByRole('option', { name: new RegExp(TEST_ARBEIDSGIVER_NAVN, 'i') })
      .click();
    await modal.getByLabel('Antall stillinger').fill('5');

    await modal.getByRole('button', { name: 'Avbryt', exact: true }).click();
    await expect(modal).toBeHidden();

    await page.getByRole('button', { name: 'Legg til arbeidsgiver' }).click();
    modal = page.getByRole('dialog', { name: /Legg til arbeidsgivere/i });
    await expect(modal.getByLabel('Finn arbeidsgiver')).toBeVisible();
  });

  test('Avbryt-knapp lukker modalen uten å lagre', async ({ page }) => {
    await page.getByRole('button', { name: 'Legg til arbeidsgiver' }).click();
    const modal = page.getByRole('dialog', {
      name: /Legg til arbeidsgivere/i,
    });
    await expect(modal).toBeVisible();

    await modal.getByRole('button', { name: 'Avbryt', exact: true }).click();
    await expect(modal).toBeHidden();
  });

  test('Kan velge og fjerne kvalifikasjon, språk, ansettelsesform og personlig egenskap', async ({
    page,
  }) => {
    await page.getByRole('button', { name: 'Legg til arbeidsgiver' }).click();
    const modal = page.getByRole('dialog', {
      name: /Legg til arbeidsgivere/i,
    });
    const finn = modal.getByLabel('Finn arbeidsgiver');
    await finn.fill('test');
    await modal
      .getByRole('option', { name: new RegExp(TEST_ARBEIDSGIVER_NAVN, 'i') })
      .click();
    await expect(finn).toBeHidden();

    // Kvalifikasjon — skriv minst to bokstaver, velg første forslag
    const kvalifikasjon = modal.getByLabel('Hva arbeidsgiver leter etter');
    await kvalifikasjon.fill('k');
    await expect(
      modal.locator('[id$="arbeidsgiver-behov-kvalifikasjoner-no-hits"]'),
    ).toBeHidden();
    await kvalifikasjon.fill('ko');
    const kvalifikasjonValg = modal.getByRole('option', {
      name: 'Kokk (yrkestittel)',
    });
    await kvalifikasjonValg.click();
    await kvalifikasjon.fill('ko');
    await expect(kvalifikasjonValg).toHaveCount(0);
    await modal
      .getByRole('button', { name: 'Kokk (yrkestittel) slett' })
      .click();
    await page.keyboard.press('Escape');

    // Språk — velg Norsk
    const språk = språkFelt(modal);
    await språk.click();
    await modal.getByRole('option', { name: 'Norsk', exact: true }).click();
    await expect(
      modal.getByRole('option', { name: 'Norsk', exact: true }),
    ).toHaveCount(0);
    await modal.getByRole('button', { name: 'Norsk slett' }).click();
    await page.keyboard.press('Escape');

    // Ansettelsesform — velg Fast
    const ansettelse = modal.getByLabel('Ansettelsesform');
    await ansettelse.click();
    await modal.getByRole('option', { name: 'Fast' }).click();
    await expect(modal.getByRole('option', { name: 'Fast' })).toHaveCount(0);
    await modal.getByRole('button', { name: 'Fast slett' }).click();
    await page.keyboard.press('Escape');

    // Personlig egenskap — skriv 'se', velg første forslag (ingen kategori i label)
    const egenskap = modal.getByLabel(/Personlige egenskaper/);
    await egenskap.fill('s');
    await expect(
      modal.locator('[id$="arbeidsgiver-behov-personlige-egenskaper-no-hits"]'),
    ).toBeHidden();
    await egenskap.fill('se');
    const egenskapValg = modal.getByRole('option', { name: 'Selvstendig' });
    await egenskapValg.click();
    await egenskap.fill('se');
    await expect(egenskapValg).toHaveCount(0);
    await modal.getByRole('button', { name: 'Selvstendig slett' }).click();
  });

  test('Kan finne og velge førerkort i Hva arbeidsgiver leter etter', async ({
    page,
  }) => {
    await page.getByRole('button', { name: 'Legg til arbeidsgiver' }).click();
    const modal = page.getByRole('dialog', {
      name: /Legg til arbeidsgivere/i,
    });
    const finn = modal.getByLabel('Finn arbeidsgiver');
    await finn.fill('test');
    await modal
      .getByRole('option', { name: new RegExp(TEST_ARBEIDSGIVER_NAVN, 'i') })
      .click();
    await expect(finn).toBeHidden();

    await modal.getByLabel('Antall stillinger').fill('2');

    const kvalifikasjon = modal.getByLabel('Hva arbeidsgiver leter etter');
    await kvalifikasjon.fill('klasse a2');
    await expect(
      modal.locator('[id$="arbeidsgiver-behov-kvalifikasjoner-no-hits"]'),
    ).toBeVisible();

    await kvalifikasjon.fill('førerkort a2');
    const forerkortValg = modal.getByRole('option', {
      name: 'Førerkort A2 - Mellomtung motorsykkel (førerkort)',
    });
    await expect(forerkortValg).toBeVisible();

    await kvalifikasjon.fill('mellomtung');
    await expect(forerkortValg).toBeVisible();
    await forerkortValg.click();

    await språkFelt(modal).click();
    await modal.getByRole('option', { name: 'Norsk', exact: true }).click();
    await page.keyboard.press('Escape');

    await modal.getByLabel('Ansettelsesform').click();
    await modal.getByRole('option', { name: 'Fast' }).click();
    await page.keyboard.press('Escape');

    await modal.getByRole('button', { name: 'Legg til', exact: true }).click();

    await expect(modal).toBeHidden();
  });
});

test.describe('Arbeidsgiver-seksjon i rediger-side', () => {
  test('Behov vises ikke i seksjonen før rediger-dialogen åpnes', async ({
    page,
  }) => {
    await gotoApp(page, '/rekrutteringstreff/utkast/rediger');

    await expect(
      page.getByRole('heading', { name: 'Hva arbeidsgiver leter etter' }),
    ).toHaveCount(0);

    await page
      .getByRole('button', { name: /Rediger behov|Legg til behov/i })
      .first()
      .click();

    await expect(
      page.getByRole('dialog', { name: /Rediger behov/i }),
    ).toBeVisible();
    await expect(page.getByLabel('Hva arbeidsgiver leter etter')).toBeVisible();
  });

  test('Åpner modal ved klikk på "Legg til arbeidsgiver" og viser behov-skjema', async ({
    page,
  }) => {
    await gotoApp(page, '/rekrutteringstreff/utkast/rediger');
    const seksjon = page
      .getByRole('heading', { name: 'Arbeidsgivere' })
      .locator('..');

    await seksjon
      .getByRole('button', { name: 'Legg til arbeidsgiver' })
      .click();

    const modal = page.getByRole('dialog', {
      name: /Legg til arbeidsgivere/i,
    });
    await expect(modal).toBeVisible();

    const finn = modal.getByLabel('Finn arbeidsgiver');
    await finn.fill('test');
    await modal
      .getByRole('option', { name: new RegExp(TEST_ARBEIDSGIVER_NAVN, 'i') })
      .click();

    await expect(modal.getByLabel('Antall stillinger')).toBeVisible();
    // Knappen er enabled etter at arbeidsgiver er valgt — validering skjer ved klikk.
    await expect(
      modal.getByRole('button', { name: 'Legg til', exact: true }),
    ).toBeEnabled();
  });

  test('Valideringsfeil lukker ikke legg til arbeidsgiver-modal i rediger-side', async ({
    page,
  }) => {
    await gotoApp(page, '/rekrutteringstreff/utkast/rediger');
    const seksjon = page
      .getByRole('heading', { name: 'Arbeidsgivere' })
      .locator('..');

    await seksjon
      .getByRole('button', { name: 'Legg til arbeidsgiver' })
      .click();

    const modal = page.getByRole('dialog', {
      name: /Legg til arbeidsgivere/i,
    });
    await expect(modal).toBeVisible();

    await modal.getByLabel('Finn arbeidsgiver').fill('test');
    await modal
      .getByRole('option', { name: new RegExp(TEST_ARBEIDSGIVER_NAVN, 'i') })
      .click();

    await modal.getByRole('button', { name: 'Legg til', exact: true }).click();

    await expect(modal).toBeVisible();
    await expect(
      modal.getByRole('link', { name: 'Oppgi antall stillinger' }),
    ).toBeVisible();
  });
});
