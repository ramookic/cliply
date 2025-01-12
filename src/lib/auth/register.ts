import { createClient } from "@/utils/supabase/server";

type registerProps = {
  email: string;
  password: string;
  name: string;
};

const register = async ({ email, password, name }: registerProps) => {
  const supabase = await createClient();
  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        name,
        avatar: "",
      },
    },
  });

  return { error };
};

export default register;
