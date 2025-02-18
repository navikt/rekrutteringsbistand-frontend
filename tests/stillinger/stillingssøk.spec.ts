import test, { expect } from '@playwright/test';
import { visMørkModus } from '../visMørkModus';

// Bruker arbeidsgiverrettet tilgang
test.use({ storageState: 'tests/.auth/arbeigsgiverrettet.json' });

test.describe(`Stillingssøk test`, () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:1337/stillings-sok');
    await page.waitForLoadState('networkidle');
  });

  test('Viser riktig innhold i stillingssøk', async ({ page }) => {
    await expect(page.getByText('Stillinger')).toBeVisible();
    await expect(
      page.getByRole('button', { name: 'Søk', exact: true }),
    ).toBeVisible();
    await expect(
      page.getByRole('checkbox', { name: 'Publisert' }),
    ).toBeVisible();
    await expect(page.getByRole('checkbox', { name: 'Utløpt' })).toBeVisible();
    await expect(page.getByRole('checkbox', { name: 'Stoppet' })).toBeVisible();
    await page
      .getByRole('searchbox', { name: 'Søk i stillinger' })
      .fill('Søketekst');
    await page.getByRole('button', { name: 'Søk', exact: true }).click();
    await expect(
      page.getByRole('button', { name: 'Bruk mitt standardsøk' }),
    ).toBeVisible();
    await expect(
      page.getByRole('button', { name: 'Lagre nytt standardsøk' }),
    ).toBeVisible();
    await expect(page.getByLabel('Sorter')).toBeVisible();
    await expect(page.getByTestId('stillings-kort').first()).toBeVisible();
  });
  visMørkModus('stillings-kort');
});
