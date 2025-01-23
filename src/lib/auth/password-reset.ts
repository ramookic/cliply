import { createClient } from "@/utils/supabase/server";

/**
 * Sends the user a log in link via email. Once logged in direct the user to a new password form.
 * @returns {Promise<{ error: Error | null }>} - The result of the registration attempt.
 */

const passwordReset = async (email: string) => {
  const supabase = await createClient();

  const { error } = await supabase.auth.resetPasswordForEmail(email);

  return { error };
};

export default passwordReset;
