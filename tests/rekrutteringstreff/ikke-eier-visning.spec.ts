import { gotoApp } from '@/tests/gotoApp';
import { snapshotTest } from '@/tests/snapshotTest';
import { expect, test } from '@playwright/test';

test.use({ storageState: 'tests/.auth/arbeigsgiverrettet.json' });

test.describe('Ikke-eier – publisert rekrutteringstreff', () => {
  test.beforeEach(async ({ page }) => {
    await gotoApp(page, '/rekrutteringstreff/ikke-eier-publisert');
  });

  test('Viser tittel', async ({ page }) => {
    await expect(
      page.getByRole('heading', {
        name: 'Publisert – noen andre sitt',
      }),
    ).toBeVisible();
  });

  test('Viser ikke faner', async ({ page }) => {
    await expect(page.getByRole('tab', { name: /Jobbsøkere/ })).toHaveCount(0);
    await expect(page.getByRole('tab', { name: /Arbeidsgivere/ })).toHaveCount(
      0,
    );
  });

  test('Viser ikke eier-handlinger', async ({ page }) => {
    await expect(
      page.getByRole('button', { name: 'Rediger' }),
    ).not.toBeVisible();
    await expect(page.getByRole('button', { name: 'Avlys' })).not.toBeVisible();
    await expect(
      page.getByRole('button', { name: 'Fullfør' }),
    ).not.toBeVisible();
  });

  test('Viser "Finn og foreslå jobbsøkere"-knapp', async ({ page }) => {
    await expect(
      page.getByRole('link', { name: 'Finn og foreslå jobbsøkere' }),
    ).toBeVisible();
  });

  test('Kan legge til jobbsøker via fødselsnummer', async ({ page }) => {
    await page.getByText('Legg til jobbsøkere', { exact: true }).click();

    await page
      .getByRole('textbox', { name: 'Fødselsnummer på jobbsøker' })
      .fill('16828397900');
    await page
      .getByTestId('velg-kandidat-resultat')
      .getByRole('button', { name: 'Legg til' })
      .click();
    await page
      .getByRole('button', { name: 'Legg til jobbsøker', exact: true })
      .click();

    await expect(
      page.getByText('Jobbsøkere ble lagt til i rekrutteringstreffet'),
    ).toBeVisible();
  });

  test('Viser tidspunkt og sted', async ({ page }) => {
    await expect(page.getByText('Tid', { exact: true })).toBeVisible();
    await expect(page.getByText('Sted', { exact: true })).toBeVisible();
  });

  test('Kan ta eierskap til rekrutteringstreff', async ({ page }) => {
    await expect(
      page.getByRole('button', { name: 'Rediger' }),
    ).not.toBeVisible();

    await page
      .getByRole('button', { name: 'Legg til meg som medeier' })
      .click();
    await page.getByRole('button', { name: 'Bekreft' }).click();

    await expect(
      page.getByText('Du er nå lagt til som medeier.'),
    ).toBeVisible();
  });

  snapshotTest(test);
});

test.describe('Ikke-eier – fullført rekrutteringstreff', () => {
  test.beforeEach(async ({ page }) => {
    await gotoApp(page, '/rekrutteringstreff/ikke-eier-fullfort');
  });

  test('Viser tittel', async ({ page }) => {
    await expect(
      page.getByRole('heading', {
        name: 'Fullført – noen andre sitt',
      }),
    ).toBeVisible();
  });

  test('Viser ikke faner', async ({ page }) => {
    await expect(
      page.getByRole('tab', { name: 'Om treffet' }),
    ).not.toBeVisible();
    await expect(
      page.getByRole('tab', { name: /Jobbsøkere/ }),
    ).not.toBeVisible();
  });

  test('Viser ikke eier-handlinger', async ({ page }) => {
    await expect(
      page.getByRole('button', { name: 'Rediger' }),
    ).not.toBeVisible();
    await expect(page.getByRole('button', { name: 'Avlys' })).not.toBeVisible();
  });

  test('Viser ikke "Finn og foreslå jobbsøkere"-knapp', async ({ page }) => {
    await expect(
      page.getByRole('link', { name: 'Finn og foreslå jobbsøkere' }),
    ).not.toBeVisible();
  });

  test('Viser tidspunkt og sted', async ({ page }) => {
    await expect(page.getByText('Tid', { exact: true })).toBeVisible();
    await expect(page.getByText('Sted', { exact: true })).toBeVisible();
  });
});
