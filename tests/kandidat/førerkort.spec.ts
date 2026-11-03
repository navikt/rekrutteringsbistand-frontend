import { getSingleKandidatDataSchema } from '@/app/api/kandidat-sok/mocks/kandidat.mock';
import { gotoApp } from '@/tests/gotoApp';
import { expect, test, type Page } from '@playwright/test';

test.use({ storageState: 'tests/.auth/arbeigsgiverrettet.json' });

const automatgir = 'B 78 - Personbil med automatgir';
const personbil = 'B - Personbil';

function ventPåFørerkortsøk(page: Page, førerkort: string[]) {
  return page.waitForRequest(
    (request) =>
      request.method() === 'POST' &&
      new URL(request.url()).pathname.startsWith(
        '/api/kandidat-sok/kandidatsok/',
      ) &&
      JSON.stringify(request.postDataJSON().førerkort) ===
        JSON.stringify(førerkort),
  );
}

test('Kan velge, gjenopprette og fjerne B78 uavhengig av B', async ({
  page,
}) => {
  await page.route('**/api/kandidat-sok/kandidatsok/**', (route) =>
    route.fulfill({
      json: {
        kandidater: [],
        navigering: { kandidatnumre: [] },
        antallTotalt: 0,
      },
    }),
  );
  await gotoApp(page, '/kandidat');

  const førerkortfelt = page.getByRole('combobox', {
    name: 'Førerkort',
    exact: true,
  });
  await førerkortfelt.fill('automatgir');
  const automatgirsøk = ventPåFørerkortsøk(page, [automatgir]);
  await page.getByRole('option', { name: automatgir, exact: true }).click();
  await automatgirsøk;
  await expect(page).toHaveURL(
    (url) => url.searchParams.get('forerkort') === automatgir,
  );

  await førerkortfelt.fill('B -');
  const personbilsøk = ventPåFørerkortsøk(page, [automatgir, personbil]);
  await page.getByRole('option', { name: personbil, exact: true }).click();
  await personbilsøk;
  await expect(page).toHaveURL(
    (url) => url.searchParams.get('forerkort') === `${automatgir},${personbil}`,
  );

  const gjenopprettetSøk = ventPåFørerkortsøk(page, [automatgir, personbil]);
  await page.reload();
  await gjenopprettetSøk;
  await expect(
    page.getByRole('button', { name: `${automatgir} slett`, exact: true }),
  ).toBeVisible();
  await expect(
    page.getByRole('button', { name: `${personbil} slett`, exact: true }),
  ).toBeVisible();

  const utenAutomatgir = ventPåFørerkortsøk(page, [personbil]);
  await page
    .getByRole('button', { name: `${automatgir} slett`, exact: true })
    .click();
  await utenAutomatgir;
  await expect(page).toHaveURL(
    (url) => url.searchParams.get('forerkort') === personbil,
  );

  const utenFørerkort = ventPåFørerkortsøk(page, []);
  await page
    .getByRole('button', { name: `${personbil} slett`, exact: true })
    .click();
  await utenFørerkort;
  await expect(page).toHaveURL((url) => !url.searchParams.has('forerkort'));
});

test('Viser B78 fra kandidatens CV uten å slå det sammen med B', async ({
  page,
}) => {
  const kandidat = getSingleKandidatDataSchema(2);
  const automatgirFraIndeks = 'B78 - B 78 - Personbil med automatgir';
  await page.route('**/api/kandidat-sok/lookup-cv', (route) =>
    route.fulfill({
      json: {
        hits: {
          hits: [
            {
              _source: {
                ...kandidat,
                forerkort: [
                  {
                    forerkortKode: null,
                    forerkortKodeKlasse: automatgirFraIndeks,
                  },
                  {
                    forerkortKode: 'B',
                    forerkortKodeKlasse: personbil,
                  },
                ],
              },
            },
          ],
        },
      },
    }),
  );
  await gotoApp(page, '/kandidat/kandidat-arenaKandidatnr-2');

  await expect(page.getByRole('heading', { name: 'Førerkort' })).toBeVisible();
  await expect(
    page.getByText(automatgirFraIndeks, { exact: true }),
  ).toBeVisible();
  await expect(page.getByText(personbil, { exact: true })).toBeVisible();
});
