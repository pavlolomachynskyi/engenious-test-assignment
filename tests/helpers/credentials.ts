export type Credentials = {
  email: string;
  password: string;
};

/** Reads the registered test account from the environment (loaded from .env). */
export function getCredentials(): Credentials {
  const email = process.env.TEST_USER_EMAIL;
  const password = process.env.TEST_USER_PASSWORD;

  if (!email || !password) {
    throw new Error(
      'TEST_USER_EMAIL and TEST_USER_PASSWORD must be set. ' +
        'Copy .env.example to .env and fill in a registered Engenious University account.',
    );
  }

  return { email, password };
}
