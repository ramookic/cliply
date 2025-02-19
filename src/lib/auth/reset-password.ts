import { createClient } from "@/utils/supabase/server";
import { AuthError } from "@supabase/supabase-js";

/**
 * Sends the user a log in link via email. Once logged in direct the user to a new password form.
 * @returns {Promise<{ error: AuthError | null }>} - The result of the reset attempt.
 */

const resetPassword = async (
  email: string,
  redirectTo: string
): Promise<{ error: AuthError | null }> => {
  const supabase = await createClient();

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo,
  });

  return { error };
};

export default resetPassword;
