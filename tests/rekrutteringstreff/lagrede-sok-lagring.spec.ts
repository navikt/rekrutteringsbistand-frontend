import { brukEgenMockbruker } from './lagredeSøkHjelpere';
import { gotoApp } from '@/tests/gotoApp';
import { expect, test } from '@playwright/test';

test.use({ storageState: 'tests/.auth/arbeigsgiverrettet.json' });

for (const utfall of ['lagret', 'feil'] as const) {
  test(`Lagre-dialogen kan ikke lukkes mens forespørselen pågår (${utfall})`, async ({
    page,
  }) => {
    await brukEgenMockbruker(page, 'TEST-LAGRING');
    await gotoApp(page, '/rekrutteringstreff?sortering=nyeste');
    await page.getByRole('button', { name: 'Lagre søk' }).click();
    const dialog = page.getByRole('dialog', { name: 'Lagre søk' });
    await dialog
      .getByRole('textbox', { name: 'Navn på søket' })
      .fill('Testsøket');

    const lagring = Promise.withResolvers<void>();
    await page.route(
      '**/api/bruker/standardsok/rekrutteringstreff',
      async (route) => {
        if (route.request().method() !== 'POST') return route.continue();
        await lagring.promise;
        if (utfall === 'feil') {
          await route.fulfill({
            status: 500,
            json: { feil: 'Syntetisk testfeil' },
          });
        } else {
          await route.continue();
        }
      },
    );

    try {
      const forespørsel = page.waitForRequest(
        (request) =>
          request.method() === 'POST' &&
          request.url().endsWith('/standardsok/rekrutteringstreff'),
      );
      await dialog.getByRole('button', { name: 'Lagre', exact: true }).click();
      await forespørsel;
      await expect(
        dialog.getByRole('button', { name: 'Avbryt' }),
      ).toBeDisabled();

      await dialog.getByRole('button', { name: 'Lukk' }).click();
      await expect(dialog).toBeVisible();
      await page.keyboard.press('Escape');
      await page.keyboard.press('Escape');
      await expect(dialog).toBeVisible();
    } finally {
      lagring.resolve();
    }

    if (utfall === 'lagret') {
      await expect(dialog).toBeHidden();
      await expect(page.getByText('Valgt søk:')).toContainText('Testsøket');
    } else {
      await expect(dialog.getByRole('alert')).toContainText(
        'Kunne ikke lagre søket. Prøv igjen.',
      );
      await expect(
        dialog.getByRole('button', { name: 'Avbryt' }),
      ).toBeEnabled();
      await dialog.getByRole('button', { name: 'Avbryt' }).click();
      await expect(dialog).toBeHidden();
    }
    await expect(page.getByRole('button', { name: 'Lagre søk' })).toBeFocused();
  });
}
