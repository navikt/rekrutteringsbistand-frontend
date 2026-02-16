import { gotoApp } from '@/tests/gotoApp';
import { expect, test } from '@playwright/test';

test.use({ storageState: 'tests/.auth/arbeigsgiverrettet.json' });

// ────────────────────────────────────────────────────────
// 1. Rediger eksisterende stilling – grunnleggende innhold
// ────────────────────────────────────────────────────────
test.describe('Rediger stilling', () => {
  test('Viser riktig header for eksisterende stilling', async ({ page }) => {
    await gotoApp(page, '/stilling/minStilling/rediger');

    // Brødsmulesti viser at vi er på redigeringssiden
    await expect(
      page.getByRole('navigation', { name: 'Brødsmulesti' }),
    ).toBeVisible();
    await expect(page.getByRole('button', { name: 'Avbryt' })).toBeVisible();
  });

  test('Viser alle stilling-moduler', async ({ page }) => {
    await gotoApp(page, '/stilling/minStilling/rediger');

    const moduler = [
      'Om jobben',
      'Praktiske forhold',
      'Om virksomheten',
      'Sektor',
      'Sted',
      'Viktige datoer',
      'Om tilrettelegging',
      'Om stillingsoppdraget',
    ];

    for (const modul of moduler) {
      await expect(page.getByRole('heading', { name: modul })).toBeVisible();
    }
  });

  test('Viser Avbryt og Slett-knapper', async ({ page }) => {
    await gotoApp(page, '/stilling/minStilling/rediger');

    await expect(page.getByRole('button', { name: 'Avbryt' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Slett' })).toBeVisible();
  });

  test('Kan ikke redigere ekstern stilling', async ({ page }) => {
    await gotoApp(page, '/stilling/eksternStilling/rediger');

    await expect(
      page.getByText('Kan ikke endre stilling fra arbeidsplassen.no'),
    ).toBeVisible();
    await expect(
      page.getByRole('button', { name: 'Tilbake', exact: true }),
    ).toBeVisible();
  });
});

// ────────────────────────────────────────────────────────
// 2. Rediger etterregistrering – formidling-moduler
// ────────────────────────────────────────────────────────
test.describe('Rediger etterregistrering', () => {
  test('Viser formidling-moduler for etterregistrering', async ({ page }) => {
    await gotoApp(page, '/etterregistrering/etterregistreringApen/rediger');

    const moduler = [
      'Yrkestittel',
      'Virksomheten',
      'Sektor',
      'Ansettelsesform',
      'Sted',
      'Inkludering',
    ];

    for (const modul of moduler) {
      await expect(
        page.getByText(modul, { exact: true }).first(),
      ).toBeVisible();
    }
  });

  test('Viser Slett-knapp men ikke Avbryt for etterregistrering', async ({
    page,
  }) => {
    await gotoApp(page, '/etterregistrering/etterregistreringApen/rediger');

    await expect(page.getByRole('button', { name: 'Slett' })).toBeVisible();
    // Etterregistrering skjuler Avbryt-knappen
    await expect(page.getByRole('button', { name: 'Avbryt' })).toBeHidden();
  });
});
