import { gotoApp } from '@/tests/gotoApp';
import type { Page } from '@playwright/test';

/** Åpner treffgjennomføringsfanen på et treff. */
export const åpneTreffgjennomføring = async (
  page: Page,
  treffId: string = 'workop',
) => {
  await gotoApp(page, `/rekrutteringstreff/${treffId}`);
  await page.getByRole('tab', { name: 'Treffgjennomføring' }).click();
};

/** Åpner steg 2 på en WorkOp med møteplanen opprettet. */
export const åpneRomOgRotasjon = async (page: Page) => {
  await åpneTreffgjennomføring(page);
  await page.getByRole('button', { name: 'Gå til rom og rotasjon' }).click();
  await page.getByRole('button', { name: 'Opprett møteplan' }).click();
};

/** Åpner steg 3 (interesse) på en WorkOp med møteplanen opprettet. */
export const åpneInteresse = async (page: Page) => {
  await åpneRomOgRotasjon(page);
  await page.getByRole('button', { name: 'Neste', exact: true }).click();
};
