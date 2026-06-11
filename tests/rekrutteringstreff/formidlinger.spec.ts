import {
  FORMIDLING_LISTE_FORBUDT_TREFF_ID,
  FORMIDLING_LISTE_TOM_TREFF_ID,
} from '@/app/api/rekrutteringstreff/[...slug]/formidling/useFormidlinger';
import { gotoApp } from '@/tests/gotoApp';
import { snapshotTest } from '@/tests/snapshotTest';
import { expect, test } from '@playwright/test';

test.describe('Formidlinger-fane', () => {
  test.describe('Arbeidsgiverrettet', () => {
    test.use({ storageState: 'tests/.auth/arbeigsgiverrettet.json' });

    test.beforeEach(async ({ page }) => {
      await gotoApp(page, '/rekrutteringstreff/publisert');
      await page.getByRole('tab', { name: 'Formidlinger' }).click();
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

    test('Viser slett-knapp per formidling', async ({ page }) => {
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

  test.describe('Tilgangsstyring av fane', () => {
    test.describe('Arbeidsgiverrettet uten kontortilgang', () => {
      test.use({ storageState: 'tests/.auth/arbeigsgiverrettet.json' });

      test('Skjuler Formidlinger-fanen når bruker får 403', async ({
        page,
      }) => {
        await gotoApp(
          page,
          `/rekrutteringstreff/${FORMIDLING_LISTE_FORBUDT_TREFF_ID}`,
        );
        await expect(
          page.getByRole('tab', { name: 'Jobbsøkere', exact: false }),
        ).toBeVisible();
        await expect(
          page.getByRole('tab', { name: 'Formidlinger' }),
        ).toHaveCount(0);
      });
    });

    test.describe('Arbeidsgiverrettet uten formidlinger', () => {
      test.use({ storageState: 'tests/.auth/arbeigsgiverrettet.json' });

      test('Viser fanen med tom-tilstand når listen er tom', async ({
        page,
      }) => {
        await gotoApp(
          page,
          `/rekrutteringstreff/${FORMIDLING_LISTE_TOM_TREFF_ID}`,
        );
        await page.getByRole('tab', { name: 'Formidlinger' }).click();
        await expect(
          page.getByText('Ingen formidlinger er registrert for dette treffet', {
            exact: false,
          }),
        ).toBeVisible();
      });
    });

    test.describe('Veileder (jobbsøkerrettet)', () => {
      test.use({ storageState: 'tests/.auth/jobbsokerrettet.json' });

      test('Viser fanen med egne formidlinger', async ({ page }) => {
        await gotoApp(page, '/rekrutteringstreff/publisert');
        await page.getByRole('tab', { name: 'Formidlinger' }).click();
        await expect(
          page.getByRole('button', {
            name: /Slett formidling for Én, Testperson/,
          }),
        ).toBeVisible();
      });

      test('Viser fanen med tom-tilstand når veileder ikke har egne brukere', async ({
        page,
      }) => {
        await gotoApp(
          page,
          `/rekrutteringstreff/${FORMIDLING_LISTE_TOM_TREFF_ID}`,
        );
        await expect(
          page.getByRole('tab', { name: 'Formidlinger' }),
        ).toBeVisible();
        await page.getByRole('tab', { name: 'Formidlinger' }).click();
        await expect(
          page.getByText('Ingen formidlinger er registrert for dette treffet', {
            exact: false,
          }),
        ).toBeVisible();
      });
    });
  });
});
