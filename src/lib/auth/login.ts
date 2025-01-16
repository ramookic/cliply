import { createClient } from "@/utils/supabase/server";

type LoginProps = {
  email: string;
  password: string;
};

/**
 * Logs in user with Supabase using their email and password.
 * @param {LoginProps} credentials - The user's credentials.
 * @returns {Promise<{ error: Error | null }>} - The result of the login attempt.
 */

const login = async ({
  email,
  password,
}: LoginProps): Promise<{ error: Error | null }> => {
  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  return { error };
};

export default login;
