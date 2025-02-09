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
    <div className="h-screen w-full relative">
      <div className="absolute flex gap-1 items-center mt-6 ml-6">
        <Image src="./logo.svg" width={32} height={32} alt="logo" />
        <h1 className="text-zinc-800 text-2xl font-bold">Cliply</h1>
      </div>
      <div className="h-screen w-full flex justify-between">
        <div className="flex flex-col items-center justify-center w-full h-full relative">
          <div className="max-w-[440px] px-6 md:px-0 w-full">{children}</div>
          <p className="absolute text-zinc-500 text-sm bottom-4">
            © {currentYear} Cliply - All Rights Reserved
          </p>
        </div>
        <div className="hidden lg:flex w-full h-full bg-zinc-800"></div>
      </div>
    </div>
  );
};

export default Layout;
