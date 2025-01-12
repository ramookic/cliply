import { createClient } from "@/utils/supabase/server";

const logout = async () => {
  const supabase = await createClient();

  const { error } = await supabase.auth.signOut();

  return { error };
};

export default logout;
