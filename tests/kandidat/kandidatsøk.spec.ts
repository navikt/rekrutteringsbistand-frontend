import { gotoApp } from '@/tests/gotoApp';
import { snapshotTest } from '@/tests/snapshotTest';
import { expect, test } from '@playwright/test';

test.use({ storageState: 'tests/.auth/arbeigsgiverrettet.json' });

// ────────────────────────────────────────────────────────
// Kandidatsøk (/kandidat) – utvidet dekning
// ────────────────────────────────────────────────────────
test.describe('Kandidatsøk', () => {
  test.beforeEach(async ({ page, context }) => {
    await context.addInitScript(() =>
      sessionStorage.removeItem('markerte-kandidater'),
    );
    await gotoApp(page, '/kandidat');
  });

  test('Viser brødsmulesti med Jobbsøkere', async ({ page }) => {
    await expect(
      page.getByLabel('Brødsmulesti').getByText('Jobbsøkere'),
    ).toBeVisible();
  });

  test('Viser alle portefølje-knapper', async ({ page }) => {
    await expect(
      page.getByRole('button', { name: 'Alle kontorer' }),
    ).toBeVisible();
    await expect(
      page.getByRole('button', { name: 'Mine brukere' }),
    ).toBeVisible();
    await expect(
      page.getByRole('button', { name: 'Mitt kontor' }),
    ).toBeVisible();
    await expect(
      page.getByRole('button', { name: 'Mine kontorer' }),
    ).toBeVisible();
    await expect(
      page.getByRole('button', { name: 'Valgte kontorer' }),
    ).toBeVisible();
  });

  test('Kan bytte til Alle kontorer-portefølje', async ({ page }) => {
    await page.getByRole('button', { name: 'Alle kontorer' }).click();

    // Kandidatkort skal vises
    await expect(
      page.getByRole('checkbox', { name: 'Marker alle på siden' }),
    ).toBeVisible();
  });

  test('Viser kandidatsøk-filter i sidepanelet', async ({ page }) => {
    const sidepanel = page.getByLabel('Sidepanel');

    await expect(sidepanel).toBeVisible();
  });

  test('Viser kandidatkort med innhold', async ({ page }) => {
    // Sjekk at minst ett kandidatkort med heading (navn) vises
    const kandidatKort = page.getByTestId(
      'kandidatkort-lenke-kandidat-arenaKandidatnr-2',
    );
    await expect(kandidatKort).toBeVisible();
  });

  test('Kan markere alle og se Lagre-knapp', async ({ page }) => {
    await page.getByRole('checkbox', { name: 'Marker alle på siden' }).check();

    await expect(
      page.getByRole('button', { name: 'Lagre i kandidatliste' }),
    ).toBeVisible();
  });

  test('Lagre i kandidatliste åpner dialog', async ({ page }) => {
    await page.getByRole('checkbox', { name: 'Marker alle på siden' }).check();
    await page.getByRole('button', { name: 'Lagre i kandidatliste' }).click();

    // Dialog skal vises
    await expect(page.getByRole('dialog')).toBeVisible();
    await page.getByRole('button', { name: 'Avbryt' }).click();
  });

  test('Kan åpne kandidat via kandidatkort', async ({ page }) => {
    await page
      .getByTestId('kandidatkort-lenke-kandidat-arenaKandidatnr-2')
      .click();

    // WindowView åpner jobbsøker-visning
    await expect(
      page.getByRole('link', { name: 'Finn jobb', exact: true }),
    ).toBeVisible();
  });

  snapshotTest(test);
});
