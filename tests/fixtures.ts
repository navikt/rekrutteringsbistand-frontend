/* eslint-disable react-hooks/rules-of-hooks */
import { ventTilKlar } from './ventTilKlar';
import base, { expect } from '@playwright/test';

type TestFixtures = { gotoApp: (path?: string) => Promise<void> };

export const test = base.extend<TestFixtures>({
  gotoApp: async ({ page }, use) => {
    await use(async (path: string = '/') => {
      await page.goto(
        `http://localhost:${process.env.PLAYWRIGHT_PORT || '1337'}${path}`,
        {
          waitUntil: 'domcontentloaded',
        },
      );
      await ventTilKlar(page);
    });
  },
});

export { expect };
