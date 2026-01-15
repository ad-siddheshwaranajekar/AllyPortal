type AllyKey = '1' | '2' | '3' | '4';

export function getAllyCredentials(ally: AllyKey) {
  const env = (process.env.TEST_ENV || 'QAT').toUpperCase();

  const usernameKey = `${env}ALLY${ally}USERNAME`;
  const passwordKey = `${env}ALLY${ally}PASSWORD`;

  const username = process.env[usernameKey];
  const password = process.env[passwordKey];

  if (!username || !password) {
    throw new Error(
      `Missing credentials: ${usernameKey} / ${passwordKey}`
    );
  }

  return { username, password };
}
