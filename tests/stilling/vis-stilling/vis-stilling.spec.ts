import { visMørkModus } from '../../visMørkModus';
import test, { expect } from '@playwright/test';

// Bruker arbeidsgiverrettet tilgang
test.use({ storageState: 'tests/.auth/arbeigsgiverrettet.json' });

test.describe(`Stilling test`, () => {
  test('Min stilling', async ({ page }) => {
    await page.goto('http://localhost:1337/stilling/minStilling');

    await page.getByRole('tab', { name: 'Om stillingen' }).click();
    await page.getByRole('tab', { name: 'Om stillingen' }).click();
    await expect(
      page.getByRole('tab', { name: 'Om stillingen' }),
    ).toBeVisible();
    await expect(
      page.getByRole('tab', { name: 'Kandidater (10)' }),
    ).toBeVisible();
    await expect(page.getByRole('button', { name: 'Kopier' })).toBeVisible();
    await expect(
      page.getByRole('button', { name: 'Finn kandidater' }),
    ).toBeVisible();
    await expect(
      page.getByRole('button', { name: 'Legg til kandidater' }),
    ).toBeVisible();
    await expect(page.getByRole('button', { name: 'Skriv ut' })).toBeVisible();
    await expect(
      page.getByRole('heading', { name: 'Om stillingen' }),
    ).toBeVisible();
    await expect(
      page.getByRole('heading', { name: 'Om Andersen AS' }),
    ).toBeVisible();
    await expect(
      page.getByRole('heading', { name: 'Om annonsen' }),
    ).toBeVisible();
    await expect(
      page.getByRole('heading', { name: 'Oppsummering' }),
    ).toBeVisible();
    await expect(page.getByRole('button', { name: 'Rediger' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Dupliser' })).toBeVisible();
    await expect(
      page.getByRole('button', { name: 'Avpubliser' }),
    ).toBeVisible();
    await expect(
      page.getByRole('button', { name: 'Ferdigstill' }),
    ).toBeVisible();
  });

  test('Ikke min stilling', async ({ page }) => {
    await page.goto('http://localhost:1337/stilling/123');

    await page.getByRole('tab', { name: 'Om stillingen' }).click();
    await page.getByRole('tab', { name: 'Om stillingen' }).click();
    await expect(
      page.getByRole('tab', { name: 'Om stillingen' }),
    ).toBeVisible();

    await expect(page.getByRole('button', { name: 'Kopier' })).toBeVisible();
    await expect(
      page.getByRole('button', { name: 'Finn kandidater' }),
    ).toBeVisible();
    await expect(
      page.getByRole('button', { name: 'Legg til kandidater' }),
    ).toBeVisible();
    await expect(page.getByRole('button', { name: 'Skriv ut' })).toBeVisible();
    await expect(
      page.getByRole('heading', { name: 'Om stillingen' }),
    ).toBeVisible();
    await expect(page.getByText('Organisasjonsnummer')).toBeVisible();
    await expect(
      page.getByRole('heading', { name: 'Om annonsen' }),
    ).toBeVisible();

    await expect(
      page.getByRole('heading', { name: 'Oppsummering' }),
    ).toBeHidden();
    await expect(
      page.getByRole('tab', { name: 'Kandidater', exact: true }),
    ).toBeHidden();
    await expect(page.getByRole('button', { name: 'Rediger' })).toBeHidden();
    await expect(page.getByRole('button', { name: 'Dupliser' })).toBeHidden();
    await expect(page.getByRole('button', { name: 'Avslutt' })).toBeHidden();
  });

  test.describe(`Min stilling i mørk modus`, () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('http://localhost:1337/stilling/minStilling');
      await page.waitForLoadState('networkidle');
    });

    visMørkModus('om-stillingen');
  });
});
