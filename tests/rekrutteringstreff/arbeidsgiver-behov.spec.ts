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

    // Submit-knapp er disabled før arbeidsgiver er valgt
    const leggTil = modal.getByRole('button', {
      name: 'Legg til',
      exact: true,
    });
    await expect(leggTil).toBeDisabled();

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

    // Submit-knapp er fortsatt disabled fordi obligatoriske felt er tomme
    await expect(leggTil).toBeDisabled();

    // Klikk skal heller ikke utføre noe — sjekker at validering fortsatt blokkerer
    // (knappen er disabled, så vi tester at den ikke kan trigges)

    // Fyll ut antall (minst ett krav oppfylt)
    await modal.getByLabel('Antall stillinger').fill('2');
    // Fortsatt disabled — mangler kvalifikasjon, språk, ansettelsesform
    await expect(leggTil).toBeDisabled();
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

    // Personlig egenskap — skriv 'se', velg første forslag
    const egenskap = modal.getByLabel(/Personlige egenskaper/);
    await egenskap.fill('se');
    const egenskapValg = modal
      .getByRole('option', { name: /\(personlig egenskap\)/i })
      .first();
    await egenskapValg.click();
    await egenskap.fill('se');
    await egenskapValg.click();
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
    await expect(
      modal.getByRole('button', { name: 'Legg til', exact: true }),
    ).toBeDisabled();
  });
});
