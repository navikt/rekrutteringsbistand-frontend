import { gotoApp } from '@/tests/gotoApp';
import { type Page, expect, test } from '@playwright/test';

test.use({ storageState: 'tests/.auth/arbeigsgiverrettet.json' });

/** Åpne Opprett-menyen i sidepanelet. */
async function åpneOpprettMeny(page: Page) {
  await page.getByRole('button', { name: 'Opprett' }).click();
}

// ────────────────────────────────────────────────────────
// 1. Opprett-menyen viser riktige valg
// ────────────────────────────────────────────────────────
test.describe('Opprett-meny', () => {
  test('Viser opprettkategorier for arbeidsgiverrettet rolle', async ({
    page,
  }) => {
    await gotoApp(page, '/');
    await åpneOpprettMeny(page);

    await expect(
      page.getByRole('menuitem', { name: 'Stillingsoppdrag' }),
    ).toBeVisible();
    await expect(
      page.getByRole('menuitem', { name: 'Jobbmesse' }),
    ).toBeVisible();
    await expect(
      page.getByRole('menuitem', { name: 'Etterregistrering' }),
    ).toBeVisible();
  });
});

// ────────────────────────────────────────────────────────
// 2. Opprett stillingsoppdrag → infodialog → redirect til rediger
// ────────────────────────────────────────────────────────
test.describe('Opprett stillingsoppdrag', () => {
  test('Klikk på Stillingsoppdrag navigerer til redigeringsside', async ({
    page,
  }) => {
    await gotoApp(page, '/');
    await åpneOpprettMeny(page);
    await page.getByRole('menuitem', { name: 'Stillingsoppdrag' }).click();

    const dialog = page.getByRole('dialog');
    await expect(dialog).toBeVisible();

    const opprettKall = page.waitForRequest(
      (request) =>
        request.method() === 'POST' &&
        new URL(request.url()).pathname === '/api/stilling/ny-stilling',
    );
    await dialog.getByRole('button', { name: 'Bekrefter' }).click();
    await opprettKall;

    // Skal navigere til /stilling/{uuid}/rediger
    await page.waitForURL(/\/stilling\/.*\/rediger/, { timeout: 10000 });
    await expect(dialog).toBeHidden();
    await expect(page.locator('main')).toBeVisible();
  });

  test('Avbryt i infodialogen oppretter ikke stillingsoppdrag', async ({
    page,
  }) => {
    const opprettKall: string[] = [];
    page.on('request', (request) => {
      if (
        request.method() === 'POST' &&
        new URL(request.url()).pathname === '/api/stilling/ny-stilling'
      ) {
        opprettKall.push(request.url());
      }
    });

    await gotoApp(page, '/');
    await åpneOpprettMeny(page);
    await page.getByRole('menuitem', { name: 'Stillingsoppdrag' }).click();

    const dialog = page.getByRole('dialog');
    await expect(dialog).toBeVisible();
    expect(opprettKall).toHaveLength(0);

    await dialog.getByRole('button', { name: 'Avbryt' }).click();
    await expect(dialog).toBeHidden();
    // Gi et ev. utilsiktet kall tid til å bli sendt før vi sjekker.
    await page.waitForLoadState('networkidle');

    expect(opprettKall).toHaveLength(0);
    await expect(page).not.toHaveURL(/\/rediger/);
  });

  test('Redigeringsside viser riktig header for ny stilling', async ({
    page,
  }) => {
    // Gå direkte til redigering av nyStilling-mock (INACTIVE/PENDING)
    await gotoApp(page, '/stilling/nyStilling/rediger');

    // Brødsmulesti viser "rediger" og Avbryt-knappen er tilgjengelig
    await expect(
      page.getByRole('navigation', { name: 'Brødsmulesti' }),
    ).toBeVisible();
    await expect(page.getByRole('button', { name: 'Avbryt' })).toBeVisible();
  });

  test('Redigeringsside viser stilling-moduler', async ({ page }) => {
    await gotoApp(page, '/stilling/nyStilling/rediger');

    // Sjekk at viktige modul-headinger er synlige
    await expect(
      page.getByRole('heading', { name: 'Om jobben' }),
    ).toBeVisible();
    await expect(
      page.getByRole('heading', { name: 'Praktiske forhold' }),
    ).toBeVisible();
    await expect(
      page.getByRole('heading', { name: 'Om virksomheten' }),
    ).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Sektor' })).toBeVisible();
  });

  test('Redigeringsside viser Avbryt og Slett-knapper', async ({ page }) => {
    await gotoApp(page, '/stilling/nyStilling/rediger');

    await expect(page.getByRole('button', { name: 'Avbryt' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Slett' })).toBeVisible();
  });
});

// ────────────────────────────────────────────────────────
// 3. Opprett jobbmesse → redirect til rediger
// ────────────────────────────────────────────────────────
test.describe('Opprett jobbmesse', () => {
  test('Klikk på Jobbmesse navigerer til redigeringsside', async ({ page }) => {
    await gotoApp(page, '/');
    await åpneOpprettMeny(page);
    await page.getByRole('menuitem', { name: 'Jobbmesse' }).click();

    await page.waitForURL(/\/stilling\/.*\/rediger/, { timeout: 10000 });
    await expect(page.locator('main')).toBeVisible();
  });
});

// ────────────────────────────────────────────────────────
// 4. Opprett etterregistrering → redirect til rediger
// ────────────────────────────────────────────────────────
test.describe('Opprett etterregistrering', () => {
  test('Klikk på Etterregistrering navigerer til redigeringsside', async ({
    page,
  }) => {
    await gotoApp(page, '/');
    await åpneOpprettMeny(page);
    await page.getByRole('menuitem', { name: 'Etterregistrering' }).click();

    // Etterregistrering navigerer til /etterregistrering/{uuid}/rediger
    await page.waitForURL(/\/etterregistrering\/.*\/rediger/, {
      timeout: 10000,
    });
    await expect(page.locator('main')).toBeVisible();
  });
});

// ────────────────────────────────────────────────────────
// 5. Jobbsøkerrettet – kan opprette etterregistrering, ikke stilling
// ────────────────────────────────────────────────────────
test.describe('Opprett-meny – jobbsøkerrettet rolle', () => {
  test.use({ storageState: 'tests/.auth/jobbsokerrettet.json' });

  test('Viser kun Etterregistrering for jobbsøkerrettet rolle', async ({
    page,
  }) => {
    await gotoApp(page, '/');
    await åpneOpprettMeny(page);

    await expect(
      page.getByRole('menuitem', { name: 'Etterregistrering' }),
    ).toBeVisible();

    // Stillingsoppdrag og Jobbmesse krever arbeidsgiverrettet
    await expect(
      page.getByRole('menuitem', { name: 'Stillingsoppdrag' }),
    ).toBeHidden();
    await expect(
      page.getByRole('menuitem', { name: 'Jobbmesse' }),
    ).toBeHidden();
  });
});
