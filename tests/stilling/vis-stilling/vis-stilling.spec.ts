import { gotoApp } from '@/tests/gotoApp';
import { snapshotTest } from '@/tests/snapshotTest';
import { visMørkModus } from '@/tests/visMørkModus';
import { expect, test } from '@playwright/test';

test.use({ storageState: 'tests/.auth/arbeigsgiverrettet.json' });

// ────────────────────────────────────────────────────────
// Vis stilling – grunnleggende innhold og tilgang
// ────────────────────────────────────────────────────────
test.describe('Vis stilling', () => {
  test.describe('Min stilling', () => {
    test.beforeEach(async ({ page }) => {
      await gotoApp(page, '/stilling/minStilling');
    });

    test('Viser Om stillingen-tab', async ({ page }) => {
      await expect(
        page.getByRole('tab', { name: 'Om stillingen' }),
      ).toBeVisible();
    });

    test('Viser Jobbsøkere-tab med antall', async ({ page }) => {
      await expect(
        page.getByRole('tab', { name: 'Jobbsøkere (300)' }),
      ).toBeVisible();
    });

    test('Viser kandidathandlinger', async ({ page }) => {
      await expect(page.getByText('Finn og foreslå jobbsøkere')).toBeVisible();
      await expect(
        page.getByText('Legg til jobbsøkere', { exact: true }),
      ).toBeVisible();
    });

    test('Viser Skriv ut-knapp', async ({ page }) => {
      await expect(
        page.getByRole('button', { name: 'Skriv ut' }),
      ).toBeVisible();
    });

    test('Viser Om jobben-seksjon', async ({ page }) => {
      await page.getByRole('tab', { name: 'Om stillingen' }).click();
      await expect(
        page.getByRole('heading', { name: 'Om jobben' }),
      ).toBeVisible();
    });

    snapshotTest(test);
    visMørkModus('om-stillingen');
  });

  test.describe('Ikke min stilling', () => {
    test.beforeEach(async ({ page }) => {
      await gotoApp(page, '/stilling/internStilling');
    });

    test('Viser Om stillingen-tab', async ({ page }) => {
      await expect(
        page.getByRole('tab', { name: 'Om stillingen' }),
      ).toBeVisible();
    });

    test('Viser kandidathandlinger', async ({ page }) => {
      await expect(page.getByText('Finn og foreslå jobbsøkere')).toBeVisible();
      await expect(
        page.getByText('Legg til jobbsøkere', { exact: true }),
      ).toBeVisible();
    });

    test('Viser stillingsinnhold', async ({ page }) => {
      await expect(
        page.getByRole('button', { name: 'Skriv ut' }),
      ).toBeVisible();
      await expect(page.getByText('Organisasjonsnummer')).toBeVisible();
      await expect(
        page.getByRole('heading', { name: 'Om jobben' }),
      ).toBeVisible();
    });

    test('Skjuler eier-handlinger', async ({ page }) => {
      await expect(
        page.getByRole('tab', { name: 'Jobbsøkere', exact: true }),
      ).toBeHidden();
      await expect(page.getByRole('button', { name: 'Rediger' })).toBeHidden();
    });
  });

  test.describe('Avvist stilling', () => {
    test('Viser "Stilling avvist"-alert for stilling med status REJECTED', async ({
      page,
    }) => {
      await gotoApp(page, '/stilling/avvistEksternStilling');

      const main = page.locator('main');
      await expect(
        main.getByRole('heading', { name: 'Stilling avvist' }),
      ).toBeVisible();
      await expect(
        main.getByText(
          'Denne stillingen er avvist av Nav og vil ikke synes på arbeidsplassen.no.',
        ),
      ).toBeVisible();
    });

    test('Viser ikke "Stilling avvist"-alert for stilling med status ACTIVE', async ({
      page,
    }) => {
      await gotoApp(page, '/stilling/publisertStilling');

      const main = page.locator('main');
      await expect(
        main.getByRole('heading', { name: 'Advarsel: Stilling avvist' }),
      ).toBeHidden();
    });
  });

  test.describe('Ugyldig stilling', () => {
    test('Viser "Ugyldig stilling"-alert når organisasjonsnummer mangler', async ({
      page,
    }) => {
      await gotoApp(page, '/stilling/ugyldigStilling');

      const main = page.locator('main');
      await expect(
        main.getByRole('heading', { name: 'Feil: Ugyldig stilling' }),
      ).toBeVisible();
      await expect(
        main.getByText(
          'Denne stillingen er ikke gyldig da det er en intern stilling som mangler organisasjonsnummer.',
        ),
      ).toBeVisible();
    });

    test('Viser ikke "Ugyldig stilling"-alert for gyldig publisert stilling', async ({
      page,
    }) => {
      await gotoApp(page, '/stilling/publisertStilling');

      const main = page.locator('main');
      await expect(
        main.getByRole('heading', { name: 'Ugyldig stilling' }),
      ).toBeHidden();
    });
  });
});
