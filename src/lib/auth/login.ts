import { createClient } from "@/utils/supabase/server";

type loginProps = {
  email: string;
  password: string;
};

const login = async ({ email, password }: loginProps) => {
  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  return { error };
};

export default login;
