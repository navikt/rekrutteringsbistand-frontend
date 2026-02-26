import { gotoApp } from '@/tests/gotoApp';
import { expect, test } from '@playwright/test';

test.use({ storageState: 'tests/.auth/arbeigsgiverrettet.json' });

test.describe('Ikke-eier – publisert rekrutteringstreff', () => {
  test.beforeEach(async ({ page }) => {
    await gotoApp(page, '/rekrutteringstreff/ikke-eier-publisert');
  });

  test('Viser tittel', async ({ page }) => {
    await expect(
      page.getByRole('heading', {
        name: 'Publisert treff – noen andre sitt',
      }),
    ).toBeVisible();
  });

  test('Viser ikke faner', async ({ page }) => {
    await expect(
      page.getByRole('tab', { name: 'Om treffet' }),
    ).not.toBeVisible();
    await expect(
      page.getByRole('tab', { name: /Jobbsøkere/ }),
    ).not.toBeVisible();
    await expect(
      page.getByRole('tab', { name: /Arbeidsgivere/ }),
    ).not.toBeVisible();
  });

  test('Viser ikke eier-handlinger', async ({ page }) => {
    await expect(
      page.getByRole('button', { name: 'Rediger' }),
    ).not.toBeVisible();
    await expect(page.getByRole('button', { name: 'Avlys' })).not.toBeVisible();
    await expect(
      page.getByRole('button', { name: 'Fullfør' }),
    ).not.toBeVisible();
  });

  test('Viser "Finn og foreslå jobbsøkere"-knapp', async ({ page }) => {
    await expect(
      page.getByRole('link', { name: 'Finn og foreslå jobbsøkere' }),
    ).toBeVisible();
  });

  test('Viser tidspunkt og sted', async ({ page }) => {
    await expect(page.getByText('Tid', { exact: true })).toBeVisible();
    await expect(page.getByText('Sted')).toBeVisible();
  });
});

test.describe('Ikke-eier – fullført rekrutteringstreff', () => {
  test.beforeEach(async ({ page }) => {
    await gotoApp(page, '/rekrutteringstreff/ikke-eier-fullfort');
  });

  test('Viser tittel', async ({ page }) => {
    await expect(
      page.getByRole('heading', {
        name: 'Fullført treff – noen andre sitt',
      }),
    ).toBeVisible();
  });

  test('Viser ikke faner', async ({ page }) => {
    await expect(
      page.getByRole('tab', { name: 'Om treffet' }),
    ).not.toBeVisible();
    await expect(
      page.getByRole('tab', { name: /Jobbsøkere/ }),
    ).not.toBeVisible();
  });

  test('Viser ikke eier-handlinger', async ({ page }) => {
    await expect(
      page.getByRole('button', { name: 'Rediger' }),
    ).not.toBeVisible();
    await expect(page.getByRole('button', { name: 'Avlys' })).not.toBeVisible();
  });

  test('Viser ikke "Finn og foreslå jobbsøkere"-knapp', async ({ page }) => {
    await expect(
      page.getByRole('link', { name: 'Finn og foreslå jobbsøkere' }),
    ).not.toBeVisible();
  });

  test('Viser tidspunkt og sted', async ({ page }) => {
    await expect(page.getByText('Tid', { exact: true })).toBeVisible();
    await expect(page.getByText('Sted')).toBeVisible();
  });
});
