import type { AlleHendelserDTO } from '@/app/api/rekrutteringstreff/[...slug]/allehendelser/useAlleHendelser';
import { gotoApp } from '@/tests/gotoApp';
import { snapshotTest } from '@/tests/snapshotTest';
import { expect, test } from '@playwright/test';

test.use({ storageState: 'tests/.auth/arbeigsgiverrettet.json' });

test.describe('Hendelser-fane', () => {
  test.beforeEach(async ({ page }) => {
    await gotoApp(page, '/rekrutteringstreff/publisert');
    await page.getByRole('tab', { name: 'Hendelser' }).click();
  });

  test('Viser kolonneoverskrifter', async ({ page }) => {
    await expect(page.getByText('Hendelse').first()).toBeVisible();
    await expect(page.getByText('Ressurs').first()).toBeVisible();
    await expect(page.getByText('Tidspunkt').first()).toBeVisible();
    await expect(page.getByText('Utført av').first()).toBeVisible();
    await expect(page.getByText('Gjelder').first()).toBeVisible();
  });

  test('Viser hendelsesrader', async ({ page }) => {
    await expect(
      page.getByText('Rekrutteringstreff', { exact: true }).first(),
    ).toBeVisible();
    await expect(
      page.getByText('Jobbsøker', { exact: true }).first(),
    ).toBeVisible();
    await expect(
      page.getByText('Arbeidsgiver', { exact: true }).first(),
    ).toBeVisible();
  });

  test('Viser aktør-identifikasjon i hendelseslisten', async ({ page }) => {
    await expect(page.getByText('A123456').first()).toBeVisible();
  });

  test('Viser subjektnavn for hendelser', async ({ page }) => {
    await expect(page.getByText('Ola Nordmann').first()).toBeVisible();
    await expect(page.getByText('NAV OSLO AS').first()).toBeVisible();
  });

  snapshotTest(test);
});

test('Viser beskrivelse når Nav-kontor er fjernet', async ({ page }) => {
  const hendelser: AlleHendelserDTO = [
    {
      id: 'kontor-fjernet',
      ressurs: 'REKRUTTERINGSTREFF',
      tidspunkt: '2026-09-18T10:00:00Z',
      hendelsestype: 'KONTOR_FJERNET',
      opprettetAvAktørType: 'ARRANGØR',
      aktørIdentifikasjon: 'A123456',
      subjektId: '0301',
      subjektNavn: 'Nav Oslo',
    },
  ];
  await page.route(
    '**/api/rekrutteringstreff/publisert/allehendelser',
    (route) => route.fulfill({ json: hendelser }),
  );
  await gotoApp(page, '/rekrutteringstreff/publisert');
  await page.getByRole('tab', { name: 'Hendelser' }).click();

  const rad = page.getByRole('row').filter({
    has: page.getByRole('cell', { name: 'Nav-kontor fjernet', exact: true }),
  });
  await expect(rad).toBeVisible();
  await expect(rad).toContainText('Nav Oslo');
});
