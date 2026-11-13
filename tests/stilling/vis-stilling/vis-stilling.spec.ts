import { StillingDataSchema } from '@/app/api/stilling/rekrutteringsbistandstilling/[slug]/stilling.dto';
import { gotoApp } from '@/tests/gotoApp';
import { slåPåMørkModus } from '@/tests/mørkModus';
import { visMørkModus } from '@/tests/visMørkModus';
import { tilgjengelighetstest } from '@navikt/toi-next-frontend/a11y';
import { expect, test } from '@playwright/test';

test.use({ storageState: 'tests/.auth/arbeigsgiverrettet.json' });

// ────────────────────────────────────────────────────────
// Vis stilling – grunnleggende innhold og tilgang
// ────────────────────────────────────────────────────────
test.describe('Vis stilling', () => {
  test.describe('Omfang i Om jobben', () => {
    for (const { navn, prosent, intervall, extent, forventet } of [
      {
        navn: '20 prosent',
        prosent: '20',
        intervall: null,
        extent: 'Heltid',
        forventet: 'Fast - Heltid og deltid',
      },
      {
        navn: '100 prosent',
        prosent: '100',
        intervall: null,
        extent: 'Heltid',
        forventet: 'Fast - Heltid',
      },
      {
        navn: 'prosentintervall',
        prosent: null,
        intervall: '20-100',
        extent: 'Heltid',
        forventet: 'Fast - Heltid og deltid',
      },
      {
        navn: 'prosentintervall sammen med 100 prosent',
        prosent: '100',
        intervall: '20-100',
        extent: 'Heltid',
        forventet: 'Fast - Heltid og deltid',
      },
      {
        navn: 'opprinnelig deltid',
        prosent: '20',
        intervall: null,
        extent: 'Deltid',
        forventet: 'Fast - Deltid',
      },
    ]) {
      test(`Viser riktig omfang ved ${navn}`, async ({ page }) => {
        await page.route(
          '**/api/stilling/rekrutteringsbistandstilling/minStilling',
          async (route) => {
            const respons = await route.fetch();
            const data = StillingDataSchema.parse(await respons.json());
            data.stilling.properties = {
              ...data.stilling.properties,
              engagementtype: 'Fast',
              extent,
              jobpercentage: prosent,
              jobpercentagerange: intervall,
            };
            await route.fulfill({ response: respons, json: data });
          },
        );

        await gotoApp(page, '/stilling/minStilling');
        await page.getByRole('tab', { name: 'Om stillingen' }).click();
        await expect(
          page.getByTestId('om-stillingen').getByText(forventet, {
            exact: true,
          }),
        ).toBeVisible();
      });
    }
  });

  test.describe('Stillingsprosent i Om jobben', () => {
    for (const { navn, prosent, forventet } of [
      { navn: 'manglende prosent', prosent: undefined, forventet: null },
      { navn: 'null', prosent: null, forventet: null },
      { navn: 'tom prosent', prosent: '', forventet: null },
      { navn: 'bare mellomrom', prosent: '   ', forventet: null },
      { navn: '20 prosent', prosent: '20', forventet: '20% stilling' },
      { navn: '100 prosent', prosent: '100', forventet: '100% stilling' },
      { navn: 'prosenttegn', prosent: '20%', forventet: '20% stilling' },
    ]) {
      test(`${forventet ? 'Viser' : 'Skjuler'} prosentfeltet ved ${navn}`, async ({
        page,
      }) => {
        await page.route(
          '**/api/stilling/rekrutteringsbistandstilling/minStilling',
          async (route) => {
            const respons = await route.fetch();
            const data = StillingDataSchema.parse(await respons.json());
            data.stilling.properties = {
              ...data.stilling.properties,
              extent: 'Heltid',
              jobpercentage: prosent,
              jobpercentagerange: '20-80',
            };
            await route.fulfill({ response: respons, json: data });
          },
        );

        await gotoApp(page, '/stilling/minStilling');
        await page.getByRole('tab', { name: 'Om stillingen' }).click();
        const prosentfelt = page
          .getByTestId('om-stillingen')
          .getByText(/(?:%|-)\s+stilling$/);
        if (forventet) {
          await expect(prosentfelt).toHaveText(forventet);
        } else {
          await expect(prosentfelt).toHaveCount(0);
        }
      });
    }
  });

  test.describe('Arbeidsspråk i Om jobben', () => {
    const språkverdier = [
      { navn: 'manglende språk', verdi: undefined, forventet: '' },
      { navn: 'null', verdi: null, forventet: '' },
      { navn: 'tom tekst', verdi: '', forventet: '' },
      { navn: 'bare mellomrom', verdi: '   ', forventet: '' },
      { navn: 'tom liste', verdi: '[]', forventet: '' },
      { navn: 'liste med tomme verdier', verdi: '["", null]', forventet: '' },
      { navn: 'liste med mellomrom', verdi: '["   ", "   "]', forventet: '' },
      { navn: 'språk som tekst', verdi: 'Norsk', forventet: 'Norsk' },
      {
        navn: 'flere språk',
        verdi: '["Norsk", "Engelsk"]',
        forventet: 'Norsk, Engelsk',
      },
      {
        navn: 'språk blandet med blanke verdier',
        verdi: '[" ", " Norsk ", "", null, " Engelsk ", " "]',
        forventet: 'Norsk, Engelsk',
      },
    ];

    for (const { navn, verdi, forventet } of språkverdier) {
      test(`${forventet ? 'Viser' : 'Skjuler'} språkfeltet ved ${navn}`, async ({
        page,
      }) => {
        await page.route(
          '**/api/stilling/rekrutteringsbistandstilling/minStilling',
          async (route) => {
            const respons = await route.fetch();
            const data = StillingDataSchema.parse(await respons.json());
            data.stilling.properties = {
              ...data.stilling.properties,
              workLanguage: verdi,
            };
            await route.fulfill({ response: respons, json: data });
          },
        );

        await gotoApp(page, '/stilling/minStilling');
        await page.getByRole('tab', { name: 'Om stillingen' }).click();

        const omJobben = page.getByTestId('om-stillingen');
        await expect(
          omJobben.getByRole('heading', { name: 'Om jobben' }),
        ).toBeVisible();
        await expect(omJobben.locator('svg')).toHaveCount(forventet ? 8 : 7);
        await expect(omJobben.getByText(/^Søknadsfrist /)).toBeVisible();
        if (forventet) {
          await expect(
            omJobben.getByText(forventet, { exact: true }),
          ).toBeVisible();
        }
      });
    }
  });

  test.describe('Min stilling', () => {
    test.beforeEach(async ({ page }) => {
      await gotoApp(page, '/stilling/minStilling');
    });

    test('Viser Om stillingen-tab', async ({ page }) => {
      await expect(
        page.getByRole('tab', { name: 'Om stillingen' }),
      ).toBeVisible();
    });

    test('Viser Jobbsøkere-tab med antall', async ({ page }) => {
      await expect(
        page.getByRole('tab', { name: 'Jobbsøkere (300)' }),
      ).toBeVisible();
    });

    test('Viser kandidathandlinger', async ({ page }) => {
      await expect(page.getByText('Finn og foreslå jobbsøkere')).toBeVisible();
      await expect(
        page.getByText('Legg til jobbsøkere', { exact: true }),
      ).toBeVisible();
    });

    test('Viser Skriv ut-knapp', async ({ page }) => {
      await expect(
        page.getByRole('button', { name: 'Skriv ut' }),
      ).toBeVisible();
    });

    test('Viser Om jobben-seksjon', async ({ page }) => {
      await page.getByRole('tab', { name: 'Om stillingen' }).click();
      await expect(
        page.getByRole('heading', { name: 'Om jobben' }),
      ).toBeVisible();
    });

    tilgjengelighetstest(test, { utvidet: true, mørkModus: slåPåMørkModus });
    visMørkModus('om-stillingen');
  });

  test.describe('Ikke min stilling', () => {
    test.beforeEach(async ({ page }) => {
      await gotoApp(page, '/stilling/internStilling');
    });

    test('Viser Om stillingen-tab', async ({ page }) => {
      await expect(
        page.getByRole('tab', { name: 'Om stillingen' }),
      ).toBeVisible();
    });

    test('Viser kandidathandlinger', async ({ page }) => {
      await expect(page.getByText('Finn og foreslå jobbsøkere')).toBeVisible();
      await expect(
        page.getByText('Legg til jobbsøkere', { exact: true }),
      ).toBeVisible();
    });

    test('Viser stillingsinnhold', async ({ page }) => {
      await expect(
        page.getByRole('button', { name: 'Skriv ut' }),
      ).toBeVisible();
      await expect(page.getByText('Organisasjonsnummer')).toBeVisible();
      await expect(
        page.getByRole('heading', { name: 'Om jobben' }),
      ).toBeVisible();
    });

    test('Skjuler eier-handlinger', async ({ page }) => {
      await expect(
        page.getByRole('tab', { name: 'Jobbsøkere', exact: true }),
      ).toBeHidden();
      await expect(page.getByRole('button', { name: 'Rediger' })).toBeHidden();
    });
  });

  test.describe('Avvist stilling', () => {
    test('Viser "Stilling avvist"-alert for stilling med status REJECTED', async ({
      page,
    }) => {
      await gotoApp(page, '/stilling/avvistEksternStilling');

      const main = page.locator('main');
      await expect(
        main.getByRole('heading', { name: 'Stilling avvist' }),
      ).toBeVisible();
      await expect(
        main.getByText(
          'Denne stillingen er avvist av Nav og vil ikke synes på arbeidsplassen.no.',
        ),
      ).toBeVisible();
    });

    test('Viser ikke "Stilling avvist"-alert for stilling med status ACTIVE', async ({
      page,
    }) => {
      await gotoApp(page, '/stilling/publisertStilling');

      const main = page.locator('main');
      await expect(
        main.getByRole('heading', { name: 'Advarsel: Stilling avvist' }),
      ).toBeHidden();
    });
  });

  test.describe('Ugyldig stilling', () => {
    test('Viser "Ugyldig stilling"-alert når organisasjonsnummer mangler', async ({
      page,
    }) => {
      await gotoApp(page, '/stilling/ugyldigStilling');

      const main = page.locator('main');
      await expect(
        main.getByRole('heading', { name: 'Feil: Ugyldig stilling' }),
      ).toBeVisible();
      await expect(
        main.getByText(
          'Denne stillingen er ikke gyldig da det er en intern stilling som mangler organisasjonsnummer.',
        ),
      ).toBeVisible();
    });

    test('Viser ikke "Ugyldig stilling"-alert for gyldig publisert stilling', async ({
      page,
    }) => {
      await gotoApp(page, '/stilling/publisertStilling');

      const main = page.locator('main');
      await expect(
        main.getByRole('heading', { name: 'Ugyldig stilling' }),
      ).toBeHidden();
    });
  });
});
