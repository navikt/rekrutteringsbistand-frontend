import { gotoApp } from '@/tests/gotoApp';
import { snapshotTest } from '@/tests/snapshotTest';
import { expect, test } from '@playwright/test';

test.use({ storageState: 'tests/.auth/arbeigsgiverrettet.json' });

test.describe('Rekrutteringstreff detaljvisning - publisert', () => {
  test.beforeEach(async ({ page }) => {
    await gotoApp(page, '/rekrutteringstreff/publisert');
  });

  test('Viser tittel på treffet', async ({ page }) => {
    await expect(
      page.getByRole('heading', {
        name: 'Rekrutteringstreff i Kristiansand',
      }),
    ).toBeVisible();
  });

  test('Viser faner for eier', async ({ page }) => {
    await expect(page.getByRole('tab', { name: 'Om treffet' })).toBeVisible();
    await expect(page.getByRole('tab', { name: /Jobbsøkere/ })).toBeVisible();
    await expect(
      page.getByRole('tab', { name: /Arbeidsgivere/ }),
    ).toBeVisible();
    await expect(page.getByRole('tab', { name: 'Hendelser' })).toBeVisible();
  });

  test('Om treffet-fanen er aktiv som standard', async ({ page }) => {
    const omTreffetTab = page.getByRole('tab', { name: 'Om treffet' });
    await expect(omTreffetTab).toHaveAttribute('aria-selected', 'true');
  });

  test('Viser "Om treffet"-overskrift i innholdet', async ({ page }) => {
    await expect(
      page.getByRole('heading', { name: 'Om treffet' }),
    ).toBeVisible();
  });

  test('Viser innlegg-innhold', async ({ page }) => {
    await expect(
      page.getByText('Hei og velkommen!', { exact: false }),
    ).toBeVisible();
  });

  test('Viser handlingsknapper for publisert treff', async ({ page }) => {
    await expect(page.getByRole('button', { name: 'Rediger' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Fullfør' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Avlys' })).toBeVisible();
  });

  test('Kan navigere til Jobbsøkere-fanen', async ({ page }) => {
    await page.getByRole('tab', { name: /Jobbsøkere/ }).click();
    await expect(page.getByText('Etternavn01, Marius').first()).toBeVisible();
  });

  test('Kan navigere til Arbeidsgivere-fanen', async ({ page }) => {
    await page.getByRole('tab', { name: /Arbeidsgivere/ }).click();
    await expect(
      page.getByRole('button', { name: 'Legg til arbeidsgiver' }),
    ).toBeVisible();
  });

  test('Kan navigere til Hendelser-fanen', async ({ page }) => {
    await page.getByRole('tab', { name: 'Hendelser' }).click();
    await expect(page.getByText('Hendelse', { exact: true })).toBeVisible();
    await expect(page.getByText('Ressurs')).toBeVisible();
    await expect(page.getByText('Tidspunkt', { exact: true })).toBeVisible();
  });

  snapshotTest(test);
});

test.describe('Rekrutteringstreff detaljvisning - fullført', () => {
  test('Viser Gjenåpne-knapp for fullført treff', async ({ page }) => {
    await gotoApp(page, '/rekrutteringstreff/fullfort');
    await expect(page.getByRole('button', { name: 'Gjenåpne' })).toBeVisible();
  });

  test('Viser ikke Avlys-knapp for fullført treff', async ({ page }) => {
    await gotoApp(page, '/rekrutteringstreff/fullfort');
    await expect(page.getByRole('button', { name: 'Avlys' })).not.toBeVisible();
  });
});

test.describe('Rekrutteringstreff detaljvisning - avlyst', () => {
  test('Viser ikke handlingsknapper for avlyst treff', async ({ page }) => {
    await gotoApp(page, '/rekrutteringstreff/avlyst');
    await expect(
      page.getByRole('button', { name: 'Rediger' }),
    ).not.toBeVisible();
    await expect(
      page.getByRole('button', { name: 'Fullfør' }),
    ).not.toBeVisible();
    await expect(page.getByRole('button', { name: 'Avlys' })).not.toBeVisible();
  });
});
