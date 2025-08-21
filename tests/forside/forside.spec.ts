import { visMørkModus } from '../visMørkModus';
import { expect, test } from '@playwright/test';

// Bruker arbeidsgiverrettet tilgang for å teste forsiden
test.use({ storageState: 'tests/.auth/arbeigsgiverrettet.json' });

test.describe(`Forside test`, () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:1337/');
    await page.waitForLoadState('networkidle');
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
