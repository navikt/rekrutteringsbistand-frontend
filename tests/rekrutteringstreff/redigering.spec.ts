import { gotoApp } from '@/tests/gotoApp';
import { expect, test } from '@playwright/test';

test.use({ storageState: 'tests/.auth/arbeigsgiverrettet.json' });

test.describe('Rekrutteringstreff redigering - utkast', () => {
  test.beforeEach(async ({ page }) => {
    await gotoApp(page, '/rekrutteringstreff/utkast/rediger');
  });

  test('Viser tittel-felt med standardverdi', async ({ page }) => {
    const tittelInput = page.getByLabel('Navn på treffet');
    await expect(tittelInput).toBeVisible();
    await expect(tittelInput).toHaveValue('Rekrutteringstreff – utkast');
  });

  test('Viser "Praktiske forhold"-seksjon', async ({ page }) => {
    await expect(
      page.getByRole('heading', { name: 'Praktiske forhold' }),
    ).toBeVisible();
  });

  test('Viser Arbeidsgivere-seksjon for utkast', async ({ page }) => {
    await expect(
      page.getByRole('heading', { name: 'Arbeidsgivere' }),
    ).toBeVisible();
  });

  test('Viser Publiser-knapp i header', async ({ page }) => {
    await expect(
      page.getByRole('button', { name: 'Publiser treffet' }),
    ).toBeVisible();
  });

  test('Viser Slett-knapp i header for utkast', async ({ page }) => {
    await expect(page.getByRole('button', { name: 'Slett' })).toBeVisible();
  });

  test('Viser Forhåndsvis-knapp', async ({ page }) => {
    await expect(
      page.getByRole('button', { name: 'Forhåndsvis' }),
    ).toBeVisible();
  });

  test('Viser sjekkliste i sidepanelet', async ({ page }) => {
    await expect(
      page.getByRole('heading', { name: 'Sjekkliste' }),
    ).toBeVisible();
  });

  test('Publiser-knapp er deaktivert når sjekkliste ikke er oppfylt', async ({
    page,
  }) => {
    const publiserKnapp = page.getByRole('button', {
      name: 'Publiser treffet',
    });
    await expect(publiserKnapp).toBeDisabled();
  });

  test('Kan redigere tittel-felt', async ({ page }) => {
    const tittelInput = page.getByLabel('Navn på treffet');
    await tittelInput.clear();
    await tittelInput.fill('Nytt treff-navn');
    await expect(tittelInput).toHaveValue('Nytt treff-navn');
  });

  test('Åpner slette-modal fra redigering', async ({ page }) => {
    await page.getByRole('button', { name: 'Slett' }).click();
    await expect(
      page.getByRole('heading', { name: 'Slett treffet' }),
    ).toBeVisible();
  });
});

test.describe('Rekrutteringstreff redigering - publisert', () => {
  test.beforeEach(async ({ page }) => {
    await gotoApp(page, '/rekrutteringstreff/publisert/rediger');
  });

  test('Viser tittel-felt med eksisterende verdi', async ({ page }) => {
    const tittelInput = page.getByLabel('Navn på treffet');
    await expect(tittelInput).toBeVisible();
    await expect(tittelInput).toHaveValue('Rekrutteringstreff i Kristiansand');
  });

  test('Viser "Publiser på nytt"-knapp for publisert treff', async ({
    page,
  }) => {
    await expect(
      page.getByRole('button', { name: 'Publiser på nytt' }),
    ).toBeVisible();
  });

  test('Viser Avbryt-knapp for redigering av publisert treff', async ({
    page,
  }) => {
    await expect(page.getByRole('button', { name: 'Avbryt' })).toBeVisible();
  });

  test('Viser Forhåndsvis-knapp for publisert treff', async ({ page }) => {
    await expect(
      page.getByRole('button', { name: 'Forhåndsvis' }),
    ).toBeVisible();
  });

  test('Viser ikke Arbeidsgivere-seksjon i redigering av publisert treff', async ({
    page,
  }) => {
    const arbeidsgiverHeadings = page.getByRole('heading', {
      name: 'Arbeidsgivere',
    });
    await expect(arbeidsgiverHeadings).toHaveCount(0);
  });
});
