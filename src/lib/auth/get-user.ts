import { createClient } from "@/utils/supabase/server";
import { User } from "@supabase/supabase-js";

/**
 * Fetches the current user.
 * @returns {Promise<{user: User | null; error: Error | null }>} - The result of the login attempt.
 */

const getUser = async (): Promise<{
  user: User | null;
  error: Error | null;
}> => {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser();

  return { user: data.user, error };
};

export default getUser;
