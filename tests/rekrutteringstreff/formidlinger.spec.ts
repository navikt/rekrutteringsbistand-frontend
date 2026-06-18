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
  await page.getByRole('tab', { name: /Formidlinger/ }).click();
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

  test('Viser nøyaktig antall formidlinger i fanetittelen', async ({
    page,
  }) => {
    await expect(
      page.getByRole('tab', { name: 'Formidlinger (4)' }),
    ).toBeVisible();
  });

  test('Viser én slett-knapp per formidling', async ({ page }) => {
    await expect(
      page.getByRole('button', { name: /Slett formidling/ }),
    ).toHaveCount(4);
  });

  test('Utvider formidling og henter stillingsdata', async ({ page }) => {
    await page.getByText('Én, Testperson').click();
    await expect(
      page.getByText('% stilling', { exact: false }).first(),
    ).toBeVisible();
  });

  test('Viser stillingsid i detaljene', async ({ page }) => {
    await page.getByText('Én, Testperson').click();
    await expect(page.getByText('Id', { exact: false }).first()).toBeVisible();
  });

  test('Viser knapp for å legge til formidling i både header og på siden', async ({
    page,
  }) => {
    const opprettKnapper = page.getByRole('button', {
      name: 'Opprett formidling',
    });
    await expect(opprettKnapper).toHaveCount(2);
    await expect(opprettKnapper.first()).toBeVisible();
    await expect(opprettKnapper.last()).toBeVisible();
  });

  test('Viser yrkestittel-kolonne med verdi', async ({ page }) => {
    await expect(
      page.getByText('Butikkmedarbeider', { exact: false }),
    ).toBeVisible();
  });

  test('Viser «Inaktiv kandidat» når kandidaten er ute av kandidatsøket', async ({
    page,
  }) => {
    await expect(
      page.getByText('Inaktiv kandidat', { exact: false }),
    ).toBeVisible();
  });

  test('Filtrerer listen på arbeidsgiver', async ({ page }) => {
    await expect(
      page.getByRole('button', { name: /Slett formidling/ }),
    ).toHaveCount(4);

    await page
      .getByRole('button', { name: 'Arbeidsgiver', exact: true })
      .first()
      .click();
    await page
      .getByRole('checkbox', { name: 'Eksempelfirma Norge AS' })
      .check();

    await expect(
      page.getByRole('button', { name: /Slett formidling/ }),
    ).toHaveCount(2);
    await expect(
      page.getByRole('button', {
        name: /Slett formidling for Tre, Testperson/,
      }),
    ).toBeVisible();
  });

  test('Sorterer listen på jobbsøker', async ({ page }) => {
    await page.getByRole('button', { name: 'Jobbsøker', exact: true }).click();

    const førsteRad = page
      .getByRole('button', { name: /Slett formidling/ })
      .first();
    await expect(førsteRad).toHaveAccessibleName(
      /Slett formidling for Én, Testperson/,
    );
  });

  snapshotTest(test);
});

test.describe('Formidlinger-fane for veileder (jobbsøkerrettet)', () => {
  test.use({ storageState: 'tests/.auth/jobbsokerrettet.json' });

  test('Viser egne formidlinger og nøyaktig antall i fanetittelen', async ({
    page,
  }) => {
    await gåTilFormidlingerFane(page);
    await expect(
      page.getByRole('tab', { name: 'Formidlinger (2)' }),
    ).toBeVisible();
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
      page.getByRole('tab', { name: /Jobbsøkere/, exact: false }),
    ).toBeVisible();
    await expect(page.getByRole('tab', { name: /Formidlinger/ })).toHaveCount(
      0,
    );
  });
});

test.describe('Formidlinger-fane - tom tilstand', () => {
  test.describe('Arbeidsgiverrettet', () => {
    test.use({ storageState: 'tests/.auth/arbeigsgiverrettet.json' });

    test('Viser tom-tilstand og null i fanetittelen', async ({ page }) => {
      await gåTilFormidlingerFane(page, FORMIDLING_LISTE_TOM_TREFF_ID);
      await expect(
        page.getByRole('tab', { name: 'Formidlinger (0)' }),
      ).toBeVisible();
      await expect(
        page.getByText(TOM_TILSTAND_TEKST, { exact: false }),
      ).toBeVisible();
    });
  });

  test.describe('Veileder (jobbsøkerrettet)', () => {
    test.use({ storageState: 'tests/.auth/jobbsokerrettet.json' });

    test('Viser tom-tilstand og null i fanetittelen', async ({ page }) => {
      await gåTilFormidlingerFane(page, FORMIDLING_LISTE_TOM_TREFF_ID);
      await expect(
        page.getByRole('tab', { name: 'Formidlinger (0)' }),
      ).toBeVisible();
      await expect(
        page.getByText(TOM_TILSTAND_TEKST, { exact: false }),
      ).toBeVisible();
    });
  });
});
