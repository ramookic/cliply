/**
 * Retrieves an environment variable or throws an error if not found.
 *
 * @param {string} key - The environment variable key.
 * @param {string} [defaultValue] - An optional default value.
 * @throws {Error} If the variable is missing and no default value is provided.
 * @returns {string} The environment variable value.
 */

const getEnv = (key: string, defaultValue?: string): string => {
  const value = process.env[key] || defaultValue;

  if (value === undefined) {
    throw Error(`Missing enviroment variable: ${key}`);
  }

  return value;
};

export const SUPABASE_URL = getEnv("NEXT_PUBLIC_SUPABASE_URL");
export const SUPABASE_ANON_KEY = getEnv("NEXT_PUBLIC_SUPABASE_ANON_KEY");
export const APP_URL = getEnv("NEXT_PUBLIC_APP_URL");
