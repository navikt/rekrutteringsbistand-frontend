import { visMørkModus } from '../visMørkModus';
import test, { expect } from '@playwright/test';

// Bruker arbeidsgiverrettet tilgang
test.use({ storageState: 'tests/.auth/arbeigsgiverrettet.json' });

test.describe(`Stillingssøk test`, () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:1337/stilling');
    await page.waitForLoadState('networkidle');
  });

  test('Viser riktig innhold i stillingssøk', async ({ page }) => {
    await expect(
      page.getByRole('heading', { name: 'Stillinger' }),
    ).toBeVisible();

    await expect(
      page.getByRole('searchbox', { name: 'Søk i stillinger' }),
    ).toBeVisible();
    await expect(page.getByText('Status')).toBeVisible();
    await expect(page.getByText('Område')).toBeVisible();
    await expect(page.getByText('Inkludering')).toBeVisible();
    await expect(page.getByText('Kategori')).toBeVisible();
    await expect(page.getByText('Synlighet')).toBeVisible();
    await expect(
      page.getByRole('button', { name: 'Alle filtre' }),
    ).toBeVisible();
    await expect(
      page.getByRole('button', { name: 'Ny stilling' }),
    ).toBeVisible();
    await page.getByRole('button', { name: 'Alle filtre' }).click();
    await expect(page.getByRole('heading', { name: 'Filter' })).toBeVisible();
    await page.locator('.data-\\[state\\=open\\]\\:animate-in').first().click();
    await page.getByRole('searchbox', { name: 'Søk i stillinger' }).click();
    await page
      .getByRole('searchbox', { name: 'Søk i stillinger' })
      .fill('takk test');
    await page
      .getByRole('searchbox', { name: 'Søk i stillinger' })
      .press('Enter');
    await expect(page.getByLabel('Sorter')).toBeVisible();

    await expect(page.getByTestId('stillings-kort').first()).toBeVisible();
  });
  visMørkModus('stillings-kort');
});
