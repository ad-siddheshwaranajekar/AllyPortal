// tests/config/env.ts
export const ENV = {
  DEV: 'https://ally.dev.anddone.com/#/login',
  QAT: 'https://ally.qat.anddone.com/#/login',
  UAT: 'https://ally.uat.anddone.com/#/login',
} as const;

export type EnvironmentKey = keyof typeof ENV;
