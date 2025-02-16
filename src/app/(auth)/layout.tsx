import Logo from "@/components/ui/logo";
import getUser from "@/lib/auth/get-user";
import { redirect } from "next/navigation";

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const { user } = await getUser();

  if (user?.role === "authenticated") {
    redirect("/dashboard");
  }

  return (
    <div prefers-color-scheme="dark" className="h-screen w-full relative">
      <div className="absolute mt-6 md:mt-8 ml-6 md:ml-8">
        <Logo />
      </div>
      <div className="h-screen w-full">
        <div className="flex flex-col items-center justify-center w-full h-full relative">
          <div className="max-w-[460px] w-full px-6 md:px-0">{children}</div>
          <p className="absolute text-zinc-500 text-sm bottom-4">
            © {new Date().getFullYear()} Cliply - All Rights Reserved
          </p>
        </div>
      </div>
    </div>
  );
};

export default Layout;
