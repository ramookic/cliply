import { SUPABASE_URL } from "@/constants/env";
import { createClient } from "@/utils/supabase/server";

type RegisterProps = {
  email: string;
  password: string;
  name: string;
};

/**
 * Registers a new user with Supabase using their email, password, and name.
 * @param {RegisterProps} credentials - The user's registration credentials.
 * @returns {Promise<{ error: Error | null }>} - The result of the registration attempt.
 */

const register = async ({
  email,
  password,
  name,
}: RegisterProps): Promise<{ error: Error | null }> => {
  const supabase = await createClient();
  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        name,
        avatar: `${SUPABASE_URL}/storage/v1/object/public/profile-images/default.jpg`,
      },
    },
  });

  return { error };
};

export default register;
