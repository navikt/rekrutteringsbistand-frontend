import { expect, test } from '@playwright/test';
import { visMørkModus } from '../visMørkModus';

// Bruker arbeidsgiverrettet tilgang for å teste forsiden
test.use({ storageState: 'tests/.auth/arbeigsgiverrettet.json' });

test.describe(`Forside test`, () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:1337/');
    await page.waitForLoadState('networkidle');
  });

  test('Viser riktig innhold på forsiden', async ({ page }) => {
    await expect(page.getByRole('tab', { name: 'Oversikt' })).toBeVisible();
    await expect(page.getByRole('tab', { name: 'Stillinger' })).toBeVisible();
    await expect(page.getByRole('tab', { name: 'Kandidatsøk' })).toBeVisible();
    await expect(
      page.getByRole('tab', { name: 'Etterregistrering' }),
    ).toBeVisible();
    await expect(page.getByTestId('forside-hurtiglenker')).toBeVisible();
    await expect(page.getByLabel('Periode')).toBeVisible();
    await expect(page.getByTestId('forside-utfallsstatistikk')).toBeVisible();
    await expect(
      page.getByTestId('forside-forespørsel-statistikk'),
    ).toBeVisible();
  });

  visMørkModus('forside-forespørsel-statistikk');
});
