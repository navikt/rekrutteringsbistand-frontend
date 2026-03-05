import { gotoApp } from '@/tests/gotoApp';
import { expect, test } from '@playwright/test';

test.use({ storageState: 'tests/.auth/arbeigsgiverrettet.json' });

test.describe('Slettet rekrutteringstreff', () => {
  test('Viser advarsel når treffet er slettet', async ({ page }) => {
    await gotoApp(page, '/rekrutteringstreff/slettet');

    await expect(
      page.getByText(
        'Dette rekrutteringstreffet er slettet og er ikke lenger tilgjengelig.',
      ),
    ).toBeVisible();
  });

  test('Viser ikke header-actions for slettet treff', async ({ page }) => {
    await gotoApp(page, '/rekrutteringstreff/slettet');

    await expect(
      page.getByText(
        'Dette rekrutteringstreffet er slettet og er ikke lenger tilgjengelig.',
      ),
    ).toBeVisible();

    await expect(
      page.getByRole('button', { name: 'Publiser' }),
    ).not.toBeVisible();
    await expect(page.getByRole('button', { name: 'Slett' })).not.toBeVisible();
    await expect(page.getByRole('button', { name: 'Avlys' })).not.toBeVisible();
  });

  test('Viser ikke faner for slettet treff', async ({ page }) => {
    await gotoApp(page, '/rekrutteringstreff/slettet');

    await expect(
      page.getByText(
        'Dette rekrutteringstreffet er slettet og er ikke lenger tilgjengelig.',
      ),
    ).toBeVisible();

    await expect(
      page.getByRole('tab', { name: 'Om treffet' }),
    ).not.toBeVisible();
    await expect(
      page.getByRole('tab', { name: 'Jobbsøkere' }),
    ).not.toBeVisible();
  });
});
