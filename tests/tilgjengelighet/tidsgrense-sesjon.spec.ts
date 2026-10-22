import { TEST_NÅ } from '@/mocks/datoKonstanter';
import { ventTilKlar } from '@/tests/ventTilKlar';
import { expect, test, type Page } from '@playwright/test';

test.use({ storageState: 'tests/.auth/arbeigsgiverrettet.json' });

const PORT = process.env.PLAYWRIGHT_PORT || '1337';

// Sesjonen styres av login-proxyen i Nais (Wonderwall). For Entra ID varer den
// i maks 10 timer og har ingen grense for inaktivitet.
// https://doc.nais.io/auth/reference/#session-lifetime
const ETT_MINUTT_FØR_UTLØP = '09:59:00';

// Bruker page.clock i stedet for gotoApp, som låser Date og ikke lar oss spole fram.
const gåTilMedKlokke = async (page: Page, sti: string) => {
  await page.clock.install({ time: TEST_NÅ });
  await page.goto(`http://localhost:${PORT}${sti}`, {
    waitUntil: 'domcontentloaded',
  });
  await ventTilKlar(page);
};

test.describe('Tidsgrense for sesjonen (2.2.1)', { tag: '@a11y' }, () => {
  test('varselet om utløpt sesjon leses opp, kan nås med tastatur og forsvinner ikke av seg selv', async ({
    page,
  }) => {
    await gåTilMedKlokke(page, '/dev/utlopt-sesjon');
    await page.getByRole('button', { name: 'Simuler henting' }).click();

    const melding = page.getByText('Du er logget ut.');
    await expect(melding).toBeVisible();
    // aria-live gjør at skjermlesere leser opp varselet når det dukker opp.
    await expect(
      page.locator('[aria-live="assertive"]').filter({ has: melding }),
    ).toHaveCount(1);

    // Aksel Button med as='a' er en lenke med role="button".
    const loggInn = page.getByRole('button', { name: 'Logg inn på nytt' });
    await expect(loggInn).toHaveAttribute(
      'href',
      '/oauth2/login?redirect=%2Fdev%2Futlopt-sesjon',
    );
    await page.locator('body').focus();
    for (let i = 0; i < 80; i++) {
      await page.keyboard.press('Tab');
      if (await loggInn.evaluate((e) => e === document.activeElement)) break;
    }
    await expect(loggInn).toBeFocused();

    // Brukeren skal få bruke den tiden hun trenger: varselet blir stående og
    // siden sender henne ikke videre av seg selv.
    await page.clock.runFor('01:00:00');
    await expect(melding).toBeVisible();
    await expect(loggInn).toBeFocused();
    expect(new URL(page.url()).pathname).toBe('/dev/utlopt-sesjon');
  });

  // Appen varsler ikke før sesjonen går ut, og brukeren kan ikke forlenge den.
  // Varselet over kommer først når et API-kall har feilet. Testen viser hva
  // 2.2.1 krever, og skal slås på når appen leser /oauth2/session og varsler.
  test.fixme('varsler minst 20 sekunder før sesjonen går ut', async ({
    page,
  }) => {
    await gåTilMedKlokke(page, '/');
    await page.clock.fastForward(ETT_MINUTT_FØR_UTLØP);

    const varsel = page.locator('[aria-live]').filter({ hasText: /utløper/ });
    await expect(varsel).toBeVisible();
    await expect(varsel.getByRole('button')).toBeVisible();
  });
});
