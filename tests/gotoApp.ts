import { ventTilKlar } from './ventTilKlar';
import { MOCK_NÅ } from '@/mocks/datoKonstanter';
import { Page } from '@playwright/test';

const PORT = process.env.PLAYWRIGHT_PORT || '1337';

const siderMedLåstKlokke = new WeakSet<Page>();

/**
 * Låser nettleserklokka (Date) uten å stoppe timere, slik at datoer i
 * snapshots ikke avhenger av dagens dato. Bruk denne i stedet for
 * page.clock.setFixedTime, ellers overstyrer gotoApp tiden med MOCK_NÅ.
 */
export async function låsKlokke(page: Page, tid: Date = MOCK_NÅ) {
  await page.clock.setFixedTime(tid);
  siderMedLåstKlokke.add(page);
}

export async function gotoApp(page: Page, path: string = '/') {
  if (!siderMedLåstKlokke.has(page)) {
    await låsKlokke(page);
  }
  await page.goto(`http://localhost:${PORT}${path}`, {
    waitUntil: 'domcontentloaded',
  });
  await ventTilKlar(page);
}
