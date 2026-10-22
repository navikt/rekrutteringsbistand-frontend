/* eslint-disable react-hooks/rules-of-hooks */
import { gotoApp } from './gotoApp';
import base, { expect } from '@playwright/test';

type TestFixtures = { gotoApp: (path?: string) => Promise<void> };

export const test = base.extend<TestFixtures>({
  gotoApp: async ({ page }, use) => {
    await use((path: string = '/') => gotoApp(page, path));
  },
});

export { expect };
