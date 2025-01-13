import { createClient } from "@/utils/supabase/server";

/**
 * Logs out the current user from Supabase.
 * @returns {Promise<{ error: Error | null }>} - The result of the logout attempt.
 */

const logout = async (): Promise<{ error: Error | null }> => {
  const supabase = await createClient();

  const { error } = await supabase.auth.signOut();

  return { error };
};

export default logout;
