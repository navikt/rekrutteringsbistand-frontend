import { gotoApp } from '@/tests/gotoApp';
import { snapshotTest } from '@/tests/snapshotTest';
import { expect, test } from '@playwright/test';

test.use({ storageState: 'tests/.auth/arbeigsgiverrettet.json' });

test.describe('Forhåndsvisning – eier, publisert treff', () => {
  test.beforeEach(async ({ page }) => {
    await gotoApp(page, '/rekrutteringstreff/publisert');
  });

  test('Viser Forhåndsvis-knapp', async ({ page }) => {
    await expect(
      page.getByRole('button', { name: 'Forhåndsvis' }),
    ).toBeVisible();
  });

  test('Åpner forhåndsvisning ved klikk på Forhåndsvis', async ({ page }) => {
    await page.getByRole('button', { name: 'Forhåndsvis' }).click();

    await expect(
      page.getByText('Forhåndsvisning av invitasjonen til jobbsøkere'),
    ).toBeVisible();

    await expect(
      page.getByRole('heading', { name: 'Publisert', level: 1 }),
    ).toBeVisible();

    await expect(
      page.getByRole('button', { name: 'Avslutt forhåndsvisning' }),
    ).toBeVisible();
  });

  test('Skjuler faner mens forhåndsvisning er åpen', async ({ page }) => {
    await expect(page.getByRole('tab', { name: 'Om treffet' })).toBeVisible();

    await page.getByRole('button', { name: 'Forhåndsvis' }).click();

    await expect(
      page.getByRole('tab', { name: 'Om treffet' }),
    ).not.toBeVisible();
    await expect(
      page.getByRole('tab', { name: /Jobbsøkere/ }),
    ).not.toBeVisible();
  });

  test('Kan lukke forhåndsvisning med "Avslutt forhåndsvisning"', async ({
    page,
  }) => {
    await page.getByRole('button', { name: 'Forhåndsvis' }).click();
    await expect(
      page.getByText('Forhåndsvisning av invitasjonen til jobbsøkere'),
    ).toBeVisible();

    await page.getByRole('button', { name: 'Avslutt forhåndsvisning' }).click();

    await expect(
      page.getByText('Forhåndsvisning av invitasjonen til jobbsøkere'),
    ).not.toBeVisible();
    await expect(page.getByRole('tab', { name: 'Om treffet' })).toBeVisible();
    await expect(
      page.getByRole('button', { name: 'Forhåndsvis' }),
    ).toBeVisible();
  });

  snapshotTest(test);
});

test.describe('Forhåndsvisning – eier, ikke publisert treff', () => {
  test('Viser ikke Forhåndsvis-knapp for avlyst treff', async ({ page }) => {
    await gotoApp(page, '/rekrutteringstreff/avlyst');
    await expect(
      page.getByRole('heading', { name: 'Avlyst', level: 1 }),
    ).toBeVisible();
    await expect(
      page.getByRole('button', { name: 'Forhåndsvis' }),
    ).not.toBeVisible();
  });

  test('Viser ikke Forhåndsvis-knapp for fullført treff', async ({ page }) => {
    await gotoApp(page, '/rekrutteringstreff/fullfort');
    await expect(
      page.getByRole('heading', { name: 'Fullført', level: 1 }),
    ).toBeVisible();
    await expect(
      page.getByRole('button', { name: 'Forhåndsvis' }),
    ).not.toBeVisible();
  });

  test('Viser ikke Forhåndsvis-knapp for utkast', async ({ page }) => {
    await gotoApp(page, '/rekrutteringstreff/utkast');
    await expect(
      page.getByRole('heading', { name: 'Treffet er ikke publisert enda' }),
    ).toBeVisible();
    await expect(
      page.getByRole('button', { name: 'Forhåndsvis' }),
    ).not.toBeVisible();
  });
});

test.describe('Forhåndsvisning – ikke vist for ikke-eier', () => {
  test('Viser ikke Forhåndsvis-knapp for ikke-eier av publisert treff', async ({
    page,
  }) => {
    await gotoApp(page, '/rekrutteringstreff/ikke-eier-publisert');
    await expect(
      page.getByRole('heading', { name: 'Publisert – noen andre sitt' }),
    ).toBeVisible();
    await expect(
      page.getByRole('button', { name: 'Forhåndsvis' }),
    ).not.toBeVisible();
  });
});
