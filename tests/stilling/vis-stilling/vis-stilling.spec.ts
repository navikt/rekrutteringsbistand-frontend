import { gotoApp } from '@/tests/gotoApp';
import { visMørkModus } from '@/tests/visMørkModus';
import { test, expect } from '@playwright/test';

// Bruker arbeidsgiverrettet tilgang
test.use({ storageState: 'tests/.auth/arbeigsgiverrettet.json' });

test.describe(`Stilling test`, () => {
  test('Min stilling', async ({ page }) => {
    await gotoApp(page, '/stilling/minStilling');

    await page.getByRole('tab', { name: 'Om stillingen' }).click();
    await expect(
      page.getByRole('tab', { name: 'Om stillingen' }),
    ).toBeVisible();
    await expect(
      page.getByRole('tab', { name: 'Jobbsøkere (10)' }),
    ).toBeVisible();
    // await expect(page.getByRole('button', { name: 'Kopier' })).toBeVisible();
    await expect(page.getByText('Finn og foreslå jobbsøkere')).toBeVisible();
    await expect(
      page.getByText('Legg til jobbsøkere', { exact: true }),
    ).toBeVisible();
    await expect(page.getByRole('button', { name: 'Skriv ut' })).toBeVisible();

    await expect(
      page.getByRole('heading', { name: 'Om annonsen' }),
    ).toBeVisible();
    await expect(page.getByRole('button', { name: 'Rediger' })).toBeVisible();
    // await expect(page.getByRole('button', { name: 'Dupliser' })).toBeVisible();
    // await expect(
    //   page.getByRole('button', { name: 'Avpubliser' }),
    // ).toBeVisible();
    await expect(page.getByRole('button', { name: 'Fullfør' })).toBeVisible();
  });

  test('Ikke min stilling', async ({ page }) => {
    await gotoApp(page, '/stilling/123');

    await page.getByRole('tab', { name: 'Om stillingen' }).click();
    await expect(
      page.getByRole('tab', { name: 'Om stillingen' }),
    ).toBeVisible();

    // await expect(page.getByRole('button', { name: 'Kopier' })).toBeVisible();
    await expect(page.getByText('Finn og foreslå jobbsøkere')).toBeVisible();
    await expect(
      page.getByText('Legg til jobbsøkere', { exact: true }),
    ).toBeVisible();
    await expect(page.getByRole('button', { name: 'Skriv ut' })).toBeVisible();

    await expect(page.getByText('Organisasjonsnummer')).toBeVisible();
    await expect(
      page.getByRole('heading', { name: 'Om annonsen' }),
    ).toBeVisible();

    await expect(
      page.getByRole('tab', { name: 'Jobbsøkere', exact: true }),
    ).toBeHidden();
    await expect(page.getByRole('button', { name: 'Rediger' })).toBeHidden();
    // await expect(page.getByRole('button', { name: 'Dupliser' })).toBeHidden();
    await expect(page.getByRole('button', { name: 'Avslutt' })).toBeHidden();
  });

  test.describe(`Min stilling i mørk modus`, () => {
    test.beforeEach(async ({ page }) => {
      await gotoApp(page, '/stilling/minStilling');
      await expect(
        page.getByRole('tab', { name: 'Om stillingen' }),
      ).toBeVisible({ timeout: 15000 });
    });

    visMørkModus('om-stillingen');
  });
});
