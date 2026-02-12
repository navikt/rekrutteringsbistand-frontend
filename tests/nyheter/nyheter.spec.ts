import { gotoApp } from '@/tests/gotoApp';
import { expect, test } from '@playwright/test';

test.use({ storageState: 'tests/.auth/arbeigsgiverrettet.json' });

// ────────────────────────────────────────────────────────
// Nyheter-siden
// ────────────────────────────────────────────────────────
test.describe('Nyheter', () => {
  test.beforeEach(async ({ page }) => {
    await gotoApp(page, '/nyheter');
  });

  test('Viser Nyheter-overskrift', async ({ page }) => {
    await expect(
      page.locator('main').getByText('Nyheter', { exact: true }),
    ).toBeVisible();
  });

  test('Viser nyhetskort fra API', async ({ page }) => {
    // Første mock-nyhet (nyeste etter sortering)
    await expect(
      page.getByText('Ny funksjonalitet for kandidatsøk'),
    ).toBeVisible();
  });

  test('Viser flere nyheter', async ({ page }) => {
    await expect(page.getByText('Oppdatert brukergrensesnitt')).toBeVisible();
    await expect(page.getByText('Forbedret stillingssøk')).toBeVisible();
  });

  test('Viser legacy-nyheter', async ({ page }) => {
    // Hardkodet nyhet fra nyheter.ts
    await expect(
      page.getByText('Se stillingene fra ditt eget kontor'),
    ).toBeVisible();
  });

  test('Viser datoer for nyheter', async ({ page }) => {
    // Mock-nyheter har datoer som formateres med formaterNorskDato
    const datoer = page.locator('[data-testid="stillings-kort"]');
    await expect(datoer.first()).toBeVisible();
  });
});
