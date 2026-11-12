import { gotoApp } from '@/tests/gotoApp';
import { expect, test } from '@playwright/test';

for (const { rolle, storageState, harTilgang } of [
  {
    rolle: 'Modia',
    storageState: 'tests/.auth/modia_generell.json',
    harTilgang: false,
  },
  {
    rolle: 'Arbeidsgiverrettet',
    storageState: 'tests/.auth/arbeigsgiverrettet.json',
    harTilgang: true,
  },
  {
    rolle: 'Jobbsøkerrettet',
    storageState: 'tests/.auth/jobbsokerrettet.json',
    harTilgang: true,
  },
]) {
  test.describe(`Inngang fra arbeidsoppfølging med ${rolle}`, () => {
    test.use({ storageState });

    test('Kaller bare API-ene og sender videre med riktig rolle', async ({
      page,
    }) => {
      const kandidatnrKall: unknown[] = [];
      const synlighetskall: unknown[] = [];

      await page.route('**/api/kandidat-sok/arena-kandidatnr', (route) => {
        kandidatnrKall.push(route.request().postDataJSON());
        return route.fulfill({
          json: { arenaKandidatnr: 'kandidat-arenaKandidatnr-2' },
        });
      });
      await page.route('**/api/synlighet/evaluering', (route) => {
        synlighetskall.push(route.request().postDataJSON());
        return route.fulfill({ json: {} });
      });

      await gotoApp(page, '/personbruker');

      if (harTilgang) {
        await expect(page).toHaveURL(
          /\/kandidat\/kandidat-arenaKandidatnr-2\/finn-stilling/,
        );
        expect(kandidatnrKall).toEqual([{ fodselsnummer: '16828397901' }]);
        expect(synlighetskall).toEqual([{ fnr: '16828397901' }]);
      } else {
        await expect(
          page.getByRole('heading', { name: 'Ikke tilgang' }),
        ).toBeVisible();
        await expect(
          page.getByText('for å få tilgang til innhold på denne siden', {
            exact: false,
          }),
        ).toBeVisible();
        await expect(page.getByTitle('Laster...')).toHaveCount(0);
        await expect(page).toHaveURL(/\/personbruker$/);
        expect(kandidatnrKall).toEqual([]);
        expect(synlighetskall).toEqual([]);
      }
    });
  });
}
