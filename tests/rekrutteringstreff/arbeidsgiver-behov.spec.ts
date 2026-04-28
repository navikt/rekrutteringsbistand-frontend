import { gotoApp } from '@/tests/gotoApp';
import { PLAYWRIGHT_MSW_SCOPE_COOKIE } from '@/app/api/rekrutteringstreff/mswScope';
import { expect, type Locator, type Page, test } from '@playwright/test';
const TEST_ARBEIDSGIVER_NAVN = 'TEST PLUTSELIG KATT';

async function fyllGyldigBehov(modal: Locator, page: Page) {
  await modal.getByLabel('Antall stillinger').fill('2');

  const kvalifikasjon = modal.getByLabel('Hva arbeidsgiver leter etter');
  await kvalifikasjon.fill('ko');
  await modal
    .getByRole('option', { name: /\(yrkestittel\)|\(kompetanse\)/i })
    .first()
    .click();
  await page.keyboard.press('Escape');

  await modal.getByLabel('Språk').click();
  await modal.getByRole('option', { name: 'Norsk' }).click();
  await page.keyboard.press('Escape');

  await modal.getByLabel('Ansettelsesform').click();
  await modal.getByRole('option', { name: 'Fast' }).click();
  await page.keyboard.press('Escape');
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
});

test.describe('Arbeidsgiver-behov', () => {
  test.beforeEach(async ({ page }) => {
    await gotoApp(page, '/rekrutteringstreff/publisert');
    await page.getByRole('tab', { name: /Arbeidsgivere/ }).click();
  });

  test('Eier ser "Rediger behov"-knapp eller "Legg til behov"-knapp på arbeidsgiver-rader', async ({
    page,
  }) => {
    const knapp = page
      .getByRole('button', { name: /Rediger behov|Legg til behov/i })
      .first();
    await expect(knapp).toBeVisible();
  });

  test('Eksisterende mock-arbeidsgiver har forhåndsutfylt behov', async ({
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

  test('Ny arbeidsgiver legges til uten å overskrive eksisterende arbeidsgiver', async ({
    page,
  }) => {
    const arbeidsgiverHeadings = page
      .getByRole('tabpanel')
      .getByRole('heading', { level: 3 });
    const antallFør = await arbeidsgiverHeadings.count();

    await expect(
      page.getByRole('heading', { name: 'Testbedrift AS' }),
    ).toBeVisible();

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
      page.getByRole('heading', { name: 'Testbedrift AS' }),
    ).toBeVisible();
    await expect(
      page.getByRole('heading', { name: TEST_ARBEIDSGIVER_NAVN }),
    ).toBeVisible();
    await expect(arbeidsgiverHeadings).toHaveCount(antallFør + 1);
  });

  test('Behov vises ikke i lista før rediger-dialogen åpnes', async ({ page }) => {
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

  test('Modal for legg til arbeidsgiver viser Behov-felt og validerer', async ({
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
    await expect(modal.getByLabel('Språk')).toBeVisible();
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

    await modal.getByLabel('Språk').click();
    await modal.getByRole('option', { name: 'Norsk' }).click();
    await expect(
      modal.getByRole('link', { name: 'Velg minst ett arbeidsspråk' }),
    ).toHaveCount(0);
    await page.keyboard.press('Escape');

    await expect(modal).toBeVisible();
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
    await kvalifikasjon.fill('ko');
    const kvalifikasjonValg = modal
      .getByRole('option', { name: /\(yrkestittel\)|\(kompetanse\)/i })
      .first();
    await kvalifikasjonValg.click();
    // Fjern igjen ved å klikke på samme alternativ
    await kvalifikasjon.fill('ko');
    await kvalifikasjonValg.click();
    await page.keyboard.press('Escape');

    // Språk — velg Norsk
    const språk = modal.getByLabel('Språk');
    await språk.click();
    await modal.getByRole('option', { name: 'Norsk' }).click();
    // Fjern Norsk
    await modal.getByRole('option', { name: 'Norsk' }).click();
    await page.keyboard.press('Escape');

    // Ansettelsesform — velg Fast
    const ansettelse = modal.getByLabel('Ansettelsesform');
    await ansettelse.click();
    await modal.getByRole('option', { name: 'Fast' }).click();
    // Fjern Fast
    await modal.getByRole('option', { name: 'Fast' }).click();
    await page.keyboard.press('Escape');

    // Personlig egenskap — skriv 'se', velg første forslag (ingen kategori i label)
    const egenskap = modal.getByLabel(/Personlige egenskaper/);
    await egenskap.fill('se');
    const egenskapValg = modal.getByRole('option').first();
    await egenskapValg.click();
    await egenskap.fill('se');
    await modal.getByRole('option').first().click();
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
});
