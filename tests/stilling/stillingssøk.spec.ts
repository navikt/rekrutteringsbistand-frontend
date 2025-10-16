import { gotoApp } from '@/tests/gotoApp';
import { visMørkModus } from '@/tests/visMørkModus';
import { test, expect } from '@playwright/test';

// Bruker arbeidsgiverrettet tilgang
test.use({ storageState: 'tests/.auth/arbeigsgiverrettet.json' });

test.describe(`Stillingssøk test`, () => {
  test.beforeEach(async ({ page }) => {
    await gotoApp(page, '/stilling');
    await expect(
      page.getByLabel('Brødsmulesti').getByText('Stillingsoppdrag'),
    ).toBeVisible({ timeout: 15000 });
  });

  test('Viser riktig innhold i stillingssøk', async ({ page }) => {
    await expect(
      page.getByLabel('Brødsmulesti').getByText('Stillingsoppdrag'),
    ).toBeVisible();

    // Filtrer-knappen vises kun < 720px bredde. Ved desktop (>=720px) er filtrene alltid synlige.
    // const filterButton = page.getByRole('button', { name: 'Filtrer' });
    // if (await filterButton.isVisible()) {
    //   await filterButton.click();
    // }
    // "Opprett annonse" er erstattet av global Opprett-knapp i sidebaren og testes ikke her.
    await expect(page.getByText('Sorter')).toBeVisible();
    await expect(page.getByText('Status')).toBeVisible();
    await expect(page.getByText('Område')).toBeVisible();
    await expect(page.getByText('Kategori')).toBeVisible();

    const openPanel = page.locator('[data-state="open"]').first();
    if (await openPanel.isVisible()) {
      await openPanel.click();
    }
    await page.getByRole('button', { name: 'Søk', exact: true }).click();
    await page
      .getByRole('searchbox', { name: 'Søk i stillinger' })
      .fill('test tekst');
    await page
      .getByRole('searchbox', { name: 'Søk i stillinger' })
      .press('Enter');

    await expect(page.getByTestId('stillings-kort').first()).toBeVisible();
  });
  visMørkModus('stillings-kort');
});
