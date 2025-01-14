import { createClient } from "@/utils/supabase/server";
import Image from "next/image";
import { redirect } from "next/navigation";

const currentYear = new Date().getFullYear();

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user?.role === "authenticated") {
    redirect("/dashboard");
  }

  return (
    <div className="overflow-y-auto w-full h-screen flex flex-col justify-center items-center gap-10 pt-20 pb-2 px-4">
      <div className="flex gap-1 items-center">
        <Image src="./logo.svg" width={32} height={32} alt="logo" />
        <h1 className="text-primary text-3xl font-bold">Cliply</h1>
      </div>
      <div className="max-w-[440px] w-full">{children}</div>
      <p className="text-zinc-500 text-sm">
        © {currentYear} Cliply - All Rights Reserved
      </p>
    </div>
  );
};

export default Layout;
