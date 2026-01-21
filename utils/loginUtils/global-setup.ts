import * as dotenv from 'dotenv';
import { validateEnv } from '../envValidator';

export default async function globalSetup() {
  // Load local .env only for local dev
  if (!process.env.CI) {
    dotenv.config({ path: './utils/.env' });
  }

  // Default to QAT if TEST_ENV not set
  const ENV = (process.env.TEST_ENV || 'QAT').toUpperCase();
  process.env.TEST_ENV = ENV;

  // ✅ Validate secrets now, after GitHub injects them
  validateEnv();

  //console.log(`Global setup complete for environment: ${ENV}`);
}
