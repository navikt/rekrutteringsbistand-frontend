import {
  FORMIDLING_LISTE_FORBUDT_TREFF_ID,
  FORMIDLING_LISTE_TOM_TREFF_ID,
} from '@/app/api/rekrutteringstreff/[...slug]/formidling/useFormidlinger';
import { gotoApp } from '@/tests/gotoApp';
import { snapshotTest } from '@/tests/snapshotTest';
import { expect, Page, test } from '@playwright/test';

const TOM_TILSTAND_TEKST = 'Ingen formidlinger er registrert for dette treffet';

async function gåTilFormidlingerFane(page: Page, treffId = 'publisert') {
  await gotoApp(page, `/rekrutteringstreff/${treffId}`);
  await page.getByRole('tab', { name: 'Formidlinger' }).click();
}

test.describe('Formidlinger-fane for arbeidsgiverrettet', () => {
  test.use({ storageState: 'tests/.auth/arbeigsgiverrettet.json' });

  test.beforeEach(async ({ page }) => {
    await gåTilFormidlingerFane(page);
  });

  test('Viser formidlinger i listen', async ({ page }) => {
    await expect(
      page.getByRole('button', {
        name: /Slett formidling for Én, Testperson/,
      }),
    ).toBeVisible();
    await expect(
      page.getByRole('button', {
        name: /Slett formidling for To, Testperson/,
      }),
    ).toBeVisible();
  });

  test('Viser én slett-knapp per formidling', async ({ page }) => {
    await expect(
      page.getByRole('button', { name: /Slett formidling/ }),
    ).toHaveCount(4);
  });

  test('Utvider formidling og henter stillingsdata', async ({ page }) => {
    await page.getByRole('button', { name: 'Vis detaljer' }).first().click();
    await expect(
      page.getByText('Antall stillinger:', { exact: false }),
    ).toBeVisible();
  });

  snapshotTest(test);
});

test.describe('Formidlinger-fane for veileder (jobbsøkerrettet)', () => {
  test.use({ storageState: 'tests/.auth/jobbsokerrettet.json' });

  test('Viser egne formidlinger', async ({ page }) => {
    await gåTilFormidlingerFane(page);
    await expect(
      page.getByRole('button', {
        name: /Slett formidling for Én, Testperson/,
      }),
    ).toBeVisible();
  });
});

test.describe('Formidlinger-fane - tilgangsstyring', () => {
  test.use({ storageState: 'tests/.auth/arbeigsgiverrettet.json' });

  test('Skjuler fanen når bruker får 403', async ({ page }) => {
    await gotoApp(
      page,
      `/rekrutteringstreff/${FORMIDLING_LISTE_FORBUDT_TREFF_ID}`,
    );
    await expect(
      page.getByRole('tab', { name: 'Jobbsøkere', exact: false }),
    ).toBeVisible();
    await expect(page.getByRole('tab', { name: 'Formidlinger' })).toHaveCount(
      0,
    );
  });
});

test.describe('Formidlinger-fane - tom tilstand', () => {
  test.describe('Arbeidsgiverrettet', () => {
    test.use({ storageState: 'tests/.auth/arbeigsgiverrettet.json' });

    test('Viser tom-tilstand når listen er tom', async ({ page }) => {
      await gåTilFormidlingerFane(page, FORMIDLING_LISTE_TOM_TREFF_ID);
      await expect(
        page.getByText(TOM_TILSTAND_TEKST, { exact: false }),
      ).toBeVisible();
    });
  });

  test.describe('Veileder (jobbsøkerrettet)', () => {
    test.use({ storageState: 'tests/.auth/jobbsokerrettet.json' });

    test('Viser tom-tilstand når veileder ikke har egne brukere', async ({
      page,
    }) => {
      await gåTilFormidlingerFane(page, FORMIDLING_LISTE_TOM_TREFF_ID);
      await expect(
        page.getByText(TOM_TILSTAND_TEKST, { exact: false }),
      ).toBeVisible();
    });
  });
});
