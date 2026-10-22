import { ventTilKlar } from './ventTilKlar';
import { TEST_NÅ } from '@/mocks/datoKonstanter';
import { Page } from '@playwright/test';

const PORT = process.env.PLAYWRIGHT_PORT || '1337';

const siderMedLåstKlokke = new WeakSet<Page>();

/**
 * Låser Date i nettleseren til et fast tidspunkt, slik at datoer i snapshots
 * ikke avhenger av dagens dato. Bruk denne i stedet for page.clock, ellers
 * overstyrer gotoApp tiden med TEST_NÅ.
 *
 * Vi bruker ikke page.clock.setFixedTime, fordi den også erstatter setTimeout
 * og requestAnimationFrame med falske timere. Det ga kappløp med fokus i
 * dialoger og effekter som venter på setTimeout(0). Her er det bare Date som
 * står stille. Timere og performance.now går som vanlig.
 */
export async function låsKlokke(page: Page, tid: Date = TEST_NÅ) {
  if (siderMedLåstKlokke.has(page)) {
    throw new Error('Klokka er allerede låst for denne siden');
  }
  siderMedLåstKlokke.add(page);
  await page.context().addInitScript((fastTid: number) => {
    const EkteDate = Date;
    function FastDate(this: unknown, ...args: unknown[]) {
      if (!new.target) return new EkteDate(fastTid).toString();
      return args.length === 0
        ? new EkteDate(fastTid)
        : new (EkteDate as unknown as new (...a: unknown[]) => Date)(...args);
    }
    FastDate.prototype = EkteDate.prototype;
    FastDate.now = () => fastTid;
    FastDate.parse = EkteDate.parse;
    FastDate.UTC = EkteDate.UTC;
    globalThis.Date = FastDate as unknown as DateConstructor;
  }, tid.getTime());
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
