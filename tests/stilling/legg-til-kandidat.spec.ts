import { gotoApp } from '@/tests/gotoApp';
import { expect, test } from '@playwright/test';

test.use({ storageState: 'tests/.auth/arbeigsgiverrettet.json' });

// ────────────────────────────────────────────────────────
// Legg til jobbsøker i kandidatliste fra stilling
// ────────────────────────────────────────────────────────
test.describe('Legg til kandidat fra stilling', () => {
  test('Viser legg til-knapp på kandidatvisning for stilling', async ({
    page,
  }) => {
    await gotoApp(
      page,
      '/stilling/minStilling/finn-kandidater/kandidat-arenaKandidatnr-2',
    );

    await expect(
      page.getByRole('button', { name: 'Legg til jobbsøker i kandidatliste' }),
    ).toBeVisible();
  });

  test('Viser ikke Finn jobb-knapp i stillingskontekst', async ({ page }) => {
    await gotoApp(
      page,
      '/stilling/minStilling/finn-kandidater/kandidat-arenaKandidatnr-2',
    );

    await expect(
      page.getByRole('button', { name: 'Legg til jobbsøker i kandidatliste' }),
    ).toBeVisible();

    await expect(
      page.getByRole('link', { name: 'Finn jobb', exact: true }),
    ).not.toBeVisible();
  });

  test('Viser beskrivelse for legg til-knapp', async ({ page }) => {
    await gotoApp(
      page,
      '/stilling/minStilling/finn-kandidater/kandidat-arenaKandidatnr-2',
    );

    await expect(
      page.getByText('Lagrer valgt jobbsøker til stillingen sin kandidatliste'),
    ).toBeVisible();
  });

  test('Viser legg til-knapp i sidepanel fra finn-kandidater', async ({
    page,
  }) => {
    await gotoApp(page, '/stilling/minStilling/finn-kandidater');

    await page
      .getByTestId('kandidatkort-lenke-kandidat-arenaKandidatnr-2')
      .click();

    await expect(
      page.getByRole('button', { name: 'Legg til jobbsøker i kandidatliste' }),
    ).toBeVisible();
  });
});
