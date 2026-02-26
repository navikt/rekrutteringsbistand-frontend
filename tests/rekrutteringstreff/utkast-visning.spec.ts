import { gotoApp } from '@/tests/gotoApp';
import { snapshotTest } from '@/tests/snapshotTest';
import { expect, test } from '@playwright/test';

test.use({ storageState: 'tests/.auth/arbeigsgiverrettet.json' });

test.describe('Rekrutteringstreff utkast-visning', () => {
  test.beforeEach(async ({ page }) => {
    await gotoApp(page, '/rekrutteringstreff/utkast');
  });

  test('Viser utkast-melding', async ({ page }) => {
    await expect(
      page.getByRole('heading', { name: 'Treffet er ikke publisert enda' }),
    ).toBeVisible();
  });

  test('Viser "Fortsett å opprette"-knapp', async ({ page }) => {
    await expect(
      page.getByRole('button', { name: 'Fortsett å opprette' }),
    ).toBeVisible();
  });

  test('Viser Slett-knapp', async ({ page }) => {
    await expect(
      page.getByRole('button', { name: 'Slett' }).first(),
    ).toBeVisible();
  });

  test('Viser beskrivende tekst om utkast', async ({ page }) => {
    await expect(
      page.getByText('Fortsett der du slapp, eller slett det hvis du vil'),
    ).toBeVisible();
  });

  test('Åpner slette-modal fra utkastvisning', async ({ page }) => {
    await page.getByRole('button', { name: 'Slett' }).first().click();
    await expect(
      page.getByRole('heading', { name: 'Slett treffet' }),
    ).toBeVisible();
    await expect(
      page.getByText('Siden treffet ikke er publisert kan du slette det.'),
    ).toBeVisible();
  });

  test('Slette-modal har bekreft og avbryt-knapper', async ({ page }) => {
    await page.getByRole('button', { name: 'Slett' }).first().click();
    await expect(
      page.getByRole('button', { name: 'Ja, slett treffet' }),
    ).toBeVisible();
    await expect(
      page.getByRole('button', { name: 'Nei, behold treffet' }),
    ).toBeVisible();
  });

  test('Kan lukke slette-modal med avbryt', async ({ page }) => {
    await page.getByRole('button', { name: 'Slett' }).first().click();
    await expect(
      page.getByRole('heading', { name: 'Slett treffet' }),
    ).toBeVisible();
    await page.getByRole('button', { name: 'Nei, behold treffet' }).click();
    await expect(
      page.getByRole('heading', { name: 'Slett treffet' }),
    ).not.toBeVisible();
  });

  test('Viser ikke tabs for utkast', async ({ page }) => {
    await expect(
      page.getByRole('tab', { name: /Om treffet/ }),
    ).not.toBeVisible();
    await expect(
      page.getByRole('tab', { name: /Jobbsøkere/ }),
    ).not.toBeVisible();
    await expect(
      page.getByRole('tab', { name: /Arbeidsgivere/ }),
    ).not.toBeVisible();
  });

  snapshotTest(test);
});

test.describe('Rekrutteringstreff utkast-visning for ikke-eier', () => {
  test.beforeEach(async ({ page }) => {
    await gotoApp(page, '/rekrutteringstreff/ikke-eier-utkast');
  });

  test('Viser utkast-melding', async ({ page }) => {
    await expect(
      page.getByRole('heading', { name: 'Treffet er ikke publisert enda' }),
    ).toBeVisible();
  });

  test('Viser beskrivende tekst for ikke-eier', async ({ page }) => {
    await expect(
      page.getByText('Treffet er opprettet, men er ikke publisert enda.'),
    ).toBeVisible();
  });

  test('Viser ikke "Fortsett å opprette"-knapp', async ({ page }) => {
    await expect(
      page.getByRole('heading', { name: 'Treffet er ikke publisert enda' }),
    ).toBeVisible();
    await expect(
      page.getByRole('button', { name: 'Fortsett å opprette' }),
    ).not.toBeVisible();
  });

  test('Viser ikke Slett-knapp', async ({ page }) => {
    await expect(
      page.getByRole('heading', { name: 'Treffet er ikke publisert enda' }),
    ).toBeVisible();
    await expect(page.getByRole('button', { name: 'Slett' })).not.toBeVisible();
  });

  test('Viser ikke tabs for utkast', async ({ page }) => {
    await expect(
      page.getByRole('tab', { name: /Om treffet/ }),
    ).not.toBeVisible();
    await expect(
      page.getByRole('tab', { name: /Jobbsøkere/ }),
    ).not.toBeVisible();
    await expect(
      page.getByRole('tab', { name: /Arbeidsgivere/ }),
    ).not.toBeVisible();
  });
});
