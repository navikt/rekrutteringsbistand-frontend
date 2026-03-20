import { gotoApp } from '@/tests/gotoApp';
import { snapshotTest } from '@/tests/snapshotTest';
import { expect, test } from '@playwright/test';

test.use({ storageState: 'tests/.auth/arbeigsgiverrettet.json' });

test.describe('Rekrutteringstreff søk', () => {
  test.beforeEach(async ({ page }) => {
    await gotoApp(page, '/rekrutteringstreff');
  });

  test('Viser visningtabs Alle, Mine og Mitt kontor', async ({ page }) => {
    await expect(
      page.getByRole('button', { name: 'Alle', exact: true }),
    ).toBeVisible();
    await expect(
      page.getByRole('button', { name: 'Mine', exact: true }),
    ).toBeVisible();
    await expect(
      page.getByRole('button', { name: 'Mitt kontor', exact: true }),
    ).toBeVisible();
  });

  test('Viser statusfilter-checkboxer', async ({ page }) => {
    const statusGruppe = page.getByRole('group', { name: 'Status' });
    await expect(
      statusGruppe.getByRole('checkbox', { name: /Utkast/ }),
    ).toBeVisible();
    await expect(
      statusGruppe.getByRole('checkbox', {
        name: /Publisert - åpent/,
      }),
    ).toBeVisible();
    await expect(
      statusGruppe.getByRole('checkbox', {
        name: /Publisert - frist passert/,
      }),
    ).toBeVisible();
    await expect(
      statusGruppe.getByRole('checkbox', { name: /Fullført/ }),
    ).toBeVisible();
    await expect(
      statusGruppe.getByRole('checkbox', { name: /Avlyst/ }),
    ).toBeVisible();
  });

  test('Viser ikke fritekstsøk som backend ikke støtter', async ({ page }) => {
    await expect(
      page.getByRole('searchbox', { name: 'Søk i rekrutteringstreff' }),
    ).toHaveCount(0);
  });

  test('Viser treffkort i resultatlisten', async ({ page }) => {
    await expect(
      page.getByRole('heading', {
        name: 'Jobbtreff for unge under 30 #28',
        exact: true,
      }),
    ).toBeVisible();
  });

  test('Kan bytte til Mine-fanen', async ({ page }) => {
    await page.getByRole('button', { name: 'Mine', exact: true }).click();
    await expect(
      page
        .getByRole('heading', {
          name: 'Treff uten navn',
          exact: true,
        })
        .first(),
    ).toBeVisible();
    await expect(
      page.getByRole('heading', {
        name: 'Jobbmesse for helsesektoren #2',
        exact: true,
      }),
    ).toHaveCount(0);
  });

  test('Kan bytte til Mitt kontor-fanen', async ({ page }) => {
    await page
      .getByRole('button', { name: 'Mitt kontor', exact: true })
      .click();
    await expect(
      page
        .getByRole('heading', {
          name: 'Treff uten navn',
          exact: true,
        })
        .first(),
    ).toBeVisible();
    await expect(
      page.getByRole('heading', {
        name: 'Jobbmesse for helsesektoren #2',
        exact: true,
      }),
    ).toHaveCount(0);
  });

  test('Viser paginering når det er mange treff', async ({ page }) => {
    await expect(
      page.getByRole('button', { name: 'Neste side', exact: true }),
    ).toBeVisible();
  });

  test('Kan navigere til side 2 med paginering', async ({ page }) => {
    await page.getByRole('button', { name: 'Neste side', exact: true }).click();

    await expect(
      page.getByRole('heading', {
        name: 'Jobbtreff for unge under 30 #8',
        exact: true,
      }),
    ).toBeVisible();
    await expect(
      page.getByRole('heading', {
        name: 'Jobbtreff for unge under 30 #28',
        exact: true,
      }),
    ).toHaveCount(0);
  });

  test('Kan krysse av statusfilter', async ({ page }) => {
    const publisertApenCheckbox = page.getByRole('checkbox', {
      name: /Publisert - åpent/,
    });
    await publisertApenCheckbox.check();

    await expect(
      page.getByRole('heading', {
        name: 'Rekrutteringstreff – bygg og anlegg #1',
        exact: true,
      }),
    ).toHaveCount(0);
    await expect(
      page.getByRole('heading', {
        name: 'Jobbmesse for helsesektoren #2',
        exact: true,
      }),
    ).toBeVisible();
  });

  test('Viser sorteringsvalg med radioknapper', async ({ page }) => {
    const sorterGruppe = page.getByRole('group', { name: 'Sorter' });
    await expect(
      sorterGruppe.getByRole('radio', { name: 'Sist oppdaterte' }),
    ).toBeVisible();
    await expect(
      sorterGruppe.getByRole('radio', { name: 'Nyeste' }),
    ).toBeVisible();
    await expect(
      sorterGruppe.getByRole('radio', { name: 'Eldste' }),
    ).toBeVisible();
  });

  test('Sist oppdaterte er valgt som standard sortering', async ({ page }) => {
    const sistOppdaterte = page.getByRole('radio', {
      name: 'Sist oppdaterte',
    });
    await expect(sistOppdaterte).toBeChecked();
  });

  test('Kan endre sortering til Nyeste', async ({ page }) => {
    await page.getByRole('radio', { name: 'Nyeste' }).click();
    await expect(page.getByRole('radio', { name: 'Nyeste' })).toBeChecked();
    await expect(page).toHaveURL(/sortering=nyeste/);
  });

  test('Kan endre sortering til Eldste', async ({ page }) => {
    await page.getByRole('radio', { name: 'Eldste' }).click();
    await expect(page.getByRole('radio', { name: 'Eldste' })).toBeChecked();
    await expect(page).toHaveURL(/sortering=eldste/);
  });

  snapshotTest(test);
});

test.describe('Rekrutteringstreff søk – jobbsøkerrettet rolle', () => {
  test.use({ storageState: 'tests/.auth/jobbsokerrettet.json' });

  test.beforeEach(async ({ page }) => {
    await gotoApp(page, '/rekrutteringstreff');
  });

  test('Ser ikke knappen Nytt rekrutteringstreff', async ({ page }) => {
    await expect(
      page.getByRole('button', { name: 'Nytt rekrutteringstreff' }),
    ).toBeHidden();
  });

  test('Ser fortsatt treffkort i resultatlisten', async ({ page }) => {
    await expect(
      page.getByRole('heading', {
        name: 'Jobbtreff for unge under 30 #28',
        exact: true,
      }),
    ).toBeVisible();
  });
});

test.describe('Rekrutteringstreff søk – modia generell rolle', () => {
  test.use({ storageState: 'tests/.auth/modia_generell.json' });

  test.beforeEach(async ({ page }) => {
    await gotoApp(page, '/rekrutteringstreff');
  });

  test('Ser ikke knappen Nytt rekrutteringstreff', async ({ page }) => {
    await expect(
      page.getByRole('button', { name: 'Nytt rekrutteringstreff' }),
    ).toBeHidden();
  });

  test('Ser fortsatt treffkort i resultatlisten', async ({ page }) => {
    await expect(
      page.getByRole('heading', {
        name: 'Jobbtreff for unge under 30 #28',
        exact: true,
      }),
    ).toBeVisible();
  });
});
