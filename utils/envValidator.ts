export function validateEnv() {
  const env = process.env.TEST_ENV || 'QAT';

  const supportedEnvs = ['DEV', 'QAT', 'UAT'];
  if (!supportedEnvs.includes(env)) {
    throw new Error(
      `Invalid TEST_ENV="${env}". Supported: ${supportedEnvs.join(', ')}`
    );
  }

  // 🔹 Validate base URL
  const baseUrls: Record<string, string> = {
    DEV: 'https://ally.dev.anddone.com',
    QAT: 'https://ally.qat.anddone.com',
    UAT: 'https://ally.uat.anddone.com',
  };

  if (!baseUrls[env]) {
    throw new Error(`Base URL not configured for ${env}`);
  }

  // 🔹 Validate at least one ally user
  const requiredVars = [
    `${env}ALLY1USERNAME`,
    `${env}ALLY1PASSWORD`,
  ];

  const missing: string[] = [];

  for (const key of requiredVars) {
    if (!process.env[key]) {
      missing.push(key);
    }
  }

  if (missing.length > 0) {
    throw new Error(
      `❌ Missing environment variables for ${env}:\n` +
      missing.map(v => `   - ${v}`).join('\n')
    );
  }

  console.log(`Environment validated successfully: ${env}`);
}
