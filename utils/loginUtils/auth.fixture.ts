import { test as base, Browser, Page } from '@playwright/test';
import { allyConfig } from './ally.config';

type Fixtures = {
  userAPage: Page;
  userBPage: Page;
};

type Env = keyof typeof allyConfig;
const env = (process.env.TEST_ENV || 'QAT') as Env;

export const test = base.extend<Fixtures>({
  userAPage: async ({ browser }: { browser: Browser }, use) => {
    const context = await browser.newContext({
      storageState: allyConfig[env].users.A.storageState,
    });

    const page = await context.newPage();
    await use(page);
    await context.close();
  },

  userBPage: async ({ browser }: { browser: Browser }, use) => {
    const context = await browser.newContext({
      storageState: allyConfig[env].users.B.storageState,
    });

    const page = await context.newPage();
    await use(page);
    await context.close();
  },
});

export { expect } from '@playwright/test';
