import { decoratorMock } from '@/app/api/modia/decorator/mocks/dekoratørMock';
import { gotoApp } from '@/tests/gotoApp';
import { expect, test } from '@playwright/test';

test.use({ storageState: 'tests/.auth/arbeigsgiverrettet.json' });

for (const { beskrivelse, fornavn, etternavn, forventet } of [
  {
    beskrivelse: 'tilgjengelig navn',
    fornavn: ' Kari ',
    etternavn: ' Testesen ',
    forventet: 'Kari Testesen',
  },
  {
    beskrivelse: 'uten navn',
    fornavn: '',
    etternavn: '',
    forventet: undefined,
  },
  {
    beskrivelse: 'manglende navnedeler',
    fornavn: undefined,
    etternavn: undefined,
    forventet: undefined,
  },
  {
    beskrivelse: 'blankt navn',
    fornavn: ' ',
    etternavn: '\t',
    forventet: undefined,
  },
]) {
  test.describe(beskrivelse, () => {
    test.beforeEach(async ({ page }) => {
      await page.route('**/api/modia/decorator', (route) =>
        route.fulfill({
          json: {
            ...decoratorMock,
            navn: 'Ikke bruk dette feltet',
            fornavn,
            etternavn,
          },
        }),
      );
    });

    for (const inngang of ['oversikt', 'meny'] as const) {
      test(`opprett fra ${inngang} sender valgfritt navn`, async ({ page }) => {
        await page.route('**/api/rekrutteringstreff', async (route) => {
          if (route.request().method() !== 'POST') return route.continue();
          await route.fulfill({
            status: 201,
            json: { id: '1231-1234-1234-1234' },
          });
        });
        await gotoApp(page, '/rekrutteringstreff');
        const request = page.waitForRequest(
          (req) =>
            new URL(req.url()).pathname === '/api/rekrutteringstreff' &&
            req.method() === 'POST',
        );
        if (inngang === 'oversikt') {
          await page
            .getByRole('button', {
              name: 'Nytt rekrutteringstreff',
              exact: true,
            })
            .click();
        } else {
          await page
            .getByRole('button', { name: 'Opprett', exact: true })
            .click();
          await page
            .getByRole('menuitem', { name: 'Rekrutteringstreff', exact: true })
            .click();
        }

        for (const inngang of ['oversikt', 'meny'] as const) {
          test(`WorkOp fra ${inngang} beholder tittel og kategori sammen med navnet`, async ({
            page,
          }) => {
            await page.route('**/api/modia/decorator', (route) =>
              route.fulfill({
                json: {
                  ...decoratorMock,
                  fornavn: 'Kari',
                  etternavn: 'Testesen',
                },
              }),
            );
            await page.route('**/api/rekrutteringstreff', async (route) => {
              if (route.request().method() !== 'POST') return route.continue();
              await route.fulfill({ status: 201, json: { id: 'workop' } });
            });
            await gotoApp(page, '/rekrutteringstreff');
            const request = page.waitForRequest(
              (req) =>
                new URL(req.url()).pathname === '/api/rekrutteringstreff' &&
                req.method() === 'POST',
            );
            if (inngang === 'oversikt') {
              await page
                .getByRole('button', { name: 'Nytt WorkOp', exact: true })
                .click();
            } else {
              await page
                .getByRole('button', { name: 'Opprett', exact: true })
                .click();
              await page
                .getByRole('menuitem', { name: 'WorkOp', exact: true })
                .click();
            }
            expect((await request).postDataJSON()).toEqual({
              tittel: 'WorkOp uten navn',
              kategori: 'WORKOP',
              opprettetAvNavkontorEnhetId: expect.any(String),
              eierNavn: 'Kari Testesen',
            });
            await expect(page).toHaveURL(
              /\/rekrutteringstreff\/workop\/rediger/,
            );
          });
        }
        const body = (await request).postDataJSON();
        expect(body).toEqual({
          tittel: 'Treff uten navn',
          opprettetAvNavkontorEnhetId: expect.any(String),
          ...(forventet ? { eierNavn: forventet } : {}),
        });
        await expect(page).toHaveURL(
          /\/rekrutteringstreff\/1231-1234-1234-1234\/rediger/,
        );
      });
    }

    test('legg meg til sender valgfritt navn og håndterer tomt 200-svar', async ({
      page,
    }) => {
      await page.route('**/eiere/meg', (route) =>
        route.fulfill({ status: 200, body: '' }),
      );
      await gotoApp(page, '/rekrutteringstreff/ikke-eier-publisert');
      await page
        .getByRole('button', { name: 'Legg til meg som medeier' })
        .click();
      const request = page.waitForRequest(
        (req) =>
          req.url().endsWith('/ikke-eier-publisert/eiere/meg') &&
          req.method() === 'PUT',
      );
      await page.getByRole('button', { name: 'Bekreft', exact: true }).click();
      const sendt = await request;
      expect(sendt.postDataJSON()).toEqual(
        forventet ? { eierNavn: forventet } : {},
      );
      expect(sendt.headers()['content-type']).toBe('application/json');
      await expect(
        page.getByText('Du er nå lagt til som medeier.'),
      ).toBeVisible();
      await expect(page.getByRole('dialog')).not.toBeVisible();
    });
  });
}
