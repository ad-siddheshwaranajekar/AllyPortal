// tests/config/env.ts
export const ENV = {
  QAT: 'https://ally.qat.anddone.com/#/login',
  UAT: 'https://ally.uat.anddone.com/#/login',
};

// CURRENT_ENV holds the actual URL based on TEST_ENV
export const CURRENT_ENV = process.env.TEST_ENV
  ? ENV[process.env.TEST_ENV as keyof typeof ENV]
  : ENV.QAT;
