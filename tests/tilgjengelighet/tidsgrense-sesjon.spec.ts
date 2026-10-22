import { TEST_NÅ } from '@/mocks/datoKonstanter';
import { ventTilKlar } from '@/tests/ventTilKlar';
import { expect, test, type Locator, type Page } from '@playwright/test';

test.use({ storageState: 'tests/.auth/arbeigsgiverrettet.json' });

const PORT = process.env.PLAYWRIGHT_PORT || '1337';

// Sesjonen styres av login-proxyen i Nais (Wonderwall). For Entra ID varer den
// i maks 10 timer og har ingen grense for inaktivitet.
// https://doc.nais.io/auth/reference/#session-lifetime
const TI_TIMER = 10 * 60 * 60 * 1000;
const INNLOGGING_I_NY_FANE = '/oauth2/login?redirect=%2Flogget-inn';

/**
 * Svarer på /oauth2/session slik Wonderwall gjør. Gjenstående tid regnes ut
 * fra klokka i nettleseren, så den følger med når testen spoler fram.
 * Returnerer en funksjon som flytter slutten, slik det skjer ved ny innlogging.
 */
const mockSesjon = async (page: Page, slutt: number) => {
  let sesjonensSlutt = slutt;
  await page.route('**/oauth2/session', async (route) => {
    const nå = await page.evaluate(() => Date.now());
    const sekunderIgjen = Math.floor((sesjonensSlutt - nå) / 1000);
    if (sekunderIgjen <= 0) {
      await route.fulfill({ status: 401 });
      return;
    }
    await route.fulfill({
      json: {
        session: { active: true, ends_in_seconds: sekunderIgjen },
        tokens: {},
      },
    });
  });
  return (nySlutt: number) => {
    sesjonensSlutt = nySlutt;
  };
};

// Bruker page.clock i stedet for gotoApp, som låser Date og ikke lar oss spole fram.
const gåTilMedKlokke = async (page: Page, sti: string) => {
  await page.clock.install({ time: TEST_NÅ });
  const sesjonsvar = page.waitForResponse('**/oauth2/session');
  await page.goto(`http://localhost:${PORT}${sti}`, {
    waitUntil: 'domcontentloaded',
  });
  await ventTilKlar(page);
  await sesjonsvar;
};

const tabTil = async (page: Page, mål: Locator) => {
  await page.locator('body').focus();
  for (let i = 0; i < 80; i++) {
    await page.keyboard.press('Tab');
    if (await mål.evaluate((e) => e === document.activeElement)) return;
  }
  throw new Error('Fant ikke elementet med Tab');
};

// Lenken åpner innloggingen i ny fane. Den skal være en lenke, ikke en knapp.
const sjekkLoggInnLenke = async (page: Page, varsel: Locator) => {
  const loggInn = varsel.getByRole('link', {
    name: 'Logg inn på nytt åpnes i ny fane',
  });
  await expect(loggInn).toHaveAttribute('href', INNLOGGING_I_NY_FANE);
  await expect(loggInn).toHaveAttribute('target', '_blank');
  await expect(loggInn).not.toHaveAttribute('role');
  await tabTil(page, loggInn);
  await expect(loggInn).toBeFocused();
  return loggInn;
};

// Simulerer at brukeren har logget inn i den andre fanen og kommer tilbake.
const kommTilbakeTilFanen = async (page: Page) => {
  const sesjonsvar = page.waitForResponse('**/oauth2/session');
  await page.evaluate(() => window.dispatchEvent(new Event('focus')));
  await sesjonsvar;
};

test.describe('Tidsgrense for sesjonen (2.2.1)', { tag: '@a11y' }, () => {
  test('varsler fem minutter før sesjonen går ut, og varselet forsvinner etter ny innlogging', async ({
    page,
  }) => {
    const nySesjon = await mockSesjon(page, TEST_NÅ.getTime() + TI_TIMER);
    await gåTilMedKlokke(page, '/kandidat');

    const varsel = page
      .locator('[aria-live="polite"]')
      .filter({ hasText: 'Du blir snart logget ut.' });
    const søkefelt = page.getByRole('searchbox').first();
    await søkefelt.fill('Utvikler');

    // Seks minutter igjen: ikke varsel ennå.
    await page.clock.fastForward('09:54:00');
    await expect(varsel).toHaveCount(0);

    // Fire og et halvt minutt igjen: varselet vises i et live-område.
    await page.clock.fastForward('01:30');
    await expect(varsel).toBeVisible();
    await expect(varsel).toContainText(
      /Innloggingen din går ut kl\. \d{2}:\d{2}/,
    );
    await sjekkLoggInnLenke(page, varsel);

    // Brukeren logger inn i den andre fanen og kommer tilbake.
    nySesjon((await page.evaluate(() => Date.now())) + TI_TIMER);
    await kommTilbakeTilFanen(page);
    await expect(varsel).toHaveCount(0);
    await expect(søkefelt).toHaveValue('Utvikler');
  });

  test('varsler når sesjonen har gått ut, uten å sende brukeren videre eller miste det som er fylt ut', async ({
    page,
  }) => {
    const nySesjon = await mockSesjon(page, TEST_NÅ.getTime() + TI_TIMER);
    await gåTilMedKlokke(page, '/kandidat');
    const søkefelt = page.getByRole('searchbox').first();
    await søkefelt.fill('Utvikler');

    await page.clock.fastForward('10:00:01');
    const varsel = page
      .locator('[aria-live="assertive"]')
      .filter({ hasText: 'Du er logget ut.' });
    await expect(varsel).toBeVisible();
    await sjekkLoggInnLenke(page, varsel);

    // Varselet blir stående, og siden sender ikke brukeren videre.
    await page.clock.runFor('01:00:00');
    await expect(varsel).toBeVisible();
    expect(new URL(page.url()).pathname).toBe('/kandidat');

    nySesjon((await page.evaluate(() => Date.now())) + TI_TIMER);
    await kommTilbakeTilFanen(page);
    await expect(varsel).toHaveCount(0);
    await expect(søkefelt).toHaveValue('Utvikler');
  });

  test('varselet om utløpt sesjon vises også når et API-kall svarer 401', async ({
    page,
  }) => {
    await mockSesjon(page, TEST_NÅ.getTime() + TI_TIMER);
    await gåTilMedKlokke(page, '/dev/utlopt-sesjon');
    await page.getByRole('button', { name: 'Simuler henting' }).click();

    const varsel = page
      .locator('[aria-live="assertive"]')
      .filter({ hasText: 'Du er logget ut.' });
    await expect(varsel).toBeVisible();
    await sjekkLoggInnLenke(page, varsel);
  });
});
