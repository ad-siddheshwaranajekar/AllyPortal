import { Page } from '@playwright/test';
import { allyConfig } from './ally.config.js';

export async function login(
  page: Page,
  env: keyof typeof allyConfig,
  userKey: keyof typeof allyConfig[keyof typeof allyConfig]['users']
) {
  const user = allyConfig[env].users[userKey];

  const username = process.env[user.userEnv];
  const password = process.env[user.passEnv];

  if (!username || !password) {
    throw new Error(`Missing credentials for ${env} user ${String(userKey)}`);
  }

  await page.goto(`${allyConfig[env].baseUrl}/login`);
  await page.fill('#username', username);
  await page.fill('#password', password);
  await page.click('#login');
}
