import { ventTilKlar } from './ventTilKlar';
import { MOCK_NÅ } from '@/mocks/datoKonstanter';
import { Page } from '@playwright/test';

const PORT = process.env.PLAYWRIGHT_PORT || '1337';

const siderMedLåstKlokke = new WeakSet<Page>();

const TIMERFUNKSJONER = [
  'setTimeout',
  'clearTimeout',
  'setInterval',
  'clearInterval',
  'requestAnimationFrame',
  'cancelAnimationFrame',
  'requestIdleCallback',
  'cancelIdleCallback',
] as const;

/**
 * Låser nettleserklokka (Date) til et fast tidspunkt, slik at datoer i
 * snapshots ikke avhenger av dagens dato. Bruk denne i stedet for
 * page.clock.setFixedTime, ellers overstyrer gotoApp tiden med MOCK_NÅ.
 *
 * page.clock.setFixedTime installerer også Playwrights falske timere. De
 * forsinker blant annet requestAnimationFrame og gir kappløp med fokus i
 * dialoger, så vi legger de ekte timerfunksjonene tilbake etterpå. Da er det
 * bare Date som står stille.
 */
export async function låsKlokke(page: Page, tid: Date = MOCK_NÅ) {
  const context = page.context();
  await context.addInitScript((navn) => {
    const w = window as unknown as Record<string, unknown>;
    w.__ekteTimere = Object.fromEntries(navn.map((n) => [n, w[n]]));
  }, TIMERFUNKSJONER);
  await page.clock.setFixedTime(tid);
  await context.addInitScript(() => {
    const w = window as unknown as Record<string, unknown>;
    Object.assign(w, w.__ekteTimere);
    delete w.__ekteTimere;
  });
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
