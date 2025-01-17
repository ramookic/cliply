import { User } from "@supabase/supabase-js";
import { createClient } from "./server";

/**
 * Ensures the user is authenticated.
 * @throws {Error} - Throws an error if the user is not authenticated or there is an authentication issue.
 * @returns {Promise<User>} - The authenticated user.
 */

const isAuthenticated = async (): Promise<User> => {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser();

  if (error) {
    throw new Error(`Authentication error: ${error.message}`);
  }

  if (!data.user) {
    throw new Error("User is not authenticated.");
  }

  return data.user;
};

export default isAuthenticated;
