import getUser from "@/lib/auth/get-user";
import Image from "next/image";
import { redirect } from "next/navigation";

const currentYear = new Date().getFullYear();

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const { user } = await getUser();

  if (user?.role === "authenticated") {
    redirect("/dashboard");
  }

  return (
    <div className="h-screen w-full relative">
      <div className="absolute flex gap-1 items-center mt-6 md:mt-8 ml-6 md:ml-8">
        <Image src="./logo.svg" width={32} height={32} alt="logo" />
        <h1 className="text-zinc-800 text-2xl font-bold">Cliply</h1>
      </div>
      <div className="h-screen w-full">
        <div className="flex flex-col items-center justify-center w-full h-full relative">
          <div className="max-w-[460px] w-full px-6 md:px-0">{children}</div>
          <p className="absolute text-zinc-500 text-sm bottom-4">
            © {currentYear} Cliply - All Rights Reserved
          </p>
        </div>
      </div>
    </div>
  );
};

export default Layout;
