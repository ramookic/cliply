const getEnv = (key: string, defaultValue?: string) => {
  const value = process.env[key] || defaultValue;

  if (value === undefined) {
    throw Error(`Missing enviroment variable: ${key}`);
  }

  return value;
};

export const SUPABASE_URL = getEnv("NEXT_PUBLIC_SUPABASE_URL");
export const SUPABASE_ANON_KEY = getEnv("NEXT_PUBLIC_SUPABASE_ANON_KEY");
