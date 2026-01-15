type TestEnv = 'qat' | 'uat';

export class loginDataUtils {

  // -----------------------------
  // ENV HELPERS
  // -----------------------------

  static getEnv(): TestEnv {
    const env = process.env.TEST_ENV?.toLowerCase();
    if (env === 'qat' || env === 'uat') return env;
    return 'qat';
  }

  static getAllyBaseUrl(): string {
    const env = this.getEnv();
    const key = `ALLY_BASE_URL_${env.toUpperCase()}`;
    const url = process.env[key];

    if (!url) throw new Error(`Missing environment variable: ${key}`);
    return url;
  }

  static getAllyUser(userKey: string): { username: string; password: string } {
    const env = this.getEnv();
    const rawUsers = process.env.ALLY_USERS;

    if (!rawUsers) throw new Error('ALLY_USERS env variable not defined');

    const users = JSON.parse(rawUsers);
    const user = users?.[env]?.[userKey];

    if (!user) throw new Error(`User "${userKey}" not found for env "${env}"`);

    return user;
  }

}
