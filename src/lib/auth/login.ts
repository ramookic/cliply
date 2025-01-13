import { createClient } from "@/utils/supabase/server";

type loginProps = {
  email: string;
  password: string;
};

/**
 * Logs in user with Supabase using their email and password.
 * @param {loginProps} credentials - The user's credentials.
 * @returns {Promise<{ error: Error | null }>} - The result of the login attempt.
 */

const login = async ({
  email,
  password,
}: loginProps): Promise<{ error: Error | null }> => {
  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  return { error };
};

export default login;
