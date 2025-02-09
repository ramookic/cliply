import { createClient } from "@/utils/supabase/server";
import { AuthError } from "@supabase/supabase-js";

/**
 * Updates the user session with code and updates user password.
 * @returns {Promise<{ error: AuthError | null }>} - The result of the registration attempt.
 */

const updatePassword = async (
  code: string,
  password: string
): Promise<{ error: AuthError | null }> => {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.exchangeCodeForSession(code);

  if (error || !data.session) {
    return { error };
  }

  const { error: updateError } = await supabase.auth.updateUser({ password });

  return { error: updateError };
};

export default updatePassword;
