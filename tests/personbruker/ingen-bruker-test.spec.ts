import { gotoApp } from '@/tests/gotoApp';
import { expect, test } from '@playwright/test';

// ────────────────────────────────────────────────────────
// Personbruker – inngang fra arbeidsoppfølging
// ────────────────────────────────────────────────────────
test.describe('Personbruker som ikke finnes', () => {
  test('Viser feilmelding med handlingsknapper', async ({ page }) => {
    await gotoApp(page, '/personbruker');

    await expect(
      page.getByRole('heading', { name: 'Personen vises ikke i' }),
    ).toBeVisible();
    await expect(
      page.getByRole('button', { name: 'Vis reglene på navet' }),
    ).toBeVisible();
    await expect(
      page.getByRole('button', { name: 'Opprett en melding i Porten' }),
    ).toBeVisible();
  });
});
