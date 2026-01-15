import { validateEnv } from '../envValidator';

export default async function globalSetup() {
  const ENV = (process.env.TEST_ENV || 'QAT').toUpperCase();
  process.env.TEST_ENV = ENV;

  validateEnv(); // ✅ now secrets are injected

  console.log(`Running tests for environment: ${ENV}`);
}
