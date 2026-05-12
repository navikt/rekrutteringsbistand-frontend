import { PLAYWRIGHT_MSW_SCOPE_COOKIE } from '@/app/api/rekrutteringstreff/mswScope';
import { gotoApp } from '@/tests/gotoApp';
import { snapshotTest } from '@/tests/snapshotTest';
import { expect, type Page, test } from '@playwright/test';

const TEST_BASE_URL = `http://localhost:${process.env.PLAYWRIGHT_PORT || '1337'}`;
const EKSTRA_ARBEIDSGIVER_NAVN = 'TEST EKSTRA ARBEIDSGIVER';

async function leggTilEkstraArbeidsgiver(page: Page) {
  const response = await page.request.post(
    `${TEST_BASE_URL}/api/rekrutteringstreff/utkast/arbeidsgiver-med-behov`,
    {
      data: {
        organisasjonsnummer: 'TEST-ORG-EKSTRA',
        navn: EKSTRA_ARBEIDSGIVER_NAVN,
        næringskoder: null,
        gateadresse: null,
        postnummer: null,
        poststed: null,
        behov: {
          samledeKvalifikasjoner: [
            {
              label: 'Kundeservice',
              kategori: 'KOMPETANSE',
              konseptId: 101,
            },
          ],
          arbeidssprak: ['Norsk'],
          antall: 2,
          ansettelsesformer: ['Fast'],
          personligeEgenskaper: [],
        },
      },
    },
  );

  if (!response.ok()) {
    throw new Error('Klarte ikke å klargjøre ekstra arbeidsgiver for test');
  }
}

async function ventTilEkstraArbeidsgiverVises(page: Page) {
  await expect(
    page.getByRole('heading', { name: EKSTRA_ARBEIDSGIVER_NAVN }),
  ).toBeVisible();
}

test.use({ storageState: 'tests/.auth/arbeigsgiverrettet.json' });

test.beforeEach(async ({ page }, testInfo) => {
  await page.context().addCookies([
    {
      name: PLAYWRIGHT_MSW_SCOPE_COOKIE,
      value: encodeURIComponent(testInfo.testId),
      domain: 'localhost',
      path: '/',
    },
  ]);
});

test.describe('Rekrutteringstreff redigering - utkast', () => {
  test.beforeEach(async ({ page }) => {
    await gotoApp(page, '/rekrutteringstreff/utkast/rediger');
  });

  test('Viser tittel-felt med standardverdi', async ({ page }) => {
    const tittelInput = page.getByLabel('Navn på treffet');
    await expect(tittelInput).toBeVisible();
    await expect(tittelInput).toHaveValue('Utkast');
  });

  test('Viser "Praktiske forhold"-seksjon', async ({ page }) => {
    await expect(
      page.getByRole('heading', { name: 'Praktiske forhold' }),
    ).toBeVisible();
  });

  test('Viser Arbeidsgivere-seksjon for utkast', async ({ page }) => {
    await expect(
      page.getByRole('heading', { name: 'Arbeidsgivere' }),
    ).toBeVisible();
  });

  test('Viser Publiser-knapp i header', async ({ page }) => {
    await expect(
      page.getByRole('button', { name: 'Publiser treffet' }),
    ).toBeVisible();
  });

  test('Viser Slett-knapp i header for utkast', async ({ page }) => {
    await expect(page.getByRole('button', { name: 'Slett' })).toBeVisible();
  });

  test('Viser Forhåndsvis-knapp', async ({ page }) => {
    await expect(
      page.getByRole('button', { name: 'Forhåndsvis' }),
    ).toBeVisible();
  });

  test('Viser sjekkliste i sidepanelet', async ({ page }) => {
    await expect(
      page.getByRole('heading', { name: 'Sjekkliste' }),
    ).toBeVisible();
  });

  test('Publiser-knapp er deaktivert når sjekkliste ikke er oppfylt', async ({
    page,
  }) => {
    const publiserKnapp = page.getByRole('button', {
      name: 'Publiser treffet',
    });
    await expect(publiserKnapp).toBeDisabled();
  });

  test('Kan redigere tittel-felt', async ({ page }) => {
    const tittelInput = page.getByLabel('Navn på treffet');
    await tittelInput.clear();
    await tittelInput.fill('Nytt treff-navn');
    await expect(tittelInput).toHaveValue('Nytt treff-navn');
  });

  snapshotTest(test);
});

test.describe('Rekrutteringstreff redigering - publisert', () => {
  test.beforeEach(async ({ page }) => {
    await gotoApp(page, '/rekrutteringstreff/publisert/rediger');
  });

  test('Viser tittel-felt med eksisterende verdi', async ({ page }) => {
    const tittelInput = page.getByLabel('Navn på treffet');
    await expect(tittelInput).toBeVisible();
    await expect(tittelInput).toHaveValue('Publisert');
  });

  test('Viser "Publiser på nytt"-knapp for publisert treff', async ({
    page,
  }) => {
    await expect(
      page.getByRole('button', { name: 'Publiser på nytt' }),
    ).toBeVisible();
  });

  test('Viser Avbryt-knapp for redigering av publisert treff', async ({
    page,
  }) => {
    await expect(page.getByRole('button', { name: 'Avbryt' })).toBeVisible();
  });

  test('Viser Forhåndsvis-knapp for publisert treff', async ({ page }) => {
    await expect(
      page.getByRole('button', { name: 'Forhåndsvis' }),
    ).toBeVisible();
  });

  test('Viser ikke Arbeidsgivere-seksjon i redigering av publisert treff', async ({
    page,
  }) => {
    const arbeidsgiverHeadings = page.getByRole('heading', {
      name: 'Arbeidsgivere',
    });
    await expect(arbeidsgiverHeadings).toHaveCount(0);
  });
});

test.describe('Rekrutteringstreff redigering - arbeidsgiver-interaksjon', () => {
  test.beforeEach(async ({ page }) => {
    await leggTilEkstraArbeidsgiver(page);
    await gotoApp(page, '/rekrutteringstreff/utkast/rediger');
    await ventTilEkstraArbeidsgiverVises(page);
  });

  test('Klikk på fjern-arbeidsgiver åpner slett-modal uten å forlate redigering', async ({
    page,
  }) => {
    const fjernKnapp = page.getByRole('button', { name: /Fjern Testbedrift/ });
    await expect(fjernKnapp).toBeEnabled();
    await fjernKnapp.click();

    const slettDialog = page.getByRole('dialog', {
      name: 'Slett arbeidsgiver',
    });
    await expect(slettDialog).toBeVisible();
    await expect(page.getByLabel('Navn på treffet')).toBeVisible();
  });

  test('Avbryt i slett-arbeidsgiver-modal lukker modal uten å forlate redigering', async ({
    page,
  }) => {
    const fjernKnapp = page.getByRole('button', { name: /Fjern Testbedrift/ });
    await expect(fjernKnapp).toBeEnabled();
    await fjernKnapp.click();

    const slettDialog = page.getByRole('dialog', {
      name: 'Slett arbeidsgiver',
    });
    await expect(slettDialog).toBeVisible();

    await slettDialog.getByRole('button', { name: 'Avbryt' }).click();

    await expect(slettDialog).not.toBeVisible();
    await expect(page.getByLabel('Navn på treffet')).toBeVisible();
  });
});
