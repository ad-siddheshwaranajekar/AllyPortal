import { allyConfig } from './ally.config';

type Env = keyof typeof allyConfig;
type UserKey = keyof typeof allyConfig[Env]['users'];

export function getUser(userKey: UserKey) {
  const env = ((process.env.ENV || 'qat').toUpperCase()) as Env;
  const user = allyConfig[env].users[userKey];

  if (!user) {
    throw new Error(`User ${userKey} not configured for ${env}`);
  }

  const username = process.env[user.userEnv];
  const password = process.env[user.passEnv];

  if (!username || !password) {
    throw new Error(
      `Missing credentials: ${user.userEnv} / ${user.passEnv}`
    );
  }

  return { username, password };
}
