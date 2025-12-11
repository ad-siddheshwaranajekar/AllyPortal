// tests/config/env.ts

export const ENV = {
  DEV: 'https://ally.dev.anddone.com/#/login',
  QAT: 'https://ally.qat.anddone.com/#/login',
  UAT: 'https://ally.uat.anddone.com/#/login',
} as const;

// 👇 This type fixes the TS error
export type EnvironmentKey = keyof typeof ENV;

// 👇 Safe environment selection
export const CURRENT_ENV = process.env.TEST_ENV
  ? ENV[process.env.TEST_ENV as EnvironmentKey]
  : ENV.QAT;
