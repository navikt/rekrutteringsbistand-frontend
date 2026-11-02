import { gotoApp } from '@/tests/gotoApp';
import { expect, test } from '@playwright/test';

test.use({ storageState: 'tests/.auth/arbeigsgiverrettet.json' });

// WCAG 2.4.2 Sidetitler: hver side skal ha en tittel som beskriver formålet.
// Titler sendes til Umami, så de skal aldri inneholde navn på personer.
const sider: [sti: string, tittel: string][] = [
  ['/', 'Oversikt'],
  ['/stilling', 'Stillingsoppdrag'],
  ['/stilling/minStilling', 'Stilling'],
  ['/stilling/minStilling/rediger', 'Rediger stilling'],
  ['/stilling/minStilling/finn-kandidater', 'Finn jobbsøkere til stilling'],
  ['/kandidat', 'Jobbsøkere'],
  ['/kandidat/kandidat-arenaKandidatnr-2', 'Jobbsøker'],
  [
    '/kandidat/kandidat-arenaKandidatnr-2/finn-stilling',
    'Finn stilling til jobbsøker',
  ],
  ['/rekrutteringstreff', 'Rekrutteringstreff'],
  ['/rekrutteringstreff/publisert', 'Treff'],
  ['/rekrutteringstreff/utkast/rediger', 'Rediger treff'],
  [
    '/rekrutteringstreff/publisert/finn-kandidater',
    'Finn jobbsøkere til treff',
  ],
  ['/etterregistrering', 'Etterregistreringer'],
  ['/etterregistrering/etterregistrering', 'Etterregistrering'],
  [
    '/etterregistrering/etterregistreringApen/rediger',
    'Rediger etterregistrering',
  ],
  ['/ny/stilling', 'Ny stilling'],
  ['/innstillinger', 'Innstillinger'],
  ['/nyheter', 'Nyheter'],
];

const escape = (tekst: string) => tekst.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

test.describe('Sidetitler (WCAG 2.4.2)', () => {
  test('tittelen oppdateres ved navigering i appen', async ({ page }) => {
    await gotoApp(page, '/rekrutteringstreff');
    await expect(page).toHaveTitle(/^Rekrutteringstreff – /);
    await page.locator('a[href^="/rekrutteringstreff/"]').first().click();
    await expect(page).toHaveURL(/\/rekrutteringstreff\/[^/?]+/);
    await expect(page).toHaveTitle(/^Treff – /);
  });
  for (const [sti, tittel] of sider) {
    test(`${sti} har tittelen «${tittel}»`, async ({ page }) => {
      await gotoApp(page, sti);
      await expect(page).toHaveTitle(
        new RegExp(`^${escape(tittel)} – .*Rekrutteringsbistand$`),
      );
    });
  }
});
