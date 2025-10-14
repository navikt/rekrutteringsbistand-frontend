import { gotoApp } from '@/tests/gotoApp';
import { visMørkModus } from '@/tests/visMørkModus';
import { test, expect } from '@playwright/test';

// Bruker arbeidsgiverrettet tilgang for å teste forsiden
test.use({ storageState: 'tests/.auth/arbeigsgiverrettet.json' });

test.describe(`Forside test`, () => {
  test.beforeEach(async ({ page }) => {
    await gotoApp(page, '/');
    // Sørg for at sidebar er åpen slik at knappetekster er synlige
    const toggle = page
      .getByRole('button')
      .filter({ has: page.locator('svg') })
      .first();
    // Hvis 'Oversikt' ikke er synlig, prøv å åpne sidebaren
    const oversiktButton = page.getByRole('button', { name: 'Oversikt' });
    if (!(await oversiktButton.isVisible())) {
      await toggle.click();
    }
  });

  test('Viser riktig innhold på forsiden', async ({ page }) => {
    await expect(page.getByRole('button', { name: 'Oversikt' })).toBeVisible();
    await expect(
      page.getByRole('button', { name: 'Stillingsoppdrag' }),
    ).toBeVisible();
    await expect(
      page.getByRole('button', { name: 'Jobbsøkere' }),
    ).toBeVisible();
    await expect(
      page.getByRole('button', { name: 'Etterregistrering' }),
    ).toBeVisible();
    await expect(page.getByLabel('Periode')).toBeVisible();
    await expect(page.getByTestId('forside-utfallsstatistikk')).toBeVisible();
    await expect(
      page.getByTestId('forside-forespørsel-statistikk'),
    ).toBeVisible();
  });

  visMørkModus('forside-forespørsel-statistikk');
});
