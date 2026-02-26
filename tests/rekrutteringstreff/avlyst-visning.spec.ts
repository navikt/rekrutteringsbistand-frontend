import { gotoApp } from '@/tests/gotoApp';
import { expect, test } from '@playwright/test';

test.use({ storageState: 'tests/.auth/arbeigsgiverrettet.json' });

test.describe('Avlyst rekrutteringstreff - eier', () => {
  test.beforeEach(async ({ page }) => {
    await gotoApp(page, '/rekrutteringstreff/avlyst');
  });

  test('Viser avlyst-alert', async ({ page }) => {
    await expect(
      page.getByText('Dette rekrutteringstreffet er avlyst.'),
    ).toBeVisible();
  });

  test('Viser faner', async ({ page }) => {
    await expect(page.getByRole('tab', { name: 'Om treffet' })).toBeVisible();
    await expect(page.getByRole('tab', { name: /Jobbsøkere/ })).toBeVisible();
  });

  test('Viser ikke "Legg til jobbsøker"-knapp i jobbsøkere-fanen', async ({
    page,
  }) => {
    await page.getByRole('tab', { name: /Jobbsøkere/ }).click();
    await expect(
      page.getByRole('button', { name: 'Legg til jobbsøker' }),
    ).not.toBeVisible();
  });
});

test.describe('Avlyst rekrutteringstreff - ikke eier', () => {
  test.beforeEach(async ({ page }) => {
    await gotoApp(page, '/rekrutteringstreff/ikke-eier-avlyst');
  });

  test('Viser avlyst-alert', async ({ page }) => {
    await expect(
      page.getByText('Dette rekrutteringstreffet er avlyst.'),
    ).toBeVisible();
  });
});

test.describe('Fullført rekrutteringstreff - legg til jobbsøker skjult', () => {
  test('Viser ikke "Legg til jobbsøker"-knapp', async ({ page }) => {
    await gotoApp(page, '/rekrutteringstreff/fullfort');
    await page.getByRole('tab', { name: /Jobbsøkere/ }).click();
    await expect(
      page.getByRole('button', { name: 'Legg til jobbsøker' }),
    ).not.toBeVisible();
  });
});

test.describe('Publisert rekrutteringstreff - legg til jobbsøker synlig', () => {
  test('Viser "Legg til jobbsøker"-knapp', async ({ page }) => {
    await gotoApp(page, '/rekrutteringstreff/publisert');
    await page.getByRole('tab', { name: /Jobbsøkere/ }).click();
    await expect(
      page.getByRole('button', { name: 'Legg til jobbsøker' }),
    ).toBeVisible();
  });
});
