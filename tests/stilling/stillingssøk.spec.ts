import { gotoApp } from '@/tests/gotoApp';
import { slåPåMørkModus } from '@/tests/mørkModus';
import { snapshotTest } from '@/tests/snapshotTest';
import { visMørkModus } from '@/tests/visMørkModus';
import { tilgjengelighetstest } from '@navikt/toi-next-frontend/a11y';
import { expect, test } from '@playwright/test';

test.use({ storageState: 'tests/.auth/arbeigsgiverrettet.json' });

// ────────────────────────────────────────────────────────
// Stillingssøk – portefølje, filtre og resultater
// ────────────────────────────────────────────────────────
test.describe('Stillingssøk', () => {
  test.beforeEach(async ({ page }) => {
    await gotoApp(page, '/stilling');
  });

  test('Viser portefølje-knapper', async ({ page }) => {
    await expect(
      page.getByRole('button', { name: 'Alle', exact: true }),
    ).toBeVisible();
    await expect(
      page.getByRole('button', { name: 'Mine', exact: true }),
    ).toBeVisible();
    await expect(
      page.getByRole('button', { name: 'Mitt kontor', exact: true }),
    ).toBeVisible();
    await expect(
      page.getByRole('button', { name: 'arbeidsplassen.no' }),
    ).toBeVisible();
  });

  test('Kan bytte til Mine-portefølje', async ({ page }) => {
    await page.getByRole('button', { name: 'Mine', exact: true }).click();

    // Resultater skal fortsatt vises
    await expect(page.locator('main')).toBeVisible();
  });

  test('arbeidsplassen.no viser Med oppdrag-chip', async ({ page }) => {
    await page.getByRole('button', { name: 'arbeidsplassen.no' }).click();

    await expect(page.getByText('Med oppdrag')).toBeVisible();
  });

  test('Søkefelt i sidepanelet fungerer', async ({ page }) => {
    const sidepanel = page.getByLabel('Sidepanel');
    const søkefelt = sidepanel.getByRole('searchbox', {
      name: 'Søk i stillinger',
    });

    await søkefelt.fill('test');
    await søkefelt.press('Enter');

    // Resultater eller tom-tilstand skal vises
    await expect(page.locator('main')).toBeVisible();
  });

  test('Viser filtergrupper i sidepanelet', async ({ page }) => {
    const sidepanel = page.getByLabel('Sidepanel');

    await expect(sidepanel.getByText('Status')).toBeVisible();
    await expect(sidepanel.getByText('Område')).toBeVisible();
    await expect(sidepanel.getByText('Kategori')).toBeVisible();
  });

  test('Viser stillingskort i resultatlisten', async ({ page }) => {
    await expect(page.getByTestId('stillings-kort').first()).toBeVisible();
  });

  test('Standardsøk-knapper er synlige', async ({ page }) => {
    const sidepanel = page.getByLabel('Sidepanel');

    await expect(
      sidepanel.getByRole('button', { name: 'Bruk standardsøk' }),
    ).toBeVisible();
    await expect(
      sidepanel.getByRole('button', { name: 'Lagre nytt standardsøk' }),
    ).toBeVisible();
  });

  test('Fullskjerm-knappen i detaljpanelet har tilgjengelig navn', async ({
    page,
  }) => {
    await page.route('**/api/bruker/innstillinger', async (route) => {
      if (route.request().method() !== 'GET') return route.fallback();
      const respons = await route.fetch();
      await route.fulfill({
        response: respons,
        json: { ...(await respons.json()), windowMode: true },
      });
    });

    await gotoApp(page, '/stilling?visStillingId=minStilling');

    await expect(
      page.getByRole('button', { name: 'Åpne i fullskjerm' }),
    ).toBeVisible();
    await expect(
      page.getByRole('button', { name: 'Lukk vindu' }),
    ).toBeVisible();
  });

  snapshotTest(test);
  tilgjengelighetstest(test, { utvidet: true, mørkModus: slåPåMørkModus });
  visMørkModus('stillings-kort');
});
