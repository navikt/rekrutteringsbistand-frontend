import { gotoApp } from '@/tests/gotoApp';
import { expect, test } from '@playwright/test';

test.use({ storageState: 'tests/.auth/arbeigsgiverrettet.json' });

// ────────────────────────────────────────────────────────
// Legg til jobbsøker i rekrutteringstreff
// ────────────────────────────────────────────────────────
test.describe('Legg til kandidat fra rekrutteringstreff', () => {
  test('Viser legg til-knapp på kandidatvisning for rekrutteringstreff', async ({
    page,
  }) => {
    await gotoApp(
      page,
      '/rekrutteringstreff/publisert/finn-kandidater/kandidat-arenaKandidatnr-2',
    );

    await expect(
      page.getByRole('button', {
        name: 'Legg til jobbsøker i rekrutteringstreff',
      }),
    ).toBeVisible();
  });

  test('Viser ikke Finn jobb-knapp i rekrutteringstreff-kontekst', async ({
    page,
  }) => {
    await gotoApp(
      page,
      '/rekrutteringstreff/publisert/finn-kandidater/kandidat-arenaKandidatnr-2',
    );

    await expect(
      page.getByRole('button', {
        name: 'Legg til jobbsøker i rekrutteringstreff',
      }),
    ).toBeVisible();

    await expect(
      page.getByRole('link', { name: 'Finn jobb', exact: true }),
    ).not.toBeVisible();
  });

  test('Viser beskrivelse for legg til-knapp', async ({ page }) => {
    await gotoApp(
      page,
      '/rekrutteringstreff/publisert/finn-kandidater/kandidat-arenaKandidatnr-2',
    );

    await expect(
      page.getByText('Lagrer valgt jobbsøker i listen for rekrutteringstreff'),
    ).toBeVisible();
  });
});
